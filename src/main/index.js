/**
 * @file index.js
 * @description Main Electron process entry point for NavBarPets.
 * Coordinates the transparent pet overlay window, configuration dashboard,
 * system tray integrations, IPC event broadcasting, background media detection,
 * and active fullscreen application detection for dynamic power management.
 */

const { app, BrowserWindow, screen, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');

// Ensure unique application name and isolated profile directory across sessions
app.setName('NavBarPets');
try {
  const customUserData = path.join(app.getPath('appData'), 'NavBarPets');
  app.setPath('userData', customUserData);
} catch (e) {
  // Fallback to default user data path if custom path initialization fails
}

const AppTray = require('./tray');
const StartupManager = require('./startupManager');
const TaskbarDetector = require('./taskbarDetector');
const MediaDetector = require('./mediaDetector');
const FullscreenDetector = require('./fullscreenDetector');
const { ensureIcons } = require('./generateIcons');

class MainApp {
  constructor() {
    this.dashboardWindow = null;
    this.overlayWindow = null;
    this.tray = null;
    this.mediaDetector = null;
    this.fullscreenDetector = null;
    this.isFullscreenApp = false;
    this.isPetSleeping = false;
    this.isQuitting = false;

    this.settingsPath = path.join(app.getPath('userData'), 'settings.json');
    this.settings = this.loadSettings();

    this.initApp();
  }

  /**
   * Loads persisted application configuration or initializes defaults.
   * @returns {Object} Application settings object
   */
  loadSettings() {
    const defaultSettings = {
      species: 'neko',
      scale: 1.0,
      theme: 'theme-midnight',
      language: 'tr',
      startup: false,
      minimizeToTray: true,
      groundMode: 'taskbar_bottom', // 'taskbar_bottom' (screen bottom baseline) or 'taskbar_top' (taskbar top shelf)
      floorOffset: 0, // Fine-tuning vertical offset in pixels (-40 to +40)
      audio: {
        enabled: false,
        sensitivity: 0.5
      },
      sleepSchedule: {
        enabled: false,
        sleepTime: '23:00',
        wakeTime: '08:00'
      }
    };

    try {
      if (fs.existsSync(this.settingsPath)) {
        const data = fs.readFileSync(this.settingsPath, 'utf8');
        return { ...defaultSettings, ...JSON.parse(data) };
      }
    } catch (err) {
      console.warn('[MainApp] Could not read saved settings, falling back to defaults:', err);
    }
    return defaultSettings;
  }

  /**
   * Persists current settings to the JSON config file.
   */
  saveSettingsToFile() {
    try {
      fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2), 'utf8');
    } catch (err) {
      console.error('[MainApp] Error persisting settings to disk:', err);
    }
  }

  /**
   * Initializes single-instance lock, system windows, and event listeners.
   */
  initApp() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
      return;
    }

    app.on('second-instance', () => {
      this.showDashboard();
    });

    app.whenReady().then(() => {
      const { trayIconPath, appIconPath } = ensureIcons();

      this.createOverlayWindow();
      this.createDashboardWindow(appIconPath);
      this.tray = new AppTray(trayIconPath, this);

      // Start native Windows active media detector (Spotify, YouTube, VLC, etc.)
      this.mediaDetector = new MediaDetector((status) => {
        this.broadcastMediaStatus(status);
      });
      this.mediaDetector.start(1500);

      // Start native Windows foreground fullscreen application detector
      this.fullscreenDetector = new FullscreenDetector((isFullscreen) => {
        this.handleFullscreenToggle(isFullscreen);
      });
      this.fullscreenDetector.start(1200);

      this.setupIPCHandlers();
      this.setupScreenEvents();

      // Show dashboard on standard launch unless launched with --hidden flag
      const isHidden = process.argv.includes('--hidden');
      if (!isHidden) {
        this.showDashboard();
      }
    });

    app.on('before-quit', () => {
      this.isQuitting = true;
      if (this.mediaDetector) {
        this.mediaDetector.stop();
      }
      if (this.fullscreenDetector) {
        this.fullscreenDetector.stop();
      }
    });

    app.on('window-all-closed', (e) => {
      if (process.platform === 'win32' && !this.isQuitting && this.settings.minimizeToTray) {
        // Keep running in tray when dashboard is closed
      } else if (this.isQuitting) {
        app.quit();
      }
    });
  }

  /**
   * Creates the transparent, click-through overlay window positioned above the taskbar.
   */
  createOverlayWindow() {
    const taskbarInfo = TaskbarDetector.getTaskbarInfo();
    const overlayHeight = 140;
    const { width, height } = taskbarInfo.bounds;
    const overlayY = height - overlayHeight;

    this.overlayWindow = new BrowserWindow({
      width: width,
      height: overlayHeight,
      x: 0,
      y: overlayY,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      hasShadow: false,
      resizable: false,
      focusable: false, // Prevents window focus stealing while staying on top of all windows
      type: 'toolbar', // System toolbar window type on Windows
      show: taskbarInfo.isValid,
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'overlayPreload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        backgroundThrottling: false
      }
    });

    // Enforce top-level Z-order above all standard application windows
    this.overlayWindow.setAlwaysOnTop(true, 'screen-saver', 999);
    this.overlayWindow.setVisibleOnAllWorkspaces(true);
    this.overlayWindow.moveTop();

    // Initially ignore mouse events so Windows taskbar remains 100% interactive
    this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });

    this.overlayWindow.loadFile(path.join(__dirname, '..', 'overlay', 'overlay.html'));

    this.overlayWindow.webContents.on('did-finish-load', () => {
      this.overlayWindow.webContents.send('settings-updated', {
        ...this.settings,
        taskbarHeight: taskbarInfo.height
      });
      if (this.mediaDetector) {
        this.overlayWindow.webContents.send('media-status-updated', this.mediaDetector.getStatus());
      }
    });
  }

  /**
   * Handles fullscreen application transitions.
   * Hides the overlay and pauses simulation loop when a fullscreen game/app is active.
   * @param {boolean} isFullscreen
   */
  handleFullscreenToggle(isFullscreen) {
    this.isFullscreenApp = isFullscreen;
    if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return;

    if (isFullscreen) {
      // Fullscreen application active: Hide overlay completely and pause render loop (0% CPU/GPU)
      this.overlayWindow.hide();
      this.overlayWindow.webContents.send('set-paused', true);
    } else {
      // Fullscreen application closed/minimized: Restore overlay, resume render loop, and enforce top Z-order
      const taskbarInfo = TaskbarDetector.getTaskbarInfo();
      if (taskbarInfo.isValid) {
        this.overlayWindow.show();
        this.overlayWindow.setAlwaysOnTop(true, 'screen-saver', 999);
        this.overlayWindow.moveTop();
        this.overlayWindow.webContents.send('set-paused', false);
      }
    }
  }

  /**
   * Updates overlay geometry based on primary display metrics and taskbar position.
   */
  updateOverlayPosition() {
    if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return;

    const taskbarInfo = TaskbarDetector.getTaskbarInfo();
    const overlayHeight = 140;

    if (!taskbarInfo.isValid || this.isFullscreenApp) {
      this.overlayWindow.hide();
      this.broadcastTaskbarStatus(taskbarInfo);
      return;
    }

    const { width, height } = taskbarInfo.bounds;
    const overlayY = height - overlayHeight;

    this.overlayWindow.setBounds({
      x: 0,
      y: overlayY,
      width: width,
      height: overlayHeight
    });

    if (!this.overlayWindow.isVisible() && !this.isFullscreenApp) {
      this.overlayWindow.show();
    }

    // Maintain top Z-order dominance
    this.overlayWindow.setAlwaysOnTop(true, 'screen-saver', 999);
    this.overlayWindow.moveTop();

    this.broadcastSettings();
    this.broadcastTaskbarStatus(taskbarInfo);
  }

  /**
   * Creates the main configuration dashboard window.
   * @param {string} appIconPath - Path to application icon
   */
  createDashboardWindow(appIconPath) {
    this.dashboardWindow = new BrowserWindow({
      width: 960,
      height: 640,
      minWidth: 840,
      minHeight: 560,
      frame: false,
      show: false,
      icon: appIconPath,
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'dashboardPreload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    this.dashboardWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

    this.dashboardWindow.on('close', (event) => {
      if (!this.isQuitting && this.settings.minimizeToTray) {
        event.preventDefault();
        this.dashboardWindow.hide();
      }
    });

    this.dashboardWindow.webContents.on('did-finish-load', () => {
      const taskbarInfo = TaskbarDetector.getTaskbarInfo();
      this.broadcastTaskbarStatus(taskbarInfo);
      if (this.mediaDetector) {
        this.dashboardWindow.webContents.send('media-status-updated', this.mediaDetector.getStatus());
      }
    });
  }

  /**
   * Displays and focuses the configuration dashboard window.
   */
  showDashboard() {
    if (this.dashboardWindow) {
      this.dashboardWindow.show();
      this.dashboardWindow.focus();
      const taskbarInfo = TaskbarDetector.getTaskbarInfo();
      this.broadcastTaskbarStatus(taskbarInfo);
      if (this.mediaDetector) {
        this.dashboardWindow.webContents.send('media-status-updated', this.mediaDetector.getStatus());
      }
    }
  }

  /**
   * Switches the active pet species across all windows.
   * @param {string} species - Target pet species identifier
   */
  changeSpecies(species) {
    this.settings.species = species;
    this.saveSettingsToFile();
    this.broadcastSettings();
    if (this.tray) this.tray.updateContextMenu();
  }

  /**
   * Toggles sleep/wake state manually from tray context menu.
   */
  togglePetSleep() {
    this.isPetSleeping = !this.isPetSleeping;
    const action = this.isPetSleeping ? 'sleep' : 'wake';
    this.triggerAction(action);
  }

  /**
   * Dispatches direct pet action to the overlay engine.
   * @param {string} action - Action command ('sleep', 'wake', 'dance', 'pet')
   */
  triggerAction(action) {
    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.webContents.send('trigger-action', action);
    }
  }

  /**
   * Broadcasts updated configuration to both overlay and dashboard renderers.
   */
  broadcastSettings() {
    const taskbarInfo = TaskbarDetector.getTaskbarInfo();
    const payload = {
      ...this.settings,
      taskbarHeight: taskbarInfo.height
    };

    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.webContents.send('settings-updated', payload);
      if (this.mediaDetector) {
        this.overlayWindow.webContents.send('media-status-updated', this.mediaDetector.getStatus());
      }
    }
    if (this.dashboardWindow && !this.dashboardWindow.isDestroyed()) {
      this.dashboardWindow.webContents.send('settings-changed-external', payload);
    }
  }

  /**
   * Broadcasts Windows taskbar geometry status to dashboard.
   * @param {Object} info - Taskbar detector status info
   */
  broadcastTaskbarStatus(info) {
    if (this.dashboardWindow && !this.dashboardWindow.isDestroyed()) {
      this.dashboardWindow.webContents.send('taskbar-status', info);
    }
  }

  /**
   * Broadcasts current media playback status to all renderer processes.
   * @param {Object} status - Media status payload ({ isPlaying, title, artist, source })
   */
  broadcastMediaStatus(status) {
    if (this.dashboardWindow && !this.dashboardWindow.isDestroyed()) {
      this.dashboardWindow.webContents.send('media-status-updated', status);
    }
    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.webContents.send('media-status-updated', status);
    }
  }

  /**
   * Registers display, resolution change, and Z-order reinforcement watchers.
   */
  setupScreenEvents() {
    screen.on('display-metrics-changed', () => {
      this.updateOverlayPosition();
    });

    // Periodic safety check to detect taskbar position changes and maintain top Z-order
    setInterval(() => {
      if (!this.isFullscreenApp) {
        this.updateOverlayPosition();
      }
    }, 2500);
  }

  /**
   * Registers IPC handlers for renderer communication.
   */
  setupIPCHandlers() {
    ipcMain.handle('get-settings', () => {
      return this.settings;
    });

    ipcMain.handle('get-taskbar-info', () => {
      return TaskbarDetector.getTaskbarInfo();
    });

    ipcMain.handle('get-media-status', () => {
      return this.mediaDetector ? this.mediaDetector.getStatus() : {
        isPlaying: false,
        title: 'Müzik Çalmıyor',
        artist: 'Sistem Sessiz',
        source: 'Yok'
      };
    });

    ipcMain.handle('save-settings', (_event, newSettings) => {
      this.settings = { ...this.settings, ...newSettings };
      this.saveSettingsToFile();
      this.broadcastSettings();
      if (this.tray) this.tray.updateContextMenu();
      return true;
    });

    ipcMain.on('trigger-pet-action', (_event, action) => {
      this.triggerAction(action);
    });

    ipcMain.handle('set-startup', (_event, enable) => {
      StartupManager.setStartup(enable);
      return true;
    });

    ipcMain.on('minimize-to-tray', () => {
      if (this.dashboardWindow && !this.dashboardWindow.isDestroyed()) {
        this.dashboardWindow.hide();
      }
    });

    ipcMain.on('close-dashboard', () => {
      if (this.dashboardWindow && !this.dashboardWindow.isDestroyed()) {
        if (this.settings.minimizeToTray) {
          this.dashboardWindow.hide();
        } else {
          this.quitApp();
        }
      }
    });

    ipcMain.on('close-app', () => {
      this.quitApp();
    });

    ipcMain.on('set-overlay-interactive', (_event, isInteractive) => {
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        if (isInteractive) {
          this.overlayWindow.setIgnoreMouseEvents(false);
        } else {
          this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
        }
      }
    });
  }

  /**
   * Performs clean application teardown and exits.
   */
  quitApp() {
    this.isQuitting = true;
    if (this.mediaDetector) {
      this.mediaDetector.stop();
    }
    if (this.fullscreenDetector) {
      this.fullscreenDetector.stop();
    }
    if (this.tray) this.tray.destroy();
    app.quit();
  }
}

new MainApp();
