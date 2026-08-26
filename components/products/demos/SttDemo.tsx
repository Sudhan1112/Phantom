"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STAGES = ["Listening", "Transcribing", "Understanding", "Ready"] as const;
const TRANSCRIPT =
  "Can you walk me through how you would design a scalable API?";

export function SttDemo() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(3);
      setChars(TRANSCRIPT.length);
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setStage(0);
      setChars(0);

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setStage(1);
          let i = 0;
          const type = window.setInterval(() => {
            if (cancelled) {
              window.clearInterval(type);
              return;
            }
            i += 1;
            setChars(i);
            if (i >= TRANSCRIPT.length) {
              window.clearInterval(type);
              setStage(2);
              timers.push(
                window.setTimeout(() => {
                  if (!cancelled) setStage(3);
                }, 900)
              );
              timers.push(
                window.setTimeout(() => {
                  if (!cancelled) run();
                }, 2800)
              );
            }
          }, 28);
          timers.push(type);
        }, 1400)
      );
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduceMotion]);

  return (
    <div className="flex h-full flex-col justify-between p-5 pb-14 sm:p-7 sm:pb-16">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#C0C0C0]/25 bg-[#4B0082]/25">
            <motion.span
              className="absolute inset-0 rounded-full border border-[#4B0082]/50"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <svg
              viewBox="0 0 24 24"
              className="relative h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path
                d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
                strokeLinecap="round"
              />
              <path d="M6 11a6 6 0 0 0 12 0M12 17v3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-[#C0C0C0]/70 uppercase">
              Voice capture
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={STAGES[stage]}
                className="mt-0.5 text-sm font-medium text-white"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {STAGES[stage]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {STAGES.map((label, i) => (
            <span
              key={label}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i <= stage ? "bg-[#4B0082]" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex h-14 items-end justify-center gap-[3px] sm:h-16">
        {Array.from({ length: 28 }).map((_, i) => {
          const mid = Math.abs(i - 13.5) / 13.5;
          const base = 0.22 + (1 - mid) * 0.55;
          return (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-[#4B0082] to-[#C0C0C0]"
              animate={
                reduceMotion || stage >= 3
                  ? { height: `${base * 36}%` }
                  : {
                      height: [
                        `${base * 28}%`,
                        `${base * 100}%`,
                        `${base * 40}%`,
                      ],
                    }
              }
              transition={{
                duration: 0.7 + (i % 5) * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03,
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
        <p className="mb-2 text-[10px] tracking-[0.18em] text-[#C0C0C0]/55 uppercase">
          Transcription
        </p>
        <p className="min-h-[3.2rem] font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-white/90 sm:text-[15px]">
          {TRANSCRIPT.slice(0, chars)}
          {stage === 1 ? (
            <motion.span
              className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] bg-[#D4AF37]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          ) : null}
        </p>
        {stage >= 2 ? (
          <motion.p
            className="mt-3 text-xs text-[#C0C0C0]/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {stage === 3
              ? "Intelligence ready for the next action."
              : "Interpreting context…"}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
