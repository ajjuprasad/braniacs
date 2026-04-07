/**
 * Sound Manager for Brainiacs
 * Uses Web Audio API to generate sounds programmatically (no external files needed)
 */
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    ensureContext() {
        if (!this.audioContext) this.init();
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Play a correct answer sound (ascending cheerful tone)
     */
    playCorrect() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Cheerful ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.3);
        });
    }

    /**
     * Play a wrong answer sound (descending buzzer)
     */
    playWrong() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.5);
    }

    /**
     * Play a level complete fanfare
     */
    playLevelComplete() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            const start = now + i * 0.15;
            gain.gain.setValueAtTime(0.15, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
            osc.start(start);
            osc.stop(start + 0.4);
        });
    }

    /**
     * Play a failure sound
     */
    playFail() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const notes = [392, 349.23, 329.63, 261.63];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'triangle';
            osc.frequency.value = freq;
            const start = now + i * 0.2;
            gain.gain.setValueAtTime(0.12, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
            osc.start(start);
            osc.stop(start + 0.4);
        });
    }

    /**
     * Play victory fanfare
     */
    playVictory() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Triumphant fanfare
        const melody = [
            { freq: 523.25, time: 0, dur: 0.2 },
            { freq: 523.25, time: 0.2, dur: 0.2 },
            { freq: 523.25, time: 0.4, dur: 0.2 },
            { freq: 659.25, time: 0.6, dur: 0.4 },
            { freq: 523.25, time: 1.0, dur: 0.2 },
            { freq: 659.25, time: 1.2, dur: 0.2 },
            { freq: 783.99, time: 1.4, dur: 0.8 },
        ];

        melody.forEach(({ freq, time, dur }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, now + time);
            gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);
            osc.start(now + time);
            osc.stop(now + time + dur + 0.1);
        });
    }

    /**
     * Play a click/tap sound
     */
    playClick() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    /**
     * Play hint activation sound
     */
    playHint() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    /**
     * Play strike sound
     */
    playStrike() {
        if (!this.enabled) return;
        this.ensureContext();
        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Heavy buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = 150;
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.35);
    }
}

const soundManager = new SoundManager();
