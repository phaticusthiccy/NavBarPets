/**
 * @file nekoRenderer.js
 * @description Neko Cat Renderer with multi-skin support:
 * 1. 'cool' (Celestial Cyber Neko): Dual glowing spirit tails, neon ear inners, cyber amulet.
 * 2. 'classic' (Classic Calico/Orange Tabby): Warm peach coat, tabby stripes, cream belly, red bell collar.
 */

const NekoRenderer = {
  drawNeko(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.3),
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      // Cool skin palette
      coatDark: isClassic ? '#E67E22' : '#1A102F',
      coatMid: isClassic ? '#D35400' : '#2D1B4E',
      bellyGlow: isClassic ? '#FFF8F0' : '#00F5D4',
      neonPink: isClassic ? '#FFB6C1' : '#FF2A85',
      gold: '#FFD166'
    };

    ctx.save();

    if (isClassic) {
      // 1. Classic Single Cute Tabby Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -8, -20, -24, -12, -30);
      ctx.bezierCurveTo(-6, -32, -4, -18, 0, 0);
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      // Cream tail tip
      ctx.beginPath();
      ctx.arc(-12, -28, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8F0';
      ctx.fill();
      ctx.restore();

      // 2. Back Paws
      this.drawClassicNekoPaw(ctx, p.pawBL_x, p.pawBL_y, p.coatDark);
      this.drawClassicNekoPaw(ctx, p.pawBR_x, p.pawBR_y, p.coatDark);

      // 3. Body
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // White chest bib
      ctx.beginPath();
      ctx.ellipse(3, 2, 11, 8.5, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8F0';
      ctx.fill();

      // Tabby stripes
      ctx.strokeStyle = p.coatMid;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, -8); ctx.lineTo(-6, -3);
      ctx.moveTo(0, -9); ctx.lineTo(0, -4);
      ctx.stroke();
      ctx.restore();

      // 4. Front Paws
      this.drawClassicNekoPaw(ctx, p.pawFL_x, p.pawFL_y, p.coatDark);
      this.drawClassicNekoPaw(ctx, p.pawFR_x, p.pawFR_y, p.coatDark);

      // 5. Head
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Ears
      // Left
      ctx.save();
      ctx.translate(-10, -10);
      ctx.rotate(-0.2 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 6); ctx.lineTo(0, -14); ctx.lineTo(8, 2);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, 4); ctx.lineTo(0, -9); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.fill();
      ctx.restore();

      // Right
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.2 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-8, 2); ctx.lineTo(0, -14); ctx.lineTo(6, 6);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(0, -9); ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // Red Collar & Gold Bell
      ctx.beginPath();
      ctx.ellipse(0, 10, 12, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 13, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#2C3E50');

      // Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 4, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FF758F';
      ctx.fill();
      this.drawMouth(ctx, 0, 5, p.mouthState);

      // Whiskers
      ctx.strokeStyle = '#4A3B32';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-8, 3); ctx.lineTo(-17, 1);
      ctx.moveTo(-8, 5); ctx.lineTo(-16, 7);
      ctx.moveTo(8, 3); ctx.lineTo(17, 1);
      ctx.moveTo(8, 5); ctx.lineTo(16, 7);
      ctx.stroke();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
    } else {
      // Celestial Cyber Neko
      // Tail 1 (Cyan spirit flame)
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -10, -24, -28, -16, -34);
      ctx.bezierCurveTo(-8, -36, -6, -20, 0, 0);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-16, -32, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = p.bellyGlow;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Tail 2 (Magenta spirit flame wisp)
      ctx.save();
      ctx.translate(-12, p.bodyY + 8);
      ctx.rotate(p.tailAngle * 0.8 + 0.35);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -6, -18, -20, -10, -28);
      ctx.bezierCurveTo(-4, -30, -2, -14, 0, 0);
      ctx.fillStyle = p.coatMid;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-10, -26, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // Back Paws
      this.drawCoolNekoPaw(ctx, p.pawBL_x, p.pawBL_y, p.coatDark, p.bellyGlow);
      this.drawCoolNekoPaw(ctx, p.pawBR_x, p.pawBR_y, p.coatDark, p.bellyGlow);

      // Body
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      const chestGrad = ctx.createLinearGradient(0, -6, 4, 8);
      chestGrad.addColorStop(0, p.neonPink);
      chestGrad.addColorStop(1, p.bellyGlow);
      ctx.beginPath();
      ctx.ellipse(3, 2, 11, 8.5, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = chestGrad;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Front Paws
      this.drawCoolNekoPaw(ctx, p.pawFL_x, p.pawFL_y, p.coatMid, p.neonPink);
      this.drawCoolNekoPaw(ctx, p.pawFR_x, p.pawFR_y, p.coatMid, p.neonPink);

      // Head
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Left Cyber Ear
      ctx.save();
      ctx.translate(-10, -10);
      ctx.rotate(-0.2 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 6); ctx.lineTo(0, -14); ctx.lineTo(8, 2);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-3, 4); ctx.lineTo(0, -9); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Right Cyber Ear
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.2 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-8, 2); ctx.lineTo(0, -14); ctx.lineTo(6, 6);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(0, -9); ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // Forehead Star Mark
      ctx.beginPath();
      ctx.arc(0, -8, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.shadowColor = p.gold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Glowing Cyber Choker Collar & Crystal Amulet
      ctx.beginPath();
      ctx.ellipse(0, 10, 12, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 13, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.bellyGlow;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, p.bellyGlow);

      // Nose
      ctx.beginPath();
      ctx.arc(0, 4, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = p.neonPink;
      ctx.fill();

      // Mouth
      this.drawMouth(ctx, 0, 5, p.mouthState);

      // Glowing Whiskers
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-8, 3); ctx.lineTo(-17, 1);
      ctx.moveTo(-8, 5); ctx.lineTo(-16, 7);
      ctx.moveTo(8, 3); ctx.lineTo(17, 1);
      ctx.moveTo(8, 5); ctx.lineTo(16, 7);
      ctx.stroke();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
    }

    ctx.restore();
  },

  drawClassicNekoPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  },

  drawCoolNekoPaw(ctx, x, y, coatColor, sockGlow) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = coatColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 1, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = sockGlow;
    ctx.shadowColor = sockGlow;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.NekoRenderer = NekoRenderer;
if (typeof globalThis !== 'undefined') globalThis.NekoRenderer = NekoRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NekoRenderer;
}
