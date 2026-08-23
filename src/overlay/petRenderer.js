/**
 * @file petRenderer.js
 * @description Procedural & Layered 2D Vector Canvas Renderer for NavBarPets.
 * Renders 5 distinct species (Neko Cat, Shiba Inu, Cyber Slime, Mini Dragon, Pixel Duck)
 * with dynamic squash & stretch, procedural eyes/mouths, accessories, and ground shadows.
 */

class PetRenderer {
  constructor() {
    this.time = 0;
  }

  update(dt) {
    this.time += dt;
  }

  render(ctx, petState) {
    const {
      species = 'neko',
      x = 0,
      y = 0,
      scale = 1.0,
      facing = 1, // 1 for right, -1 for left
      pose = {},
      accessories = { hat: false, headphones: false, nightcap: false }
    } = petState;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale * facing, scale);

    // Apply squash and stretch transformation if specified in pose
    const squishX = pose.squishX || 1.0;
    const squishY = pose.squishY || 1.0;
    ctx.scale(squishX, squishY);

    // Dynamic ground shadow
    this.drawShadow(ctx, pose);

    // Render species
    switch (species) {
      case 'neko':
        this.drawNeko(ctx, pose, accessories);
        break;
      case 'shiba':
        this.drawShiba(ctx, pose, accessories);
        break;
      case 'slime':
        this.drawCyberSlime(ctx, pose, accessories);
        break;
      case 'dragon':
        this.drawMiniDragon(ctx, pose, accessories);
        break;
      case 'duck':
        this.drawPixelDuck(ctx, pose, accessories);
        break;
      case 'fox':
        this.drawFox(ctx, pose, accessories);
        break;
      case 'bunny':
        this.drawBunny(ctx, pose, accessories);
        break;
      case 'penguin':
        this.drawPenguin(ctx, pose, accessories);
        break;
      case 'jett':
        this.drawJett(ctx, pose, accessories);
        break;
      case 'mario':
        this.drawMario(ctx, pose, accessories);
        break;
      case 'pikachu':
        this.drawPikachu(ctx, pose, accessories);
        break;
      default:
        this.drawNeko(ctx, pose, accessories);
    }

