/**
 * @file pikachuRenderer.js
 * @description Pikachu Renderer with multi-skin support:
 * 1. 'cool' (Gigavolt Thunder God Pikachu): Real-time lightning tail plasma arcs, pulsing crimson electric cheek sacs, cyan plasma ear seams.
 * 2. 'classic' (Classic Electric Pikachu): Golden yellow chubby body, brown back stripes, zigzag lightning bolt tail, crimson cheeks.
 */

const PikachuRenderer = {
  drawPikachu(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || 0,
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 7,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -11,
      pawBL_y: pose.pawBL_y || 0,
      electricGold: isClassic ? '#FCD116' : '#FFE600',
      plasmaCyan: '#00F5D4',
      cheekRed: isClassic ? '#E83A3A' : '#FF0033'
    };

    ctx.save();

    // 1. Zigzag Lightning Bolt Tail
    ctx.save();
    ctx.translate(p.bodyX - 11, p.bodyY + 2);
    ctx.rotate(p.tailAngle * 0.9 - 0.4);

    // Brown Base
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, -8); ctx.lineTo(2, -2);
    ctx.closePath();
    ctx.fill();

    // Lightning Bolt
    ctx.fillStyle = p.electricGold;
    if (!isClassic) {
      ctx.shadowColor = p.electricGold;
      ctx.shadowBlur = 14;
    }
    ctx.beginPath();
    ctx.moveTo(-4, -6);
    ctx.lineTo(-12, -14);
    ctx.lineTo(-7, -16);
    ctx.lineTo(-18, -28);
    ctx.lineTo(-5, -24);
    ctx.lineTo(-8, -20);
    ctx.lineTo(0, -12);
    ctx.lineTo(-3, -10);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    if (!isClassic) {
      // Crackling Electric Plasma Arc (Cool only)
      ctx.strokeStyle = p.plasmaCyan;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-18, -28);
      ctx.lineTo(-22 + Math.sin(this.time * 20) * 3, -32);
      ctx.lineTo(-14, -30);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Hind Feet
    ctx.save();
    ctx.fillStyle = p.electricGold;
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Golden Body & Stripes
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();

    // Dark Brown Stripes
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(-6, -4, 2.5, 5, -0.2, 0, Math.PI * 2);
    ctx.ellipse(0, -5, 2.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Head, Ears & Cheeks
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(-0.45 + p.earTwitchL);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    if (!isClassic) {
      // Plasma glow seam
      ctx.beginPath();
      ctx.arc(0, -13, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.plasmaCyan;
      ctx.shadowColor = p.plasmaCyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(7, -8);
    ctx.rotate(0.45 + p.earTwitchR);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    if (!isClassic) {
      // Plasma glow seam
      ctx.beginPath();
      ctx.arc(0, -13, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.plasmaCyan;
      ctx.shadowColor = p.plasmaCyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();

    // Electric Cheek Sacs
    ctx.beginPath();
    ctx.arc(-8, 3, isClassic ? 3.8 : 4, 0, Math.PI * 2);
    ctx.arc(8, 3, isClassic ? 3.8 : 4, 0, Math.PI * 2);
    ctx.fillStyle = p.cheekRed;
    if (!isClassic) {
      ctx.shadowColor = p.cheekRed;
      ctx.shadowBlur = 14;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Eyes
    this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#1E1E1E');

    // Nose & Mouth
    ctx.fillStyle = '#1E1E1E';
    ctx.beginPath();
    ctx.arc(0, 1.5, 1, 0, Math.PI * 2);
    ctx.fill();
    this.drawMouth(ctx, 0, 4.5, p.mouthState);

    // Accessories
    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

    ctx.restore();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.PikachuRenderer = PikachuRenderer;
if (typeof globalThis !== 'undefined') globalThis.PikachuRenderer = PikachuRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PikachuRenderer;
}
