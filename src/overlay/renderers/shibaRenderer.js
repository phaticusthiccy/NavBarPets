/**
 * @file shibaRenderer.js
 * @description Shiba Inu Renderer with multi-skin support:
 * 1. 'cool' (Solar Flare Shiba): Deep flame amber, solar eyebrow markings, glowing flame curl tail, flowing hero bandana.
 * 2. 'classic' (Classic Japanese Shiba Inu): Warm golden fur, curled tail with fluffy white tip, classic white eyebrow dots, red neck bandana.
 */

const ShibaRenderer = {
  drawShiba(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailWag: pose.tailWag || (Math.sin(this.time * 6) * 0.4),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'blep',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      goldAmber: isClassic ? '#E08E45' : '#FF7900',
      deepFlame: isClassic ? '#C87834' : '#FF3800',
      white: '#FFFDF5',
      dark: '#2A1810',
      solarGlow: '#FFE600'
    };

    ctx.save();

    // 1. Curled Tail
    ctx.save();
    ctx.translate(-14, p.bodyY - 2);
    ctx.rotate(p.tailWag);
    ctx.beginPath();
    ctx.arc(-4, -8, 10, 0.4, Math.PI * 1.7);
    ctx.lineWidth = 8.5;
    ctx.strokeStyle = p.goldAmber;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (isClassic) {
      // Classic Fluffy white tip
      ctx.beginPath();
      ctx.arc(-8, -14, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();
    } else {
      // Solar flame burst at tail apex
      ctx.beginPath();
      ctx.arc(-8, -14, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.deepFlame;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 2. Back Paws
    this.drawShibaPaw(ctx, p.pawBL_x, p.pawBL_y, p.deepFlame, isClassic);
    this.drawShibaPaw(ctx, p.pawBR_x, p.pawBR_y, p.deepFlame, isClassic);

    // 3. Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 19, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.goldAmber;
    ctx.fill();

    // White Chest & Belly
    ctx.beginPath();
    ctx.ellipse(4, 2, 12, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    if (!isClassic) {
      // Solar core mark
      ctx.beginPath();
      ctx.arc(6, 1, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 4. Front Paws
    this.drawShibaPaw(ctx, p.pawFL_x, p.pawFL_y, p.goldAmber, isClassic);
    this.drawShibaPaw(ctx, p.pawFR_x, p.pawFR_y, p.goldAmber, isClassic);

    // 5. Head
    ctx.save();
    ctx.translate(7, p.headY);
    ctx.rotate(p.headRot);

    // Triangle Ears
    // Left ear
    ctx.beginPath();
    ctx.moveTo(-12, -4); ctx.lineTo(-7, -19); ctx.lineTo(-1, -6);
    ctx.closePath();
    ctx.fillStyle = p.goldAmber;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -4); ctx.lineTo(-7, -15); ctx.lineTo(-2, -6);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.moveTo(1, -6); ctx.lineTo(7, -19); ctx.lineTo(12, -4);
    ctx.closePath();
    ctx.fillStyle = p.goldAmber;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, -6); ctx.lineTo(7, -15); ctx.lineTo(10, -4);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.goldAmber;
    ctx.fill();

    // White Cheek Fluff
    ctx.beginPath();
    ctx.ellipse(-7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(0, 5, 9, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    if (isClassic) {
      // White Eyebrow Dots
      ctx.beginPath();
      ctx.arc(-6, -6, 2.5, 0, Math.PI * 2);
      ctx.arc(6, -6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();

      // Classic Bandana
      ctx.beginPath();
      ctx.moveTo(-10, 12); ctx.lineTo(10, 12); ctx.lineTo(0, 20);
      ctx.closePath();
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 15, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF';
      ctx.fill();
    } else {
      // Solar Eyebrows
      ctx.beginPath();
      ctx.arc(-6, -6, 2.8, 0, Math.PI * 2);
      ctx.arc(6, -6, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Flowing Hero Bandana
      ctx.beginPath();
      ctx.moveTo(-12, 11);
      ctx.lineTo(12, 11);
      ctx.lineTo(0, 22 + Math.sin(this.time * 6) * 2);
      ctx.closePath();
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 16, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState);

    // Nose
    ctx.beginPath();
    ctx.ellipse(0, 4, 3, 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.dark;
    ctx.fill();

    // Mouth / Blep
    this.drawMouth(ctx, 0, 6, p.mouthState);

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawShibaPaw(ctx, x, y, color, isClassic) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (!isClassic) {
      ctx.beginPath();
      ctx.arc(x, y - 1, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD166';
      ctx.fill();
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.ShibaRenderer = ShibaRenderer;
if (typeof globalThis !== 'undefined') globalThis.ShibaRenderer = ShibaRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShibaRenderer;
}
