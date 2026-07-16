"use client";

import React from "react";
import { useSound } from "@/context/SoundContext";
import { Volume2, VolumeX } from "lucide-react";

export default function MuteToggle() {
  const { isMuted, toggleMute } = useSound();

  const handleToggle = () => {
    toggleMute();
    if (isMuted) {
      setTimeout(() => {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioCtx) return;
          const ctx = new AudioCtx();
          [523.25, 659.25].forEach((freq, i) => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.2);
          });
        } catch {}
      }, 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 border px-4 py-2 transition-all duration-200 active:scale-95"
      style={{
        background:  "#1a1a1a",
        borderColor: isMuted ? "#2e2e2e" : "#FF3D6B",
        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
      }}
      aria-label="Toggle Music"
    >
      {isMuted ? (
        <>
          <VolumeX size={13} style={{ color: "#555" }} />
          <span
            className="text-[11px] tracking-widest font-semibold"
            style={{ fontFamily: "var(--font-oswald)", color: "#555" }}
          >
            [ MUSIC: OFF ]
          </span>
        </>
      ) : (
        <>
          <Volume2 size={13} style={{ color: "#FF3D6B" }} />
          <span
            className="text-[11px] tracking-widest font-semibold text-pink-glow"
            style={{ fontFamily: "var(--font-oswald)", color: "#FF3D6B" }}
          >
            [ MUSIC: ON ]
          </span>
        </>
      )}
    </button>
  );
}
