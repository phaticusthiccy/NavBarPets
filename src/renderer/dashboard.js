/**
 * @file dashboard.js
 * @description Dashboard Application Controller & UI View Model for NavBarPets.
 * Handles pet gallery selection, live preview rendering loops, sleep scheduling,
 * media status telemetry, ground geometry sliders, and application themes.
 */

const PET_CATALOG = [
  {
    id: 'neko',
    name: 'Neko Kedi',
    species: 'Felis Catus',
    traits: ['🐱 Meraklı', '✨ Çevik', '💤 Ekmek Somunu'],
    desc: 'Pati atar, gerinir, kelebek kovalar ve müzikte disko dansı yapar.'
  },
  {
    id: 'shiba',
    name: 'Shiba Inu',
    species: 'Canis Familiaris',
    traits: ['🐕 Sadık', '⚡ Zoomies', '🍖 Kemik Avcısı'],
    desc: 'Kuyruğunu sallar, yeri koklar, blep yapar ve neşeyle koşar.'
  },
  {
    id: 'slime',
    name: 'Cyber Slime',
    species: 'Digitalis Amoeba',
    traits: ['🟢 Neon Jel', '✨ Parıldayan', '🔮 Yaylanan'],
    desc: 'Holografik çekirdeğe sahiptir, jöle gibi esner ve parıldar.'
  },
  {
    id: 'dragon',
    name: 'Mini Dragon',
    species: 'Draco Chibi',
    traits: ['🐉 Ateş Nefesi', '✨ Kanat Çırpma', '👑 Efsanevi'],
    desc: 'Duman halkaları çıkarır, havada süzülür ve kuyruğuna sarılır.'
  },
  {
    id: 'duck',
    name: 'Pixel Duck',
    species: 'Anas Platyrhynchos',
    traits: ['🦆 Paytak', '💧 Yüzücü', '🎵 360 Spin'],
    desc: 'Paytak adımlarla yürür, suya dalar ve dönerek dans eder.'
  },
  {
    id: 'fox',
    name: 'Kitsune Fox',
    species: 'Vulpes Vulpes',
    traits: ['🦊 Çevik', '🔥 Ateş Kuyruğu', '✨ Büyülü'],
    desc: 'Büyük kabarık tilki kuyruğu sallar, büyülü parıltılar saçar ve merakla zıplar.'
  },
  {
    id: 'bunny',
    name: 'Mochi Bunny',
    species: 'Oryctolagus Chibi',
    traits: ['🐰 Pofuduk', '🥕 Havuç Seven', '⚡ Zıp Zıp'],
    desc: 'Uzun kulaklarını oynatır, minik burnunu seğirtir ve neşeyle zıp zıp zıplar.'
  },
  {
    id: 'penguin',
    name: 'Chilly Penguin',
    species: 'Aptenodytes Micro',
    traits: ['🐧 Sevimli', '❄️ Kış Atkısı', '🐟 Paytak Yürüyüş'],
    desc: 'Minik kanatlarını çırpar, kırmızı kış atkısını savurur ve neşeyle gezinir.'
  }
];

