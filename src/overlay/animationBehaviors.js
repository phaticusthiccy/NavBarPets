/**
 * @file animationBehaviors.js
 * @description Master Procedural Kinematics & Sub-Action Animation Coordinator for NavBarPets.
 * Orchestrates behavior pools, skeletal pose calculations, and modular kinematics subsystems.
 */

class AnimationBehaviors {
  constructor() {
    this.initBehaviorPools();
  }

  initBehaviorPools() {
    this.pools = {
      idle: [
        'idle_breathe',
        'idle_ear_twitch',
        'idle_tail_wag',
        'idle_look_left_right',
        'idle_look_sky',
        'idle_groom_paw',
        'idle_stretch_front',
        'idle_stretch_back',
        'idle_loaf',
        'idle_roll_belly',
        'idle_yawn',
        'idle_sniff_ground',
        'idle_groom_ears',
        'idle_curious_sniff_air',
        'idle_shake_fur',
        'idle_nap_doze'
      ],
      walk: [
        'walk_normal',
        'walk_playful_hop',
        'walk_prowl_sneak',
        'walk_tiptoe',
        'walk_backwards',
        'walk_strut_proud',
        'walk_trot_diagonal',
        'walk_cautious_creep',
        'walk_swagger_waddle'
      ],
      run: [
        'run_zoomies',
        'run_pounce',
        'run_dash',
        'run_gallop_bound',
        'run_zig_zag',
        'run_turbo_sprint',
        'run_drift_slide'
      ],
      dance: [
        'dance_head_bob',
        'dance_disco_paws',
        'dance_side_hop',
        'dance_spin_twirl',
        'dance_moonwalk',
        'dance_breakdance',
        'dance_wave_shuffle',
        'dance_robot_pop',
        'dance_jump_hype',
        'dance_tap_groove'
      ],
      play: [
        'play_paw_bat',
        'play_double_pounce',
        'play_chase_tail',
        'play_curious_tilt',
        'play_somersault_roll',
        'play_peek_a_boo',
        'play_butterfly_hop',
        'play_wiggle_butt_pounce'
      ],
      sleep: [
        'sleep_curled',
        'sleep_loaf',
        'sleep_twitch',
        'sleep_deep',
        'sleep_belly_up',
        'sleep_snore_bubble',
        'sleep_dream_run',
        'sleep_cozy_cuddle'
      ]
    };
  }

  getRandomBehavior(state) {
    const list = this.pools[state] || ['idle_breathe'];
    return list[Math.floor(Math.random() * list.length)];
  }

  getDefaultPose() {
    return {
      bodyY: -16,
      bodyRot: 0,
      headY: -32,
      headRot: 0,
      tailAngle: 0,
      earTwitchL: 0,
      earTwitchR: 0,
      eyeState: 'open',
      mouthState: 'w',
      pawFL_x: 8,
      pawFL_y: 0,
      pawFR_x: 14,
      pawFR_y: 0,
      pawBL_x: -12,
      pawBL_y: 0,
      pawBR_x: -6,
      pawBR_y: 0,
      squishX: 1.0,
      squishY: 1.0,
      groundOffset: 0,
      wingFlap: 0,
      wobble: 0
    };
  }

  calculatePose(behavior, phase, time, species = 'neko') {
    const pose = this.getDefaultPose();

    // Global subtle breathing
    const breath = Math.sin(time * 3) * 1.5;
    pose.bodyY += breath;
    pose.headY += breath * 0.8;

    // Dispatch to modular behavior handlers
    let handled = false;
    if (this.applyIdleBehavior) {
      handled = this.applyIdleBehavior(behavior, pose, time);
    }
    if (!handled && this.applyLocomotionBehavior) {
      handled = this.applyLocomotionBehavior(behavior, pose, time);
    }
    if (!handled && this.applyDanceBehavior) {
      handled = this.applyDanceBehavior(behavior, pose, time);
    }
    if (!handled && this.applyPlaySleepInteractBehavior) {
      handled = this.applyPlaySleepInteractBehavior(behavior, pose, phase, time, species);
    }

    if (!handled) {
      pose.tailAngle = Math.sin(time * 2) * 0.2;
      pose.eyeState = 'open';
    }

    // Apply species physical feature modifiers
    if (this.applySpeciesModifiers) {
      this.applySpeciesModifiers(pose, behavior, time, species);
    }

    return pose;
  }
}

const resolveBehaviorModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

const _IdleBehaviors = resolveBehaviorModule('IdleBehaviors', './behaviors/idleBehaviors.js');
const _LocomotionBehaviors = resolveBehaviorModule('LocomotionBehaviors', './behaviors/locomotionBehaviors.js');
const _DanceBehaviors = resolveBehaviorModule('DanceBehaviors', './behaviors/danceBehaviors.js');
const _PlaySleepInteractBehaviors = resolveBehaviorModule('PlaySleepInteractBehaviors', './behaviors/playSleepInteractBehaviors.js');
const _SpeciesModifiers = resolveBehaviorModule('SpeciesModifiers', './behaviors/speciesModifiers.js');

if (_IdleBehaviors) Object.assign(AnimationBehaviors.prototype, _IdleBehaviors);
if (_LocomotionBehaviors) Object.assign(AnimationBehaviors.prototype, _LocomotionBehaviors);
if (_DanceBehaviors) Object.assign(AnimationBehaviors.prototype, _DanceBehaviors);
if (_PlaySleepInteractBehaviors) Object.assign(AnimationBehaviors.prototype, _PlaySleepInteractBehaviors);
if (_SpeciesModifiers) Object.assign(AnimationBehaviors.prototype, _SpeciesModifiers);

if (typeof window !== 'undefined') window.AnimationBehaviors = AnimationBehaviors;
if (typeof globalThis !== 'undefined') globalThis.AnimationBehaviors = AnimationBehaviors;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationBehaviors;
}
