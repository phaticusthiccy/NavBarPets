/**
 * @file penguinRenderer.js
 * @description Chilly Penguin Renderer with multi-skin support:
 * 1. 'cool' (Frost-Armor Ice King Penguin): Floating diamond-cut frosted ice crown, flowing aurora teal scarf, frosted ice belly plate.
 * 2. 'classic' (Classic Tuxedo Chilly Penguin): Midnight navy coat, crisp snow-white belly, cozy red knitted scarf, golden beak.
 */

const PenguinRenderer = {
  drawPenguin(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap || (Math.sin(this.time * 6) * 0.4),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -6,
      pawBL_y: pose.pawBL_y || 0,
      coatNavy: isClassic ? '#0F172A' : isPixel ? '#1E293B' : isSakura ? '#FCE7F3' : isEvori ? '#93C5FD' : '#0B132B',
      iceBelly: isClassic ? '#F8FAFC' : isPixel ? '#FFFFFF' : isSakura ? '#FFFFFF' : isEvori ? '#FAF5FF' : '#E0FBFC',
      beakGold: '#FFD166',
      scarfColor: isClassic ? '#EF4444' : isPixel ? '#DC2626' : isSakura ? '#FB7185' : isEvori ? '#C084FC' : '#48CAE4'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // STARLIGHT ASTRAL DREAMWINGS PENGUIN
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Webbed Feet
      this.drawPenguinFoot(ctx, p.pawBL_x - 3, p.pawBL_y, '#FDE047');
      this.drawPenguinFoot(ctx, p.pawFL_x + 3, p.pawFL_y, '#FDE047');

      // 2. Torso & Flippers
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Left Flipper Dreamwing
      ctx.save();
      ctx.translate(-14, 0);
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 0, 0, p.wingFlap + 0.3, 0.75, false);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 4, 4, 10, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#93C5FD';
        ctx.fill();
      }
      ctx.restore();

      // Right Flipper Dreamwing
      ctx.save();
      ctx.translate(14, 0);
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 0, 0, -p.wingFlap - 0.3, 0.75, true);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 4, 4, 10, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#93C5FD';
        ctx.fill();
      }
      ctx.restore();

      // Main Body
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#93C5FD';
      ctx.fill();

      // Starlight Belly Plate
      ctx.beginPath();
      ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Celestial Starlight Scarf
      ctx.save();
      ctx.translate(0, -12);
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();

      // Star broach on scarf
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 4, 2, 3.2, '#FDE047');
      }

      // Trailing scarf tail
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(12, 14 + Math.sin(this.time * 4) * 2);
      ctx.lineTo(4, 16 + Math.sin(this.time * 4) * 2);
      ctx.lineTo(2, 0);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();
      ctx.restore();

      // 3. Penguin Head
      ctx.save();
      ctx.translate(0, -20);
      ctx.rotate(p.headRot);

      // Head Base
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#93C5FD';
      ctx.fill();

      // Eye Masks
      ctx.beginPath();
      ctx.arc(-4, 0, 5, 0, Math.PI * 2);
      ctx.arc(4, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Floating Celestial Star Crown
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Eyes
      this.drawEyes(ctx, -4, 4, 0, p.eyeState, '#581C87');

      // Golden Beak
      ctx.beginPath();
      ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(0, 7);
      ctx.closePath();
      ctx.fillStyle = '#FDE047';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA PENGUIN
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Webbed Feet
      this.drawPenguinFoot(ctx, p.pawBL_x - 3, p.pawBL_y, '#FB7185');
      this.drawPenguinFoot(ctx, p.pawFL_x + 3, p.pawFL_y, '#FB7185');

      // 2. Torso & Flippers
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Left Flipper
      ctx.save();
      ctx.translate(-14, 0);
      ctx.rotate(p.wingFlap + 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 4, 4, 10, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();

      // Right Flipper
      ctx.save();
      ctx.translate(14, 0);
      ctx.rotate(-p.wingFlap - 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 4, 4, 10, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();

      // Main Body
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Belly Plate
      ctx.beginPath();
      ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Spring Festival Scarf
      ctx.save();
      ctx.translate(0, -12);
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      // Trailing scarf tail
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(12, 14 + Math.sin(this.time * 4) * 2);
      ctx.lineTo(4, 16 + Math.sin(this.time * 4) * 2);
      ctx.lineTo(2, 0);
      ctx.closePath();
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      ctx.restore();
      ctx.restore();

      // 3. Penguin Head
      ctx.save();
      ctx.translate(0, -20);
      ctx.rotate(p.headRot);

      // Head Base
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Eye Masks
      ctx.beginPath();
      ctx.arc(-4, 0, 5, 0, Math.PI * 2);
      ctx.arc(4, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Blooming Sakura Flower Ornament on Head
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, 0, -14, 5, '#FEF08A', '#F472B6');
      }

      // Eyes
      this.drawEyes(ctx, -4, 4, 0, p.eyeState, '#831843');

      // Golden Beak
      ctx.beginPath();
      ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(0, 7);
      ctx.closePath();
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART PENGUIN (Morphological)
      // ==========================================
      // 1. Stepped Pixel Feet
      ctx.fillStyle = p.beakGold;
      ctx.fillRect(Math.round(p.pawBL_x - 7), Math.round(p.pawBL_y - 3), 8, 3);
      ctx.fillRect(Math.round(p.pawFL_x - 1), Math.round(p.pawFL_y - 3), 8, 3);

      // 2. Torso & Stepped Flippers
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);

      // Left Flipper
      ctx.save();
      ctx.translate(-14, 0);
      ctx.rotate(p.wingFlap + 0.3);
      ctx.fillStyle = p.coatNavy;
      ctx.fillRect(-3, 0, 6, 12);
      ctx.fillRect(-5, 3, 10, 6);
      ctx.restore();

      // Right Flipper
      ctx.save();
      ctx.translate(14, 0);
      ctx.rotate(-p.wingFlap - 0.3);
      ctx.fillStyle = p.coatNavy;
      ctx.fillRect(-3, 0, 6, 12);
      ctx.fillRect(-5, 3, 10, 6);
      ctx.restore();

      // Main Body
      ctx.fillStyle = p.coatNavy;
      ctx.fillRect(-14, -14, 28, 28);
      ctx.fillRect(-16, -10, 32, 20);

      // White Belly
      ctx.fillStyle = p.iceBelly;
      ctx.fillRect(-10, -8, 20, 20);
      ctx.fillRect(-12, -4, 24, 12);

      // 8-bit Scarf
      ctx.fillStyle = p.scarfColor;
      ctx.fillRect(-12, -14, 24, 5);
      // Scarf checkered accent
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(-4, -13, 3, 3);
      ctx.fillRect(4, -13, 3, 3);

      // Trailing scarf tail
      ctx.fillStyle = p.scarfColor;
      ctx.fillRect(4, -10, 6, 12);
      ctx.fillRect(6, 2, 6, 6);
      ctx.restore();

      // 3. Head
      ctx.save();
      ctx.translate(0, Math.round(p.headY + 12));
      ctx.rotate(p.headRot);

      // Head Base
      ctx.fillStyle = p.coatNavy;
      ctx.fillRect(-10, -10, 20, 20);
      ctx.fillRect(-12, -7, 24, 14);

      // Eye White Patches
      ctx.fillStyle = p.iceBelly;
      ctx.fillRect(-8, -4, 7, 7);
      ctx.fillRect(1, -4, 7, 7);

      // Pixel Eyes & Beak
      this.drawPixelEyes(ctx, -4, 4, 0, p.eyeState, '#0F172A');
      ctx.fillStyle = p.beakGold;
      ctx.fillRect(-3, 2, 6, 4);
      ctx.fillRect(-1, 6, 2, 2);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Webbed Feet
    this.drawPenguinFoot(ctx, p.pawBL_x - 3, p.pawBL_y, p.beakGold);
    this.drawPenguinFoot(ctx, p.pawFL_x + 3, p.pawFL_y, p.beakGold);

    // 2. Torso & Flippers
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Left Flipper
    ctx.save();
    ctx.translate(-14, 0);
    ctx.rotate(p.wingFlap + 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Right Flipper
    ctx.save();
    ctx.translate(14, 0);
    ctx.rotate(-p.wingFlap - 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Main Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // Belly Plate
    ctx.beginPath();
    ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.iceBelly;
    if (!isClassic) {
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 10;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Winter Scarf
    ctx.save();
    ctx.translate(0, -12);
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.scarfColor;
    if (!isClassic) {
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 10;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Trailing scarf tail
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(12, 14 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(4, 16 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(2, 0);
    ctx.closePath();
    ctx.fillStyle = p.scarfColor;
    ctx.fill();
    ctx.restore();
    ctx.restore();

    // 4. Penguin Head
    ctx.save();
    ctx.translate(0, -20);
    ctx.rotate(p.headRot);

    if (!isClassic) {
      // Floating Frosted Ice Crown (Cool only)
      ctx.beginPath();
      ctx.moveTo(-8, -14);
      ctx.lineTo(-4, -20);
      ctx.lineTo(0, -15);
      ctx.lineTo(4, -20);
      ctx.lineTo(8, -14);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = p.scarfColor;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Head Base
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // Eye Masks
    ctx.beginPath();
    ctx.arc(-4, 0, 5, 0, Math.PI * 2);
    ctx.arc(4, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = p.iceBelly;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -4, 4, 0, p.eyeState, isClassic ? '#0F172A' : p.scarfColor);

    // Golden Beak
    ctx.beginPath();
    ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(0, 7);
    ctx.closePath();
    ctx.fillStyle = p.beakGold;
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawPenguinFoot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 6, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.PenguinRenderer = PenguinRenderer;
if (typeof globalThis !== 'undefined') globalThis.PenguinRenderer = PenguinRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PenguinRenderer;
}
