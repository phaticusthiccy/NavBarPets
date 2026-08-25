/**
 * @file dashboard.js
 * @description Dashboard Application Master Controller for NavBarPets.
 * Coordinates modular view controllers (Sanctuary, Telemetry, Settings, EventBinder).
 */

const PET_IDS = ['neko', 'shiba', 'slime', 'dragon', 'duck', 'fox', 'bunny', 'penguin', 'jett', 'mario', 'pikachu'];

const resolveDashboardModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

class DashboardApp {
  constructor() {
    this.settings = {
      enabled: true,
      species: 'neko',
      scale: 1.0,
      theme: 'theme-midnight',
      language: 'tr',
      startup: false,
      minimizeToTray: true,
      groundMode: 'taskbar_bottom',
      floorOffset: 0,
      petSkins: {},
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

    const PR = resolveDashboardModule('PetRenderer', '../overlay/petRenderer.js');
    const AB = resolveDashboardModule('AnimationBehaviors', '../overlay/animationBehaviors.js');

    this.renderer = new PR();
    this.behaviors = new AB();
    this.previewCanvases = {};
    this.previewTimes = {};
    this.lastMediaStatus = null;
    this.lastTaskbarInfo = null;

    this.init();
  }

  /**
   * Initializes settings synchronization, IPC subscriptions, and UI bindings.
   */
  async init() {
    if (typeof window !== 'undefined' && window.dashboardAPI) {
      try {
        const saved = await window.dashboardAPI.getSettings();
        if (saved) {
          this.settings = { ...this.settings, ...saved };
        }
        const taskbarInfo = await window.dashboardAPI.getTaskbarInfo();
        if (this.updateTaskbarStatus) this.updateTaskbarStatus(taskbarInfo);

        const mediaStatus = await window.dashboardAPI.getMediaStatus();
        if (this.updateMediaStatus) this.updateMediaStatus(mediaStatus);
      } catch (err) {
        console.warn('[DashboardApp] IPC communication error during initialization:', err);
      }

      window.dashboardAPI.onTaskbarStatus((info) => {
        if (this.updateTaskbarStatus) this.updateTaskbarStatus(info);
      });

      window.dashboardAPI.onMediaStatus((media) => {
        if (this.updateMediaStatus) this.updateMediaStatus(media);
      });

      window.dashboardAPI.onSettingsChanged((settings) => {
        if (settings) {
          const prevLang = this.settings.language;
          const prevTheme = this.settings.theme;
          const prevSpecies = this.settings.species;

          this.settings = { ...this.settings, ...settings };

          if (settings.language && settings.language !== prevLang) {
            if (typeof i18n !== 'undefined') i18n.setLanguage(settings.language);
            if (this.renderPetCards) this.renderPetCards();
            if (this.updateUIFromSettings) this.updateUIFromSettings();
          } else if (settings.species && settings.species !== prevSpecies) {
            if (this.selectPetWithoutSave) {
              this.selectPetWithoutSave(settings.species);
            } else if (this.renderPetCards) {
              this.renderPetCards();
            }
          }

          if (settings.theme && settings.theme !== prevTheme && this.applyTheme) {
            this.applyTheme(settings.theme);
          }
        }
      });
    }

    if (typeof i18n !== 'undefined') {
      i18n.setLanguage(this.settings.language || 'tr');
    }

    if (typeof document !== 'undefined') {
      if (this.applyTheme) this.applyTheme(this.settings.theme);
      if (this.renderPetCards) this.renderPetCards();
      if (this.bindEvents) this.bindEvents();
      if (this.updateUIFromSettings) this.updateUIFromSettings();
      if (this.startPreviewRenderLoop) this.startPreviewRenderLoop();
    }
  }

  /**
   * Persists settings to disk and broadcasts via IPC.
   */
  async saveSettings() {
    if (typeof window !== 'undefined' && window.dashboardAPI) {
      await window.dashboardAPI.saveSettings(this.settings);
    }
  }
}

const _SanctuaryModule = resolveDashboardModule('SanctuaryModule', './modules/sanctuaryModule.js');
const _TelemetryModule = resolveDashboardModule('TelemetryModule', './modules/telemetryModule.js');
const _SettingsModule = resolveDashboardModule('SettingsModule', './modules/settingsModule.js');
const _EventBinder = resolveDashboardModule('EventBinder', './modules/eventBinder.js');

if (_SanctuaryModule) Object.assign(DashboardApp.prototype, _SanctuaryModule);
if (_TelemetryModule) Object.assign(DashboardApp.prototype, _TelemetryModule);
if (_SettingsModule) Object.assign(DashboardApp.prototype, _SettingsModule);
if (_EventBinder) Object.assign(DashboardApp.prototype, _EventBinder);

if (typeof window !== 'undefined') window.DashboardApp = DashboardApp;
if (typeof globalThis !== 'undefined') globalThis.DashboardApp = DashboardApp;

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new DashboardApp();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardApp;
}
