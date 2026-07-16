"use client";

import React, { useState, useEffect } from "react";

const crewRoles = [
  { role: "DRIVER",  status: "STANDBY" },
  { role: "HACKER",  status: "ACTIVE"  },
  { role: "GUNMAN",  status: "ACTIVE"  },
];

export default function SystemTelemetry() {
  const [wantedLevel, setWantedLevel] = useState(2);
  const [heat,        setHeat]        = useState(34);
  const [bounty,      setBounty]      = useState(12500);
  const [uptime,      setUptime]      = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeat((p) => Math.max(8, Math.min(92, parseFloat((p + (Math.random() * 6 - 3)).toFixed(1)))));
      setBounty((p) => p + Math.floor(Math.random() * 500));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setUptime((p) => p + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sc = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sc}`;
  };

  const PINK = "#FF3D6B";
  const CORAL = "#FF6B6B";

  return (
    <div
      className="border border-[#282828] bg-[#141414] p-4 space-y-4 select-none"
      style={{ fontFamily: "var(--font-oswald)" }}
    >
      {/* WANTED LEVEL */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-textMuted tracking-widest uppercase">Wanted Level</span>
          <span className="text-[9px] font-bold tracking-wider" style={{ color: PINK }}>
            {wantedLevel > 4 ? "MOST WANTED" : wantedLevel > 2 ? "HOT" : "CLEAR"}
          </span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < wantedLevel ? "wanted-star-active" : ""}
              style={{
                fontSize:   18,
                lineHeight: 1,
                color:      i < wantedLevel ? PINK : "#2a2a2a",
                animationDelay: `${i * 0.12}s`,
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* HEAT METER */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-textMuted tracking-widest uppercase">Heat</span>
          <span className="text-[10px] text-textPrimary font-bold">{heat}%</span>
        </div>
        <div className="gta-stat-bar-track w-full">
          <div
            className="gta-stat-bar-fill transition-all duration-500"
            style={{ width: `${heat}%` }}
          />
        </div>
      </div>

      {/* BOUNTY */}
      <div className="flex justify-between items-center border-t border-[#282828] pt-3">
        <span className="text-[10px] text-textMuted tracking-widest uppercase">Active Bounty</span>
        <span className="text-[11px] font-bold tracking-wider" style={{ color: CORAL }}>
          ${bounty.toLocaleString("en-US")}
        </span>
      </div>

      {/* CREW */}
      <div className="space-y-2 border-t border-[#282828] pt-3">
        <span className="text-[10px] text-textMuted tracking-widest uppercase block">Crew Status</span>
        <div className="space-y-1.5">
          {crewRoles.map((c) => (
            <div key={c.role} className="flex justify-between items-center">
              <span className="text-[10px] text-textMuted">{c.role}</span>
              <span
                className="text-[9px] font-bold tracking-widest"
                style={{ color: c.status === "ACTIVE" ? PINK : "#444" }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SESSION */}
      <div className="flex justify-between items-center border-t border-[#282828] pt-3 text-[9px]">
        <span className="text-textMuted tracking-widest uppercase">Session</span>
        <span className="text-textPrimary font-bold tracking-wider">{fmt(uptime)}</span>
      </div>
    </div>
  );
}
