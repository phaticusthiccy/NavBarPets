/**
 * @file danceBehaviors.js
 * @description Music & Rhythm Reactive Dance Kinematics (Disco, Spin, Headbang, Robot Pop, Wave Shuffle).
 */

const DanceBehaviors = {
  applyDanceBehavior(behavior, pose, time) {
    switch (behavior) {
      case 'dance_head_bob': {
        const beat = Math.sin(time * 9);
        pose.headY += beat * 5;
        pose.bodyY += beat * 3;
        pose.tailAngle = Math.sin(time * 4.5) * 0.6;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_disco_paws': {
        const disco = Math.sin(time * 8);
        pose.pawFL_y = -18 + disco * 5;
        pose.pawFR_y = -18 - disco * 5;
        pose.bodyRot = disco * 0.12;
        pose.headRot = -disco * 0.15;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_side_hop': {
        const side = Math.sin(time * 7);
        pose.bodyRot = side * 0.18;
        pose.bodyY -= Math.abs(side) * 5;
        pose.pawFL_y = -Math.max(0, side) * 8;
        pose.pawFR_y = -Math.max(0, -side) * 8;
        pose.tailAngle = side * 0.8;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_spin_twirl': {
        const spin = Math.sin(time * 6);
        pose.squishX = 0.85 + Math.abs(spin) * 0.3;
        pose.bodyY -= Math.abs(spin) * 6;
        pose.bodyRot = spin * 0.25;
        pose.tailAngle = spin * 1.2;
        pose.eyeState = 'blink';
        return true;
      }

      case 'dance_moonwalk': {
        const cycle = time * 6;
        pose.bodyY -= Math.abs(Math.sin(cycle)) * 2;
        pose.pawFL_x = 8 - Math.cos(cycle) * 7;
        pose.pawFR_x = 14 + Math.cos(cycle) * 7;
        pose.tailAngle = 0.6;
        pose.headRot = -0.15;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_breakdance': {
        const breakPhase = time * 10;
        pose.bodyRot = Math.sin(breakPhase) * 0.45;
        pose.bodyY -= 6 + Math.abs(Math.sin(breakPhase)) * 6;
        pose.pawFL_y = -12 + Math.sin(breakPhase) * 8;
        pose.pawFR_y = -12 - Math.sin(breakPhase) * 8;
        pose.tailAngle = Math.sin(breakPhase) * 1.2;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_wave_shuffle': {
        const cycle = time * 8;
        pose.headY += Math.sin(cycle) * 5;
        pose.bodyY += Math.sin(cycle - 0.8) * 4;
        pose.tailAngle = Math.sin(cycle - 1.6) * 0.8;
        pose.pawFL_x = 8 + Math.sin(cycle) * 5;
        pose.pawFR_x = 14 - Math.sin(cycle) * 5;
        pose.eyeState = 'happy';
        return true;
      }

      case 'dance_robot_pop': {
        const step = Math.floor(time * 4.5) % 4;
        pose.bodyRot = (step % 2 === 0 ? 0.16 : -0.16);
        pose.headRot = (step > 1 ? 0.22 : -0.22);
        pose.pawFL_y = (step === 0 || step === 2) ? -8 : 0;
        pose.pawFR_y = (step === 1 || step === 3) ? -8 : 0;
        pose.eyeState = 'wide';
        return true;
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
        return true;
      }

      case 'dance_tap_groove': {
        const cycle = time * 12;
        pose.pawFL_y = -Math.max(0, Math.sin(cycle)) * 6;
        pose.pawFR_y = -Math.max(0, -Math.sin(cycle)) * 6;
        pose.headRot = Math.sin(time * 6) * 0.22;
        pose.tailAngle = Math.cos(time * 6) * 0.65;
        pose.eyeState = 'happy';
        pose.mouthState = 'blep';
        return true;
      }

      default:
        return false;
    }
  }
};

if (typeof window !== 'undefined') window.DanceBehaviors = DanceBehaviors;
if (typeof globalThis !== 'undefined') globalThis.DanceBehaviors = DanceBehaviors;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DanceBehaviors;
}
