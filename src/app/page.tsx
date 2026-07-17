"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSound } from "@/context/SoundContext";
import { motion } from "framer-motion";
import OverviewSection from "@/components/OverviewSection";
import CoreTechSection from "@/components/CoreTechSection";
import DeployedProjectsSection from "@/components/DeployedProjectsSection";
import TransmitMessageSection from "@/components/TransmitMessageSection";
import MuteToggle from "@/components/MuteToggle";
import BootSequence from "@/components/BootSequence";
import SystemTelemetry from "@/components/SystemTelemetry";

type SectionId = "overview" | "core-tech" | "projects" | "contact";

interface MenuItem {
  id: string;
  label: string;
  sublabel: string;
  sectionId: SectionId;
}

const menuItems: MenuItem[] = [
  { id: "01", label: "THE_LEAD",  sublabel: "OVERVIEW",     sectionId: "overview" },
  { id: "02", label: "INVENTORY", sublabel: "CORE_TECH",    sectionId: "core-tech" },
  { id: "03", label: "HEISTS",    sublabel: "PROJECTS",     sectionId: "projects" },
  { id: "04", label: "CONTACT",   sublabel: "VIP_CONTRACT", sectionId: "contact" },
];

export default function Home() {
  const { playHover, playConfirm } = useSound();

  const [mounted, setMounted]         = useState(false);
  const [isBooted, setIsBooted]       = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [hoveredIndex, setHoveredIndex]   = useState<number | null>(null);

  // One ref per section so we can scrollIntoView and observe intersection
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    "overview":  null,
    "core-tech": null,
    "projects":  null,
    "contact":   null,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // ── IntersectionObserver — updates active nav item as user scrolls ──
  useEffect(() => {
    if (!isBooted) return;

    const observers: IntersectionObserver[] = [];

    (Object.keys(sectionRefs.current) as SectionId[]).forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          // When a section is at least 40% visible, mark it active
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: scrollContainerRef.current,
          threshold: 0.4,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isBooted]);

  // ── Scroll to section ──────────────────────────────────────────────
  const scrollToSection = useCallback((sectionId: SectionId) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;
    playConfirm();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [playConfirm]);

  // ── Keyboard navigation ────────────────────────────────────────────
  useEffect(() => {
    if (!isBooted) return;
    const currentIdx = menuItems.findIndex((m) => m.sectionId === activeSection);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) return;

      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        const next = menuItems[(currentIdx + 1) % menuItems.length];
        playHover();
        scrollToSection(next.sectionId);
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        const prev = menuItems[(currentIdx - 1 + menuItems.length) % menuItems.length];
        playHover();
        scrollToSection(prev.sectionId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBooted, activeSection, playHover, scrollToSection]);

  // ── SSR shell ─────────────────────────────────────────────────────
  if (!mounted) return <div className="w-screen h-screen bg-canvas" />;
  if (!isBooted) return <BootSequence onComplete={() => setIsBooted(true)} />;

  const activeIdx = menuItems.findIndex((m) => m.sectionId === activeSection);

  return (
    <div className="w-screen h-screen overflow-hidden bg-canvas select-none gta-bg-pattern flex flex-col lg:flex-row">

      {/* ─── Mobile Header ──────────────────────────────── */}
      <header className="lg:hidden w-full bg-panel border-b border-[#2A1545] flex flex-col shrink-0 z-40">
        <div className="px-4 py-2 flex justify-between items-center"
          style={{ background: "linear-gradient(90deg, #E91E8C, #9B27AF)" }}>
          <span className="gta-heading text-white text-base">ALEX VANCE</span>
          <span className="text-white/80 text-[9px] font-bold tracking-widest"
            style={{ fontFamily: "var(--font-oswald)" }}>
            ELITE ENGINEER
          </span>
        </div>
        <nav className="flex overflow-x-auto scrollbar-none">
          {menuItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.sectionId)}
                onMouseEnter={playHover}
                className={`flex-shrink-0 px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-b-[#E91E8C] text-[#FF69B4] bg-[#160D28]"
                    : "border-b-transparent text-textMuted hover:text-textPrimary hover:bg-[#1E1035]"
                }`}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {item.id} {item.sublabel}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ─── Desktop Left Sidebar ───────────────────────── */}
      <aside className="hidden lg:flex shrink-0 w-[280px] xl:w-[300px] h-full flex-col border-r border-[#2A1545] bg-panel z-30 overflow-hidden">
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">

          {/* Brand */}
          <div className="px-6 py-5 shrink-0"
            style={{ background: "linear-gradient(135deg, #E91E8C 0%, #9B27AF 100%)" }}>
            <div className="gta-heading text-white text-2xl leading-tight">
              ALEX VANCE
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] mt-1"
              style={{ fontFamily: "var(--font-oswald)", color: "rgba(255,255,255,0.75)" }}>
              ELITE FULL-STACK ENGINEER
            </div>
            <div className="text-[10px] tracking-widest mt-0.5"
              style={{ fontFamily: "var(--font-oswald)", color: "rgba(255,255,255,0.5)" }}>
              PROJECT LEAD
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1">
            {menuItems.map((item, idx) => {
              const isActive = activeSection === item.sectionId;
              const isHovered = hoveredIndex === idx;
              const highlighted = isActive || isHovered;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.sectionId)}
                  onMouseEnter={() => { setHoveredIndex(idx); playHover(); }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`gta-nav-item w-full text-left px-6 py-5 border-b border-[#2A1545] flex items-center justify-between outline-none cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-bold w-6 transition-colors duration-150"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        color: highlighted ? "#ffffff" : "#3D2460",
                      }}
                    >
                      {item.id}
                    </span>
                    <div>
                      <div
                        className="text-[13px] font-bold tracking-[0.15em] transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-oswald)",
                          color: highlighted ? "#ffffff" : "#7B6A9A",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-[10px] tracking-widest mt-0.5 transition-colors duration-150"
                        style={{
                          fontFamily: "var(--font-oswald)",
                          color: highlighted ? "rgba(255,255,255,0.65)" : "#3D2460",
                        }}
                      >
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {/* Crosshair */}
                  <div
                    className="relative w-4 h-4 shrink-0 transition-opacity duration-150"
                    style={{ opacity: highlighted ? 1 : 0 }}
                  >
                    <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "#ffffff", transform: "translateY(-50%)" }} />
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "#ffffff", transform: "translateX(-50%)" }} />
                    <div style={{ position: "absolute", inset: 4, border: "1px solid #ffffff", borderRadius: "50%" }} />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Telemetry + keyboard hints */}
          <div className="p-4 space-y-4 shrink-0 border-t border-[#2A1545]">
            <SystemTelemetry />
            <div
              className="space-y-1.5 text-[9px] text-[#3D2460]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <div className="flex items-center gap-2">
                <span className="border border-[#2A1545] text-textMuted px-1.5 py-0.5 text-[9px]">W</span>
                <span className="border border-[#2A1545] text-textMuted px-1.5 py-0.5 text-[9px]">S</span>
                <span>/ scroll to navigate</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Scrollable Content ─────────────────────────── */}
      <main
        ref={scrollContainerRef}
        className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Each section gets its own scroll-mt so it lands below the sticky header on mobile */}
        <section
          id="overview"
          ref={(el) => { sectionRefs.current["overview"] = el; }}
          className="min-h-screen px-6 py-12 md:px-10 md:py-14 scroll-mt-24"
        >
          <div className="max-w-5xl xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <OverviewSection />
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-6 md:mx-10 border-t border-[#2A1545]" />

        <section
          id="core-tech"
          ref={(el) => { sectionRefs.current["core-tech"] = el; }}
          className="min-h-screen px-6 py-12 md:px-10 md:py-14 scroll-mt-24"
        >
          <div className="max-w-5xl xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CoreTechSection />
            </motion.div>
          </div>
        </section>

        <div className="mx-6 md:mx-10 border-t border-[#2A1545]" />

        <section
          id="projects"
          ref={(el) => { sectionRefs.current["projects"] = el; }}
          className="min-h-screen px-6 py-12 md:px-10 md:py-14 scroll-mt-24"
        >
          <div className="max-w-5xl xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <DeployedProjectsSection />
            </motion.div>
          </div>
        </section>

        <div className="mx-6 md:mx-10 border-t border-[#2A1545]" />

        <section
          id="contact"
          ref={(el) => { sectionRefs.current["contact"] = el; }}
          className="min-h-screen px-6 py-12 md:px-10 md:py-14 scroll-mt-24"
        >
          <div className="max-w-5xl xl:max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TransmitMessageSection />
            </motion.div>
          </div>
        </section>

        {/* Bottom padding */}
        <div className="h-24" />
      </main>

      {/* Right-edge scroll progress bar */}
      <div
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1 flex-col pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 transition-colors duration-300"
            style={{ background: activeSection === item.sectionId ? "#E91E8C" : "#160D28" }}
          />
        ))}
      </div>

      <MuteToggle />
    </div>
  );
}
