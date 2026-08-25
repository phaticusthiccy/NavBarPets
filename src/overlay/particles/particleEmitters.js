/**
 * @file particleEmitters.js
 * @description Particle Emitter Triggers & Species-Exclusive Petting VFX Spawners.
 */

const ParticleEmitters = {
  /**
   * Spawns an ultra-vibrant, multi-layered species-specific petting reaction.
   * @param {number} x - Origin X
   * @param {number} y - Origin Y
   * @param {string} [species='neko'] - Pet species key
   */
  spawnPettingReaction(x, y, species = 'neko') {
    const themeColors = {
      neko: { glow: '#FF4D6D', stroke: 'rgba(255, 77, 109, 0.85)' },
      shiba: { glow: '#FFB703', stroke: 'rgba(255, 183, 3, 0.85)' },
      slime: { glow: '#00F5D4', stroke: 'rgba(0, 245, 212, 0.85)' },
      dragon: { glow: '#FF4800', stroke: 'rgba(255, 72, 0, 0.85)' },
      duck: { glow: '#FFD166', stroke: 'rgba(255, 209, 102, 0.85)' },
      fox: { glow: '#C77DFF', stroke: 'rgba(199, 125, 255, 0.85)' },
      bunny: { glow: '#FF85A1', stroke: 'rgba(255, 133, 161, 0.85)' },
      penguin: { glow: '#4CC9F0', stroke: 'rgba(76, 201, 240, 0.85)' },
      jett: { glow: '#2EC4B6', stroke: 'rgba(46, 196, 182, 0.85)' },
      mario: { glow: '#E63946', stroke: 'rgba(230, 57, 70, 0.85)' },
      pikachu: { glow: '#FFE600', stroke: 'rgba(255, 230, 0, 0.85)' },
      cyberleek: { glow: '#10B981', stroke: 'rgba(16, 185, 129, 0.85)' },
      bull: { glow: '#F59E0B', stroke: 'rgba(245, 158, 11, 0.85)' }
    };
    const theme = themeColors[species] || themeColors.neko;

    this.particles.push({
      type: 'shockwave',
      x: x,
      y: y - 10,
      vx: 0,
      vy: -5,
      radiusX: 12,
      radiusY: 6,
      growthX: 75,
      growthY: 40,
      initialLineWidth: 3.5,
      lineWidth: 3.5,
      color: theme.stroke,
      glowColor: theme.glow,
      initialScale: 1.0,
      scale: 1.0,
      age: 0,
      maxAge: 0.65,
      alpha: 1.0
    });

    const heartHues = {
      neko: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FF0054'],
      shiba: ['#FFB703', '#FB8500', '#FFD166', '#FF9E00'],
      slime: ['#00F5D4', '#70E000', '#38B000', '#00BBF9'],
      dragon: ['#FF4800', '#FF0054', '#FF5400', '#FFE600'],
      duck: ['#FFD166', '#FFB703', '#F72585', '#FFF3B0'],
      fox: ['#C77DFF', '#9D4EDD', '#7B2CBF', '#E0AAFF'],
      bunny: ['#FF85A1', '#F72585', '#FFC6FF', '#BDB2FF'],
      penguin: ['#4CC9F0', '#4895EF', '#4361EE', '#E0FBFC'],
      jett: ['#2EC4B6', '#00F5D4', '#CBF3F0', '#38BDF8'],
      mario: ['#E63946', '#F72585', '#FFB703', '#FF4D6D'],
      pikachu: ['#FFE600', '#FFD000', '#FF9E00', '#FFF3B0'],
      cyberleek: ['#10B981', '#00F5D4', '#6EE7B7', '#A7F3D0'],
      bull: ['#F59E0B', '#EF4444', '#FDE047', '#FB923C']
    };
    const hues = heartHues[species] || heartHues.neko;

    const heartCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < heartCount; i++) {
      const angle = -Math.PI / 2 + (Math.random() * 0.9 - 0.45);
      const speed = 40 + Math.random() * 45;
      this.particles.push({
        type: 'cool_heart',
        x: x + (Math.random() * 24 - 12),
        y: y - 20 + (Math.random() * 10 - 5),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: -10,
        wobbleSpeed: 6 + Math.random() * 4,
        wobbleAmount: 0.8,
        rotation: (Math.random() * 0.4 - 0.2),
        rotationSpeed: (Math.random() * 2 - 1),
        color: hues[i % hues.length],
        glowColor: theme.glow,
        glowBlur: 10,
        size: 9 + Math.random() * 4,
        initialScale: 1.0 + Math.random() * 0.3,
        age: 0,
        maxAge: 1.1 + Math.random() * 0.4,
        alpha: 1.0
      });
    }

    this.spawnSpeciesSpecial(x, y, species);

    for (let i = 0; i < 4; i++) {
      this.particles.push({
        type: 'star_sparkle',
        x: x + (Math.random() * 50 - 25),
        y: y - 25 + (Math.random() * 30 - 15),
        vx: (Math.random() * 40 - 20),
        vy: -(25 + Math.random() * 30),
        gravity: -5,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() * 4 - 2),
        color: hues[Math.floor(Math.random() * hues.length)],
        glowColor: '#FFFFFF',
        radius: 4 + Math.random() * 3,
        initialScale: 1.0,
        age: 0,
        maxAge: 0.8 + Math.random() * 0.4,
        alpha: 1.0
      });
    }
  },

  /**
   * Spawns species-exclusive signature particles.
   * @param {number} x
   * @param {number} y
   * @param {string} species
   * @param {number} [speedMultiplier=1]
   */
  spawnSpeciesSpecial(x, y, species, speedMultiplier = 1) {
    const spd = speedMultiplier || 1.0;
    switch (species) {
      case 'neko':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'paw_print',
            x: x + (Math.random() * 36 - 18),
            y: y - 18 + (Math.random() * 14 - 7),
            vx: (Math.random() * 28 - 14) * spd,
            vy: -(30 + Math.random() * 30) * spd,
            gravity: -8,
            rotation: (Math.random() * 0.6 - 0.3),
            color: '#FF758F',
            glowColor: '#FF4D6D',
            initialScale: 0.9 + Math.random() * 0.3,
            age: 0,
            maxAge: 1.2 + Math.random() * 0.3,
            alpha: 1.0
          });
        }
        break;

      case 'shiba':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'bone',
            x: x + (Math.random() * 34 - 17),
            y: y - 20,
            vx: (Math.random() * 40 - 20) * spd,
            vy: -(35 + Math.random() * 35) * spd,
            gravity: 12,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() * 5 - 2.5),
            color: '#FFF3B0',
            glowColor: '#FFB703',
            initialScale: 0.9 + Math.random() * 0.3,
            age: 0,
            maxAge: 1.1 + Math.random() * 0.3,
            alpha: 1.0
          });
        }
        break;

      case 'slime':
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            type: 'bubble_drop',
            x: x + (Math.random() * 30 - 15),
            y: y - 15,
            vx: (Math.random() * 45 - 22.5) * spd,
            vy: -(30 + Math.random() * 40) * spd,
            gravity: -12,
            radius: 5 + Math.random() * 4,
            color: 'rgba(0, 245, 212, 0.75)',
            glowColor: '#00F5D4',
            initialScale: 1.0,
            age: 0,
            maxAge: 1.2,
            alpha: 1.0
          });
        }
        break;

      case 'dragon':
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            type: 'flame_ember',
            x: x + (Math.random() * 26 - 13),
            y: y - 20,
            vx: (Math.random() * 50 - 25) * spd,
            vy: -(45 + Math.random() * 40) * spd,
            gravity: -18,
            rotationSpeed: (Math.random() * 6 - 3),
            color: ['#FF4800', '#FF7900', '#FFE600'][i % 3],
            glowColor: '#FF4800',
            radius: 4 + Math.random() * 3,
            initialScale: 1.1,
            age: 0,
            maxAge: 1.0 + Math.random() * 0.3,
            alpha: 1.0
          });
        }
        break;

      case 'duck':
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            type: 'water_drop',
            x: x + (Math.random() * 28 - 14),
            y: y - 15,
            vx: (Math.random() * 40 - 20) * spd,
            vy: -(35 + Math.random() * 30) * spd,
            gravity: 25,
            color: '#4CC9F0',
            glowColor: '#70D6FF',
            initialScale: 0.9 + Math.random() * 0.3,
            age: 0,
            maxAge: 0.9 + Math.random() * 0.3,
            alpha: 1.0
          });
        }
        break;

      case 'fox':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'spirit_flame',
            x: x + (Math.random() * 30 - 15),
            y: y - 20,
            vx: (Math.random() * 30 - 15) * spd,
            vy: -(30 + Math.random() * 30) * spd,
            gravity: -15,
            wobbleSpeed: 5,
            wobbleAmount: 1.2,
            color: ['#C77DFF', '#E0AAFF', '#9D4EDD'][i % 3],
            glowColor: '#C77DFF',
            initialScale: 1.0 + Math.random() * 0.3,
            age: 0,
            maxAge: 1.3,
            alpha: 1.0
          });
        }
        break;

      case 'bunny':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'carrot',
            x: x + (Math.random() * 30 - 15),
            y: y - 20,
            vx: (Math.random() * 36 - 18) * spd,
            vy: -(40 + Math.random() * 30) * spd,
            gravity: 16,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() * 6 - 3),
            initialScale: 0.95 + Math.random() * 0.25,
            age: 0,
            maxAge: 1.1,
            alpha: 1.0
          });
        }
        break;

      case 'penguin':
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            type: 'snowflake',
            x: x + (Math.random() * 32 - 16),
            y: y - 20,
            vx: (Math.random() * 26 - 13) * spd,
            vy: -(25 + Math.random() * 25) * spd,
            gravity: -6,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() * 2 - 1),
            color: '#E0FBFC',
            glowColor: '#4CC9F0',
            initialScale: 0.9 + Math.random() * 0.3,
            age: 0,
            maxAge: 1.3,
            alpha: 1.0
          });
        }
        break;

      case 'jett':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'wind_blade',
            x: x + (Math.random() * 24 - 12),
            y: y - 20,
            vx: (Math.random() * 55 - 27.5) * spd,
            vy: -(35 + Math.random() * 35) * spd,
            gravity: -10,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() * 8 - 4),
            color: '#2EC4B6',
            glowColor: '#00F5D4',
            initialScale: 1.0 + Math.random() * 0.3,
            age: 0,
            maxAge: 0.9,
            alpha: 1.0
          });
        }
        break;

      case 'mario':
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            type: 'coin',
            x: x + (Math.random() * 30 - 15),
            y: y - 20,
            vx: (Math.random() * 36 - 18) * spd,
            vy: -(45 + Math.random() * 30) * spd,
            gravity: 20,
            rotation: 0,
            rotationSpeed: 10 + Math.random() * 6,
            initialScale: 1.0 + Math.random() * 0.2,
            age: 0,
            maxAge: 1.1,
            alpha: 1.0
          });
        }
        break;

      case 'pikachu':
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            type: 'lightning_bolt',
            x: x + (Math.random() * 32 - 16),
            y: y - 20,
            vx: (Math.random() * 45 - 22.5) * spd,
            vy: -(40 + Math.random() * 35) * spd,
            gravity: -5,
            rotation: (Math.random() * 0.8 - 0.4),
            rotationSpeed: (Math.random() * 4 - 2),
            color: '#FFE600',
            glowColor: '#FFD000',
            initialScale: 1.1 + Math.random() * 0.3,
            age: 0,
            maxAge: 0.85,
            alpha: 1.0
          });
        }
        break;
    }
  },

  /**
   * Spawns an ultra-cool, cinematic Cyber Warp / Lightning Meteor dive effect.
   * @param {number} fromX
   * @param {number} fromY
   * @param {number} toX
   * @param {number} toY
   * @param {string} [species='neko']
   */
  spawnWarpTeleport(fromX, fromY, toX, toY, species = 'neko') {
    const themeColors = {
      neko: { glow: '#FF4D6D', stroke: '#FF758F', core: '#FFFFFF' },
      shiba: { glow: '#FFB703', stroke: '#FB8500', core: '#FFE29A' },
      slime: { glow: '#00F5D4', stroke: '#70E000', core: '#FFFFFF' },
      dragon: { glow: '#FF4800', stroke: '#FF7900', core: '#FFE600' },
      duck: { glow: '#FFD166', stroke: '#F77F00', core: '#FFFFFF' },
      fox: { glow: '#C77DFF', stroke: '#9D4EDD', core: '#FFFFFF' },
      bunny: { glow: '#FF85A1', stroke: '#F72585', core: '#FFFFFF' },
      penguin: { glow: '#4CC9F0', stroke: '#4895EF', core: '#E0FBFC' },
      jett: { glow: '#2EC4B6', stroke: '#00F5D4', core: '#FFFFFF' },
      mario: { glow: '#E63946', stroke: '#FFB703', core: '#FFFFFF' },
      pikachu: { glow: '#FFE600', stroke: '#FFB703', core: '#FFFFFF' }
    };
    const theme = themeColors[species] || themeColors.neko;

    this.particles.push({
      type: 'warp_beam',
      x: toX,
      y: toY,
      vx: 0,
      vy: 0,
      width: 32,
      height: Math.max(150, Math.abs(toY - fromY) + 100),
      color: theme.stroke,
      glowColor: theme.glow,
      initialScale: 1.0,
      scale: 1.0,
      age: 0,
      maxAge: 0.35,
      alpha: 1.0
    });

    this.particles.push({
      type: 'warp_shockwave',
      x: toX,
      y: toY,
      vx: 0,
      vy: 0,
      radiusX: 8,
      radiusY: 4,
      growthX: 110,
      growthY: 55,
      initialLineWidth: 4.5,
      lineWidth: 4.5,
      color: theme.stroke,
      glowColor: theme.glow,
      initialScale: 1.0,
      scale: 1.0,
      age: 0,
      maxAge: 0.5,
      alpha: 1.0
    });

    if (species === 'pikachu' || species === 'dragon') {
      this.particles.push({
        type: 'lightning_strike',
        x: toX,
        y: toY,
        vx: 0,
        vy: 0,
        height: Math.max(160, Math.abs(toY - fromY) + 80),
        seed: Math.random() * 10,
        color: theme.stroke,
        glowColor: theme.glow,
        lineWidth: 3.5,
        initialScale: 1.0,
        scale: 1.0,
        age: 0,
        maxAge: 0.28,
        alpha: 1.0
      });
    }

    for (let i = 0; i < 5; i++) {
      this.particles.push({
        type: 'speed_line',
        x: toX + (Math.random() * 40 - 20),
        y: toY - (Math.random() * 80 + 20),
        vx: (Math.random() * 20 - 10),
        vy: 120 + Math.random() * 100,
        length: 25 + Math.random() * 30,
        lineWidth: 2 + Math.random() * 1.5,
        color: theme.core,
        glowColor: theme.glow,
        initialScale: 1.0,
        scale: 1.0,
        age: 0,
        maxAge: 0.25 + Math.random() * 0.15,
        alpha: 1.0
      });
    }

    this.spawnDust(toX, toY + 6, 8);
    this.spawnSpeciesSpecial(toX, toY - 10, species, 0);
  },

  spawnHeart(x, y) {
    this.spawnPettingReaction(x, y, 'neko');
  },

  spawnMusicNotes(x, y, count = 2) {
    const symbols = ['♪', '♫', '♬', '♩'];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A06CD5', '#FF9F1C', '#2EC4B6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: 'note',
        x: x + (Math.random() * 40 - 20),
        y: y - 20 + (Math.random() * 10 - 5),
        vx: (Math.random() * 30 - 15),
        vy: -(30 + Math.random() * 35),
        gravity: -5,
        wobbleSpeed: 4 + Math.random() * 4,
        wobbleAmount: 0.8,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        initialScale: 1 + Math.random() * 0.4,
        age: 0,
        maxAge: 1.4 + Math.random() * 0.8,
        alpha: 1
      });
    }
  },

  spawnZzz(x, y) {
    const zList = ['z', 'Z', 'Zzz'];
    const text = zList[Math.floor(Math.random() * zList.length)];
    this.particles.push({
      type: 'zzz',
      x: x + 15 + (Math.random() * 10 - 5),
      y: y - 20,
      vx: 12 + Math.random() * 15,
      vy: -(18 + Math.random() * 12),
      gravity: -2,
      wobbleSpeed: 2.5,
      wobbleAmount: 0.6,
      text: text,
      color: '#A0C4FF',
      initialScale: 0.9 + Math.random() * 0.4,
      age: 0,
      maxAge: 2.2 + Math.random() * 0.6,
      alpha: 1
    });
  },

  spawnEmote(x, y, emote = '!') {
    this.particles.push({
      type: 'emote',
      x: x,
      y: y - 40,
      vx: 0,
      vy: -15,
      gravity: 5,
      emote: emote,
      color: emote === '!' ? '#FFD166' : '#06D6A0',
      initialScale: 1.3,
      age: 0,
      maxAge: 1.0,
      alpha: 1
    });
  },

  spawnDust(x, y, count = 4) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / (count + 1)) * (i + 1) + (Math.random() * 0.2 - 0.1);
      const speed = 25 + Math.random() * 30;
      this.particles.push({
        type: 'dust',
        x: x + (Math.random() * 20 - 10),
        y: y,
        vx: Math.cos(angle) * speed * (i % 2 === 0 ? 1 : -1),
        vy: -Math.abs(Math.sin(angle) * speed * 0.6),
        gravity: 30,
        color: 'rgba(230, 235, 245, 0.7)',
        initialScale: 0.7 + Math.random() * 0.6,
        age: 0,
        maxAge: 0.5 + Math.random() * 0.3,
        alpha: 0.8
      });
    }
  },

  spawnSweat(x, y) {
    this.particles.push({
      type: 'sweat',
      x: x + 15,
      y: y - 25,
      vx: 8,
      vy: -10,
      gravity: 40,
      color: '#4CC9F0',
      initialScale: 0.8,
      age: 0,
      maxAge: 0.8,
      alpha: 1
    });
  },

  spawnFlame(x, y, dir = 1) {
    const colors = ['#FF4800', '#FF7900', '#FFB000', '#FFE600'];
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        type: 'flame_ember',
        x: x + dir * 15,
        y: y - 10 + (Math.random() * 8 - 4),
        vx: dir * (40 + Math.random() * 30),
        vy: (Math.random() * 20 - 10) - 10,
        gravity: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowColor: '#FF4800',
        radius: 4 + Math.random() * 3,
        initialScale: 0.7 + Math.random() * 0.5,
        age: 0,
        maxAge: 0.6 + Math.random() * 0.3,
        alpha: 0.9
      });
    }
  }
};

if (typeof window !== 'undefined') window.ParticleEmitters = ParticleEmitters;
if (typeof globalThis !== 'undefined') globalThis.ParticleEmitters = ParticleEmitters;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleEmitters;
}
