/**
 * @file stateTransitioner.js
 * @description State Machine & Interruption Matrix for NavBarPets.
 * Coordinates behavioral state flows, autonomous wandering/idling, multi-stage sequences,
 * and high-priority user interaction interrupts (dragging, drop physics, petting, music).
 */

class StateTransitioner {
  /**
   * @param {AnimationBehaviors} behaviors - Reference to behavior pool library
   * @param {ParticleSystem} particles - Reference to particle emitter
   */
  constructor(behaviors, particles) {
    this.behaviors = behaviors;
    this.particles = particles;
    this.currentState = 'idle';
    this.currentSubBehavior = 'idle_breathe';
    this.stateTimer = 0;
    this.stateDuration = 4.0;
    this.sequenceQueue = [];
    this.isTransitioning = false;
    this.wasAsleep = false;
  }

  /**
   * Advances active state timers, processes queued stages, or triggers autonomous transitions.
   * @param {number} dt - Delta time in seconds
   * @param {PetEngine} petEngine - Reference to PetEngine instance
   * @returns {{ state: string, subBehavior: string, phase: number }}
   */
  update(dt, petEngine) {
    this.stateTimer += dt;
    const phase = Math.min(1.0, this.stateTimer / Math.max(0.001, this.stateDuration));

    // Process multi-stage animation sequence if active
    if (this.sequenceQueue.length > 0) {
      if (this.stateTimer >= this.stateDuration) {
        const nextStep = this.sequenceQueue.shift();
        this.setSubBehavior(nextStep.behavior, nextStep.duration, nextStep.state);
        if (nextStep.onStart) nextStep.onStart(petEngine);
      }
    } else {
      // Autonomous state transition loop
      if (this.stateTimer >= this.stateDuration) {
        this.selectNextAutonomousBehavior(petEngine);
      }
    }

    return {
      state: this.currentState,
      subBehavior: this.currentSubBehavior,
      phase: phase
    };
  }

  /**
   * Configures the active sub-action and resets state timers.
   * @param {string} behavior - Sub-behavior key
   * @param {number} [duration=3.0] - Target duration in seconds
   * @param {string} [state=null] - Parent state category
   */
  setSubBehavior(behavior, duration = 3.0, state = null) {
    this.currentSubBehavior = behavior;
    this.stateDuration = duration;
    this.stateTimer = 0;
    if (state) this.currentState = state;
  }

  /**
   * Evaluates probabilities and assigns the next autonomous action.
   * @param {PetEngine} petEngine
   */
  selectNextAutonomousBehavior(petEngine) {
    if (this.currentState === 'sleep') {
      // Maintain sleep pose and emit Zzz particles while locking horizontal velocity
      petEngine.vx = 0;
      const sleepSub = Math.random() > 0.4 ? 'sleep_deep' : 'sleep_curled';
      this.setSubBehavior(sleepSub, 3.5 + Math.random() * 2, 'sleep');
      this.particles.spawnZzz(petEngine.x, petEngine.y - 20);
      return;
    }

    if (this.currentState === 'dance') {
      if (petEngine.isMusicActive && (petEngine.audioDanceEnabled || petEngine.isTestDancing)) {
        // Continue dancing while audio stream or media playback is active
        const danceSub = this.behaviors.getRandomBehavior('dance');
        this.setSubBehavior(danceSub, 1.8 + Math.random() * 1.5, 'dance');
        this.particles.spawnMusicNotes(petEngine.x, petEngine.y, 2);
        return;
      } else {
        // Music ended: Smoothly exit dance mode back to idle
        this.handleMusicStop(petEngine);
        return;
      }
    }

    // Normal awake behavior cycle: Weighted probabilities
    const roll = Math.random();
    if (roll < 0.45) {
      // Idle sub-action
      const idleSub = this.behaviors.getRandomBehavior('idle');
      this.setSubBehavior(idleSub, 2.5 + Math.random() * 3.0, 'idle');
      petEngine.vx = 0;
    } else if (roll < 0.8) {
      // Walk roaming
      const walkSub = this.behaviors.getRandomBehavior('walk');
      const dir = Math.random() > 0.5 ? 1 : -1;
      petEngine.facing = dir;
      petEngine.vx = dir * (25 + Math.random() * 30);
      this.setSubBehavior(walkSub, 2.0 + Math.random() * 3.0, 'walk');
    } else if (roll < 0.93) {
      // Play sub-action
      const playSub = this.behaviors.getRandomBehavior('play');
      this.setSubBehavior(playSub, 2.0 + Math.random() * 1.5, 'play');
      petEngine.vx = 0;
    } else {
      // Sprint / Zoomies
      const dir = Math.random() > 0.5 ? 1 : -1;
      petEngine.facing = dir;
      petEngine.vx = dir * (70 + Math.random() * 40);
      this.setSubBehavior('run_zoomies', 2.0 + Math.random() * 1.5, 'run');
    }
  }

