"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const RESPONSE =
  "A scalable API separates concerns, uses caching, and designs for horizontal growth.";
const STAGES = ["AI Response", "Input Field", "Text Appearing"] as const;

export function AutoTypingDemo() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduceMotion) {
      setStage(2);
      setTyped(RESPONSE);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const run = () => {
      if (cancelled) return;
      setStage(0);
      setTyped("");

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setStage(1);
          timers.push(
            window.setTimeout(() => {
              if (cancelled) return;
              setStage(2);
              let i = 0;
              const interval = window.setInterval(() => {
                if (cancelled) {
                  window.clearInterval(interval);
                  return;
                }
                i += 1;
                setTyped(RESPONSE.slice(0, i));
                if (i >= RESPONSE.length) {
                  window.clearInterval(interval);
                  timers.push(
                    window.setTimeout(() => {
                      if (!cancelled) run();
                    }, 2200)
                  );
                }
              }, 22);
              timers.push(interval);
            }, 700)
          );
        }, 1200)
      );
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [reduceMotion]);

  return (
    <div className="flex h-full flex-col gap-4 p-5 pb-14 sm:p-7 sm:pb-16">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs tracking-[0.16em] text-[#C0C0C0]/70 uppercase">
          Controlled insertion
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={STAGES[stage]}
            className="text-xs font-medium text-white"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {STAGES[stage]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        className="rounded-xl border border-white/10 bg-[#111111]/90 p-4"
        animate={{
          opacity: stage === 0 ? 1 : 0.55,
          borderColor:
            stage === 0
              ? "rgba(75,0,130,0.45)"
              : "rgba(255,255,255,0.1)",
        }}
      >
        <p className="mb-2 text-[10px] tracking-[0.16em] text-[#C0C0C0]/55 uppercase">
          AI response
        </p>
        <p className="text-sm leading-relaxed text-white/90">{RESPONSE}</p>
      </motion.div>

      <motion.div
        className="relative flex-1 rounded-xl border bg-black/50 p-4"
        animate={{
          borderColor:
            stage >= 1
              ? "rgba(75,0,130,0.55)"
              : "rgba(192,192,192,0.18)",
          boxShadow:
            stage >= 1
              ? "0 0 32px rgba(75,0,130,0.2)"
              : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <p className="mb-2 text-[10px] tracking-[0.16em] text-[#C0C0C0]/55 uppercase">
          Answer field
        </p>
        <p className="min-h-[3.5rem] font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-white/90">
          {typed}
          {stage === 2 && typed.length < RESPONSE.length ? (
            <motion.span
              className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] bg-[#D4AF37]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.65, repeat: Infinity }}
            />
          ) : null}
          {stage === 1 && typed.length === 0 ? (
            <motion.span
              className="inline-block h-3.5 w-[2px] bg-[#D4AF37]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.65, repeat: Infinity }}
            />
          ) : null}
        </p>
      </motion.div>
    </div>
  );
}
