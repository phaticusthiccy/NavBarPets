/**
 * @file settingsModule.js
 * @description Settings, Themes, Languages, Toast Notifications & Updates Module for Dashboard.
 */

const SettingsModule = {
  /**
   * Updates sidebar active pet name.
   */
  updateStatusBanner() {
    const lang = this.settings.language || 'tr';
    const petObj = typeof i18n !== 'undefined' ? i18n.getPetData(this.settings.species, lang) : null;
    const activeNameEl = document.getElementById('activePetName');
    if (activeNameEl && petObj) {
      activeNameEl.textContent = petObj.name;
    }
  },

  /**
   * Switches language, translates DOM, updates pet catalog and persists setting.
   * @param {string} lang - 'tr' or 'en'
   */
  changeLanguage(lang) {
    if (lang !== 'tr' && lang !== 'en') lang = 'tr';
    this.settings.language = lang;

    if (typeof i18n !== 'undefined') {
      i18n.setLanguage(lang);
    }

    this.updateStatusBanner();
    this.renderPetCards();
    if (this.lastMediaStatus) this.updateMediaStatus(this.lastMediaStatus);
    if (this.lastTaskbarInfo) this.updateTaskbarStatus(this.lastTaskbarInfo);
    this.updateUIFromSettings();
    this.saveSettings();
  },

  /**
   * Applies CSS theme class to document body.
   * @param {string} themeName
   */
  applyTheme(themeName) {
    document.body.className = themeName || 'theme-midnight';
  },

  /**
   * Displays temporary toast notification in the bottom right corner.
   * @param {string} icon
   * @param {string} message
   */
  showToast(icon, message) {
    // Support calling showToast('Message') or showToast('✨', 'Message')
    if (message === undefined) {
      message = icon;
      icon = '✨';
    }

    const toast = document.getElementById('appToast');
    const iconEl = document.getElementById('toastIcon');
    const msgEl = document.getElementById('toastMessage');

    if (iconEl) iconEl.textContent = icon || '✨';
    if (msgEl) msgEl.textContent = message || '';

    if (toast) {
      toast.style.display = 'flex';
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
      }, 4000);
    }
  },

  /**
   * Synchronizes DOM input elements with active settings values.
   */
  updateUIFromSettings() {
    this.updateStatusBanner();

    // Language active state
    document.querySelectorAll('.language-option').forEach((opt) => {
      if (opt.getAttribute('data-lang') === (this.settings.language || 'tr')) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    const togglePetVisibility = document.getElementById('togglePetVisibility');
    if (togglePetVisibility) {
      togglePetVisibility.checked = this.settings.enabled !== false;
    }

    const toggleAutoSleep = document.getElementById('toggleAutoSleep');
    if (toggleAutoSleep) toggleAutoSleep.checked = this.settings.sleepSchedule.enabled;

    const inputSleepTime = document.getElementById('inputSleepTime');
    if (inputSleepTime) inputSleepTime.value = this.settings.sleepSchedule.sleepTime;

    const inputWakeTime = document.getElementById('inputWakeTime');
    if (inputWakeTime) inputWakeTime.value = this.settings.sleepSchedule.wakeTime;

    const toggleAudioDance = document.getElementById('toggleAudioDance');
    if (toggleAudioDance) toggleAudioDance.checked = this.settings.audio.enabled;

    const sliderAudioSens = document.getElementById('sliderAudioSens');
    const labelAudioSens = document.getElementById('labelAudioSens');
    if (sliderAudioSens) {
      sliderAudioSens.value = this.settings.audio.sensitivity;
      const lang = this.settings.language || 'tr';
      if (labelAudioSens && typeof i18n !== 'undefined') {
        const val = this.settings.audio.sensitivity;
        const key = val > 0.7 ? 'audio_sens_high' : val < 0.4 ? 'audio_sens_low' : 'audio_sens_med';
        labelAudioSens.textContent = `${i18n.t(key, lang)} (${val.toFixed(2)}x)`;
      }
    }

    const sliderPetScale = document.getElementById('sliderPetScale');
    const labelPetScale = document.getElementById('labelPetScale');
    if (sliderPetScale) {
      sliderPetScale.value = this.settings.scale;
      if (labelPetScale) labelPetScale.textContent = `${this.settings.scale.toFixed(1)}x`;
    }

    // Ground mode active button
    document.querySelectorAll('.btn-ground-mode').forEach((btn) => {
      if (btn.getAttribute('data-mode') === this.settings.groundMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Floor offset slider
    const sliderFloorOffset = document.getElementById('sliderFloorOffset');
    const labelFloorOffset = document.getElementById('labelFloorOffset');
    if (sliderFloorOffset) {
      sliderFloorOffset.value = this.settings.floorOffset || 0;
      if (labelFloorOffset) {
        const off = this.settings.floorOffset || 0;
        labelFloorOffset.textContent = `${off > 0 ? '+' : ''}${off} px`;
      }
    }

    const toggleStartup = document.getElementById('toggleStartup');
    if (toggleStartup) toggleStartup.checked = this.settings.startup;

    const toggleMinimize = document.getElementById('toggleMinimizeToTray');
    if (toggleMinimize) toggleMinimize.checked = this.settings.minimizeToTray;

    // Theme active mark
    document.querySelectorAll('.theme-option').forEach((opt) => {
      if (opt.getAttribute('data-theme') === this.settings.theme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  },

  /**
   * Checks for application updates from GitHub releases and presents UI feedback.
   */
  async handleCheckForUpdates() {
    const btn = document.getElementById('btnCheckUpdate');
    const icon = document.getElementById('updateBtnIcon');
    const lang = this.settings.language || 'tr';

    if (btn) btn.disabled = true;
    if (icon) icon.classList.add('spinning');

    try {
      if (window.dashboardAPI && window.dashboardAPI.checkForUpdates) {
        const res = await window.dashboardAPI.checkForUpdates();
        if (res.hasUpdate) {
          this.showUpdateModal({
            icon: '🚀',
            title: typeof i18n !== 'undefined' ? i18n.t('update_available_title', lang) : 'Yeni Sürüm Mevcut! 🚀',
            desc: `NavBarPets v${res.latestVersion} ${typeof i18n !== 'undefined' ? i18n.t('update_available_desc', lang) : 'yayınlandı.'} (${lang === 'tr' ? 'Mevcut' : 'Current'}: v${res.currentVersion})`,
            url: res.releaseUrl
          });
        } else if (res.success) {
          const upToDateMsg = typeof i18n !== 'undefined'
            ? `${i18n.t('update_up_to_date_title', lang)} (v${res.currentVersion})`
            : `Uygulama Güncel! (v${res.currentVersion})`;
          this.showToast('✅', upToDateMsg);
        } else {
          const errMsg = typeof i18n !== 'undefined'
            ? i18n.t('update_error_desc', lang)
            : 'Güncellemeler denetlenirken bir sorun oluştu.';
          this.showToast('⚠️', errMsg);
        }
      } else {
        this.showToast('🌐', 'https://github.com/phaticusthiccy/NavBarPets');
      }
    } catch (err) {
      console.warn('[DashboardApp] Error during update check:', err);
      this.showToast('⚠️', 'Güncelleme kontrolü başarısız oldu.');
    } finally {
      if (btn) btn.disabled = false;
      if (icon) icon.classList.remove('spinning');
    }
  },

  /**
   * Displays modal dialog for update announcement.
   * @param {Object} data
   */
  showUpdateModal({ icon, title, desc, url }) {
    const modal = document.getElementById('updateModal');
    const iconEl = document.getElementById('updateModalIcon');
    const titleEl = document.getElementById('updateModalTitle');
    const descEl = document.getElementById('updateModalDesc');
    const downloadBtn = document.getElementById('btnUpdateDownload');

    if (iconEl && icon) iconEl.textContent = icon;
    if (titleEl && title) titleEl.textContent = title;
    if (descEl && desc) descEl.textContent = desc;
    if (downloadBtn && url) downloadBtn.setAttribute('data-url', url);

    if (modal) modal.style.display = 'flex';
  },

  /**
   * Hides update modal dialog.
   */
  hideUpdateModal() {
    const modal = document.getElementById('updateModal');
    if (modal) modal.style.display = 'none';
  }
};

if (typeof window !== 'undefined') window.SettingsModule = SettingsModule;
if (typeof globalThis !== 'undefined') globalThis.SettingsModule = SettingsModule;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SettingsModule;
}
