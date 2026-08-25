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

  drawMouth(ctx, x, y, state) {
    ctx.save();
    ctx.strokeStyle = '#1A1A2E';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';

    if (state === 'w') {
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
      ctx.beginPath();
      ctx.arc(x - 2, y, 2, 0.1, Math.PI - 0.2);
      ctx.arc(x + 2, y, 2, 0.2, Math.PI - 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 2.5, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FF758F';
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
  }
};

if (typeof window !== 'undefined') window.SharedPetHelpers = SharedPetHelpers;
if (typeof globalThis !== 'undefined') globalThis.SharedPetHelpers = SharedPetHelpers;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharedPetHelpers;
}
