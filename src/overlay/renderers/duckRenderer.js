/**
 * @file duckRenderer.js
 * @description Pixel Duck Renderer with multi-skin support:
 * 1. 'cool' (Cyberpunk Aviator Duck): HUD scanline sunglasses, carbon wings with cyan thruster plumes, streetwear bandana.
 * 2. 'classic' (Classic Yellow Rubber Ducky): Bright sunny yellow body, cute head tuft, orange bill, rosy cheeks.
 */

const DuckRenderer = {
  drawPixelDuck(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

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
      neonYellow: isClassic ? '#FFD166' : isPixel ? '#FACC15' : isSakura ? '#FFFDF7' : isEvori ? '#F3E8FF' : '#FFD60A',
      cyberBeak: isPixel ? '#EA580C' : isSakura ? '#FB7185' : isEvori ? '#FDE047' : '#FF5400',
      neonCyan: '#00F5D4',
      carbonDark: isClassic ? '#FFC300' : isPixel ? '#CA8A04' : isSakura ? '#FCE7F3' : isEvori ? '#E9D5FF' : '#1E1E24'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // STARLIGHT FAMILIAR DREAMWINGS DUCK
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Duck Feet
      this.drawDuckFoot(ctx, p.pawBL_x, p.pawBL_y, '#FDE047');
      this.drawDuckFoot(ctx, p.pawFL_x, p.pawFL_y, '#FDE047');

      // 2. Duck Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Tail Feather Tuft with Twinkling Star
      ctx.save();
      ctx.translate(-14, -2);
      ctx.rotate(p.tailWag - 0.4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-10, -8);
      ctx.lineTo(-4, 2);
      ctx.closePath();
      ctx.fillStyle = '#E9D5FF';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -8, -6, 3, '#FDE047');
      }
      ctx.restore();

      // Body Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Celestial Fairy Dreamwings
      if (this.drawDreamwings) {
        ctx.save();
        ctx.translate(-2, -2);
        this.drawDreamwings(ctx, 0, 0, p.wingFlap, 0.8, false);
        ctx.restore();
      }
      ctx.restore();

      // 3. Head & Golden Star Tiara
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Head Base
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Floating Star Tiara on Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -14, 5, '#FDE047');
      }

      // Golden Beak
      ctx.beginPath();
      ctx.ellipse(11, 2, 7, 4, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE047';
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -2, 4, -3, p.eyeState, '#581C87');

      // Rosy Star Cheeks
      ctx.beginPath();
      ctx.arc(-4, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(192, 132, 252, 0.45)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, -2, -10);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA DUCK (Morphological)
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Duck Feet
      this.drawDuckFoot(ctx, p.pawBL_x, p.pawBL_y, '#FB7185');
      this.drawDuckFoot(ctx, p.pawFL_x, p.pawFL_y, '#FB7185');

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
      ctx.fillStyle = '#FFFDF7';
      ctx.fill();
      ctx.restore();

      // Body Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF7';
      ctx.fill();

      // Sakura Wings
      ctx.save();
      ctx.translate(-2, -2);
      ctx.rotate(p.wingFlap);
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 6, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();
      ctx.restore();

      // 3. Head & Blooming Sakura Flower Crown
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Head Base
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF7';
      ctx.fill();

      // Blooming Sakura Flower Ornament on Head
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, 0, -13, 5, '#FEF08A', '#F472B6');
      }

      // Coral Rose Beak
      ctx.beginPath();
      ctx.ellipse(11, 2, 7, 4, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -2, 4, -3, p.eyeState, '#831843');

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-4, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 114, 182, 0.5)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, -2, -10);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART DUCK (Morphological)
      // ==========================================
      // 1. Stepped Pixel Feet
      ctx.fillStyle = p.cyberBeak;
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 2), 8, 3);
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 2), 8, 3);

      // 2. Duck Torso
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);

      // Stepped Pixel Tail
      ctx.save();
      ctx.translate(-14, -2);
      ctx.rotate(p.tailWag - 0.4);
      ctx.fillStyle = p.neonYellow;
      ctx.fillRect(-6, -4, 6, 4);
      ctx.fillRect(-10, -7, 5, 4);
      ctx.restore();

      // Body Base
      ctx.fillStyle = p.neonYellow;
      ctx.fillRect(-14, -10, 28, 20);
      ctx.fillRect(-16, -7, 32, 14);

      // Pixel Wing
      ctx.save();
      ctx.translate(-2, -2);
      ctx.rotate(p.wingFlap);
      ctx.fillStyle = p.carbonDark;
      ctx.fillRect(-8, -4, 16, 8);
      ctx.fillRect(-10, -2, 18, 5);
      ctx.restore();
      ctx.restore();

      // 3. Head
      ctx.save();
      ctx.translate(6, Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Blocky Head
      ctx.fillStyle = p.neonYellow;
      ctx.fillRect(-10, -10, 20, 20);
      ctx.fillRect(-12, -8, 24, 16);

      // Head tuft
      ctx.fillRect(-2, -14, 4, 5);
      ctx.fillRect(0, -16, 3, 3);

      // 8-bit Pixel Bill
      ctx.fillStyle = p.cyberBeak;
      ctx.fillRect(8, 0, 10, 5);
      ctx.fillRect(10, 4, 6, 3);

      // Pixel Eye
      this.drawPixelEyes(ctx, -2, 4, -3, p.eyeState, '#1C1917');

      // Pixel Blush
      ctx.fillStyle = '#FB7185';
      ctx.fillRect(-4, 3, 4, 3);

      if (acc.nightcap) this.drawNightcap(ctx, -2, -10);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

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
