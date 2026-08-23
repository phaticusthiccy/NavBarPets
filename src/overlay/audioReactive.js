/**
 * @file audioReactive.js
 * @description Web Audio API Rhythmic Beat & Music Detector for NavBarPets.
 * Analyzes audio frequency band energies and detects rhythmic beats to trigger dancing.
 */

class AudioReactive {
  /**
   * @param {Object} options - Configuration options
   * @param {number} [options.sensitivity=0.5] - Beat sensitivity factor (0.1 to 1.0)
   * @param {boolean} [options.enabled=false] - Whether audio listening is enabled
   */
  constructor(options = {}) {
    this.sensitivity = options.sensitivity || 0.5;
    this.enabled = options.enabled !== undefined ? options.enabled : false;
    this.audioCtx = null;
    this.analyser = null;
    this.dataArray = null;
    this.isListening = false;
    this.energyHistory = [];
    this.historySize = 30;
    this.beatHoldTime = 0.35; // Hold time in seconds to prevent rapid beat triggers
    this.beatTimer = 0;
    this.isPlayingMusic = false;
    this.musicSilenceTimer = 0;

    this.onBeat = null;
    this.onMusicStateChange = null;
  }

  /**
   * Initializes audio input stream and FFT frequency analyser node.
   */
  async start() {
    if (!this.enabled || this.isListening) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        },
        video: false
      });

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      const source = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      source.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.isListening = true;
    } catch (err) {
      console.warn('[AudioReactive] Audio capture unavailable or permission denied:', err);
    }
  }

  /**
   * Closes audio context and releases stream resources.
   */
  stop() {
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
    }
    this.isListening = false;
  }

  /**
   * Performs per-frame frequency analysis and beat threshold detection.
   * @param {number} dt - Delta time in seconds
   */
  update(dt = 0.016) {
    if (!this.enabled) {
      if (this.isPlayingMusic) {
        this.isPlayingMusic = false;
        if (this.onMusicStateChange) this.onMusicStateChange(false, 0);
      }
      return;
    }

    this.beatTimer -= dt;

    if (!this.isListening || !this.analyser) {
      return;
    }

    this.analyser.getByteFrequencyData(this.dataArray);

    // Compute Bass & Mid frequency band energies
    let bassSum = 0;
    let totalSum = 0;
    const bassBins = 8;

    for (let i = 0; i < this.dataArray.length; i++) {
      const val = this.dataArray[i];
      totalSum += val;
      if (i < bassBins) bassSum += val;
    }

    const bassEnergy = bassSum / (bassBins * 255);
    const totalEnergy = totalSum / (this.dataArray.length * 255);

    // Running average energy threshold
    this.energyHistory.push(bassEnergy);
    if (this.energyHistory.length > this.historySize) {
      this.energyHistory.shift();
    }

    const avgEnergy = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
    const threshold = Math.max(0.12, (1.1 - this.sensitivity * 0.4) * avgEnergy);

    // Beat Detection
    const isBeat = (bassEnergy > threshold) && (bassEnergy > 0.15) && (this.beatTimer <= 0);
    if (isBeat) {
      this.beatTimer = this.beatHoldTime;
      if (this.onBeat) this.onBeat(bassEnergy);
    }

    // Music Active Check (Sustained rhythmic energy)
    const thresholdPlay = 0.08 / Math.max(0.2, this.sensitivity);
    if (totalEnergy > thresholdPlay) {
      this.musicSilenceTimer = 0;
      if (!this.isPlayingMusic) {
        this.isPlayingMusic = true;
        if (this.onMusicStateChange) this.onMusicStateChange(true, totalEnergy);
      }
    } else {
      this.musicSilenceTimer += dt;
      if (this.musicSilenceTimer > 2.0 && this.isPlayingMusic) {
        this.isPlayingMusic = false;
        if (this.onMusicStateChange) this.onMusicStateChange(false, 0);
      }
    }
  }

  /**
   * Simulates temporary music playback for test previewing.
   * @param {number} [durationSec=6.0] - Simulation duration in seconds
   */
  simulateMusic(durationSec = 6.0) {
    this.isPlayingMusic = true;
    if (this.onMusicStateChange) this.onMusicStateChange(true, 0.8);

    let count = 0;
    const interval = setInterval(() => {
      if (this.onBeat) this.onBeat(0.9);
      count++;
      if (count >= Math.floor(durationSec * 2)) {
        clearInterval(interval);
        this.isPlayingMusic = false;
        if (this.onMusicStateChange) this.onMusicStateChange(false, 0);
      }
    }, 500);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioReactive;
}
