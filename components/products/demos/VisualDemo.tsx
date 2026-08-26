"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STAGES = ["Scanning", "Text Detected", "Question Understood"] as const;

export function VisualDemo() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(2);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const cycle = () => {
      if (cancelled) return;
      setStage(0);
      timers.push(window.setTimeout(() => !cancelled && setStage(1), 1600));
      timers.push(window.setTimeout(() => !cancelled && setStage(2), 2800));
      timers.push(window.setTimeout(() => !cancelled && cycle(), 4800));
    };

    cycle();
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduceMotion]);

  return (
    <div className="flex h-full flex-col p-5 pb-14 sm:p-7 sm:pb-16">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs tracking-[0.16em] text-[#C0C0C0]/70 uppercase">
          Screen capture
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={STAGES[stage]}
            className="rounded-full border border-[#4B0082]/40 bg-[#4B0082]/20 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white uppercase"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {STAGES[stage]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-[#C0C0C0]/18 bg-[#111111]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(75,0,130,0.18)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-[#4B0082] to-transparent shadow-[0_0_18px_rgba(75,0,130,0.85)]"
            animate={{ top: ["8%", "88%", "8%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        <div className="relative z-[1] space-y-3 p-4 sm:p-5">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[#D4AF37]/90 uppercase">
            Question
          </p>
          <motion.p
            className="font-[family-name:var(--font-geist-sans)] text-sm text-white sm:text-[15px]"
            animate={{
              opacity: stage === 0 ? 0.55 : 1,
              filter: stage === 0 ? "blur(0.5px)" : "blur(0px)",
            }}
          >
            What is the output of this code?
          </motion.p>

          <div className="space-y-2 pt-1">
            {["A. 10", "B. 20", "C. 30", "D. Error"].map((option, i) => (
              <motion.div
                key={option}
                className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-[#C0C0C0]"
                animate={{
                  borderColor:
                    stage >= 1 && i === 1
                      ? "rgba(75,0,130,0.55)"
                      : "rgba(255,255,255,0.1)",
                  backgroundColor:
                    stage >= 2 && i === 1
                      ? "rgba(75,0,130,0.18)"
                      : "rgba(0,0,0,0.35)",
                  color:
                    stage >= 2 && i === 1
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(192,192,192,0.9)",
                }}
                transition={{ duration: 0.35 }}
              >
                {option}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
