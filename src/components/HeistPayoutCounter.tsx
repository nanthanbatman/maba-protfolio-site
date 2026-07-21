"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface PayoutRow {
  field:      string;
  label:      string;
  display:    string;
  animateTo?: number;
  decimals?:  number;
  prefix?:    string;
  suffix?:    string;
  isLink?:    boolean;
  href?:      string;
}

const payoutRows: PayoutRow[] = [
  {
    field:   "Experience",
    label:   "PLAYTIME IN INDUSTRY",
    display: "5+ YEARS",
  },
  {
    field:      "Code Commits",
    label:      "TOTAL HEISTS COMPLETED",
    display:    "1,240+ COMMITS",
    animateTo:  1240,
    suffix:     "+ COMMITS",
  },
  {
    field:      "Code Coverage",
    label:      "MISSION SUCCESS RATE",
    display:    "99.4%",
    animateTo:  99.4,
    decimals:   1,
    suffix:     "%",
  },
  {
    field:   "Resume PDF",
    label:   "DOWNLOAD MISSION BRIEF",
    display: "[ GET_RESUME.PDF ]",
    isLink:  true,
    href:    "/resume.pdf",
  },
];

function AnimatedValue({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  active,
}: {
  target:   number;
  decimals?: number;
  prefix?:  string;
  suffix?:  string;
  active:   boolean;
}) {
  const spring = useSpring(0, { stiffness: 55, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => {
    const formatted =
      decimals > 0
        ? v.toFixed(decimals)
        : Math.floor(v).toLocaleString("en-US");
    return `${prefix}${formatted}${suffix}`;
  });
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!active) return;
    spring.set(target);
  }, [active, spring, target]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return (
    <motion.span
      className="heist-payout-value tabular-nums"
      initial={{ opacity: 0, x: 12 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: 0.15 }}
    >
      {text}
    </motion.span>
  );
}

function PayoutRowItem({
  row,
  index,
  active,
}: {
  row:    PayoutRow;
  index:  number;
  active: boolean;
}) {
  return (
    <motion.div
      className="heist-payout-row"
      initial={{ opacity: 0, x: -20 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      <div className="heist-payout-field">{row.field}</div>
      <div className="heist-payout-label">{row.label}</div>
      <div className="heist-payout-value-wrap">
        {row.isLink ? (
          <a
            href={row.href}
            download
            className="heist-payout-link"
            aria-label="Download resume PDF"
          >
            {row.display}
          </a>
        ) : row.animateTo !== undefined ? (
          <AnimatedValue
            target={row.animateTo}
            decimals={row.decimals}
            prefix={row.prefix}
            suffix={row.suffix}
            active={active}
          />
        ) : (
          <motion.span
            className="heist-payout-value"
            initial={{ opacity: 0, x: 12 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: index * 0.12 + 0.2 }}
          >
            {row.display}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

export default function HeistPayoutCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} className="heist-payout-panel gta-card gta-stripe-bg">
      <div className="heist-payout-scanline" aria-hidden="true" />
      <div className="heist-payout-header">
        <div className="flex items-center gap-2">
          <span className="heist-payout-live-dot" />
          <span className="heist-payout-live-label">LIVE PAYOUT FEED</span>
        </div>
        <motion.span
          key={tick}
          className="heist-payout-ticker"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {tick % 2 === 0 ? "◈ HEIST STATS SYNCED" : "◈ OPERATOR METRICS VERIFIED"}
        </motion.span>
      </div>

      <div className="heist-payout-title-bar">
        <span className="heist-payout-title">HEIST PAYOUT SUMMARY</span>
        <span className="heist-payout-status">MISSION PASSED</span>
      </div>

      <div className="heist-payout-table-head" aria-hidden="true">
        <span>METRIC FIELD</span>
        <span>GTA STYLE LABEL</span>
        <span>VALUE</span>
      </div>

      <div className="heist-payout-rows">
        {payoutRows.map((row, i) => (
          <PayoutRowItem key={row.field} row={row} index={i} active={inView} />
        ))}
      </div>

      <div className="heist-payout-footer">
        <span className="text-textMuted">TOTAL CREW CUT</span>
        <span className="heist-payout-total">$∞ REPUTATION</span>
      </div>
    </div>
  );
}
