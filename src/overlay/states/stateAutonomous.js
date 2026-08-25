/**
 * @file stateAutonomous.js
 * @description Autonomous Wandering & Behavior Selection Subsystem for StateTransitioner.
 */

const StateAutonomous = {
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
  },

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

    // Active drag or fall safety guard: Never autonomously interrupt drag or fall physics
    if (this.currentState === 'drag' || this.currentState === 'fall' || (petEngine && petEngine.isDragging)) {
      return;
    }

    if (petEngine && petEngine.isMusicActive && (petEngine.audioDanceEnabled || petEngine.isTestDancing)) {
      // Continue or transition into dancing while audio stream or media playback is active
      petEngine.accessories.headphones = true;
      const danceSub = this.behaviors.getRandomBehavior('dance');
      this.setSubBehavior(danceSub, 1.8 + Math.random() * 1.5, 'dance');
      this.particles.spawnMusicNotes(petEngine.x, petEngine.y, 2);
      return;
    }

    if (this.currentState === 'dance') {
      // Music ended: Smoothly exit dance mode back to idle
      this.handleMusicStop(petEngine);
      return;
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
};

if (typeof window !== 'undefined') window.StateAutonomous = StateAutonomous;
if (typeof globalThis !== 'undefined') globalThis.StateAutonomous = StateAutonomous;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateAutonomous;
}
