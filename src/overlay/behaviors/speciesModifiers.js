/**
 * @file speciesModifiers.js
 * @description Dynamic Anatomy and Physical Feature Modifiers (Wings, Tails, Ears, Slime Jiggle).
 */

const SpeciesModifiers = {
  applySpeciesModifiers(pose, behavior, time, species) {
    if (species === 'bunny') {
      pose.earTwitchL += Math.sin(time * 6) * 0.2;
      pose.earTwitchR += Math.cos(time * 6) * 0.2;
    } else if (species === 'penguin') {
      pose.wingFlap = Math.sin(time * 4) * 0.35;
    } else if (species === 'fox') {
      pose.tailAngle *= 1.25;
    } else if (species === 'dragon') {
      if (behavior.startsWith('sleep') || behavior.startsWith('idle')) {
        pose.wingFlap = Math.sin(time * 1.5) * 0.08;
      } else if (behavior.startsWith('walk')) {
        pose.wingFlap = Math.sin(time * 3) * 0.22;
      } else {
        pose.wingFlap = Math.sin(time * 5.5) * 0.45;
      }
    } else if (species === 'slime') {
      const wobble = Math.sin(time * 2.5) * 0.06;
      pose.squishX = (pose.squishX || 1.0) + wobble;
      pose.squishY = (pose.squishY || 1.0) - wobble;
    } else if (species === 'pikachu') {
      pose.earTwitchL += Math.sin(time * 7) * 0.3;
      pose.earTwitchR += Math.cos(time * 7) * 0.3;
      pose.tailAngle *= 1.3;
    } else if (species === 'jett') {
      pose.tailAngle = Math.sin(time * 4) * 0.35;
    } else if (species === 'mario') {
      pose.squishY *= 0.96;
    }
  }
};

if (typeof window !== 'undefined') window.SpeciesModifiers = SpeciesModifiers;
if (typeof globalThis !== 'undefined') globalThis.SpeciesModifiers = SpeciesModifiers;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpeciesModifiers;
}
