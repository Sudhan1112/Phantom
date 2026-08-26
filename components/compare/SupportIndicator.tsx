"use client";

import { motion } from "framer-motion";
import type { SupportLevel } from "./compare.config";
import { SUPPORT_LABELS } from "./compare.config";

type SupportIndicatorProps = {
  level: SupportLevel;
  emphasize?: boolean;
  delay?: number;
  active?: boolean;
};

export function SupportIndicator({
  level,
  emphasize = false,
  delay = 0,
  active = true,
}: SupportIndicatorProps) {
  const symbol =
    level === "full" ? "✓" : level === "partial" ? "◐" : level === "conditional" ? "•" : "—";

  return (
    <motion.span
      className={`relative inline-flex h-7 w-7 items-center justify-center text-sm ${
        emphasize
          ? level === "full"
            ? "text-white"
            : "text-[#C0C0C0]"
          : level === "none"
            ? "text-[#C0C0C0]/35"
            : "text-[#C0C0C0]/70"
      }`}
      title={SUPPORT_LABELS[level]}
      aria-label={SUPPORT_LABELS[level]}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={
        active
          ? {
              opacity: 1,
              scale: 1,
            }
          : { opacity: 0, scale: 0.7 }
      }
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {emphasize && level === "full" ? (
        <span
          className="absolute inset-0 rounded-full bg-[#4B0082]/35 blur-[6px]"
          aria-hidden="true"
        />
      ) : null}
      <span className="relative">{symbol}</span>
    </motion.span>
  );
}