  // =========================================================================
  // INTERRUPTION MATRIX HANDLERS
  // =========================================================================

  /**
   * Handles user mouse pickup / drag initiation.
   * @param {PetEngine} petEngine
   */
  handleDragStart(petEngine) {
    this.wasAsleep = (this.currentState === 'sleep');
    this.sequenceQueue = [];

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
      // Standard awake pickup: Active kicking hang
      this.setSubBehavior('drag_startled', 0.2, 'drag');
      this.sequenceQueue.push({
        behavior: 'drag_active_hang',
        duration: 9999,
        state: 'drag'
      });
    }
  }

  /**
   * Handles mid-air drop release.
   * @param {PetEngine} petEngine
   */
  handleDrop(petEngine) {
    this.sequenceQueue = [];
    this.setSubBehavior('fall_freefall', 9999, 'fall');
  }

  /**
   * Handles ground impact sequence when pet contacts the taskbar baseline.
   * @param {PetEngine} petEngine
   */
  handleGroundLanding(petEngine) {
    this.sequenceQueue = [];
    this.particles.spawnDust(petEngine.x, petEngine.y + 10, 5);

    // Landing sequence: Impact Squish -> Dust Shake Off -> Recovery / Idle
    this.setSubBehavior('impact_squish', 0.25, 'landing');

    this.sequenceQueue.push({
      behavior: 'impact_shake_off',
      duration: 0.6,
      state: 'landing'
    });

    if (this.wasAsleep && petEngine.isSleepScheduled()) {
      this.sequenceQueue.push({
        behavior: 'idle_yawn',
        duration: 1.2,
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
    } else {
      this.sequenceQueue.push({
        behavior: 'idle_yawn',
        duration: 1.0,
        state: 'idle'
      });
    }
  }

  /**
   * Handles petting interaction when mouse cursor brushes over pet.
   * @param {PetEngine} petEngine
   */
  handlePetting(petEngine) {
    if (this.currentState === 'sleep') return; // Do not disrupt deep sleep
    if (this.currentState === 'drag' || this.currentState === 'fall') return;

    this.particles.spawnHeart(petEngine.x, petEngine.y);
    this.setSubBehavior('petting_love', 1.2, 'petted');
    petEngine.vx = 0;
  }

  /**
   * Handles music playback trigger.
   * @param {PetEngine} petEngine
   */
  handleMusicStart(petEngine) {
    if (this.currentState === 'sleep') return;
    if (this.currentState === 'drag' || this.currentState === 'fall') return;

    petEngine.accessories.headphones = true;
    const danceSub = this.behaviors.getRandomBehavior('dance');
    this.setSubBehavior(danceSub, 2.0 + Math.random() * 1.5, 'dance');
    this.particles.spawnMusicNotes(petEngine.x, petEngine.y, 3);
  }

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
  }

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
  }

  /**
   * Handles morning wakeup sequence.
   * @param {PetEngine} petEngine
   */
  wakeUp(petEngine) {
    if (this.currentState !== 'sleep') return;
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
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateTransitioner;
}
