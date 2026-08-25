/**
 * @file engineInput.js
 * @description Pointer & Mouse Event Listeners, Drag-and-Drop, Continuous Petting Detection.
 */

const EngineInput = {
  /**
   * Registers global pointer events and pointer capture handlers.
   */
  setupMouseEvents() {
    this.isHovering = false;
    this.dragPointerId = null;
    this.lastDragTime = 0;

    // Pointer Down (Global capture prevents mid-air release loss)
    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.button === 0 && this.isPointInsidePet(e.clientX, e.clientY)) {
        this.isDragging = true;
        this.dragPointerId = e.pointerId;
        this.lastDragTime = performance.now();
        this.canvas.style.cursor = 'grabbing';
        this.dragOffsetX = e.clientX - this.x;
        this.dragOffsetY = e.clientY - this.y;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;

        try {
          this.canvas.setPointerCapture(e.pointerId);
        } catch (err) {}

        if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
          window.electronAPI.setInteractiveRegion(true);
        }
        this.transitioner.handleDragStart(this);
      }
    });

    // Pointer Move
    window.addEventListener('pointermove', (e) => {
      // Safety check: Release drag immediately if primary button is released
      if (this.isDragging && (e.buttons & 1) === 0) {
        this.releaseDrag(e.clientX, e.clientY);
        return;
      }

      const isInside = this.isPointInsidePet(e.clientX, e.clientY);
      const shouldBeInteractive = isInside || this.isDragging;

      if (shouldBeInteractive !== this.isHovering) {
        this.isHovering = shouldBeInteractive;
        this.canvas.style.cursor = this.isDragging ? 'grabbing' : (isInside ? 'grab' : 'default');
        if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
          window.electronAPI.setInteractiveRegion(shouldBeInteractive);
        }
      }

      // Petting detection: moving cursor over pet while resting comfortably on the ground
      const isRestingOnGround = this.y >= this.floorY - 25 &&
        this.transitioner.currentState !== 'fall' &&
        this.transitioner.currentState !== 'landing' &&
        this.transitioner.currentState !== 'drag';

      if (!this.isDragging && isInside && isRestingOnGround) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.pettingDistance += dist;

        if (this.pettingDistance >= 30) {
          this.pettingDistance = 0;
          this.transitioner.handlePetting(this);
        }
      } else {
        this.pettingDistance *= 0.85;
      }

      // Drag translation
      if (this.isDragging) {
        this.lastDragTime = performance.now();
        const targetX = e.clientX - this.dragOffsetX;
        const targetY = e.clientY - this.dragOffsetY;
        const dragDx = targetX - this.x;

        if (Math.abs(dragDx) > 2) {
          this.facing = dragDx > 0 ? 1 : -1;
        }

        this.x = Math.max(20, Math.min(this.canvas.width - 20, targetX));
        // Clamp top drag bound to keep pet within visible viewport
        this.y = Math.max(40, Math.min(this.floorY + 20, targetY));
      }

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    // Pointer Up & Cancellation Handlers
    const handlePointerEnd = (e) => {
      if (this.isDragging) {
        if (this.dragPointerId !== null) {
          try {
            this.canvas.releasePointerCapture(this.dragPointerId);
          } catch (err) {}
          this.dragPointerId = null;
        }
        this.releaseDrag(e?.clientX, e?.clientY);
      }
    };

    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    window.addEventListener('mouseup', handlePointerEnd);
    window.addEventListener('mouseleave', handlePointerEnd);
    window.addEventListener('blur', () => {
      if (this.isDragging) this.releaseDrag();
    });
  },

  /**
   * Safely ends dragging state, restores cursor, and triggers drop physics.
   * @param {number} [clientX]
   * @param {number} [clientY]
   */
  releaseDrag(clientX, clientY) {
    if (!this.isDragging) return;
    const oldY = this.y;
    this.isDragging = false;
    this.canvas.style.cursor = 'default';

    if (this.y < this.floorY - 6) {
      this.vy = 0; // Clean start for gravity fall
      this.transitioner.handleDrop(this);
    } else {
      this.y = this.floorY;
      this.vy = 0;
      this.particles.spawnWarpTeleport(this.x, oldY - 40, this.x, this.floorY, this.species);
      this.transitioner.handleGroundLanding(this);
    }

    const isInside = (clientX !== undefined && clientY !== undefined) ? this.isPointInsidePet(clientX, clientY) : false;
    this.isHovering = isInside;
    if (window.electronAPI && window.electronAPI.setInteractiveRegion) {
      window.electronAPI.setInteractiveRegion(isInside);
    }
  },

  /**
   * Hit-test bounding box evaluation for mouse interaction.
   * @param {number} px - Point X
   * @param {number} py - Point Y
   * @returns {boolean}
   */
  isPointInsidePet(px, py) {
    const boxW = 92 * this.scale;
    const boxH = 92 * this.scale;
    const minX = this.x - boxW / 2;
    const maxX = this.x + boxW / 2;
    const minY = this.y - boxH - 16 * this.scale;
    const maxY = this.y + 20 * this.scale;
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
  }
};

if (typeof window !== 'undefined') window.EngineInput = EngineInput;
if (typeof globalThis !== 'undefined') globalThis.EngineInput = EngineInput;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EngineInput;
}
