/**
 * @file slimeRenderer.js
 * @description Cyber Slime Renderer with multi-skin support:
 * 1. 'cool' (Quantum Plasma Slime): Chromatic iridescent gradient, orbiting plasma droplets, floating singularity core with electron orbits.
 * 2. 'classic' (Classic Emerald Cyber Slime): Iconic translucent Cyber Cyan-Emerald Green jelly, soft pulsating inner energy core, golden star antenna.
 */

const SlimeRenderer = {
  drawCyberSlime(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

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

    if (isEvori) {
      // ==========================================
      // AMARI COSMIC DREAMWINGS SLIME
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, 0, 3);
      }

      // 1. Twin Side Dreamwings
      if (this.drawDreamwings) {
        // Left Wing
        ctx.save();
        ctx.translate(-w + 4, -4);
        this.drawDreamwings(ctx, 0, 0, Math.sin(this.time * 6) * 0.3 - 0.2, 0.75, false);
        ctx.restore();

        // Right Wing
        ctx.save();
        ctx.translate(w - 4, -4);
        this.drawDreamwings(ctx, 0, 0, -Math.sin(this.time * 6) * 0.3 + 0.2, 0.75, true);
        ctx.restore();
      }

      // 2. Translucent Cosmic Twilight Jelly Body
      ctx.beginPath();
      ctx.moveTo(0, -h - 4);
      ctx.bezierCurveTo(w + 4, -h + 2, w + 6, h / 2, w - 2, h);
      ctx.bezierCurveTo(w - 6, h + 3, -w + 6, h + 3, -w + 2, h);
      ctx.bezierCurveTo(-w - 6, h / 2, -w - 4, -h + 2, 0, -h - 4);
      ctx.closePath();

      const evoriGrad = ctx.createLinearGradient(0, -h - 4, 0, h + 3);
      evoriGrad.addColorStop(0, '#FAF5FF');
      evoriGrad.addColorStop(0.4, '#E9D5FF');
      evoriGrad.addColorStop(0.8, '#C084FC');
      evoriGrad.addColorStop(1, '#93C5FD');
      ctx.fillStyle = evoriGrad;
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Floating Glowing Star Core Inside Jelly
      if (this.drawDreamwingStar) {
        const starY = 2 + Math.sin(this.time * 3) * 2;
        this.drawDreamwingStar(ctx, 0, starY, 6, '#FDE047');
      }

      // 4. Specular Gloss Highlights
      ctx.beginPath();
      ctx.ellipse(-8, -12, 6, 3, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(9, -8, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 5. Procedural Expressive Eyes & Smile
      this.drawEyes(ctx, -7, 7, -2, p.eyeState, '#581C87');
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // 6. Antenna with Twinkling Star
      ctx.beginPath();
      ctx.moveTo(0, -h - 4);
      ctx.lineTo(0, -h - 9);
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (this.drawDreamwingStar) {
        ctx.save();
        ctx.translate(0, -h - 11);
        ctx.rotate(this.time * 1.5);
        this.drawDreamwingStar(ctx, 0, 0, 5.5, '#FDE047');
        ctx.restore();
      }

      if (acc.nightcap) this.drawNightcap(ctx, 0, -h - 4);
      if (acc.headphones) this.drawHeadphones(ctx, 0, -2);

      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA SLIME (Morphological)
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, 0, 3);
      }

      // 1. Translucent Spring Sakura Jelly Body
      ctx.beginPath();
      ctx.moveTo(0, -h - 4);
      ctx.bezierCurveTo(w + 4, -h + 2, w + 6, h / 2, w - 2, h);
      ctx.bezierCurveTo(w - 6, h + 3, -w + 6, h + 3, -w + 2, h);
      ctx.bezierCurveTo(-w - 6, h / 2, -w - 4, -h + 2, 0, -h - 4);
      ctx.closePath();

      const sakuraGrad = ctx.createLinearGradient(0, -h - 4, 0, h + 3);
      sakuraGrad.addColorStop(0, '#FDF2F8');
      sakuraGrad.addColorStop(0.5, '#FCE7F3');
      sakuraGrad.addColorStop(1, '#F472B6');
      ctx.fillStyle = sakuraGrad;
      ctx.shadowColor = '#F472B6';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 2. Suspended Cherry Blossom Petals Inside Translucent Jelly
      for (let i = 0; i < 3; i++) {
        const pAngle = this.time * 1.5 + (i * Math.PI * 2 / 3);
        const px = Math.cos(pAngle) * 8;
        const py = Math.sin(pAngle * 1.2) * 5 + 2;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 3.2, 1.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FB7185';
        ctx.fill();
        ctx.restore();
      }

      // 3. Specular Highlights
      ctx.beginPath();
      ctx.ellipse(-8, -12, 6, 3, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(9, -8, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 4. Procedural Expressive Eyes & Smile
      this.drawEyes(ctx, -7, 7, -2, p.eyeState, '#831843');
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // 5. Antenna with Blooming Sakura Flower
      ctx.beginPath();
      ctx.moveTo(0, -h - 4);
      ctx.lineTo(0, -h - 9);
      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Blooming Sakura Flower Ornament
      if (this.drawSakuraFlower) {
        ctx.save();
        ctx.translate(0, -h - 11);
        ctx.rotate(this.time * 0.8);
        this.drawSakuraFlower(ctx, 0, 0, 5, '#FEF08A', '#FB7185');
        ctx.restore();
      }

      if (acc.nightcap) this.drawNightcap(ctx, 0, -h - 4);
      if (acc.headphones) this.drawHeadphones(ctx, 0, -2);

      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART SLIME (Morphological)
      // ==========================================
      // 1. Orbiting 8-Bit Pixel Cubes
      for (let i = 0; i < 3; i++) {
        const angle = this.time * 2.5 + (i * Math.PI * 2 / 3);
        const orbX = Math.round(Math.cos(angle) * 26);
        const orbY = Math.round(-8 + Math.sin(angle * 1.5) * 8);
        ctx.fillStyle = ['#34D399', '#38BDF8', '#A855F7'][i];
        ctx.fillRect(orbX - 2, orbY - 2, 5, 5);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(orbX - 1, orbY - 1, 2, 2);
      }

      // 2. Stepped Quantized 8-Bit Pixel Jelly Body
      ctx.fillStyle = '#059669';
      // Outline / Base Body Stepped Rows
      ctx.fillRect(-2, -22, 4, 3);
      ctx.fillRect(-6, -19, 12, 3);
      ctx.fillRect(-12, -16, 24, 3);
      ctx.fillRect(-18, -13, 36, 4);
      ctx.fillRect(-22, -9, 44, 18);
      ctx.fillRect(-24, -5, 48, 18);
      ctx.fillRect(-22, 13, 44, 6);
      ctx.fillRect(-18, 19, 36, 3);

      // Inner Bright Lime Fill
      ctx.fillStyle = '#10B981';
      ctx.fillRect(-4, -18, 8, 3);
      ctx.fillRect(-10, -15, 20, 3);
      ctx.fillRect(-16, -12, 32, 4);
      ctx.fillRect(-20, -8, 40, 16);
      ctx.fillRect(-22, -4, 44, 16);
      ctx.fillRect(-20, 12, 40, 5);

      // Pixel Highlights (Specular)
      ctx.fillStyle = '#A7F3D0';
      ctx.fillRect(-14, -10, 6, 3);
      ctx.fillRect(-16, -7, 6, 6);
      ctx.fillRect(10, -8, 4, 4);

      // 3. Pixel Eyes & Mouth
      this.drawPixelEyes(ctx, -7, 7, -2, p.eyeState, '#064E3B');
      this.drawPixelMouth(ctx, 0, 4, p.mouthState);

      // 4. Stepped Pixel Antenna & 8-Bit Star
      ctx.fillStyle = '#059669';
      ctx.fillRect(-1, -26, 2, 5);

      // 8-bit Pixel Star
      ctx.fillStyle = '#FACC15';
      ctx.fillRect(-4, -30, 8, 2);
      ctx.fillRect(-1, -33, 2, 8);
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(-1, -30, 2, 2);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -h - 4);
      if (acc.headphones) this.drawHeadphones(ctx, 0, -2);

      ctx.restore();
      return;
    }

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
