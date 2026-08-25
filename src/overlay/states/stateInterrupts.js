/**
 * @file stateInterrupts.js
 * @description Interruption Matrix Handlers for StateTransitioner (Drag, Drop, Landing, Petting, Music, Sleep).
 */

const StateInterrupts = {
  /**
   * Handles user mouse pickup / drag initiation.
   * @param {PetEngine} petEngine
   */
  handleDragStart(petEngine) {
    this.wasAsleep = (this.currentState === 'sleep');
    this.wasDancing = (this.currentState === 'dance');
    this.sequenceQueue = [];
    if (petEngine) petEngine.vx = 0;

    if (this.wasAsleep) {
      // Interrupted during sleep: Startled -> Groggy Hang
      this.particles.spawnEmote(petEngine.x, petEngine.y, '!');
      this.particles.spawnSweat(petEngine.x, petEngine.y);
      this.setSubBehavior('drag_startled', 0.28, 'drag');
      this.sequenceQueue.push({
        behavior: 'drag_groggy_hang',
        duration: 9999, // Persists until mouse release
        state: 'drag'
      });
    } else {
      // Standard awake / dancing pickup: Active kicking hang
      this.setSubBehavior('drag_startled', 0.2, 'drag');
      this.sequenceQueue.push({
        behavior: 'drag_active_hang',
        duration: 9999,
        state: 'drag'
      });
    }
  },

  /**
   * Handles mid-air drop release.
   * @param {PetEngine} petEngine
   */
  handleDrop(petEngine) {
    this.sequenceQueue = [];
    this.setSubBehavior('fall_freefall', 2.5, 'fall');
  },

  /**
   * Handles ground impact sequence when pet contacts the taskbar baseline.
   * @param {PetEngine} petEngine
   */
  handleGroundLanding(petEngine) {
    if (this.currentState === 'landing') return; // Prevent duplicate landing interruptions

    this.sequenceQueue = [];
    this.particles.spawnDust(petEngine.x, petEngine.y + 6, 6);

    // Landing sequence: Elastic Impact Squish (0.18s) -> Spring Shake Off (0.38s) -> Tail Wag Recovery (0.7s)
    this.setSubBehavior('impact_squish', 0.18, 'landing');

    this.sequenceQueue.push({
      behavior: 'impact_shake_off',
      duration: 0.38,
      state: 'landing'
    });

    if (this.wasAsleep && (petEngine.isSleepScheduled() || petEngine.isManualSleep)) {
      this.sequenceQueue.push({
        behavior: 'idle_yawn',
        duration: 1.0,
        state: 'idle',
        onStart: () => {
          this.particles.spawnZzz(petEngine.x, petEngine.y - 15);
        }
      });
      this.sequenceQueue.push({
        behavior: 'sleep_curled',
        duration: 4.0,
        state: 'sleep'
      });
    } else if (petEngine && petEngine.isMusicActive && (petEngine.audioDanceEnabled || petEngine.isTestDancing)) {
      // Resume music dancing smoothly upon landing
      this.sequenceQueue.push({
        behavior: 'idle_tail_wag',
        duration: 0.5,
        state: 'idle',
        onStart: () => {
          petEngine.accessories.headphones = true;
        }
      });
      this.sequenceQueue.push({
        behavior: this.behaviors.getRandomBehavior('dance'),
        duration: 2.5,
        state: 'dance'
      });
    } else {
      this.sequenceQueue.push({
        behavior: 'idle_tail_wag',
        duration: 0.7,
        state: 'idle'
      });
    }
  },

  /**
   * Handles petting interaction when mouse cursor brushes over pet.
   * @param {PetEngine} petEngine
   */
  handlePetting(petEngine) {
    if (this.currentState === 'sleep') return; // Do not disrupt deep sleep
    if (this.currentState === 'drag' || this.currentState === 'fall') return;

    if (this.currentState === 'petted') {
      // Extend petting duration smoothly WITHOUT resetting animation cycle
      this.stateDuration = Math.min(3.8, this.stateDuration + 0.6);
      const now = performance.now();
      if (!this.lastPetParticleTime || now - this.lastPetParticleTime > 260) {
        this.lastPetParticleTime = now;
        this.particles.spawnPettingReaction(petEngine.x, petEngine.y, petEngine.species || 'neko');
      }
      return;
    }

    this.lastPetParticleTime = performance.now();
    this.sequenceQueue = [];
    this.particles.spawnPettingReaction(petEngine.x, petEngine.y, petEngine.species || 'neko');
    this.setSubBehavior('petting_love', 1.8, 'petted');
    petEngine.vx = 0;

    // Graceful recovery step after petting so pet seamlessly resumes active wandering
    this.sequenceQueue.push({
      behavior: 'idle_tail_wag',
      duration: 1.0,
      state: 'idle'
    });
  },

  /**
   * Handles music playback trigger.
   * @param {PetEngine} petEngine
   */
  handleMusicStart(petEngine) {
    if (this.currentState === 'sleep') return;
    if (this.currentState === 'drag' || this.currentState === 'fall' || this.currentState === 'landing' || (petEngine && petEngine.isDragging)) return;

    petEngine.accessories.headphones = true;
    const danceSub = this.behaviors.getRandomBehavior('dance');
    this.setSubBehavior(danceSub, 2.0 + Math.random() * 1.5, 'dance');
    this.particles.spawnMusicNotes(petEngine.x, petEngine.y, 3);
  },

  /**
   * Handles music silence / stop event.
   * @param {PetEngine} petEngine
   */
  handleMusicStop(petEngine) {
    if (this.currentState !== 'dance') return;
    petEngine.accessories.headphones = false;
    this.sequenceQueue = [];
    this.setSubBehavior('idle_stretch_front', 0.8, 'idle');
    this.sequenceQueue.push({
      behavior: 'idle_breathe',
      duration: 2.5,
      state: 'idle'
    });
  },

  /**
   * Enters scheduled biological sleep mode and curls onto the floor.
   * @param {PetEngine} petEngine
   */
  enterSleep(petEngine) {
    if (this.currentState === 'sleep') return;
    this.sequenceQueue = [];
    petEngine.vx = 0; // Freeze horizontal velocity immediately
    this.setSubBehavior('idle_yawn', 1.0, 'sleep');
    this.sequenceQueue.push({
      behavior: 'sleep_loaf',
      duration: 1.0,
      state: 'sleep',
      onStart: () => {
        petEngine.vx = 0;
      }
    });
    this.sequenceQueue.push({
      behavior: 'sleep_curled',
      duration: 4.0,
      state: 'sleep',
      onStart: () => {
        petEngine.vx = 0;
        this.particles.spawnZzz(petEngine.x, petEngine.y - 20);
      }
    });
  },

  /**
   * Handles morning wakeup sequence.
   * @param {PetEngine} petEngine
   */
  wakeUp(petEngine) {
    if (this.currentState !== 'sleep') return;
    if (petEngine) petEngine.isManualSleep = false;
    this.sequenceQueue = [];
    this.setSubBehavior('idle_yawn', 1.5, 'idle');
    this.sequenceQueue.push({
      behavior: 'idle_stretch_back',
      duration: 1.2,
      state: 'idle'
    });
    this.sequenceQueue.push({
      behavior: 'idle_tail_wag',
      duration: 2.0,
      state: 'idle',
      onStart: () => {
        this.particles.spawnEmote(petEngine.x, petEngine.y, '!');
      }
    });
  }
};

if (typeof window !== 'undefined') window.StateInterrupts = StateInterrupts;
if (typeof globalThis !== 'undefined') globalThis.StateInterrupts = StateInterrupts;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateInterrupts;
}
