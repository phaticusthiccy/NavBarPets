/**
 * @file petRenderer.js
 * @description Master Dispatcher for 2D Procedural Pet Renderers.
 * Aggregates modular species renderers (Neko, Shiba, Slime, Dragon, Duck, Fox, Bunny, Penguin, Jett, Mario, Pikachu)
 * and coordinates skeletal transformations, ground shadows, squash & stretch, and accessory attachments.
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
      skin = 'cool',
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
    if (this.drawShadow) {
      this.drawShadow(ctx, pose);
    }

    // Render species with active skin
    switch (species) {
      case 'neko':
        this.drawNeko(ctx, pose, accessories, skin);
        break;
      case 'shiba':
        this.drawShiba(ctx, pose, accessories, skin);
        break;
      case 'slime':
        this.drawCyberSlime(ctx, pose, accessories, skin);
        break;
      case 'dragon':
        this.drawMiniDragon(ctx, pose, accessories, skin);
        break;
      case 'duck':
        this.drawPixelDuck(ctx, pose, accessories, skin);
        break;
      case 'fox':
        this.drawFox(ctx, pose, accessories, skin);
        break;
      case 'bunny':
        this.drawBunny(ctx, pose, accessories, skin);
        break;
      case 'penguin':
        this.drawPenguin(ctx, pose, accessories, skin);
        break;
      case 'jett':
        this.drawJett(ctx, pose, accessories, skin);
        break;
      case 'mario':
        this.drawMario(ctx, pose, accessories, skin);
        break;
      case 'pikachu':
        this.drawPikachu(ctx, pose, accessories, skin);
        break;
      default:
        this.drawNeko(ctx, pose, accessories, skin);
    }

    ctx.restore();
  }
}

// In Node.js environment, require and attach modular renderers
const resolveRendererModule = (name, path) => {
  if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof require !== 'undefined') {
    try { return require(path); } catch (e) {}
  }
  return null;
};

const _SharedPetHelpers = resolveRendererModule('SharedPetHelpers', './renderers/sharedHelpers.js');
const _NekoRenderer = resolveRendererModule('NekoRenderer', './renderers/nekoRenderer.js');
const _ShibaRenderer = resolveRendererModule('ShibaRenderer', './renderers/shibaRenderer.js');
const _SlimeRenderer = resolveRendererModule('SlimeRenderer', './renderers/slimeRenderer.js');
const _DragonRenderer = resolveRendererModule('DragonRenderer', './renderers/dragonRenderer.js');
const _DuckRenderer = resolveRendererModule('DuckRenderer', './renderers/duckRenderer.js');
const _FoxRenderer = resolveRendererModule('FoxRenderer', './renderers/foxRenderer.js');
const _BunnyRenderer = resolveRendererModule('BunnyRenderer', './renderers/bunnyRenderer.js');
const _PenguinRenderer = resolveRendererModule('PenguinRenderer', './renderers/penguinRenderer.js');
const _JettRenderer = resolveRendererModule('JettRenderer', './renderers/jettRenderer.js');
const _MarioRenderer = resolveRendererModule('MarioRenderer', './renderers/marioRenderer.js');
const _PikachuRenderer = resolveRendererModule('PikachuRenderer', './renderers/pikachuRenderer.js');

if (_SharedPetHelpers) Object.assign(PetRenderer.prototype, _SharedPetHelpers);
if (_NekoRenderer) Object.assign(PetRenderer.prototype, _NekoRenderer);
if (_ShibaRenderer) Object.assign(PetRenderer.prototype, _ShibaRenderer);
if (_SlimeRenderer) Object.assign(PetRenderer.prototype, _SlimeRenderer);
if (_DragonRenderer) Object.assign(PetRenderer.prototype, _DragonRenderer);
if (_DuckRenderer) Object.assign(PetRenderer.prototype, _DuckRenderer);
if (_FoxRenderer) Object.assign(PetRenderer.prototype, _FoxRenderer);
if (_BunnyRenderer) Object.assign(PetRenderer.prototype, _BunnyRenderer);
if (_PenguinRenderer) Object.assign(PetRenderer.prototype, _PenguinRenderer);
if (_JettRenderer) Object.assign(PetRenderer.prototype, _JettRenderer);
if (_MarioRenderer) Object.assign(PetRenderer.prototype, _MarioRenderer);
if (_PikachuRenderer) Object.assign(PetRenderer.prototype, _PikachuRenderer);

if (typeof window !== 'undefined') window.PetRenderer = PetRenderer;
if (typeof globalThis !== 'undefined') globalThis.PetRenderer = PetRenderer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetRenderer;
}
