/**
 * @file penguinRenderer.js
 * @description Chilly Penguin Renderer with multi-skin support:
 * 1. 'cool' (Frost-Armor Ice King Penguin): Floating diamond-cut frosted ice crown, flowing aurora teal scarf, frosted ice belly plate.
 * 2. 'classic' (Classic Tuxedo Chilly Penguin): Midnight navy coat, crisp snow-white belly, cozy red knitted scarf, golden beak.
 */

const PenguinRenderer = {
  drawPenguin(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap || (Math.sin(this.time * 6) * 0.4),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -6,
      pawBL_y: pose.pawBL_y || 0,
      coatNavy: isClassic ? '#0F172A' : '#0B132B',
      iceBelly: isClassic ? '#F8FAFC' : '#E0FBFC',
      beakGold: '#FFD166',
      scarfColor: isClassic ? '#EF4444' : '#48CAE4'
    };

    ctx.save();

    // 1. Webbed Feet
    this.drawPenguinFoot(ctx, p.pawBL_x - 3, p.pawBL_y, p.beakGold);
    this.drawPenguinFoot(ctx, p.pawFL_x + 3, p.pawFL_y, p.beakGold);

    // 2. Torso & Flippers
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Left Flipper
    ctx.save();
    ctx.translate(-14, 0);
    ctx.rotate(p.wingFlap + 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Right Flipper
    ctx.save();
    ctx.translate(14, 0);
    ctx.rotate(-p.wingFlap - 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Main Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // Belly Plate
    ctx.beginPath();
    ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.iceBelly;
    if (!isClassic) {
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 10;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Winter Scarf
    ctx.save();
    ctx.translate(0, -12);
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.scarfColor;
    if (!isClassic) {
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 10;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Trailing scarf tail
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(12, 14 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(4, 16 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(2, 0);
    ctx.closePath();
    ctx.fillStyle = p.scarfColor;
    ctx.fill();
    ctx.restore();
    ctx.restore();

    // 4. Penguin Head
    ctx.save();
    ctx.translate(0, -20);
    ctx.rotate(p.headRot);

    if (!isClassic) {
      // Floating Frosted Ice Crown (Cool only)
      ctx.beginPath();
      ctx.moveTo(-8, -14);
      ctx.lineTo(-4, -20);
      ctx.lineTo(0, -15);
      ctx.lineTo(4, -20);
      ctx.lineTo(8, -14);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Head Base
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // Eye Masks
    ctx.beginPath();
    ctx.arc(-4, 0, 5, 0, Math.PI * 2);
    ctx.arc(4, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = p.iceBelly;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -4, 4, 0, p.eyeState, isClassic ? '#0F172A' : p.scarfColor);

    // Golden Beak
    ctx.beginPath();
    ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(0, 7);
    ctx.closePath();
    ctx.fillStyle = p.beakGold;
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawPenguinFoot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 6, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.PenguinRenderer = PenguinRenderer;
if (typeof globalThis !== 'undefined') globalThis.PenguinRenderer = PenguinRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PenguinRenderer;
}
