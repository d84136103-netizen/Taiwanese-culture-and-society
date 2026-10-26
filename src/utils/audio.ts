// Web Audio API synthesized sound effects and atmospheric background audio
// No external MP3 downloads required - completely resilient, fast, and lightweight.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.05, this.ctx?.currentTime || 0);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Camera shutter click sound
  public playShutter() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Noise burst for mechanical click
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
  }

  // Soft decision / card select chime
  public playSelect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, t); // D5
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.12); // A5

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Film reel advancing / tape clack
  public playReel() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.setValueAtTime(110, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Toggle ambient gentle night market / street hum
  public toggleAmbient(start: boolean) {
    this.init();
    if (!this.ctx) return;

    if (!start) {
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      }
      this.isAmbientPlaying = false;
      return;
    }

    if (this.isAmbientPlaying) return;

    try {
      const t = this.ctx.currentTime;
      // Gentle warm drone (night market warmth)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      this.ambientGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, t); // A2
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, t); // E3

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);

      this.ambientGain.gain.setValueAtTime(0.001, t);
      this.ambientGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0 : 0.04, t + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      this.isAmbientPlaying = true;
    } catch {
      // Ignore audio autoplay restrictions
    }
  }
}

export const sounds = new SoundManager();
