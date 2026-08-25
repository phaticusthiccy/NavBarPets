/**
 * @file nekoRenderer.js
 * @description Neko Cat Renderer with multi-skin support:
 * 1. 'cool' (Celestial Cyber Neko): Dual glowing spirit tails, neon ear inners, cyber amulet.
 * 2. 'classic' (Classic Calico/Orange Tabby): Warm peach coat, tabby stripes, cream belly, red bell collar.
 */

const NekoRenderer = {
  drawNeko(ctx, pose, acc, skin = 'cool') {
    const isClassic = skin === 'classic';
    const isPixel = skin === 'pixel';
    const isSakura = skin === 'sakura';
    const isEvori = skin === 'evori';

    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.3),
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      // Palette
      coatDark: isClassic ? '#E67E22' : isPixel ? '#EA580C' : isSakura ? '#FFFBF5' : isEvori ? '#F3E8FF' : '#1A102F',
      coatMid: isClassic ? '#D35400' : isPixel ? '#C2410C' : isSakura ? '#FCE7F3' : isEvori ? '#E9D5FF' : '#2D1B4E',
      bellyGlow: isClassic ? '#FFF8F0' : isPixel ? '#FEF08A' : isSakura ? '#FDF2F8' : isEvori ? '#FAF5FF' : '#00F5D4',
      neonPink: isClassic ? '#FFB6C1' : isPixel ? '#F43F5E' : isSakura ? '#F472B6' : isEvori ? '#C084FC' : '#FF2A85',
      gold: '#FFD166'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // LUNARI CELESTIAL DREAMWINGS NEKO
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -4, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.9, false);
      }

      // 2. Starlight Plume Tail with Star Gem Tip
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -8, -22, -24, -14, -32);
      ctx.bezierCurveTo(-6, -34, -4, -18, 0, 0);
      ctx.fillStyle = '#E9D5FF';
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Twinkling Star Tip
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -14, -32, 4.5, '#FDE047');
      }
      ctx.restore();

      // 3. Far Paws
      this.drawClassicNekoPaw(ctx, p.pawBL_x, p.pawBL_y, '#E9D5FF');
      this.drawClassicNekoPaw(ctx, p.pawFL_x, p.pawFL_y, '#E9D5FF');

      // 4. Torso & Soft Starlight Belly
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Star-glow chest bib
      ctx.beginPath();
      ctx.ellipse(2, 4, 10, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();
      ctx.restore();

      // 5. Near Paws
      this.drawClassicNekoPaw(ctx, p.pawBR_x, p.pawBR_y, '#F3E8FF');
      this.drawClassicNekoPaw(ctx, p.pawFR_x, p.pawFR_y, '#F3E8FF');

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
      ctx.translate(-8, -10);
      ctx.rotate(-0.15 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(-2, -12); ctx.lineTo(6, 2);
      ctx.closePath();
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(-2, -8); ctx.lineTo(4, 1);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.15 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-6, 2); ctx.lineTo(2, -12); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-4, 1); ctx.lineTo(2, -8); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F3E8FF';
      ctx.fill();

      // Floating Celestial Star Halo above Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Starlight Collar with Star Amulet
      ctx.beginPath();
      ctx.ellipse(0, 9, 12, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#A855F7';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, 11, 3.5, '#FDE047');
      }

      // Eyes & Mouth
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#7E22CE');
      this.drawMouth(ctx, 0, 4, p.mouthState, '#7E22CE');

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 2.5, 0, Math.PI * 2);
      ctx.arc(8, 3, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(192, 132, 252, 0.45)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA NEKO (Morphological)
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // 1. Sakura Tail with Soft Pink Blossom Gradient Tip
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -8, -20, -24, -12, -30);
      ctx.bezierCurveTo(-6, -32, -4, -18, 0, 0);
      ctx.fillStyle = '#FFF5F8';
      ctx.fill();
      // Pink blossom gradient tip
      ctx.beginPath();
      ctx.arc(-12, -28, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // 2. Far Paws
      this.drawClassicNekoPaw(ctx, p.pawBL_x, p.pawBL_y, '#FCE7F3');
      this.drawClassicNekoPaw(ctx, p.pawFL_x, p.pawFL_y, '#FCE7F3');

      // 3. Torso & Soft Pink Belly
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFBF5';
      ctx.fill();

      // Soft blossom chest bib
      ctx.beginPath();
      ctx.ellipse(2, 4, 10, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDF2F8';
      ctx.fill();
      ctx.restore();

      // 4. Near Paws
      this.drawClassicNekoPaw(ctx, p.pawBR_x, p.pawBR_y, '#FFFBF5');
      this.drawClassicNekoPaw(ctx, p.pawFR_x, p.pawFR_y, '#FFFBF5');

      // 5. Head
      ctx.save();
      ctx.translate(0, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-8, -10);
      ctx.rotate(-0.15 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 4); ctx.lineTo(-2, -12); ctx.lineTo(6, 2);
      ctx.closePath();
      ctx.fillStyle = '#FFFBF5';
      ctx.fill();
      // Pink inner
      ctx.beginPath();
      ctx.moveTo(-4, 2); ctx.lineTo(-2, -8); ctx.lineTo(4, 1);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.15 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-6, 2); ctx.lineTo(2, -12); ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fillStyle = '#FFFBF5';
      ctx.fill();
      // Pink inner
      ctx.beginPath();
      ctx.moveTo(-4, 1); ctx.lineTo(2, -8); ctx.lineTo(4, 2);
      ctx.closePath();
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFBF5';
      ctx.fill();

      // Sakura Silk Ribbon Collar & Gold Bell
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 9, 12, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      // Gold Bell
      ctx.beginPath();
      ctx.arc(0, 11, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FBBF24';
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Blooming Sakura Flower Ornament on Left Ear
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, -8, -12, 4.5, '#FEF08A', '#F472B6');
      }

      // Eyes & Mouth
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#BE185D');
      this.drawMouth(ctx, 0, 4, p.mouthState, '#BE185D');

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 2.5, 0, Math.PI * 2);
      ctx.arc(8, 3, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 113, 133, 0.45)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO PIXEL ART NEKO (Morphological)
      // ==========================================
      // 1. Stepped Pixel Tail
      ctx.save();
      ctx.translate(-14, Math.round(p.bodyY + 6));
      ctx.rotate(p.tailAngle);
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(-2, -2, 4, 4);
      ctx.fillRect(-6, -6, 5, 5);
      ctx.fillRect(-10, -12, 5, 6);
      ctx.fillRect(-12, -18, 5, 7);
      ctx.fillRect(-10, -25, 6, 6);
      // Pixel tail tip
      ctx.fillStyle = '#FFFBEB';
      ctx.fillRect(-8, -29, 6, 5);
      ctx.restore();

      // 2. Stepped Back Paws
      ctx.fillStyle = p.coatMid;
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawBR_x - 4), Math.round(p.pawBR_y - 4), 8, 4);

      // 3. Blocky Body
      ctx.save();
      ctx.translate(0, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(-16, -11, 32, 22);
      ctx.fillRect(-18, -8, 36, 16);
      // Cream belly patch
      ctx.fillStyle = '#FFFBEB';
      ctx.fillRect(-4, -4, 18, 14);
      ctx.fillRect(-2, -6, 14, 18);
      // Pixel tabby stripes
      ctx.fillStyle = p.coatMid;
      ctx.fillRect(-10, -11, 3, 6);
      ctx.fillRect(-3, -11, 3, 6);
      ctx.restore();

      // 4. Stepped Front Paws
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawFR_x - 4), Math.round(p.pawFR_y - 4), 8, 4);
      ctx.fillStyle = '#FFFBEB';
      ctx.fillRect(Math.round(p.pawFL_x - 2), Math.round(p.pawFL_y - 2), 4, 2);
      ctx.fillRect(Math.round(p.pawFR_x - 2), Math.round(p.pawFR_y - 2), 4, 2);

      // 5. Head
      ctx.save();
      ctx.translate(6, Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Stepped Pixel Ears
      // Left Ear
      ctx.save();
      ctx.translate(-10, -10);
      ctx.rotate(-0.15 + p.earTwitchL);
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(-6, 2, 8, 4);
      ctx.fillRect(-4, -2, 6, 4);
      ctx.fillRect(-2, -6, 4, 4);
      ctx.fillRect(0, -9, 2, 3);
      ctx.fillStyle = p.neonPink;
      ctx.fillRect(-2, -2, 3, 4);
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.15 + p.earTwitchR);
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(-2, 2, 8, 4);
      ctx.fillRect(-2, -2, 6, 4);
      ctx.fillRect(-2, -6, 4, 4);
      ctx.fillRect(-2, -9, 2, 3);
      ctx.fillStyle = p.neonPink;
      ctx.fillRect(-1, -2, 3, 4);
      ctx.restore();

      // Head Base
      ctx.fillStyle = p.coatDark;
      ctx.fillRect(-14, -10, 28, 20);
      ctx.fillRect(-16, -7, 32, 14);

      // Checkered Red Collar & 8-bit Bell
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(-11, 8, 22, 3);
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(-2, 10, 4, 4);
      ctx.fillStyle = '#713F12';
      ctx.fillRect(-1, 12, 2, 2);

      // Pixel Eyes & Mouth
      this.drawPixelEyes(ctx, -5, 5, -1, p.eyeState, '#1C1917');
      this.drawPixelMouth(ctx, 0, 4, p.mouthState);

      // Pixel Whiskers
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-16, 2, 6, 2);
      ctx.fillRect(-15, 5, 5, 2);
      ctx.fillRect(10, 2, 6, 2);
      ctx.fillRect(10, 5, 5, 2);

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
    } else if (isClassic) {
      // 1. Classic Single Cute Tabby Tail
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -8, -20, -24, -12, -30);
      ctx.bezierCurveTo(-6, -32, -4, -18, 0, 0);
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      // Cream tail tip
      ctx.beginPath();
      ctx.arc(-12, -28, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8F0';
      ctx.fill();
      ctx.restore();

      // 2. Back Paws
      this.drawClassicNekoPaw(ctx, p.pawBL_x, p.pawBL_y, p.coatDark);
      this.drawClassicNekoPaw(ctx, p.pawBR_x, p.pawBR_y, p.coatDark);

      // 3. Body
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // White chest bib
      ctx.beginPath();
      ctx.ellipse(3, 2, 11, 8.5, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8F0';
      ctx.fill();

      // Tabby stripes
      ctx.strokeStyle = p.coatMid;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, -8); ctx.lineTo(-6, -3);
      ctx.moveTo(0, -9); ctx.lineTo(0, -4);
      ctx.stroke();
      ctx.restore();

      // 4. Front Paws
      this.drawClassicNekoPaw(ctx, p.pawFL_x, p.pawFL_y, p.coatDark);
      this.drawClassicNekoPaw(ctx, p.pawFR_x, p.pawFR_y, p.coatDark);

      // 5. Head
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Ears
      // Left
      ctx.save();
      ctx.translate(-10, -10);
      ctx.rotate(-0.2 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 6); ctx.lineTo(0, -14); ctx.lineTo(8, 2);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, 4); ctx.lineTo(0, -9); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.fill();
      ctx.restore();

      // Right
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.2 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-8, 2); ctx.lineTo(0, -14); ctx.lineTo(6, 6);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(0, -9); ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // Red Collar & Gold Bell
      ctx.beginPath();
      ctx.ellipse(0, 10, 12, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#E63946';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 13, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, '#2C3E50');

      // Nose & Mouth
      ctx.beginPath();
      ctx.arc(0, 3.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FF758F';
      ctx.fill();
      this.drawMouth(ctx, 0, 4.5, p.mouthState, '#4A3B32');

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-8, 3, 2.5, 0, Math.PI * 2);
      ctx.arc(8, 3, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
    } else {
      // Celestial Cyber Neko
      // Tail 1 (Cyan spirit flame)
      ctx.save();
      ctx.translate(-14, p.bodyY + 6);
      ctx.rotate(p.tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -10, -24, -28, -16, -34);
      ctx.bezierCurveTo(-8, -36, -6, -20, 0, 0);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-16, -32, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = p.bellyGlow;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Tail 2 (Magenta spirit flame wisp)
      ctx.save();
      ctx.translate(-12, p.bodyY + 8);
      ctx.rotate(p.tailAngle * 0.8 + 0.35);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -6, -18, -20, -10, -28);
      ctx.bezierCurveTo(-4, -30, -2, -14, 0, 0);
      ctx.fillStyle = p.coatMid;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-10, -26, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // Back Paws
      this.drawCoolNekoPaw(ctx, p.pawBL_x, p.pawBL_y, p.coatDark, p.bellyGlow);
      this.drawCoolNekoPaw(ctx, p.pawBR_x, p.pawBR_y, p.coatDark, p.bellyGlow);

      // Body
      ctx.save();
      ctx.translate(0, p.bodyY);
      ctx.rotate(p.bodyRot);
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      const chestGrad = ctx.createLinearGradient(0, -6, 4, 8);
      chestGrad.addColorStop(0, p.neonPink);
      chestGrad.addColorStop(1, p.bellyGlow);
      ctx.beginPath();
      ctx.ellipse(3, 2, 11, 8.5, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = chestGrad;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Front Paws
      this.drawCoolNekoPaw(ctx, p.pawFL_x, p.pawFL_y, p.coatMid, p.neonPink);
      this.drawCoolNekoPaw(ctx, p.pawFR_x, p.pawFR_y, p.coatMid, p.neonPink);

      // Head
      ctx.save();
      ctx.translate(6, p.headY);
      ctx.rotate(p.headRot);

      // Left Cyber Ear
      ctx.save();
      ctx.translate(-10, -10);
      ctx.rotate(-0.2 + p.earTwitchL);
      ctx.beginPath();
      ctx.moveTo(-6, 6); ctx.lineTo(0, -14); ctx.lineTo(8, 2);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-3, 4); ctx.lineTo(0, -9); ctx.lineTo(5, 2);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Right Cyber Ear
      ctx.save();
      ctx.translate(8, -10);
      ctx.rotate(0.2 + p.earTwitchR);
      ctx.beginPath();
      ctx.moveTo(-8, 2); ctx.lineTo(0, -14); ctx.lineTo(6, 6);
      ctx.closePath();
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-5, 2); ctx.lineTo(0, -9); ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fillStyle = p.neonPink;
      ctx.shadowColor = p.neonPink;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.coatDark;
      ctx.fill();

      // Forehead Star Mark
      ctx.beginPath();
      ctx.arc(0, -8, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.shadowColor = p.gold;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Glowing Cyber Choker Collar & Crystal Amulet
      ctx.beginPath();
      ctx.ellipse(0, 10, 12, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.gold;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 13, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.bellyGlow;
      ctx.shadowColor = p.bellyGlow;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Eyes
      this.drawEyes(ctx, -5, 5, -1, p.eyeState, p.bellyGlow);

      // Nose
      ctx.beginPath();
      ctx.arc(0, 3.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = p.neonPink;
      ctx.fill();

      // Mouth
      this.drawMouth(ctx, 0, 4.5, p.mouthState, p.neonPink);

      // Cyber Cheeks Glow
      ctx.beginPath();
      ctx.arc(-8, 3, 2.2, 0, Math.PI * 2);
      ctx.arc(8, 3, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 245, 212, 0.4)';
      ctx.fill();

      if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
      if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

      ctx.restore();
    }

    ctx.restore();
  },

  drawClassicNekoPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  },

  drawCoolNekoPaw(ctx, x, y, coatColor, sockGlow) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = coatColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 1, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = sockGlow;
    ctx.shadowColor = sockGlow;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.NekoRenderer = NekoRenderer;
if (typeof globalThis !== 'undefined') globalThis.NekoRenderer = NekoRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NekoRenderer;
}
