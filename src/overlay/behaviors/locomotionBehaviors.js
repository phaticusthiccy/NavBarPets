/**
 * @file locomotionBehaviors.js
 * @description Walking & Running Kinematics with 4-Leg Diagonal Gait Inversion and High-Speed Springs.
 */

const LocomotionBehaviors = {
  applyLocomotionBehavior(behavior, pose, time) {
    switch (behavior) {
      // =============================================================
      // WALKING BEHAVIORS
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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }

      case 'walk_backwards': {
        const cycle = time * 5.5;
        const bob = Math.abs(Math.sin(cycle)) * 3;
        pose.bodyY -= bob;
        pose.headY += 2;
        pose.headRot = 0.25;

        const stride = 6;
        const lift = 6;
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
        return true;
      }

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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }

      // =============================================================
      // RUNNING BEHAVIORS
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
        return true;
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
        return true;
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
        return true;
      }

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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }

      default:
        return false;
    }
  }
};

if (typeof window !== 'undefined') window.LocomotionBehaviors = LocomotionBehaviors;
if (typeof globalThis !== 'undefined') globalThis.LocomotionBehaviors = LocomotionBehaviors;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LocomotionBehaviors;
}
