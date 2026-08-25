/**
 * @file playSleepInteractBehaviors.js
 * @description Playful Interactions, Circadian Sleep Poses, Drag-and-Drop, Landing Shockwaves, and 11-Species Petting Love Kinematics.
 */

const PlaySleepInteractBehaviors = {
  applyPlaySleepInteractBehavior(behavior, pose, phase, time, species) {
    switch (behavior) {
      // =============================================================
      // PLAY BEHAVIORS
      // =============================================================
      case 'play_paw_bat': {
        const bat = Math.sin(time * 8) * 6;
        pose.pawFL_y = -18 + bat;
        pose.pawFL_x = 16 + bat * 0.5;
        pose.headRot = 0.15;
        pose.tailAngle = 0.5;
        pose.eyeState = 'wide';
        return true;
      }

      case 'play_double_pounce': {
        const pounce = Math.max(0, Math.sin(time * 6)) * 10;
        pose.bodyY -= pounce;
        pose.pawFL_y = -pounce * 0.9;
        pose.pawFR_y = -pounce * 0.9;
        pose.eyeState = 'happy';
        return true;
      }

      case 'play_chase_tail': {
        const spin = time * 8;
        pose.bodyRot = Math.sin(spin) * 0.35;
        pose.headRot = 0.45;
        pose.tailAngle = 1.2;
        pose.eyeState = 'happy';
        return true;
      }

      case 'play_curious_tilt':
        pose.headRot = Math.sin(time * 2.5) * 0.4;
        pose.eyeState = 'wide';
        pose.tailAngle = 0.4;
        return true;

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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }

      // =============================================================
      // SLEEP BEHAVIORS
      // =============================================================
      case 'sleep_curled':
        pose.bodyY = 0;
        pose.headY = -12;
        pose.headRot = 0.35;
        pose.tailAngle = -1.2;
        pose.eyeState = 'sleep';
        pose.squishX = 1.08;
        pose.squishY = 0.92;
        return true;

      case 'sleep_loaf':
        pose.bodyY = -2;
        pose.headY = -14;
        pose.pawFL_y = -2;
        pose.pawFR_y = -2;
        pose.pawBL_y = -2;
        pose.pawBR_y = -2;
        pose.tailAngle = -0.8;
        pose.eyeState = 'sleep';
        return true;

      case 'sleep_twitch':
        pose.bodyY = 0;
        pose.headY = -12;
        pose.earTwitchL = Math.sin(time * 14) * 0.3;
        pose.pawFL_y = -2 + Math.sin(time * 12) * 2;
        pose.tailAngle = -1.0 + Math.sin(time * 8) * 0.15;
        pose.eyeState = 'sleep';
        return true;

      case 'sleep_deep':
        pose.bodyY = 0;
        pose.headY = -10;
        pose.headRot = 0.4;
        pose.tailAngle = -1.3;
        pose.eyeState = 'sleep';
        pose.squishX = 1.12;
        pose.squishY = 0.88;
        return true;

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
        return true;

      case 'sleep_snore_bubble': {
        const cycle = time * 2.2;
        pose.bodyY = -2 + Math.sin(cycle) * 3;
        pose.headY = -14 + Math.sin(cycle) * 2;
        pose.squishX = 1.06 + Math.sin(cycle) * 0.08;
        pose.squishY = 0.94 - Math.sin(cycle) * 0.08;
        pose.tailAngle = -1.1;
        pose.eyeState = 'sleep';
        pose.mouthState = 'open';
        return true;
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
        return true;
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
        return true;

      // =============================================================
      // DRAGGING, FALLING & LANDING
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
        return true;
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
        return true;
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
        return true;
      }

      case 'drag_active_hang': {
        const kick = Math.sin(time * 11) * 5;
        pose.bodyY = -18;
        pose.headY = -34;
        pose.squishX = 0.95;
        pose.squishY = 1.06;
        pose.pawFL_y = -3 + kick;
        pose.pawFR_y = -3 - kick;
        pose.pawBL_y = 3 - kick;
        pose.pawBR_y = 3 + kick;
        pose.tailAngle = Math.sin(time * 9) * 0.6;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        return true;
      }

      case 'fall_freefall':
        pose.squishX = 0.94;
        pose.squishY = 1.08;
        pose.bodyRot = -0.1 + Math.sin(time * 8) * 0.05;
        pose.headY = -34;
        pose.headRot = 0.08;
        pose.pawFL_y = -6 + Math.sin(time * 14) * 2.5;
        pose.pawFR_y = -6 - Math.sin(time * 14) * 2.5;
        pose.pawBL_y = 3;
        pose.pawBR_y = 3;
        pose.tailAngle = -0.4 + Math.sin(time * 10) * 0.25;
        pose.eyeState = 'wide';
        pose.mouthState = 'open';
        return true;

      case 'impact_squish': {
        const squishPhase = Math.sin(phase * Math.PI);
        pose.squishX = 1.0 + squishPhase * 0.30;
        pose.squishY = 1.0 - squishPhase * 0.24;
        pose.bodyY = -16 + squishPhase * 4;
        pose.headY = -32 + squishPhase * 5;
        pose.pawFL_x = 9 + squishPhase * 2.5;
        pose.pawFR_x = 15 + squishPhase * 2.5;
        pose.pawBL_x = -13 - squishPhase * 2.5;
        pose.pawBR_x = -7 - squishPhase * 2.5;
        pose.eyeState = 'blink';
        pose.mouthState = 'w';
        return true;
      }

      case 'impact_shake_off': {
        const rebound = Math.sin(phase * Math.PI) * 3.5;
        const shake = Math.sin(phase * Math.PI * 14) * 0.22;
        pose.bodyY = -16 - rebound;
        pose.headY = -32 - rebound * 1.2;
        pose.bodyRot = shake;
        pose.headRot = -shake * 1.4;
        pose.tailAngle = shake * 1.8;
        pose.squishX = 1.0 - rebound * 0.03;
        pose.squishY = 1.0 + rebound * 0.04;
        pose.eyeState = 'happy';
        pose.mouthState = 'w';
        return true;
      }

      // =============================================================
      // SPECIES-SPECIFIC PETTING LOVE
      // =============================================================
      case 'petting_love':
        pose.eyeState = 'happy';

        switch (species) {
          case 'neko':
            pose.headRot = 0.32 + Math.sin(time * 6) * 0.08;
            pose.headY = -34 + Math.sin(time * 16) * 1.5;
            pose.tailAngle = 0.45 + Math.sin(time * 14) * 0.65;
            pose.earTwitchL = Math.sin(time * 8) * 0.3;
            pose.earTwitchR = Math.cos(time * 8) * 0.3;
            pose.pawFL_y = Math.sin(time * 10) * 5;
            pose.pawFR_y = -Math.sin(time * 10) * 5;
            pose.squishX = 1.06 + Math.sin(time * 22) * 0.035;
            pose.squishY = 0.94 - Math.sin(time * 22) * 0.035;
            pose.mouthState = 'w';
            break;

          case 'shiba':
            pose.tailAngle = Math.sin(time * 28) * 1.15;
            pose.bodyY = -16 + Math.sin(time * 14) * 3;
            pose.headRot = 0.22 + Math.sin(time * 12) * 0.12;
            pose.headY = -33 + Math.sin(time * 14) * 2;
            pose.pawFL_y = Math.sin(time * 18) * 4;
            pose.pawFR_y = -Math.sin(time * 18) * 4;
            pose.earTwitchL = Math.sin(time * 16) * 0.35;
            pose.earTwitchR = Math.cos(time * 16) * 0.35;
            pose.squishX = 1.08;
            pose.squishY = 0.92;
            pose.mouthState = 'blep';
            break;

          case 'slime':
            pose.squishX = 1.28 + Math.sin(time * 16) * 0.22;
            pose.squishY = 0.76 - Math.sin(time * 16) * 0.22;
            pose.bodyY = -12 + Math.sin(time * 12) * 4;
            pose.headY = -28 + Math.sin(time * 16) * 5;
            pose.mouthState = 'open';
            break;

          case 'dragon':
            pose.wingFlap = Math.sin(time * 24) * 1.25;
            pose.headRot = -0.28 + Math.sin(time * 8) * 0.08;
            pose.headY = -35 + Math.sin(time * 12) * 2;
            pose.tailAngle = -0.5 + Math.sin(time * 14) * 0.8;
            pose.squishX = 1.05 + Math.sin(time * 18) * 0.04;
            pose.squishY = 0.95 - Math.sin(time * 18) * 0.04;
            pose.mouthState = 'open';
            break;

          case 'duck':
            pose.bodyRot = Math.sin(time * 18) * 0.3;
            pose.wingFlap = Math.sin(time * 22) * 1.1;
            pose.headY = -33 + Math.sin(time * 14) * 6;
            pose.headRot = Math.sin(time * 12) * 0.2;
            pose.pawFL_y = Math.sin(time * 16) * 4;
            pose.pawFR_y = -Math.sin(time * 16) * 4;
            pose.squishX = 1.07;
            pose.squishY = 0.93;
            pose.mouthState = 'open';
            break;

          case 'fox':
            pose.tailAngle = Math.sin(time * 18) * 1.35;
            pose.headRot = 0.3 + Math.sin(time * 10) * 0.1;
            pose.headY = -34 + Math.sin(time * 10) * 2;
            pose.earTwitchL = Math.sin(time * 12) * 0.4;
            pose.earTwitchR = Math.cos(time * 12) * 0.4;
            pose.squishX = 1.04;
            pose.squishY = 0.96;
            pose.mouthState = 'w';
            break;

          case 'bunny':
            pose.earTwitchL = Math.sin(time * 24) * 0.7;
            pose.earTwitchR = Math.cos(time * 24) * 0.7;
            pose.bodyY = -16 + Math.abs(Math.sin(time * 14)) * 5;
            pose.headY = -32 + Math.abs(Math.sin(time * 14)) * 6;
            pose.squishX = 1.12 + Math.sin(time * 16) * 0.08;
            pose.squishY = 0.88 - Math.sin(time * 16) * 0.08;
            pose.mouthState = 'w';
            break;

          case 'penguin':
            pose.wingFlap = Math.sin(time * 26) * 1.4;
            pose.bodyRot = Math.sin(time * 16) * 0.22;
            pose.headRot = -0.3 + Math.sin(time * 10) * 0.12;
            pose.bodyY = -15 + Math.sin(time * 16) * 3;
            pose.headY = -34 + Math.sin(time * 16) * 3;
            pose.squishX = 1.1;
            pose.squishY = 0.9;
            pose.mouthState = 'open';
            break;

          case 'jett':
            pose.groundOffset = -10 + Math.sin(time * 8) * 6;
            pose.headRot = 0.18 + Math.sin(time * 6) * 0.08;
            pose.tailAngle = Math.sin(time * 14) * 0.85;
            pose.squishX = 0.96;
            pose.squishY = 1.04;
            pose.mouthState = 'open';
            break;

          case 'mario':
            pose.bodyY = -16 + Math.abs(Math.sin(time * 12)) * 6;
            pose.headY = -32 + Math.abs(Math.sin(time * 12)) * 7;
            pose.headRot = 0.15 + Math.sin(time * 10) * 0.1;
            pose.pawFL_y = -8 + Math.sin(time * 14) * 4;
            pose.pawFR_y = 2;
            pose.squishX = 1.08;
            pose.squishY = 0.92;
            pose.mouthState = 'open';
            break;

          case 'pikachu':
            pose.tailAngle = Math.sin(time * 22) * 1.3;
            pose.earTwitchL = Math.sin(time * 20) * 0.55;
            pose.earTwitchR = Math.cos(time * 20) * 0.55;
            pose.bodyY = -16 + Math.sin(time * 16) * 3.5;
            pose.headY = -33 + Math.sin(time * 16) * 4;
            pose.squishX = 1.1 + Math.sin(time * 18) * 0.06;
            pose.squishY = 0.9 - Math.sin(time * 18) * 0.06;
            pose.mouthState = 'open';
            break;

          case 'cyberleek':
            pose.headY = -35 + Math.sin(time * 16) * 3;
            pose.tailAngle = Math.sin(time * 24) * 0.9;
            pose.squishX = 1.15 + Math.sin(time * 20) * 0.08;
            pose.squishY = 0.85 - Math.sin(time * 20) * 0.08;
            pose.pawFL_y = Math.sin(time * 16) * 4;
            pose.pawFR_y = -Math.sin(time * 16) * 4;
            pose.mouthState = 'open';
            break;

          case 'bull':
            pose.headRot = 0.28 + Math.sin(time * 8) * 0.1;
            pose.headY = -34 + Math.sin(time * 12) * 2;
            pose.tailAngle = Math.sin(time * 28) * 1.2;
            pose.pawFL_y = Math.sin(time * 14) * 3.5;
            pose.pawFR_y = -Math.sin(time * 14) * 3.5;
            pose.squishX = 1.08;
            pose.squishY = 0.92;
            pose.mouthState = 'smile';
            break;

          default:
            pose.headRot = 0.24;
            pose.headY -= 3;
            pose.tailAngle = Math.sin(time * 12) * 0.65;
            pose.squishX = 1.06;
            pose.squishY = 0.94;
            pose.mouthState = 'blep';
            break;
        }
        return true;

      default:
        return false;
    }
  }
};

if (typeof window !== 'undefined') window.PlaySleepInteractBehaviors = PlaySleepInteractBehaviors;
if (typeof globalThis !== 'undefined') globalThis.PlaySleepInteractBehaviors = PlaySleepInteractBehaviors;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlaySleepInteractBehaviors;
}
