/**
 * @file sharedHelpers.js
 * @description Shared 2D Vector Drawing Helpers for Pet Renderers.
 * Provides procedural eye states, mouth expressions, accessories, shadows, and star particles.
 */

const SharedPetHelpers = {
  drawShadow(ctx, pose) {
    const shadowWidth = (pose.shadowWidth || 36) * (pose.squishX || 1.0);
    const shadowHeight = (pose.shadowHeight || 8);
    const shadowOffset = pose.groundOffset || 0;

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0, 5 + shadowOffset, Math.max(10, shadowWidth / 2), Math.max(3, shadowHeight / 2), 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0.1, 0.38 - (pose.groundOffset || 0) * 0.005)})`;
    ctx.fill();
    ctx.restore();
  },

  drawEyes(ctx, lx, rx, eyeY, st, eyeColor = '#1A1A2E') {
    ctx.save();
    if (st === 'open') {
      ctx.beginPath();
      ctx.ellipse(lx, eyeY, 3.5, 4.5, 0, 0, Math.PI * 2);
      ctx.ellipse(rx, eyeY, 3.5, 4.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = eyeColor;
      ctx.fill();

      // Catchlight reflections
      ctx.beginPath();
      ctx.arc(lx - 1, eyeY - 1.5, 1.3, 0, Math.PI * 2);
      ctx.arc(rx - 1, eyeY - 1.5, 1.3, 0, Math.PI * 2);
      ctx.arc(lx + 1.2, eyeY + 1.5, 0.7, 0, Math.PI * 2);
      ctx.arc(rx + 1.2, eyeY + 1.5, 0.7, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    } else if (st === 'blink' || st === 'sleep') {
      ctx.lineWidth = 2;
      ctx.strokeStyle = eyeColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(lx, eyeY, 3.5, 0.2, Math.PI - 0.2);
      ctx.arc(rx, eyeY, 3.5, 0.2, Math.PI - 0.2);
      ctx.stroke();
    } else if (st === 'happy') {
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = eyeColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(lx, eyeY + 1, 3.5, Math.PI + 0.3, -0.3);
      ctx.arc(rx, eyeY + 1, 3.5, Math.PI + 0.3, -0.3);
      ctx.stroke();
    } else if (st === 'wide') {
      ctx.beginPath();
      ctx.ellipse(lx, eyeY, 4.5, 5.5, 0, 0, Math.PI * 2);
      ctx.ellipse(rx, eyeY, 4.5, 5.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = eyeColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lx - 1, eyeY - 2, 2, 0, Math.PI * 2);
      ctx.arc(rx - 1, eyeY - 2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    } else if (st === 'stars') {
      this.drawStar(ctx, lx, eyeY, 4, '#FFE66D');
      this.drawStar(ctx, rx, eyeY, 4, '#FFE66D');
    }
    ctx.restore();
  },

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
  },

  drawMouth(ctx, x, y, state, strokeColor = '#475569') {
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.1;
    ctx.lineCap = 'round';

    if (state === 'w') {
      ctx.beginPath();
      ctx.arc(x - 1.4, y, 1.4, 0.1, Math.PI - 0.2);
      ctx.arc(x + 1.4, y, 1.4, 0.2, Math.PI - 0.1);
      ctx.stroke();
    } else if (state === 'open' || state === 'smile') {
      ctx.beginPath();
      ctx.arc(x, y - 0.5, 2.2, 0.1, Math.PI - 0.1);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      ctx.stroke();
    } else if (state === 'blep') {
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0.1, Math.PI - 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y + 1.8, 1.6, 2.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
    }
    ctx.restore();
  },

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

    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-18, -32, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFE66D';
    ctx.fill();
    ctx.restore();
  },

  drawPixelEyes(ctx, lx, rx, eyeY, st, eyeColor = '#1A1A2E') {
    ctx.save();
    if (st === 'open' || st === 'wide') {
      // 8-bit Square Pixel Eyes
      const sz = st === 'wide' ? 6 : 5;
      ctx.fillStyle = eyeColor;
      ctx.fillRect(Math.round(lx - sz / 2), Math.round(eyeY - sz / 2), sz, sz);
      ctx.fillRect(Math.round(rx - sz / 2), Math.round(eyeY - sz / 2), sz, sz);

      // Square Catchlights
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(Math.round(lx - sz / 2 + 1), Math.round(eyeY - sz / 2 + 1), 2, 2);
      ctx.fillRect(Math.round(rx - sz / 2 + 1), Math.round(eyeY - sz / 2 + 1), 2, 2);
    } else if (st === 'blink' || st === 'sleep') {
      // Horizontal pixel bar
      ctx.fillStyle = eyeColor;
      ctx.fillRect(Math.round(lx - 3), Math.round(eyeY), 6, 2);
      ctx.fillRect(Math.round(rx - 3), Math.round(eyeY), 6, 2);
    } else if (st === 'happy') {
      // Stepped ^-^ pixel arcs
      ctx.fillStyle = eyeColor;
      // Left eye
      ctx.fillRect(Math.round(lx - 3), Math.round(eyeY), 2, 2);
      ctx.fillRect(Math.round(lx - 1), Math.round(eyeY - 2), 2, 2);
      ctx.fillRect(Math.round(lx + 1), Math.round(eyeY), 2, 2);
      // Right eye
      ctx.fillRect(Math.round(rx - 3), Math.round(eyeY), 2, 2);
      ctx.fillRect(Math.round(rx - 1), Math.round(eyeY - 2), 2, 2);
      ctx.fillRect(Math.round(rx + 1), Math.round(eyeY), 2, 2);
    } else if (st === 'stars') {
      // 8-bit Pixel Cross Stars
      ctx.fillStyle = '#FFE66D';
      [lx, rx].forEach(cx => {
        ctx.fillRect(Math.round(cx - 3), Math.round(eyeY - 1), 6, 2);
        ctx.fillRect(Math.round(cx - 1), Math.round(eyeY - 3), 2, 6);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(Math.round(cx - 1), Math.round(eyeY - 1), 2, 2);
        ctx.fillStyle = '#FFE66D';
      });
    }
    ctx.restore();
  },

  drawPixelMouth(ctx, x, y, state) {
    ctx.save();
    ctx.fillStyle = '#1A1A2E';
    const mx = Math.round(x);
    const my = Math.round(y);

    if (state === 'w') {
      ctx.fillRect(mx - 4, my, 2, 2);
      ctx.fillRect(mx - 2, my + 1, 2, 2);
      ctx.fillRect(mx, my, 2, 2);
      ctx.fillRect(mx + 2, my + 1, 2, 2);
      ctx.fillRect(mx + 4, my, 2, 2);
    } else if (state === 'open' || state === 'smile') {
      ctx.fillRect(mx - 3, my, 6, 2);
      ctx.fillRect(mx - 2, my + 2, 4, 2);
      ctx.fillStyle = '#FF758F';
      ctx.fillRect(mx - 2, my + 2, 4, 2);
    } else if (state === 'blep') {
      ctx.fillRect(mx - 3, my, 6, 2);
      ctx.fillStyle = '#FF758F';
      ctx.fillRect(mx - 2, my + 2, 4, 3);
    }
    ctx.restore();
  },

  drawPixelShadow(ctx, pose) {
    const w = Math.round(((pose.shadowWidth || 34) * (pose.squishX || 1.0)) / 4) * 4;
    const h = 6;
    const off = Math.round(pose.groundOffset || 0);

    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    // Stepped pixel oval
    ctx.fillRect(-w / 2 + 4, 4 + off, w - 8, h);
    ctx.fillRect(-w / 2 + 8, 3 + off, w - 16, h + 2);
    ctx.restore();
  },

  drawHeadphones(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, -2, 17, Math.PI * 0.9, Math.PI * 2.1);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F72585';
    ctx.stroke();

    ctx.fillStyle = '#4CC9F0';
    ctx.beginPath();
    ctx.ellipse(-16, 0, 4, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(16, 0, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  drawSakuraFlower(ctx, x, y, size = 6, centerColor = '#FDE047', petalColor = '#F472B6') {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size * 0.6, -size * 0.7, -size * 0.5, -size * 1.3, -size * 0.15, -size * 1.4);
      ctx.lineTo(0, -size * 1.25);
      ctx.lineTo(size * 0.15, -size * 1.4);
      ctx.bezierCurveTo(size * 0.5, -size * 1.3, size * 0.6, -size * 0.7, 0, 0);
      ctx.fillStyle = petalColor;
      ctx.fill();
      ctx.restore();
    }
    // Center Pistil
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();
    ctx.restore();
  },

  drawDriftingSakuraPetals(ctx, originX, originY, count = 3) {
    ctx.save();
    for (let i = 0; i < count; i++) {
      const t = this.time || 0;
      const angle = t * 1.6 + (i * Math.PI * 2) / count;
      const px = originX + Math.cos(angle) * (18 + i * 4);
      const py = originY + Math.sin(angle * 1.2) * (8 + i * 3) + Math.sin(t * 2 + i) * 3;
      const rot = angle + t;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, 3.5, 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#F472B6' : '#FDA4AF';
      ctx.shadowColor = '#F472B6';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
    ctx.restore();
  },

  drawDreamwingStar(ctx, x, y, radius = 5, color = '#FDE047') {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 1.3);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.quadraticCurveTo(0, 0, 0, radius * 1.3);
    ctx.quadraticCurveTo(0, 0, -radius, 0);
    ctx.quadraticCurveTo(0, 0, 0, -radius * 1.3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner White Starlight Gem
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1, radius * 0.3), 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();
  },

  drawDreamwings(ctx, x, y, flap = 0, scale = 1, isMirrored = false) {
    ctx.save();
    ctx.translate(x, y);
    if (isMirrored) ctx.scale(-1, 1);
    ctx.scale(scale, scale);
    ctx.rotate(flap);

    // 1. Top Ethereal Wing Blade
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -18, -26, -22, -22, -6);
    ctx.bezierCurveTo(-20, 2, -10, 4, 0, 0);
    ctx.closePath();

    const gradTop = ctx.createLinearGradient(0, -20, -20, 0);
    gradTop.addColorStop(0, 'rgba(253, 224, 71, 0.9)'); // Gold tip
    gradTop.addColorStop(0.45, 'rgba(192, 132, 252, 0.75)'); // Lavender
    gradTop.addColorStop(1, 'rgba(244, 63, 94, 0.65)'); // Cosmic rose base
    ctx.fillStyle = gradTop;
    ctx.shadowColor = '#C084FC';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#FDE047';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 2. Bottom Secondary Winglet
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-8, 6, -18, 12, -12, 18);
    ctx.bezierCurveTo(-6, 16, -2, 8, 0, 0);
    ctx.closePath();

    const gradBot = ctx.createLinearGradient(0, 0, -15, 15);
    gradBot.addColorStop(0, 'rgba(192, 132, 252, 0.75)');
    gradBot.addColorStop(1, 'rgba(147, 197, 253, 0.85)');
    ctx.fillStyle = gradBot;
    ctx.fill();
    ctx.strokeStyle = '#FDE047';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Starlight Crystal Root
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FDE047';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  },

  drawOrbitingConstellation(ctx, originX, originY, count = 3) {
    ctx.save();
    for (let i = 0; i < count; i++) {
      const t = this.time || 0;
      const angle = t * 1.8 + (i * Math.PI * 2) / count;
      const px = originX + Math.cos(angle) * (20 + i * 3);
      const py = originY + Math.sin(angle * 1.3) * (10 + i * 2) + Math.sin(t * 2.5 + i) * 3;
      const starSize = 2.8 + Math.sin(t * 3 + i) * 0.9;
      this.drawDreamwingStar(ctx, px, py, starSize, i % 2 === 0 ? '#FDE047' : '#C084FC');
    }
    ctx.restore();
  }
};

if (typeof window !== 'undefined') window.SharedPetHelpers = SharedPetHelpers;
if (typeof globalThis !== 'undefined') globalThis.SharedPetHelpers = SharedPetHelpers;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharedPetHelpers;
}
