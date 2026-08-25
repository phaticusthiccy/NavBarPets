/**
 * @file marioRenderer.js
 * @description Super Mario Renderer with multi-skin support:
 * 1. 'cool' (Star Power & Fire Mario): Crisp white Fire Mario cap, glowing golden 'M' emblem with star aura, floating fireball in hand.
 * 2. 'classic' (Classic Super Mario): Signature red cap with white 'M' circle, blue denim overalls, golden buttons, brown boots.
 */

const MarioRenderer = {
  drawMario(ctx, pose, acc, skin = 'cool') {
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
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -6,
      pawBL_y: pose.pawBL_y || 0,
      goldStar: '#FFE600',
      fireRed: '#E52521',
      overallColor: isClassic ? '#1B54B8' : isPixel ? '#2563EB' : isSakura ? '#FFFDF9' : isEvori ? '#FAF5FF' : '#FFFFFF',
      shirtColor: isClassic ? '#E52521' : isPixel ? '#DC2626' : isSakura ? '#FB7185' : isEvori ? '#FDE047' : '#E52521',
      capColor: isClassic ? '#E52521' : isPixel ? '#DC2626' : isSakura ? '#FCE7F3' : isEvori ? '#E9D5FF' : '#FFFFFF'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // COSMIC DREAMWINGS MARIO
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, p.bodyX, p.bodyY, 3);
      }

      // 1. Starlight White / Gold Boots
      ctx.save();
      ctx.fillStyle = '#6B21A8';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Torso (Starlight Overalls & Gold Shirt)
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Gold Shirt Base
      ctx.beginPath();
      ctx.ellipse(0, -2, 14, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE047';
      ctx.fill();

      // Starlight Lavender Overalls
      ctx.beginPath();
      ctx.ellipse(0, 2, 13, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FAF5FF';
      ctx.fill();

      // Straps
      ctx.fillStyle = '#FAF5FF';
      ctx.fillRect(-8, -8, 4, 8);
      ctx.fillRect(4, -8, 4, 8);

      // Star Buttons
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -6, -2, 2.5, '#FDE047');
        this.drawDreamwingStar(ctx, 6, -2, 2.5, '#FDE047');
      }
      ctx.restore();

      // 3. Arms & White Gloves
      ctx.save();
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.ellipse(p.bodyX - 10, p.bodyY + 1, 3.5, 5, 0.3, 0, Math.PI * 2);
      ctx.ellipse(p.bodyX + 10, p.bodyY - 1, 3.5, 5, -0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(p.bodyX - 12, p.bodyY + 5, 4, 0, Math.PI * 2);
      ctx.arc(p.bodyX + 12, p.bodyY - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Head, Mustache & Dreamwings Cap
      ctx.save();
      ctx.translate(p.headX, p.headY);
      ctx.rotate(p.headRot);

      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FED0B0';
      ctx.fill();

      // Floating Celestial Star Halo
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -20, 5, '#FDE047');
      }

      // Eyes
      this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#581C87');

      // Nose
      ctx.beginPath();
      ctx.ellipse(0, 1, 4.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFC4A0';
      ctx.fill();

      // Mustache
      ctx.fillStyle = '#3B0764';
      ctx.beginPath();
      ctx.arc(-4, 4, 4, Math.PI * 0.8, Math.PI * 1.9);
      ctx.arc(0, 4.5, 3.5, Math.PI * 0.9, Math.PI * 2.1);
      ctx.arc(4, 4, 4, Math.PI * 1.1, Math.PI * 2.2);
      ctx.quadraticCurveTo(0, 8.5, -7, 5);
      ctx.fill();

      // Cap Dome & Visor
      ctx.fillStyle = '#E9D5FF';
      ctx.beginPath();
      ctx.ellipse(0, -9, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -4, 15, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cap Star Emblem
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -9, 4.2, '#FDE047');
      }

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & HANAMI SAKURA MARIO
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, p.bodyX, p.bodyY, 3);
      }

      // 1. Brown Boots
      ctx.save();
      ctx.fillStyle = '#6B3A1C';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Torso (White Festival Overalls & Pink Shirt)
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Pink Shirt Base
      ctx.beginPath();
      ctx.ellipse(0, -2, 14, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      // White Overalls
      ctx.beginPath();
      ctx.ellipse(0, 2, 13, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();

      // Straps
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(-8, -8, 4, 8);
      ctx.fillRect(4, -8, 4, 8);

      // Golden Buttons
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.arc(-6, -2, 2.2, 0, Math.PI * 2);
      ctx.arc(6, -2, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Arms & White Gloves
      ctx.save();
      ctx.fillStyle = '#FB7185';
      ctx.beginPath();
      ctx.ellipse(p.bodyX - 10, p.bodyY + 1, 3.5, 5, 0.3, 0, Math.PI * 2);
      ctx.ellipse(p.bodyX + 10, p.bodyY - 1, 3.5, 5, -0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(p.bodyX - 12, p.bodyY + 5, 4, 0, Math.PI * 2);
      ctx.arc(p.bodyX + 12, p.bodyY - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Head, Mustache & Sakura Cap
      ctx.save();
      ctx.translate(p.headX, p.headY);
      ctx.rotate(p.headRot);

      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FED0B0';
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#831843');

      // Nose
      ctx.beginPath();
      ctx.ellipse(0, 1, 4.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFC4A0';
      ctx.fill();

      // Mustache
      ctx.fillStyle = '#4B280E';
      ctx.beginPath();
      ctx.arc(-4, 4, 4, Math.PI * 0.8, Math.PI * 1.9);
      ctx.arc(0, 4.5, 3.5, Math.PI * 0.9, Math.PI * 2.1);
      ctx.arc(4, 4, 4, Math.PI * 1.1, Math.PI * 2.2);
      ctx.quadraticCurveTo(0, 8.5, -7, 5);
      ctx.fill();

      // Sakura Cap Dome & Visor
      ctx.fillStyle = '#FCE7F3';
      ctx.beginPath();
      ctx.ellipse(0, -9, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -4, 15, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cap Emblem Circle & Blooming Sakura Flower
      ctx.beginPath();
      ctx.arc(0, -9, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, 0, -9, 3.2, '#FEF08A', '#FB7185');
      }

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO NES PIXEL MARIO (Morphological)
      // ==========================================
      // 1. Stepped Brown Boots
      ctx.fillStyle = '#78350F';
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 4), 8, 4);

      // 2. Torso (Overalls & Red Shirt)
      ctx.save();
      ctx.translate(p.bodyX, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);

      // Red Shirt Base
      ctx.fillStyle = p.shirtColor;
      ctx.fillRect(-10, -8, 20, 16);
      ctx.fillRect(-12, -6, 24, 12);

      // Blue Overalls
      ctx.fillStyle = p.overallColor;
      ctx.fillRect(-9, -2, 18, 11);
      ctx.fillRect(-7, -8, 4, 12);
      ctx.fillRect(3, -8, 4, 12);

      // Gold Buttons
      ctx.fillStyle = '#FACC15';
      ctx.fillRect(-6, -2, 2, 2);
      ctx.fillRect(4, -2, 2, 2);
      ctx.restore();

      // 3. Arms & White Pixel Gloves
      ctx.fillStyle = p.shirtColor;
      ctx.fillRect(p.bodyX - 12, p.bodyY - 2, 4, 8);
      ctx.fillRect(p.bodyX + 8, p.bodyY - 4, 4, 8);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(p.bodyX - 14, p.bodyY + 3, 5, 5);
      ctx.fillRect(p.bodyX + 9, p.bodyY - 7, 5, 5);

      // 4. Head, 8-bit Mustache & Cap
      ctx.save();
      ctx.translate(Math.round(p.headX), Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Face Base
      ctx.fillStyle = '#FED0B0';
      ctx.fillRect(-9, -8, 18, 16);
      ctx.fillRect(-11, -5, 22, 11);

      // 8-bit Red Cap & Visor
      ctx.fillStyle = p.capColor;
      ctx.fillRect(-11, -16, 22, 9);
      ctx.fillRect(-13, -11, 26, 6);
      // Visor brim
      ctx.fillRect(0, -9, 14, 4);

      // Cap Emblem Circle & Pixel 'M'
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-3, -15, 6, 6);
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(-2, -14, 1, 4);
      ctx.fillRect(1, -14, 1, 4);
      ctx.fillRect(-1, -13, 2, 2);

      // Big Pixel Nose
      ctx.fillStyle = '#FFC4A0';
      ctx.fillRect(-2, -1, 6, 5);

      // 8-Bit Pixel Mustache
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-7, 3, 14, 3);
      ctx.fillRect(-5, 6, 10, 2);
      ctx.fillRect(-8, 2, 3, 2);

      // Pixel Eyes
      this.drawPixelEyes(ctx, -5, 5, -2, p.eyeState, '#1E3A8A');

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Brown Plumber Boots
    ctx.save();
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5.5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Torso (Overalls & Shirt)
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Shirt Base
    ctx.beginPath();
    ctx.ellipse(0, -2, 14, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.shirtColor;
    ctx.fill();

    // Overalls
    ctx.beginPath();
    ctx.ellipse(0, 2, 13, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.overallColor;
    ctx.fill();

    // Straps
    ctx.fillStyle = p.overallColor;
    ctx.fillRect(-8, -8, 4, 8);
    ctx.fillRect(4, -8, 4, 8);

    // Golden Buttons
    ctx.fillStyle = p.goldStar;
    if (!isClassic) {
      ctx.shadowColor = p.goldStar;
      ctx.shadowBlur = 8;
    }
    ctx.beginPath();
    ctx.arc(-6, -2, 2.2, 0, Math.PI * 2);
    ctx.arc(6, -2, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 3. Arms & Gloves
    ctx.save();
    ctx.fillStyle = p.shirtColor;
    ctx.beginPath();
    ctx.ellipse(p.bodyX - 10, p.bodyY + 1, 3.5, 5, 0.3, 0, Math.PI * 2);
    ctx.ellipse(p.bodyX + 10, p.bodyY - 1, 3.5, 5, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(p.bodyX - 12, p.bodyY + 5, 4, 0, Math.PI * 2);
    ctx.arc(p.bodyX + 12, p.bodyY - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (!isClassic) {
      // Floating Swirling Fireball in Hand (Cool only)
      const fireX = p.bodyX + 16;
      const fireY = p.bodyY - 4 + Math.sin(this.time * 8) * 2;
      ctx.beginPath();
      ctx.arc(fireX, fireY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FF4500';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(fireX, fireY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 4. Head, Mustache & Cap
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FED0B0';
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#2575FC');

    // Nose
    ctx.beginPath();
    ctx.ellipse(0, 1, 4.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC4A0';
    ctx.fill();

    // Mustache
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.arc(-4, 4, 4, Math.PI * 0.8, Math.PI * 1.9);
    ctx.arc(0, 4.5, 3.5, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(4, 4, 4, Math.PI * 1.1, Math.PI * 2.2);
    ctx.quadraticCurveTo(0, 8.5, -7, 5);
    ctx.fill();

    // Cap Dome & Visor
    ctx.fillStyle = p.capColor;
    ctx.beginPath();
    ctx.ellipse(0, -9, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -4, 15, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isClassic) {
      // Classic White Circle
      ctx.beginPath();
      ctx.arc(0, -9, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Red 'M'
      ctx.fillStyle = '#E52521';
      ctx.font = 'bold 6px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', 0, -9);
    } else {
      // Glowing Golden 'M' Emblem
      ctx.beginPath();
      ctx.arc(0, -9, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.fireRed;
      ctx.shadowColor = p.goldStar;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', 0, -9);
    }

    // Accessories
    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

    ctx.restore();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.MarioRenderer = MarioRenderer;
if (typeof globalThis !== 'undefined') globalThis.MarioRenderer = MarioRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarioRenderer;
}
