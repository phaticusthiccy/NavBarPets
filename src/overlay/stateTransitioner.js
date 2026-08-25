/**
 * @file stateTransitioner.js
 * @description Master State Transition Machine for NavBarPets.
 * Coordinates behavior sequences, interrupts, and merges modular state handlers.
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
}

const resolveStateModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

const _StateInterrupts = resolveStateModule('StateInterrupts', './states/stateInterrupts.js');
const _StateAutonomous = resolveStateModule('StateAutonomous', './states/stateAutonomous.js');

if (_StateInterrupts) Object.assign(StateTransitioner.prototype, _StateInterrupts);
if (_StateAutonomous) Object.assign(StateTransitioner.prototype, _StateAutonomous);

if (typeof window !== 'undefined') window.StateTransitioner = StateTransitioner;
if (typeof globalThis !== 'undefined') globalThis.StateTransitioner = StateTransitioner;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateTransitioner;
}