    ctx.restore();
  }

  drawShadow(ctx, pose) {
    const shadowWidth = (pose.shadowWidth || 36) * (pose.squishX || 1.0);
    const shadowHeight = (pose.shadowHeight || 8);
    const shadowOffset = pose.groundOffset || 0;

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, 5 + shadowOffset, Math.max(10, shadowWidth / 2), Math.max(3, shadowHeight / 2), 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0.1, 0.35 - (pose.groundOffset || 0) * 0.005)})`;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 1. NEKO (CAT) RENDERER
  // ==========================================
  drawNeko(ctx, pose, acc) {
    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.3),
      earTwitchL: pose.earTwitchL || 0,
      earTwitchR: pose.earTwitchR || 0,
      eyeState: pose.eyeState || 'open', // 'open', 'blink', 'happy', 'sleep', 'wide', 'stars'
      mouthState: pose.mouthState || 'w', // 'w', 'open', 'smile', 'blep'
      pawFL_x: pose.pawFL_x || 8,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 14,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -12,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -6,
      pawBR_y: pose.pawBR_y || 0,
      blush: pose.blush !== undefined ? pose.blush : true,
      color: pose.customColor || '#FFA07A',
      secondaryColor: '#FFF2EB',
      stripeColor: '#E07A5F'
    };

    ctx.save();

    // 1. Tail (Back layer)
    ctx.save();
    ctx.translate(-14, p.bodyY + 6);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -10, -20, -28, -12, -32);
    ctx.bezierCurveTo(-6, -34, -4, -20, 0, 0);
    ctx.fillStyle = p.color;
    ctx.fill();
    // Tail tip highlight
    ctx.beginPath();
    ctx.arc(-12, -30, 4, 0, Math.PI * 2);
    ctx.fillStyle = p.secondaryColor;
    ctx.fill();
    ctx.restore();

    // 2. Back Paws
    this.drawNekoPaw(ctx, p.pawBL_x, p.pawBL_y, '#E58E6B');
    this.drawNekoPaw(ctx, p.pawBR_x, p.pawBR_y, '#E58E6B');

    // 3. Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Belly patch
    ctx.beginPath();
    ctx.ellipse(2, 2, 11, 9, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = p.secondaryColor;
    ctx.fill();
    ctx.restore();

    // 4. Front Paws
    this.drawNekoPaw(ctx, p.pawFL_x, p.pawFL_y, p.color);
    this.drawNekoPaw(ctx, p.pawFR_x, p.pawFR_y, p.color);

    // 5. Head
    ctx.save();
    ctx.translate(6, p.headY);
    ctx.rotate(p.headRot);

    // Ears
    // Left Ear
    ctx.save();
    ctx.translate(-10, -10);
    ctx.rotate(-0.2 + p.earTwitchL);
    ctx.beginPath();
    ctx.moveTo(-6, 6);
    ctx.lineTo(0, -12);
    ctx.lineTo(8, 2);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    // Inner ear
    ctx.beginPath();
    ctx.moveTo(-3, 4);
    ctx.lineTo(0, -8);
    ctx.lineTo(5, 2);
    ctx.closePath();
    ctx.fillStyle = '#FFB5B5';
    ctx.fill();
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(8, -10);
    ctx.rotate(0.2 + p.earTwitchR);
    ctx.beginPath();
    ctx.moveTo(-8, 2);
    ctx.lineTo(0, -12);
    ctx.lineTo(6, 6);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    // Inner ear
    ctx.beginPath();
    ctx.moveTo(-5, 2);
    ctx.lineTo(0, -8);
    ctx.lineTo(3, 4);
    ctx.closePath();
    ctx.fillStyle = '#FFB5B5';
    ctx.fill();
    ctx.restore();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Head Markings / Tabby Stripes
    ctx.beginPath();
    ctx.moveTo(-4, -12); ctx.lineTo(-4, -6);
    ctx.moveTo(0, -13); ctx.lineTo(0, -5);
    ctx.moveTo(4, -12); ctx.lineTo(4, -6);
    ctx.strokeStyle = p.stripeColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState);

    // Nose & Whiskers
    ctx.beginPath();
    ctx.moveTo(-1, 3);
    ctx.lineTo(1, 3);
    ctx.lineTo(0, 5);
    ctx.closePath();
    ctx.fillStyle = '#FF758F';
    ctx.fill();

    // Mouth
    this.drawMouth(ctx, 0, 5, p.mouthState);

    // Whiskers
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.2;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(-8, 3); ctx.lineTo(-17, 1);
    ctx.moveTo(-8, 5); ctx.lineTo(-16, 7);
    // Right whiskers
    ctx.moveTo(8, 3); ctx.lineTo(17, 1);
    ctx.moveTo(8, 5); ctx.lineTo(16, 7);
    ctx.stroke();

    // Blush
    if (p.blush) {
      ctx.beginPath();
      ctx.ellipse(-10, 4, 3, 2, 0, 0, Math.PI * 2);
      ctx.ellipse(10, 4, 3, 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 107, 129, 0.45)';
      ctx.fill();
    }

    // Head Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore(); // End head
    ctx.restore();
  }

  drawNekoPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    // Claws/toe lines
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 2, y - 4); ctx.lineTo(x - 2, y);
    ctx.moveTo(x + 2, y - 4); ctx.lineTo(x + 2, y);
    ctx.stroke();
    ctx.restore();
  }

  // ==========================================
  // 2. SHIBA INU RENDERER
  // ==========================================
  drawShiba(ctx, pose, acc) {
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
      color: '#E08E45',
      white: '#FFFDF5',
      dark: '#4A3B32'
    };

    ctx.save();

    // 1. Curled Shiba Tail (Back)
    ctx.save();
    ctx.translate(-14, p.bodyY - 2);
    ctx.rotate(p.tailWag);
    ctx.beginPath();
    ctx.arc(-4, -8, 10, 0.4, Math.PI * 1.7);
    ctx.lineWidth = 8;
    ctx.strokeStyle = p.color;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Fluffy white tip
    ctx.beginPath();
    ctx.arc(-8, -14, 4, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();
    ctx.restore();

    // 2. Back Paws
    this.drawShibaPaw(ctx, p.pawBL_x, p.pawBL_y, '#C87834');
    this.drawShibaPaw(ctx, p.pawBR_x, p.pawBR_y, '#C87834');

    // 3. Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 19, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // White chest & belly
    ctx.beginPath();
    ctx.ellipse(4, 2, 12, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();
    ctx.restore();

    // 4. Front Paws
    this.drawShibaPaw(ctx, p.pawFL_x, p.pawFL_y, p.color);
    this.drawShibaPaw(ctx, p.pawFR_x, p.pawFR_y, p.color);

    // 5. Head
    ctx.save();
    ctx.translate(7, p.headY);
    ctx.rotate(p.headRot);

    // Triangle Ears
    // Left ear
    ctx.beginPath();
    ctx.moveTo(-12, -4);
    ctx.lineTo(-7, -18);
    ctx.lineTo(-1, -6);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -4);
    ctx.lineTo(-7, -14);
    ctx.lineTo(-2, -6);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.moveTo(1, -6);
    ctx.lineTo(7, -18);
    ctx.lineTo(12, -4);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, -6);
    ctx.lineTo(7, -14);
    ctx.lineTo(10, -4);
    ctx.closePath();
    ctx.fillStyle = p.white;
    ctx.fill();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // White Cheek Fluff & Eyebrow Dots
    ctx.beginPath();
    ctx.ellipse(-7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(7, 3, 7, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(0, 5, 9, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    // White Eyebrow Dots
    ctx.beginPath();
    ctx.arc(-6, -6, 2.5, 0, Math.PI * 2);
    ctx.arc(6, -6, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = p.white;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState);

    // Nose
    ctx.beginPath();
    ctx.ellipse(0, 4, 3, 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.dark;
    ctx.fill();

    // Mouth / Blep
    this.drawMouth(ctx, 0, 6, p.mouthState);

    // Bandana around neck
    ctx.beginPath();
    ctx.moveTo(-10, 12);
    ctx.lineTo(10, 12);
    ctx.lineTo(0, 20);
    ctx.closePath();
    ctx.fillStyle = '#E63946';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 15, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF';
    ctx.fill();

    // Head Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  }

  drawShibaPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 3, 5, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFDF5';
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 3. CYBER SLIME RENDERER
  // ==========================================
  drawCyberSlime(ctx, pose, acc) {
    const p = {
      bodyY: pose.bodyY || -14,
      wobble: pose.wobble || (Math.sin(this.time * 5) * 2),
      squishX: (pose.squishX || 1.0) + Math.cos(this.time * 4) * 0.05,
      squishY: (pose.squishY || 1.0) - Math.cos(this.time * 4) * 0.05,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      color: pose.customColor || '#06D6A0',
      glowColor: '#70FFD4',
      coreColor: '#1B9AAA'
    };

    ctx.save();
    ctx.translate(0, p.bodyY);

    // Glowing aura
    ctx.shadowColor = p.glowColor;
    ctx.shadowBlur = 16;

    // Jelly Body Blob
    ctx.beginPath();
    const w = 22;
    const h = 16;
    ctx.moveTo(-w, 6);
    ctx.bezierCurveTo(-w, -h + 2, -w / 2, -h - 4 + p.wobble, 0, -h - 4 + p.wobble);
    ctx.bezierCurveTo(w / 2, -h - 4 + p.wobble, w, -h + 2, w, 6);
    ctx.bezierCurveTo(w, h, -w, h, -w, 6);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -h - 4, 0, h);
    grad.addColorStop(0, p.glowColor);
    grad.addColorStop(0.5, p.color);
    grad.addColorStop(1, p.coreColor);
    ctx.fillStyle = grad;
    ctx.fill();

    // Internal nucleus/core
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(Math.sin(this.time * 2) * 3, -1, 7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();

    // High Gloss Bubble Highlights
    ctx.beginPath();
    ctx.ellipse(-8, -10, 5, 2.5, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(10, -6, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -7, 7, -2, p.eyeState);

    // Mouth
    this.drawMouth(ctx, 0, 4, p.mouthState);

    // Cyber Antenna / Sparkle
    ctx.beginPath();
    ctx.moveTo(0, -h - 2);
    ctx.lineTo(0, -h - 8);
    ctx.strokeStyle = p.glowColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -h - 9, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE66D';
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -h - 2);
    if (acc.headphones) this.drawHeadphones(ctx, 0, -2);

    ctx.restore();
  }

  // ==========================================
  // 4. MINI DRAGON RENDERER
  // ==========================================
  drawMiniDragon(ctx, pose, acc) {
    const p = {
      bodyY: pose.bodyY || -18,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap || (Math.sin(this.time * 6) * 0.5),
      tailAngle: pose.tailAngle || (Math.sin(this.time * 3) * 0.3),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'smile',
      color: '#7209B7',
      bellyColor: '#F72585',
      hornColor: '#FFD166',
      pawFL_x: pose.pawFL_x || 6,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 12,
      pawFR_y: pose.pawFR_y || 0
    };

    ctx.save();

    // 1. Dragon Wings (Back)
    ctx.save();
    ctx.translate(-4, p.bodyY - 4);
    ctx.rotate(-0.2 + p.wingFlap);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-14, -20);
    ctx.lineTo(-24, -14);
    ctx.lineTo(-18, 2);
    ctx.closePath();
    ctx.fillStyle = '#4CC9F0';
    ctx.fill();
    ctx.strokeStyle = '#3A0CA3';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 2. Tail with Flame/Spade
    ctx.save();
    ctx.translate(-14, p.bodyY + 6);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-12, 0, -20, -10, -24, -14);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 5;
    ctx.stroke();
    // Tail spade
    ctx.beginPath();
    ctx.moveTo(-24, -14);
    ctx.lineTo(-30, -20);
    ctx.lineTo(-30, -10);
    ctx.closePath();
    ctx.fillStyle = p.hornColor;
    ctx.fill();
    ctx.restore();

    // 3. Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Belly Scales
    ctx.beginPath();
    ctx.ellipse(3, 2, 10, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.bellyColor;
    ctx.fill();
    ctx.restore();

    // 4. Little Paws
    this.drawDragonPaw(ctx, p.pawFL_x, p.pawFL_y, p.color);
    this.drawDragonPaw(ctx, p.pawFR_x, p.pawFR_y, p.color);

    // 5. Head
    ctx.save();
    ctx.translate(6, p.headY);
    ctx.rotate(p.headRot);

    // Golden Horns
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(-14, -20);
    ctx.lineTo(-4, -12);
    ctx.fillStyle = p.hornColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(4, -10);
    ctx.lineTo(2, -22);
    ctx.lineTo(8, -12);
    ctx.fillStyle = p.hornColor;
    ctx.fill();

    // Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Snout
    ctx.beginPath();
    ctx.ellipse(8, 3, 9, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Nostril Puff
    ctx.beginPath();
    ctx.arc(13, 2, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#3A0CA3';
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -3, 6, -2, p.eyeState);

    // Mouth
    this.drawMouth(ctx, 4, 5, p.mouthState);

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, -2, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  }

  drawDragonPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 5. PIXEL DUCK RENDERER
  // ==========================================
  drawPixelDuck(ctx, pose, acc) {
    const p = {
      bodyY: pose.bodyY || -14,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -26,
      headRot: pose.headRot || 0,
      wingFlap: pose.wingFlap || (Math.sin(this.time * 4) * 0.2),
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'open',
      color: '#FFD166',
      billColor: '#F77F00',
      feetColor: '#F77F00',
      pawFL_x: pose.pawFL_x || 4,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 10,
      pawFR_y: pose.pawFR_y || 0
    };

    ctx.save();

    // 1. Webbed Feet
    this.drawDuckFoot(ctx, p.pawFL_x - 10, p.pawFL_y, p.feetColor);
    this.drawDuckFoot(ctx, p.pawFR_x - 4, p.pawFR_y, p.feetColor);

    // 2. Duck Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 17, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Tiny Flapping Wing
    ctx.save();
    ctx.translate(-2, -2);
    ctx.rotate(p.wingFlap);
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 6, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE29A';
    ctx.fill();
    ctx.restore();
    ctx.restore();

    // 3. Duck Head
    ctx.save();
    ctx.translate(6, p.headY);
    ctx.rotate(p.headRot);

    // Head Base
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Cute Tuft on top
    ctx.beginPath();
    ctx.moveTo(-2, -12);
    ctx.bezierCurveTo(0, -18, 4, -18, 4, -12);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Orange Bill
    ctx.beginPath();
    ctx.ellipse(11, 2, 7, 4, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = p.billColor;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -2, 4, -3, p.eyeState);

    // Blush
    ctx.beginPath();
    ctx.arc(-4, 3, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 107, 129, 0.4)';
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, -2, -10);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  }

  drawDuckFoot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - 4, y);
    ctx.lineTo(x + 4, y);
    ctx.lineTo(x + 2, y - 4);
    ctx.lineTo(x - 2, y - 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 6. KITSUNE FOX RENDERER
  // ==========================================
  drawFox(ctx, pose, acc) {
    const p = {
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || (Math.sin(this.time * 4) * 0.45),
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
      foxOrange: '#F97316',
      chestWhite: '#FFFDF9',
      darkSocks: '#1E293B',
      innerEar: '#FFBEA6'
    };

    ctx.save();

    // 1. Bushy Kitsune Tail (Back layer)
    ctx.save();
    ctx.translate(-14, p.bodyY + 4);
    ctx.rotate(p.tailAngle - 0.2);

    // Large arched flame tail
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -10, -28, -22, -22, -36);
    ctx.bezierCurveTo(-12, -44, -2, -30, 2, -18);
    ctx.bezierCurveTo(4, -8, 2, -2, 0, 0);
    ctx.closePath();
    ctx.fillStyle = p.foxOrange;
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

    // 2. Back Paws (Dark socks)
    this.drawFoxPaw(ctx, p.pawBL_x, p.pawBL_y, p.foxOrange, p.darkSocks);
    this.drawFoxPaw(ctx, p.pawBR_x, p.pawBR_y, p.foxOrange, p.darkSocks);

    // 3. Fox Torso
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Main orange body
    ctx.beginPath();
    ctx.ellipse(0, 4, 16, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.foxOrange;
    ctx.fill();

    // Fluffy white chest bib
    ctx.beginPath();
    ctx.moveTo(8, -4);
    ctx.bezierCurveTo(16, 2, 12, 12, 6, 14);
    ctx.bezierCurveTo(2, 10, 4, -2, 8, -4);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();
    ctx.restore();

    // 4. Front Paws (Dark socks)
    this.drawFoxPaw(ctx, p.pawFL_x, p.pawFL_y, p.foxOrange, p.darkSocks);
    this.drawFoxPaw(ctx, p.pawFR_x, p.pawFR_y, p.foxOrange, p.darkSocks);

    // 5. Fox Head & Face
    ctx.save();
    ctx.translate(8, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear (Pointed with black tip)
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(p.earTwitchL - 0.2);
    ctx.beginPath();
    ctx.moveTo(-6, 4);
    ctx.lineTo(-4, -18);
    ctx.lineTo(5, 2);
    ctx.closePath();
    ctx.fillStyle = p.foxOrange;
    ctx.fill();
    // Black tip
    ctx.beginPath();
    ctx.moveTo(-5, -10);
    ctx.lineTo(-4, -18);
    ctx.lineTo(0, -9);
    ctx.closePath();
    ctx.fillStyle = p.darkSocks;
    ctx.fill();
    // Inner ear peach
    ctx.beginPath();
    ctx.moveTo(-3, 2);
    ctx.lineTo(-2, -10);
    ctx.lineTo(3, 1);
    ctx.closePath();
    ctx.fillStyle = p.innerEar;
    ctx.fill();
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(5, -8);
    ctx.rotate(p.earTwitchR + 0.15);
    ctx.beginPath();
    ctx.moveTo(-5, 2);
    ctx.lineTo(4, -18);
    ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fillStyle = p.foxOrange;
    ctx.fill();
    // Black tip
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(4, -18);
    ctx.lineTo(5, -10);
    ctx.closePath();
    ctx.fillStyle = p.darkSocks;
    ctx.fill();
    // Inner ear peach
    ctx.beginPath();
    ctx.moveTo(-3, 1);
    ctx.lineTo(2, -10);
    ctx.lineTo(3, 2);
    ctx.closePath();
    ctx.fillStyle = p.innerEar;
    ctx.fill();
    ctx.restore();

    // Head base (Orange with cheek tufts)
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.lineTo(10, -8);
    ctx.lineTo(14, 0);
    ctx.lineTo(16, 6);
    ctx.lineTo(11, 8);
    ctx.lineTo(0, 10);
    ctx.lineTo(-11, 8);
    ctx.lineTo(-16, 6);
    ctx.lineTo(-14, 0);
    ctx.closePath();
    ctx.fillStyle = p.foxOrange;
    ctx.fill();

    // White cheek tufts & muzzle
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.bezierCurveTo(8, 2, 14, 6, 12, 10);
    ctx.bezierCurveTo(4, 12, -4, 12, -12, 10);
    ctx.bezierCurveTo(-14, 6, -8, 2, 0, 2);
    ctx.closePath();
    ctx.fillStyle = p.chestWhite;
    ctx.fill();

    // Fox Snout & Black Nose
    ctx.beginPath();
    ctx.arc(0, 7, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.darkSocks;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, 5, 1, p.eyeState);

    // Mouth
    this.drawMouth(ctx, 0, 8, p.mouthState);

    // Cute Blush
    ctx.beginPath();
    ctx.arc(-8, 5, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 5, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -10);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  }

  drawFoxPaw(ctx, x, y, bodyColor, sockColor) {
    ctx.save();
    // Leg upper
    ctx.beginPath();
    ctx.ellipse(x, y - 6, 3.5, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = bodyColor;
    ctx.fill();
    // Dark foot sock
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = sockColor;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 7. MOCHI BUNNY RENDERER
  // ==========================================
  drawBunny(ctx, pose, acc) {
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
      bunnyWhite: '#FFFDF9',
      innerPink: '#FFB3C1',
      blushPink: '#FF8FA3'
    };

    ctx.save();

    // 1. Cotton Ball Tail
    ctx.save();
    ctx.translate(-14, p.bodyY + 6);
    ctx.rotate(p.tailAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fillStyle = p.bunnyWhite;
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();

    // 2. Back Paws
    this.drawBunnyPaw(ctx, p.pawBL_x, p.pawBL_y, p.bunnyWhite);
    this.drawBunnyPaw(ctx, p.pawBR_x, p.pawBR_y, p.bunnyWhite);

    // 3. Mochi Body
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.beginPath();
    ctx.ellipse(0, 4, 15, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.bunnyWhite;
    ctx.fill();
    ctx.restore();

    // 4. Front Paws
    this.drawBunnyPaw(ctx, p.pawFL_x, p.pawFL_y, p.bunnyWhite);
    this.drawBunnyPaw(ctx, p.pawFR_x, p.pawFR_y, p.bunnyWhite);

    // 5. Bunny Head & Floppy Ears
    ctx.save();
    ctx.translate(4, p.headY);
    ctx.rotate(p.headRot);

    // Left Tall Floppy Ear
    ctx.save();
    ctx.translate(-6, -10);
    ctx.rotate(p.earTwitchL - 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.bunnyWhite;
    ctx.fill();
    // Inner Pink
    ctx.beginPath();
    ctx.ellipse(0, -12, 2.5, 10, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.innerPink;
    ctx.fill();
    ctx.restore();

    // Right Tall Floppy Ear
    ctx.save();
    ctx.translate(6, -10);
    ctx.rotate(p.earTwitchR + 0.1);
    ctx.beginPath();
    ctx.ellipse(0, -12, 4.5, 14, 0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.bunnyWhite;
    ctx.fill();
    // Inner Pink
    ctx.beginPath();
    ctx.ellipse(0, -12, 2.5, 10, 0.05, 0, Math.PI * 2);
    ctx.fillStyle = p.innerPink;
    ctx.fill();
    ctx.restore();

    // Head base (Chubby round mochi)
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.bunnyWhite;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, 5, -1, p.eyeState);

    // Cute pink Y-nose & Mouth
    ctx.beginPath();
    ctx.arc(0, 2.5, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = p.innerPink;
    ctx.fill();
    this.drawMouth(ctx, 0, 4, p.mouthState);

    // Rosy Cheeks
    ctx.beginPath();
    ctx.arc(-8, 3, 3, 0, Math.PI * 2);
    ctx.arc(8, 3, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 143, 163, 0.5)';
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore();
    ctx.restore();
  }

  drawBunnyPaw(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 2, 4, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 8. CHILLY PENGUIN RENDERER
  // ==========================================
  drawPenguin(ctx, pose, acc) {
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
      coatNavy: '#0F172A',
      bellyWhite: '#F8FAFC',
      beakGold: '#F59E0B',
      scarfRed: '#EF4444'
    };

    ctx.save();

    // 1. Orange Webbed Waddling Feet
    this.drawPenguinFoot(ctx, p.pawBL_x - 3, p.pawBL_y, p.beakGold);
    this.drawPenguinFoot(ctx, p.pawFL_x + 3, p.pawFL_y, p.beakGold);

    // 2. Penguin Body & Wings
    ctx.save();
    ctx.translate(0, p.bodyY);
    ctx.rotate(p.bodyRot);

    // Left Wing / Flipper
    ctx.save();
    ctx.translate(-14, 0);
    ctx.rotate(p.wingFlap + 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Right Wing / Flipper
    ctx.save();
    ctx.translate(14, 0);
    ctx.rotate(-p.wingFlap - 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 4, 4, 10, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();
    ctx.restore();

    // Main Tuxedo Body (Navy)
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // White Belly
    ctx.beginPath();
    ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.bellyWhite;
    ctx.fill();

    // 3. Cozy Winter Scarf
    ctx.save();
    ctx.translate(0, -12);
    // Scarf neck band
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.scarfRed;
    ctx.fill();
    // Trailing scarf tail
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(10, 12 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(4, 14 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(2, 0);
    ctx.closePath();
    ctx.fillStyle = p.scarfRed;
    ctx.fill();
    ctx.restore();

    // 4. Penguin Head
    ctx.save();
    ctx.translate(0, -20);
    ctx.rotate(p.headRot);

    // Head circle (Navy)
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = p.coatNavy;
    ctx.fill();

    // White eye masks
    ctx.beginPath();
    ctx.arc(-4, 0, 5, 0, Math.PI * 2);
    ctx.arc(4, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = p.bellyWhite;
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -4, 4, 0, p.eyeState);

    // Golden Beak
    ctx.beginPath();
    ctx.moveTo(-3, 2);
    ctx.lineTo(3, 2);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fillStyle = p.beakGold;
    ctx.fill();

    // Cheerful Blush
    ctx.beginPath();
    ctx.arc(-8, 3, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 3, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.fill();

    // Accessories
    if (acc.nightcap) this.drawNightcap(ctx, 0, -12);
    if (acc.headphones) this.drawHeadphones(ctx, 0, 0);

    ctx.restore(); // Head end
    ctx.restore(); // Body end
    ctx.restore();
  }

  drawPenguinFoot(ctx, x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y - 1, 6, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // SHARED FACIAL FEATURES & ACCESSORIES
  // ==========================================
  drawEyes(ctx, leftX, rightX, y, state) {
    ctx.save();
    if (state === 'open') {
      // Big lively anime eyes
      ctx.beginPath();
      ctx.ellipse(leftX, y, 3.5, 4.5, 0, 0, Math.PI * 2);
      ctx.ellipse(rightX, y, 3.5, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1A1A2E';
      ctx.fill();

      // Catchlight reflections
      ctx.beginPath();
      ctx.arc(leftX - 1, y - 1.5, 1.3, 0, Math.PI * 2);
      ctx.arc(rightX - 1, y - 1.5, 1.3, 0, Math.PI * 2);
      ctx.arc(leftX + 1.2, y + 1.5, 0.7, 0, Math.PI * 2);
      ctx.arc(rightX + 1.2, y + 1.5, 0.7, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    } else if (state === 'blink' || state === 'sleep') {
      // Cute curved sleep/blink arcs ^ ^ or - -
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1A1A2E';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(leftX, y, 3.5, 0.2, Math.PI - 0.2);
      ctx.arc(rightX, y, 3.5, 0.2, Math.PI - 0.2);
      ctx.stroke();
    } else if (state === 'happy') {
      // Cheerful upside-down arcs
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1A1A2E';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(leftX, y + 1, 3.5, Math.PI + 0.3, -0.3);
      ctx.arc(rightX, y + 1, 3.5, Math.PI + 0.3, -0.3);
      ctx.stroke();
    } else if (state === 'wide') {
      // Surprised huge eyes
      ctx.beginPath();
      ctx.ellipse(leftX, y, 4.5, 5.5, 0, 0, Math.PI * 2);
      ctx.ellipse(rightX, y, 4.5, 5.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1A1A2E';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(leftX - 1, y - 2, 2, 0, Math.PI * 2);
      ctx.arc(rightX - 1, y - 2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    } else if (state === 'stars') {
      // Star sparkles in eyes during dance
      this.drawStar(ctx, leftX, y, 4, '#FFE66D');
      this.drawStar(ctx, rightX, y, 4, '#FFE66D');
    }
    ctx.restore();
  }

  drawStar(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r + cx, -Math.sin((18 + i * 72) * Math.PI / 180) * r + cy);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r / 2) + cx, -Math.sin((54 + i * 72) * Math.PI / 180) * (r / 2) + cy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawMouth(ctx, x, y, state) {
    ctx.save();
    ctx.strokeStyle = '#1A1A2E';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';

    if (state === 'w') {
      // :3 cat mouth
      ctx.beginPath();
      ctx.arc(x - 2.5, y, 2.5, 0.1, Math.PI - 0.2);
      ctx.arc(x + 2.5, y, 2.5, 0.2, Math.PI - 0.1);
      ctx.stroke();
    } else if (state === 'open' || state === 'smile') {
      ctx.beginPath();
      ctx.arc(x, y - 1, 3.5, 0.2, Math.PI - 0.2);
      ctx.fillStyle = '#FF758F';
      ctx.fill();
      ctx.stroke();
    } else if (state === 'blep') {
      // Tongue sticking out :P
      ctx.beginPath();
      ctx.arc(x - 2, y, 2, 0.1, Math.PI - 0.2);
      ctx.arc(x + 2, y, 2, 0.2, Math.PI - 0.1);
      ctx.stroke();
      // Little pink tongue
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 2.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FF758F';
      ctx.fill();
    }
    ctx.restore();
  }

  drawNightcap(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.bezierCurveTo(-14, -14, -6, -26, -18, -32);
    ctx.bezierCurveTo(4, -20, 10, -10, 10, 0);
    ctx.closePath();
    ctx.fillStyle = '#4361EE';
    ctx.fill();

    // Brim
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Pom pom
    ctx.beginPath();
    ctx.arc(-18, -32, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE66D';
    ctx.fill();
    ctx.restore();
  }

  drawHeadphones(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    // Headband arc
    ctx.beginPath();
    ctx.arc(0, -2, 17, Math.PI * 0.9, Math.PI * 2.1);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F72585';
    ctx.stroke();

    // Ear pads
    ctx.fillStyle = '#4CC9F0';
    ctx.beginPath();
    ctx.ellipse(-16, 0, 4, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(16, 0, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 9. VALORANT JETT RENDERER
  // ==========================================
  drawJett(ctx, pose, acc) {
    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || 0,
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
      squishX: pose.squishX || 1.0,
      squishY: pose.squishY || 1.0
    };

    // 1. Wind Dash Aura / Swirl
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY + 8);
    ctx.beginPath();
    ctx.ellipse(-12, 6, 14, 4, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 245, 212, 0.22)';
    ctx.fill();
    ctx.restore();

    // 2. High Flowing Ponytail (acts as hair tail)
    ctx.save();
    ctx.translate(p.headX - 6, p.headY - 6);
    ctx.rotate(p.tailAngle * 0.8 - 0.3);
    
    // Ponytail Ribbon / Tie
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00F5D4';
    ctx.fill();

    // Flowing White Ponytail Hair
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-14, -12, -26, 4);
    ctx.quadraticCurveTo(-18, 14, -6, 4);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#D0E1F9';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Ice-blue Hair Tip
    ctx.beginPath();
    ctx.moveTo(-20, -2);
    ctx.quadraticCurveTo(-26, 4, -22, 10);
    ctx.quadraticCurveTo(-16, 6, -20, -2);
    ctx.fillStyle = '#A0E7E5';
    ctx.fill();
    ctx.restore();

    // 3. 2 Bipedal Runner Legs & Cyan Soles
    ctx.save();
    ctx.fillStyle = '#1E2235';
    // Left Leg (Behind)
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 3.5, 6, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Left Cyan Sole
    ctx.fillStyle = '#00F5D4';
    ctx.fillRect(p.pawBL_x - 3, p.pawBL_y - 1, 6, 2.5);

    // Right Leg (Front)
    ctx.fillStyle = '#1E2235';
    ctx.beginPath();
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 3.5, 6, -0.1, 0, Math.PI * 2);
    ctx.fill();
    // Right Cyan Sole
    ctx.fillStyle = '#00F5D4';
    ctx.fillRect(p.pawFL_x - 3, p.pawFL_y - 1, 6, 2.5);
    ctx.restore();

    // 4. Arms (Left resting/swinging, Right directing wind Kunai)
    ctx.save();
    ctx.fillStyle = '#1E2235';
    // Left arm
    ctx.beginPath();
    ctx.ellipse(p.bodyX - 9, p.bodyY + 2, 3, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Left hand
    ctx.fillStyle = '#FEE5D8';
    ctx.beginPath();
    ctx.arc(p.bodyX - 10, p.bodyY + 6, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Right arm (reaching toward floating Kunai)
    ctx.fillStyle = '#1E2235';
    ctx.beginPath();
    ctx.ellipse(p.bodyX + 8, p.bodyY - 1, 3, 5, -0.4, 0, Math.PI * 2);
    ctx.fill();
    // Right hand
    ctx.fillStyle = '#FEE5D8';
    ctx.beginPath();
    ctx.arc(p.bodyX + 11, p.bodyY - 3, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Torso / Windrunner Vest
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.scale(p.squishX, p.squishY);

    // Dark Navy Jacket Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E2235';
    ctx.fill();

    // Cyan Wind Inlay & Belt
    ctx.beginPath();
    ctx.arc(0, 2, 10, 0, Math.PI);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#00F5D4';
    ctx.stroke();

    // White High Collar Vest
    ctx.beginPath();
    ctx.ellipse(2, -6, 9, 5, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#EAF0F8';
    ctx.fill();
    ctx.restore();

    // 5. Floating Wind Kunai Dagger
    ctx.save();
    ctx.translate(p.bodyX + 16, p.bodyY - 6 + Math.sin(Date.now() * 0.006) * 3);
    ctx.rotate(0.35 + p.bodyRot);

    // Kunai Blade
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(4, 0);
    ctx.lineTo(1.5, 6);
    ctx.lineTo(-1.5, 6);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fillStyle = '#1B2A47';
    ctx.fill();
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Cyan Neon Blade Core
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 4);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Kunai Ring Handle
    ctx.beginPath();
    ctx.arc(0, 9, 2.5, 0, Math.PI * 2);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // 6. Head & Cute Face
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    // Face base (Peach Anime Skin)
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 10.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FEE5D8';
    ctx.fill();

    // Side & Front White Anime Bangs
    ctx.beginPath();
    ctx.moveTo(-12, -4);
    ctx.quadraticCurveTo(-14, -14, 0, -13);
    ctx.quadraticCurveTo(14, -14, 12, -4);
    ctx.quadraticCurveTo(6, -8, 2, -2);
    ctx.quadraticCurveTo(-2, -7, -6, -3);
    ctx.quadraticCurveTo(-9, -7, -12, -4);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#D8E2EC';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Cyan High-tech Mark on Left Cheek
    ctx.fillStyle = '#00F5D4';
    ctx.beginPath();
    ctx.moveTo(-7, 2);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-6, 4);
    ctx.closePath();
    ctx.fill();

    // Expressive Eyes
    this.drawEyes(ctx, -4.5, 0, 4.5, 0, p.eyeState, '#00F5D4');

    // Mouth
    this.drawMouth(ctx, 0, 4, p.mouthState);
    ctx.restore();

    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 9);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);
  }

  // ==========================================
  // 10. SUPER MARIO RENDERER
  // ==========================================
  drawMario(ctx, pose, acc) {
    const p = {
      bodyX: 0,
      bodyY: pose.bodyY || -16,
      bodyRot: pose.bodyRot || 0,
      headX: 0,
      headY: pose.headY || -32,
      headRot: pose.headRot || 0,
      tailAngle: pose.tailAngle || 0,
      eyeState: pose.eyeState || 'open',
      mouthState: pose.mouthState || 'w',
      pawFL_x: pose.pawFL_x || 7,
      pawFL_y: pose.pawFL_y || 0,
      pawFR_x: pose.pawFR_x || 13,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -11,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -5,
      pawBR_y: pose.pawBR_y || 0,
      squishX: pose.squishX || 1.0,
      squishY: pose.squishY || 1.0
    };

    // 1. 2 Bipedal Work Boots (Left & Right)
    ctx.save();
    ctx.fillStyle = '#6B3A19';
    // Left Boot (Behind)
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right Boot (Front)
    ctx.beginPath();
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Torso (Red Shirt & Blue Denim Overalls)
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.scale(p.squishX, p.squishY);

    // Red Shirt Base
    ctx.beginPath();
    ctx.ellipse(0, -2, 14, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#E52521';
    ctx.fill();

    // Blue Overalls
    ctx.beginPath();
    ctx.ellipse(0, 2, 13, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1B54B8';
    ctx.fill();

    // Overalls Straps
    ctx.fillStyle = '#1B54B8';
    ctx.fillRect(-8, -8, 4, 8);
    ctx.fillRect(4, -8, 4, 8);

    // Golden Yellow Buttons
    ctx.fillStyle = '#FCD116';
    ctx.beginPath();
    ctx.arc(-6, -2, 2, 0, Math.PI * 2);
    ctx.arc(6, -2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Red Sleeves & White Cartoon Gloves (2 Arms)
    ctx.save();
    // Left Arm & Glove (Swinging at left side)
    ctx.fillStyle = '#E52521';
    ctx.beginPath();
    ctx.ellipse(p.bodyX - 10, p.bodyY + 1, 3.5, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#D0D0D0';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(p.bodyX - 12, p.bodyY + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Right Arm & Glove (Raised in stride / action)
    ctx.fillStyle = '#E52521';
    ctx.beginPath();
    ctx.ellipse(p.bodyX + 10, p.bodyY - 1, 3.5, 5, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(p.bodyX + 12, p.bodyY - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 4. Head, Nose, Mustache & Red Cap
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    // Peach Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FED0B0';
    ctx.fill();

    // Sideburns
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.rect(-13, -3, 3, 6);
    ctx.rect(10, -3, 3, 6);
    ctx.fill();

    // Friendly Blue Eyes
    this.drawEyes(ctx, -5, -2, 5, -2, p.eyeState, '#2575FC');

    // Bulbous Peach Nose
    ctx.beginPath();
    ctx.ellipse(0, 1, 4.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC4A0';
    ctx.fill();
    ctx.strokeStyle = '#E0A880';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Bushy Curved Dark Brown Mustache
    ctx.fillStyle = '#4B280E';
    ctx.beginPath();
    ctx.arc(-4, 4, 4, Math.PI * 0.8, Math.PI * 1.9);
    ctx.arc(0, 4.5, 3.5, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(4, 4, 4, Math.PI * 1.1, Math.PI * 2.2);
    ctx.quadraticCurveTo(0, 8.5, -7, 5);
    ctx.fill();

    // Red Mario Cap
    ctx.fillStyle = '#E52521';
    // Cap Dome
    ctx.beginPath();
    ctx.ellipse(0, -9, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cap Visor / Brim
    ctx.beginPath();
    ctx.ellipse(0, -4, 15, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // White 'M' Emblem Circle
    ctx.beginPath();
    ctx.arc(0, -9, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Red 'M' letter
    ctx.fillStyle = '#E52521';
    ctx.font = 'bold 6px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', 0, -9);
    ctx.restore();

    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 14);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);
  }

  // ==========================================
  // 11. PIKACHU RENDERER
  // ==========================================
  drawPikachu(ctx, pose, acc) {
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
      pawFR_x: pose.pawFR_x || 13,
      pawFR_y: pose.pawFR_y || 0,
      pawBL_x: pose.pawBL_x || -11,
      pawBL_y: pose.pawBL_y || 0,
      pawBR_x: pose.pawBR_x || -5,
      pawBR_y: pose.pawBR_y || 0,
      squishX: pose.squishX || 1.0,
      squishY: pose.squishY || 1.0
    };

    // 1. Zigzag Lightning Bolt Tail
    ctx.save();
    ctx.translate(p.bodyX - 11, p.bodyY + 2);
    ctx.rotate(p.tailAngle * 0.9 - 0.4);

    // Brown Tail Base
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, -6);
    ctx.lineTo(-2, -8);
    ctx.lineTo(2, -2);
    ctx.closePath();
    ctx.fill();

    // Yellow Lightning Zigzags
    ctx.fillStyle = '#FCD116';
    ctx.strokeStyle = '#D4A800';
    ctx.lineWidth = 1.0;
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
    ctx.stroke();
    ctx.restore();

    // 2. 2 Bipedal Yellow Hind Feet (Ground Stepping)
    ctx.save();
    ctx.fillStyle = '#FCD116';
    // Left Hind Foot (Behind)
    ctx.beginPath();
    ctx.ellipse(p.pawBL_x, p.pawBL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right Hind Foot (Front)
    ctx.beginPath();
    ctx.ellipse(p.pawFL_x, p.pawFL_y - 2, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Golden Yellow Chubby Body & Brown Back Stripes
    ctx.save();
    ctx.translate(p.bodyX, p.bodyY);
    ctx.rotate(p.bodyRot);
    ctx.scale(p.squishX, p.squishY);

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 11.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FCD116';
    ctx.fill();

    // Brown Back Stripes
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(-6, -4, 2.5, 5, -0.2, 0, Math.PI * 2);
    ctx.ellipse(0, -5, 2.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2 Cute Tiny Front Paws on Chest
    ctx.fillStyle = '#FCD116';
    ctx.strokeStyle = '#D4A800';
    ctx.lineWidth = 0.8;
    // Left tiny paw
    ctx.beginPath();
    ctx.ellipse(-3, 3, 2.5, 4, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Right tiny paw
    ctx.beginPath();
    ctx.ellipse(4, 3, 2.5, 4, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 4. Head, Long Pointed Ears & Red Cheek Pouches
    ctx.save();
    ctx.translate(p.headX, p.headY);
    ctx.rotate(p.headRot);

    // Left Ear
    ctx.save();
    ctx.translate(-7, -8);
    ctx.rotate(-0.45 + p.earTwitchL);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FCD116';
    ctx.fill();
    // Black tip
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(7, -8);
    ctx.rotate(0.45 + p.earTwitchR);
    ctx.beginPath();
    ctx.ellipse(0, -9, 3.5, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FCD116';
    ctx.fill();
    // Black tip
    ctx.beginPath();
    ctx.ellipse(0, -16, 3.2, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    ctx.restore();

    // Round Head Base
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FCD116';
    ctx.fill();

    // Bright Crimson Red Electric Cheek Pouches
    ctx.fillStyle = '#E83A3A';
    ctx.beginPath();
    ctx.arc(-8, 3, 3.8, 0, Math.PI * 2);
    ctx.arc(8, 3, 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawEyes(ctx, -5, -2, 5, -2, p.eyeState, '#1E1E1E');

    // Tiny Nose
    ctx.fillStyle = '#1E1E1E';
    ctx.beginPath();
    ctx.arc(0, 1.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    this.drawMouth(ctx, 0, 4.5, p.mouthState);
    ctx.restore();

    if (acc && acc.nightcap) this.drawNightcap(ctx, p.headX, p.headY - 10);
    if (acc && acc.headphones) this.drawHeadphones(ctx, p.headX, p.headY);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetRenderer;
}
