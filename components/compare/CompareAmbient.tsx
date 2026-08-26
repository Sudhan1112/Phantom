"use client";

import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { left: "12%", top: "18%", size: 2, delay: 0 },
  { left: "28%", top: "62%", size: 1.5, delay: 0.8 },
  { left: "44%", top: "28%", size: 2, delay: 1.4 },
  { left: "58%", top: "72%", size: 1.5, delay: 0.3 },
  { left: "72%", top: "22%", size: 2.5, delay: 1.1 },
  { left: "84%", top: "48%", size: 1.5, delay: 1.9 },
  { left: "18%", top: "78%", size: 2, delay: 0.5 },
  { left: "66%", top: "40%", size: 1.5, delay: 1.6 },
  { left: "38%", top: "52%", size: 2, delay: 2.2 },
  { left: "90%", top: "68%", size: 1.5, delay: 0.9 },
];

type CompareAmbientProps = {
  platformHovered: boolean;
};

export function CompareAmbient({ platformHovered }: CompareAmbientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-[18%] top-[18%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.32)_0%,transparent_68%)] blur-3xl"
        animate={{
          opacity: platformHovered ? 0.95 : 0.7,
          scale: platformHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute left-[22%] top-[32%] h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.45)_0%,transparent_70%)] blur-2xl"
        animate={{
          opacity: platformHovered ? 1 : 0.75,
          scale: platformHovered ? 1.12 : 1,
        }}
        transition={{ duration: 0.55 }}
      />
      <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-[#C0C0C0]/12 to-transparent" />
      <div className="absolute inset-x-[10%] top-[20%] bottom-[10%] opacity-[0.045]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(192,192,192,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>
      <div className="absolute left-[20%] top-[30%] h-40 w-px bg-gradient-to-b from-[#D4AF37]/25 via-transparent to-transparent opacity-40" />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#C0C0C0]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={
            reduceMotion
              ? { opacity: platformHovered ? 0.55 : 0.28 }
              : {
                  opacity: platformHovered
                    ? [0.25, 0.7, 0.25]
                    : [0.12, 0.4, 0.12],
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: 4.5 + i * 0.15,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
