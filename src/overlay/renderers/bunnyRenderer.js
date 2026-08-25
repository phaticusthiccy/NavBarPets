/**
 * @file bunnyRenderer.js
 * @description Mochi Bunny Renderer with multi-skin support:
 * 1. 'cool' (Starlight Moon Cosmic Bunny): Cosmic lavender gradient, galaxy ears with star tips, crescent moon seal, starlight tail.
 * 2. 'classic' (Classic Pure White Mochi Bunny): Soft white mochi body, pastel pink inner floppy ears, rosy cheeks, cotton-ball tail.
 */

const BunnyRenderer = {
  drawBunny(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -30,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 5) * 0.3),
      earTwitchL: pose.earTwitchL || (Math.sin(this.time * 3) * 0.15),
      earTwitchR: pose.earTwitchR || (Math.cos(this.time * 3) * 0.15),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 12,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -10,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0,
      galaxyDark: isClassic ? '#FFFDF9' : isPixel ? '#FFFFFF' : isSakura ? '#FFFDF9' : isEvori ? '#FAF5FF' : '#2E1A47',
      galaxyMid: isClassic ? '#F5EBE6' : isPixel ? '#FEE2E2' : isSakura ? '#FCE7F3' : isEvori ? '#E9D5FF' : '#4D2D73',
      starlightPink: '#FF8FA3',
      innerPink: isSakura ? '#F472B6' : isEvori ? '#C084FC' : '#FFB3C1',
      moonGold: '#FFE66D'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // EVORI CELESTIAL STAR BUNNY (Signature Mascot)
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -4, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.85, false);
      }

      // 2. Soft Starlight Tail with Star Gem
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fillStyle = '#E9D5FF';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, 0, 4, '#FDE047');
      }
      ctx.restore();

      // 3. Back Paws
      this.drawBunnyPaw(ctx, p.pawBL_x, p.pawBL_y, '#E9D5FF');
      this.drawBunnyPaw(ctx, p.pawBR_x, p.pawBR_y, '#E9D5FF');

      // 4. Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 15, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Soft Starlight Belly
      ctx.beginPath();
      ctx.ellipse(2, 4, 9, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.restore();

      // 5. Front Paws
      this.drawBunnyPaw(ctx, p.pawFL_x, p.pawFL_y, '#FAF5FF');
      this.drawBunnyPaw(ctx, p.pawFR_x, p.pawFR_y, '#FAF5FF');

      // 6. Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 4, p.bodyY - 6, Math.sin(this.time * 5) * 0.25 + 0.1, 0.9, false);
      }

      // 7. Head & Floppy Ears
      ctx.save();
      ctx.translate(4, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-6, -10);
      ctx.rotate(p.earTwitchL - 0.1);
      ctx.beginPath();
      ctx.ellipse(0, -12, 4.5, 14, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -22, 3, '#FDE047');
      }
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(6, -10);
      ctx.rotate(p.earTwitchR + 0.1);
      ctx.beginPath();
      ctx.ellipse(0, -12, 4.5, 14, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -22, 3, '#FDE047');
      }
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Floating Celestial Star Gem on Forehead
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -10, 4.5, '#FDE047');
      }

      // Rosy Star Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 3, 0, Math.PI * 2);
      ctx.arc(8, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(192, 132, 252, 0.45)';
      ctx.fill();

      // Pink/Violet Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 2.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#A855F7';
      ctx.fill();
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#581C87');

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA MOCHI BUNNY
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Soft Sakura Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();

      // 2. Back Paws
      this.drawBunnyPaw(ctx, p.pawBL_x, p.pawBL_y, '#FCE7F3');
      this.drawBunnyPaw(ctx, p.pawBR_x, p.pawBR_y, '#FCE7F3');

      // 3. Torso
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 15, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();

      // Soft Pink Mochi Belly
      ctx.beginPath();
      ctx.ellipse(2, 4, 9, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDF2F8';
      ctx.fill();
      ctx.restore();

      // 4. Front Paws
      this.drawBunnyPaw(ctx, p.pawFL_x, p.pawFL_y, '#FCE7F3');
      this.drawBunnyPaw(ctx, p.pawFR_x, p.pawFR_y, '#FCE7F3');

      // 5. Head & Floppy Ears
      ctx.save();
      ctx.translate(4, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-6, -10);
      ctx.rotate(p.earTwitchL - 0.1);
      ctx.beginPath();
      ctx.ellipse(0, -12, 4.5, 14, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(6, -10);
      ctx.rotate(p.earTwitchR + 0.1);
      ctx.beginPath();
      ctx.ellipse(0, -12, 4.5, 14, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();

      // Blooming Sakura Flower Hair Clip
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, -7, -10, 4.5, '#FEF08A', '#FB7185');
      }

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 3, 0, Math.PI * 2);
      ctx.arc(8, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 114, 182, 0.5)';
      ctx.fill();

      // Pink Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 2.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#831843');

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART BUNNY (Morphological)
      // ==========================================
      // 1. Stepped Pixel Tail
      ctx.save();
      ctx.translate(-14, Math.round(p.bodyY + 6));
      ctx.rotate(p.tailAngle);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.fillRect(-6, -2, 12, 4);
      ctx.fillRect(-2, -6, 4, 12);
      ctx.restore();

      // 2. Stepped Back Paws
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawBR_x - 4), Math.round(p.pawBR_y - 4), 8, 4);

      // 3. Blocky Torso
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-13, -8, 26, 18);
      ctx.fillRect(-15, -5, 30, 12);
      // Soft pink belly highlight
      ctx.fillStyle = '#FEE2E2';
      ctx.fillRect(-3, -2, 12, 10);
      ctx.restore();

      // 4. Stepped Front Paws
      ctx.fillStyle = p.galaxyMid;
      ctx.fillRect(Math.round(p.pawFL_x - 3), Math.round(p.pawFL_y - 4), 6, 4);
      ctx.fillRect(Math.round(p.pawFR_x - 3), Math.round(p.pawFR_y - 4), 6, 4);

      // 5. Head & Stepped Floppy Ears
      ctx.save();
      ctx.translate(4, Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-6, -10);
      ctx.rotate(p.earTwitchL - 0.1);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-3, -22, 6, 16);
      ctx.fillRect(-5, -18, 10, 10);
      ctx.fillStyle = p.innerPink;
      ctx.fillRect(-2, -18, 4, 8);
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(6, -10);
      ctx.rotate(p.earTwitchR + 0.1);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-3, -22, 6, 16);
      ctx.fillRect(-5, -18, 10, 10);
      ctx.fillStyle = p.innerPink;
      ctx.fillRect(-2, -18, 4, 8);
      ctx.restore();

      // Head Base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-11, -8, 22, 16);
      ctx.fillRect(-13, -5, 26, 11);

      // Pixel Rosy Cheeks
      ctx.fillStyle = '#FDA4AF';
      ctx.fillRect(-10, 1, 4, 3);
      ctx.fillRect(6, 1, 4, 3);

      // Pixel Eyes & Nose
      this.drawPixelEyes(ctx, -5, 5, -1, p.eyeState, '#1E1B4B');
      ctx.fillStyle = p.innerPink;
      ctx.fillRect(-1, 2, 2, 2);
      this.drawPixelMouth(ctx, 0, 4, p.mouthState);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Tail
    ctx.save();
    ctx.translate(-14, p.bodyY + 6);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    if (!isClassic) {
      ctx.shadowColor = p.starlightPink;
      ctx.shadowBlur = 14;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 2. Back Paws
    this.drawBunnyPaw(ctx, p.pawBL_x, p.pawBL_y, p.galaxyDark);
    this.drawBunnyPaw(ctx, p.pawBR_x, p.pawBR_y, p.galaxyDark);

    // 3. Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 4, 15, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (!isClassic) {
      // Sparkle Belly (Cool only)
      ctx.beginPath();
      ctx.ellipse(2, 4, 9, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.starlightPink;
      ctx.shadowColor = p.starlightPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 4. Front Paws
    this.drawBunnyPaw(ctx, p.pawFL_x, p.pawFL_y, p.galaxyMid);
    this.drawBunnyPaw(ctx, p.pawFR_x, p.pawFR_y, p.galaxyMid);

    // 5. Head & Floppy Ears
    ctx.save();
    ctx.translate(4, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-6, -10);
    ctx.rotate(p.earTwitchL - 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Classic Pink Inner Ear
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
    } else {
      // Star Tip
      ctx.beginPath();
      ctx.arc(0, -22, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(6, -10);
    ctx.rotate(p.earTwitchR + 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, 0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Classic Pink Inner Ear
      ctx.beginPath();
      ctx.ellipse(0, -12, 2.5, 10, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
    } else {
      // Star Tip
      ctx.beginPath();
      ctx.arc(0, -22, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.galaxyDark;
    ctx.fill();

    if (isClassic) {
      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 3, 0, Math.PI * 2);
      ctx.arc(8, 3, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 143, 163, 0.5)';
      ctx.fill();

      // Pink Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 2.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = p.innerPink;
      ctx.fill();
      this.drawMouth(ctx, 0, 4, p.mouthState);

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#1A1A2E');
    } else {
      // Crescent Moon Forehead Seal
      ctx.beginPath();
      ctx.arc(0, -5, 3.5, 0.5, Math.PI * 1.5);
      ctx.fillStyle = p.moonGold;
      ctx.shadowColor = p.moonGold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, p.moonGold);

      // Mouth
      this.drawMouth(ctx, 0, 4, p.mouthState);
    }

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawBunnyPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.BunnyRenderer = BunnyRenderer;
if (typeof globalThis !== 'undefined') globalThis.BunnyRenderer = BunnyRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BunnyRenderer;
}
