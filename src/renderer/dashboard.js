/**
 * @file dashboard.js
 * @description Dashboard Application Controller & UI View Model for NavBarPets.
 * Handles pet gallery selection, live preview rendering loops, sleep scheduling,
 * media status telemetry, ground geometry sliders, application themes, and multi-language i18n.
 */

const PET_IDS = ['neko', 'shiba', 'slime', 'dragon', 'duck', 'fox', 'bunny', 'penguin', 'jett', 'mario', 'pikachu'];

class DashboardApp {
  constructor() {
    this.settings = {
      species: 'neko',
      scale: 1.0,
      theme: 'theme-midnight',
      language: 'tr',
      startup: false,
      minimizeToTray: true,
      groundMode: 'taskbar_bottom',
      floorOffset: 0,
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

    this.renderer = new PetRenderer();
    this.behaviors = new AnimationBehaviors();
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
    if (window.dashboardAPI) {
      try {
        const saved = await window.dashboardAPI.getSettings();
        if (saved) {
          this.settings = { ...this.settings, ...saved };
        }
        const taskbarInfo = await window.dashboardAPI.getTaskbarInfo();
        this.updateTaskbarStatus(taskbarInfo);

        const mediaStatus = await window.dashboardAPI.getMediaStatus();
        this.updateMediaStatus(mediaStatus);
      } catch (err) {
        console.warn('[DashboardApp] IPC communication error during initialization:', err);
      }

      window.dashboardAPI.onTaskbarStatus((info) => {
        this.updateTaskbarStatus(info);
      });

      window.dashboardAPI.onMediaStatus((media) => {
        this.updateMediaStatus(media);
      });
    }

    if (typeof i18n !== 'undefined') {
      i18n.setLanguage(this.settings.language || 'tr');
    }

    this.applyTheme(this.settings.theme);
    this.renderPetCards();
    this.bindEvents();
    this.updateUIFromSettings();
    this.startPreviewRenderLoop();
  }

  /**
   * Updates real-time Now Playing media widget with track info and animations.
   * @param {Object} media - Media telemetry status
   */
  updateMediaStatus(media) {
    if (!media) return;
    this.lastMediaStatus = media;

    const box = document.getElementById('nowPlayingBox');
    const liveBadge = document.getElementById('mediaLiveBadge');
    const liveText = document.getElementById('mediaLiveStatusText');
    const titleEl = document.getElementById('nowPlayingTitle');
    const artistEl = document.getElementById('nowPlayingArtist');
    const sourceEl = document.getElementById('nowPlayingSource');
    const lang = this.settings.language || 'tr';

    const playingText = typeof i18n !== 'undefined' ? i18n.t('media_live_playing', lang) : 'Müzik Çalıyor';
    const silentText = typeof i18n !== 'undefined' ? i18n.t('media_live_silent', lang) : 'Müzik Yok (Sessiz)';
    const silentTitle = typeof i18n !== 'undefined' ? i18n.t('media_silent_title', lang) : 'Şu Anda Müzik Çalmıyor';
    const silentDesc = typeof i18n !== 'undefined' ? i18n.t('media_silent_desc', lang) : "Spotify veya YouTube'dan bir şarkı açın";
    const systemSource = typeof i18n !== 'undefined' ? i18n.t('media_source_system', lang) : 'Sistem';
    const silentSource = typeof i18n !== 'undefined' ? i18n.t('media_source_silent', lang) : 'Sessiz';

    if (media.isPlaying) {
      if (box) box.classList.add('playing');
      if (liveBadge) liveBadge.classList.add('playing');
      if (liveText) liveText.textContent = playingText;
      if (titleEl) titleEl.textContent = media.title || (lang === 'tr' ? 'Aktif Parça' : 'Active Track');
      if (artistEl) artistEl.textContent = media.artist || (lang === 'tr' ? 'Sanatçı Bilgisi Yok' : 'Unknown Artist');
      if (sourceEl) sourceEl.textContent = media.source || systemSource;
    } else {
      if (box) box.classList.remove('playing');
      if (liveBadge) liveBadge.classList.remove('playing');
      if (liveText) liveText.textContent = silentText;
      if (titleEl) titleEl.textContent = silentTitle;
      if (artistEl) artistEl.textContent = silentDesc;
      if (sourceEl) sourceEl.textContent = silentSource;
    }
  }

  /**
   * Evaluates taskbar position compatibility and displays warning banner if required.
   * @param {Object} taskbarInfo
   */
  updateTaskbarStatus(taskbarInfo) {
    if (!taskbarInfo) return;
    this.lastTaskbarInfo = taskbarInfo;

    const banner = document.getElementById('taskbarWarningBanner');
    const warningTitle = document.querySelector('.warning-title');
    const warningText = document.getElementById('taskbarWarningText');
    const moodEl = document.getElementById('petCurrentMood');
    const indicatorEl = document.querySelector('.status-indicator');
    const lang = this.settings.language || 'tr';

    if (!taskbarInfo.isValid) {
      if (banner) banner.style.display = 'flex';
      if (warningTitle) {
        warningTitle.textContent = typeof i18n !== 'undefined' ? i18n.t('warning_title', lang) : 'Görev Çubuğu Alt Konumda Değil';
      }
      if (warningText) {
        warningText.textContent = typeof i18n !== 'undefined' ? i18n.t('warning_desc', lang) : 'NavBarPets petlerinin görev çubuğunun üzerinde yürümesi için Windows Görev Çubuğunun ekranın ALT kısmında yer alması gerekir.';
      }
      if (moodEl) moodEl.textContent = typeof i18n !== 'undefined' ? i18n.t('status_unsupported', lang) : '⚠️ Görev Çubuğu Uygun Değil';
      if (indicatorEl) {
        indicatorEl.classList.remove('live');
        indicatorEl.classList.add('warning');
      }
    } else {
      if (banner) banner.style.display = 'none';
      if (moodEl) moodEl.textContent = typeof i18n !== 'undefined' ? i18n.t('status_active', lang) : 'Görev Çubuğunda Aktif';
      if (indicatorEl) {
        indicatorEl.classList.add('live');
        indicatorEl.classList.remove('warning');
      }
    }
  }

  /**
   * Generates interactive gallery cards for each pet species.
   */
  renderPetCards() {
    const grid = document.getElementById('petCardsGrid');
    if (!grid) return;

    const lang = this.settings.language || 'tr';
    const activeLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_active', lang) : 'Aktif Pet';
    const pickLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_pick', lang) : 'Bu Peti Seç';
    const activeBadge = typeof i18n !== 'undefined' ? i18n.t('badge_active_pet', lang) : 'AKTİF';

    grid.innerHTML = PET_IDS.map((id) => {
      const pet = (typeof i18n !== 'undefined' && i18n.getPetData(id, lang)) || {
        name: id,
        species: id,
        traits: ['🐾 Pet'],
        desc: ''
      };
      const isSelected = id === this.settings.species;

      return `
        <div class="pet-card ${isSelected ? 'selected' : ''}" data-pet-id="${id}">
          ${isSelected ? `<span class="pet-active-badge">✓ ${activeBadge}</span>` : ''}
          <div class="pet-preview-box">
            <canvas id="canvas_preview_${id}" width="120" height="120" class="pet-preview-canvas"></canvas>
          </div>
          <div class="pet-info">
            <h2 class="pet-name">${pet.name}</h2>
            <div class="pet-species-type">${pet.species}</div>
            <div class="pet-traits">
              ${pet.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
            </div>
            <button class="btn-select-pet">
              ${isSelected ? activeLabel : pickLabel}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Cache canvas elements and randomized time offsets
    PET_IDS.forEach((id) => {
      const c = document.getElementById(`canvas_preview_${id}`);
      if (c) {
        this.previewCanvases[id] = c;
        if (!this.previewTimes[id]) {
          this.previewTimes[id] = Math.random() * 10;
        }
      }
    });

    // Attach card click handlers
    document.querySelectorAll('.pet-card').forEach((card) => {
      card.addEventListener('click', () => {
        const petId = card.getAttribute('data-pet-id');
        this.selectPet(petId);
      });
    });
  }

  /**
   * Selects and broadcasts a new active pet species.
   * @param {string} petId
   */
  selectPet(petId) {
    this.settings.species = petId;
    this.updateStatusBanner();
    this.renderPetCards();
    this.saveSettings();
  }

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
  }

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
  }

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

    // 4. Reactions & Audio Controls
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
        if (labelPetScale) labelPetScale.textContent = `${val.toFixed(1)}x`;
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

    // 5. Language Selector Options
    document.querySelectorAll('.language-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        this.changeLanguage(lang);
      });
    });

    // 6. Themes & Windows Preferences
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
  }

  /**
   * Applies CSS theme class to document body.
   * @param {string} themeName
   */
  applyTheme(themeName) {
    document.body.className = themeName || 'theme-midnight';
  }

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
  }

  /**
   * Persists settings to disk and broadcasts via IPC.
   */
  async saveSettings() {
    if (window.dashboardAPI) {
      await window.dashboardAPI.saveSettings(this.settings);
    }
  }

  /**
   * Starts real-time render loop for pet preview cards in the gallery.
   */
  startPreviewRenderLoop() {
    const loop = () => {
      const dt = 0.016;
      this.renderer.update(dt);

      PET_IDS.forEach((id) => {
        const c = this.previewCanvases[id];
        if (c) {
          const ctx = c.getContext('2d');
          ctx.clearRect(0, 0, c.width, c.height);

          this.previewTimes[id] += dt;
          const pose = this.behaviors.calculatePose(
            'idle_breathe',
            0.5,
            this.previewTimes[id],
            id
          );

          this.renderer.render(ctx, {
            species: id,
            x: 60,
            y: 85,
            scale: 1.2,
            facing: 1,
            pose: pose,
            accessories: { hat: false, headphones: false, nightcap: false }
          });
        }
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new DashboardApp();
});
