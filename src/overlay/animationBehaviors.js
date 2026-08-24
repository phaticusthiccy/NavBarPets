/**
 * @file animationBehaviors.js
 * @description Procedural Kinematics & Sub-Action Animation Library for NavBarPets.
 * Defines 75+ unique quadruped, biped, avian, and slime procedural kinematic cycles with
 * synchronized swing-stance foot lifting, dynamic breathing, and tail physics.
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
        // 4 New Idle Behaviors
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
        // 4 New Walk Behaviors
        'walk_strut_proud',
        'walk_trot_diagonal',
        'walk_cautious_creep',
        'walk_swagger_waddle'
      ],
      run: [
        'run_zoomies',
        'run_pounce',
        'run_dash',
        // 4 New Run Behaviors
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
        // 4 New Dance Behaviors
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
        // 4 New Play Behaviors
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
        // 4 New Sleep Behaviors
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

  calculatePose(behavior, phase, time, species = 'neko') {
    const pose = {
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

    // Global subtle breathing
    const breath = Math.sin(time * 3) * 1.5;
    pose.bodyY += breath;
    pose.headY += breath * 0.8;

    switch (behavior) {
      // =============================================================
      // 1. WALKING BEHAVIORS
      // =============================================================
      case 'walk_normal': {
        const cycle = time * 7.5;
        const bob = Math.abs(Math.sin(cycle)) * 2.5;
        pose.bodyY -= bob;
        pose.headY -= bob * 0.7;

        const stride = 6;
        const lift = 7;

        // Diagonal gait Pair 1 (Swing forward in air, push backward on ground)
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8;

        // Diagonal gait Pair 2
        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8;

        pose.tailAngle = Math.sin(time * 4) * 0.35;
        break;
      }

      case 'walk_playful_hop': {
        const hopCycle = time * 8;
        const hop = Math.max(0, Math.sin(hopCycle)) * 7;
        pose.bodyY -= hop;
        pose.headY -= hop * 1.1;
        pose.bodyRot = Math.sin(hopCycle) * 0.08;

        const lift = Math.sin(hopCycle) > 0 ? 6 : 0;
        const reach = Math.sin(hopCycle) > 0 ? 3 : -2;
        pose.pawFL_x = 8 + reach;
        pose.pawFR_x = 14 + reach;
        pose.pawFL_y = -lift;
        pose.pawFR_y = -lift;
        pose.pawBL_y = -lift * 0.5;
        pose.pawBR_y = -lift * 0.5;

        pose.tailAngle = 0.5 + Math.sin(hopCycle) * 0.4;
        pose.eyeState = 'happy';
        break;
      }

      case 'walk_prowl_sneak': {
        const sneakCycle = time * 4.5;
        pose.bodyY += 4;
        pose.headY += 5;
        pose.headRot = -0.05;

        const stride = 7;
        const lift = 4.5;
        const x1 = -Math.cos(sneakCycle) * stride;
        const y1 = Math.max(0, Math.sin(sneakCycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        const x2 = Math.cos(sneakCycle) * stride;
        const y2 = Math.max(0, -Math.sin(sneakCycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = -0.5 + Math.sin(sneakCycle) * 0.2;
        pose.eyeState = 'wide';
        break;
      }

      case 'walk_tiptoe': {
        const cycle = time * 6.5;
        pose.bodyY -= 3;
        pose.headY -= 4;
        const lift = 7;

        const x1 = -Math.cos(cycle) * 6;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1 - 2;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8 - 2;

        const x2 = Math.cos(cycle) * 6;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2 - 2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8 - 2;

        pose.earTwitchL = Math.sin(time * 8) * 0.2;
        pose.earTwitchR = Math.cos(time * 8) * 0.2;
        pose.tailAngle = 0.4 + Math.sin(cycle) * 0.2;
        break;
      }

      case 'walk_backwards': {
        const cycle = time * 5.5;
        const bob = Math.abs(Math.sin(cycle)) * 3;
        pose.bodyY -= bob;
        pose.headY += 2;
        pose.headRot = 0.25;

        const stride = 6;
        const lift = 6;
        // Inverted stride for backward stepping
        const x1 = Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        const x2 = -Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = -0.4 + Math.sin(cycle) * 0.3;
        pose.eyeState = 'wide';
        break;
      }

      // 4 New Walk Animations
      case 'walk_strut_proud': {
        const cycle = time * 7;
        const lift = 9;
        const stride = 7;
        pose.bodyY -= Math.abs(Math.sin(cycle)) * 3;
        pose.headY -= 5;
        pose.headRot = -0.16;

        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8;

        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8;

        pose.tailAngle = 0.8 + Math.sin(cycle) * 0.3;
        pose.eyeState = 'happy';
        break;
      }

      case 'walk_trot_diagonal': {
        const cycle = time * 9;
        const bob = Math.abs(Math.sin(cycle * 2)) * 3.5;
        pose.bodyY -= bob;
        pose.headY -= bob * 0.8;

        const stride = 8;
        const lift = 8;
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8;

        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8;

        pose.earTwitchL = Math.sin(cycle) * 0.25;
        pose.tailAngle = Math.sin(cycle) * 0.45;
        break;
      }

      case 'walk_cautious_creep': {
        const cycle = time * 4.2;
        pose.bodyY += 5;
        pose.headY += 4;
        pose.headRot = 0.08;

        const stride = 5;
        const lift = 4;
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8;

        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8;

        pose.tailAngle = -0.6 + Math.sin(cycle) * 0.2;
        pose.eyeState = 'wide';
        break;
      }

      case 'walk_swagger_waddle': {
        const cycle = time * 6.5;
        pose.bodyRot = Math.sin(cycle) * 0.16;
        pose.headRot = -Math.sin(cycle) * 0.12;
        pose.bodyY -= Math.abs(Math.sin(cycle)) * 2.5;

        const lift = 6;
        const x1 = -Math.cos(cycle) * 5;
        pose.pawFL_x = 8 + x1;
        pose.pawFR_x = 14 - x1;
        pose.pawBL_x = -12 - x1 * 0.7;
        pose.pawBR_x = -6 + x1 * 0.7;
        pose.pawFL_y = -Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFR_y = -Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawBL_y = -Math.max(0, -Math.sin(cycle)) * (lift * 0.7);
        pose.pawBR_y = -Math.max(0, Math.sin(cycle)) * (lift * 0.7);

        pose.tailAngle = Math.sin(cycle) * 0.65;
        pose.eyeState = 'happy';
        break;
      }

      // =============================================================
      // 2. RUNNING BEHAVIORS
      // =============================================================
      case 'run_zoomies': {
        const cycle = time * 13;
        const zoomBob = Math.abs(Math.sin(cycle)) * 4.5;
        pose.bodyY -= zoomBob;
        pose.bodyRot = 0.08 + Math.sin(cycle) * 0.04;
        pose.headY -= (zoomBob * 0.6);

        const stride = 10;
        const lift = 10;
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = 0.6 + Math.sin(cycle * 1.5) * 0.5;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        break;
      }

      case 'run_pounce': {
        const cycle = time * 5;
        const pounce = Math.max(0, Math.sin(cycle)) * 12;
        pose.bodyY -= pounce;
        pose.headY -= pounce * 1.2;
        pose.bodyRot = (Math.sin(cycle) > 0 ? -0.15 : 0.05);

        pose.pawFL_x = 8 + (Math.sin(cycle) > 0 ? 5 : -3);
        pose.pawFR_x = 14 + (Math.sin(cycle) > 0 ? 5 : -3);
        pose.pawFL_y = -pounce * 0.8;
        pose.pawFR_y = -pounce * 0.8;
        pose.pawBL_y = -pounce * 0.4;
        pose.pawBR_y = -pounce * 0.4;

        pose.tailAngle = 0.8;
        pose.eyeState = 'wide';
        break;
      }

      case 'run_dash': {
        const cycle = time * 14;
        pose.bodyY -= 3 + Math.sin(cycle) * 2;
        pose.headY -= 4;

        const stride = 11;
        const lift = 9;
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = -0.7;
        pose.eyeState = 'happy';
        break;
      }

      // 4 New Run Animations
      case 'run_gallop_bound': {
        const cycle = time * 11;
        const bound = Math.max(0, Math.sin(cycle)) * 10;
        pose.bodyY -= bound;
        pose.headY -= bound * 1.15;
        pose.squishX = bound > 3 ? 1.15 : 0.92;
        pose.squishY = bound > 3 ? 0.88 : 1.1;

        const forwardReach = bound > 3 ? 6 : -4;
        pose.pawFL_x = 8 + forwardReach;
        pose.pawFR_x = 14 + forwardReach;
        pose.pawFL_y = -bound * 0.9;
        pose.pawFR_y = -bound * 0.9;
        pose.pawBL_y = -bound * 0.4;
        pose.pawBR_y = -bound * 0.4;

        pose.tailAngle = 0.7 + Math.sin(cycle) * 0.4;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        break;
      }

      case 'run_zig_zag': {
        const cycle = time * 13;
        pose.bodyRot = Math.sin(cycle * 0.5) * 0.22;
        pose.headRot = -Math.sin(cycle * 0.5) * 0.15;
        pose.bodyY -= Math.abs(Math.sin(cycle)) * 4;

        const stride = 9;
        const x1 = -Math.cos(cycle) * stride;
        pose.pawFL_x = 8 + x1;
        pose.pawFR_x = 14 - x1;
        pose.pawFL_y = -Math.max(0, Math.sin(cycle)) * 8;
        pose.pawFR_y = -Math.max(0, -Math.sin(cycle)) * 8;

        pose.tailAngle = Math.sin(cycle * 0.5) * 0.8;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        break;
      }

      case 'run_turbo_sprint': {
        const cycle = time * 16;
        pose.bodyY += 2;
        pose.headY += 2;
        pose.squishX = 1.2;
        pose.squishY = 0.85;

        const stride = 12;
        const lift = 8;
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawFR_x = 14 - x1;
        pose.pawFR_y = -Math.max(0, -Math.sin(cycle)) * lift;

        pose.tailAngle = -1.0;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;
      }

      case 'run_drift_slide': {
        pose.bodyRot = -0.24;
        pose.headRot = 0.18;
        pose.squishX = 1.1;
        pose.squishY = 0.92;
        pose.pawFL_x = 14;
        pose.pawFR_x = 18;
        pose.pawBL_x = -16;
        pose.pawBR_x = -10;

        pose.tailAngle = 0.9;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        break;
      }

      // =============================================================
      // 3. IDLE BEHAVIORS
      // =============================================================
      case 'idle_breathe':
        pose.bodyY += Math.sin(time * 3) * 2;
        pose.headY += Math.sin(time * 3) * 1.5;
        pose.tailAngle = Math.sin(time * 1.5) * 0.2;
        break;

      case 'idle_ear_twitch':
        pose.earTwitchL = Math.sin(time * 12) * 0.4;
        pose.earTwitchR = Math.cos(time * 10) * 0.4;
        pose.tailAngle = Math.sin(time * 2) * 0.3;
        break;

      case 'idle_tail_wag':
        pose.tailAngle = Math.sin(time * 8) * 0.7;
        pose.bodyRot = Math.sin(time * 8) * 0.04;
        pose.eyeState = 'happy';
        break;

      case 'idle_look_left_right':
        pose.headRot = Math.sin(time * 2) * 0.35;
        pose.tailAngle = Math.sin(time * 1.5) * 0.25;
        break;

      case 'idle_look_sky':
        pose.headY -= 4;
        pose.headRot = -0.4;
        pose.eyeState = 'wide';
        pose.tailAngle = 0.3;
        break;

      case 'idle_groom_paw': {
        const groom = Math.sin(time * 6) * 4;
        pose.headRot = 0.25;
        pose.headY += 3;
        pose.pawFL_y = -18 + groom;
        pose.eyeState = 'blink';
        pose.mouthState = 'blep';
        break;
      }

      case 'idle_stretch_front':
        pose.bodyY += 6;
        pose.headY += 7;
        pose.pawFL_x = 18;
        pose.pawFR_x = 22;
        pose.tailAngle = 0.8;
        pose.eyeState = 'blink';
        break;

      case 'idle_stretch_back':
        pose.bodyY += 4;
        pose.bodyRot = -0.15;
        pose.pawBL_x = -18;
        pose.pawBR_x = -14;
        pose.tailAngle = -0.4;
        pose.eyeState = 'happy';
        break;

      case 'idle_loaf':
        pose.bodyY += 4;
        pose.headY += 3;
        pose.pawFL_y = -3;
        pose.pawFR_y = -3;
        pose.pawBL_y = -3;
        pose.pawBR_y = -3;
        pose.tailAngle = -0.7;
        pose.eyeState = 'sleep';
        break;

      case 'idle_roll_belly':
        pose.bodyRot = Math.PI * 0.75;
        pose.bodyY += 2;
        pose.headY += 2;
        pose.pawFL_y = -10;
        pose.pawFR_y = -12;
        pose.pawBL_y = -10;
        pose.pawBR_y = -12;
        pose.eyeState = 'happy';
        pose.mouthState = 'w';
        break;

      case 'idle_yawn': {
        const yawn = Math.sin(time * 2);
        pose.mouthState = yawn > 0 ? 'open' : 'w';
        pose.eyeState = yawn > 0 ? 'blink' : 'open';
        pose.headRot = -0.2 * Math.max(0, yawn);
        pose.tailAngle = 0.3;
        break;
      }

      case 'idle_sniff_ground':
        pose.headY += 8;
        pose.headRot = 0.35;
        pose.tailAngle = Math.sin(time * 6) * 0.4;
        pose.mouthState = 'blep';
        break;

      // 4 New Idle Animations
      case 'idle_groom_ears': {
        const groom = Math.sin(time * 7) * 3.5;
        pose.headRot = Math.sin(time * 3.5) * 0.2;
        pose.pawFL_y = -22 + groom;
        pose.pawFR_y = -22 - groom;
        pose.earTwitchL = Math.sin(time * 7) * 0.4;
        pose.earTwitchR = Math.cos(time * 7) * 0.4;
        pose.eyeState = 'happy';
        break;
      }

      case 'idle_curious_sniff_air':
        pose.headY -= 7;
        pose.headRot = -0.32;
        pose.squishX = 1.05;
        pose.squishY = 0.95;
        pose.tailAngle = 0.5 + Math.sin(time * 4) * 0.25;
        pose.eyeState = 'wide';
        pose.mouthState = 'blep';
        break;

      case 'idle_shake_fur': {
        const shake = Math.sin(time * 24) * 0.28;
        pose.bodyRot = shake;
        pose.headRot = -shake * 1.5;
        pose.tailAngle = shake * 2.5;
        pose.earTwitchL = shake * 2;
        pose.earTwitchR = -shake * 2;
        pose.eyeState = 'blink';
        break;
      }

      case 'idle_nap_doze': {
        const nod = Math.max(-0.25, Math.sin(time * 1.8) * 0.35);
        pose.headY += nod * 6;
        pose.headRot = nod * 0.35;
        pose.eyeState = 'sleep';
        pose.tailAngle = -0.3;
        break;
      }

      // =============================================================
      // 4. DANCE BEHAVIORS
      // =============================================================
      case 'dance_head_bob': {
        const beat = Math.sin(time * 9);
        pose.headY += beat * 5;
        pose.bodyY += beat * 3;
        pose.tailAngle = Math.sin(time * 4.5) * 0.6;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_disco_paws': {
        const disco = Math.sin(time * 8);
        pose.pawFL_y = -18 + disco * 5;
        pose.pawFR_y = -18 - disco * 5;
        pose.bodyRot = disco * 0.12;
        pose.headRot = -disco * 0.15;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_side_hop': {
        const side = Math.sin(time * 7);
        pose.bodyRot = side * 0.18;
        pose.bodyY -= Math.abs(side) * 5;
        pose.pawFL_y = -Math.max(0, side) * 8;
        pose.pawFR_y = -Math.max(0, -side) * 8;
        pose.tailAngle = side * 0.8;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_spin_twirl': {
        const spin = Math.sin(time * 6);
        pose.squishX = 0.85 + Math.abs(spin) * 0.3;
        pose.bodyY -= Math.abs(spin) * 6;
        pose.bodyRot = spin * 0.25;
        pose.tailAngle = spin * 1.2;
        pose.eyeState = 'blink';
        break;
      }

      case 'dance_moonwalk': {
        const cycle = time * 6;
        pose.bodyY -= Math.abs(Math.sin(cycle)) * 2;
        pose.pawFL_x = 8 - Math.cos(cycle) * 7;
        pose.pawFR_x = 14 + Math.cos(cycle) * 7;
        pose.tailAngle = 0.6;
        pose.headRot = -0.15;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_breakdance': {
        const breakPhase = time * 10;
        pose.bodyRot = Math.sin(breakPhase) * 0.45;
        pose.bodyY -= 6 + Math.abs(Math.sin(breakPhase)) * 6;
        pose.pawFL_y = -12 + Math.sin(breakPhase) * 8;
        pose.pawFR_y = -12 - Math.sin(breakPhase) * 8;
        pose.tailAngle = Math.sin(breakPhase) * 1.2;
        pose.eyeState = 'happy';
        break;
      }

      // 4 New Dance Animations
      case 'dance_wave_shuffle': {
        const cycle = time * 8;
        pose.headY += Math.sin(cycle) * 5;
        pose.bodyY += Math.sin(cycle - 0.8) * 4;
        pose.tailAngle = Math.sin(cycle - 1.6) * 0.8;
        pose.pawFL_x = 8 + Math.sin(cycle) * 5;
        pose.pawFR_x = 14 - Math.sin(cycle) * 5;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_robot_pop': {
        const step = Math.floor(time * 4.5) % 4;
        pose.bodyRot = (step % 2 === 0 ? 0.16 : -0.16);
        pose.headRot = (step > 1 ? 0.22 : -0.22);
        pose.pawFL_y = (step === 0 || step === 2) ? -8 : 0;
        pose.pawFR_y = (step === 1 || step === 3) ? -8 : 0;
        pose.eyeState = 'wide';
        break;
      }

      case 'dance_jump_hype': {
        const cycle = time * 9;
        const jump = Math.max(0, Math.sin(cycle)) * 14;
        pose.bodyY -= jump;
        pose.headY -= jump * 1.1;
        pose.pawFL_y = -8 - jump * 0.3;
        pose.pawFR_y = -8 - jump * 0.3;
        pose.squishX = jump > 2 ? 0.9 : 1.14;
        pose.squishY = jump > 2 ? 1.14 : 0.88;
        pose.tailAngle = 0.8 + Math.sin(cycle) * 0.4;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        break;
      }

      case 'dance_tap_groove': {
        const cycle = time * 12;
        pose.pawFL_y = -Math.max(0, Math.sin(cycle)) * 6;
        pose.pawFR_y = -Math.max(0, -Math.sin(cycle)) * 6;
        pose.headRot = Math.sin(time * 6) * 0.22;
        pose.tailAngle = Math.cos(time * 6) * 0.65;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;
      }

      // =============================================================
      // 5. PLAY BEHAVIORS
      // =============================================================
      case 'play_paw_bat': {
        const bat = Math.sin(time * 8) * 6;
        pose.pawFL_y = -18 + bat;
        pose.pawFL_x = 16 + bat * 0.5;
        pose.headRot = 0.15;
        pose.tailAngle = 0.5;
        pose.eyeState = 'wide';
        break;
      }

      case 'play_double_pounce': {
        const pounce = Math.max(0, Math.sin(time * 6)) * 10;
        pose.bodyY -= pounce;
        pose.pawFL_y = -pounce * 0.9;
        pose.pawFR_y = -pounce * 0.9;
        pose.eyeState = 'happy';
        break;
      }

      case 'play_chase_tail': {
        const spin = time * 8;
        pose.bodyRot = Math.sin(spin) * 0.35;
        pose.headRot = 0.45;
        pose.tailAngle = 1.2;
        pose.eyeState = 'happy';
        break;
      }

      case 'play_curious_tilt':
        pose.headRot = Math.sin(time * 2.5) * 0.4;
        pose.eyeState = 'wide';
        pose.tailAngle = 0.4;
        break;

      // 4 New Play Animations
      case 'play_somersault_roll': {
        const rollAngle = (time * 6) % (Math.PI * 2);
        pose.squishX = 0.95;
        pose.squishY = 0.95;
        pose.bodyRot = rollAngle;
        pose.headRot = rollAngle * 0.8;
        pose.pawFL_y = -6;
        pose.pawFR_y = -6;
        pose.pawBL_y = -6;
        pose.pawBR_y = -6;
        pose.eyeState = 'happy';
        break;
      }

      case 'play_peek_a_boo': {
        const peekCycle = Math.sin(time * 3);
        if (peekCycle > 0) {
          pose.pawFL_y = -22;
          pose.pawFR_y = -22;
          pose.pawFL_x = 10;
          pose.pawFR_x = 12;
          pose.eyeState = 'blink';
        } else {
          pose.pawFL_y = -8;
          pose.pawFR_y = -8;
          pose.pawFL_x = 20;
          pose.pawFR_x = 24;
          pose.eyeState = 'wide';
          pose.mouthState = 'open';
        }
        break;
      }

      case 'play_butterfly_hop': {
        const hop = Math.max(0, Math.sin(time * 6)) * 11;
        pose.headRot = -0.42;
        pose.bodyY -= hop;
        pose.pawFL_y = -14 - hop * 0.2;
        pose.pawFR_y = -10 - hop * 0.2;
        pose.tailAngle = 0.7;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        break;
      }

      case 'play_wiggle_butt_pounce': {
        const wigglePhase = (time * 1.5) % 2;
        if (wigglePhase < 1.2) {
          const shake = Math.sin(time * 20) * 0.28;
          pose.bodyRot = shake * 0.8;
          pose.tailAngle = shake * 2.2;
          pose.eyeState = 'wide';
        } else {
          const spring = Math.sin((wigglePhase - 1.2) * Math.PI / 0.8) * 12;
          pose.bodyY -= spring;
          pose.pawFL_y = -spring;
          pose.pawFR_y = -spring;
          pose.eyeState = 'happy';
          pose.mouthState = 'open';
        }
        break;
      }

      // =============================================================
      // 6. SLEEP BEHAVIORS
      // =============================================================
      case 'sleep_curled':
        pose.bodyY = 0;
        pose.headY = -12;
        pose.headRot = 0.35;
        pose.tailAngle = -1.2;
        pose.eyeState = 'sleep';
        pose.squishX = 1.08;
        pose.squishY = 0.92;
        break;

      case 'sleep_loaf':
        pose.bodyY = -2;
        pose.headY = -14;
        pose.pawFL_y = -2;
        pose.pawFR_y = -2;
        pose.pawBL_y = -2;
        pose.pawBR_y = -2;
        pose.tailAngle = -0.8;
        pose.eyeState = 'sleep';
        break;

      case 'sleep_twitch':
        pose.bodyY = 0;
        pose.headY = -12;
        pose.earTwitchL = Math.sin(time * 14) * 0.3;
        pose.pawFL_y = -2 + Math.sin(time * 12) * 2;
        pose.tailAngle = -1.0 + Math.sin(time * 8) * 0.15;
        pose.eyeState = 'sleep';
        break;

      case 'sleep_deep':
        pose.bodyY = 0;
        pose.headY = -10;
        pose.headRot = 0.4;
        pose.tailAngle = -1.3;
        pose.eyeState = 'sleep';
        pose.squishX = 1.12;
        pose.squishY = 0.88;
        break;

      // 4 New Sleep Animations
      case 'sleep_belly_up':
        pose.bodyRot = Math.PI * 0.85;
        pose.bodyY = 4;
        pose.headY = -10;
        pose.pawFL_y = -9 + Math.sin(time * 2) * 2;
        pose.pawFR_y = -11 - Math.sin(time * 2) * 2;
        pose.pawBL_y = -9 + Math.cos(time * 2) * 2;
        pose.pawBR_y = -11 - Math.cos(time * 2) * 2;
        pose.squishY = 1.0 + Math.sin(time * 2) * 0.08;
        pose.eyeState = 'sleep';
        break;

      case 'sleep_snore_bubble': {
        const cycle = time * 2.2;
        pose.bodyY = -2 + Math.sin(cycle) * 3;
        pose.headY = -14 + Math.sin(cycle) * 2;
        pose.squishX = 1.06 + Math.sin(cycle) * 0.08;
        pose.squishY = 0.94 - Math.sin(cycle) * 0.08;
        pose.tailAngle = -1.1;
        pose.eyeState = 'sleep';
        pose.mouthState = 'open';
        break;
      }

      case 'sleep_dream_run': {
        const cycle = time * 8;
        pose.bodyY = -1;
        pose.headY = -12;
        pose.bodyRot = 0.12;
        pose.pawFL_x = 8 + Math.sin(cycle) * 3.5;
        pose.pawFR_x = 14 - Math.sin(cycle) * 3.5;
        pose.tailAngle = -0.6 + Math.sin(time * 10) * 0.18;
        pose.eyeState = 'sleep';
        pose.mouthState = 'blep';
        break;
      }

      case 'sleep_cozy_cuddle':
        pose.bodyY = 0;
        pose.headY = -12;
        pose.headRot = 0.32;
        pose.squishX = 1.12;
        pose.squishY = 0.88;
        pose.pawFL_y = -5;
        pose.pawFR_y = -5;
        pose.tailAngle = -1.4;
        pose.eyeState = 'sleep';
        pose.mouthState = 'happy';
        break;

      // =============================================================
      // 7. DRAGGING & FALLING
      // =============================================================
      case 'drag_startled': {
        pose.bodyRot = (Math.random() - 0.5) * 0.15;
        pose.headRot = (Math.random() - 0.5) * 0.2;
        pose.bodyY -= 14;
        pose.headY -= 24;
        pose.squishX = 0.86;
        pose.squishY = 1.20;
        pose.pawFL_y = -8;
        pose.pawFR_y = -8;
        pose.pawBL_y = 4;
        pose.pawBR_y = 4;
        pose.tailAngle = 0.9;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        break;
      }

      case 'drag_groggy_hang': {
        const sway = Math.sin(time * 2.2) * 0.08;
        pose.bodyRot = sway;
        pose.headRot = 0.25 - sway * 0.4;
        pose.bodyY -= 12;
        pose.headY -= 20;
        pose.squishX = 0.94;
        pose.squishY = 1.10;
        pose.pawFL_y = 2 + Math.sin(time * 2.0) * 2;
        pose.pawFR_y = 2 - Math.sin(time * 2.0) * 2;
        pose.pawBL_y = 6 + Math.cos(time * 2.0) * 2;
        pose.pawBR_y = 6 - Math.cos(time * 2.0) * 2;
        pose.tailAngle = -1.1 - sway * 1.5;
        pose.eyeState = 'sleep';
        pose.mouthState = 'blep';
        break;
      }

      case 'drag_dangle': {
        const sway = Math.sin(time * 3.5) * 0.12;
        pose.bodyRot = sway;
        pose.headRot = -sway * 0.5;
        pose.bodyY -= 14;
        pose.headY -= 24;
        pose.squishX = 0.92;
        pose.squishY = 1.14;
        pose.pawFL_y = 5 + Math.sin(time * 2.8) * 4;
        pose.pawFR_y = 5 - Math.sin(time * 2.8) * 4;
        pose.pawBL_y = 9 + Math.cos(time * 2.8) * 4;
        pose.pawBR_y = 9 - Math.cos(time * 2.8) * 4;
        pose.tailAngle = -sway * 2.2;
        pose.eyeState = 'sleep';
        pose.mouthState = 'w';
        break;
      }

      case 'drag_active_hang': {
        const kick = Math.sin(time * 11) * 6;
        pose.bodyY -= 16;
        pose.headY -= 26;
        pose.squishX = 0.88;
        pose.squishY = 1.18;
        pose.pawFL_y = -4 + kick;
        pose.pawFR_y = -4 - kick;
        pose.pawBL_y = 6 - kick;
        pose.pawBR_y = 6 + kick;
        pose.tailAngle = Math.sin(time * 9) * 0.8;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        break;
      }

      case 'fall_freefall':
        pose.squishX = 0.78;
        pose.squishY = 1.28;
        pose.bodyRot = -0.16;
        pose.headY -= 7;
        pose.pawFL_y = -14;
        pose.pawFR_y = -14;
        pose.pawBL_y = 7;
        pose.pawBR_y = 7;
        pose.tailAngle = -0.85;
        pose.eyeState = 'wide';
        break;

      case 'impact_squish': {
        const squishPhase = Math.sin(phase * Math.PI);
        pose.squishX = 1.0 + squishPhase * 0.48;
        pose.squishY = 1.0 - squishPhase * 0.38;
        pose.bodyY += squishPhase * 9;
        pose.headY += squishPhase * 11;
        pose.eyeState = 'blink';
        break;
      }

      case 'impact_shake_off': {
        const shake = Math.sin(phase * Math.PI * 14) * 0.32;
        pose.bodyRot = shake;
        pose.headRot = -shake * 1.6;
        pose.tailAngle = shake * 2.2;
        pose.eyeState = 'happy';
        break;
      }

      case 'petting_love':
        pose.headRot = 0.24;
        pose.headY -= 3;
        pose.tailAngle = Math.sin(time * 12) * 0.65;
        pose.squishX = 1.06;
        pose.squishY = 0.94;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;

      default:
        pose.tailAngle = Math.sin(time * 2) * 0.2;
        pose.eyeState = 'open';
        break;
    }

    // Species-specific dynamic physics adjustments
    if (species === 'bunny') {
      pose.earTwitchL += Math.sin(time * 6) * 0.2;
      pose.earTwitchR += Math.cos(time * 6) * 0.2;
    } else if (species === 'penguin') {
      pose.wingFlap = Math.sin(time * 8) * 0.7;
    } else if (species === 'fox') {
      pose.tailAngle *= 1.25;
    } else if (species === 'dragon') {
      pose.wingFlap = Math.sin(time * 6) * 0.8;
    } else if (species === 'slime') {
      pose.squishX = 1.0 + Math.sin(time * 4) * 0.18;
      pose.squishY = 1.0 - Math.sin(time * 4) * 0.18;
    } else if (species === 'pikachu') {
      pose.earTwitchL += Math.sin(time * 7) * 0.3;
      pose.earTwitchR += Math.cos(time * 7) * 0.3;
      pose.tailAngle *= 1.3;
    } else if (species === 'jett') {
      pose.tailAngle = Math.sin(time * 5) * 0.45;
    } else if (species === 'mario') {
      pose.squishY *= 0.96;
    }

    return pose;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationBehaviors;
}
