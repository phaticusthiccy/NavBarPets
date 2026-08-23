/**
 * @file overlayPreload.js
 * @description Secure context bridge exposing IPC channels to Overlay Renderer.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  /** Subscribes to application configuration updates */
  onSettingsUpdate: (callback) => {
    ipcRenderer.on('settings-updated', (_event, settings) => callback(settings));
  },

  /** Subscribes to manual action triggers (sleep, wake, dance, pet) */
  onTriggerAction: (callback) => {
    ipcRenderer.on('trigger-action', (_event, action) => callback(action));
  },

  /** Subscribes to active media status changes */
  onMediaStatus: (callback) => {
    ipcRenderer.on('media-status-updated', (_event, status) => callback(status));
  },

  /** Subscribes to overlay rendering pause/resume events */
  onPauseUpdate: (callback) => {
    ipcRenderer.on('set-paused', (_event, isPaused) => callback(isPaused));
  },

  /** Toggles mouse pass-through for the transparent overlay window */
  setInteractiveRegion: (isInteractive) => {
    ipcRenderer.send('set-overlay-interactive', isInteractive);
  }
});
