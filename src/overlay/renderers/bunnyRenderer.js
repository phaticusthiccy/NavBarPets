/**
 * @file bunnyRenderer.js
 * @description Mochi Bunny Renderer with multi-skin support:
 * 1. 'cool' (Starlight Moon Cosmic Bunny): Cosmic lavender gradient, galaxy ears with star tips, crescent moon seal, starlight tail.
 * 2. 'classic' (Classic Pure White Mochi Bunny): Soft white mochi body, pastel pink inner floppy ears, rosy cheeks, cotton-ball tail.
 */

const BunnyRenderer = {
  drawBunny(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -30,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 5) * 0.3),
      earTwitchL: pose.earTwitchL || (Math.sin(this.time * 3) * 0.15),
      earTwitchR: pose.earTwitchR || (Math.cos(this.time * 3) * 0.15),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 12,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -10,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0,
      galaxyDark: isClassic ? '#FFFDF9' : '#2E1A47',
      galaxyMid: isClassic ? '#F5EBE6' : '#4D2D73',
      starlightPink: '#FF8FA3',
      innerPink: '#FFB3C1',
      moonGold: '#FFE66D'
    };

    ctx.save();

    // 1. Tail
    ctx.save();
    ctx.translate(-14, p.bodyY + 6);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    if (!isClassic) {
      ctx.shadowColor = p.starlightPink;
      ctx.shadowBlur = 14;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 2. Back Paws
    this.drawBunnyPaw(ctx, p.pawBL_x, p.pawBL_y, p.galaxyDark);
    this.drawBunnyPaw(ctx, p.pawBR_x, p.pawBR_y, p.galaxyDark);

    // 3. Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 4, 15, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (!isClassic) {
      // Sparkle Belly (Cool only)
      ctx.beginPath();
      ctx.ellipse(2, 4, 9, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.starlightPink;
      ctx.shadowColor = p.starlightPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 4. Front Paws
    this.drawBunnyPaw(ctx, p.pawFL_x, p.pawFL_y, p.galaxyMid);
    this.drawBunnyPaw(ctx, p.pawFR_x, p.pawFR_y, p.galaxyMid);

    // 5. Head & Floppy Ears
    ctx.save();
    ctx.translate(4, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-6, -10);
    ctx.rotate(p.earTwitchL - 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Classic Pink Inner Ear
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
    } else {
      // Star Tip
      ctx.beginPath();
      ctx.arc(0, -22, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(6, -10);
    ctx.rotate(p.earTwitchR + 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, 0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Classic Pink Inner Ear
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
    } else {
      // Star Tip
      ctx.beginPath();
      ctx.arc(0, -22, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 3, 0, Math.PI * 2);
      ctx.arc(8, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 143, 163, 0.5)';
      ctx.fill();

      // Pink Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 2.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#1A1A2E');
    } else {
      // Crescent Moon Forehead Seal
      ctx.beginPath();
      ctx.arc(0, -5, 3.5, 0.5, Math.PI * 1.5);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, p.moonGold);

      // Mouth
      this.drawMouth(ctx, 0, 4, p.mouthState);
    }

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawBunnyPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.BunnyRenderer = BunnyRenderer;
if (typeof globalThis !== 'undefined') globalThis.BunnyRenderer = BunnyRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BunnyRenderer;
}
