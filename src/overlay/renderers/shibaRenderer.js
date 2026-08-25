/**
 * @file shibaRenderer.js
 * @description Shiba Inu Renderer with multi-skin support:
 * 1. 'cool' (Solar Flare Shiba): Deep flame amber, solar eyebrow markings, glowing flame curl tail, flowing hero bandana.
 * 2. 'classic' (Classic Japanese Shiba Inu): Warm golden fur, curled tail with fluffy white tip, classic white eyebrow dots, red neck bandana.
 */

const ShibaRenderer = {
  drawShiba(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailWag: pose.tailWag || (Math.sin(this.time * 6) * 0.4),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'blep',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      goldAmber: isClassic ? '#E08E45' : isPixel ? '#F59E0B' : isSakura ? '#FCE7F3' : isEvori ? '#FEF08A' : '#FF7900',
      deepFlame: isClassic ? '#C87834' : isPixel ? '#D97706' : isSakura ? '#F472B6' : isEvori ? '#F59E0B' : '#FF3800',
      white: '#FFFDF5',
      dark: '#2A1810',
      solarGlow: '#FFE600'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // SOLARI SUN-PUP CELESTIAL DREAMWINGS SHIBA
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -4, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.9, false);
      }

      // 2. Curled Tail with Twinkling Star Tip
      ctx.save();
      ctx.translate(-14, p.bodyY - 2);
      ctx.rotate(p.tailWag);
      ctx.beginPath();
      ctx.arc(0, -8, 10, 0.4, Math.PI * 1.6);
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#FEF08A';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Twinkling Star Tip
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 6, -14, 4.5, '#FDE047');
      }
      ctx.restore();

      // 3. Far Paws
      this.drawShibaPaw(ctx, p.pawBL_x, p.pawBL_y, '#FEF08A');
      this.drawShibaPaw(ctx, p.pawFL_x, p.pawFL_y, '#FEF08A');

      // 4. Torso & White Bib
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 17, 12.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();

      // White Chest Urajiro Bib
      ctx.beginPath();
      ctx.ellipse(4, 5, 11, 8.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();
      ctx.restore();

      // 5. Near Paws
      this.drawShibaPaw(ctx, p.pawBR_x, p.pawBR_y, '#FEF08A');
      this.drawShibaPaw(ctx, p.pawFR_x, p.pawFR_y, '#FEF08A');

      // 6. Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 4, p.bodyY - 6, Math.sin(this.time * 5) * 0.25 + 0.1, 0.95, false);
      }

      // 7. Head & Ears
      ctx.save();
      ctx.translate(0, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-9, -10);
      ctx.beginPath();
      ctx.moveTo(-6, 5); ctx.lineTo(-1, -12); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 3); ctx.lineTo(-1, -8); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(9, -10);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(1, -12); ctx.lineTo(6, 5);
      ctx.closePath();
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(1, -8); ctx.lineTo(4, 3);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();

      // White Cheek Fluff (Urajiro)
      ctx.beginPath();
      ctx.ellipse(-8, 3, 6, 5, -0.2, 0, Math.PI * 2);
      ctx.ellipse(8, 3, 6, 5, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();

      // Floating Sun-Star Halo
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Celestial Bandana with Star Gem
      ctx.beginPath();
      ctx.moveTo(-11, 7); ctx.lineTo(11, 7); ctx.lineTo(0, 15);
      ctx.closePath();
      ctx.fillStyle = '#A855F7';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, 11, 3.2, '#FDE047');
      }

      // Eyes & Muzzle
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#7E22CE');

      // Petite Cute Nose & Soft Mouth
      ctx.beginPath();
      ctx.ellipse(0, 2.8, 1.6, 1.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#7E22CE';
      ctx.fill();
      this.drawMouth(ctx, 0, 4.4, p.mouthState, '#7E22CE');

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA SHIBA (Morphological)
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Curled Sakura Tail with Pink Blossom Tip
      ctx.save();
      ctx.translate(-14, p.bodyY - 2);
      ctx.rotate(p.tailWag);
      ctx.beginPath();
      ctx.arc(0, -8, 10, 0.4, Math.PI * 1.6);
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#FCE7F3';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Pink tip
      ctx.beginPath();
      ctx.arc(6, -14, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // 2. Far Paws
      this.drawShibaPaw(ctx, p.pawBL_x, p.pawBL_y, '#FCE7F3');
      this.drawShibaPaw(ctx, p.pawFL_x, p.pawFL_y, '#FCE7F3');

      // 3. Torso & Soft White Bib
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 17, 12.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // White Chest Urajiro Bib
      ctx.beginPath();
      ctx.ellipse(4, 5, 11, 8.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();
      ctx.restore();

      // 4. Near Paws
      this.drawShibaPaw(ctx, p.pawBR_x, p.pawBR_y, '#FCE7F3');
      this.drawShibaPaw(ctx, p.pawFR_x, p.pawFR_y, '#FCE7F3');

      // 5. Head
      ctx.save();
      ctx.translate(0, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-9, -10);
      ctx.beginPath();
      ctx.moveTo(-6, 5); ctx.lineTo(-1, -12); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 3); ctx.lineTo(-1, -8); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(9, -10);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(1, -12); ctx.lineTo(6, 5);
      ctx.closePath();
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(1, -8); ctx.lineTo(4, 3);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // White Cheek Fluff (Urajiro)
      ctx.beginPath();
      ctx.ellipse(-8, 3, 6, 5, -0.2, 0, Math.PI * 2);
      ctx.ellipse(8, 3, 6, 5, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();

      // Sakura Bandana
      ctx.beginPath();
      ctx.moveTo(-11, 7); ctx.lineTo(11, 7); ctx.lineTo(0, 15);
      ctx.closePath();
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      // Little white blossom center on bandana
      ctx.beginPath();
      ctx.arc(0, 10, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();

      // Sakura Blossom Forehead Mark
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, 0, -6, 3.5, '#FEF08A', '#F472B6');
      }

      // Eyes & Muzzle
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#831843');

      // Petite Cute Nose & Soft Mouth
      ctx.beginPath();
      ctx.ellipse(0, 2.8, 1.6, 1.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#831843';
      ctx.fill();
      this.drawMouth(ctx, 0, 4.4, p.mouthState, '#831843');

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART SHIBA (Morphological)
      // ==========================================
      // 1. Stepped Pixel Tail
      ctx.save();
      ctx.translate(-14, Math.round(p.bodyY - 2));
      ctx.rotate(p.tailWag);
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(-2, -2, 5, 5);
      ctx.fillRect(-6, -6, 6, 6);
      ctx.fillRect(-10, -12, 6, 6);
      ctx.fillRect(-8, -17, 6, 6);
      ctx.fillStyle = p.white;
      ctx.fillRect(-4, -19, 5, 5);
      ctx.restore();

      // 2. Stepped Back Paws
      ctx.fillStyle = p.deepFlame;
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawBR_x - 4), Math.round(p.pawBR_y - 4), 8, 4);

      // 3. Blocky Body
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(-16, -11, 33, 22);
      ctx.fillRect(-18, -8, 37, 16);
      // White chest patch
      ctx.fillStyle = p.white;
      ctx.fillRect(-2, -4, 18, 14);
      ctx.fillRect(0, -6, 14, 18);
      ctx.restore();

      // 4. Stepped Front Paws
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawFR_x - 4), Math.round(p.pawFR_y - 4), 8, 4);
      ctx.fillStyle = p.white;
      ctx.fillRect(Math.round(p.pawFL_x - 2), Math.round(p.pawFL_y - 2), 4, 2);
      ctx.fillRect(Math.round(p.pawFR_x - 2), Math.round(p.pawFR_y - 2), 4, 2);

      // 5. Head
      ctx.save();
      ctx.translate(7, Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Stepped Ears
      // Left ear
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(-12, -4, 6, 6);
      ctx.fillRect(-9, -10, 5, 6);
      ctx.fillRect(-6, -16, 4, 6);
      ctx.fillStyle = p.white;
      ctx.fillRect(-8, -8, 3, 5);

      // Right ear
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(4, -4, 6, 6);
      ctx.fillRect(4, -10, 5, 6);
      ctx.fillRect(4, -16, 4, 6);
      ctx.fillStyle = p.white;
      ctx.fillRect(5, -8, 3, 5);

      // Head Base
      ctx.fillStyle = p.goldAmber;
      ctx.fillRect(-14, -10, 28, 20);
      ctx.fillRect(-16, -7, 32, 14);

      // White Cheek Fluff
      ctx.fillStyle = p.white;
      ctx.fillRect(-14, 0, 8, 8);
      ctx.fillRect(6, 0, 8, 8);
      ctx.fillRect(-6, 2, 12, 7);

      // Square Eyebrow Dots
      ctx.fillStyle = p.white;
      ctx.fillRect(-6, -6, 3, 3);
      ctx.fillRect(4, -6, 3, 3);

      // 8-bit Red Bandana
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(-10, 9, 20, 3);
      ctx.fillRect(-6, 12, 12, 3);
      ctx.fillRect(-2, 15, 4, 3);
      ctx.fillStyle = p.white;
      ctx.fillRect(-1, 11, 2, 2);

      // Pixel Eyes & Nose
      this.drawPixelEyes(ctx, -5, 5, -1, p.eyeState, '#1C1917');
      ctx.fillStyle = '#1C1917';
      ctx.fillRect(-2, 3, 4, 3);

      // Pixel Mouth / Blep
      this.drawPixelMouth(ctx, 0, 6, p.mouthState);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Curled Tail
    ctx.save();
    ctx.translate(-14, p.bodyY - 2);
    ctx.rotate(p.tailWag);
    ctx.beginPath();
    ctx.arc(-4, -8, 10, 0.4, Math.PI * 1.7);
    ctx.lineWidth = 8.5;
    ctx.strokeStyle = p.goldAmber;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (isClassic) {
      // Classic Fluffy white tip
      ctx.beginPath();
      ctx.arc(-8, -14, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();
    } else {
      // Solar flame burst at tail apex
      ctx.beginPath();
      ctx.arc(-8, -14, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.deepFlame;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 2. Back Paws
    this.drawShibaPaw(ctx, p.pawBL_x, p.pawBL_y, p.deepFlame, isClassic);
    this.drawShibaPaw(ctx, p.pawBR_x, p.pawBR_y, p.deepFlame, isClassic);

    // 3. Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 19, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.goldAmber;
    ctx.fill();

    // White Chest & Belly
    ctx.beginPath();
    ctx.ellipse(4, 2, 12, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    if (!isClassic) {
      // Solar core mark
      ctx.beginPath();
      ctx.arc(6, 1, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 4. Front Paws
    this.drawShibaPaw(ctx, p.pawFL_x, p.pawFL_y, p.goldAmber, isClassic);
    this.drawShibaPaw(ctx, p.pawFR_x, p.pawFR_y, p.goldAmber, isClassic);

    // 5. Head
    ctx.save();
    ctx.translate(7, p.headY);
    ctx.rotate(p.headRot);

    // Triangle Ears
    // Left ear
    ctx.beginPath();
    ctx.moveTo(-12, -4); ctx.lineTo(-7, -19); ctx.lineTo(-1, -6);
    ctx.closePath();
    ctx.fillStyle = p.goldAmber;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -4); ctx.lineTo(-7, -15); ctx.lineTo(-2, -6);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.moveTo(1, -6); ctx.lineTo(7, -19); ctx.lineTo(12, -4);
    ctx.closePath();
    ctx.fillStyle = p.goldAmber;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, -6); ctx.lineTo(7, -15); ctx.lineTo(10, -4);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.goldAmber;
    ctx.fill();

    // White Cheek Fluff
    ctx.beginPath();
    ctx.ellipse(-7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(0, 5, 9, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    if (isClassic) {
      // White Eyebrow Dots
      ctx.beginPath();
      ctx.arc(-6, -6, 2.5, 0, Math.PI * 2);
      ctx.arc(6, -6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.white;
      ctx.fill();

      // Classic Bandana
      ctx.beginPath();
      ctx.moveTo(-10, 12); ctx.lineTo(10, 12); ctx.lineTo(0, 20);
      ctx.closePath();
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 15, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF';
      ctx.fill();
    } else {
      // Solar Eyebrows
      ctx.beginPath();
      ctx.arc(-6, -6, 2.8, 0, Math.PI * 2);
      ctx.arc(6, -6, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Flowing Hero Bandana
      ctx.beginPath();
      ctx.moveTo(-12, 11);
      ctx.lineTo(12, 11);
      ctx.lineTo(0, 22 + Math.sin(this.time * 6) * 2);
      ctx.closePath();
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 16, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.solarGlow;
      ctx.shadowColor = p.solarGlow;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState);

    // Petite Cute Nose
    ctx.beginPath();
    ctx.ellipse(0, 3, 1.8, 1.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.dark;
    ctx.fill();

    // Soft Cute Mouth / Blep
    this.drawMouth(ctx, 0, 4.8, p.mouthState, p.dark);

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawShibaPaw(ctx, x, y, color, isClassic) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (!isClassic) {
      ctx.beginPath();
      ctx.arc(x, y - 1, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD166';
      ctx.fill();
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.ShibaRenderer = ShibaRenderer;
if (typeof globalThis !== 'undefined') globalThis.ShibaRenderer = ShibaRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShibaRenderer;
}
