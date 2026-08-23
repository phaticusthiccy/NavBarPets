/**
 * @file animationBehaviors.js
 * @description Procedural Kinematics & Sub-Action Animation Library for NavBarPets.
 * Defines 50+ unique quadruped and biped procedural kinematic cycles with
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
        'idle_sniff_ground'
      ],
      walk: [
        'walk_normal',
        'walk_playful_hop',
        'walk_prowl_sneak',
        'walk_tiptoe',
        'walk_backwards'
      ],
      run: [
        'run_zoomies',
        'run_pounce',
        'run_dash'
      ],
      dance: [
        'dance_head_bob',
        'dance_disco_paws',
        'dance_side_hop',
        'dance_spin_twirl',
        'dance_moonwalk',
        'dance_breakdance'
      ],
      play: [
        'play_paw_bat',
        'play_double_pounce',
        'play_chase_tail',
        'play_curious_tilt'
      ],
      sleep: [
        'sleep_curled',
        'sleep_loaf',
        'sleep_twitch',
        'sleep_deep'
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
      // 1. WALKING & RUNNING (Diagonal Gait & Step Lifting)
      // =============================================================
      case 'walk_normal': {
        const cycle = time * 7.5;
        const bob = Math.abs(Math.sin(cycle)) * 3.5;
        pose.bodyY -= bob;
        pose.headY -= bob * 0.6;
        pose.bodyRot = Math.sin(cycle) * 0.04;

        // Correct Harmonic Swing-Stance Phase Sync:
        // Swing (Air): paw lifts (-lift) while traveling backward -> forward (+stride).
        // Stance (Ground): paw is on ground (y = 0) while pushing forward -> backward (-stride).
        const stride = 8.5;
        const lift = 6.5;

        // Front-Left & Back-Right (Pair 1)
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        // Front-Right & Back-Left (Pair 2 - Opposite Phase)
        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = Math.sin(cycle * 0.5) * 0.35;
        pose.wingFlap = Math.sin(cycle) * 0.4;
        break;
      }

      case 'walk_playful_hop': {
        const cycle = time * 6;
        const hop = Math.max(0, Math.sin(cycle)) * 14;
        pose.bodyY -= hop;
        pose.headY -= hop * 1.1;
        pose.groundOffset = -hop;
        pose.squishX = 1.0;
        pose.squishY = 1.0;

        const hopLift = Math.max(0, Math.sin(cycle)) * 7;
        const hopReach = -Math.cos(cycle) * 5;
        pose.pawFL_x = 10 + hopReach;
        pose.pawFL_y = -hopLift;
        pose.pawFR_x = 16 + hopReach;
        pose.pawFR_y = -hopLift;
        pose.pawBL_x = -12 + hopReach * 0.6;
        pose.pawBL_y = -hopLift * 0.5;
        pose.pawBR_x = -6 + hopReach * 0.6;
        pose.pawBR_y = -hopLift * 0.5;

        pose.tailAngle = Math.sin(cycle) * 0.5;
        pose.eyeState = 'happy';
        break;
      }

      case 'walk_prowl_sneak': {
        const cycle = time * 4.5;
        pose.bodyY += 5; // low stealth crouch
        pose.headY += 7;
        pose.headRot = -0.12;
        pose.bodyRot = Math.sin(cycle) * 0.04;

        const stride = 7;
        const lift = 7.5;

        // Pair 1
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8;

        // Pair 2
        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.8;
        pose.pawBL_y = -y2 * 0.8;

        pose.tailAngle = 0.6 + Math.sin(cycle) * 0.25;
        pose.eyeState = 'wide';
        break;
      }

      case 'walk_tiptoe': {
        const cycle = time * 6.5;
        const bob = Math.abs(Math.sin(cycle)) * 2;
        pose.bodyY -= (4 + bob);
        pose.headY -= (6 + bob * 0.5);

        const stride = 6;
        const lift = 7;

        // Pair 1
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1 - 2;
        pose.pawBR_x = -6 + x1 * 0.8;
        pose.pawBR_y = -y1 * 0.8 - 2;

        // Pair 2
        const x2 = Math.cos(cycle) * stride;
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
        pose.headRot = 0.25; // looking back over shoulder

        const stride = 6;
        const lift = 6;

        // Walking backwards: foot lifts while swinging front -> back, pushes while on ground back -> front
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

      case 'run_zoomies': {
        const cycle = time * 13;
        const zoomBob = Math.abs(Math.sin(cycle)) * 4.5;
        pose.bodyY -= zoomBob;
        pose.bodyRot = 0.08 + Math.sin(cycle) * 0.04;
        pose.headY -= (zoomBob * 0.6);
        pose.headRot = 0.06;
        pose.squishX = 1.0 + Math.sin(cycle) * 0.03;
        pose.squishY = 1.0 - Math.sin(cycle) * 0.03;

        const stride = 10;
        const lift = 8.5;

        // Pair 1
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        // Pair 2
        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = 0.35 + Math.sin(cycle * 0.5) * 0.4;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        pose.wingFlap = Math.sin(cycle) * 0.8;
        break;
      }

      case 'run_pounce': {
        const pCycle = phase * Math.PI;
        const pounceHeight = Math.sin(pCycle) * 14;
        pose.bodyY -= pounceHeight;
        pose.headY -= pounceHeight * 0.9;
        pose.groundOffset = -pounceHeight;
        pose.bodyRot = -Math.cos(pCycle) * 0.15;
        pose.squishX = 1.0;
        pose.squishY = 1.0;

        const frontLift = Math.max(0, Math.sin(pCycle)) * 6;
        pose.pawFL_x = 12;
        pose.pawFR_x = 18;
        pose.pawFL_y = -frontLift;
        pose.pawFR_y = -frontLift;
        pose.pawBL_y = -frontLift * 0.5;
        pose.pawBR_y = -frontLift * 0.5;

        pose.eyeState = 'stars';
        break;
      }

      case 'run_dash': {
        const cycle = time * 15;
        const bob = Math.abs(Math.sin(cycle)) * 3.5;
        pose.bodyY -= bob;
        pose.bodyRot = 0.1;
        pose.headY -= bob * 0.7;
        pose.squishX = 1.0;
        pose.squishY = 1.0;

        const stride = 9;
        const lift = 7.5;

        // Pair 1
        const x1 = -Math.cos(cycle) * stride;
        const y1 = Math.max(0, Math.sin(cycle)) * lift;
        pose.pawFL_x = 8 + x1;
        pose.pawFL_y = -y1;
        pose.pawBR_x = -6 + x1 * 0.85;
        pose.pawBR_y = -y1 * 0.85;

        // Pair 2
        const x2 = Math.cos(cycle) * stride;
        const y2 = Math.max(0, -Math.sin(cycle)) * lift;
        pose.pawFR_x = 14 + x2;
        pose.pawFR_y = -y2;
        pose.pawBL_x = -12 + x2 * 0.85;
        pose.pawBL_y = -y2 * 0.85;

        pose.tailAngle = 0.45 + Math.sin(cycle * 0.5) * 0.3;
        pose.eyeState = 'happy';
        break;
      }

      // =============================================================
      // 2. IDLE & RELAXATION
      // =============================================================
      case 'idle_breathe':
        pose.tailAngle = Math.sin(time * 2.5) * 0.25;
        pose.eyeState = (Math.sin(time * 0.8) > 0.92) ? 'blink' : 'open';
        break;

      case 'idle_ear_twitch':
        pose.tailAngle = Math.sin(time * 4) * 0.35;
        pose.earTwitchL = Math.sin(phase * Math.PI * 6) * 0.45;
        pose.earTwitchR = Math.cos(phase * Math.PI * 4) * 0.35;
        pose.headRot = Math.sin(phase * Math.PI * 2) * 0.12;
        break;

      case 'idle_tail_wag':
        pose.tailAngle = Math.sin(time * 8) * 0.65;
        pose.bodyRot = Math.sin(time * 8) * 0.06;
        pose.eyeState = 'happy';
        pose.mouthState = 'smile';
        break;

      case 'idle_look_left_right':
        pose.headRot = Math.sin(phase * Math.PI * 2) * 0.35;
        pose.headY += Math.abs(Math.sin(phase * Math.PI * 2)) * -2;
        break;

      case 'idle_look_sky':
        pose.headRot = -0.38 * Math.sin(phase * Math.PI);
        pose.headY += -5 * Math.sin(phase * Math.PI);
        pose.eyeState = 'wide';
        break;

      case 'idle_groom_paw':
        pose.headRot = 0.28;
        pose.headY += 3;
        pose.pawFR_x = 6;
        pose.pawFR_y = -11 + Math.sin(time * 7) * 4;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;

      case 'idle_stretch_front':
        pose.bodyY += 5 * Math.sin(phase * Math.PI);
        pose.headY += 7 * Math.sin(phase * Math.PI);
        pose.pawFL_x = 18;
        pose.pawFR_x = 24;
        pose.squishX = 1.18;
        pose.squishY = 0.82;
        pose.tailAngle = -0.6;
        pose.eyeState = 'sleep';
        break;

      case 'idle_stretch_back':
        pose.bodyY -= 5 * Math.sin(phase * Math.PI);
        pose.headY += 2;
        pose.pawBL_x = -20;
        pose.pawBR_x = -14;
        pose.tailAngle = 0.7;
        pose.squishX = 1.12;
        pose.eyeState = 'happy';
        break;

      case 'idle_loaf':
        pose.bodyY += 6;
        pose.headY += 4;
        pose.pawFL_y = 6;
        pose.pawFR_y = 6;
        pose.pawBL_y = 6;
        pose.pawBR_y = 6;
        pose.squishX = 1.12;
        pose.squishY = 0.88;
        pose.tailAngle = 0.8;
        pose.eyeState = (Math.sin(time * 0.5) > 0.2) ? 'sleep' : 'happy';
        break;

      case 'idle_roll_belly':
        const rollAngle = Math.sin(phase * Math.PI) * Math.PI * 0.85;
        pose.bodyRot = rollAngle;
        pose.bodyY += 6;
        pose.headRot = rollAngle * 0.8;
        pose.pawFL_y = -9;
        pose.pawFR_y = -13;
        pose.pawBL_y = -9;
        pose.pawBR_y = -13;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;

      case 'idle_yawn': {
        const yawnCurve = Math.sin(phase * Math.PI);
        pose.mouthState = yawnCurve > 0.25 ? 'open' : 'w';
        pose.eyeState = yawnCurve > 0.2 ? 'sleep' : 'open';
        pose.headRot = -yawnCurve * 0.3;
        pose.headY -= yawnCurve * 4;
        pose.squishX = 1.0 + yawnCurve * 0.12;
        pose.squishY = 1.0 - yawnCurve * 0.12;
        break;
      }

      case 'idle_sniff_ground':
        pose.headRot = 0.38 + Math.sin(time * 9) * 0.12;
        pose.headY += 6;
        pose.tailAngle = Math.sin(time * 11) * 0.45;
        break;

      // =============================================================
      // 3. PLAY & INTERACTION
      // =============================================================
      case 'play_paw_bat': {
        const bat = Math.sin(phase * Math.PI * 5);
        pose.headRot = 0.22;
        pose.pawFR_x = 18 + bat * 9;
        pose.pawFR_y = -12 - bat * 7;
        pose.eyeState = 'wide';
        pose.tailAngle = Math.sin(time * 11) * 0.55;
        break;
      }

      case 'play_double_pounce': {
        const pounce = Math.sin(phase * Math.PI);
        pose.bodyY -= pounce * 16;
        pose.groundOffset = -pounce * 16;
        pose.bodyRot = -pounce * 0.3;
        pose.pawFL_x = 16;
        pose.pawFR_x = 22;
        pose.pawFL_y = -9;
        pose.pawFR_y = -9;
        pose.eyeState = 'stars';
        break;
      }

      case 'play_chase_tail': {
        const spin = phase * Math.PI * 4;
        pose.bodyRot = Math.sin(spin) * 0.3;
        pose.headRot = -0.4;
        pose.tailAngle = 1.4 + Math.sin(spin * 2) * 0.3;
        pose.pawFL_x = 8 + Math.sin(spin) * 10;
        pose.pawFR_x = 14 - Math.sin(spin) * 10;
        pose.pawBL_x = -12 - Math.sin(spin) * 10;
        pose.pawBR_x = -6 + Math.sin(spin) * 10;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        break;
      }

      case 'play_curious_tilt':
        pose.headRot = Math.sin(phase * Math.PI * 2) * 0.48;
        pose.headY -= 2;
        pose.tailAngle = Math.sin(time * 3.5) * 0.35;
        pose.eyeState = 'wide';
        pose.mouthState = 'blep';
        break;

      // =============================================================
      // 4. MUSIC & DANCING
      // =============================================================
      case 'dance_head_bob': {
        const beat = time * 9;
        const bob = Math.abs(Math.sin(beat)) * 9;
        pose.headY += bob - 4;
        pose.headRot = Math.sin(beat * 0.5) * 0.28;
        pose.bodyY += bob * 0.5;
        pose.tailAngle = Math.sin(beat) * 0.65;
        pose.eyeState = 'happy';
        pose.mouthState = 'open';
        break;
      }

      case 'dance_disco_paws': {
        const rave = time * 10;
        pose.bodyY -= Math.abs(Math.sin(rave)) * 6;
        pose.pawFL_y = -18 + Math.sin(rave) * 9;
        pose.pawFR_y = -18 - Math.sin(rave) * 9;
        pose.headRot = Math.sin(rave * 0.5) * 0.32;
        pose.tailAngle = Math.sin(rave) * 0.85;
        pose.eyeState = 'stars';
        pose.mouthState = 'open';
        break;
      }

      case 'dance_side_hop': {
        const hop = time * 7.5;
        const sideHop = Math.abs(Math.sin(hop)) * 15;
        pose.bodyY -= sideHop;
        pose.groundOffset = -sideHop;
        pose.bodyRot = Math.sin(hop) * 0.28;
        pose.headRot = -Math.sin(hop) * 0.22;
        pose.squishX = sideHop > 3 ? 0.84 : 1.22;
        pose.squishY = sideHop > 3 ? 1.22 : 0.78;
        pose.tailAngle = Math.sin(hop * 2) * 0.75;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_spin_twirl': {
        const spin = (phase * Math.PI * 4) % (Math.PI * 2);
        pose.squishX = Math.cos(spin);
        pose.bodyY -= 9 * Math.sin(phase * Math.PI);
        pose.groundOffset = -9 * Math.sin(phase * Math.PI);
        pose.tailAngle = Math.sin(time * 12) * 0.85;
        pose.eyeState = 'stars';
        break;
      }

      case 'dance_moonwalk': {
        const mw = time * 6;
        pose.bodyRot = -0.15;
        pose.bodyY -= Math.abs(Math.sin(mw)) * 2;
        pose.pawFL_x = 8 - Math.sin(mw) * 10;
        pose.pawFR_x = 14 + Math.sin(mw) * 10;
        pose.pawBL_x = -12 + Math.sin(mw) * 8;
        pose.pawBR_x = -6 - Math.sin(mw) * 8;
        pose.pawFL_y = -Math.max(0, Math.sin(mw)) * 4;
        pose.pawFR_y = -Math.max(0, -Math.sin(mw)) * 4;
        pose.eyeState = 'happy';
        break;
      }

      case 'dance_breakdance': {
        const rot = phase * Math.PI * 6;
        pose.bodyRot = rot;
        pose.bodyY += 3;
        pose.headRot = rot * 0.5;
        pose.pawFL_y = -12;
        pose.pawFR_y = -12;
        pose.pawBL_y = -12;
        pose.pawBR_y = -12;
        pose.tailAngle = Math.sin(time * 14);
        pose.eyeState = 'happy';
        break;
      }

      // =============================================================
      // 5. SLEEP & NAP
      // =============================================================
      case 'sleep_curled':
        pose.bodyY += 8;
        pose.headY += 8;
        pose.headRot = 0.42;
        pose.tailAngle = 1.25;
        pose.squishX = 1.1;
        pose.squishY = 0.9;
        pose.eyeState = 'sleep';
        pose.pawFL_y = 6;
        pose.pawFR_y = 6;
        pose.pawBL_y = 6;
        pose.pawBR_y = 6;
        break;

      case 'sleep_loaf':
        pose.bodyY += 7;
        pose.headY += 5;
        pose.pawFL_y = 6;
        pose.pawFR_y = 6;
        pose.pawBL_y = 6;
        pose.pawBR_y = 6;
        pose.squishX = 1.12;
        pose.squishY = 0.88;
        pose.tailAngle = 0.9;
        pose.eyeState = 'sleep';
        break;

      case 'sleep_twitch':
        pose.bodyY += 8;
        pose.headY += 8;
        pose.tailAngle = 1.1 + Math.sin(time * 12) * 0.15;
        pose.earTwitchL = Math.sin(time * 14) * 0.3;
        pose.earTwitchR = Math.cos(time * 14) * 0.25;
        pose.pawFL_y = 6 - Math.max(0, Math.sin(time * 10)) * 4;
        pose.eyeState = 'sleep';
        break;

      case 'sleep_deep': {
        const snore = Math.sin(time * 1.6);
        pose.bodyY += 8 + snore * 1.8;
        pose.headY += 8 + snore * 1.2;
        pose.squishX = 1.06 + snore * 0.05;
        pose.squishY = 0.94 - snore * 0.05;
        pose.tailAngle = 1.05;
        pose.eyeState = 'sleep';
        break;
      }

      // =============================================================
      // 6. DRAG, FALL & IMPACT INTERRUPTIONS
      // =============================================================
      case 'drag_startled':
        pose.bodyY -= 10;
        pose.headY -= 14;
        pose.squishX = 0.84;
        pose.squishY = 1.22;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        pose.pawFL_y = -7;
        pose.pawFR_y = -7;
        pose.pawBL_y = 5;
        pose.pawBR_y = 5;
        break;

      case 'drag_groggy_hang': {
        const sway = Math.sin(time * 3.5) * 0.22;
        pose.bodyRot = sway;
        pose.headRot = sway * 0.6;
        pose.bodyY -= 14;
        pose.headY -= 24;
        pose.squishX = 0.92;
        pose.squishY = 1.14;
        pose.pawFL_y = 5 + Math.sin(time * 2.8) * 4;
        pose.pawFR_y = 5 - Math.sin(time * 2.8) * 4;
        pose.pawBL_y = 9 + Math.cos(time * 2.8) * 4;
        pose.pawBR_y = 9 - Math.cos(time * 2.8) * 4;
        pose.tailAngle = -sway * 2.2;
        pose.eyeState = 'sleep'; // half-asleep groggy dangling
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

    return pose;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationBehaviors;
}
