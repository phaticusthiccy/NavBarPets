/**
 * @file slimeRenderer.js
 * @description Cyber Slime Renderer with multi-skin support:
 * 1. 'cool' (Quantum Plasma Slime): Chromatic iridescent gradient, orbiting plasma droplets, floating singularity core with electron orbits.
 * 2. 'classic' (Classic Emerald Cyber Slime): Iconic translucent Cyber Cyan-Emerald Green jelly, soft pulsating inner energy core, golden star antenna.
 */

const SlimeRenderer = {
  drawCyberSlime(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -14,
      bodyRot: pose.bodyRot || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'open',
      neonTeal: '#00F5D4',
      neonBlue: '#05D5FA',
      neonPurple: '#7928CA',
      neonPink: '#FF007F'
    };

    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    const w = 24;
    const h = 20;

    if (!isClassic) {
      // 1. Orbiting Plasma Micro-Droplets (Legendary skin only)
      for (let i = 0; i < 3; i++) {
        const angle = this.time * 2.5 + (i * Math.PI * 2 / 3);
        const orbX = Math.cos(angle) * 26;
        const orbY = -8 + Math.sin(angle * 1.5) * 8;
        ctx.beginPath();
        ctx.arc(orbX, orbY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = [p.neonTeal, p.neonPink, p.neonBlue][i];
        ctx.shadowColor = p.neonTeal;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // 2. Slime Droplet Main Body
    ctx.beginPath();
    ctx.moveTo(0, -h - 4);
    ctx.bezierCurveTo(w + 4, -h + 2, w + 6, h / 2, w - 2, h);
    ctx.bezierCurveTo(w - 6, h + 3, -w + 6, h + 3, -w + 2, h);
    ctx.bezierCurveTo(-w - 6, h / 2, -w - 4, -h + 2, 0, -h - 4);
    ctx.closePath();

    if (isClassic) {
      // Classic Translucent Cyber Emerald / Mint Gradient
      const classicGrad = ctx.createLinearGradient(0, -h - 4, 0, h + 3);
      classicGrad.addColorStop(0, '#00F5D4');
      classicGrad.addColorStop(0.5, '#06D6A0');
      classicGrad.addColorStop(1, '#058C68');
      ctx.fillStyle = classicGrad;
      ctx.shadowColor = '#00F5D4';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Soft pulsating inner core
      ctx.beginPath();
      ctx.arc(Math.sin(this.time * 2.5) * 2, -1, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    } else {
      // Quantum Multi-Stop Plasma Gradient
      const grad = ctx.createLinearGradient(-w, -h, w, h);
      grad.addColorStop(0, p.neonTeal);
      grad.addColorStop(0.35, p.neonBlue);
      grad.addColorStop(0.7, p.neonPurple);
      grad.addColorStop(1, p.neonPink);
      ctx.fillStyle = grad;
      ctx.shadowColor = p.neonTeal;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Internal Singularity Core with Rotating Electron Orbit
      const coreY = -2 + Math.sin(this.time * 3) * 2;
      ctx.beginPath();
      ctx.arc(0, coreY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.translate(0, coreY);
      ctx.rotate(this.time * 2.8);
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 3.5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Ultra-Gloss Specular Highlights
    ctx.beginPath();
    ctx.ellipse(-8, -12, 6, 3, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(9, -8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Procedural Expressive Eyes
    this.drawEyes(ctx, -7, 7, -2, p.eyeState, '#FFFFFF');

    // 5. Cute Open Smile Mouth
    this.drawMouth(ctx, 0, 4, p.mouthState);

    // 6. Antenna with Golden Star
    ctx.beginPath();
    ctx.moveTo(0, -h - 4);
    ctx.lineTo(0, -h - 9);
    ctx.strokeStyle = isClassic ? '#00F5D4' : p.neonTeal;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Golden Star Ornament
    ctx.save();
    ctx.translate(0, -h - 11);
    ctx.rotate(this.time * 1.5);
    ctx.fillStyle = '#FFE600';
    ctx.shadowColor = '#FFE600';
    ctx.shadowBlur = 8;
    this.drawStar(ctx, 0, 0, 5, 4.5, 2.2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -h - 4);
    if (acc.headphones) this.drawHeadphones(ctx, 0, -2);

    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.SlimeRenderer = SlimeRenderer;
if (typeof globalThis !== 'undefined') globalThis.SlimeRenderer = SlimeRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlimeRenderer;
}
