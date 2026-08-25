/**
 * @file particleSystem.js
 * @description Master Particle System Manager for NavBarPets.
 * Coordinates 60 FPS particle lifecycle updates, rendering loops, and modular emitters.
 */

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  /**
   * Updates particle positions, velocities, rotations, scales, and alpha decays.
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

      if (p.vx) p.x += p.vx * dt;
      if (p.vy) p.y += p.vy * dt;
      if (p.gravity) p.vy = (p.vy || 0) + p.gravity * dt;

      if (p.wobbleSpeed) {
        p.wobblePhase = (p.wobblePhase || 0) + p.wobbleSpeed * dt;
        p.x += Math.sin(p.wobblePhase) * (p.wobbleAmount || 1);
      }

      if (p.rotationSpeed) {
        p.rotation = (p.rotation || 0) + p.rotationSpeed * dt;
      }

      // Shockwave dynamic radius growth
      if (p.type === 'shockwave' || p.type === 'warp_shockwave') {
        p.radiusX += (p.growthX || 80) * dt;
        p.radiusY += (p.growthY || 45) * dt;
        p.lineWidth = Math.max(0.2, (p.initialLineWidth || 3) * (1 - p.age / p.maxAge));
      }

      p.scale = Math.max(0.05, p.initialScale * (1 - (p.age / p.maxAge) * 0.2));
      p.alpha = Math.min(1.0, Math.max(0, 1 - Math.pow(p.age / p.maxAge, 1.4)));
    }

    // Keep particle buffer within 90 active items for 60 FPS performance
    if (this.particles.length > 90) {
      this.particles.splice(0, this.particles.length - 90);
    }
  }

  /**
   * Renders all active particles onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    for (const p of this.particles) {
      if (!p || p.alpha <= 0.01) continue;
      ctx.save();
      const alpha = Math.min(1.0, Math.max(0, p.alpha || 0));
      ctx.globalAlpha = alpha;
      const px = Number.isFinite(p.x) ? p.x : 0;
      const py = Number.isFinite(p.y) ? p.y : 0;
      ctx.translate(px, py);
      if (p.rotation) ctx.rotate(p.rotation);
      const s = Math.max(0.01, p.scale || 1.0);
      ctx.scale(s, s);

      switch (p.type) {
        case 'cool_heart':
        case 'heart':
          if (this.drawCoolHeart) this.drawCoolHeart(ctx, p);
          break;
        case 'shockwave':
          if (this.drawShockwave) this.drawShockwave(ctx, p);
          break;
        case 'paw_print':
          if (this.drawPawPrint) this.drawPawPrint(ctx, p);
          break;
        case 'bone':
          if (this.drawBone) this.drawBone(ctx, p);
          break;
        case 'bubble_drop':
          if (this.drawBubbleDrop) this.drawBubbleDrop(ctx, p);
          break;
        case 'flame_ember':
        case 'flame':
          if (this.drawFlameEmber) this.drawFlameEmber(ctx, p);
          break;
        case 'water_drop':
          if (this.drawWaterDrop) this.drawWaterDrop(ctx, p);
          break;
        case 'spirit_flame':
          if (this.drawSpiritFlame) this.drawSpiritFlame(ctx, p);
          break;
        case 'carrot':
          if (this.drawCarrot) this.drawCarrot(ctx, p);
          break;
        case 'snowflake':
          if (this.drawSnowflake) this.drawSnowflake(ctx, p);
          break;
        case 'wind_blade':
          if (this.drawWindBlade) this.drawWindBlade(ctx, p);
          break;
        case 'coin':
          if (this.drawCoin) this.drawCoin(ctx, p);
          break;
        case 'lightning_bolt':
          if (this.drawLightningBolt) this.drawLightningBolt(ctx, p);
          break;
        case 'warp_beam':
          if (this.drawWarpBeam) this.drawWarpBeam(ctx, p);
          break;
        case 'warp_shockwave':
          if (this.drawWarpShockwave) this.drawWarpShockwave(ctx, p);
          break;
        case 'speed_line':
          if (this.drawSpeedLine) this.drawSpeedLine(ctx, p);
          break;
        case 'lightning_strike':
          if (this.drawLightningStrike) this.drawLightningStrike(ctx, p);
          break;
        case 'star_sparkle':
        case 'spark':
          if (this.drawStarSparkle) this.drawStarSparkle(ctx, p);
          break;
        case 'note':
          if (this.drawNote) this.drawNote(ctx, p);
          break;
        case 'zzz':
          if (this.drawZzz) this.drawZzz(ctx, p);
          break;
        case 'emote':
          if (this.drawEmote) this.drawEmote(ctx, p);
          break;
        case 'dust':
          if (this.drawDust) this.drawDust(ctx, p);
          break;
        case 'sweat':
          if (this.drawSweat) this.drawSweat(ctx, p);
          break;
      }
      ctx.restore();
    }
  }
}

const resolveParticleModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

const _ParticleRenderers = resolveParticleModule('ParticleRenderers', './particles/particleRenderers.js');
const _ParticleEmitters = resolveParticleModule('ParticleEmitters', './particles/particleEmitters.js');

if (_ParticleRenderers) Object.assign(ParticleSystem.prototype, _ParticleRenderers);
if (_ParticleEmitters) Object.assign(ParticleSystem.prototype, _ParticleEmitters);

if (typeof window !== 'undefined') window.ParticleSystem = ParticleSystem;
if (typeof globalThis !== 'undefined') globalThis.ParticleSystem = ParticleSystem;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleSystem;
}
