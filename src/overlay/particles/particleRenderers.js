/**
 * @file particleRenderers.js
 * @description Procedural 2D Vector Drawing Routines for High-Definition Particle FX.
 */

const ParticleRenderers = {
  drawCoolHeart(ctx, p) {
    const s = p.size || 10;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s * 0.8, -s * 0.5, -s * 1.2, s * 0.3, 0, s * 1.1);
    ctx.bezierCurveTo(s * 1.2, s * 0.3, s * 0.8, -s * 0.5, 0, s * 0.3);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = p.glowBlur || 12;
    ctx.fill();

    // Inner glossy reflection
    ctx.beginPath();
    ctx.arc(-s * 0.35, s * 0.05, s * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fill();
  },

  drawShockwave(ctx, p) {
    ctx.beginPath();
    const rx = Math.max(0.1, p.radiusX || 1);
    const ry = Math.max(0.1, p.radiusY || 1);
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.lineWidth || 3;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 12;
    ctx.stroke();
  },

  drawPawPrint(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 10;

    // Main bottom pad
    ctx.beginPath();
    ctx.ellipse(0, 2.5, 6, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 toe beans
    const toes = [[-5, -3.5], [-2, -6.5], [2, -6.5], [5, -3.5]];
    toes.forEach(([tx, ty]) => {
      ctx.beginPath();
      ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawBone(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 8;

    // Center bridge
    ctx.fillRect(-7, -2.5, 14, 5);

    // 4 round end knobs
    const knobs = [[-7, -3.5], [-7, 3.5], [7, -3.5], [7, 3.5]];
    knobs.forEach(([kx, ky]) => {
      ctx.beginPath();
      ctx.arc(kx, ky, 2.8, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawBubbleDrop(ctx, p) {
    const r = p.radius || 6;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 12;
    ctx.fill();

    // Refraction gleam
    ctx.beginPath();
    ctx.arc(-r * 0.35, -r * 0.35, r * 0.32, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
  },

  drawFlameEmber(ctx, p) {
    const r = p.radius || 5;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 14;
    ctx.fill();

    // White hot core
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  },

  drawWaterDrop(ctx, p) {
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.bezierCurveTo(4, -3, 5, 2, 0, 6);
    ctx.bezierCurveTo(-5, 2, -4, -3, 0, -7);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 8;
    ctx.fill();

    // Specular dot
    ctx.beginPath();
    ctx.arc(-1.5, 1, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();
  },

  drawSpiritFlame(ctx, p) {
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 16;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  },

  drawCarrot(ctx, p) {
    // Carrot cone
    ctx.beginPath();
    ctx.moveTo(0, 9);
    ctx.lineTo(-4.5, -3.5);
    ctx.lineTo(4.5, -3.5);
    ctx.closePath();
    ctx.fillStyle = '#FF7A00';
    ctx.shadowColor = '#FF9E00';
    ctx.shadowBlur = 8;
    ctx.fill();

    // Leaf sprigs
    ctx.fillStyle = '#06D6A0';
    ctx.beginPath();
    ctx.arc(-2.5, -5.5, 2.2, 0, Math.PI * 2);
    ctx.arc(0, -6.8, 2.2, 0, Math.PI * 2);
    ctx.arc(2.5, -5.5, 2.2, 0, Math.PI * 2);
    ctx.fill();
  },

  drawSnowflake(ctx, p) {
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = p.glowColor || '#A0E8FF';
    ctx.shadowBlur = 10;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -8);
      ctx.moveTo(0, -4.5);
      ctx.lineTo(-3, -6.5);
      ctx.moveTo(0, -4.5);
      ctx.lineTo(3, -6.5);
      ctx.stroke();
      ctx.rotate(Math.PI / 3);
    }
  },

  drawWindBlade(ctx, p) {
    ctx.beginPath();
    ctx.moveTo(-11, 0);
    ctx.quadraticCurveTo(0, -7, 13, -2);
    ctx.quadraticCurveTo(0, 3, -11, 0);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || '#00F5D4';
    ctx.shadowBlur = 12;
    ctx.fill();
  },

  drawCoin(ctx, p) {
    const w = Math.max(1.5, Math.abs(Math.cos(p.rotation || 0)) * 7.5);
    ctx.beginPath();
    ctx.ellipse(0, 0, w, 8.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFA500';
    ctx.shadowBlur = 12;
    ctx.fill();

    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  },

  drawLightningBolt(ctx, p) {
    ctx.beginPath();
    ctx.moveTo(-3, -11);
    ctx.lineTo(4, -3);
    ctx.lineTo(0, -2);
    ctx.lineTo(4, 11);
    ctx.lineTo(-4, 1);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = p.color || '#FFE600';
    ctx.shadowColor = p.glowColor || '#FFD000';
    ctx.shadowBlur = 14;
    ctx.fill();

    // Electric white core line
    ctx.beginPath();
    ctx.moveTo(-1, -7);
    ctx.lineTo(2, -2);
    ctx.lineTo(0, -1);
    ctx.lineTo(2, 7);
    ctx.lineTo(-2, 1);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  },

  drawWarpBeam(ctx, p) {
    const w = Math.max(2, (p.width || 28) * (1 - p.age / p.maxAge));
    const h = p.height || 300;
    const grad = ctx.createLinearGradient(0, -h, 0, 0);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(0.5, p.color || 'rgba(0, 245, 212, 0.45)');
    grad.addColorStop(1, p.glowColor || 'rgba(0, 245, 212, 0.9)');

    ctx.fillStyle = grad;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 18;
    ctx.fillRect(-w / 2, -h, w, h);

    // Bright inner laser core
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-w / 5, -h, w / 2.5, h);
  },

  drawWarpShockwave(ctx, p) {
    const rx = Math.max(0.1, p.radiusX || 1);
    const ry = Math.max(0.1, p.radiusY || 1);

    // Outer shockwave ring
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = Math.max(0.5, (p.lineWidth || 4.5) * (1 - p.age / p.maxAge));
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 20;
    ctx.stroke();

    // Inner bright neon shockwave ring
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * 0.65, ry * 0.65, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = Math.max(0.5, 2.2 * (1 - p.age / p.maxAge));
    ctx.stroke();
  },

  drawSpeedLine(ctx, p) {
    const len = p.length || 40;
    ctx.beginPath();
    ctx.moveTo(0, -len);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = p.color || '#FFFFFF';
    ctx.lineWidth = p.lineWidth || 2;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 12;
    ctx.stroke();
  },

  drawLightningStrike(ctx, p) {
    const h = p.height || 200;
    const segments = 6;
    const segH = h / segments;
    ctx.beginPath();
    let currX = 0;
    let currY = -h;
    ctx.moveTo(currX, currY);
    for (let i = 0; i < segments; i++) {
      currX += (Math.sin(i * 3.7 + (p.seed || 1)) * 14);
      currY += segH;
      ctx.lineTo(currX, currY);
    }
    ctx.strokeStyle = p.color || '#FFE600';
    ctx.lineWidth = p.lineWidth || 3.5;
    ctx.shadowColor = p.glowColor || '#FFD000';
    ctx.shadowBlur = 20;
    ctx.stroke();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  },

  drawStarSparkle(ctx, p) {
    const r = p.radius || 5.5;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glowColor || p.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  },

  drawNote(ctx, p) {
    ctx.font = 'bold 18px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.symbol, 0, 0);
  },

  drawZzz(ctx, p) {
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = '#64B5F6';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.text, 0, 0);
  },

  drawEmote(ctx, p) {
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fill();

    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillStyle = '#1A1A2E';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.emote, 0, 0);
  },

  drawDust(ctx, p) {
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  },

  drawSweat(ctx, p) {
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(4, -2, 5, 3, 0, 6);
    ctx.bezierCurveTo(-5, 3, -4, -2, 0, -6);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
};

if (typeof window !== 'undefined') window.ParticleRenderers = ParticleRenderers;
if (typeof globalThis !== 'undefined') globalThis.ParticleRenderers = ParticleRenderers;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleRenderers;
}
