/**
 * @file eventBinder.js
 * @description Event Binding Controller for Dashboard UI Elements & Interactivity.
 */

const EventBinder = {
  /**
   * Attaches event listeners to sidebar tabs, sliders, toggles, and buttons.
   */
  bindEvents() {
    // 1. Sidebar Navigation Tabs
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        navItems.forEach(n => n.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const targetPane = document.getElementById(`tab-${targetTab}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // 2. Custom Title Bar Controls
    const btnMinimize = document.getElementById('btnMinimizeTray');
    if (btnMinimize) {
      btnMinimize.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.minimizeToTray();
      });
    }

    const btnClose = document.getElementById('btnClose');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.closeDashboard();
      });
    }

    // 3. Sleep Scheduler Controls
    const toggleAutoSleep = document.getElementById('toggleAutoSleep');
    if (toggleAutoSleep) {
      toggleAutoSleep.addEventListener('change', (e) => {
        this.settings.sleepSchedule.enabled = e.target.checked;
        this.saveSettings();
      });
    }

    const inputSleepTime = document.getElementById('inputSleepTime');
    if (inputSleepTime) {
      inputSleepTime.addEventListener('change', (e) => {
        this.settings.sleepSchedule.sleepTime = e.target.value;
        this.saveSettings();
      });
    }

    const inputWakeTime = document.getElementById('inputWakeTime');
    if (inputWakeTime) {
      inputWakeTime.addEventListener('change', (e) => {
        this.settings.sleepSchedule.wakeTime = e.target.value;
        this.saveSettings();
      });
    }

    const btnForceSleep = document.getElementById('btnForceSleep');
    if (btnForceSleep) {
      btnForceSleep.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('sleep');
      });
    }

    const btnForceWake = document.getElementById('btnForceWake');
    if (btnForceWake) {
      btnForceWake.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('wake');
      });
    }

    const btnQuickSleep = document.getElementById('btnQuickSleep');
    if (btnQuickSleep) {
      btnQuickSleep.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('sleep');
      });
    }

    const btnQuickWake = document.getElementById('btnQuickWake');
    if (btnQuickWake) {
      btnQuickWake.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('wake');
      });
    }

    // 4. Pet Sanctuary & Master Visibility Switch
    const togglePetVisibility = document.getElementById('togglePetVisibility');
    if (togglePetVisibility) {
      togglePetVisibility.addEventListener('change', (e) => {
        this.settings.enabled = e.target.checked;
        this.saveSettings();
        if (typeof i18n !== 'undefined') {
          const lang = this.settings.language || 'tr';
          const msg = e.target.checked 
            ? (lang === 'tr' ? 'Petler görev çubuğunda gösteriliyor' : 'Pets visible on taskbar')
            : (lang === 'tr' ? 'Petler gizlendi' : 'Pets hidden');
          this.showToast('👁️', msg);
        }
      });
    }

    // 5. Reactions & Audio Controls
    const toggleAudioDance = document.getElementById('toggleAudioDance');
    if (toggleAudioDance) {
      toggleAudioDance.addEventListener('change', (e) => {
        this.settings.audio.enabled = e.target.checked;
        this.saveSettings();
      });
    }

    const sliderAudioSens = document.getElementById('sliderAudioSens');
    const labelAudioSens = document.getElementById('labelAudioSens');
    if (sliderAudioSens) {
      sliderAudioSens.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.settings.audio.sensitivity = val;
        const lang = this.settings.language || 'tr';
        if (labelAudioSens && typeof i18n !== 'undefined') {
          const key = val > 0.7 ? 'audio_sens_high' : val < 0.4 ? 'audio_sens_low' : 'audio_sens_med';
          labelAudioSens.textContent = `${i18n.t(key, lang)} (${val.toFixed(2)}x)`;
        }
        this.saveSettings();
      });
    }

    const sliderPetScale = document.getElementById('sliderPetScale');
    const labelPetScale = document.getElementById('labelPetScale');
    if (sliderPetScale) {
      sliderPetScale.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.settings.scale = val;
        if (labelPetScale) labelPetScale.textContent = `${this.settings.scale.toFixed(1)}x`;
        this.saveSettings();
      });
    }

    // Ground Mode Selector
    document.querySelectorAll('.btn-ground-mode').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-ground-mode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.settings.groundMode = btn.getAttribute('data-mode');
        this.saveSettings();
      });
    });

    // Floor Offset Slider
    const sliderFloorOffset = document.getElementById('sliderFloorOffset');
    const labelFloorOffset = document.getElementById('labelFloorOffset');
    if (sliderFloorOffset) {
      sliderFloorOffset.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.settings.floorOffset = val;
        if (labelFloorOffset) labelFloorOffset.textContent = `${val > 0 ? '+' : ''}${val} px`;
        this.saveSettings();
      });
    }

    const btnSimulateMusic = document.getElementById('btnSimulateMusic');
    if (btnSimulateMusic) {
      btnSimulateMusic.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('dance');
      });
    }

    const btnPetLove = document.getElementById('btnPetLove');
    if (btnPetLove) {
      btnPetLove.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.triggerPetAction('pet');
      });
    }

    // 6. Language Selector Options
    document.querySelectorAll('.language-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        this.changeLanguage(lang);
      });
    });

    // 7. Themes & Windows Preferences
    document.querySelectorAll('.theme-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const theme = opt.getAttribute('data-theme');
        this.applyTheme(theme);
        this.settings.theme = theme;
        this.saveSettings();
      });
    });

    const toggleStartup = document.getElementById('toggleStartup');
    if (toggleStartup) {
      toggleStartup.addEventListener('change', (e) => {
        this.settings.startup = e.target.checked;
        if (window.dashboardAPI) window.dashboardAPI.setStartup(e.target.checked);
        this.saveSettings();
      });
    }

    const toggleMinimize = document.getElementById('toggleMinimizeToTray');
    if (toggleMinimize) {
      toggleMinimize.addEventListener('change', (e) => {
        this.settings.minimizeToTray = e.target.checked;
        this.saveSettings();
      });
    }

    // 8. Sidebar Footer Actions (Check Update & Developer)
    const btnDeveloper = document.getElementById('btnDeveloper');
    if (btnDeveloper) {
      btnDeveloper.addEventListener('click', () => {
        const devUrl = 'https://github.com/phaticusthiccy';
        if (window.dashboardAPI && window.dashboardAPI.openExternalUrl) {
          window.dashboardAPI.openExternalUrl(devUrl);
        } else {
          window.open(devUrl, '_blank');
        }
      });
    }

    const btnCheckUpdate = document.getElementById('btnCheckUpdate');
    if (btnCheckUpdate) {
      btnCheckUpdate.addEventListener('click', async () => {
        await this.handleCheckForUpdates();
      });
    }

    // Modal close & download handlers
    const btnUpdateClose = document.getElementById('btnUpdateClose');
    if (btnUpdateClose) {
      btnUpdateClose.addEventListener('click', () => {
        this.hideUpdateModal();
      });
    }

    const btnUpdateDownload = document.getElementById('btnUpdateDownload');
    if (btnUpdateDownload) {
      btnUpdateDownload.addEventListener('click', () => {
        const url = btnUpdateDownload.getAttribute('data-url') || 'https://github.com/phaticusthiccy/NavBarPets/releases/latest';
        if (window.dashboardAPI && window.dashboardAPI.openExternalUrl) {
          window.dashboardAPI.openExternalUrl(url);
        } else {
          window.open(url, '_blank');
        }
        this.hideUpdateModal();
      });
    }
  }
};

if (typeof window !== 'undefined') window.EventBinder = EventBinder;
if (typeof globalThis !== 'undefined') globalThis.EventBinder = EventBinder;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventBinder;
}
