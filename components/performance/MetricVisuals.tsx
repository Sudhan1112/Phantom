"use client";

import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ProgressRingProps = {
  percent: number;
  active: boolean;
  size?: number;
  stroke?: number;
  children?: ReactNode;
};

export function ProgressRing({
  percent,
  active,
  size = 128,
  stroke = 3,
  children,
}: ProgressRingProps) {
  const reduceMotion = useReducedMotion();
  const gradientId = useId();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (target / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(192,192,192,0.12)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: active || reduceMotion ? offset : circumference,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(75,0,130,0.55))",
          }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B0082" />
            <stop offset="100%" stopColor="#C0C0C0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function PulseLine({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-8 w-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#C0C0C0]/35 to-transparent" />
      <div className="absolute inset-x-[8%] top-1/2 flex -translate-y-1/2 justify-between">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-[#C0C0C0]/25"
          />
        ))}
      </div>
      {(active || reduceMotion) && !reduceMotion ? (
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#4B0082] shadow-[0_0_14px_rgba(75,0,130,0.9)]"
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4B0082]/80" />
      )}
    </div>
  );
}

export function LanguageNetwork({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { x: 50, y: 18 },
    { x: 22, y: 38 },
    { x: 78, y: 36 },
    { x: 30, y: 68 },
    { x: 70, y: 70 },
    { x: 50, y: 52 },
  ];

  return (
    <svg viewBox="0 0 100 90" className="h-16 w-full" aria-hidden="true">
      <motion.circle
        cx="50"
        cy="48"
        r="22"
        fill="none"
        stroke="rgba(192,192,192,0.12)"
        strokeWidth="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
      />
      {nodes.slice(0, 5).map((node, i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[5].x}
          y1={nodes[5].y}
          x2={node.x}
          y2={node.y}
          stroke="rgba(75,0,130,0.45)"
          strokeWidth="0.7"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.12 * i, duration: 0.4 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={i === 5 ? 2.4 : 1.6}
          fill={i === 5 ? "#4B0082" : "#C0C0C0"}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.4,
          }}
          transition={{ delay: reduceMotion ? 0 : 0.08 * i, duration: 0.35 }}
        />
      ))}
    </svg>
  );
}

export function TokenFlow({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const bars = [10, 8, 6, 4, 3];

  return (
    <div className="w-full" aria-hidden="true">
      <div className="mb-2 flex items-center justify-between gap-1 text-[9px] tracking-[0.14em] text-[#C0C0C0]/55 uppercase">
        <span>Input</span>
        <span>Optimize</span>
        <span>Response</span>
      </div>
      <div className="flex items-end justify-between gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-full rounded-sm bg-gradient-to-t from-[#4B0082]/80 to-[#C0C0C0]/50"
            initial={{ height: 4, opacity: 0.3 }}
            animate={{
              height: active ? h * 4 : 4,
              opacity: active ? 1 - i * 0.12 : 0.3,
            }}
            transition={{
              delay: reduceMotion ? 0 : 0.1 * i,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
