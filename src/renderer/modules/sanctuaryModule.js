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
    const pixelLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_pixel', lang) || 'Pixel Art') : 'Pixel Art';
    const mythicTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_mythic', lang) || 'MYTHIC') : 'MYTHIC';
    const retroTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_retro', lang) || 'CLASSIC') : 'CLASSIC';
    const pixelTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_pixel', lang) || '8-BIT') : '8-BIT';

    grid.innerHTML = PET_IDS.map((id) => {
      const pet = (typeof i18n !== 'undefined' && i18n.getPetData(id, lang)) || {
        name: id,
        species: id,
        traits: ['🐾 Pet'],
        desc: ''
      };
      const isSelected = id === this.settings.species;
      const currentSkin = (this.settings.petSkins && this.settings.petSkins[id]) || 'classic';
      const isClassic = currentSkin === 'classic';
      const isPixel = currentSkin === 'pixel';
      const isSakura = currentSkin === 'sakura';
      const isEvori = currentSkin === 'evori';
      const isMythic = currentSkin === 'cool' || currentSkin === 'legendary';
      
      const legendaryLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_legendary', lang) || 'Efsanevi') : 'Efsanevi';
      const classicLabel = typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik';
      const pixelLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_pixel', lang) || 'Pixel Art') : 'Pixel Art';
      const sakuraLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_sakura', lang) || 'Sakura') : 'Sakura';
      const evoriLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_evori', lang) || 'Evori') : 'Evori';
      const mythicTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_mythic', lang) || 'MYTHIC') : 'MYTHIC';
      const retroTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_retro', lang) || 'CLASSIC') : 'CLASSIC';
      const pixelTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_pixel', lang) || '8-BIT') : '8-BIT';
      const sakuraTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_sakura', lang) || 'SAKURA') : 'SAKURA';
      const evoriTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_evori', lang) || 'DREAMWINGS') : 'DREAMWINGS';
      
      const badgeText = isClassic ? '★ ' + retroTag : isPixel ? '👾 ' + pixelTag : isSakura ? '🌸 ' + sakuraTag : isEvori ? '✨ ' + evoriTag : '✦ ' + mythicTag;
      const badgeClass = isClassic ? 'badge-classic' : isPixel ? 'badge-pixel' : isSakura ? 'badge-sakura' : isEvori ? 'badge-evori' : 'badge-mythic';
      const auraClass = isClassic ? 'aura-classic' : isPixel ? 'aura-pixel' : isSakura ? 'aura-sakura' : isEvori ? 'aura-evori' : 'aura-mythic';

      return `
        <div class="pet-card ${isSelected ? 'selected' : ''}" data-pet-id="${id}">
          ${isSelected ? `<span class="pet-active-badge">✓ ${activeBadge}</span>` : ''}
          
          <div class="pet-preview-box ${auraClass}" id="preview_box_${id}">
            <canvas id="canvas_preview_${id}" class="pet-preview-canvas" width="120" height="120"></canvas>
          </div>

          <div class="pet-info">
            <h3 class="pet-name">${pet.name}</h3>
            <p class="pet-species-type">${pet.species}</p>
            
            <div class="pet-traits">
              ${pet.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
            </div>
            
            <div class="pet-skin-showcase-box">
              <div class="skin-header-bar">
                <span class="skin-title-tag">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ${skinLabel}
                </span>
                <span class="skin-rarity-badge ${badgeClass}" id="rarity_badge_${id}">
                  ${badgeText}
                </span>
              </div>

              <div class="skin-toggle-group">
                <button type="button" class="skin-pill-btn ${isMythic ? 'active mythic' : ''}" data-skin="cool" data-pet-id="${id}" title="${legendaryLabel}">
                  <span class="skin-glow-orb mythic-orb"></span>
                  <span class="skin-btn-text">${legendaryLabel}</span>
                </button>
                <button type="button" class="skin-pill-btn ${isClassic ? 'active classic' : ''}" data-skin="classic" data-pet-id="${id}" title="${classicLabel}">
                  <span class="skin-glow-orb classic-orb"></span>
                  <span class="skin-btn-text">${classicLabel}</span>
                </button>
                <button type="button" class="skin-pill-btn ${isPixel ? 'active pixel' : ''}" data-skin="pixel" data-pet-id="${id}" title="${pixelLabel}">
                  <span class="skin-glow-orb pixel-orb"></span>
                  <span class="skin-btn-text">${pixelLabel}</span>
                </button>
                <button type="button" class="skin-pill-btn ${isSakura ? 'active sakura' : ''}" data-skin="sakura" data-pet-id="${id}" title="${sakuraLabel}">
                  <span class="skin-glow-orb sakura-orb"></span>
                  <span class="skin-btn-text">${sakuraLabel}</span>
                </button>
                <button type="button" class="skin-pill-btn ${isEvori ? 'active evori' : ''}" data-skin="evori" data-pet-id="${id}" title="${evoriLabel}">
                  <span class="skin-glow-orb evori-orb"></span>
                  <span class="skin-btn-text">${evoriLabel}</span>
                </button>
              </div>
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

    // Cache canvas elements, contexts, and randomized time offsets
    this.previewContexts = {};
    this._visiblePetCards = new Set();

    PET_IDS.forEach((id) => {
      const c = document.getElementById(`canvas_preview_${id}`);
      if (c) {
        this.previewCanvases[id] = c;
        this.previewContexts[id] = c.getContext('2d');
        if (!this.previewTimes[id]) {
          this.previewTimes[id] = Math.random() * 10;
        }
      }
    });

    // Setup IntersectionObserver for high-performance rendering (culls off-screen cards)
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      if (this._cardObserver) this._cardObserver.disconnect();
      this._cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const petId = entry.target.getAttribute('data-pet-id');
          if (petId) {
            if (entry.isIntersecting) {
              this._visiblePetCards.add(petId);
            } else {
              this._visiblePetCards.delete(petId);
            }
          }
        });
      }, { rootMargin: '50px 0px 50px 0px', threshold: 0.01 });

      document.querySelectorAll('.pet-card').forEach((card) => {
        this._cardObserver.observe(card);
      });
    } else {
      PET_IDS.forEach(id => this._visiblePetCards.add(id));
    }

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
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';
    const mythicTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_mythic', lang) || 'MYTHIC') : 'MYTHIC';
    const retroTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_retro', lang) || 'CLASSIC') : 'CLASSIC';
    const pixelTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_pixel', lang) || '8-BIT') : '8-BIT';
    const sakuraTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_sakura', lang) || 'SAKURA') : 'SAKURA';
    const evoriTag = typeof i18n !== 'undefined' ? (i18n.t('skin_tag_evori', lang) || 'DREAMWINGS') : 'DREAMWINGS';

    // Update in-card DOM elements directly for buttery smooth 60fps UX
    const box = document.getElementById(`preview_box_${petId}`);
    if (box) {
      box.className = `pet-preview-box ${isClassic ? 'aura-classic' : isPixel ? 'aura-pixel' : isSakura ? 'aura-sakura' : isEvori ? 'aura-evori' : 'aura-mythic'}`;
    }

    const badge = document.getElementById(`rarity_badge_${petId}`);
    if (badge) {
      badge.className = `skin-rarity-badge ${isClassic ? 'badge-classic' : isPixel ? 'badge-pixel' : isSakura ? 'badge-sakura' : isEvori ? 'badge-evori' : 'badge-mythic'}`;
      badge.textContent = isClassic ? '★ ' + retroTag : isPixel ? '👾 ' + pixelTag : isSakura ? '🌸 ' + sakuraTag : isEvori ? '✨ ' + evoriTag : '✦ ' + mythicTag;
    }

    const card = document.querySelector(`.pet-card[data-pet-id="${petId}"]`);
    if (card) {
      card.querySelectorAll('.skin-pill-btn').forEach((b) => {
        const bSkin = b.getAttribute('data-skin');
        if (bSkin === skin) {
          b.className = `skin-pill-btn active ${isClassic ? 'classic' : isPixel ? 'pixel' : isSakura ? 'sakura' : isEvori ? 'evori' : 'mythic'}`;
        } else {
          b.className = 'skin-pill-btn';
        }
      });
    }

    const skinName = isClassic 
      ? (typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik')
      : isPixel
        ? (typeof i18n !== 'undefined' ? (i18n.t('skin_pixel', lang) || 'Pixel Art') : 'Pixel Art')
        : isSakura
          ? (typeof i18n !== 'undefined' ? (i18n.t('skin_sakura', lang) || 'Sakura') : 'Sakura')
          : isEvori
            ? (typeof i18n !== 'undefined' ? (i18n.t('skin_evori', lang) || 'Evori') : 'Evori')
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
    const currentSkin = (this.settings.petSkins && this.settings.petSkins[petId]) || 'classic';
    const lang = this.settings.language || 'tr';
    const isTr = lang === 'tr';

    const legendaryLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_legendary', lang) || 'Efsanevi') : 'Efsanevi';
    const classicLabel = typeof i18n !== 'undefined' ? i18n.t('skin_classic', lang) : 'Klasik';
    const pixelLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_pixel', lang) || 'Pixel Art') : 'Pixel Art';
    const sakuraLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_sakura', lang) || 'Sakura') : 'Sakura';
    const evoriLabel = typeof i18n !== 'undefined' ? (i18n.t('skin_evori', lang) || 'Evori') : 'Evori';

    grid.innerHTML = `
      <!-- Mythic Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'cool' || currentSkin === 'legendary' ? 'selected mythic' : ''}" data-skin="cool">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">✦ ${legendaryLabel}</span>
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
          <span class="wardrobe-skin-name">★ ${classicLabel}</span>
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

      <!-- Pixel Art Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'pixel' ? 'selected pixel' : ''}" data-skin="pixel">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">👾 ${pixelLabel}</span>
          <span class="skin-rarity-badge badge-pixel">👾 PIXEL</span>
        </div>
        <p class="wardrobe-skin-desc">
          ${isTr
            ? '8-bit retro piksel sanatı estetiği, özel pikselize morfolojik detaylar ve nostaljik arcade havası.'
            : 'Authentic 8-bit arcade pixel styling, unique quantized morphological details, and nostalgic retro gaming vibes.'}
        </p>
        <button type="button" class="wardrobe-equip-btn">
          ${currentSkin === 'pixel' ? (isTr ? '✓ KUŞANILDI' : '✓ EQUIPPED') : (isTr ? 'Kuşan' : 'Equip')}
        </button>
      </div>

      <!-- Sakura Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'sakura' ? 'selected sakura' : ''}" data-skin="sakura">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">🌸 ${sakuraLabel}</span>
          <span class="skin-rarity-badge badge-sakura">🌸 SAKURA</span>
        </div>
        <p class="wardrobe-skin-desc">
          ${isTr
            ? 'Japon baharı ve kiraz çiçekleri esintisi, uçuşan sakura yaprakları, çiçek aksesuarları ve pastel bahar paleti.'
            : 'Japanese spring & cherry blossom breeze, drifting sakura petals, floral accessories, and serene pastel palettes.'}
        </p>
        <button type="button" class="wardrobe-equip-btn">
          ${currentSkin === 'sakura' ? (isTr ? '✓ KUŞANILDI' : '✓ EQUIPPED') : (isTr ? 'Kuşan' : 'Equip')}
        </button>
      </div>

      <!-- Evori Dreamwings Skin Card -->
      <div class="wardrobe-skin-card ${currentSkin === 'evori' ? 'selected evori' : ''}" data-skin="evori">
        <div class="wardrobe-skin-card-header">
          <span class="wardrobe-skin-name">✨ ${evoriLabel}</span>
          <span class="skin-rarity-badge badge-evori">✨ EVORI</span>
        </div>
        <p class="wardrobe-skin-desc">
          ${isTr
            ? 'Evori Dreamwings büyülü ruh yoldaşları; parıldayan rüya kanatları, yıldız halosu ve dönen takımyıldız tozları.'
            : 'Evori Dreamwings celestial familiars; glowing fairy dreamwings, sparkling star halo, and orbiting astral constellation dust.'}
        </p>
        <button type="button" class="wardrobe-equip-btn">
          ${currentSkin === 'evori' ? (isTr ? '✓ KUŞANILDI' : '✓ EQUIPPED') : (isTr ? 'Kuşan' : 'Equip')}
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
   * Starts high-performance real-time render loop for pet preview cards and wardrobe turntable.
   * Features:
   * 1. Duplicate loop prevention (cancels prior RAF IDs).
   * 2. Tab & modal visibility culling (0% CPU when tab is inactive).
   * 3. IntersectionObserver culling (only renders visible cards).
   * 4. 30 FPS pacing for mini gallery cards, 60 FPS for active modal turntable.
   */
  startPreviewRenderLoop() {
    if (this._previewRafId) {
      cancelAnimationFrame(this._previewRafId);
      this._previewRafId = null;
    }

    let lastCardRenderTime = 0;
    const CARD_FPS = 30;
    const CARD_INTERVAL = 1000 / CARD_FPS; // ~33.3ms for buttery smooth, lightweight animation

    const loop = (timestamp) => {
      // 1. Tab visibility check: only compute if Sanctuary tab is active or modal is open
      const sanctuaryTab = document.getElementById('tab-sanctuary');
      const isSanctuaryActive = sanctuaryTab && sanctuaryTab.classList.contains('active');
      const wardrobeModal = document.getElementById('wardrobeModal');
      const isWardrobeOpen = wardrobeModal && wardrobeModal.style.display !== 'none';

      if (!isSanctuaryActive && !isWardrobeOpen) {
        this._previewRafId = requestAnimationFrame(loop);
        return;
      }

      const dt = 0.016;
      this.renderer.update(dt);

      // 2. Prioritize Wardrobe Modal live turntable (60 FPS on 1 single canvas)
      if (isWardrobeOpen) {
        this.wardrobeTime += dt;
        const wardrobeCanvas = document.getElementById('wardrobePreviewCanvas');
        if (wardrobeCanvas) {
          if (!this._wardrobeCtx) this._wardrobeCtx = wardrobeCanvas.getContext('2d');
          const wCtx = this._wardrobeCtx;
          wCtx.clearRect(0, 0, wardrobeCanvas.width, wardrobeCanvas.height);

          const currentSkin = (this.settings.petSkins && this.settings.petSkins[this.activeWardrobePetId]) || 'classic';
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
      } else if (isSanctuaryActive) {
        // 3. Render gallery cards paced at 30 FPS, rendering only visible cards
        if (!timestamp || (timestamp - lastCardRenderTime >= CARD_INTERVAL)) {
          lastCardRenderTime = timestamp || performance.now();

          for (let i = 0; i < PET_IDS.length; i++) {
            const id = PET_IDS[i];
            // Skip cards scrolled out of view
            if (this._visiblePetCards && this._visiblePetCards.size > 0 && !this._visiblePetCards.has(id)) {
              continue;
            }

            const c = this.previewCanvases[id];
            if (c) {
              if (!this.previewContexts) this.previewContexts = {};
              if (!this.previewContexts[id]) this.previewContexts[id] = c.getContext('2d');
              const ctx = this.previewContexts[id];

              ctx.clearRect(0, 0, c.width, c.height);

              this.previewTimes[id] = (this.previewTimes[id] || 0) + 0.033;
              const pose = this.behaviors.calculatePose(
                'idle_breathe',
                0.5,
                this.previewTimes[id],
                id
              );

              this.renderer.render(ctx, {
                species: id,
                skin: (this.settings.petSkins && this.settings.petSkins[id]) || 'classic',
                x: 60,
                y: 85,
                scale: 1.2,
                facing: 1,
                pose: pose,
                accessories: { hat: false, headphones: false, nightcap: false }
              });
            }
          }
        }
      }

      this._previewRafId = requestAnimationFrame(loop);
    };

    this._previewRafId = requestAnimationFrame(loop);
  }
};

if (typeof window !== 'undefined') window.SanctuaryModule = SanctuaryModule;
if (typeof globalThis !== 'undefined') globalThis.SanctuaryModule = SanctuaryModule;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SanctuaryModule;
}
