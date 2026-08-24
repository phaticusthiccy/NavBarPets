/**
 * @file petEngine.js
 * @description Core Pet Simulation & Animation Engine for NavBarPets.
 * Coordinates 60 FPS physics loops, skeletal pose blending, pointer event capture,
 * floor geometry alignment, audio reactions, and sleep schedule timers.
 */

class PetEngine {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Subsystems
    this.particles = new ParticleSystem();
    this.renderer = new PetRenderer();
    this.behaviors = new AnimationBehaviors();
    this.transitioner = new StateTransitioner(this.behaviors, this.particles);
    this.audio = new AudioReactive();

    // Pet Configuration
    this.species = 'neko';
    this.scale = 1.0;
    this.facing = 1; // 1: Facing right, -1: Facing left
    this.accessories = {
      hat: false,
      headphones: false,
      nightcap: false
    };

    // Position, Floor Baseline & Kinematics
    this.x = 200;
    this.groundMode = 'taskbar_bottom';
    this.floorOffset = 0;
    this.taskbarHeight = 48;
    this.floorY = 126;
    this.y = this.floorY;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 980; // px/s^2
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.pettingDistance = 0;

    // Sleep Schedule Configuration
    this.sleepSchedule = {
      enabled: false,
      sleepTime: '23:00',
      wakeTime: '08:00'
    };

    // Frame Loop Timing
    this.lastTime = performance.now();
    this.isRunning = false;

    // Audio & Dance State
    this.isMusicActive = false;
    this.audioDanceEnabled = false;
    this.setupAudioListeners();

    // Canvas Resize & Geometry Sync
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse & Pointer Interactions
    this.setupMouseEvents();

