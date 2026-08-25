/**
 * @file enginePhysics.js
 * @description Floor Baseline Computation, Canvas Resize, and 60 FPS Kinematics & Gravity Physics.
 */

const EnginePhysics = {
  /**
   * Computes the vertical floor baseline in canvas coordinates based on ground mode.
   * @returns {number} Target floor Y coordinate
   */
  calculateFloorY() {
    const tbH = this.taskbarHeight || 48;
    const winScreenH = (typeof window !== 'undefined' && window.screen) ? window.screen.height : 0;
    const winInnerH = (typeof window !== 'undefined') ? window.innerHeight : 0;
    const totalH = Math.max(winScreenH, winInnerH, this.canvas?.height || 0, 1080);
    let baseFloor = totalH - 4;

    if (this.groundMode === 'taskbar_top') {
      baseFloor = totalH - tbH + 4;
    }

    return baseFloor + (this.floorOffset || 0);
  },

  /**
   * Resizes canvas to match overlay window viewport and recalculates ground baseline.
   */
  resize() {
    const winScreenW = (typeof window !== 'undefined' && window.screen) ? window.screen.width : 0;
    const winInnerW = (typeof window !== 'undefined') ? window.innerWidth : 0;
    const winScreenH = (typeof window !== 'undefined' && window.screen) ? window.screen.height : 0;
    const winInnerH = (typeof window !== 'undefined') ? window.innerHeight : 0;
    const totalW = Math.max(winScreenW, winInnerW, this.canvas?.width || 0, 1920);
    const totalH = Math.max(winScreenH, winInnerH, this.canvas?.height || 0, 1080);
    this.canvas.width = totalW;
    this.canvas.height = totalH;
    this.floorY = this.calculateFloorY();
    if (!this.isDragging && this.transitioner.currentState !== 'fall') {
      this.y = this.floorY;
      this.vy = 0;
    }
  },

  /**
   * Updates ground configuration, fine-tuning offset, and taskbar height.
   * @param {string} [mode] - Ground mode ('taskbar_bottom' or 'taskbar_top')
   * @param {number} [offset] - Vertical fine-tuning offset
   * @param {number} [tbH] - Taskbar height in pixels
   */
  setGroundConfig(mode, offset, tbH) {
    if (mode !== undefined && mode !== null) this.groundMode = mode;
    if (offset !== undefined && offset !== null) this.floorOffset = offset;
    if (tbH !== undefined && tbH !== null) this.taskbarHeight = tbH;
    this.floorY = this.calculateFloorY();

    if (!this.hasInitializedBaseline || (!this.isDragging && this.transitioner.currentState !== 'fall')) {
      this.y = this.floorY;
      this.vy = 0;
    }
    this.hasInitializedBaseline = true;
  },

  /**
   * Executes gravity acceleration, ground collision handling, and screen boundary reflection.
   * @param {number} dt - Delta time in seconds
   * @param {Object} stateInfo - Current state payload
   */
  updatePhysics(dt, stateInfo) {
    if (this.isDragging) return;

    if (this.y < this.floorY) {
      // Gravity acceleration
      this.vy += this.gravity * dt;
      this.y += this.vy * dt;

      if (this.y >= this.floorY) {
        const impactSpeed = this.vy;
        this.y = this.floorY;
        this.vy = 0;
        if (impactSpeed > 450) {
          this.particles.spawnWarpTeleport(this.x, this.y - 120, this.x, this.floorY, this.species);
        }
        this.transitioner.handleGroundLanding(this);
      }
    } else {
      // Smooth asymptotic damping towards baseline
      if (Math.abs(this.y - this.floorY) > 0.5) {
        this.y += (this.floorY - this.y) * Math.min(1.0, 18.0 * dt);
      } else {
        this.y = this.floorY;
      }
      this.vy = 0;

      // Auto-recover if at ground level but still trapped in a fall or drag state
      if (this.transitioner.currentState === 'fall' || this.transitioner.currentState === 'drag') {
        this.particles.spawnWarpTeleport(this.x, this.y - 100, this.x, this.floorY, this.species);
        this.transitioner.handleGroundLanding(this);
      }

      // Lock horizontal speed during sleep
      if (stateInfo.state === 'sleep') {
        this.vx = 0;
      }

      // Horizontal roaming
      this.x += this.vx * dt;

      // Screen boundary bounce
      const margin = 40;
      if (this.x < margin) {
        this.x = margin;
        this.vx = Math.abs(this.vx);
        this.facing = 1;
      } else if (this.x > this.canvas.width - margin) {
        this.x = this.canvas.width - margin;
        this.vx = -Math.abs(this.vx);
        this.facing = -1;
      }
    }
  }
};

if (typeof window !== 'undefined') window.EnginePhysics = EnginePhysics;
if (typeof globalThis !== 'undefined') globalThis.EnginePhysics = EnginePhysics;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnginePhysics;
}
