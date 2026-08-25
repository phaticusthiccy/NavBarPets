/**
 * @file sanctuaryModule.js
 * @description Pet Sanctuary Gallery, Holographic Skin Switcher & Wardrobe Turntable Showcase Module.
 */

const SanctuaryModule = {
  activeWardrobePetId: 'neko',
  activeWardrobePose: 'idle_breathe',
  wardrobeTime: 0,

  /**
   * Generates interactive gallery cards for each pet species with segmented holographic skin chips.
   */
  renderPetCards() {
    const grid = document.getElementById('petCardsGrid');
    if (!grid) return;

    const lang = this.settings.language || 'tr';
    const activeLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_active', lang) : 'Aktif Pet';
    const pickLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_pick', lang) : 'Bu Peti Seç';
    const activeBadge = typeof i18n !== 'undefined' ? i18n.t('badge_active_pet', lang) : 'AKTİF';
    const skinLabel = typeof i18n !== 'undefined' ? i18n.t('skin_selector_label', lang) : 'Görünüm:';
    const legendaryLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_legendary', lang) || 'Efsanevi') : 'Efsanevi';
    const classicLabel = typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik';
    const mythicTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_mythic', lang) || 'MYTHIC') : 'MYTHIC';
    const retroTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_retro', lang) || 'CLASSIC') : 'CLASSIC';

    grid.innerHTML = PET_IDS.map((id) => {
      const pet = (typeof i18n !== 'undefined' && i18n.getPetData(id, lang)) || {
        name: id,
        species: id,
        traits: ['🐾 Pet'],
        desc: ''
      };
      const isSelected = id === this.settings.species;
      const currentSkin = (this.settings.petSkins && this.settings.petSkins[id]) || 'cool';
      const isClassic = currentSkin === 'classic';

      return `
        <div class="pet-card ${isSelected ? 'selected' : ''}" data-pet-id="${id}">
          ${isSelected ? `<span class="pet-active-badge">✓ ${activeBadge}</span>` : ''}
          
          <!-- Animated Preview Box with Dynamic Aura Halo -->
          <div class="pet-preview-box ${isClassic ? 'aura-classic' : 'aura-mythic'}" id="preview_box_${id}">
            <canvas id="canvas_preview_${id}" width="120" height="120" class="pet-preview-canvas"></canvas>
          </div>

          <div class="pet-info">
            <h2 class="pet-name">${pet.name}</h2>
            <div class="pet-species-type">${pet.species}</div>
            <div class="pet-traits">
              ${pet.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
            </div>
            
            <div class="pet-skin-showcase-box">
              <div class="skin-header-bar">
                <span class="skin-title-tag">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ${skinLabel}
                </span>
                <span class="skin-rarity-badge ${isClassic ? 'badge-classic' : 'badge-mythic'}" id="rarity_badge_${id}">
                  ${isClassic ? '★ ' + retroTag : '✦ ' + mythicTag}
                </span>
              </div>

              <div class="skin-toggle-group">
                <button type="button" class="skin-pill-btn ${!isClassic ? 'active mythic' : ''}" data-skin="cool" data-pet-id="${id}" title="${legendaryLabel}">
                  <span class="skin-glow-orb mythic-orb"></span>
                  <span class="skin-btn-text">${legendaryLabel}</span>
                </button>
                <button type="button" class="skin-pill-btn ${isClassic ? 'active classic' : ''}" data-skin="classic" data-pet-id="${id}" title="${classicLabel}">
                  <span class="skin-glow-orb classic-orb"></span>
                  <span class="skin-btn-text">${classicLabel}</span>
                </button>
              </div>
            </div>

            <!-- Action Buttons Grid -->
            <div class="pet-card-actions">
              <button type="button" class="btn-select-pet">
                ${isSelected ? activeLabel : pickLabel}
              </button>
              <button type="button" class="btn-wardrobe-inspect" data-pet-id="${id}" title="Vitrin / Detaylı İncele">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
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
      card.addEventListener('click', (e) => {
        if (e.target.closest('.pet-skin-showcase-box') || e.target.closest('.btn-wardrobe-inspect')) return;
        const petId = card.getAttribute('data-pet-id');
        this.selectPet(petId);
      });
    });

    // Attach interactive skin pill buttons
    document.querySelectorAll('.skin-pill-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petId = btn.getAttribute('data-pet-id');
        const skin = btn.getAttribute('data-skin');
        this.selectPetSkin(petId, skin);
      });
    });

    // Attach wardrobe showcase modal opener
    document.querySelectorAll('.btn-wardrobe-inspect').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petId = btn.getAttribute('data-pet-id');
        this.openWardrobeModal(petId);
      });
    });

    // Setup wardrobe modal controls if not already bound
    this.setupWardrobeModalEvents();
  },

  /**
   * Selects and broadcasts a new active pet species without destroying DOM tree.
   * @param {string} petId
   */
  selectPet(petId) {
    this.selectPetWithoutSave(petId);
    this.saveSettings();
  },

  /**
   * Synchronizes pet selection UI state smoothly.
   * @param {string} petId
   */
  selectPetWithoutSave(petId) {
    this.settings.species = petId;
    this.updateStatusBanner();

    const lang = this.settings.language || 'tr';
    const activeLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_active', lang) : 'Aktif Pet';
    const pickLabel = typeof i18n !== 'undefined' ? i18n.t('btn_select_pick', lang) : 'Bu Peti Seç';
    const activeBadge = typeof i18n !== 'undefined' ? i18n.t('badge_active_pet', lang) : 'AKTİF';

    document.querySelectorAll('.pet-card').forEach((card) => {
      const id = card.getAttribute('data-pet-id');
      const isSelected = id === petId;
      card.classList.toggle('selected', isSelected);

      const btn = card.querySelector('.btn-select-pet');
      if (btn) {
        btn.textContent = isSelected ? activeLabel : pickLabel;
      }

      let badge = card.querySelector('.pet-active-badge');
      if (isSelected) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'pet-active-badge';
          badge.textContent = `✓ ${activeBadge}`;
          card.prepend(badge);
        }
      } else if (badge) {
        badge.remove();
      }
    });
  },

  /**
   * Updates selected skin for a pet species, animates pill buttons, and persists.
   * @param {string} petId
   * @param {string} skin
   */
  selectPetSkin(petId, skin) {
    if (!this.settings.petSkins) this.settings.petSkins = {};
    this.settings.petSkins[petId] = skin;
    this.saveSettings();

    const lang = this.settings.language || 'tr';
    const isClassic = skin === 'classic';
    const mythicTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_mythic', lang) || 'MYTHIC') : 'MYTHIC';
    const retroTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_retro', lang) || 'CLASSIC') : 'CLASSIC';

    // Update in-card DOM elements directly for buttery smooth 60fps UX
    const box = document.getElementById(`preview_box_${petId}`);
    if (box) {
      box.className = `pet-preview-box ${isClassic ? 'aura-classic' : 'aura-mythic'}`;
    }

    const badge = document.getElementById(`rarity_badge_${petId}`);
    if (badge) {
      badge.className = `skin-rarity-badge ${isClassic ? 'badge-classic' : 'badge-mythic'}`;
      badge.textContent = isClassic ? '★ ' + retroTag : '✦ ' + mythicTag;
    }

    const card = document.querySelector(`.pet-card[data-pet-id="${petId}"]`);
    if (card) {
      card.querySelectorAll('.skin-pill-btn').forEach((b) => {
        const bSkin = b.getAttribute('data-skin');
        if (bSkin === skin) {
          b.className = `skin-pill-btn active ${isClassic ? 'classic' : 'mythic'}`;
        } else {
          b.className = 'skin-pill-btn';
        }
      });
    }

    const skinName = isClassic 
      ? (typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik')
      : (typeof i18n !== 'undefined' ? (i18n.t('skin_legendary', lang) || 'Efsanevi') : 'Efsanevi');
    const toastPrefix = typeof i18n !== 'undefined' ? i18n.t('toast_skin_changed', lang) : 'Görünüm: ';
    this.showToast('✨', `${toastPrefix}${skinName}`);
  },

  /**
   * Opens the Pet Wardrobe & Skin Showcase modal dialog.
   * @param {string} petId
   */
  openWardrobeModal(petId) {
    this.activeWardrobePetId = petId || this.settings.species || 'neko';
    this.activeWardrobePose = 'idle_breathe';
    const modal = document.getElementById('wardrobeModal');
    if (!modal) return;

    const lang = this.settings.language || 'tr';
    const pet = (typeof i18n !== 'undefined' && i18n.getPetData(this.activeWardrobePetId, lang)) || { name: this.activeWardrobePetId };
    const titleEl = document.getElementById('wardrobePetTitle');
    if (titleEl) {
      titleEl.textContent = `${pet.name} - ${lang === 'tr' ? 'Görünüm Vitrini' : 'Skin Showcase'}`;
    }

    this.renderWardrobeSkins();
    modal.style.display = 'flex';
  },

  /**
   * Closes the Wardrobe modal.
   */
  closeWardrobeModal() {
    const modal = document.getElementById('wardrobeModal');
    if (modal) modal.style.display = 'none';
  },

  /**
   * Renders the side-by-side skin cards inside the Wardrobe modal.
   */
  renderWardrobeSkins() {
    const grid = document.getElementById('wardrobeSkinsGrid');
    if (!grid) return;

    const petId = this.activeWardrobePetId;
    const currentSkin = (this.settings.petSkins && this.settings.petSkins[petId]) || 'cool';
    const lang = this.settings.language || 'tr';
    const isTr = lang === 'tr';

    const legendaryLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_legendary', lang) || 'Efsanevi') : 'Efsanevi';
    const classicLabel = typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik';

    grid.innerHTML = `
      <!-- Mythic Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'cool' || currentSkin === 'legendary' ? 'selected mythic' : ''}" data-skin="cool">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">✨ ${legendaryLabel}</span>
          <span class="skin-rarity-badge badge-mythic">✦ MYTHIC</span>
        </div>
        <p class="wardrobe-skin-desc">
          ${isTr 
            ? 'Yüksek çözünürlüklü neon partikül efektleri, dinamik gölgelendirme ve ultra detaylı anime/cyber kaplama.'
            : 'High-definition neon particle halos, dynamic ambient lighting, and sleek cyber-enhanced shaders.'}
        </p>
        <button type="button" class="wardrobe-equip-btn">
          ${(currentSkin === 'cool' || currentSkin === 'legendary') ? (isTr ? '✓ KUŞANILDI' : '✓ EQUIPPED') : (isTr ? 'Kuşan' : 'Equip')}
        </button>
      </div>

      <!-- Classic Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'classic' ? 'selected classic' : ''}" data-skin="classic">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">🌟 ${classicLabel}</span>
          <span class="skin-rarity-badge badge-classic">★ RETRO</span>
        </div>
        <p class="wardrobe-skin-desc">
          ${isTr
            ? 'Nostaljik sade retro piksel tarzı, orijinal renk paleti ve minimalist masaüstü estetiği.'
            : 'Nostalgic retro pixel palette, original vintage charm, and clean minimalist desktop aesthetic.'}
        </p>
        <button type="button" class="wardrobe-equip-btn">
          ${currentSkin === 'classic' ? (isTr ? '✓ KUŞANILDI' : '✓ EQUIPPED') : (isTr ? 'Kuşan' : 'Equip')}
        </button>
      </div>
    `;

    // Attach click events on wardrobe skin cards
    grid.querySelectorAll('.wardrobe-skin-card').forEach((card) => {
      card.addEventListener('click', () => {
        const skin = card.getAttribute('data-skin');
        this.selectPetSkin(petId, skin);
        this.renderWardrobeSkins();
      });
    });
  },

  /**
   * Configures event listeners for the Wardrobe Modal (close button, pose switchers).
   */
  setupWardrobeModalEvents() {
    const closeBtn = document.getElementById('btnWardrobeClose');
    if (closeBtn && !closeBtn._bound) {
      closeBtn._bound = true;
      closeBtn.addEventListener('click', () => this.closeWardrobeModal());
    }

    const modal = document.getElementById('wardrobeModal');
    if (modal && !modal._bound) {
      modal._bound = true;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeWardrobeModal();
      });
    }

    document.querySelectorAll('.wardrobe-pose-btn').forEach((btn) => {
      if (!btn._bound) {
        btn._bound = true;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.wardrobe-pose-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeWardrobePose = btn.getAttribute('data-pose') || 'idle_breathe';
        });
      }
    });
  },

  /**
   * Starts real-time render loop for pet preview cards in the gallery and turntable in wardrobe modal.
   */
  startPreviewRenderLoop() {
    const loop = () => {
      const dt = 0.016;
      this.renderer.update(dt);
      this.wardrobeTime += dt;

      // 1. Render all Gallery mini-cards
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
            skin: (this.settings.petSkins && this.settings.petSkins[id]) || 'cool',
            x: 60,
            y: 85,
            scale: 1.2,
            facing: 1,
            pose: pose,
            accessories: { hat: false, headphones: false, nightcap: false }
          });
        }
      });

      // 2. Render Wardrobe Modal Live Turntable if open
      const wardrobeCanvas = document.getElementById('wardrobePreviewCanvas');
      const wardrobeModal = document.getElementById('wardrobeModal');
      if (wardrobeCanvas && wardrobeModal && wardrobeModal.style.display !== 'none') {
        const wCtx = wardrobeCanvas.getContext('2d');
        wCtx.clearRect(0, 0, wardrobeCanvas.width, wardrobeCanvas.height);

        const currentSkin = (this.settings.petSkins && this.settings.petSkins[this.activeWardrobePetId]) || 'cool';
        const wPose = this.behaviors.calculatePose(
          this.activeWardrobePose,
          0.5,
          this.wardrobeTime,
          this.activeWardrobePetId
        );

        this.renderer.render(wCtx, {
          species: this.activeWardrobePetId,
          skin: currentSkin,
          x: 80,
          y: 115,
          scale: 1.6,
          facing: 1,
          pose: wPose,
          accessories: { hat: false, headphones: false, nightcap: false }
        });
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
};

if (typeof window !== 'undefined') window.SanctuaryModule = SanctuaryModule;
if (typeof globalThis !== 'undefined') globalThis.SanctuaryModule = SanctuaryModule;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SanctuaryModule;
}
