/**
 * @file dashboardPreload.js
 * @description Secure context bridge exposing IPC channels to Dashboard Renderer.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dashboardAPI', {
  /** Retrieves currently loaded settings from Main process */
  getSettings: () => ipcRenderer.invoke('get-settings'),

  /** Persists and broadcasts updated settings */
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

  /** Retrieves Windows taskbar position and metrics */
  getTaskbarInfo: () => ipcRenderer.invoke('get-taskbar-info'),

  /** Retrieves active Windows media playback info (Spotify, YouTube, etc.) */
  getMediaStatus: () => ipcRenderer.invoke('get-media-status'),

  /** Dispatches an action command to the active pet overlay */
  triggerPetAction: (action) => ipcRenderer.send('trigger-pet-action', action),

  /** Configures Windows auto-start on login */
  setStartup: (enable) => ipcRenderer.invoke('set-startup', enable),

  /** Hides dashboard to system tray */
  minimizeToTray: () => ipcRenderer.send('minimize-to-tray'),

  /** Closes or hides dashboard based on minimizeToTray setting */
  closeDashboard: () => ipcRenderer.send('close-dashboard'),

  /** Quits the application completely */
  closeApp: () => ipcRenderer.send('close-app'),

  /** Subscribes to external settings changes */
  onSettingsChanged: (callback) => {
    ipcRenderer.on('settings-changed-external', (_event, settings) => callback(settings));
  },

  /** Subscribes to taskbar geometry/validation status changes */
  onTaskbarStatus: (callback) => {
    ipcRenderer.on('taskbar-status', (_event, info) => callback(info));
  },

  /** Subscribes to real-time media playback updates */
  onMediaStatus: (callback) => {
    ipcRenderer.on('media-status-updated', (_event, status) => callback(status));
  },

  /** Opens external URL in default browser */
  openExternalUrl: (url) => ipcRenderer.invoke('open-external-url', url),

  /** Retrieves current application version string */
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  /** Checks for remote updates via GitHub Releases API */
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates')
});
