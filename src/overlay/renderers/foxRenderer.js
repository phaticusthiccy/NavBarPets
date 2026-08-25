/**
 * @file foxRenderer.js
 * @description Kitsune Fox Renderer with multi-skin support:
 * 1. 'cool' (Nine-Tailed Celestial Kitsune): 3 flowing spirit tails with violet plasma tips, Magatama seal, orbiting will-o'-the-wisp.
 * 2. 'classic' (Classic Red Kitsune Fox): Vivid orange body, single bushy white-tipped flame tail, dark sock paws, fluffy white bib.
 */

const FoxRenderer = {
  drawFox(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.35),
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      foxFlame: isClassic ? '#F97316' : isPixel ? '#EA580C' : isSakura ? '#FFFDF9' : isEvori ? '#F3E8FF' : '#FF5400',
      spiritViolet: '#9D4EDD',
      spiritGlow: isClassic ? '#FFBEA6' : isPixel ? '#F472B6' : isSakura ? '#F472B6' : isEvori ? '#C084FC' : '#C77DFF',
      chestWhite: '#FFFDF9',
      gold: '#FFD166'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // CELESTIAL DREAMWINGS KITSUNE
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -6, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.9, false);
      }

      // 2. Flowing Celestial Dream Tails (2 tails with star tips)
      for (let t = -1; t <= 1; t += 2) {
        ctx.save();
        ctx.translate(-14, p.bodyY + 4);
        ctx.rotate(p.tailAngle + t * 0.28);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
        ctx.closePath();
        ctx.fillStyle = '#E9D5FF';
        ctx.shadowColor = '#C084FC';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Twinkling Star Tip
        if (this.drawDreamwingStar) {
          this.drawDreamwingStar(ctx, -18, -34, 4.5, '#FDE047');
        }
        ctx.restore();
      }

      // 3. Far Paws
      this.drawFoxPaw(ctx, p.pawBL_x, p.pawBL_y, '#E9D5FF', '#C084FC', 0.88);
      this.drawFoxPaw(ctx, p.pawFL_x, p.pawFL_y, '#E9D5FF', '#C084FC', 0.88);

      // 4. Torso & Soft Starlight Bib
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Chest Bib
      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.bezierCurveTo(16, 2, 12, 12, 6, 14);
      ctx.bezierCurveTo(2, 10, 4, -2, 8, -4);
      ctx.closePath();
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();
      ctx.restore();

      // 5. Near Paws
      this.drawFoxPaw(ctx, p.pawBR_x, p.pawBR_y, '#F3E8FF', '#C084FC', 1.0);
      this.drawFoxPaw(ctx, p.pawFR_x, p.pawFR_y, '#F3E8FF', '#C084FC', 1.0);

      // 6. Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 4, p.bodyY - 6, Math.sin(this.time * 5) * 0.25 + 0.1, 0.95, false);
      }

      // 7. Head & Ears
      ctx.save();
      ctx.translate(8, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(p.earTwitchL - 0.2);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(-4, -18); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(-3, -12); ctx.lineTo(3, 1);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(p.earTwitchR + 0.2);
      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(4, -18); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, 1); ctx.lineTo(3, -12); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Cheek Fluff
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.bezierCurveTo(-14, 8, -4, 11, 0, 10);
      ctx.bezierCurveTo(4, 11, 14, 8, 15, 0);
      ctx.bezierCurveTo(9, 4, -9, 4, -15, 0);
      ctx.closePath();
      ctx.fillStyle = '#E9D5FF';
      ctx.fill();

      // Floating Celestial Star Halo above Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Forehead Star Gem
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -6, 3.5, '#FDE047');
      }

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#581C87');

      // Muzzle & Mouth
      ctx.beginPath();
      ctx.arc(0, 3, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#A855F7';
      ctx.fill();
      this.drawMouth(ctx, 0, 5, p.mouthState);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & INARI SAKURA KITSUNE
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Flowing Sacred Sakura Tails (2 tails)
      for (let t = -1; t <= 1; t += 2) {
        ctx.save();
        ctx.translate(-14, p.bodyY + 4);
        ctx.rotate(p.tailAngle + t * 0.25);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
        ctx.closePath();
        ctx.fillStyle = '#FFFDF9';
        ctx.fill();

        // Pink cherry blossom tip
        ctx.beginPath();
        ctx.moveTo(-16, -26);
        ctx.bezierCurveTo(-26, -34, -22, -38, -20, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, -4, -24);
        ctx.closePath();
        ctx.fillStyle = '#F472B6';
        ctx.fill();
        ctx.restore();
      }

      // 2. Far Paws
      this.drawFoxPaw(ctx, p.pawBL_x, p.pawBL_y, '#FFFDF9', '#FB7185', 0.88);
      this.drawFoxPaw(ctx, p.pawFL_x, p.pawFL_y, '#FFFDF9', '#FB7185', 0.88);

      // 3. Torso & Soft Pink Bib
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();

      // Chest Bib
      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.bezierCurveTo(16, 2, 12, 12, 6, 14);
      ctx.bezierCurveTo(2, 10, 4, -2, 8, -4);
      ctx.closePath();
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();
      ctx.restore();

      // 4. Near Paws
      this.drawFoxPaw(ctx, p.pawBR_x, p.pawBR_y, '#FFFDF9', '#FB7185', 1.0);
      this.drawFoxPaw(ctx, p.pawFR_x, p.pawFR_y, '#FFFDF9', '#FB7185', 1.0);

      // 5. Head & Ears
      ctx.save();
      ctx.translate(8, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(p.earTwitchL - 0.2);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(-4, -18); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(-3, -12); ctx.lineTo(3, 1);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(p.earTwitchR + 0.2);
      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(4, -18); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, 1); ctx.lineTo(3, -12); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();

      // Cheek Fluff
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.bezierCurveTo(-14, 8, -4, 11, 0, 10);
      ctx.bezierCurveTo(4, 11, 14, 8, 15, 0);
      ctx.bezierCurveTo(9, 4, -9, 4, -15, 0);
      ctx.closePath();
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Inari Forehead Mark & Sakura Flower
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, 0, -6, 3.5, '#FEF08A', '#F472B6');
      }

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#BE185D');

      // Muzzle & Mouth
      ctx.beginPath();
      ctx.arc(0, 3, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      this.drawMouth(ctx, 0, 5, p.mouthState);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART KITSUNE (Morphological)
      // ==========================================
      // 1. Stepped Bushy Pixel Flame Tail
      ctx.save();
      ctx.translate(-14, Math.round(p.bodyY + 4));
      ctx.rotate(p.tailAngle - 0.2);
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(-2, -2, 5, 5);
      ctx.fillRect(-6, -6, 6, 6);
      ctx.fillRect(-12, -12, 8, 8);
      ctx.fillRect(-18, -20, 10, 10);
      ctx.fillRect(-14, -28, 8, 10);
      // Pixel flame white tip
      ctx.fillStyle = p.chestWhite;
      ctx.fillRect(-10, -34, 6, 7);
      ctx.fillRect(-6, -30, 4, 4);
      ctx.restore();

      // 2. Stepped Back Paws
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(Math.round(p.pawBL_x - 3), Math.round(p.pawBL_y - 6), 6, 4);
      ctx.fillRect(Math.round(p.pawBR_x - 3), Math.round(p.pawBR_y - 6), 6, 4);
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 3), 8, 3);
      ctx.fillRect(Math.round(p.pawBR_x - 4), Math.round(p.pawBR_y - 3), 8, 3);

      // 3. Blocky Torso & White Bib
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(-14, -9, 28, 18);
      ctx.fillRect(-16, -6, 32, 12);
      // Chest bib
      ctx.fillStyle = p.chestWhite;
      ctx.fillRect(0, -5, 14, 12);
      ctx.fillRect(4, -7, 8, 16);
      ctx.restore();

      // 4. Stepped Front Paws
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(Math.round(p.pawFL_x - 3), Math.round(p.pawFL_y - 6), 6, 4);
      ctx.fillRect(Math.round(p.pawFR_x - 3), Math.round(p.pawFR_y - 6), 6, 4);
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 3), 8, 3);
      ctx.fillRect(Math.round(p.pawFR_x - 4), Math.round(p.pawFR_y - 3), 8, 3);

      // 5. Head
      ctx.save();
      ctx.translate(8, Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Stepped Fox Ears
      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(p.earTwitchL - 0.15);
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(-6, 2, 8, 4);
      ctx.fillRect(-4, -4, 6, 6);
      ctx.fillRect(-2, -10, 4, 6);
      ctx.fillRect(0, -15, 2, 5);
      ctx.fillStyle = p.spiritGlow;
      ctx.fillRect(-2, -4, 3, 5);
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(p.earTwitchR + 0.15);
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(-2, 2, 8, 4);
      ctx.fillRect(-2, -4, 6, 6);
      ctx.fillRect(-2, -10, 4, 6);
      ctx.fillRect(-2, -15, 2, 5);
      ctx.fillStyle = p.spiritGlow;
      ctx.fillRect(-1, -4, 3, 5);
      ctx.restore();

      // Head Base
      ctx.fillStyle = p.foxFlame;
      ctx.fillRect(-12, -8, 24, 16);
      ctx.fillRect(-14, -5, 28, 11);

      // Cheek fluff
      ctx.fillStyle = p.chestWhite;
      ctx.fillRect(-14, 0, 6, 6);
      ctx.fillRect(8, 0, 6, 6);
      ctx.fillRect(-6, 2, 12, 6);

      // Pixel Eyes & Nose
      this.drawPixelEyes(ctx, -5, 5, -1, p.eyeState, '#43281C');
      ctx.fillStyle = '#1C1917';
      ctx.fillRect(-2, 3, 4, 2);
      this.drawPixelMouth(ctx, 0, 5, p.mouthState);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isClassic) {
      // 1. Classic Single Bushy Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 4);
      ctx.rotate(p.tailAngle - 0.2);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
      ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
      ctx.bezierCurveTo(4, -8, 2, -2, 0, 0);
      ctx.closePath();
      ctx.fillStyle = p.foxFlame;
      ctx.fill();

      // White flame tail tip
      ctx.beginPath();
      ctx.moveTo(-16, -26);
      ctx.bezierCurveTo(-26, -34, -22, -38, -20, -36);
      ctx.bezierCurveTo(-12, -44, -2, -30, -4, -24);
      ctx.closePath();
      ctx.fillStyle = p.chestWhite;
      ctx.fill();
      ctx.restore();
    } else {
      // 1. Three Flowing Kitsune Spirit Tails
      for (let t = -1; t <= 1; t++) {
        ctx.save();
        ctx.translate(-14, p.bodyY + 4);
        ctx.rotate(p.tailAngle + t * 0.35);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
        ctx.closePath();
        ctx.fillStyle = p.foxFlame;
        ctx.fill();

        // Spirit Plasma Tip
        ctx.beginPath();
        ctx.moveTo(-16, -26);
        ctx.bezierCurveTo(-26, -34, -22, -38, -20, -36);
        ctx.bezierCurveTo(-12, -44, -2, -30, -4, -24);
        ctx.closePath();
        ctx.fillStyle = p.spiritGlow;
        ctx.shadowColor = p.spiritViolet;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Orbiting Spirit Flame Will-o'-the-Wisp
      const wispAngle = this.time * 2.2;
      const wispX = Math.cos(wispAngle) * 22;
      const wispY = p.bodyY - 14 + Math.sin(wispAngle * 1.6) * 6;
      ctx.beginPath();
      ctx.arc(wispX, wispY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 2. Far Paws (Behind Torso: Back-Left & Front-Left)
    this.drawFoxPaw(ctx, p.pawBL_x, p.pawBL_y, p.foxFlame, '#1E1E2E', 0.88);
    this.drawFoxPaw(ctx, p.pawFL_x, p.pawFL_y, p.foxFlame, '#1E1E2E', 0.88);

    // 3. Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.foxFlame;
    ctx.fill();

    // Chest Bib
    ctx.beginPath();
    ctx.moveTo(8, -4);
    ctx.bezierCurveTo(16, 2, 12, 12, 6, 14);
    ctx.bezierCurveTo(2, 10, 4, -2, 8, -4);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();
    ctx.restore();

    // 4. Near Paws (In Front of Torso: Back-Right & Front-Right)
    this.drawFoxPaw(ctx, p.pawBR_x, p.pawBR_y, p.foxFlame, '#1E1E2E', 1.0);
    this.drawFoxPaw(ctx, p.pawFR_x, p.pawFR_y, p.foxFlame, '#1E1E2E', 1.0);

    // 5. Head
    ctx.save();
    ctx.translate(8, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(p.earTwitchL - 0.2);
    ctx.beginPath();
    ctx.moveTo(-6, 4); ctx.lineTo(-4, -18); ctx.lineTo(5, 2);
    ctx.closePath();
    ctx.fillStyle = p.foxFlame;
    ctx.fill();
    // Inner
    ctx.beginPath();
    ctx.moveTo(-4, 2); ctx.lineTo(-3, -12); ctx.lineTo(3, 1);
    ctx.closePath();
    ctx.fillStyle = p.spiritGlow;
    if (!isClassic) {
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(7, -8);
    ctx.rotate(p.earTwitchR + 0.2);
    ctx.beginPath();
    ctx.moveTo(-5, 2); ctx.lineTo(4, -18); ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fillStyle = p.foxFlame;
    ctx.fill();
    // Inner
    ctx.beginPath();
    ctx.moveTo(-3, 1); ctx.lineTo(3, -12); ctx.lineTo(4, 2);
    ctx.closePath();
    ctx.fillStyle = p.spiritGlow;
    if (!isClassic) {
      ctx.shadowColor = p.spiritGlow;
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.foxFlame;
    ctx.fill();

    // White Cheek Fluff
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.bezierCurveTo(-14, 8, -4, 11, 0, 10);
    ctx.bezierCurveTo(4, 11, 14, 8, 15, 0);
    ctx.bezierCurveTo(9, 4, -9, 4, -15, 0);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();

    if (!isClassic) {
      // Celestial Forehead Magatama Mark
      ctx.beginPath();
      ctx.arc(0, -6, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.shadowColor = p.gold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState, isClassic ? '#43281C' : p.spiritGlow);

    // Muzzle & Mouth
    ctx.beginPath();
    ctx.arc(0, 3, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E2E';
    ctx.fill();
    this.drawMouth(ctx, 0, 5, p.mouthState);

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawFoxPaw(ctx, x, y, coatColor, sockColor, legScale = 1.0) {
    ctx.save();
    // Fox upper leg connection
    ctx.beginPath();
    ctx.moveTo(x - 3 * legScale, y - 7);
    ctx.lineTo(x + 3 * legScale, y - 7);
    ctx.lineTo(x + 3.5 * legScale, y - 2);
    ctx.lineTo(x - 3.5 * legScale, y - 2);
    ctx.closePath();
    ctx.fillStyle = coatColor;
    ctx.fill();

    // Fox black sock paw
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4.8 * legScale, 3.6 * legScale, 0, 0, Math.PI * 2);
    ctx.fillStyle = sockColor;
    ctx.fill();

    // Soft white toe highlight
    ctx.beginPath();
    ctx.arc(x + 1.8 * legScale, y - 1, 1.5 * legScale, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 253, 249, 0.85)';
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.FoxRenderer = FoxRenderer;
if (typeof globalThis !== 'undefined') globalThis.FoxRenderer = FoxRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FoxRenderer;
}
