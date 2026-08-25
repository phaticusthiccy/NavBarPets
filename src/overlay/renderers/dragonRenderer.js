/**
 * @file dragonRenderer.js
 * @description Mini Dragon Renderer with multi-skin support:
 * 1. 'cool' (Mythical Obsidian Ember Wyvern): Obsidian coat, plasma wyvern wings, blazing flame blade tail, magma plates, gold crown horns.
 * 2. 'classic' (Classic Crimson Chibi Dragon): Ruby red body, golden yellow belly plates, bat wings, spade arrow tail.
 */

const DragonRenderer = {
  drawMiniDragon(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -18,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap !== undefined ? pose.wingFlap : (Math.sin(this.time * 1.5) * 0.08),
      tailAngle: pose.tailAngle || (Math.sin(this.time * 2.5) * 0.25),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      color: isClassic ? '#E63946' : '#2A0845',
      accentColor: isClassic ? '#C1121F' : '#6B11A1',
      bellyColor: isClassic ? '#FFD166' : '#FF2A6D',
      bellyGlow: isClassic ? '#FFE66D' : '#FF6B8B',
      hornColor: '#FFD166',
      hornTip: '#FFE66D',
      wingCore: isClassic ? '#FDF0D5' : '#05D5FA',
      wingEdge: isClassic ? '#9B1D20' : '#7928CA',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0,
      squishX: pose.squishX || 1.0,
      squishY: pose.squishY || 1.0
    };

    ctx.save();

    // 1. Back Wing
    ctx.save();
    ctx.translate(-6, p.bodyY - 6);
    ctx.rotate(-0.35 + p.wingFlap * 0.9);
    this.drawDragonWing(ctx, -1, p.wingEdge, p.wingCore, p.hornColor, isClassic);
    ctx.restore();

    // 2. Dragon Tail
    ctx.save();
    ctx.translate(-14, p.bodyY + 5);
    ctx.rotate(p.tailAngle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -2, -22, -12, -26, -18);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 6.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (isClassic) {
      // Classic Golden Spade Arrow Tip
      ctx.save();
      ctx.translate(-26, -18);
      ctx.rotate(-0.4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-8, -10);
      ctx.lineTo(0, -18);
      ctx.lineTo(8, -10);
      ctx.closePath();
      ctx.fillStyle = p.hornColor;
      ctx.fill();
      ctx.restore();
    } else {
      // Tail dorsal spine crests
      ctx.fillStyle = p.bellyColor;
      for (let i = 1; i <= 3; i++) {
        const t = i / 4;
        const spX = -8 * t - 6;
        const spY = -5 * t - 3;
        ctx.beginPath();
        ctx.moveTo(spX - 2, spY + 1);
        ctx.lineTo(spX, spY - 5);
        ctx.lineTo(spX + 2, spY + 1);
        ctx.closePath();
        ctx.fill();
      }

      // Blazing Flame Blade on tail tip
      ctx.save();
      ctx.translate(-26, -18);
      ctx.rotate(-0.4);
      const flicker = Math.sin(this.time * 18) * 0.15;
      ctx.scale(1.0 + flicker, 1.0 - flicker);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-12, -4, -18, -14, -14, -22);
      ctx.bezierCurveTo(-6, -26, -2, -14, 0, 0);
      ctx.fillStyle = '#FF4500';
      ctx.shadowColor = '#FF2A00';
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-8, -3, -12, -10, -9, -16);
      ctx.bezierCurveTo(-4, -18, -1, -10, 0, 0);
      ctx.fillStyle = '#FFD166';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-5, -8, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // 3. Back Paws
    this.drawDragonClawPaw(ctx, p.pawBL_x, p.pawBL_y, isClassic ? p.accentColor : '#1D0530', p.hornColor);
    this.drawDragonClawPaw(ctx, p.pawBR_x, p.pawBR_y, isClassic ? p.accentColor : '#1D0530', p.hornColor);

    // 4. Dragon Torso
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.scale(p.squishX, p.squishY);

    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Belly Plates
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(4, 2, 11, 10, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = p.bellyColor;
    if (!isClassic) {
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = isClassic ? '#E0A800' : '#FFE66D';
    ctx.lineWidth = 1.2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(4, 2 + i * 5, 8, Math.PI * 0.1, Math.PI * 0.9);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();

    // 5. Front Paws
    this.drawDragonClawPaw(ctx, p.pawFL_x, p.pawFL_y, p.color, p.hornColor);
    this.drawDragonClawPaw(ctx, p.pawFR_x, p.pawFR_y, p.color, p.hornColor);

    // 6. Front Wing
    ctx.save();
    ctx.translate(2, p.bodyY - 4);
    ctx.rotate(0.2 + p.wingFlap);
    this.drawDragonWing(ctx, 1, p.wingEdge, p.wingCore, p.hornColor, isClassic);
    ctx.restore();

    // 7. Dragon Head
    ctx.save();
    ctx.translate(p.headX + 6, p.headY);
    ctx.rotate(p.headRot);

    this.drawDragonHorn(ctx, -8, -10, -0.4, p.hornColor, p.hornTip);
    this.drawDragonHorn(ctx, 4, -12, 0.1, p.hornColor, p.hornTip);

    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Cheek Frill Fins
    ctx.beginPath();
    ctx.moveTo(-14, 0); ctx.lineTo(-20, -5); ctx.lineTo(-17, 3); ctx.lineTo(-22, 6); ctx.lineTo(-14, 5);
    ctx.fillStyle = p.bellyColor;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -4, 5, -1, p.eyeState, isClassic ? '#2C3E50' : '#FF0055');

    // Dragon Nostril Embers
    ctx.beginPath();
    ctx.arc(8, 2, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD166';
    ctx.fill();

    this.drawMouth(ctx, 0, 5, p.mouthState);

    if (acc && acc.nightcap) this.drawNightcap(ctx, -2, -14);
    if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawDragonWing(ctx, dir, edgeColor, coreColor, clawColor, isClassic) {
    ctx.save();
    ctx.scale(dir, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6, -16, -18, -26, -28, -24);
    ctx.bezierCurveTo(-22, -14, -20, -4, -14, 0);
    ctx.bezierCurveTo(-10, -2, -6, 2, 0, 0);
    ctx.closePath();

    if (isClassic) {
      ctx.fillStyle = coreColor;
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    } else {
      const wingGrad = ctx.createLinearGradient(-28, -24, 0, 0);
      wingGrad.addColorStop(0, edgeColor);
      wingGrad.addColorStop(0.6, coreColor);
      wingGrad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = wingGrad;
      ctx.shadowColor = coreColor;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Wing apex talon
    ctx.beginPath();
    ctx.moveTo(-28, -24);
    ctx.lineTo(-32, -28);
    ctx.lineTo(-26, -26);
    ctx.closePath();
    ctx.fillStyle = clawColor;
    ctx.fill();
    ctx.restore();
  },

  drawDragonHorn(ctx, x, y, rot, hornColor, tipColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(-3, 4);
    ctx.quadraticCurveTo(-1, -10, -12, -22);
    ctx.quadraticCurveTo(2, -14, 4, 3);
    ctx.closePath();

    const hornGrad = ctx.createLinearGradient(-12, -22, 0, 4);
    hornGrad.addColorStop(0, tipColor);
    hornGrad.addColorStop(1, hornColor);
    ctx.fillStyle = hornGrad;
    ctx.fill();
    ctx.restore();
  },

  drawDragonClawPaw(ctx, x, y, baseColor, talonColor) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = baseColor;
    ctx.fill();
    ctx.fillStyle = talonColor;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 2.5 - 1, y - 1);
      ctx.lineTo(x + i * 2.5, y + 2.5);
      ctx.lineTo(x + i * 2.5 + 1, y - 1);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.DragonRenderer = DragonRenderer;
if (typeof globalThis !== 'undefined') globalThis.DragonRenderer = DragonRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DragonRenderer;
}
