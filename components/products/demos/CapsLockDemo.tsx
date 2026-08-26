"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STAGES = [
  "Caps Lock",
  "AI Activated",
  "Input Detected",
  "Intelligence Ready",
] as const;

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function CapsLockDemo() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(3);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const cycle = () => {
      if (cancelled) return;
      setStage(0);
      timers.push(window.setTimeout(() => !cancelled && setStage(1), 900));
      timers.push(window.setTimeout(() => !cancelled && setStage(2), 1800));
      timers.push(window.setTimeout(() => !cancelled && setStage(3), 2700));
      timers.push(window.setTimeout(() => !cancelled && cycle(), 4500));
    };

    cycle();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduceMotion]);

  const active = stage >= 1;

  return (
    <div className="flex h-full flex-col justify-between p-5 pb-14 sm:p-7 sm:pb-16">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.16em] text-[#C0C0C0]/70 uppercase">
          Keyboard activation
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={STAGES[stage]}
            className="text-xs font-medium text-white sm:text-sm"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {STAGES[stage]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-5 w-full max-w-md">
        <div className="space-y-1.5 rounded-2xl border border-[#C0C0C0]/15 bg-[#0d0d0d] p-3 sm:p-4">
          {KEYS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1 sm:gap-1.5"
              style={{ paddingLeft: rowIndex * 10 }}
            >
              {row.map((key) => (
                <span
                  key={key}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] text-[#C0C0C0]/65 sm:h-8 sm:w-8 sm:text-[11px]"
                >
                  {key}
                </span>
              ))}
            </div>
          ))}

          <div className="flex justify-center pt-1">
            <motion.div
              className="relative flex h-9 w-[7.5rem] items-center justify-center rounded-md border text-[11px] font-medium tracking-wide sm:h-10 sm:w-36 sm:text-xs"
              animate={{
                borderColor: active
                  ? "rgba(75,0,130,0.75)"
                  : "rgba(192,192,192,0.25)",
                backgroundColor: active
                  ? "rgba(75,0,130,0.28)"
                  : "rgba(255,255,255,0.04)",
                color: active ? "#FFFFFF" : "rgba(192,192,192,0.8)",
                boxShadow: active
                  ? "0 0 28px rgba(75,0,130,0.45), inset 0 0 12px rgba(75,0,130,0.25)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.4 }}
            >
              {active && !reduceMotion ? (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-md border border-[#4B0082]/50"
                  animate={{ opacity: [0.7, 0.15, 0.7], scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              ) : null}
              caps lock
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {STAGES.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i <= stage ? "bg-[#4B0082]" : "bg-white/15"
              }`}
            />
            {i < STAGES.length - 1 ? (
              <span
                className={`hidden h-px w-6 sm:block ${
                  i < stage ? "bg-[#4B0082]/60" : "bg-white/10"
                }`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
