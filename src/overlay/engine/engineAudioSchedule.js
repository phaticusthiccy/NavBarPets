/**
 * @file engineAudioSchedule.js
 * @description Audio Reactive Subscriptions, Media State Sync, and Circadian Sleep Scheduling.
 */

const EngineAudioSchedule = {
  /**
   * Updates audio & dance configuration and triggers/stops dancing immediately based on active music state.
   * @param {boolean} enabled - Whether dance is enabled
   * @param {number} [sensitivity] - Sensitivity value
   */
  setAudioDanceConfig(enabled, sensitivity) {
    if (enabled !== undefined) {
      this.audioDanceEnabled = !!enabled;
      this.audio.enabled = !!enabled;
      if (this.audioDanceEnabled) {
        if (typeof this.audio.start === 'function') this.audio.start();
      } else {
        if (typeof this.audio.stop === 'function') this.audio.stop();
      }
    }
    if (sensitivity !== undefined) {
      this.audio.sensitivity = sensitivity;
    }

    if (this.audioDanceEnabled && this.isMusicActive) {
      if (this.transitioner.currentState !== 'sleep' && 
          this.transitioner.currentState !== 'drag' && 
          this.transitioner.currentState !== 'fall' && 
          this.transitioner.currentState !== 'landing' && 
          !this.isDragging && 
          this.transitioner.currentState !== 'dance') {
        this.transitioner.handleMusicStart(this);
      }
    } else {
      if (this.transitioner.currentState === 'dance') {
        this.transitioner.handleMusicStop(this);
      }
    }
  },

  /**
   * Updates real-time media playback state from Electron main process.
   * @param {Object} status - Media status payload
   */
  setMediaStatus(status) {
    if (!status) return;
    this.lastMediaStatus = status;

    if (this.isTestDancing) return;

    this.isMusicActive = !!status.isPlaying;

    if (this.isMusicActive && this.audioDanceEnabled) {
      if (this.transitioner.currentState !== 'sleep' && 
          this.transitioner.currentState !== 'drag' && 
          this.transitioner.currentState !== 'fall' && 
          this.transitioner.currentState !== 'landing' && 
          !this.isDragging && 
          this.transitioner.currentState !== 'dance') {
        this.transitioner.handleMusicStart(this);
      }
    } else {
      if (this.transitioner.currentState === 'dance') {
        this.transitioner.handleMusicStop(this);
      }
    }
  },

  /**
   * Triggers a temporary test music dance sequence.
   * @param {number} [durationSec=5.0]
   */
  triggerTestDance(durationSec = 5.0) {
    if (this.transitioner.currentState === 'sleep' || 
        this.transitioner.currentState === 'drag' || 
        this.transitioner.currentState === 'fall' || 
        this.isDragging) {
      return;
    }
    this.isTestDancing = true;
    this.isMusicActive = true;
    this.transitioner.handleMusicStart(this);

    if (this.testDanceTimeout) {
      clearTimeout(this.testDanceTimeout);
    }

    this.testDanceTimeout = setTimeout(() => {
      this.isTestDancing = false;
      if (!this.lastMediaStatus || !this.lastMediaStatus.isPlaying) {
        this.isMusicActive = false;
        this.transitioner.handleMusicStop(this);
      }
    }, durationSec * 1000);
  },

  /**
   * Configures Web Audio API beat listeners and music state callbacks.
   */
  setupAudioListeners() {
    this.audio.onBeat = (energy) => {
      if (this.transitioner.currentState === 'dance') {
        this.particles.spawnMusicNotes(this.x, this.y - 20, 2);
      }
    };

    this.audio.onMusicStateChange = (isPlaying, energy) => {
      if (isPlaying) {
        this.isMusicActive = true;
        if (this.audioDanceEnabled && 
            this.transitioner.currentState !== 'sleep' && 
            this.transitioner.currentState !== 'drag' && 
            this.transitioner.currentState !== 'fall' && 
            this.transitioner.currentState !== 'landing' && 
            !this.isDragging) {
          this.transitioner.handleMusicStart(this);
        }
      } else {
        this.isMusicActive = false;
        if (this.transitioner.currentState === 'dance') {
          this.transitioner.handleMusicStop(this);
        }
      }
    };
  },

  /**
   * Evaluates if current system time falls within scheduled sleep range.
   * @returns {boolean}
   */
  isSleepScheduled() {
    if (!this.sleepSchedule.enabled) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [sH, sM] = this.sleepSchedule.sleepTime.split(':').map(Number);
    const [wH, wM] = this.sleepSchedule.wakeTime.split(':').map(Number);
    const sleepMinutes = sH * 60 + sM;
    const wakeMinutes = wH * 60 + wM;

    if (sleepMinutes < wakeMinutes) {
      return currentMinutes >= sleepMinutes && currentMinutes < wakeMinutes;
    } else {
      // Overnight range crossing midnight (e.g., 23:00 to 08:00)
      return currentMinutes >= sleepMinutes || currentMinutes < wakeMinutes;
    }
  },

  /**
   * Checks sleep schedule and transitions state accordingly.
   */
  checkSleepSchedule() {
    if (this.isManualSleep) {
      if (this.transitioner.currentState !== 'sleep') {
        this.transitioner.enterSleep(this);
      }
      return;
    }

    const shouldSleep = this.isSleepScheduled();
    if (shouldSleep && this.transitioner.currentState !== 'sleep') {
      this.transitioner.enterSleep(this);
    } else if (!shouldSleep && this.transitioner.currentState === 'sleep') {
      this.transitioner.wakeUp(this);
    }
  },

  setScheduleConfig(config) {
    this.sleepSchedule = { ...this.sleepSchedule, ...config };
    this.checkSleepSchedule();
  }
};

if (typeof window !== 'undefined') window.EngineAudioSchedule = EngineAudioSchedule;
if (typeof globalThis !== 'undefined') globalThis.EngineAudioSchedule = EngineAudioSchedule;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EngineAudioSchedule;
}
