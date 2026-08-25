/**
 * @file petEngine.js
 * @description Core Pet Simulation & Animation Master Controller for NavBarPets.
 * Coordinates 60 FPS physics loops, skeletal pose blending, rendering, and merges modular engine subsystems.
 */

let _ParticleSystem = (typeof globalThis !== 'undefined' && globalThis.ParticleSystem) || null;
let _PetRenderer = (typeof globalThis !== 'undefined' && globalThis.PetRenderer) || null;
let _AnimationBehaviors = (typeof globalThis !== 'undefined' && globalThis.AnimationBehaviors) || null;
let _StateTransitioner = (typeof globalThis !== 'undefined' && globalThis.StateTransitioner) || null;
let _AudioReactive = (typeof globalThis !== 'undefined' && globalThis.AudioReactive) || null;

if (typeof require !== 'undefined') {
  if (!_ParticleSystem) try { _ParticleSystem = require('./particleSystem.js'); } catch (e) {}
  if (!_PetRenderer) try { _PetRenderer = require('./petRenderer.js'); } catch (e) {}
  if (!_AnimationBehaviors) try { _AnimationBehaviors = require('./animationBehaviors.js'); } catch (e) {}
  if (!_StateTransitioner) try { _StateTransitioner = require('./stateTransitioner.js'); } catch (e) {}
  if (!_AudioReactive) try { _AudioReactive = require('./audioReactive.js'); } catch (e) {}
}

class PetEngine {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} [initialConfig={}] - Synchronous bootstrap data
   */
  constructor(canvas, initialConfig = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Subsystems
    const PS = _ParticleSystem || (typeof window !== 'undefined' && window.ParticleSystem) || (typeof globalThis !== 'undefined' && globalThis.ParticleSystem);
    const PR = _PetRenderer || (typeof window !== 'undefined' && window.PetRenderer) || (typeof globalThis !== 'undefined' && globalThis.PetRenderer);
    const AB = _AnimationBehaviors || (typeof window !== 'undefined' && window.AnimationBehaviors) || (typeof globalThis !== 'undefined' && globalThis.AnimationBehaviors);
    const ST = _StateTransitioner || (typeof window !== 'undefined' && window.StateTransitioner) || (typeof globalThis !== 'undefined' && globalThis.StateTransitioner);
    const AR = _AudioReactive || (typeof window !== 'undefined' && window.AudioReactive) || (typeof globalThis !== 'undefined' && globalThis.AudioReactive);

    this.particles = new PS();
    this.renderer = new PR();
    this.behaviors = new AB();
    this.transitioner = new ST(this.behaviors, this.particles);
    this.audio = new AR();

    const s = initialConfig.settings || {};

    // Pet Configuration
    this.species = s.species || 'neko';
    this.petSkins = s.petSkins || {};
    this.scale = s.scale !== undefined ? s.scale : 1.0;
    this.facing = 1; // 1: Facing right, -1: Facing left
    this.accessories = {
      hat: false,
      headphones: false,
      nightcap: false
    };

    // Position, Floor Baseline & Kinematics
    this.x = 200;
    this.groundMode = s.groundMode || 'taskbar_bottom';
    this.floorOffset = s.floorOffset !== undefined ? s.floorOffset : 0;
    this.taskbarHeight = initialConfig.taskbarHeight || 48;
    this.hasInitializedBaseline = true;

    // Canvas Resize & Geometry Sync
    this.resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.resize());
    }

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
    if (s.sleepSchedule) this.setScheduleConfig(s.sleepSchedule);
    this.isManualSleep = false;

    // Frame Loop Timing
    this.lastTime = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    this.isRunning = false;

    // Audio & Dance State
    this.isMusicActive = false;
    this.audioDanceEnabled = s.audio?.enabled || false;
    if (s.audio) this.setAudioDanceConfig(s.audio.enabled, s.audio.sensitivity);
    this.setupAudioListeners();

    if (initialConfig.mediaStatus) {
      this.setMediaStatus(initialConfig.mediaStatus);
    }

    // Mouse & Pointer Interactions
    if (typeof window !== 'undefined') {
      this.setupMouseEvents();
    }

    // Sleep Schedule Heartbeat
    this.scheduleInterval = setInterval(() => this.checkSleepSchedule(), 5000);
    if (this.scheduleInterval && typeof this.scheduleInterval.unref === 'function') {
      this.scheduleInterval.unref();
    }
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
    this.updatePhysics(dt, stateInfo);

    // 4. Calculate Target Pose and Blend Continuously (Pose Blending Engine)
    const targetPose = this.behaviors.calculatePose(
      stateInfo.subBehavior,
      stateInfo.phase,
      this.renderer.time,
      this.species
    );

    // Smooth Pose Blending (Skeletal Dampener with responsive landing speed)
    const blendSpeed = this.isDragging ? 22.0 : (stateInfo.state === 'landing' ? 24.0 : 14.0);
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

    // Render Pet with active skin
    this.renderer.render(this.ctx, {
      species: this.species,
      skin: (this.petSkins && this.petSkins[this.species]) || 'cool',
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

  setSpecies(species) {
    this.species = species;
  }

  setPetSkins(skins) {
    this.petSkins = { ...this.petSkins, ...skins };
  }

  setScale(scale) {
    this.scale = scale;
  }
}

const resolveEngineModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

const _EnginePhysics = resolveEngineModule('EnginePhysics', './engine/enginePhysics.js');
const _EngineInput = resolveEngineModule('EngineInput', './engine/engineInput.js');
const _EngineAudioSchedule = resolveEngineModule('EngineAudioSchedule', './engine/engineAudioSchedule.js');

if (_EnginePhysics) Object.assign(PetEngine.prototype, _EnginePhysics);
if (_EngineInput) Object.assign(PetEngine.prototype, _EngineInput);
if (_EngineAudioSchedule) Object.assign(PetEngine.prototype, _EngineAudioSchedule);

if (typeof window !== 'undefined') window.PetEngine = PetEngine;
if (typeof globalThis !== 'undefined') globalThis.PetEngine = PetEngine;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetEngine;
}