class DashboardApp {
  constructor() {
    this.settings = {
      species: 'neko',
      scale: 1.0,
      theme: 'theme-midnight',
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
    const box = document.getElementById('nowPlayingBox');
    const liveBadge = document.getElementById('mediaLiveBadge');
    const liveText = document.getElementById('mediaLiveStatusText');
    const titleEl = document.getElementById('nowPlayingTitle');
    const artistEl = document.getElementById('nowPlayingArtist');
    const sourceEl = document.getElementById('nowPlayingSource');

    if (media.isPlaying) {
      if (box) box.classList.add('playing');
      if (liveBadge) liveBadge.classList.add('playing');
      if (liveText) liveText.textContent = 'Müzik Çalıyor';
      if (titleEl) titleEl.textContent = media.title || 'Aktif Parça';
      if (artistEl) artistEl.textContent = media.artist || 'Sanatçı Bilgisi Yok';
      if (sourceEl) sourceEl.textContent = media.source || 'Medya';
    } else {
      if (box) box.classList.remove('playing');
      if (liveBadge) liveBadge.classList.remove('playing');
      if (liveText) liveText.textContent = 'Müzik Yok (Sessiz)';
      if (titleEl) titleEl.textContent = 'Şu Anda Müzik Çalmıyor';
      if (artistEl) artistEl.textContent = "Spotify veya YouTube'dan bir şarkı açın";
      if (sourceEl) sourceEl.textContent = 'Sessiz';
    }
  }

  /**
   * Evaluates taskbar position compatibility and displays warning banner if required.
   * @param {Object} taskbarInfo
   */
  updateTaskbarStatus(taskbarInfo) {
    if (!taskbarInfo) return;
    const banner = document.getElementById('taskbarWarningBanner');
    const warningText = document.getElementById('taskbarWarningText');
    const moodEl = document.getElementById('petCurrentMood');
    const indicatorEl = document.querySelector('.status-indicator');

    if (!taskbarInfo.isValid) {
      if (banner) banner.style.display = 'flex';
      if (warningText && taskbarInfo.warningMessage) {
        warningText.textContent = taskbarInfo.warningMessage;
      }
      if (moodEl) moodEl.textContent = '⚠️ Görev Çubuğu Uygun Değil';
      if (indicatorEl) {
        indicatorEl.classList.remove('live');
        indicatorEl.classList.add('warning');
      }
    } else {
      if (banner) banner.style.display = 'none';
      if (moodEl) moodEl.textContent = 'Görev Çubuğunda Aktif';
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

    grid.innerHTML = PET_CATALOG.map((pet) => `
      <div class="pet-card ${pet.id === this.settings.species ? 'selected' : ''}" data-pet-id="${pet.id}">
        <div class="pet-preview-box">
          <canvas id="canvas_preview_${pet.id}" width="120" height="120" class="pet-preview-canvas"></canvas>
        </div>
        <div class="pet-info">
          <h2 class="pet-name">${pet.name}</h2>
          <div class="pet-species-type">${pet.species}</div>
          <div class="pet-traits">
            ${pet.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
          </div>
          <button class="btn-select-pet">
            ${pet.id === this.settings.species ? 'Aktif Pet' : 'Bu Peti Seç'}
          </button>
        </div>
      </div>
    `).join('');

    // Cache canvas elements and randomized time offsets
    PET_CATALOG.forEach((pet) => {
      const c = document.getElementById(`canvas_preview_${pet.id}`);
      if (c) {
        this.previewCanvases[pet.id] = c;
        this.previewTimes[pet.id] = Math.random() * 10;
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
    const petObj = PET_CATALOG.find(p => p.id === this.settings.species);
    const activeNameEl = document.getElementById('activePetName');
    if (activeNameEl && petObj) {
      activeNameEl.textContent = petObj.name;
    }
  }

  /**
   * Attaches event listeners to sidebar tabs, sliders, toggles, and buttons.
   */
  bindEvents() {
    // 1. Sidebar Tab Navigation
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        const tabId = item.getAttribute('data-tab');
        const pane = document.getElementById(`tab-${tabId}`);
        if (pane) pane.classList.add('active');
      });
    });

    // 2. Window Controls
    const btnMinimize = document.getElementById('btnMinimizeTray');
    if (btnMinimize) {
      btnMinimize.addEventListener('click', () => {
        if (window.dashboardAPI) window.dashboardAPI.minimizeToTray();
      });
    }

    const btnClose = document.getElementById('btnClose');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        if (window.dashboardAPI) {
          if (this.settings.minimizeToTray) {
            window.dashboardAPI.minimizeToTray();
          } else {
            window.dashboardAPI.closeApp();
          }
        }
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
        if (labelAudioSens) {
          labelAudioSens.textContent = val > 0.7 ? 'Yüksek' : val < 0.4 ? 'Düşük' : 'Orta';
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

    // 5. Themes & Windows Preferences
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

    const toggleAutoSleep = document.getElementById('toggleAutoSleep');
    if (toggleAutoSleep) toggleAutoSleep.checked = this.settings.sleepSchedule.enabled;

    const inputSleepTime = document.getElementById('inputSleepTime');
    if (inputSleepTime) inputSleepTime.value = this.settings.sleepSchedule.sleepTime;

    const inputWakeTime = document.getElementById('inputWakeTime');
    if (inputWakeTime) inputWakeTime.value = this.settings.sleepSchedule.wakeTime;

    const toggleAudioDance = document.getElementById('toggleAudioDance');
    if (toggleAudioDance) toggleAudioDance.checked = this.settings.audio.enabled;

    const sliderAudioSens = document.getElementById('sliderAudioSens');
    if (sliderAudioSens) sliderAudioSens.value = this.settings.audio.sensitivity;

    const sliderPetScale = document.getElementById('sliderPetScale');
    if (sliderPetScale) sliderPetScale.value = this.settings.scale;

    const labelPetScale = document.getElementById('labelPetScale');
    if (labelPetScale) labelPetScale.textContent = `${this.settings.scale.toFixed(1)}x`;

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

      PET_CATALOG.forEach((pet) => {
        const c = this.previewCanvases[pet.id];
        if (c) {
          const ctx = c.getContext('2d');
          ctx.clearRect(0, 0, c.width, c.height);

          this.previewTimes[pet.id] += dt;
          const pose = this.behaviors.calculatePose(
            'idle_breathe',
            0.5,
            this.previewTimes[pet.id],
            pet.id
          );

          this.renderer.render(ctx, {
            species: pet.id,
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
