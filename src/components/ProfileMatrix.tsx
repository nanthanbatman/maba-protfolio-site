"use client";

import React from "react";

export default function ProfileMatrix() {
  return (
    <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center"
      style={{ background: "#160D28", border: "1px solid #2A1545" }}>
      <div className="absolute inset-0 gta-stripe-bg opacity-40" />

      {/* Magenta top-right slash */}
      <div className="absolute top-0 right-0 w-0 h-0" style={{
        borderStyle: "solid", borderWidth: "0 52px 52px 0",
        borderColor: "transparent #E91E8C transparent transparent",
      }} />
      {/* Violet bottom-left slash */}
      <div className="absolute bottom-0 left-0 w-0 h-0" style={{
        borderStyle: "solid", borderWidth: "0 0 36px 36px",
        borderColor: "transparent transparent #9B27AF transparent",
      }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 80%, rgba(233,30,140,0.08) 0%, transparent 70%)",
      }} />

      <svg viewBox="0 0 200 220" className="w-[82%] h-[82%] relative z-10" fill="none">
        <ellipse cx="103" cy="215" rx="42" ry="6" fill="rgba(0,0,0,0.5)" />

        {/* Jacket */}
        <path d="M 68,130 L 58,200 L 142,200 L 132,130 L 120,118 L 100,124 L 80,118 Z"
          fill="#1E1035" stroke="#E91E8C" strokeWidth="2" />
        <path d="M 80,118 L 100,136 L 120,118" fill="none" stroke="#FF3D9A" strokeWidth="2.5" />
        <path d="M 88,124 L 100,136 L 112,124 L 108,145 L 92,145 Z" fill="#2A1545" stroke="#3D2060" strokeWidth="1" />

        {/* Arms */}
        <path d="M 68,130 L 50,158 L 60,162 L 72,140" fill="#1E1035" stroke="#E91E8C" strokeWidth="1.5" />
        <ellipse cx="55" cy="164" rx="7" ry="5" fill="#c8a882" stroke="#E91E8C" strokeWidth="1" />
        <path d="M 132,130 L 150,158 L 140,162 L 128,140" fill="#1E1035" stroke="#E91E8C" strokeWidth="1.5" />
        <ellipse cx="145" cy="164" rx="7" ry="5" fill="#c8a882" stroke="#E91E8C" strokeWidth="1" />

        {/* Neck */}
        <rect x="91" y="105" width="18" height="16" rx="2" fill="#c8a882" stroke="#7B6A9A" strokeWidth="1" />

        {/* Head */}
        <ellipse cx="100" cy="82" rx="32" ry="36" fill="#c8a882" stroke="#160D28" strokeWidth="3" />

        {/* Face shading */}
        <path d="M 70,74 L 72,68 M 69,80 L 71,74 M 70,86 L 72,80 M 71,92 L 73,86" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <path d="M 128,74 L 130,68 M 129,80 L 131,74 M 128,86 L 130,80 M 129,92 L 131,86" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Sunglasses — violet/magenta tint */}
        <rect x="72" y="76" width="23" height="11" rx="5" fill="rgba(155,39,175,0.25)" stroke="#E91E8C" strokeWidth="1.5" />
        <rect x="105" y="76" width="23" height="11" rx="5" fill="rgba(155,39,175,0.25)" stroke="#E91E8C" strokeWidth="1.5" />
        <line x1="95" y1="81" x2="105" y2="81" stroke="#E91E8C" strokeWidth="1.5" />
        <line x1="68" y1="81" x2="72" y2="81" stroke="#E91E8C" strokeWidth="1.5" />
        <line x1="128" y1="81" x2="132" y2="81" stroke="#E91E8C" strokeWidth="1.5" />
        <line x1="76" y1="79" x2="81" y2="79" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <line x1="109" y1="79" x2="114" y2="79" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

        {/* Mouth */}
        <path d="M 93,108 Q 100,113 107,108" fill="none" stroke="#8a5c3c" strokeWidth="1.5" />

        {/* Ears */}
        <ellipse cx="68" cy="83" rx="5" ry="8" fill="#c8a882" stroke="#160D28" strokeWidth="1.5" />
        <ellipse cx="132" cy="83" rx="5" ry="8" fill="#c8a882" stroke="#160D28" strokeWidth="1.5" />

        {/* Hair */}
        <path d="M 68,66 Q 72,46 100,44 Q 128,46 132,66 Q 126,54 100,52 Q 74,54 68,66 Z"
          fill="#0E0818" stroke="#0E0818" strokeWidth="1" />

        {/* ID badge */}
        <rect x="84" y="148" width="32" height="18" rx="1" fill="#0E0818" stroke="#E91E8C" strokeWidth="1" />
        <text x="100" y="155" textAnchor="middle" fill="#E91E8C" fontSize="4"
          fontFamily="var(--font-oswald)" fontWeight="700">ALEX VANCE</text>
        <text x="100" y="162" textAnchor="middle" fill="#9B27AF" fontSize="3.5"
          fontFamily="var(--font-oswald)">ELITE DEV</text>
      </svg>

      <div className="absolute top-3 left-3 space-y-0.5" style={{ fontFamily: "var(--font-oswald)" }}>
        <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#E91E8C" }}>OPERATOR</div>
        <div className="text-[9px] tracking-wider text-textMuted">LVL 99 // LEAD</div>
      </div>
      <div className="absolute bottom-3 right-3 text-right space-y-0.5" style={{ fontFamily: "var(--font-oswald)" }}>
        <div className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#FF3D9A" }}>STATUS: ACTIVE</div>
        <div className="text-[9px] tracking-wider text-textMuted">REP: MAX</div>
      </div>
    </div>
  );
}
