/**
 * @file dragonRenderer.js
 * @description Mini Dragon Renderer with multi-skin support:
 * 1. 'cool' (Mythical Obsidian Ember Wyvern): Obsidian coat, plasma wyvern wings, blazing flame blade tail, magma plates, gold crown horns.
 * 2. 'classic' (Classic Crimson Chibi Dragon): Ruby red body, golden yellow belly plates, bat wings, spade arrow tail.
 */

const DragonRenderer = {
  drawMiniDragon(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -18,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap !== undefined ? pose.wingFlap : (Math.sin(this.time * 1.5) * 0.08),
      tailAngle: pose.tailAngle || (Math.sin(this.time * 2.5) * 0.25),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      color: isClassic ? '#E63946' : isPixel ? '#DC2626' : isSakura ? '#FCE7F3' : isEvori ? '#F3E8FF' : '#2A0845',
      accentColor: isClassic ? '#C1121F' : isPixel ? '#991B1B' : isSakura ? '#F472B6' : isEvori ? '#C084FC' : '#6B11A1',
      bellyColor: isClassic ? '#FFD166' : isPixel ? '#F59E0B' : isSakura ? '#FFFDF5' : isEvori ? '#FEF08A' : '#FF2A6D',
      bellyGlow: isClassic ? '#FFE66D' : '#FF6B8B',
      hornColor: isSakura ? '#F472B6' : isEvori ? '#FDE047' : '#FFD166',
      hornTip: isSakura ? '#FEF08A' : isEvori ? '#FFFFFF' : '#FFE66D',
      wingCore: isClassic ? '#FDF0D5' : isSakura ? '#FDF2F8' : isEvori ? '#E9D5FF' : '#05D5FA',
      wingEdge: isClassic ? '#9B1D20' : isSakura ? '#FB7185' : isEvori ? '#C084FC' : '#7928CA',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0,
      squishX: pose.squishX || 1.0,
      squishY: pose.squishY || 1.0
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // TERRARI ASTRAL DREAMWINGS WYVERN
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -8, p.bodyY - 6, -0.25 + p.wingFlap * 1.5, 1.15, false);
      }

      // 2. Dragon Tail with Twinkling Starlight Crystal Tip
      ctx.save();
      ctx.translate(-14, p.bodyY + 5);
      ctx.rotate(p.tailAngle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -2, -22, -12, -26, -18);
      ctx.strokeStyle = '#E9D5FF';
      ctx.lineWidth = 6.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Twinkling Star Tip
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -26, -18, 6.5, '#FDE047');
      }
      ctx.restore();

      // 3. Back Paws
      this.drawDragonClawPaw(ctx, p.pawBL_x, p.pawBL_y, '#F3E8FF', '#FDE047');
      this.drawDragonClawPaw(ctx, p.pawBR_x, p.pawBR_y, '#F3E8FF', '#FDE047');

      // 4. Dragon Torso & Golden Starlight Belly Plates
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.scale(p.squishX, p.squishY);

      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Belly Plates
      ctx.beginPath();
      ctx.ellipse(4, 2, 11, 10, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF08A';
      ctx.fill();

      ctx.strokeStyle = '#C084FC';
      ctx.lineWidth = 1.2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(4, 2 + i * 5, 8, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Front Paws
      this.drawDragonClawPaw(ctx, p.pawFL_x, p.pawFL_y, '#F3E8FF', '#FDE047');
      this.drawDragonClawPaw(ctx, p.pawFR_x, p.pawFR_y, '#F3E8FF', '#FDE047');

      // 6. Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 4, p.bodyY - 4, 0.2 + p.wingFlap * 1.5, 1.25, false);
      }

      // 7. Head & Starlight Horns
      ctx.save();
      ctx.translate(p.headX + 6, p.headY);
      ctx.rotate(p.headRot);

      this.drawDragonHorn(ctx, -8, -10, -0.4, '#FDE047', '#FFFFFF');
      this.drawDragonHorn(ctx, 4, -12, 0.1, '#FDE047', '#FFFFFF');

      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Cheek Frills
      ctx.beginPath();
      ctx.moveTo(-14, 0); ctx.lineTo(-20, -5); ctx.lineTo(-17, 3); ctx.lineTo(-22, 6); ctx.lineTo(-14, 5);
      ctx.fillStyle = '#C084FC';
      ctx.fill();

      // Floating Forehead Star Gem
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -6, 3.8, '#FDE047');
      }

      // Eyes & Nostrils
      this.drawEyes(ctx, -4, 5, -1, p.eyeState, '#581C87');
      ctx.beginPath();
      ctx.arc(8, 2, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();

      this.drawMouth(ctx, 0, 5, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, -2, -14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA DRAGON (Morphological)
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Blossom Wing
      ctx.save();
      ctx.translate(-6, p.bodyY - 6);
      ctx.rotate(-0.35 + p.wingFlap * 0.9);
      this.drawDragonWing(ctx, -1, '#FB7185', '#FDF2F8', '#FEF08A', true);
      ctx.restore();

      // 2. Dragon Tail with Blooming Sakura Flower Tip
      ctx.save();
      ctx.translate(-14, p.bodyY + 5);
      ctx.rotate(p.tailAngle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -2, -22, -12, -26, -18);
      ctx.strokeStyle = '#FCE7F3';
      ctx.lineWidth = 6.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Blooming Sakura Flower Tip
      if (this.drawSakuraFlower) {
        ctx.save();
        ctx.translate(-26, -18);
        ctx.rotate(-0.4);
        this.drawSakuraFlower(ctx, 0, 0, 6.5, '#FEF08A', '#FB7185');
        ctx.restore();
      }
      ctx.restore();

      // 3. Back Paws
      this.drawDragonClawPaw(ctx, p.pawBL_x, p.pawBL_y, '#FCE7F3', '#FEF08A');
      this.drawDragonClawPaw(ctx, p.pawBR_x, p.pawBR_y, '#FCE7F3', '#FEF08A');

      // 4. Dragon Torso & Soft Belly Plates
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.scale(p.squishX, p.squishY);

      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Belly Plates
      ctx.beginPath();
      ctx.ellipse(4, 2, 11, 10, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF5';
      ctx.fill();

      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 1.2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(4, 2 + i * 5, 8, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Front Paws
      this.drawDragonClawPaw(ctx, p.pawFL_x, p.pawFL_y, '#FCE7F3', '#FEF08A');
      this.drawDragonClawPaw(ctx, p.pawFR_x, p.pawFR_y, '#FCE7F3', '#FEF08A');

      // 6. Front Blossom Wing
      ctx.save();
      ctx.translate(2, p.bodyY - 4);
      ctx.rotate(0.2 + p.wingFlap);
      this.drawDragonWing(ctx, 1, '#FB7185', '#FDF2F8', '#FEF08A', true);
      ctx.restore();

      // 7. Head & Sakura Jade Horns
      ctx.save();
      ctx.translate(p.headX + 6, p.headY);
      ctx.rotate(p.headRot);

      this.drawDragonHorn(ctx, -8, -10, -0.4, '#F472B6', '#FEF08A');
      this.drawDragonHorn(ctx, 4, -12, 0.1, '#F472B6', '#FEF08A');

      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FCE7F3';
      ctx.fill();

      // Cheek Frills
      ctx.beginPath();
      ctx.moveTo(-14, 0); ctx.lineTo(-20, -5); ctx.lineTo(-17, 3); ctx.lineTo(-22, 6); ctx.lineTo(-14, 5);
      ctx.fillStyle = '#F472B6';
      ctx.fill();

      // Eyes & Nostrils
      this.drawEyes(ctx, -4, 5, -1, p.eyeState, '#831843');
      ctx.beginPath();
      ctx.arc(8, 2, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      this.drawMouth(ctx, 0, 5, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, -2, -14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART DRAGON (Morphological)
      // ==========================================
      // 1. Back Pixel Wing
      ctx.save();
      ctx.translate(-6, Math.round(p.bodyY - 6));
      ctx.rotate(-0.35 + p.wingFlap * 0.9);
      ctx.fillStyle = p.accentColor;
      ctx.fillRect(-16, -18, 16, 4);
      ctx.fillRect(-22, -14, 18, 4);
      ctx.fillRect(-20, -10, 14, 5);
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(-18, -14, 12, 4);
      ctx.restore();

      // 2. Stepped Pixel Dragon Tail
      ctx.save();
      ctx.translate(-14, Math.round(p.bodyY + 5));
      ctx.rotate(p.tailAngle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-4, -2, 5, 5);
      ctx.fillRect(-9, -6, 6, 6);
      ctx.fillRect(-15, -11, 7, 6);
      ctx.fillRect(-21, -16, 7, 6);
      // 8-bit Spade Arrow
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-26, -18, 6, 6);
      ctx.fillRect(-29, -21, 6, 6);
      ctx.fillRect(-24, -23, 5, 5);
      ctx.restore();

      // 3. Stepped Back Paws
      ctx.fillStyle = p.accentColor;
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawBR_x - 4), Math.round(p.pawBR_y - 4), 8, 4);

      // 4. Blocky Torso & Belly Plates
      ctx.save();
      ctx.translate(p.bodyX, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-16, -11, 32, 22);
      ctx.fillRect(-18, -8, 36, 16);
      // Gold belly plates
      ctx.fillStyle = p.bellyColor;
      ctx.fillRect(-2, -4, 16, 14);
      ctx.fillRect(0, -6, 12, 18);
      ctx.fillStyle = '#B45309';
      ctx.fillRect(0, 0, 12, 2);
      ctx.fillRect(0, 6, 12, 2);
      ctx.restore();

      // 5. Stepped Front Paws
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawFR_x - 4), Math.round(p.pawFR_y - 4), 8, 4);

      // 6. Front Pixel Wing
      ctx.save();
      ctx.translate(2, Math.round(p.bodyY - 4));
      ctx.rotate(0.2 + p.wingFlap);
      ctx.fillStyle = p.color;
      ctx.fillRect(0, -18, 16, 4);
      ctx.fillRect(4, -14, 18, 4);
      ctx.fillRect(6, -10, 14, 5);
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(4, -14, 12, 4);
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(20, -18, 4, 4);
      ctx.restore();

      // 7. Head & Pixel Horns
      ctx.save();
      ctx.translate(Math.round(p.headX + 6), Math.round(p.headY));
      ctx.rotate(p.headRot);

      // 8-bit Horns
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-8, -16, 4, 6);
      ctx.fillRect(-12, -22, 4, 6);
      ctx.fillRect(2, -18, 4, 6);
      ctx.fillRect(0, -24, 4, 6);

      // Head Base
      ctx.fillStyle = p.color;
      ctx.fillRect(-14, -10, 28, 20);
      ctx.fillRect(-16, -7, 32, 14);

      // Cheek Fins
      ctx.fillStyle = p.bellyColor;
      ctx.fillRect(-19, -2, 4, 6);
      ctx.fillRect(-22, 2, 4, 6);

      // Pixel Eyes & Embers
      this.drawPixelEyes(ctx, -4, 5, -1, p.eyeState, '#FEF08A');
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(7, 2, 3, 3);
      this.drawPixelMouth(ctx, 0, 5, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, -2, -14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Back Wing
    ctx.save();
    ctx.translate(-6, p.bodyY - 6);
    ctx.rotate(-0.35 + p.wingFlap * 0.9);
    this.drawDragonWing(ctx, -1, p.wingEdge, p.wingCore, p.hornColor, isClassic);
    ctx.restore();

    // 2. Dragon Tail
    ctx.save();
    ctx.translate(-14, p.bodyY + 5);
    ctx.rotate(p.tailAngle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -2, -22, -12, -26, -18);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 6.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (isClassic) {
      // Classic Golden Spade Arrow Tip
      ctx.save();
      ctx.translate(-26, -18);
      ctx.rotate(-0.4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-8, -10);
      ctx.lineTo(0, -18);
      ctx.lineTo(8, -10);
      ctx.closePath();
      ctx.fillStyle = p.hornColor;
      ctx.fill();
      ctx.restore();
    } else {
      // Tail dorsal spine crests
      ctx.fillStyle = p.bellyColor;
      for (let i = 1; i <= 3; i++) {
        const t = i / 4;
        const spX = -8 * t - 6;
        const spY = -5 * t - 3;
        ctx.beginPath();
        ctx.moveTo(spX - 2, spY + 1);
        ctx.lineTo(spX, spY - 5);
        ctx.lineTo(spX + 2, spY + 1);
        ctx.closePath();
        ctx.fill();
      }

      // Blazing Flame Blade on tail tip
      ctx.save();
      ctx.translate(-26, -18);
      ctx.rotate(-0.4);
      const flicker = Math.sin(this.time * 18) * 0.15;
      ctx.scale(1.0 + flicker, 1.0 - flicker);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-12, -4, -18, -14, -14, -22);
      ctx.bezierCurveTo(-6, -26, -2, -14, 0, 0);
      ctx.fillStyle = '#FF4500';
      ctx.shadowColor = '#FF2A00';
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-8, -3, -12, -10, -9, -16);
      ctx.bezierCurveTo(-4, -18, -1, -10, 0, 0);
      ctx.fillStyle = '#FFD166';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-5, -8, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // 3. Back Paws
    this.drawDragonClawPaw(ctx, p.pawBL_x, p.pawBL_y, isClassic ? p.accentColor : '#1D0530', p.hornColor);
    this.drawDragonClawPaw(ctx, p.pawBR_x, p.pawBR_y, isClassic ? p.accentColor : '#1D0530', p.hornColor);

    // 4. Dragon Torso
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.scale(p.squishX, p.squishY);

    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Belly Plates
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(4, 2, 11, 10, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = p.bellyColor;
    if (!isClassic) {
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = isClassic ? '#E0A800' : '#FFE66D';
    ctx.lineWidth = 1.2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(4, 2 + i * 5, 8, Math.PI * 0.1, Math.PI * 0.9);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();

    // 5. Front Paws
    this.drawDragonClawPaw(ctx, p.pawFL_x, p.pawFL_y, p.color, p.hornColor);
    this.drawDragonClawPaw(ctx, p.pawFR_x, p.pawFR_y, p.color, p.hornColor);

    // 6. Front Wing
    ctx.save();
    ctx.translate(2, p.bodyY - 4);
    ctx.rotate(0.2 + p.wingFlap);
    this.drawDragonWing(ctx, 1, p.wingEdge, p.wingCore, p.hornColor, isClassic);
    ctx.restore();

    // 7. Dragon Head
    ctx.save();
    ctx.translate(p.headX + 6, p.headY);
    ctx.rotate(p.headRot);

    this.drawDragonHorn(ctx, -8, -10, -0.4, p.hornColor, p.hornTip);
    this.drawDragonHorn(ctx, 4, -12, 0.1, p.hornColor, p.hornTip);

    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Cheek Frill Fins
    ctx.beginPath();
    ctx.moveTo(-14, 0); ctx.lineTo(-20, -5); ctx.lineTo(-17, 3); ctx.lineTo(-22, 6); ctx.lineTo(-14, 5);
    ctx.fillStyle = p.bellyColor;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -4, 5, -1, p.eyeState, isClassic ? '#2C3E50' : '#FF0055');

    // Dragon Nostril Embers
    ctx.beginPath();
    ctx.arc(8, 2, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD166';
    ctx.fill();

    this.drawMouth(ctx, 0, 5, p.mouthState);

    if (acc && acc.nightcap) this.drawNightcap(ctx, -2, -14);
    if (acc && acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  },

  drawDragonWing(ctx, dir, edgeColor, coreColor, clawColor, isClassic) {
    ctx.save();
    ctx.scale(dir, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6, -16, -18, -26, -28, -24);
    ctx.bezierCurveTo(-22, -14, -20, -4, -14, 0);
    ctx.bezierCurveTo(-10, -2, -6, 2, 0, 0);
    ctx.closePath();

    if (isClassic) {
      ctx.fillStyle = coreColor;
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    } else {
      const wingGrad = ctx.createLinearGradient(-28, -24, 0, 0);
      wingGrad.addColorStop(0, edgeColor);
      wingGrad.addColorStop(0.6, coreColor);
      wingGrad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = wingGrad;
      ctx.shadowColor = coreColor;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Wing apex talon
    ctx.beginPath();
    ctx.moveTo(-28, -24);
    ctx.lineTo(-32, -28);
    ctx.lineTo(-26, -26);
    ctx.closePath();
    ctx.fillStyle = clawColor;
    ctx.fill();
    ctx.restore();
  },

  drawDragonHorn(ctx, x, y, rot, hornColor, tipColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(-3, 4);
    ctx.quadraticCurveTo(-1, -10, -12, -22);
    ctx.quadraticCurveTo(2, -14, 4, 3);
    ctx.closePath();

    const hornGrad = ctx.createLinearGradient(-12, -22, 0, 4);
    hornGrad.addColorStop(0, tipColor);
    hornGrad.addColorStop(1, hornColor);
    ctx.fillStyle = hornGrad;
    ctx.fill();
    ctx.restore();
  },

  drawDragonClawPaw(ctx, x, y, baseColor, talonColor) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = baseColor;
    ctx.fill();
    ctx.fillStyle = talonColor;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 2.5 - 1, y - 1);
      ctx.lineTo(x + i * 2.5, y + 2.5);
      ctx.lineTo(x + i * 2.5 + 1, y - 1);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.DragonRenderer = DragonRenderer;
if (typeof globalThis !== 'undefined') globalThis.DragonRenderer = DragonRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DragonRenderer;
}
