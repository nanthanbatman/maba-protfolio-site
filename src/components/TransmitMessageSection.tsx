"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export default function TransmitMessageSection() {
  const { playHover, playConfirm } = useSound();
  const [formData, setFormData] = useState({ client: "", secureEmail: "", brief: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMissionPassed, setShowMissionPassed] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client || !formData.secureEmail || !formData.brief) return;
    setIsSubmitting(true);
    playConfirm();
    setTimeout(() => {
      setIsSubmitting(false);
      setShowMissionPassed(true);
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.35);
          });
        }
      } catch {}
      setTimeout(() => { setShowMissionPassed(false); setIsDone(true); }, 3800);
    }, 1800);
  };

  const handleReset = () => {
    playConfirm();
    setFormData({ client: "", secureEmail: "", brief: "" });
    setIsDone(false); setIsSubmitting(false); setShowMissionPassed(false);
  };

  return (
    <>
      <AnimatePresence>
        {showMissionPassed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "rgba(14,8,24,0.96)" }} aria-live="polite">
            <div className="text-center space-y-4 px-8">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 16 }}
                className="text-8xl font-black text-gradient"
                style={{ fontFamily: "var(--font-montserrat)" }}>$</motion.div>
              <div className="mission-passed-text text-5xl md:text-6xl leading-none"
                style={{ fontFamily: "var(--font-montserrat)" }}>MISSION PASSED</div>
              <motion.div className="respect-text space-y-1 opacity-0"
                style={{ fontFamily: "var(--font-oswald)" }}>
                <div className="text-textMuted text-sm tracking-[0.3em] uppercase">Message Transmitted</div>
                <div className="text-sm tracking-[0.3em] font-bold uppercase"
                  style={{ color: "#FF69B4" }}>Respect +</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <div className="border-b border-[#2A1545] pb-4">
          <div className="text-[10px] tracking-[0.2em] mb-1"
            style={{ fontFamily: "var(--font-oswald)", color: "#E91E8C" }}>04 // CONTACT</div>
          <h2 className="gta-heading text-3xl text-gradient">VIP_CONTRACT</h2>
          <p className="text-textMuted text-[11px] tracking-widest mt-1"
            style={{ fontFamily: "var(--font-oswald)" }}>SUBMIT YOUR BRIEF — WE&apos;LL CLOSE THE DEAL</p>
        </div>

        <div className="gta-card p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: "linear-gradient(180deg,#E91E8C,#9B27AF)" }} />
          <div className="flex justify-between items-center mb-6 pl-4"
            style={{ fontFamily: "var(--font-oswald)" }}>
            <div className="space-y-0.5">
              <div className="text-[11px] text-textPrimary font-semibold tracking-widest uppercase">
                Secure Uplink Terminal</div>
              <div className="text-[10px] text-textMuted tracking-widest">ENCRYPTION: ACTIVE</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E91E8C" }} />
              <span className="text-[10px] tracking-widest" style={{ color: "#E91E8C" }}>ONLINE</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isDone ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-10 text-center space-y-4">
                <div className="text-4xl font-black text-gradient"
                  style={{ fontFamily: "var(--font-montserrat)" }}>✓ CONTRACT FILED</div>
                <p className="text-textMuted text-sm" style={{ fontFamily: "var(--font-oswald)" }}>
                  Transmission received. You&apos;ll hear back within 24 hours.</p>
                <button onClick={handleReset} onMouseEnter={playHover}
                  className="gta-btn-outline px-6 py-2.5 text-[11px] mt-4">SEND ANOTHER</button>
              </motion.div>
            ) : isSubmitting ? (
              <motion.div key="transmitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-10 flex flex-col items-center gap-4">
                <div className="flex gap-1.5">
                  {[0,1,2,3,4].map((i) => (
                    <motion.div key={i} className="w-2 h-2"
                      style={{ background: "#E91E8C" }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }} />
                  ))}
                </div>
                <div className="text-textMuted text-[11px] tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-oswald)" }}>EXECUTING CONTRACT...</div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-5 pl-4">
                {[
                  { id: "client",      label: "Name / Organization", placeholder: "ENTER NAME / ORGANIZATION", type: "text" },
                  { id: "secureEmail", label: "Contact Email",        placeholder: "ENTER CONTACT EMAIL",       type: "email" },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id}
                      className="block text-[10px] tracking-[0.2em] text-textMuted uppercase"
                      style={{ fontFamily: "var(--font-oswald)" }}>{field.label}</label>
                    <input id={field.id} name={field.id} type={field.type} required
                      value={(formData as any)[field.id]}
                      onChange={handleChange} onFocus={playHover}
                      placeholder={field.placeholder} className="gta-input" />
                  </div>
                ))}
                <div className="space-y-2">
                  <label htmlFor="brief" className="block text-[10px] tracking-[0.2em] text-textMuted uppercase"
                    style={{ fontFamily: "var(--font-oswald)" }}>Contract Brief</label>
                  <textarea id="brief" name="brief" rows={4} required
                    value={formData.brief} onChange={handleChange} onFocus={playHover}
                    placeholder="OUTLINE YOUR CONTRACT / TARGET BRIEF" className="gta-input resize-none" />
                </div>
                <div className="pt-2">
                  <button type="submit" onMouseEnter={playHover}
                    className="gta-btn-primary px-8 py-3 text-[12px] tracking-widest">
                    EXECUTE CONTRACT
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
