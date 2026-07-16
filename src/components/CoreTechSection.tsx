"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { Layers, Cpu, Code2, Terminal, Hexagon, Database, Boxes, Cloud } from "lucide-react";

const techItems = [
  { name: "Next.js",    icon: Layers,   color: "#ffffff", exp: "5 YRS", tier: "EXPERT"   },
  { name: "React",      icon: Cpu,      color: "#61DAFB", exp: "7 YRS", tier: "EXPERT"   },
  { name: "TypeScript", icon: Code2,    color: "#3178C6", exp: "6 YRS", tier: "EXPERT"   },
  { name: "Node.js",    icon: Terminal, color: "#339933", exp: "8 YRS", tier: "EXPERT"   },
  { name: "GraphQL",    icon: Hexagon,  color: "#E10098", exp: "4 YRS", tier: "ADVANCED" },
  { name: "Postgres",   icon: Database, color: "#4169E1", exp: "6 YRS", tier: "EXPERT"   },
  { name: "Docker",     icon: Boxes,    color: "#2496ED", exp: "4 YRS", tier: "ADVANCED" },
  { name: "AWS Cloud",  icon: Cloud,    color: "#FF9900", exp: "5 YRS", tier: "EXPERT"   },
];

const PINK  = "#FF3D6B";
const CORAL = "#FF6B6B";

export default function CoreTechSection() {
  const { playHover } = useSound();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#282828] pb-4">
        <div className="text-[10px] tracking-[0.2em] mb-1"
          style={{ fontFamily: "var(--font-oswald)", color: PINK }}>
          02 // INVENTORY
        </div>
        <h2 className="gta-heading text-3xl text-textPrimary">CORE_TECH</h2>
        <p className="text-textMuted text-[11px] tracking-widest mt-1"
          style={{ fontFamily: "var(--font-oswald)" }}>
          PRODUCTION-HARDENED ARSENAL
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {techItems.map((tech, idx) => {
          const Icon  = tech.icon;
          const isHov = hovered === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => { setHovered(idx); playHover(); }}
              onMouseLeave={() => setHovered(null)}
              className="relative h-36 gta-card gta-card-hover cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3 p-4 transition-all duration-200"
            >
              {/* Corner slash on hover */}
              {isHov && (
                <div className="absolute top-0 right-0 w-0 h-0 z-10" style={{
                  borderStyle: "solid",
                  borderWidth: "0 20px 20px 0",
                  borderColor: `transparent ${tech.color} transparent transparent`,
                }} />
              )}

              <div className="relative z-10 transition-all duration-200"
                style={{ color: isHov ? tech.color : "#444" }}>
                <Icon size={36} strokeWidth={1.2} />
              </div>

              <span
                className="relative z-10 text-xs tracking-widest font-semibold uppercase transition-colors duration-200"
                style={{ fontFamily: "var(--font-oswald)", color: isHov ? "#fff" : "#666" }}
              >
                {tech.name}
              </span>

              {/* ITEM_UNLOCKED overlay */}
              <AnimatePresence>
                {isHov && (
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "tween", duration: 0.13, ease: "easeOut" }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 p-3"
                    style={{ background: "rgba(15,15,15,0.97)" }}
                  >
                    <div
                      className="text-[8px] tracking-[0.2em] font-bold px-2 py-0.5"
                      style={{ fontFamily: "var(--font-oswald)", color: PINK, border: `1px solid ${PINK}` }}
                    >
                      ITEM_UNLOCKED // EXPERT_TIER
                    </div>
                    <div className="text-sm font-bold text-textPrimary tracking-wider"
                      style={{ fontFamily: "var(--font-oswald)" }}>
                      {tech.name.toUpperCase()}
                    </div>
                    <div className="space-y-0.5 text-center">
                      <div className="text-[10px] text-textMuted" style={{ fontFamily: "var(--font-oswald)" }}>
                        EXP: <span className="font-bold" style={{ color: CORAL }}>{tech.exp}</span>
                      </div>
                      <div className="text-[10px] text-textMuted" style={{ fontFamily: "var(--font-oswald)" }}>
                        TIER: <span className="font-bold" style={{ color: PINK }}>{tech.tier}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-[10px] text-textMuted pt-2"
        style={{ fontFamily: "var(--font-oswald)" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 inline-block" style={{ background: PINK }} /> EXPERT TIER
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 inline-block" style={{ background: CORAL }} /> ADVANCED TIER
        </span>
      </div>
    </div>
  );
}
