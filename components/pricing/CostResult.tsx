"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CREDIT_VALUE_INR,
  GROSS_MARGIN,
} from "./pricing.config";
import type { CostBreakdown } from "./pricing.math";
import { formatCredits, formatInr } from "./pricing.math";

type CostResultProps = {
  breakdown: CostBreakdown;
  parts?: { label: string; amount: number }[];
};

export function CostResult({ breakdown, parts }: CostResultProps) {
  const providerShare =
    breakdown.customerPrice > 0
      ? (breakdown.providerCost / breakdown.customerPrice) * 100
      : 20;
  const profitShare = 100 - providerShare;

  return (
    <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-[#C0C0C0]/16 bg-[#0A0A0A]/95 p-6 sm:p-7">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(75,0,130,0.35)_0%,transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.22)_0%,transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#C0C0C0]/60 uppercase">
          Estimated Usage Cost
        </p>

        {!breakdown.available ? (
          <div className="mt-6">
            <p className="font-[family-name:var(--font-geist-sans)] text-2xl font-medium text-white">
              Not currently estimated
            </p>
            {breakdown.note ? (
              <p className="mt-3 text-sm leading-relaxed text-[#C0C0C0]/65">
                {breakdown.note}
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.p
                key={breakdown.customerPrice.toFixed(2)}
                className="mt-4 font-[family-name:var(--font-geist-sans)] text-[clamp(2.4rem,5vw,3.4rem)] font-medium leading-none tracking-[-0.04em] text-white"
                initial={{ opacity: 0.4, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
              >
                {formatInr(breakdown.customerPrice)}
              </motion.p>
            </AnimatePresence>
            <motion.span
              key={`pulse-${breakdown.customerPrice.toFixed(2)}`}
              className="mt-3 block h-px w-24 bg-gradient-to-r from-[#4B0082] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: "left" }}
            />

            <dl className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-[#C0C0C0]/65">Provider Cost</dt>
                <dd className="text-white">
                  {formatInr(breakdown.providerCost)}
                </dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-[#C0C0C0]/65">Gross Profit</dt>
                <dd className="text-white">
                  {formatInr(breakdown.grossProfit)}
                </dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-[#C0C0C0]/65">Gross Margin</dt>
                <dd className="text-[#D4AF37]/90">
                  {(breakdown.grossMargin * 100).toFixed(0)}%
                </dd>
              </div>
            </dl>

            {parts && parts.length > 0 ? (
              <div className="mt-6 space-y-2 border-t border-white/8 pt-5">
                <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/45 uppercase">
                  Workflow parts
                </p>
                {parts.map((part) => (
                  <div
                    key={part.label}
                    className="flex items-center justify-between text-xs text-[#C0C0C0]/75"
                  >
                    <span>{part.label}</span>
                    <span>{formatInr(part.amount)}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 rounded-xl border border-white/8 bg-black/40 p-4">
              <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/50 uppercase">
                Cost Breakdown
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#C0C0C0]/65">Provider Cost</span>
                  <span className="text-white">
                    {formatInr(breakdown.providerCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#C0C0C0]/65">Platform Margin</span>
                  <span className="text-white">
                    {formatInr(breakdown.grossProfit)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/8 pt-2">
                  <span className="text-white">Customer Price</span>
                  <span className="text-white">
                    {formatInr(breakdown.customerPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#C0C0C0]/65">Gross Margin</span>
                  <span className="text-[#D4AF37]/90">
                    {(GROSS_MARGIN * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[10px] text-[#C0C0C0]/45">
                    Provider
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[#C0C0C0]/45"
                      animate={{ width: `${providerShare}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-[10px] text-[#C0C0C0]/45">
                    Profit
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[#4B0082] shadow-[0_0_12px_rgba(75,0,130,0.7)]"
                      animate={{ width: `${profitShare}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between rounded-xl border border-[#4B0082]/25 bg-[#4B0082]/10 px-4 py-3">
              <div>
                <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/55 uppercase">
                  Estimated Credits
                </p>
                <p className="mt-1 text-xl font-medium text-white">
                  {formatCredits(breakdown.credits)} Credits
                </p>
              </div>
              <p className="text-[11px] text-[#C0C0C0]/55">
                ₹{CREDIT_VALUE_INR.toFixed(2)} / credit
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
