/**
 * @file startupManager.js
 * @description Windows Startup & Login Item Registry Manager.
 * Configures the application to launch automatically with Windows in minimized background mode.
 */

const { app } = require('electron');

class StartupManager {
  /**
   * Enables or disables automatic startup on user login.
   * @param {boolean} enable - Target startup state
   */
  static setStartup(enable) {
    if (process.platform !== 'win32') return;

    try {
      app.setLoginItemSettings({
        openAtLogin: enable,
        path: process.execPath,
        args: ['--hidden']
      });
    } catch (err) {
      console.warn('[StartupManager] Failed to update login item settings:', err);
    }
  }

  /**
   * Checks if application is configured to launch on Windows startup.
   * @returns {boolean}
   */
  static isStartupEnabled() {
    if (process.platform !== 'win32') return false;
    try {
      const settings = app.getLoginItemSettings();
      return settings.openAtLogin;
    } catch (err) {
      return false;
    }
  }
}

module.exports = StartupManager;
