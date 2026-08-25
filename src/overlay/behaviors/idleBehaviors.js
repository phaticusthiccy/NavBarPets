/**
 * @file idleBehaviors.js
 * @description Idle Kinematics & Sub-Action Pose Computations (Breathing, Stretching, Loafing, Yawning).
 */

const IdleBehaviors = {
  applyIdleBehavior(behavior, pose, time) {
    switch (behavior) {
      case 'idle_breathe':
        pose.bodyY += Math.sin(time * 3) * 2;
        pose.headY += Math.sin(time * 3) * 1.5;
        pose.tailAngle = Math.sin(time * 1.5) * 0.2;
        return true;

      case 'idle_ear_twitch':
        pose.earTwitchL = Math.sin(time * 12) * 0.4;
        pose.earTwitchR = Math.cos(time * 10) * 0.4;
        pose.tailAngle = Math.sin(time * 2) * 0.3;
        return true;

      case 'idle_tail_wag':
        pose.tailAngle = Math.sin(time * 8) * 0.7;
        pose.bodyRot = Math.sin(time * 8) * 0.04;
        pose.eyeState = 'happy';
        return true;

      case 'idle_look_left_right':
        pose.headRot = Math.sin(time * 2) * 0.35;
        pose.tailAngle = Math.sin(time * 1.5) * 0.25;
        return true;

      case 'idle_look_sky':
        pose.headY -= 4;
        pose.headRot = -0.4;
        pose.eyeState = 'wide';
        pose.tailAngle = 0.3;
        return true;

      case 'idle_groom_paw': {
        const groom = Math.sin(time * 6) * 4;
        pose.headRot = 0.25;
        pose.headY += 3;
        pose.pawFL_y = -18 + groom;
        pose.eyeState = 'blink';
        pose.mouthState = 'blep';
        return true;
      }

      case 'idle_stretch_front':
        pose.bodyY += 6;
        pose.headY += 7;
        pose.pawFL_x = 18;
        pose.pawFR_x = 22;
        pose.tailAngle = 0.8;
        pose.eyeState = 'blink';
        return true;

      case 'idle_stretch_back':
        pose.bodyY += 4;
        pose.bodyRot = -0.15;
        pose.pawBL_x = -18;
        pose.pawBR_x = -14;
        pose.tailAngle = -0.4;
        pose.eyeState = 'happy';
        return true;

      case 'idle_loaf':
        pose.bodyY += 4;
        pose.headY += 3;
        pose.pawFL_y = -3;
        pose.pawFR_y = -3;
        pose.pawBL_y = -3;
        pose.pawBR_y = -3;
        pose.tailAngle = -0.7;
        pose.eyeState = 'sleep';
        return true;

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
        return true;

      case 'idle_yawn': {
        const yawn = Math.sin(time * 2);
        pose.mouthState = yawn > 0 ? 'open' : 'w';
        pose.eyeState = yawn > 0 ? 'blink' : 'open';
        pose.headRot = -0.2 * Math.max(0, yawn);
        pose.tailAngle = 0.3;
        return true;
      }

      case 'idle_sniff_ground':
        pose.headY += 8;
        pose.headRot = 0.35;
        pose.tailAngle = Math.sin(time * 6) * 0.4;
        pose.mouthState = 'blep';
        return true;

      case 'idle_groom_ears': {
        const groom = Math.sin(time * 7) * 3.5;
        pose.headRot = Math.sin(time * 3.5) * 0.2;
        pose.pawFL_y = -22 + groom;
        pose.pawFR_y = -22 - groom;
        pose.earTwitchL = Math.sin(time * 7) * 0.4;
        pose.earTwitchR = Math.cos(time * 7) * 0.4;
        pose.eyeState = 'happy';
        return true;
      }

      case 'idle_curious_sniff_air':
        pose.headY -= 7;
        pose.headRot = -0.32;
        pose.squishX = 1.05;
        pose.squishY = 0.95;
        pose.tailAngle = 0.5 + Math.sin(time * 4) * 0.25;
        pose.eyeState = 'wide';
        pose.mouthState = 'blep';
        return true;

      case 'idle_shake_fur': {
        const shake = Math.sin(time * 24) * 0.28;
        pose.bodyRot = shake;
        pose.headRot = -shake * 1.5;
        pose.tailAngle = shake * 2.5;
        pose.earTwitchL = shake * 2;
        pose.earTwitchR = -shake * 2;
        pose.eyeState = 'blink';
        return true;
      }

      case 'idle_nap_doze': {
        const nod = Math.max(-0.25, Math.sin(time * 1.8) * 0.35);
        pose.headY += nod * 6;
        pose.headRot = nod * 0.35;
        pose.eyeState = 'sleep';
        pose.tailAngle = -0.3;
        return true;
      }

      default:
        return false;
    }
  }
};

if (typeof window !== 'undefined') window.IdleBehaviors = IdleBehaviors;
if (typeof globalThis !== 'undefined') globalThis.IdleBehaviors = IdleBehaviors;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IdleBehaviors;
}
