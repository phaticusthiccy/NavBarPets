/**
 * @file foxRenderer.js
 * @description Kitsune Fox Renderer with multi-skin support:
 * 1. 'cool' (Nine-Tailed Celestial Kitsune): 3 flowing spirit tails with violet plasma tips, Magatama seal, orbiting will-o'-the-wisp.
 * 2. 'classic' (Classic Red Kitsune Fox): Vivid orange body, single bushy white-tipped flame tail, dark sock paws, fluffy white bib.
 */

const FoxRenderer = {
  drawFox(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.35),
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      foxFlame: isClassic ? '#F97316' : '#FF5400',
      spiritViolet: '#9D4EDD',
      spiritGlow: isClassic ? '#FFBEA6' : '#C77DFF',
      chestWhite: '#FFFDF9',
      gold: '#FFD166'
    };

    ctx.save();

    if (isClassic) {
      // 1. Classic Single Bushy Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 4);
      ctx.rotate(p.tailAngle - 0.2);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
      ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
      ctx.bezierCurveTo(4, -8, 2, -2, 0, 0);
      ctx.closePath();
      ctx.fillStyle = p.foxFlame;
      ctx.fill();

      // White flame tail tip
      ctx.beginPath();
      ctx.moveTo(-16, -26);
      ctx.bezierCurveTo(-26, -34, -22, -38, -20, -36);
      ctx.bezierCurveTo(-12, -44, -2, -30, -4, -24);
      ctx.closePath();
      ctx.fillStyle = p.chestWhite;
      ctx.fill();
      ctx.restore();
    } else {
      // 1. Three Flowing Kitsune Spirit Tails
      for (let t = -1; t <= 1; t++) {
        ctx.save();
        ctx.translate(-14, p.bodyY + 4);
        ctx.rotate(p.tailAngle + t * 0.35);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
        ctx.closePath();
        ctx.fillStyle = p.foxFlame;
        ctx.fill();

        // Spirit Plasma Tip
        ctx.beginPath();
        ctx.moveTo(-16, -26);
        ctx.bezierCurveTo(-26, -34, -22, -38, -20, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, -4, -24);
        ctx.closePath();
        ctx.fillStyle = p.spiritGlow;
        ctx.shadowColor = p.spiritViolet;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Orbiting Spirit Flame Will-o'-the-Wisp
      const wispAngle = this.time * 2.2;
      const wispX = Math.cos(wispAngle) * 22;
      const wispY = p.bodyY - 14 + Math.sin(wispAngle * 1.6) * 6;
      ctx.beginPath();
      ctx.arc(wispX, wispY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 2. Far Paws (Behind Torso: Back-Left & Front-Left)
    this.drawFoxPaw(ctx, p.pawBL_x, p.pawBL_y, p.foxFlame, '#1E1E2E', 0.88);
    this.drawFoxPaw(ctx, p.pawFL_x, p.pawFL_y, p.foxFlame, '#1E1E2E', 0.88);

    // 3. Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.foxFlame;
    ctx.fill();

    // Chest Bib
    ctx.beginPath();
    ctx.moveTo(8, -4);
    ctx.bezierCurveTo(16, 2, 12, 12, 6, 14);
    ctx.bezierCurveTo(2, 10, 4, -2, 8, -4);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();
    ctx.restore();

    // 4. Near Paws (In Front of Torso: Back-Right & Front-Right)
    this.drawFoxPaw(ctx, p.pawBR_x, p.pawBR_y, p.foxFlame, '#1E1E2E', 1.0);
    this.drawFoxPaw(ctx, p.pawFR_x, p.pawFR_y, p.foxFlame, '#1E1E2E', 1.0);

    // 5. Head
    ctx.save();
    ctx.translate(8, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(p.earTwitchL - 0.2);
    ctx.beginPath();
    ctx.moveTo(-6, 4); ctx.lineTo(-4, -18); ctx.lineTo(5, 2);
    ctx.closePath();
    ctx.fillStyle = p.foxFlame;
    ctx.fill();
    // Inner
    ctx.beginPath();
    ctx.moveTo(-4, 2); ctx.lineTo(-3, -12); ctx.lineTo(3, 1);
    ctx.closePath();
    ctx.fillStyle = p.spiritGlow;
    if (!isClassic) {
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(7, -8);
    ctx.rotate(p.earTwitchR + 0.2);
    ctx.beginPath();
    ctx.moveTo(-5, 2); ctx.lineTo(4, -18); ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fillStyle = p.foxFlame;
    ctx.fill();
    // Inner
    ctx.beginPath();
    ctx.moveTo(-3, 1); ctx.lineTo(3, -12); ctx.lineTo(4, 2);
    ctx.closePath();
    ctx.fillStyle = p.spiritGlow;
    if (!isClassic) {
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.foxFlame;
    ctx.fill();

    // White Cheek Fluff
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.bezierCurveTo(-14, 8, -4, 11, 0, 10);
    ctx.bezierCurveTo(4, 11, 14, 8, 15, 0);
    ctx.bezierCurveTo(9, 4, -9, 4, -15, 0);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();

    if (!isClassic) {
      // Celestial Forehead Magatama Mark
      ctx.beginPath();
      ctx.arc(0, -6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.shadowColor = p.gold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState, isClassic ? '#43281C' : p.spiritGlow);

    // Muzzle & Mouth
    ctx.beginPath();
    ctx.arc(0, 3, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E2E';
    ctx.fill();
    this.drawMouth(ctx, 0, 5, p.mouthState);

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawFoxPaw(ctx, x, y, coatColor, sockColor, legScale = 1.0) {
    ctx.save();
    // Fox upper leg connection
    ctx.beginPath();
    ctx.moveTo(x - 3 * legScale, y - 7);
    ctx.lineTo(x + 3 * legScale, y - 7);
    ctx.lineTo(x + 3.5 * legScale, y - 2);
    ctx.lineTo(x - 3.5 * legScale, y - 2);
    ctx.closePath();
    ctx.fillStyle = coatColor;
    ctx.fill();

    // Fox black sock paw
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4.8 * legScale, 3.6 * legScale, 0, 0, Math.PI * 2);
    ctx.fillStyle = sockColor;
    ctx.fill();

    // Soft white toe highlight
    ctx.beginPath();
    ctx.arc(x + 1.8 * legScale, y - 1, 1.5 * legScale, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 253, 249, 0.85)';
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.FoxRenderer = FoxRenderer;
if (typeof globalThis !== 'undefined') globalThis.FoxRenderer = FoxRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FoxRenderer;
}
