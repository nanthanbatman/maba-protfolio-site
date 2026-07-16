"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { ExternalLink, Github } from "lucide-react";

const PINK  = "#FF3D6B";
const CORAL = "#FF6B6B";

const projects = [
  {
    id: "01", missionName: "HEIST_ALPHA", title: "NEXUS_DB",
    description: "Distributed data platform with real-time GraphQL subscriptions, row-level security, and edge caching. Built to handle 10k+ concurrent sessions without breaking a sweat.",
    tags: ["NEXT.JS", "GRAPHQL", "POSTGRESQL"], payout: "100% SUCCESS", teamRole: "LEADER",
    liveUrl: "#", repoUrl: "#",
  },
  {
    id: "02", missionName: "HEIST_BRAVO", title: "AETHER_FLOW",
    description: "High-throughput real-time event pipeline using WebSockets and Redis pub/sub. Sub-20ms latency across global edge nodes.",
    tags: ["NODE.JS", "WEBSOCKETS", "REDIS"], payout: "100% SUCCESS", teamRole: "ARCHITECT",
    liveUrl: "#", repoUrl: "#",
  },
  {
    id: "03", missionName: "HEIST_CHARLIE", title: "KRONOS_CRON",
    description: "Enterprise-grade job scheduling system. Containerized, horizontally scalable, with full observability and zero missed executions.",
    tags: ["REACT", "TAILWIND", "DOCKER"], payout: "100% SUCCESS", teamRole: "LEADER",
    liveUrl: "#", repoUrl: "#",
  },
  {
    id: "04", missionName: "HEIST_DELTA", title: "HELIOS_SYS",
    description: "Multi-region cloud infrastructure managed via Terraform. Auto-scaling, zero-downtime deploys, 99.99% SLA across 3 availability zones.",
    tags: ["AWS", "TERRAFORM", "TYPESCRIPT"], payout: "100% SUCCESS", teamRole: "ARCHITECT",
    liveUrl: "#", repoUrl: "#",
  },
];

export default function DeployedProjectsSection() {
  const { playHover, playConfirm } = useSound();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#282828] pb-4">
        <div className="text-[10px] tracking-[0.2em] mb-1"
          style={{ fontFamily: "var(--font-oswald)", color: PINK }}>
          03 // HEISTS
        </div>
        <h2 className="gta-heading text-3xl text-textPrimary">PROJECTS</h2>
        <p className="text-textMuted text-[11px] tracking-widest mt-1"
          style={{ fontFamily: "var(--font-oswald)" }}>
          ACTIVE MISSIONS &amp; COMPLETED HEISTS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25, delay: idx * 0.07 }}
            onMouseEnter={playHover}
            className="relative gta-card gta-card-slash flex flex-col overflow-hidden group transition-all duration-200 hover:border-[#FF3D6B]"
          >
            <div className="px-5 pt-5 pb-4 border-b border-[#282828]" style={{ background: "#111" }}>
              <div className="text-[9px] text-textMuted tracking-[0.3em] mb-1"
                style={{ fontFamily: "var(--font-oswald)" }}>
                MISSION: {proj.missionName}
              </div>
              <h3 className="gta-heading text-xl text-textPrimary leading-none group-hover:text-[#FF3D6B] transition-colors duration-200">
                {proj.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[9px] text-white px-2 py-0.5 font-bold tracking-widest"
                  style={{ fontFamily: "var(--font-oswald)", background: PINK }}>
                  PAYOUT: {proj.payout}
                </span>
                <span className="text-[9px] px-2 py-0.5 font-bold tracking-widest"
                  style={{ fontFamily: "var(--font-oswald)", border: `1px solid ${CORAL}`, color: CORAL }}>
                  TEAM: {proj.teamRole}
                </span>
              </div>
            </div>

            <div className="flex-1 px-5 py-4 space-y-4">
              <p className="text-textMuted text-sm leading-relaxed font-sans">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((tag, i) => (
                  <span key={i} className="text-[9px] text-textMuted border border-[#2e2e2e] px-2 py-0.5 tracking-wider"
                    style={{ fontFamily: "var(--font-oswald)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-3">
              <a href={proj.liveUrl} onClick={playConfirm}
                className="gta-btn-primary flex items-center gap-2 px-4 py-2.5 text-[11px]">
                START_MISSION <ExternalLink size={11} />
              </a>
              <a href={proj.repoUrl} onClick={playConfirm}
                className="gta-btn-outline flex items-center gap-2 px-4 py-2.5 text-[11px]">
                REVIEW_PLANS <Github size={11} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
