/**
 * @file jettRenderer.js
 * @description Valorant Jett Renderer with multi-skin support:
 * 1. 'cool' / 'legendary' (Radiant Wind Duelist): 3 orbiting glowing Kunai blades, luminous radiant tattoos, foot wind vortex.
 * 2. 'classic' (Classic Valorant Jett): Signature platinum-white wind ponytail, tactical duelist vest, clean anime face & eyes, sleek sneakers.
 */

const JettRenderer = {
  drawJett(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || 0, // Ponytail wind sway
      eyeState: pose.eyeState || 'open',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 12,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -10,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0,
      radiantTeal: '#00F5D4',
      radiantGlow: '#70D6FF',
      skinTone: '#FDE4D8',
      tacticalNavy: '#172033',
      tacticalDark: '#0F172A',
      vestAccent: '#2DD4BF',
      hairWhite: '#FFFFFF',
      hairShadow: '#E2E8F0'
    };

    ctx.save();

    if (!isClassic) {
      // 1. Wind Vortex Swirl at Base (Legendary only)
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY + 8);
      ctx.beginPath();
      ctx.ellipse(-10, 6, 16, 5, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 245, 212, 0.25)';
      ctx.shadowColor = p.radiantTeal;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 2. Three Orbiting Glowing Radiant Kunais (Legendary only)
      for (let k = 0; k < 3; k++) {
        const kunaiAngle = this.time * 3.2 + (k * Math.PI * 2 / 3);
        const kX = p.bodyX + Math.cos(kunaiAngle) * 23;
        const kY = p.bodyY - 6 + Math.sin(kunaiAngle) * 8;

        ctx.save();
        ctx.translate(kX, kY);
        ctx.rotate(kunaiAngle + Math.PI / 2);

        // Kunai blade
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(3.5, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(-3.5, 0);
        ctx.closePath();
        ctx.fillStyle = '#F8FAFC';
        ctx.shadowColor = p.radiantTeal;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Kunai ring handle
        ctx.beginPath();
        ctx.arc(0, 7.5, 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = p.radiantTeal;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
      }
    }

    // 3. High Swooping Wind Ponytail (Drawn behind head/torso)
    ctx.save();
    ctx.translate(p.headX - 4, p.headY - 6);
    ctx.rotate(p.tailAngle * 0.8 - 0.25);

    // Ponytail Ribbon Tie
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = p.radiantTeal;
    ctx.fill();

    // Ponytail Locks
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -12, -26, 2, -28, 8);
    ctx.bezierCurveTo(-22, 16, -10, 8, -4, 4);
    ctx.closePath();
    ctx.fillStyle = p.hairWhite;
    if (!isClassic) {
      ctx.shadowColor = p.radiantTeal;
      ctx.shadowBlur = 10;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 4. Far Leg (Back-Left)
    this.drawJettLeg(ctx, p.pawBL_x, p.pawBL_y, p.tacticalNavy, p.radiantTeal, 0.88);

    // 5. Tactical Duelist Torso & Wind Jacket
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Dark Tactical Bodysuit Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.tacticalDark;
    ctx.fill();

    // Sleeveless Wind Vest
    ctx.beginPath();
    ctx.moveTo(-9, -8);
    ctx.lineTo(9, -8);
    ctx.lineTo(10, 8);
    ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fillStyle = p.tacticalNavy;
    ctx.fill();

    // Cyan Tactical Trim Collar
    ctx.beginPath();
    ctx.moveTo(-7, -8);
    ctx.lineTo(0, 2);
    ctx.lineTo(7, -8);
    ctx.strokeStyle = p.vestAccent;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    if (!isClassic) {
      // Glowing Radiant Wind Spiral on Chest (Legendary only)
      ctx.beginPath();
      ctx.arc(2, 2, 3.5, 0.2, Math.PI * 1.5);
      ctx.strokeStyle = p.radiantTeal;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = p.radiantTeal;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 6. Near Leg (Front-Left)
    this.drawJettLeg(ctx, p.pawFL_x, p.pawFL_y, p.tacticalNavy, p.radiantTeal, 1.0);

    // 7. Head & Cute Anime Face
    ctx.save();
    ctx.translate(p.headX + 4, p.headY);
    ctx.rotate(p.headRot);

    // Peach Face Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 10.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.skinTone;
    ctx.fill();

    // Cute subtle blush
    ctx.beginPath();
    ctx.ellipse(-6, 3, 2.5, 1.2, 0, 0, Math.PI * 2);
    ctx.ellipse(6, 3, 2.5, 1.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 138, 161, 0.4)';
    ctx.fill();

    if (!isClassic) {
      // Glowing Radiant Cheek Sigil Tattoo
      ctx.beginPath();
      ctx.moveTo(5, 2); ctx.lineTo(9, 4);
      ctx.strokeStyle = p.radiantTeal;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Platinum White Side-Swept Anime Bangs
    ctx.fillStyle = p.hairWhite;
    ctx.beginPath();
    ctx.moveTo(-12, -4);
    ctx.quadraticCurveTo(-6, -14, 6, -12);
    ctx.quadraticCurveTo(12, -4, 5, -1);
    ctx.quadraticCurveTo(0, -6, -5, -1);
    ctx.quadraticCurveTo(-10, -2, -12, -4);
    ctx.closePath();
    ctx.fill();

    // Iconic Cyan Hairpin Clip
    ctx.fillStyle = p.radiantTeal;
    ctx.fillRect(5, -9, 4, 1.6);

    // Anime Eyes (Sharp winged eyeliner with radiant iris)
    this.drawJettEyes(ctx, -4, 4, -1, p.eyeState, p.radiantTeal);

    // Delicate Anime Smile (Clean, no mustache :3!)
    ctx.beginPath();
    ctx.arc(0, 3, 2.2, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = '#8B5D5D';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawJettLeg(ctx, x, y, pantColor, sneakerCyan, scale = 1.0) {
    ctx.save();
    // Tactical Leggings
    ctx.beginPath();
    ctx.moveTo(x - 2.5 * scale, y - 9 * scale);
    ctx.lineTo(x + 2.5 * scale, y - 9 * scale);
    ctx.lineTo(x + 2 * scale, y - 2);
    ctx.lineTo(x - 2 * scale, y - 2);
    ctx.closePath();
    ctx.fillStyle = pantColor;
    ctx.fill();

    // White Sneaker Base
    ctx.beginPath();
    ctx.ellipse(x + 1, y - 1.5, 4.5 * scale, 2.5 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Cyan Air-Cushion Sole
    ctx.fillStyle = sneakerCyan;
    ctx.fillRect(x - 3 * scale, y - 0.8, 8 * scale, 1.5 * scale);
    ctx.restore();
  },

  drawJettEyes(ctx, leftX, rightX, y, state, irisColor) {
    ctx.save();
    if (state === 'happy' || state === 'sleep') {
      // Happy curved anime eyes
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(leftX, y, 3, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rightX, y, 3, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    } else {
      // Sharp winged anime eyes
      [leftX, rightX].forEach((x) => {
        // Eyeliner
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x - 3.5, y - 1);
        ctx.quadraticCurveTo(x, y - 3, x + 3.5, y - 1);
        ctx.stroke();

        // Radiant Iris
        ctx.beginPath();
        ctx.ellipse(x, y + 0.5, 2.2, 2.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = irisColor;
        ctx.fill();

        // Dark pupil
        ctx.beginPath();
        ctx.arc(x, y + 0.5, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#0F172A';
        ctx.fill();

        // Catchlight sparkle
        ctx.beginPath();
        ctx.arc(x - 0.7, y - 0.7, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.JettRenderer = JettRenderer;
if (typeof globalThis !== 'undefined') globalThis.JettRenderer = JettRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JettRenderer;
}
