/**
 * @file bullRenderer.js
 * @description Chibi Bull Mascot (Boğa Maskotu) Renderer with 5 morphological skins:
 * 1. 'cool' (Mecha Titan Bull): Titanium obsidian armor, blazing cyan magma horns, hydraulic nose ring, plasma tail.
 * 2. 'classic' (Chibi Fighting Bull): Chocolate brown coat, polished gold horns, shiny septum nose ring, red bandana.
 * 3. 'pixel' (8-Bit Arcade Bull): Stepped blocky pixel snout and horns, retro arcade hooves, pixel eyes.
 * 4. 'sakura' (Shrine Guardian Taurus): Pure snow coat, blossom pink horns with shrine shimenawa rope, drifting petals.
 * 5. 'evori' (Celestial Astral Taurus): Twilight lavender coat, golden crystal horns, fairy dreamwings, star halo.
 */

const BullRenderer = {
  drawBull(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 4) * 0.35),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 7,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -5,
      pawBR_y: pose.pawBR_y || 0
    };

    ctx.save();

    // ==========================================
    // 1. SAKURA SKIN (Shrine Guardian Sakura Taurus)
    // ==========================================
    if (isSakura) {
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // Tail with blossom tuft
      ctx.save();
      ctx.translate(-14, p.bodyY + 4);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-10, 6, -14, -4);
      ctx.strokeStyle = '#FCE7F3';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Blossom tuft
      ctx.beginPath();
      ctx.arc(-14, -4, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      ctx.restore();

      // Hooves (Far)
      ctx.fillStyle = '#FB7185';
      ctx.beginPath();
      ctx.roundRect(p.pawBL_x - 3, p.pawBL_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFL_x - 3, p.pawFL_y - 4, 6, 6, 2);
      ctx.fill();

      // Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 3, 17, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF5';
      ctx.fill();

      // Soft Pink Belly
      ctx.beginPath();
      ctx.ellipse(3, 4, 11, 8.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();

      // Hooves (Near)
      ctx.fillStyle = '#F43F5E';
      ctx.beginPath();
      ctx.roundRect(p.pawBR_x - 3, p.pawBR_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFR_x - 3, p.pawFR_y - 4, 6, 6, 2);
      ctx.fill();

      // Head & Horns
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Blossom Horns
      this.drawCurvedHorn(ctx, -8, -8, -1, '#FB7185', '#FFF1F2');
      this.drawCurvedHorn(ctx, 8, -8, 1, '#FB7185', '#FFF1F2');

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF5';
      ctx.fill();

      // Blossom Snout & Ring
      ctx.beginPath();
      ctx.ellipse(0, 5, 9, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Golden Ring
      ctx.beginPath();
      ctx.arc(0, 8, 3.2, 0, Math.PI * 2);
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#831843');
      this.drawMouth(ctx, 0, 4, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 2. EVORI DREAMWINGS SKIN (Celestial Astral Taurus)
    // ==========================================
    if (isEvori) {
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -6, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.9, false);
      }

      // Tail with Star tip
      ctx.save();
      ctx.translate(-14, p.bodyY + 4);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-10, 6, -14, -4);
      ctx.strokeStyle = '#E9D5FF';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -14, -4, 4, '#FDE047');
      }
      ctx.restore();

      // Hooves (Far)
      ctx.fillStyle = '#C084FC';
      ctx.beginPath();
      ctx.roundRect(p.pawBL_x - 3, p.pawBL_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFL_x - 3, p.pawFL_y - 4, 6, 6, 2);
      ctx.fill();

      // Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 3, 17, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Starlight Belly
      ctx.beginPath();
      ctx.ellipse(3, 4, 11, 8.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.restore();

      // Hooves (Near)
      ctx.fillStyle = '#A855F7';
      ctx.beginPath();
      ctx.roundRect(p.pawBR_x - 3, p.pawBR_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFR_x - 3, p.pawFR_y - 4, 6, 6, 2);
      ctx.fill();

      // Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 4, p.bodyY - 6, Math.sin(this.time * 5) * 0.25 + 0.1, 0.95, false);
      }

      // Head & Crystalline Starlight Horns
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      this.drawCurvedHorn(ctx, -8, -8, -1, '#FDE047', '#FFFFFF');
      this.drawCurvedHorn(ctx, 8, -8, 1, '#FDE047', '#FFFFFF');

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Floating Celestial Star Halo above Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Snout & Star Septum Ring
      ctx.beginPath();
      ctx.ellipse(0, 5, 9, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#E9D5FF';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 8, 3.2, 0, Math.PI * 2);
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#581C87');
      this.drawMouth(ctx, 0, 4, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 3. PIXEL ART SKIN (8-Bit Arcade Bull)
    // ==========================================
    if (isPixel) {
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Pixel Hooves
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(p.pawBL_x - 3, p.pawBL_y + 4, 6, 6);
      ctx.fillRect(p.pawFL_x - 3, p.pawFL_y + 4, 6, 6);
      ctx.fillRect(p.pawBR_x - 3, p.pawBR_y + 4, 6, 6);
      ctx.fillRect(p.pawFR_x - 3, p.pawFR_y + 4, 6, 6);

      // Pixel Body (Stepped Rect)
      ctx.fillStyle = '#9A3412';
      ctx.fillRect(-16, -10, 32, 20);
      ctx.fillStyle = '#EA580C';
      ctx.fillRect(-12, -4, 24, 14);

      // Pixel Head
      ctx.fillStyle = '#9A3412';
      ctx.fillRect(-2, -26, 20, 18);

      // Pixel Horns
      ctx.fillStyle = '#FACC15';
      ctx.fillRect(-8, -32, 6, 8);
      ctx.fillRect(-12, -36, 6, 6);
      ctx.fillRect(16, -32, 6, 8);
      ctx.fillRect(20, -36, 6, 6);

      // Pixel Snout & Ring
      ctx.fillStyle = '#FED7AA';
      ctx.fillRect(2, -14, 14, 8);
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(6, -8, 6, 4);

      this.drawPixelEyes(ctx, 2, 10, -20, p.eyeState, '#431407');

      if (acc && acc.nightcap) this.drawNightcap(ctx, 6, -26);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 6, -16);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 4. CLASSIC SKIN (Chibi Fighting Bull)
    // ==========================================
    if (isClassic) {
      // Classic Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 4);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-10, 6, -14, -4);
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Tuft
      ctx.beginPath();
      ctx.arc(-14, -4, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#451A03';
      ctx.fill();
      ctx.restore();

      // Hooves (Far)
      ctx.fillStyle = '#451A03';
      ctx.beginPath();
      ctx.roundRect(p.pawBL_x - 3, p.pawBL_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFL_x - 3, p.pawFL_y - 4, 6, 6, 2);
      ctx.fill();

      // Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 3, 17, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#78350F';
      ctx.fill();

      // Warm Tan Belly
      ctx.beginPath();
      ctx.ellipse(3, 4, 11, 8.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE68A';
      ctx.fill();
      ctx.restore();

      // Hooves (Near)
      ctx.fillStyle = '#292524';
      ctx.beginPath();
      ctx.roundRect(p.pawBR_x - 3, p.pawBR_y - 4, 6, 6, 2);
      ctx.roundRect(p.pawFR_x - 3, p.pawFR_y - 4, 6, 6, 2);
      ctx.fill();

      // Head & Horns
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      this.drawCurvedHorn(ctx, -8, -8, -1, '#F59E0B', '#FEF08A');
      this.drawCurvedHorn(ctx, 8, -8, 1, '#F59E0B', '#FEF08A');

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#78350F';
      ctx.fill();

      // Red Bandana Collar
      ctx.beginPath();
      ctx.moveTo(-12, 6); ctx.lineTo(12, 6); ctx.lineTo(0, 13);
      ctx.closePath();
      ctx.fillStyle = '#DC2626';
      ctx.fill();

      // Snout & Gold Ring
      ctx.beginPath();
      ctx.ellipse(0, 5, 9, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE68A';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 8, 3.2, 0, Math.PI * 2);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#451A03');
      this.drawMouth(ctx, 0, 4, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 5. MYTHIC / COOL SKIN (Mecha Titan Bull)
    // ==========================================
    // Plasma Tail Thruster
    ctx.save();
    ctx.translate(-14, p.bodyY + 4);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-10, 6, -14, -4);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Cyber Hooves (Far)
    ctx.fillStyle = '#00F5D4';
    ctx.beginPath();
    ctx.roundRect(p.pawBL_x - 3, p.pawBL_y - 4, 6, 6, 2);
    ctx.roundRect(p.pawFL_x - 3, p.pawFL_y - 4, 6, 6, 2);
    ctx.fill();

    // Mecha Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 3, 17, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Reactor Core Belly Plate
    ctx.beginPath();
    ctx.ellipse(3, 4, 10, 7.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.strokeStyle = '#FF007F';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // Cyber Hooves (Near)
    ctx.fillStyle = '#00F5D4';
    ctx.beginPath();
    ctx.roundRect(p.pawBR_x - 3, p.pawBR_y - 4, 6, 6, 2);
    ctx.roundRect(p.pawFR_x - 3, p.pawFR_y - 4, 6, 6, 2);
    ctx.fill();

    // Head & Blazing Magma Horns
    ctx.save();
    ctx.translate(6, p.headY);
    ctx.rotate(p.headRot);

    this.drawCurvedHorn(ctx, -8, -8, -1, '#00F5D4', '#FF007F');
    this.drawCurvedHorn(ctx, 8, -8, 1, '#00F5D4', '#FF007F');

    // Head Armor
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Snout Plate & Neon Ring
    ctx.beginPath();
    ctx.ellipse(0, 5, 9, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 8, 3.2, 0, Math.PI * 2);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#00F5D4');
    this.drawMouth(ctx, 0, 4, p.mouthState);

    if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  /**
   * Helper to draw sturdy curved bull horns.
   */
  drawCurvedHorn(ctx, x, y, dir, baseColor, tipColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(dir * 12, -4, dir * 14, -14);
    ctx.quadraticCurveTo(dir * 6, -10, 0, -5);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, dir * 14, -14);
    grad.addColorStop(0, baseColor);
    grad.addColorStop(1, tipColor);
    ctx.fillStyle = grad;
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.BullRenderer = BullRenderer;
if (typeof globalThis !== 'undefined') globalThis.BullRenderer = BullRenderer;
if (typeof module !== 'undefined' && module.exports) module.exports = BullRenderer;
