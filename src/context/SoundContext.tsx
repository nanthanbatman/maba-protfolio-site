"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const BG_MUSIC_SRC = "/theme-song.mp4";
const BG_MUSIC_VOLUME = 0.06;

function readMutedPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem("arcade-sound-muted");
    if (saved !== null) return saved === "true";
  } catch {}
  return false;
}

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  startBackgroundMusic: () => void;
  playHover: () => void;
  playConfirm: () => void;
  playBootUp: () => void;
  playGlitch: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(readMutedPreference);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(BG_MUSIC_SRC);
    audio.loop = true;
    audio.volume = BG_MUSIC_VOLUME;
    audio.preload = "auto";
    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      bgMusicRef.current = null;
      musicStartedRef.current = false;
    };
  }, []);

  const startBackgroundMusic = useCallback(() => {
    const audio = bgMusicRef.current;
    if (!audio || isMuted) return;

    audio.volume = BG_MUSIC_VOLUME;
    audio
      .play()
      .then(() => {
        musicStartedRef.current = true;
      })
      .catch(() => {});
  }, [isMuted]);

  useEffect(() => {
    const audio = bgMusicRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
      musicStartedRef.current = false;
      return;
    }

    // Browsers block autoplay without a gesture — try anyway, unlock listeners handle the rest.
    if (!musicStartedRef.current) {
      startBackgroundMusic();
    }
  }, [isMuted, startBackgroundMusic]);

  // First click/keypress unlocks background music when unmuted (browser autoplay policy).
  useEffect(() => {
    if (isMuted) return;

    const unlock = () => {
      if (!musicStartedRef.current) {
        startBackgroundMusic();
      }
    };

    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });

    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
    };
  }, [isMuted, startBackgroundMusic]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("arcade-sound-muted", String(next));
      } catch {}

      const audio = bgMusicRef.current;
      if (audio) {
        if (next) {
          audio.pause();
          musicStartedRef.current = false;
        } else {
          audio.volume = BG_MUSIC_VOLUME;
          audio
            .play()
            .then(() => {
              musicStartedRef.current = true;
            })
            .catch(() => {});
        }
      }

      return next;
    });
  };

  // Play short 8-bit navigation click
  const playHover = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {}
  };

  // Play tactile double chime
  const playConfirm = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.05, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.15);

      const delay = 0.08;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + delay);
      gain2.gain.setValueAtTime(0.05, ctx.currentTime + delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + delay);
      osc2.stop(ctx.currentTime + delay + 0.2);
    } catch (e) {}
  };

  // Play synthesized arcade machine boot sweep
  const playBootUp = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Pitch sweep oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      // Lowpass sweep filter to sound like an ascending engine start
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      // Add a clean major chord chime at the end of the boot-up sweep
      setTimeout(() => {
        if (isMuted) return;
        try {
          const chimeCtx = new AudioCtx();
          const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (C Major)
          frequencies.forEach((freq, idx) => {
            const chimeOsc = chimeCtx.createOscillator();
            const chimeGain = chimeCtx.createGain();
            chimeOsc.type = "triangle";
            chimeOsc.frequency.setValueAtTime(freq, chimeCtx.currentTime);
            chimeGain.gain.setValueAtTime(0.03, chimeCtx.currentTime);
            chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeCtx.currentTime + 0.4);
            chimeOsc.connect(chimeGain);
            chimeGain.connect(chimeCtx.destination);
            chimeOsc.start();
            chimeOsc.stop(chimeCtx.currentTime + 0.4);
          });
        } catch {}
      }, 1000);

    } catch (e) {}
  };

  // Play analog static noise glitch burst
  const playGlitch = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Create white noise buffer
      const duration = 0.14; // 140ms
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Filter to shape the static sound
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start();
    } catch (e) {}
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        startBackgroundMusic,
        playHover,
        playConfirm,
        playBootUp,
        playGlitch,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
