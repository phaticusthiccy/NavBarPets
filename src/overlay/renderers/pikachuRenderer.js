/**
 * @file pikachuRenderer.js
 * @description Pikachu Renderer with multi-skin support:
 * 1. 'cool' (Gigavolt Thunder God Pikachu): Real-time lightning tail plasma arcs, pulsing crimson electric cheek sacs, cyan plasma ear seams.
 * 2. 'classic' (Classic Electric Pikachu): Golden yellow chubby body, brown back stripes, zigzag lightning bolt tail, crimson cheeks.
 */

const PikachuRenderer = {
  drawPikachu(ctx, pose, acc, skin = 'cool') {
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
      tailAngle: pose.tailAngle || 0,
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 7,
      pawFL_y: pose.pawFL_y || 0,
      pawBL_x: pose.pawBL_x || -11,
      pawBL_y: pose.pawBL_y || 0,
      electricGold: isClassic ? '#FCD116' : isPixel ? '#FACC15' : isSakura ? '#FEF9C3' : isEvori ? '#FEF9C3' : '#FFE600',
      plasmaCyan: '#00F5D4',
      cheekRed: isClassic ? '#E83A3A' : isPixel ? '#DC2626' : isSakura ? '#FB7185' : isEvori ? '#FDE047' : '#FF0033'
    };

    ctx.save();

    if (isEvori) {
      // ==========================================
      // STAR-GUARDIAN DREAMWINGS PIKACHU
      // ==========================================
      // 0. Orbiting Constellations & Fairy Dust
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, p.bodyX, p.bodyY, 3);
      }

      // 1. Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, p.bodyX - 4, p.bodyY - 4, Math.sin(this.time * 5) * 0.25 - 0.2, 0.85, false);
      }

      // 2. Zigzag Starlight Bolt Tail with Star Tip
      ctx.save();
      ctx.translate(p.bodyX - 11, p.bodyY + 2);
      ctx.rotate(p.tailAngle * 0.9 - 0.4);

      // Lavender Base
      ctx.fillStyle = '#A855F7';
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, -8); ctx.lineTo(2, -2);
      ctx.closePath();
      ctx.fill();

      // Starlight Lightning Bolt
      ctx.fillStyle = '#FEF9C3';
      ctx.beginPath();
      ctx.moveTo(-4, -6);
      ctx.lineTo(-12, -14);
      ctx.lineTo(-7, -16);
      ctx.lineTo(-18, -28);
      ctx.lineTo(-5, -24);
      ctx.lineTo(-8, -20);
      ctx.lineTo(0, -12);
      ctx.lineTo(-3, -10);
      ctx.closePath();
      ctx.fill();

      // Twinkling Star Tip
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -14, -26, 5, '#FDE047');
      }
      ctx.restore();

      // 3. Hind Feet
      ctx.save();
      ctx.fillStyle = '#FEF9C3';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Golden Pastel Body & Lavender Stripes
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();

      // Lavender Stripes
      ctx.fillStyle = '#C084FC';
      ctx.beginPath();
      ctx.ellipse(-6, -4, 2, 4.5, -0.2, 0, Math.PI * 2);
      ctx.ellipse(0, -5, 2, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, p.bodyX + 4, p.bodyY - 6, Math.sin(this.time * 5) * 0.25 + 0.1, 0.9, false);
      }

      // 6. Head, Ears & Cheeks
      ctx.save();
      ctx.translate(p.headX, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(-0.45 + p.earTwitchL);
      ctx.beginPath();
      ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 2.5, '#FDE047');
      }
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(0.45 + p.earTwitchR);
      ctx.beginPath();
      ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C084FC';
      ctx.fill();
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 2.5, '#FDE047');
      }
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();

      // Floating Celestial Star Halo above Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -18, 5, '#FDE047');
      }

      // Star-Glint Cheek Sacs
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -8, 3, 3.2, '#FDE047');
        this.drawDreamwingStar(ctx, 8, 3, 3.2, '#FDE047');
      }

      // Eyes
      this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#581C87');

      // Nose & Mouth
      ctx.fillStyle = '#581C87';
      ctx.beginPath();
      ctx.arc(0, 1.5, 1, 0, Math.PI * 2);
      ctx.fill();
      this.drawMouth(ctx, 0, 4.5, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isSakura) {
      // ==========================================
      // JAPANESE SPRING & SAKURA PIKACHU
      // ==========================================
      // 0. Ambient Drifting Sakura Petals
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, p.bodyX, p.bodyY, 3);
      }

      // 1. Zigzag Lightning Bolt Tail with Pink Blossom Tip
      ctx.save();
      ctx.translate(p.bodyX - 11, p.bodyY + 2);
      ctx.rotate(p.tailAngle * 0.9 - 0.4);

      // Brown Base
      ctx.fillStyle = '#A16207';
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, -8); ctx.lineTo(2, -2);
      ctx.closePath();
      ctx.fill();

      // Lightning Bolt
      ctx.fillStyle = '#FEF9C3';
      ctx.beginPath();
      ctx.moveTo(-4, -6);
      ctx.lineTo(-12, -14);
      ctx.lineTo(-7, -16);
      ctx.lineTo(-18, -28);
      ctx.lineTo(-5, -24);
      ctx.lineTo(-8, -20);
      ctx.lineTo(0, -12);
      ctx.lineTo(-3, -10);
      ctx.closePath();
      ctx.fill();

      // Pink Sakura Tip
      ctx.beginPath();
      ctx.arc(-14, -26, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // 2. Hind Feet
      ctx.save();
      ctx.fillStyle = '#FEF9C3';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Golden Pastel Body & Soft Stripes
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();

      // Soft Rose Stripes
      ctx.fillStyle = '#F472B6';
      ctx.beginPath();
      ctx.ellipse(-6, -4, 2, 4.5, -0.2, 0, Math.PI * 2);
      ctx.ellipse(0, -5, 2, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Head, Ears & Cheeks
      ctx.save();
      ctx.translate(p.headX, p.headY);
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(-0.45 + p.earTwitchL);
      ctx.beginPath();
      ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(0.45 + p.earTwitchR);
      ctx.beginPath();
      ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6';
      ctx.fill();
      ctx.restore();

      // Head Base
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FEF9C3';
      ctx.fill();

      // Blooming Sakura Flower Ear Clip on Left Ear
      if (this.drawSakuraFlower) {
        this.drawSakuraFlower(ctx, -7, -10, 4.5, '#FEF08A', '#FB7185');
      }

      // Electric Sakura Cheek Sacs
      ctx.beginPath();
      ctx.arc(-8, 3, 3.8, 0, Math.PI * 2);
      ctx.arc(8, 3, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      // Eyes
      this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#831843');

      // Nose & Mouth
      ctx.fillStyle = '#831843';
      ctx.beginPath();
      ctx.arc(0, 1.5, 1, 0, Math.PI * 2);
      ctx.fill();
      this.drawMouth(ctx, 0, 4.5, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    if (isPixel) {
      // ==========================================
      // 8-BIT RETRO GAMEBOY PIXEL PIKACHU
      // ==========================================
      // 1. Stepped Zigzag Lightning Bolt Tail
      ctx.save();
      ctx.translate(p.bodyX - 11, Math.round(p.bodyY + 2));
      ctx.rotate(p.tailAngle * 0.9 - 0.4);

      // Brown Base
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-2, -2, 4, 4);
      ctx.fillRect(-6, -6, 5, 5);

      // 8-bit Stepped Lightning Bolt
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(-10, -10, 6, 6);
      ctx.fillRect(-6, -14, 6, 6);
      ctx.fillRect(-14, -20, 8, 8);
      ctx.fillRect(-8, -24, 8, 6);
      ctx.fillRect(-18, -32, 12, 10);
      ctx.restore();

      // 2. Stepped Feet
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(Math.round(p.pawBL_x - 4), Math.round(p.pawBL_y - 4), 8, 4);
      ctx.fillRect(Math.round(p.pawFL_x - 4), Math.round(p.pawFL_y - 4), 8, 4);

      // 3. Blocky Body & Brown Stripes
      ctx.save();
      ctx.translate(p.bodyX, Math.round(p.bodyY));
      ctx.rotate(p.bodyRot);
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(-13, -10, 26, 20);
      ctx.fillRect(-15, -7, 30, 14);

      // Stepped Brown Stripes
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-6, -6, 3, 10);
      ctx.fillRect(0, -6, 3, 10);
      ctx.restore();

      // 4. Head, Stepped Ears & Cheeks
      ctx.save();
      ctx.translate(Math.round(p.headX), Math.round(p.headY));
      ctx.rotate(p.headRot);

      // Left Ear
      ctx.save();
      ctx.translate(-7, -8);
      ctx.rotate(-0.4 + p.earTwitchL);
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(-3, -12, 6, 12);
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(-3, -18, 6, 6);
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(7, -8);
      ctx.rotate(0.4 + p.earTwitchR);
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(-3, -12, 6, 12);
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(-3, -18, 6, 6);
      ctx.restore();

      // Head Base
      ctx.fillStyle = p.electricGold;
      ctx.fillRect(-11, -8, 22, 16);
      ctx.fillRect(-13, -5, 26, 11);

      // Square Red Cheeks
      ctx.fillStyle = p.cheekRed;
      ctx.fillRect(-10, 1, 4, 4);
      ctx.fillRect(6, 1, 4, 4);

      // Pixel Eyes & Nose
      this.drawPixelEyes(ctx, -5, 5, -2, p.eyeState, '#1C1917');
      ctx.fillStyle = '#1C1917';
      ctx.fillRect(-1, 1, 2, 2);
      this.drawPixelMouth(ctx, 0, 4, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
      if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

      ctx.restore();
      ctx.restore();
      return;
    }

    // 1. Zigzag Lightning Bolt Tail
    ctx.save();
    ctx.translate(p.bodyX - 11, p.bodyY + 2);
    ctx.rotate(p.tailAngle * 0.9 - 0.4);

    // Brown Base
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, -8); ctx.lineTo(2, -2);
    ctx.closePath();
    ctx.fill();

    // Lightning Bolt
    ctx.fillStyle = p.electricGold;
    if (!isClassic) {
      ctx.shadowColor = p.electricGold;
      ctx.shadowBlur = 14;
    }
    ctx.beginPath();
    ctx.moveTo(-4, -6);
    ctx.lineTo(-12, -14);
    ctx.lineTo(-7, -16);
    ctx.lineTo(-18, -28);
    ctx.lineTo(-5, -24);
    ctx.lineTo(-8, -20);
    ctx.lineTo(0, -12);
    ctx.lineTo(-3, -10);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    if (!isClassic) {
      // Crackling Electric Plasma Arc (Cool only)
      ctx.strokeStyle = p.plasmaCyan;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-18, -28);
      ctx.lineTo(-22 + Math.sin(this.time * 20) * 3, -32);
      ctx.lineTo(-14, -30);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Hind Feet
    ctx.save();
    ctx.fillStyle = p.electricGold;
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Golden Body & Stripes
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();

    // Dark Brown Stripes
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(-6, -4, 2.5, 5, -0.2, 0, Math.PI * 2);
    ctx.ellipse(0, -5, 2.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Head, Ears & Cheeks
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(-0.45 + p.earTwitchL);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    if (!isClassic) {
      // Plasma glow seam
      ctx.beginPath();
      ctx.arc(0, -13, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.plasmaCyan;
      ctx.shadowColor = p.plasmaCyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(7, -8);
    ctx.rotate(0.45 + p.earTwitchR);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    if (!isClassic) {
      // Plasma glow seam
      ctx.beginPath();
      ctx.arc(0, -13, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.plasmaCyan;
      ctx.shadowColor = p.plasmaCyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.electricGold;
    ctx.fill();

    // Electric Cheek Sacs
    ctx.beginPath();
    ctx.arc(-8, 3, isClassic ? 3.8 : 4, 0, Math.PI * 2);
    ctx.arc(8, 3, isClassic ? 3.8 : 4, 0, Math.PI * 2);
    ctx.fillStyle = p.cheekRed;
    if (!isClassic) {
      ctx.shadowColor = p.cheekRed;
      ctx.shadowBlur = 14;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Eyes
    this.drawEyes(ctx, -5, 5, -2, p.eyeState, '#1E1E1E');

    // Nose & Mouth
    ctx.fillStyle = '#1E1E1E';
    ctx.beginPath();
    ctx.arc(0, 1.5, 1, 0, Math.PI * 2);
    ctx.fill();
    this.drawMouth(ctx, 0, 4.5, p.mouthState);

    // Accessories
    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);

    ctx.restore();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.PikachuRenderer = PikachuRenderer;
if (typeof globalThis !== 'undefined') globalThis.PikachuRenderer = PikachuRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PikachuRenderer;
}
