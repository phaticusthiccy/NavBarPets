/**
 * @file startupManager.js
 * @description Windows Startup & Login Item Registry Manager.
 * Configures the application to launch automatically with Windows in minimized background mode.
 * Supports portable builds, packaged NSIS installers, and development environments.
 */

const { app } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

class StartupManager {
  /**
   * Resolves the proper executable path and arguments based on the execution context.
   * Handles portable builds, packaged installers, and development environments.
   * @returns {{ execPath: string, args: string[] }}
   */
  static getStartupConfig() {
    const isPortable = Boolean(process.env.PORTABLE_EXECUTABLE_FILE);
    const execPath = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;

    // In dev mode (unpacked node_modules/electron), electron needs the app root path as the target argument
    const args = (!app.isPackaged && !isPortable)
      ? [path.resolve(app.getAppPath()), '--hidden']
      : ['--hidden'];

    return { execPath, args };
  }

  /**
   * Enables or disables automatic startup on user login.
   * @param {boolean} enable - Target startup state
   */
  static setStartup(enable) {
    if (process.platform !== 'win32') return;

    try {
      const { execPath, args } = this.getStartupConfig();

      app.setLoginItemSettings({
        openAtLogin: Boolean(enable),
        path: execPath,
        args: args
      });

      // Remove obsolete/corrupted registry entries (e.g. stale Electron dev keys or temp folder paths)
      this.cleanupLegacyRegistryEntries();
    } catch (err) {
      console.warn('[StartupManager] Failed to update login item settings:', err);
    }
  }

  /**
   * Cleans up legacy or invalid registry entries in HKCU\Software\Microsoft\Windows\CurrentVersion\Run.
   */
  static cleanupLegacyRegistryEntries() {
    if (process.platform !== 'win32') return;
    try {
      // Remove stale 'electron.app.Electron' key if present
      execSync('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "electron.app.Electron" /f', { stdio: 'ignore' });
    } catch (_) {}

    try {
      // Remove stale temp paths from electron.app.NavBarPets if present
      const query = execSync('reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "electron.app.NavBarPets"', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      if (query && query.toLowerCase().includes('\\appdata\\local\\temp\\')) {
        execSync('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "electron.app.NavBarPets" /f', { stdio: 'ignore' });
      }
    } catch (_) {}
  }

  /**
   * Synchronizes Windows login item registry with persisted user settings.
   * @param {boolean} shouldEnable - Desired startup state
   */
  static syncStartup(shouldEnable) {
    if (process.platform !== 'win32') return;
    try {
      this.setStartup(Boolean(shouldEnable));
    } catch (err) {
      console.warn('[StartupManager] Failed to sync startup settings:', err);
    }
  }

  /**
   * Checks if application is configured to launch on Windows startup.
   * @returns {boolean}
   */
  static isStartupEnabled() {
    if (process.platform !== 'win32') return false;
    try {
      const { execPath, args } = this.getStartupConfig();
      const settings = app.getLoginItemSettings({
        path: execPath,
        args: args
      });
      return Boolean(settings.openAtLogin);
    } catch (err) {
      return false;
    }
  }
}

module.exports = StartupManager;

