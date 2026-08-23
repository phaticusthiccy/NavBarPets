/**
 * @file particleSystem.js
 * @description Real-time Vector Particle Engine for NavBarPets.
 * Handles floating musical notes, sleeping Zzz bubbles, petting hearts,
 * surprise emotes, ground impact dust shockwaves, and elemental flames.
 */

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  /**
   * Updates particle positions, velocities, lifespans, and alpha decays.
   * @param {number} [dt=0.016] - Delta time in seconds
   */
  update(dt = 0.016) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.maxAge) {
        this.particles.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += (p.gravity || 0) * dt;

      if (p.wobbleSpeed) {
        p.wobblePhase = (p.wobblePhase || 0) + p.wobbleSpeed * dt;
        p.x += Math.sin(p.wobblePhase) * (p.wobbleAmount || 1);
      }

      if (p.rotationSpeed) {
        p.rotation = (p.rotation || 0) + p.rotationSpeed * dt;
      }

      p.scale = p.initialScale * (1 - (p.age / p.maxAge) * 0.3);
      p.alpha = Math.max(0, 1 - Math.pow(p.age / p.maxAge, 1.5));
    }
  }

  /**
   * Renders all active particles onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      if (p.rotation) ctx.rotate(p.rotation);
      ctx.scale(p.scale, p.scale);

      switch (p.type) {
        case 'note':
          this.drawNote(ctx, p);
          break;
        case 'zzz':
          this.drawZzz(ctx, p);
          break;
        case 'heart':
          this.drawHeart(ctx, p);
          break;
        case 'emote':
          this.drawEmote(ctx, p);
          break;
        case 'dust':
          this.drawDust(ctx, p);
          break;
        case 'spark':
          this.drawSpark(ctx, p);
          break;
        case 'sweat':
          this.drawSweat(ctx, p);
          break;
        case 'flame':
          this.drawFlame(ctx, p);
          break;
      }
      ctx.restore();
    }
  }

  /**
   * Emits floating musical notes during dance sequences.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   * @param {number} [count=2] - Number of notes to emit
   */
  spawnMusicNotes(x, y, count = 2) {
    const symbols = ['♪', '♫', '♬', '♩'];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A06CD5', '#FF9F1C', '#2EC4B6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: 'note',
        x: x + (Math.random() * 40 - 20),
        y: y - 20 + (Math.random() * 10 - 5),
        vx: (Math.random() * 30 - 15),
        vy: -(30 + Math.random() * 35),
        gravity: -5,
        wobbleSpeed: 4 + Math.random() * 4,
        wobbleAmount: 0.8,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        initialScale: 1 + Math.random() * 0.4,
        age: 0,
        maxAge: 1.4 + Math.random() * 0.8,
        alpha: 1
      });
    }
  }

  /**
   * Emits drifting Zzz sleep bubbles.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   */
  spawnZzz(x, y) {
    const zList = ['z', 'Z', 'Zzz'];
    const text = zList[Math.floor(Math.random() * zList.length)];
    this.particles.push({
      type: 'zzz',
      x: x + 15 + (Math.random() * 10 - 5),
      y: y - 20,
      vx: 12 + Math.random() * 15,
      vy: -(18 + Math.random() * 12),
      gravity: -2,
      wobbleSpeed: 2.5,
      wobbleAmount: 0.6,
      text: text,
      color: '#A0C4FF',
      initialScale: 0.9 + Math.random() * 0.4,
      age: 0,
      maxAge: 2.2 + Math.random() * 0.6,
      alpha: 1
    });
  }

  /**
   * Emits heart particles when pet is petted.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   */
  spawnHeart(x, y) {
    const colors = ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1'];
    this.particles.push({
      type: 'heart',
      x: x + (Math.random() * 30 - 15),
      y: y - 25,
      vx: (Math.random() * 30 - 15),
      vy: -(25 + Math.random() * 30),
      gravity: -5,
      wobbleSpeed: 5,
      wobbleAmount: 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
      initialScale: 0.8 + Math.random() * 0.5,
      age: 0,
      maxAge: 1.2 + Math.random() * 0.5,
      alpha: 1
    });
  }

  /**
   * Emits alert/surprise bubbles over pet head.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   * @param {string} [emote='!'] - Emote glyph
   */
  spawnEmote(x, y, emote = '!') {
    this.particles.push({
      type: 'emote',
      x: x,
      y: y - 40,
      vx: 0,
      vy: -15,
      gravity: 5,
      emote: emote,
      color: emote === '!' ? '#FFD166' : '#06D6A0',
      initialScale: 1.3,
      age: 0,
      maxAge: 1.0,
      alpha: 1
    });
  }

  /**
   * Emits ground dust clouds on landing impacts.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   * @param {number} [count=4] - Number of dust particles
   */
  spawnDust(x, y, count = 4) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / (count + 1)) * (i + 1) + (Math.random() * 0.2 - 0.1);
      const speed = 25 + Math.random() * 30;
      this.particles.push({
        type: 'dust',
        x: x + (Math.random() * 20 - 10),
        y: y,
        vx: Math.cos(angle) * speed * (i % 2 === 0 ? 1 : -1),
        vy: -Math.abs(Math.sin(angle) * speed * 0.6),
        gravity: 30,
        color: 'rgba(230, 235, 245, 0.7)',
        initialScale: 0.7 + Math.random() * 0.6,
        age: 0,
        maxAge: 0.5 + Math.random() * 0.3,
        alpha: 0.8
      });
    }
  }

  /**
   * Emits sweat drop when pet is startled.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   */
  spawnSweat(x, y) {
    this.particles.push({
      type: 'sweat',
      x: x + 15,
      y: y - 25,
      vx: 8,
      vy: -10,
      gravity: 40,
      color: '#4CC9F0',
      initialScale: 0.8,
      age: 0,
      maxAge: 0.8,
      alpha: 1
    });
  }

  /**
   * Emits fiery embers for Dragon animations.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   * @param {number} [dir=1] - Direction facing (-1 or 1)
   */
  spawnFlame(x, y, dir = 1) {
    const colors = ['#FF4800', '#FF7900', '#FFB000', '#FFE600'];
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        type: 'flame',
        x: x + dir * 15,
        y: y - 10 + (Math.random() * 8 - 4),
        vx: dir * (40 + Math.random() * 30),
        vy: (Math.random() * 20 - 10) - 10,
        gravity: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        initialScale: 0.7 + Math.random() * 0.5,
        age: 0,
        maxAge: 0.6 + Math.random() * 0.3,
        alpha: 0.9
      });
    }
  }

  drawNote(ctx, p) {
    ctx.font = 'bold 18px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.symbol, 0, 0);
  }

  drawZzz(ctx, p) {
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = '#64B5F6';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.text, 0, 0);
  }

  drawHeart(ctx, p) {
    ctx.font = '16px "Segoe UI Emoji", sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = '#FF4D6D';
    ctx.shadowBlur = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❤️', 0, 0);
  }

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
  }

  drawDust(ctx, p) {
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  drawSweat(ctx, p) {
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(4, -2, 5, 3, 0, 6);
    ctx.bezierCurveTo(-5, 3, -4, -2, 0, -6);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  drawFlame(ctx, p) {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleSystem;
}
