/**
 * @file fullscreenDetector.js
 * @description Windows Native Foreground Fullscreen Application Detector.
 * Detects whether a true fullscreen application or game is active to hide the overlay
 * and suspend rendering loops for maximum system performance.
 */

const { execFile } = require('child_process');
const path = require('path');
const { screen } = require('electron');

class FullscreenDetector {
  /**
   * @param {Function} onStateChange - Callback invoked when fullscreen state toggles
   */
  constructor(onStateChange) {
    this.onStateChange = onStateChange;
    this.isFullscreen = false;
    this.intervalId = null;
    this.isQuerying = false;
    this.scriptPath = path.join(__dirname, 'checkFullscreen.ps1');
  }

  /**
   * Starts periodic polling for active foreground fullscreen windows.
   * @param {number} [intervalMs=1200]
   */
  start(intervalMs = 1200) {
    this.check();
    this.intervalId = setInterval(() => this.check(), intervalMs);
  }

  /**
   * Stops background polling.
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Queries Windows User32 via PowerShell helper script.
   */
  check() {
    if (this.isQuerying || process.platform !== 'win32') return;

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;

    this.isQuerying = true;

    execFile('powershell', [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      this.scriptPath,
      width.toString(),
      height.toString()
    ], { timeout: 1500 }, (err, stdout) => {
      this.isQuerying = false;
      if (err) return;

      const output = (stdout || '').trim().toUpperCase();
      const isNowFullscreen = output.includes('TRUE');

      if (isNowFullscreen !== this.isFullscreen) {
        this.isFullscreen = isNowFullscreen;
        if (this.onStateChange) {
          this.onStateChange(this.isFullscreen);
        }
      }
    });
  }

  /**
   * Retrieves the cached fullscreen status.
   * @returns {boolean}
   */
  getStatus() {
    return this.isFullscreen;
  }
}

module.exports = FullscreenDetector;
