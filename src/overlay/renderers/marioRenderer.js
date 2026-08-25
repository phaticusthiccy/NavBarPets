/**
 * @file marioRenderer.js
 * @description Super Mario Renderer with multi-skin support:
 * 1. 'cool' (Star Power & Fire Mario): Crisp white Fire Mario cap, glowing golden 'M' emblem with star aura, floating fireball in hand.
 * 2. 'classic' (Classic Super Mario): Signature red cap with white 'M' circle, blue denim overalls, golden buttons, brown boots.
 */

const MarioRenderer = {
  drawMario(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -6,
      pawBL_y: pose.pawBL_y || 0,
      goldStar: '#FFE600',
      fireRed: '#E52521',
      overallColor: isClassic ? '#1B54B8' : '#FFFFFF',
      shirtColor: isClassic ? '#E52521' : '#E52521',
      capColor: isClassic ? '#E52521' : '#FFFFFF'
    };

    ctx.save();

    // 1. Brown Plumber Boots
    ctx.save();
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Torso (Overalls & Shirt)
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Shirt Base
    ctx.beginPath();
    ctx.ellipse(0, -2, 14, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.shirtColor;
    ctx.fill();

    // Overalls
    ctx.beginPath();
    ctx.ellipse(0, 2, 13, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.overallColor;
    ctx.fill();

    // Straps
    ctx.fillStyle = p.overallColor;
    ctx.fillRect(-8, -8, 4, 8);
    ctx.fillRect(4, -8, 4, 8);

    // Golden Buttons
    ctx.fillStyle = p.goldStar;
    if (!isClassic) {
      ctx.shadowColor = p.goldStar;
      ctx.shadowBlur = 8;
    }
    ctx.beginPath();
    ctx.arc(-6, -2, 2.2, 0, Math.PI * 2);
    ctx.arc(6, -2, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 3. Arms & Gloves
    ctx.save();
    ctx.fillStyle = p.shirtColor;
    ctx.beginPath();
    ctx.ellipse(p.bodyX - 10, p.bodyY + 1, 3.5, 5, 0.3, 0, Math.PI * 2);
    ctx.ellipse(p.bodyX + 10, p.bodyY - 1, 3.5, 5, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(p.bodyX - 12, p.bodyY + 5, 4, 0, Math.PI * 2);
    ctx.arc(p.bodyX + 12, p.bodyY - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (!isClassic) {
      // Floating Swirling Fireball in Hand (Cool only)
      const fireX = p.bodyX + 16;
      const fireY = p.bodyY - 4 + Math.sin(this.time * 8) * 2;
      ctx.beginPath();
      ctx.arc(fireX, fireY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FF4500';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(fireX, fireY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 4. Head, Mustache & Cap
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FED0B0';
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#2575FC');

    // Nose
    ctx.beginPath();
    ctx.ellipse(0, 1, 4.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC4A0';
    ctx.fill();

    // Mustache
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.arc(-4, 4, 4, Math.PI * 0.8, Math.PI * 1.9);
    ctx.arc(0, 4.5, 3.5, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(4, 4, 4, Math.PI * 1.1, Math.PI * 2.2);
    ctx.quadraticCurveTo(0, 8.5, -7, 5);
    ctx.fill();

    // Cap Dome & Visor
    ctx.fillStyle = p.capColor;
    ctx.beginPath();
    ctx.ellipse(0, -9, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -4, 15, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isClassic) {
      // Classic White Circle
      ctx.beginPath();
      ctx.arc(0, -9, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Red 'M'
      ctx.fillStyle = '#E52521';
      ctx.font = 'bold 6px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', 0, -9);
    } else {
      // Glowing Golden 'M' Emblem
      ctx.beginPath();
      ctx.arc(0, -9, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.fireRed;
      ctx.shadowColor = p.goldStar;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', 0, -9);
    }

    // Accessories
    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

    ctx.restore();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.MarioRenderer = MarioRenderer;
if (typeof globalThis !== 'undefined') globalThis.MarioRenderer = MarioRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarioRenderer;
}