    // Sleep Schedule Heartbeat
    this.scheduleInterval = setInterval(() => this.checkSleepSchedule(), 5000);
  }

  /**
   * Computes the vertical floor baseline in canvas coordinates based on ground mode.
   * @returns {number} Target floor Y coordinate
   */
  calculateFloorY() {
    const tbH = this.taskbarHeight || 48;
    // Screen bottom baseline (sits directly on display bottom edge)
    let baseFloor = this.canvas.height - 4;

    if (this.groundMode === 'taskbar_top') {
      // Taskbar top shelf (sits on top of taskbar icons)
      baseFloor = this.canvas.height - tbH + 4;
    }

    return baseFloor + (this.floorOffset || 0);
  }

  /**
   * Resizes canvas to match overlay window viewport and recalculates ground baseline.
   */
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.floorY = this.calculateFloorY();
    if (!this.isDragging) {
      this.y = this.floorY;
    }
  }

  /**
   * Updates ground configuration, fine-tuning offset, and taskbar height.
   * @param {string} [mode] - Ground mode ('taskbar_bottom' or 'taskbar_top')
   * @param {number} [offset] - Vertical fine-tuning offset
   * @param {number} [tbH] - Taskbar height in pixels
   */
  setGroundConfig(mode, offset, tbH) {
    if (mode !== undefined) this.groundMode = mode;
    if (offset !== undefined) this.floorOffset = offset;
    if (tbH !== undefined) this.taskbarHeight = tbH;
    this.floorY = this.calculateFloorY();
    if (!this.isDragging) {
      this.y = this.floorY;
    }
  }

  /**
   * Updates audio & dance configuration and triggers/stops dancing immediately based on active music state.
   * @param {boolean} enabled - Whether dance is enabled
   * @param {number} [sensitivity] - Sensitivity value
   */
  setAudioDanceConfig(enabled, sensitivity) {
    if (enabled !== undefined) {
      this.audioDanceEnabled = !!enabled;
      this.audio.enabled = !!enabled;
    }
    if (sensitivity !== undefined) {
      this.audio.sensitivity = sensitivity;
    }

    if (this.audioDanceEnabled && this.isMusicActive) {
      if (this.transitioner.currentState !== 'sleep' && this.transitioner.currentState !== 'drag' && this.transitioner.currentState !== 'dance') {
        this.transitioner.handleMusicStart(this);
      }
    } else {
      if (this.transitioner.currentState === 'dance') {
        this.transitioner.handleMusicStop(this);
      }
    }
  }

  /**
   * Updates real-time media playback state from Electron main process.
   * @param {Object} status - Media status payload
   */
  setMediaStatus(status) {
    if (!status) return;
    this.lastMediaStatus = status;

    if (this.isTestDancing) return;

    this.isMusicActive = !!status.isPlaying;

    if (this.isMusicActive && this.audioDanceEnabled) {
      if (this.transitioner.currentState !== 'sleep' && this.transitioner.currentState !== 'drag' && this.transitioner.currentState !== 'dance') {
        this.transitioner.handleMusicStart(this);
      }
    } else {
      if (this.transitioner.currentState === 'dance') {
        this.transitioner.handleMusicStop(this);
      }
    }
  }

  /**
   * Triggers a temporary test music dance sequence.
   * @param {number} [durationSec=5.0]
   */
  triggerTestDance(durationSec = 5.0) {
    if (this.transitioner.currentState === 'sleep' || this.transitioner.currentState === 'drag' || this.transitioner.currentState === 'fall') {
      return;
    }
    this.isTestDancing = true;
    this.isMusicActive = true;
    this.transitioner.handleMusicStart(this);

    if (this.testDanceTimeout) {
      clearTimeout(this.testDanceTimeout);
    }

    this.testDanceTimeout = setTimeout(() => {
      this.isTestDancing = false;
      if (!this.lastMediaStatus || !this.lastMediaStatus.isPlaying) {
        this.isMusicActive = false;
        this.transitioner.handleMusicStop(this);
      }
    }, durationSec * 1000);
  }

  /**
   * Configures Web Audio API beat listeners and music state callbacks.
   */
  setupAudioListeners() {
    this.audio.onBeat = (energy) => {
      if (this.transitioner.currentState === 'dance') {
        this.particles.spawnMusicNotes(this.x, this.y - 20, 2);
      }
    };

    this.audio.onMusicStateChange = (isPlaying, energy) => {
      if (isPlaying) {
        this.isMusicActive = true;
        if (this.audioDanceEnabled && this.transitioner.currentState !== 'sleep' && this.transitioner.currentState !== 'drag') {
          this.transitioner.handleMusicStart(this);
        }
      } else {
        this.isMusicActive = false;
        if (this.transitioner.currentState === 'dance') {
          this.transitioner.handleMusicStop(this);
        }
      }
    };
  }

  /**
   * Registers global pointer events and pointer capture handlers.
   */
  setupMouseEvents() {
    this.isHovering = false;
    this.dragPointerId = null;
    this.lastDragTime = 0;

    // Pointer Down (Global capture prevents mid-air release loss)
    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.button === 0 && this.isPointInsidePet(e.clientX, e.clientY)) {
        this.isDragging = true;
        this.dragPointerId = e.pointerId;
        this.lastDragTime = performance.now();
        this.canvas.style.cursor = 'grabbing';
        this.dragOffsetX = e.clientX - this.x;
        this.dragOffsetY = e.clientY - this.y;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;

        try {
          this.canvas.setPointerCapture(e.pointerId);
        } catch (err) {}

        if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
          window.electronAPI.setInteractiveRegion(true);
        }
        this.transitioner.handleDragStart(this);
      }
    });

    // Pointer Move
    window.addEventListener('pointermove', (e) => {
      // Safety check: Release drag immediately if primary button is released
      if (this.isDragging && (e.buttons & 1) === 0) {
        this.releaseDrag(e.clientX, e.clientY);
        return;
      }

      const isInside = this.isPointInsidePet(e.clientX, e.clientY);
      const shouldBeInteractive = isInside || this.isDragging;

      if (shouldBeInteractive !== this.isHovering) {
        this.isHovering = shouldBeInteractive;
        this.canvas.style.cursor = this.isDragging ? 'grabbing' : (isInside ? 'grab' : 'default');
        if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
          window.electronAPI.setInteractiveRegion(shouldBeInteractive);
        }
      }

      // Petting detection: moving cursor over pet while resting on ground
      if (!this.isDragging && isInside) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.pettingDistance += dist;

        if (this.pettingDistance > 80) {
          this.pettingDistance = 0;
          this.transitioner.handlePetting(this);
        }
      } else {
        this.pettingDistance = 0;
      }

      // Drag translation
      if (this.isDragging) {
        this.lastDragTime = performance.now();
        const targetX = e.clientX - this.dragOffsetX;
        const targetY = e.clientY - this.dragOffsetY;
        const dragDx = targetX - this.x;

        if (Math.abs(dragDx) > 2) {
          this.facing = dragDx > 0 ? 1 : -1;
        }

        this.x = targetX;
        // Clamp top drag bound to keep pet within visible viewport
        this.y = Math.max(10, Math.min(this.floorY + 20, targetY));
      }

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    // Pointer Up & Cancellation Handlers
    const handlePointerEnd = (e) => {
      if (this.isDragging) {
        if (this.dragPointerId !== null) {
          try {
            this.canvas.releasePointerCapture(this.dragPointerId);
          } catch (err) {}
          this.dragPointerId = null;
        }
        this.releaseDrag(e.clientX, e.clientY);
      }
    };

    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    window.addEventListener('mouseup', handlePointerEnd);
    window.addEventListener('blur', () => {
      if (this.isDragging) this.releaseDrag();
    });
  }

  /**
   * Safely ends dragging state, restores cursor, and triggers drop physics.
   * @param {number} [clientX]
   * @param {number} [clientY]
   */
  releaseDrag(clientX, clientY) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.canvas.style.cursor = 'default';

    if (this.y < this.floorY) {
      this.transitioner.handleDrop(this);
    } else {
      this.y = this.floorY;
      this.transitioner.handleGroundLanding(this);
    }

    const isInside = (clientX !== undefined && clientY !== undefined) ? this.isPointInsidePet(clientX, clientY) : false;
    this.isHovering = isInside;
    if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
      window.electronAPI.setInteractiveRegion(isInside);
    }
  }

  /**
   * Hit-test bounding box evaluation for mouse interaction.
   * @param {number} px - Point X
   * @param {number} py - Point Y
   * @returns {boolean}
   */
  isPointInsidePet(px, py) {
    const boxW = 60 * this.scale;
    const boxH = 65 * this.scale;
    const minX = this.x - boxW / 2;
    const maxX = this.x + boxW / 2;
    const minY = this.y - boxH;
    const maxY = this.y + 12;
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
  }

  /**
   * Starts the 60 FPS animation and physics loop.
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  /**
   * Pauses simulation loop to save 100% CPU/GPU when fullscreen apps are active.
   */
  pause() {
    this.isPaused = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Resumes simulation loop after fullscreen apps close.
   */
  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  /**
   * Main render loop driven by requestAnimationFrame.
   * @param {number} currentTime
   */
  loop(currentTime) {
    if (!this.isRunning || this.isPaused) return;
    const dt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }

  /**
   * Advances physics, state machines, particle systems, and pose interpolations.
   * @param {number} dt - Delta time in seconds
   */
  update(dt) {
    // 1. Update Subsystems
    this.audio.update(dt);
    this.particles.update(dt);
    this.renderer.update(dt);

    // 2. State & Transition Machine
    const stateInfo = this.transitioner.update(dt, this);

    // Safety watchdog: auto-release if pointer event was lost while dragging
    if (this.isDragging && (performance.now() - this.lastDragTime > 800)) {
      this.releaseDrag();
    }

    // 3. Physics & Gravity
    if (!this.isDragging) {
      if (this.y < this.floorY) {
        // Freefall
        this.vy += this.gravity * dt;
        this.y += this.vy * dt;

        if (this.y >= this.floorY) {
          this.y = this.floorY;
          this.vy = 0;
          this.transitioner.handleGroundLanding(this);
        }
      } else {
        this.y = this.floorY;
        this.vy = 0;

        // If sleeping, freeze all horizontal movement completely
        if (stateInfo.state === 'sleep') {
          this.vx = 0;
        }

        // Taskbar Horizontal Roaming
        this.x += this.vx * dt;

        // Screen boundary bounce
        const margin = 40;
        if (this.x < margin) {
          this.x = margin;
          this.vx = Math.abs(this.vx);
          this.facing = 1;
        } else if (this.x > this.canvas.width - margin) {
          this.x = this.canvas.width - margin;
          this.vx = -Math.abs(this.vx);
          this.facing = -1;
        }
      }
    }

    // 4. Calculate Target Pose and Blend Continuously (Pose Blending Engine)
    const targetPose = this.behaviors.calculatePose(
      stateInfo.subBehavior,
      stateInfo.phase,
      this.renderer.time,
      this.species
    );

    // Smooth Pose Blending (Skeletal Dampener)
    const blendSpeed = this.isDragging ? 18.0 : 12.0;
    const blendFactor = 1 - Math.exp(-blendSpeed * dt);

    if (!this.currentPose) {
      this.currentPose = { ...targetPose };
    } else {
      // Interpolate numeric bone properties
      for (const key of Object.keys(targetPose)) {
        if (typeof targetPose[key] === 'number') {
          if (key.includes('Rot') || key.includes('Angle')) {
            // Angular shortest-distance interpolation
            let diff = (targetPose[key] - (this.currentPose[key] || 0)) % (Math.PI * 2);
            if (diff < -Math.PI) diff += Math.PI * 2;
            if (diff > Math.PI) diff -= Math.PI * 2;
            this.currentPose[key] = (this.currentPose[key] || 0) + diff * blendFactor;
          } else {
            // Linear exponential damping
            this.currentPose[key] = (this.currentPose[key] || 0) + (targetPose[key] - (this.currentPose[key] || 0)) * blendFactor;
          }
        } else {
          // Discrete states (eyeState, mouthState)
          this.currentPose[key] = targetPose[key];
        }
      }
    }

    // Auto-equip nightcap accessory while sleeping
    this.accessories.nightcap = (stateInfo.state === 'sleep');
  }

  /**
   * Renders pet sprite and particle overlays onto canvas context.
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render Pet
    this.renderer.render(this.ctx, {
      species: this.species,
      x: this.x,
      y: this.y,
      scale: this.scale,
      facing: this.facing,
      pose: this.currentPose,
      accessories: this.accessories
    });

    // Render Particles (Zzz, Notes, Hearts, Dust)
    this.particles.draw(this.ctx);
  }

  /**
   * Evaluates if current system time falls within scheduled sleep range.
   * @returns {boolean}
   */
  isSleepScheduled() {
    if (!this.sleepSchedule.enabled) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [sH, sM] = this.sleepSchedule.sleepTime.split(':').map(Number);
    const [wH, wM] = this.sleepSchedule.wakeTime.split(':').map(Number);
    const sleepMinutes = sH * 60 + sM;
    const wakeMinutes = wH * 60 + wM;

    if (sleepMinutes < wakeMinutes) {
      return currentMinutes >= sleepMinutes && currentMinutes < wakeMinutes;
    } else {
      // Overnight range crossing midnight (e.g., 23:00 to 08:00)
      return currentMinutes >= sleepMinutes || currentMinutes < wakeMinutes;
    }
  }

  /**
   * Checks sleep schedule and transitions state accordingly.
   */
  checkSleepSchedule() {
    const shouldSleep = this.isSleepScheduled();
    if (shouldSleep && this.transitioner.currentState !== 'sleep') {
      this.transitioner.enterSleep(this);
    } else if (!shouldSleep && this.transitioner.currentState === 'sleep') {
      this.transitioner.wakeUp(this);
    }
  }

  setSpecies(species) {
    this.species = species;
  }

  setScale(scale) {
    this.scale = scale;
  }

  setScheduleConfig(config) {
    this.sleepSchedule = { ...this.sleepSchedule, ...config };
    this.checkSleepSchedule();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetEngine;
}
