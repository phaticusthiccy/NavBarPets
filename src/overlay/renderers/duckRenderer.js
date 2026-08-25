/**
 * @file duckRenderer.js
 * @description Pixel Duck Renderer with multi-skin support:
 * 1. 'cool' (Cyberpunk Aviator Duck): HUD scanline sunglasses, carbon wings with cyan thruster plumes, streetwear bandana.
 * 2. 'classic' (Classic Yellow Rubber Ducky): Bright sunny yellow body, cute head tuft, orange bill, rosy cheeks.
 */

const DuckRenderer = {
  drawPixelDuck(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyY: pose.bodyY || -14,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -28,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap || (Math.sin(this.time * 6) * 0.4),
      tailWag: pose.tailAngle || (Math.sin(this.time * 4) * 0.25),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -6,
      pawBL_y: pose.pawBL_y || 0,
      neonYellow: isClassic ? '#FFD166' : '#FFD60A',
      cyberBeak: '#FF5400',
      neonCyan: '#00F5D4',
      carbonDark: isClassic ? '#FFC300' : '#1E1E24'
    };

    ctx.save();

    // 1. Duck Feet
    this.drawDuckFoot(ctx, p.pawBL_x, p.pawBL_y, p.cyberBeak);
    this.drawDuckFoot(ctx, p.pawFL_x, p.pawFL_y, p.cyberBeak);

    // 2. Duck Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Tail Feather Tuft
    ctx.save();
    ctx.translate(-14, -2);
    ctx.rotate(p.tailWag - 0.4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-4, 2);
    ctx.closePath();
    ctx.fillStyle = p.neonYellow;
    ctx.fill();
    ctx.restore();

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.neonYellow;
    ctx.fill();

    // Wings
    ctx.save();
    ctx.translate(-2, -2);
    ctx.rotate(p.wingFlap);
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 6, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = p.carbonDark;
    ctx.fill();

    if (!isClassic) {
      // Ion Thruster Plasma Plume (Cool skin only)
      ctx.beginPath();
      ctx.ellipse(-10, 0, 4.5, 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.neonCyan;
      ctx.shadowColor = p.neonCyan;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    ctx.restore();

    // 3. Head
    ctx.save();
    ctx.translate(6, p.headY);
    ctx.rotate(p.headRot);

    // Round Head
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = p.neonYellow;
    ctx.fill();

    if (isClassic) {
      // Cute Tuft on top
      ctx.beginPath();
      ctx.moveTo(-2, -12);
      ctx.bezierCurveTo(0, -18, 4, -18, 4, -12);
      ctx.fillStyle = p.neonYellow;
      ctx.fill();

      // Orange Bill
      ctx.beginPath();
      ctx.ellipse(11, 2, 7, 4, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = p.cyberBeak;
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -2, 4, -3, p.eyeState);

      // Blush
      ctx.beginPath();
      ctx.arc(-4, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 107, 129, 0.4)';
      ctx.fill();
    } else {
      // Cyberpunk Visor
      ctx.beginPath();
      ctx.moveTo(-10, -4); ctx.lineTo(8, -4); ctx.lineTo(6, 4); ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fillStyle = '#0F0F1A';
      ctx.fill();

      // Cyan HUD Scanlines
      ctx.strokeStyle = p.neonCyan;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-8, -1); ctx.lineTo(6, -1);
      ctx.moveTo(-6, 2); ctx.lineTo(4, 2);
      ctx.shadowColor = p.neonCyan;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glowing Cyber Beak
      ctx.beginPath();
      ctx.ellipse(11, 2, 7, 4, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = p.cyberBeak;
      ctx.shadowColor = p.cyberBeak;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Streetwear Bandana
      ctx.beginPath();
      ctx.moveTo(-8, 9); ctx.lineTo(8, 9); ctx.lineTo(0, 16);
      ctx.closePath();
      ctx.fillStyle = '#FF0055';
      ctx.fill();
    }

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, -2, -10);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawDuckFoot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - 4, y);
    ctx.lineTo(x + 4, y);
    ctx.lineTo(x + 2, y - 4);
    ctx.lineTo(x - 2, y - 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.DuckRenderer = DuckRenderer;
if (typeof globalThis !== 'undefined') globalThis.DuckRenderer = DuckRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DuckRenderer;
}
