"use client";

import React from "react";
import ProfileMatrix from "./ProfileMatrix";
import HeistPayoutCounter from "./HeistPayoutCounter";
import { motion } from "framer-motion";

interface Skill {
  attribute: string;
  subtitle:  string;
  stars:     number;
  status:    string;
}

const skills: Skill[] = [
  { attribute: "SPECIAL (ARCHITECTURE)", subtitle: "System Design & Infrastructure", stars: 5, status: "MAXED"  },
  { attribute: "STAMINA (BACKEND DEV)",  subtitle: "APIs, Databases, Serverless",    stars: 4, status: "EXPERT" },
  { attribute: "DRIVE (FRONTEND UI)",    subtitle: "React, Next.js, Animation",       stars: 5, status: "MAXED"  },
  { attribute: "STEALTH (DEVOPS/CLOUD)", subtitle: "AWS, Docker, Terraform",          stars: 4, status: "EXPERT" },
  { attribute: "SHOOTING (PERFORMANCE)",subtitle: "Optimization, Profiling, Caching",stars: 4, status: "EXPERT" },
];

function StarRating({ stars, index }: { stars: number; index: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.07, type: "spring", stiffness: 280, damping: 16 }}
          className={i < stars ? "star-active" : "star-inactive"}
          style={{ fontSize: 22, lineHeight: 1 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#2A1545] pb-4">
        <div className="text-[10px] tracking-[0.2em] mb-1"
          style={{ fontFamily: "var(--font-oswald)", color: "#E91E8C" }}>
          01 // THE_LEAD
        </div>
        <h2 className="gta-heading text-3xl text-gradient">OVERVIEW</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <ProfileMatrix />
        </div>

        <div className="lg:col-span-2 space-y-5">
          {/* Bio */}
          <div className="gta-card p-5 space-y-4 border-l-2" style={{ borderLeftColor: "#E91E8C" }}>
            <div className="text-[10px] text-textMuted tracking-[0.2em] flex justify-between"
              style={{ fontFamily: "var(--font-oswald)" }}>
              <span>OPERATOR PROFILE</span>
              <span className="" style={{ color: "#FF3D9A" }}>CLASSIFIED</span>
            </div>
            <p className="text-sm leading-relaxed font-sans" style={{ color: "#F0E6FF" }}>
              Name&rsquo;s{" "}
              <strong style={{ color: "#FF69B4" }} className="font-semibold">Alex Vance</strong>.
              {" "}Senior Full-Stack Engineer, Project Lead. A decade running
              high-stakes builds — distributed APIs, serverless pipelines, and
              front-ends that don&rsquo;t choke under pressure.
            </p>
            <p className="text-textMuted text-sm leading-relaxed font-sans">
              Design principles: speed, clean architecture, zero performance
              debt. Every system ships tight — no excuses, no shortcuts.
            </p>
          </div>

          {/* Capability Matrix */}
          <div className="gta-card p-5 space-y-5">
            <div className="text-[10px] text-textMuted tracking-[0.2em] flex items-center gap-2 pb-3"
              style={{ fontFamily: "var(--font-oswald)", borderBottom: "1px solid #2A1545" }}>
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: "#E91E8C" }} />
              <span>CAPABILITY MATRIX</span>
              <span className="ml-auto text-[9px]" style={{ color: "#E91E8C" }}>
                ★ = WANTED TIER
              </span>
            </div>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest"
                        style={{ fontFamily: "var(--font-oswald)", color: "#F0E6FF" }}>
                        {skill.attribute}
                      </div>
                      <div className="text-textMuted text-[10px] mt-0.5 font-sans">{skill.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest ml-4 shrink-0"
                      style={{ fontFamily: "var(--font-oswald)", color: skill.stars === 5 ? "#E91E8C" : "#FF3D9A" }}>
                      {skill.status}
                    </span>
                  </div>
                  <StarRating stars={skill.stars} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HeistPayoutCounter />
    </div>
  );
}
