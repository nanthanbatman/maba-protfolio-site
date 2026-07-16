"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GTACursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const pos        = useRef({ x: -200, y: -200 });
  const raf        = useRef<number | null>(null);
  const [state, setState] = useState<"default" | "pointer" | "text" | "pressed">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const computed = window.getComputedStyle(el).cursor;

      if (tag === "input" || tag === "textarea" || computed === "text") {
        setState("text");
      } else if (
        el.closest("button") ||
        el.closest("a") ||
        computed === "pointer"
      ) {
        setState("pointer");
      } else {
        setState("default");
      }
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setState("pressed");
    const onUp     = (e: MouseEvent) => {
      // re-check after release
      const el = e.target as HTMLElement;
      if (el.closest("button") || el.closest("a")) setState("pointer");
      else setState("default");
    };

    // RAF render loop — zero-lag position update
    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px,${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
    };
  }, [visible]);

  const isPointer = state === "pointer";
  const isPressed = state === "pressed";
  const isText    = state === "text";

  // sizes
  const ringSize  = isPointer ? 38 : isPressed ? 20 : 28;
  const dotSize   = isPressed ? 2  : isText    ? 0  : 4;
  const tickLen   = isPointer ? 9  : 6;
  const gap       = isPointer ? ringSize / 2 + 3 : ringSize / 2 + 2;

  // colour: pink on clickables, white otherwise
  const color     = isPointer ? "#FF3D6B" : "#FFFFFF";
  const opacity   = isPressed ? 0.7 : 1;
  const trans     = "all 0.12s cubic-bezier(0.25,0.46,0.45,0.94)";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         0,
        height:        0,
        pointerEvents: "none",
        zIndex:        999999,
        opacity:       visible ? opacity : 0,
        transition:    "opacity 0.2s",
        willChange:    "transform",
      }}
    >
      {/* ── Outer ring ── */}
      <div style={{
        position:     "absolute",
        width:        ringSize,
        height:       ringSize,
        top:          -(ringSize / 2),
        left:         -(ringSize / 2),
        border:       `1.5px solid ${color}`,
        borderRadius: "50%",
        opacity:      isText ? 0.4 : 0.85,
        transition:   trans,
        boxShadow:    isPointer
          ? `0 0 12px rgba(255,61,107,0.5), inset 0 0 8px rgba(255,61,107,0.12)`
          : "none",
      }} />

      {/* ── Centre dot ── */}
      {dotSize > 0 && (
        <div style={{
          position:     "absolute",
          width:        dotSize,
          height:       dotSize,
          top:          -(dotSize / 2),
          left:         -(dotSize / 2),
          background:   color,
          borderRadius: "50%",
          transition:   trans,
          boxShadow:    isPointer ? `0 0 8px ${color}` : "none",
        }} />
      )}

      {/* ── Text cursor bar ── */}
      {isText && (
        <div style={{
          position:   "absolute",
          width:      2,
          height:     18,
          top:        -9,
          left:       -1,
          background: "#FF3D6B",
          borderRadius: 1,
          animation:  "caret-blink 0.9s steps(2, start) infinite",
        }} />
      )}

      {/* ── Tick marks (hidden for text cursor) ── */}
      {!isText && (
        <>
          {/* Top */}
          <div style={{
            position:   "absolute",
            width:      1.5,
            height:     tickLen,
            top:        -gap - tickLen,
            left:       -0.75,
            background: color,
            transition: trans,
          }} />
          {/* Bottom */}
          <div style={{
            position:   "absolute",
            width:      1.5,
            height:     tickLen,
            top:        gap,
            left:       -0.75,
            background: color,
            transition: trans,
          }} />
          {/* Left */}
          <div style={{
            position:   "absolute",
            height:     1.5,
            width:      tickLen,
            left:       -gap - tickLen,
            top:        -0.75,
            background: color,
            transition: trans,
          }} />
          {/* Right */}
          <div style={{
            position:   "absolute",
            height:     1.5,
            width:      tickLen,
            left:       gap,
            top:        -0.75,
            background: color,
            transition: trans,
          }} />
        </>
      )}
    </div>
  );
}
