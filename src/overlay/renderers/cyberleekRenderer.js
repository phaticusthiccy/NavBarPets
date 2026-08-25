/**
 * @file cyberleekRenderer.js
 * @description Sentient Cyber Leek (Pırasa) Renderer with 5 morphological skins:
 * 1. 'cool' (Mythic Cyber Leek): Obsidian carbon stalk, glowing cyan data circuits, pulsing magenta plasma leaves, HUD visor.
 * 2. 'classic' (Farm Fresh Leek): Crisp natural white-to-green gradient stalk, rich organic leaves, cute anime blush.
 * 3. 'pixel' (8-Bit Arcade Leek): Quantized stepped pixel stem, chunky emerald block leaves, retro square eyes.
 * 4. 'sakura' (Hanami Blossom Leek): Pastel mint & blossom pink stalk, blooming sakura flower crown, drifting petals.
 * 5. 'evori' (Celestial Dream Leek): Twilight lavender stalk, glowing fairy dreamwings, star halo, star-tipped sprouts.
 */

const CyberleekRenderer = {
  drawCyberleek(ctx, pose, acc, skin = 'cool') {
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
      leafAngle: pose.tailAngle || (Math.sin(this.time * 3.5) * 0.2),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 12,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -10,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -4,
      pawBR_y: pose.pawBR_y || 0
    };

    ctx.save();

    // ==========================================
    // 1. SAKURA SKIN (Hanami Blossom Leek)
    // ==========================================
    if (isSakura) {
      if (this.drawDriftingSakuraPetals) {
        this.drawDriftingSakuraPetals(ctx, 0, p.bodyY, 3);
      }

      // Root feet
      ctx.fillStyle = '#FB7185';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Leek Stalk Body
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      const grad = ctx.createLinearGradient(0, 10, 0, -26);
      grad.addColorStop(0, '#FFFDF5');
      grad.addColorStop(0.5, '#FCE7F3');
      grad.addColorStop(1, '#F472B6');

      ctx.beginPath();
      ctx.roundRect(-10, -24, 20, 32, [8, 8, 12, 12]);
      ctx.fillStyle = grad;
      ctx.fill();

      // Sprouting Blossom Leaves
      ctx.save();
      ctx.translate(0, -22);
      ctx.rotate(p.leafAngle);

      // Left leaf
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.bezierCurveTo(-14, -14, -18, -32, -8, -38);
      ctx.bezierCurveTo(-2, -32, -2, -14, 0, 0);
      ctx.fillStyle = '#F472B6';
      ctx.fill();

      // Right leaf
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(12, -12, 16, -30, 8, -36);
      ctx.bezierCurveTo(2, -28, 2, -12, 0, 0);
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      // Cherry blossom flower on crown
      if (this.drawCherryBlossomFlower) {
        this.drawCherryBlossomFlower(ctx, 0, -32, 5.5);
      }
      ctx.restore();

      // Rosy Cheeks & Face
      ctx.beginPath();
      ctx.arc(-6, -6, 3, 0, Math.PI * 2);
      ctx.arc(6, -6, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 113, 133, 0.45)';
      ctx.fill();

      this.drawEyes(ctx, -5, 5, -12, p.eyeState, '#831843');
      this.drawMouth(ctx, 0, -6, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -26);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, -10);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 2. EVORI DREAMWINGS SKIN (Celestial Familiar Leek)
    // ==========================================
    if (isEvori) {
      if (this.drawOrbitingConstellation) {
        this.drawOrbitingConstellation(ctx, 0, p.bodyY, 3);
      }

      // Root feet
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Leek Body
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      // Back Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, -6, -12, Math.sin(this.time * 5) * 0.25 - 0.2, 0.85, false);
      }

      const evoriGrad = ctx.createLinearGradient(0, 10, 0, -26);
      evoriGrad.addColorStop(0, '#FAF5FF');
      evoriGrad.addColorStop(0.5, '#E9D5FF');
      evoriGrad.addColorStop(1, '#C084FC');

      ctx.beginPath();
      ctx.roundRect(-10, -24, 20, 32, [8, 8, 12, 12]);
      ctx.fillStyle = evoriGrad;
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Front Dreamwing
      if (this.drawDreamwings) {
        this.drawDreamwings(ctx, 6, -14, Math.sin(this.time * 5) * 0.25 + 0.1, 0.9, false);
      }

      // Sprouting Astral Leaves
      ctx.save();
      ctx.translate(0, -22);
      ctx.rotate(p.leafAngle);

      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.bezierCurveTo(-14, -14, -18, -32, -8, -38);
      ctx.bezierCurveTo(-2, -32, -2, -14, 0, 0);
      ctx.fillStyle = '#C084FC';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(12, -12, 16, -30, 8, -36);
      ctx.bezierCurveTo(2, -28, 2, -12, 0, 0);
      ctx.fillStyle = '#93C5FD';
      ctx.fill();

      // Twinkling Star Tips
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, -8, -38, 4.5, '#FDE047');
        this.drawDreamwingStar(ctx, 8, -36, 4, '#FDE047');
      }
      ctx.restore();

      // Floating Celestial Star Halo above Head
      if (this.drawDreamwingStar) {
        this.drawDreamwingStar(ctx, 0, -32, 5, '#FDE047');
      }

      this.drawEyes(ctx, -5, 5, -12, p.eyeState, '#581C87');
      this.drawMouth(ctx, 0, -6, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -26);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, -10);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 3. PIXEL ART SKIN (8-Bit Arcade Leek)
    // ==========================================
    if (isPixel) {
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      // 8-bit Root Feet
      ctx.fillStyle = '#CA8A04';
      ctx.fillRect(p.pawBL_x - 3, p.pawBL_y + 6, 6, 4);
      ctx.fillRect(p.pawFL_x - 3, p.pawFL_y + 6, 6, 4);

      // Pixel Stem (Stepped blocks)
      ctx.fillStyle = '#F0FDF4';
      ctx.fillRect(-9, -16, 18, 24);
      ctx.fillStyle = '#86EFAC';
      ctx.fillRect(-8, -24, 16, 10);

      // Pixel Leaves (Segmented stairs)
      ctx.fillStyle = '#16A34A';
      ctx.fillRect(-6, -32, 6, 10);
      ctx.fillRect(-10, -40, 6, 10);
      ctx.fillRect(-14, -46, 6, 8);

      ctx.fillStyle = '#22C55E';
      ctx.fillRect(0, -34, 6, 12);
      ctx.fillRect(4, -42, 6, 10);
      ctx.fillRect(8, -48, 6, 8);

      // Pixel Eyes & Mouth
      this.drawPixelEyes(ctx, -5, 5, -8, p.eyeState, '#14532D');
      this.drawMouth(ctx, 0, -2, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -26);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, -8);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 4. CLASSIC SKIN (Farm Fresh Leek)
    // ==========================================
    if (isClassic) {
      // Natural Root Paws
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Organic Stalk
      ctx.save();
      ctx.translate(p.bodyX, p.bodyY);
      ctx.rotate(p.bodyRot);

      const classicGrad = ctx.createLinearGradient(0, 10, 0, -26);
      classicGrad.addColorStop(0, '#FFFFFF');
      classicGrad.addColorStop(0.5, '#BBF7D0');
      classicGrad.addColorStop(1, '#22C55E');

      ctx.beginPath();
      ctx.roundRect(-10, -24, 20, 32, [8, 8, 12, 12]);
      ctx.fillStyle = classicGrad;
      ctx.fill();

      // Rich Sprouting Leaves
      ctx.save();
      ctx.translate(0, -22);
      ctx.rotate(p.leafAngle);

      // Left leaf
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.bezierCurveTo(-14, -14, -18, -32, -8, -38);
      ctx.bezierCurveTo(-2, -32, -2, -14, 0, 0);
      ctx.fillStyle = '#16A34A';
      ctx.fill();

      // Right leaf
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(12, -12, 16, -30, 8, -36);
      ctx.bezierCurveTo(2, -28, 2, -12, 0, 0);
      ctx.fillStyle = '#22C55E';
      ctx.fill();
      ctx.restore();

      // Rosy Cheeks
      ctx.beginPath();
      ctx.arc(-6, -6, 2.8, 0, Math.PI * 2);
      ctx.arc(6, -6, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
      ctx.fill();

      this.drawEyes(ctx, -5, 5, -12, p.eyeState, '#14532D');
      this.drawMouth(ctx, 0, -6, p.mouthState);

      if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -26);
      if (acc && acc.headphones) this.drawHeadphones(ctx, 0, -10);

      ctx.restore();
      ctx.restore();
      return;
    }

    // ==========================================
    // 5. MYTHIC / COOL SKIN (Cyberpunk Neon Blade Leek)
    // ==========================================
    // Cyber Thruster Root Pads
    ctx.fillStyle = '#00F5D4';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 4.5, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 4.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Obsidian Carbon Body with Cyan Data Traces
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);

    ctx.beginPath();
    ctx.roundRect(-10, -24, 20, 32, [8, 8, 12, 12]);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Circuit lines
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-6, -4); ctx.lineTo(-2, 2); ctx.lineTo(-2, 8);
    ctx.moveTo(6, -4); ctx.lineTo(2, 2); ctx.lineTo(2, 8);
    ctx.stroke();

    // Neon Plasma Blade Leaves
    ctx.save();
    ctx.translate(0, -22);
    ctx.rotate(p.leafAngle);

    // Left Energy Leaf
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.bezierCurveTo(-16, -14, -20, -34, -10, -40);
    ctx.bezierCurveTo(-2, -34, -2, -14, 0, 0);
    ctx.fillStyle = '#00F5D4';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Right Energy Leaf
    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.bezierCurveTo(14, -12, 18, -32, 10, -38);
    ctx.bezierCurveTo(2, -30, 2, -12, 0, 0);
    ctx.fillStyle = '#FF007F';
    ctx.shadowColor = '#FF007F';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Futuristic Cyan Visor
    ctx.beginPath();
    ctx.roundRect(-8, -16, 16, 8, 4);
    ctx.fillStyle = '#00F5D4';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Visor HUD scanlines
    this.drawEyes(ctx, -4, 4, -12, p.eyeState, '#0F172A');
    this.drawMouth(ctx, 0, -3, p.mouthState);

    if (acc && acc.nightcap) this.drawNightcap(ctx, 0, -26);
    if (acc && acc.headphones) this.drawHeadphones(ctx, 0, -10);

    ctx.restore();
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.CyberleekRenderer = CyberleekRenderer;
if (typeof globalThis !== 'undefined') globalThis.CyberleekRenderer = CyberleekRenderer;
if (typeof module !== 'undefined' && module.exports) module.exports = CyberleekRenderer;
