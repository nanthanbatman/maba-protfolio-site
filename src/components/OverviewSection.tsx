"use client";

import React from "react";
import ProfileMatrix from "./ProfileMatrix";
import { motion } from "framer-motion";

interface Skill {
  attribute: string;
  subtitle:  string;
  stars:     number; // out of 5
  status:    string;
}

const skills: Skill[] = [
  {
    attribute: "SPECIAL (ARCHITECTURE)",
    subtitle:  "System Design & Infrastructure",
    stars:     5,
    status:    "MAXED",
  },
  {
    attribute: "STAMINA (BACKEND DEV)",
    subtitle:  "APIs, Databases, Serverless",
    stars:     4,
    status:    "EXPERT",
  },
  {
    attribute: "DRIVE (FRONTEND UI)",
    subtitle:  "React, Next.js, Animation",
    stars:     5,
    status:    "MAXED",
  },
  {
    attribute: "STEALTH (DEVOPS / CLOUD)",
    subtitle:  "AWS, Docker, Terraform",
    stars:     4,
    status:    "EXPERT",
  },
  {
    attribute: "SHOOTING (PERFORMANCE)",
    subtitle:  "Optimization, Profiling, Caching",
    stars:     4,
    status:    "EXPERT",
  },
];

function StarRating({ stars, index }: { stars: number; index: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < stars;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay:    index * 0.1 + i * 0.06,
              type:     "spring",
              stiffness: 300,
              damping:  18,
            }}
            className={filled ? "star-active" : "star-inactive"}
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            ★
          </motion.span>
        );
      })}
    </div>
  );
}

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="border-b border-[#282828] pb-4">
        <div
          className="text-[10px] tracking-[0.2em] mb-1"
          style={{ fontFamily: "var(--font-oswald)", color: "#FF3D6B" }}
        >
          01 // THE_LEAD
        </div>
        <h2 className="gta-heading text-3xl text-textPrimary">OVERVIEW</h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Character Card */}
        <div className="lg:col-span-1">
          <ProfileMatrix />
        </div>

        {/* Bio + Stars */}
        <div className="lg:col-span-2 space-y-5">
          {/* Bio panel */}
          <div className="gta-card p-5 space-y-4 border-l-2" style={{ borderLeftColor: "#FF3D6B" }}>
            <div
              className="text-[10px] text-textMuted tracking-[0.2em] flex justify-between"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <span>OPERATOR PROFILE</span>
              <span style={{ color: "#FF3D6B" }}>CLASSIFIED</span>
            </div>
            <p className="text-textPrimary text-sm leading-relaxed font-sans">
              Name&rsquo;s{" "}
              <strong style={{ color: "#FF6B6B" }} className="font-semibold">
                Alex Vance
              </strong>
              . Senior Full-Stack Engineer, Project Lead. A decade running
              high-stakes builds — distributed APIs, serverless pipelines, and
              front-ends that don&rsquo;t choke under pressure.
            </p>
            <p className="text-textMuted text-sm leading-relaxed font-sans">
              Design principles: speed, clean architecture, zero performance
              debt. Every system ships tight — no excuses, no shortcuts.
            </p>
          </div>

          {/* ── CAPABILITY MATRIX — star rating ── */}
          <div className="gta-card p-5 space-y-5">
            <div
              className="text-[10px] text-textMuted tracking-[0.2em] flex items-center gap-2 border-b border-[#282828] pb-3"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse inline-block"
                style={{ background: "#FF3D6B" }}
              />
              <span>CAPABILITY MATRIX</span>
              <span className="ml-auto text-[9px]" style={{ color: "#FF3D6B" }}>
                ★ = WANTED TIER
              </span>
            </div>

            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-1.5">
                  {/* Label row */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div
                        className="text-textPrimary text-[11px] font-bold tracking-widest"
                        style={{ fontFamily: "var(--font-oswald)" }}
                      >
                        {skill.attribute}
                      </div>
                      <div className="text-textMuted text-[10px] mt-0.5 font-sans">
                        {skill.subtitle}
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest ml-4 shrink-0"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        color: skill.stars === 5 ? "#FF3D6B" : "#FF6B6B",
                      }}
                    >
                      {skill.status}
                    </span>
                  </div>

                  {/* Star row */}
                  <StarRating stars={skill.stars} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "YEARS ACTIVE",     value: "10+" },
          { label: "PROJECTS SHIPPED", value: "40+" },
          { label: "UPTIME RATE",      value: "99.9%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="gta-card p-4 text-center gta-stripe-bg"
            style={{ borderTop: "2px solid #FF3D6B" }}
          >
            <div
              className="text-2xl font-black gta-heading text-pink-glow"
              style={{ color: "#FF3D6B" }}
            >
              {stat.value}
            </div>
            <div
              className="text-[10px] text-textMuted tracking-widest mt-1"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
