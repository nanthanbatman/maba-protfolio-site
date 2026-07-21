"use client";

import React, { useState, useEffect } from "react";
import { useSound } from "@/context/SoundContext";
import { motion } from "framer-motion";

interface BootSequenceProps { onComplete: () => void; }

const bootLogs = [
  "INITIALIZING SECURE SYSTEM...",
  "LOADING OPERATOR PROFILE: ALEX_VANCE",
  "CLEARANCE LEVEL: ELITE // CONFIRMED",
  "CONNECTING TO PRIVATE SERVER...",
  "FIREWALL: BYPASSED",
  "ASSET CACHE: LOADED",
  "CREW STATUS: ALL MEMBERS ACTIVE",
  "HEAT LEVEL: NOMINAL",
  "HEIST INTEL: DECRYPTED",
  "PORTFOLIO CORE: READY",
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const { playHover, playBootUp, startBackgroundMusic } = useSound();
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"logging"|"loading"|"ready"|"entering">("logging");

  useEffect(() => {
    let idx = 0, cancelled = false;
    const iv = setInterval(() => {
      if (cancelled) return;
      if (idx < bootLogs.length) { const l = bootLogs[idx]; if (l) setLines(p => [...p, l]); idx++; }
      else { clearInterval(iv); setStage("loading"); }
    }, 120);
    return () => { cancelled = true; clearInterval(iv); };
  }, []);

  useEffect(() => {
    if (stage !== "loading") return;
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); setStage("ready"); return 100; } return Math.min(100, p + 8); });
    }, 80);
    return () => clearInterval(iv);
  }, [stage]);

  const handleEnter = () => {
    setStage("entering");
    startBackgroundMusic();
    playBootUp();
    setTimeout(onComplete, 1200);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none gta-bg-pattern">
      <div style={{ background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.8) 100%)", position:"absolute",inset:0,pointerEvents:"none" }} />
      <div className="relative w-full max-w-xl z-10">
        <div className="px-6 py-3 flex justify-between items-center"
          style={{ background: "linear-gradient(90deg,#E91E8C,#9B27AF)" }}>
          <span className="gta-heading text-white text-xl tracking-wider"
            >ALEX VANCE</span>
          <span className="text-white/70 text-[10px] font-bold tracking-[0.3em]"
            style={{ fontFamily:"var(--font-oswald)" }}>ELITE FULL-STACK ENGINEER</span>
        </div>

        <div className="border border-t-0 p-6 space-y-5"
          style={{ background:"#0A0515", borderColor:"#2A1545" }}>
          <div className="h-52 overflow-y-auto space-y-1.5 pr-1 scrollbar-none">
            {lines.map((line, i) => {
              if (!line) return null;
              const hi = line.includes("READY")||line.includes("LOADED")||line.includes("ACTIVE")||line.includes("CONFIRMED")||line.includes("DECRYPTED");
              const med = line.includes("BYPASSED");
              return (
                <motion.div key={i} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }}
                  transition={{ duration:0.1 }} className="flex items-center gap-3"
                  style={{ fontFamily:"var(--font-oswald)" }}>
                  <span style={{ color:"#E91E8C", fontSize:10 }} className="shrink-0">▶</span>
                  <span className="text-[11px] tracking-widest"
                    style={{ color: hi?"#E91E8C":med?"#FF3D9A":"#7B6A9A" }}>{line}</span>
                </motion.div>
              );
            })}
            {stage==="logging" && (
              <motion.div className="w-2 h-3.5" animate={{ opacity:[1,0,1] }}
                transition={{ duration:0.7,repeat:Infinity }} style={{ background:"#E91E8C" }} />
            )}
          </div>

          {(stage==="loading"||stage==="ready"||stage==="entering") && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]" style={{ fontFamily:"var(--font-oswald)" }}>
                <span className="text-textMuted tracking-widest uppercase">Loading Assets</span>
                <span className="font-bold" style={{ color:"#E91E8C" }}>{progress}%</span>
              </div>
              <div className="w-full h-3 overflow-hidden" style={{ background:"#160D28",border:"1px solid #2A1545" }}>
                <motion.div className="h-full"
                  style={{ background:"linear-gradient(90deg,#E91E8C,#9B27AF,#FF3D9A)" }}
                  animate={{ width:`${progress}%` }} transition={{ duration:0.1 }} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center min-h-[52px]">
            {stage==="ready" && (
              <motion.button onClick={handleEnter} onMouseEnter={playHover}
                initial={{ opacity:0,scale:0.95 }}
                animate={{ opacity:[0.7,1,0.7],scale:[0.98,1.02,0.98] }}
                transition={{ duration:1.4,repeat:Infinity,ease:"easeInOut" }}
                className="gta-btn-primary px-10 py-3.5 text-sm tracking-widest">
                PRESS START
              </motion.button>
            )}
            {stage==="entering" && (
              <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:0.18,repeat:Infinity }}
                className="gta-heading text-lg tracking-widest text-gradient">ENTERING...</motion.div>
            )}
            {stage==="logging" && (
              <span className="text-[10px] text-textMuted tracking-[0.3em]"
                style={{ fontFamily:"var(--font-oswald)" }}>INITIALIZING SYSTEM...</span>
            )}
            {stage==="loading" && (
              <span className="text-[10px] tracking-[0.3em]"
                style={{ fontFamily:"var(--font-oswald)",color:"#FF3D9A" }}>PACKING ASSETS...</span>
            )}
          </div>
        </div>

        <div className="flex justify-between px-1 pt-2 text-[9px] tracking-widest"
          style={{ fontFamily:"var(--font-oswald)",color:"#2A1545" }}>
          <span>SECURE UPLINK v2.0</span><span>CLEARANCE: ELITE</span>
        </div>
      </div>
    </div>
  );
}
