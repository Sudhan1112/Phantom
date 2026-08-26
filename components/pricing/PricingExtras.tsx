"use client";

import { motion } from "framer-motion";
import {
  PRICING_COPY,
  PRINCIPLE_STEPS,
  USAGE_SCENARIOS,
  WALLET_OPS,
  type UsageScenarioId,
} from "./pricing.config";
import { estimateScenario, formatInr } from "./pricing.math";
import { useState } from "react";

export function WalletExplainer() {
  return (
    <div className="rounded-[1.5rem] border border-[#C0C0C0]/12 bg-[#0A0A0A]/80 p-6 sm:p-8">
      <h3 className="font-[family-name:var(--font-geist-sans)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-white">
        {PRICING_COPY.walletHeadline}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C0C0C0]/75">
        {PRICING_COPY.walletSupport}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WALLET_OPS.map((op, index) => (
          <motion.div
            key={op.id}
            className="relative rounded-xl border border-white/8 bg-black/30 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            <p className="text-sm font-medium text-white">{op.label}</p>
            <div className="my-3 h-6 w-px bg-gradient-to-b from-[#4B0082] to-transparent" />
            <p className="text-xs text-[#C0C0C0]/65">{op.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PricingPrinciple() {
  return (
    <div className="rounded-[1.5rem] border border-[#C0C0C0]/12 bg-gradient-to-b from-[#12081c]/70 to-[#0A0A0A] px-6 py-10 text-center sm:px-10">
      <h3 className="font-[family-name:var(--font-geist-sans)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-white">
        {PRICING_COPY.principleHeadline}
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#C0C0C0]/75">
        {PRICING_COPY.principleSupport}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-0">
        {PRINCIPLE_STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2 rounded-full border border-[#C0C0C0]/18 bg-black/40 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4B0082] shadow-[0_0_10px_rgba(75,0,130,0.8)]" />
              <span className="text-xs font-medium tracking-[0.14em] text-white uppercase">
                {step.label}
              </span>
            </div>
            {index < PRINCIPLE_STEPS.length - 1 ? (
              <span
                className="mx-2 hidden h-px w-8 bg-[#4B0082]/40 sm:block"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function UsageEstimator() {
  const [selected, setSelected] = useState<UsageScenarioId>("moderate");
  const scenario = USAGE_SCENARIOS.find((s) => s.id === selected)!;
  const estimate = estimateScenario(scenario);

  return (
    <div className="rounded-[1.5rem] border border-[#C0C0C0]/12 bg-[#0A0A0A]/80 p-6 sm:p-8">
      <h3 className="text-center font-[family-name:var(--font-geist-sans)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-white">
        {PRICING_COPY.scenariosHeadline}
      </h3>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {USAGE_SCENARIOS.map((item) => {
          const active = item.id === selected;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                active
                  ? "border-[#4B0082]/55 bg-[#4B0082]/25 text-white shadow-[0_0_20px_rgba(75,0,130,0.3)]"
                  : "border-[#C0C0C0]/15 text-[#C0C0C0]/70 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/45 uppercase">
              LLM Input
            </p>
            <p className="mt-1 text-sm text-white">
              {scenario.llmInputTokens.toLocaleString("en-IN")} tokens
            </p>
          </li>
          <li className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/45 uppercase">
              LLM Output
            </p>
            <p className="mt-1 text-sm text-white">
              {scenario.llmOutputTokens.toLocaleString("en-IN")} tokens
            </p>
          </li>
          <li className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/45 uppercase">
              STT
            </p>
            <p className="mt-1 text-sm text-white">
              {scenario.sttMinutes} minutes
            </p>
          </li>
          <li className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-[10px] tracking-[0.16em] text-[#C0C0C0]/45 uppercase">
              OCR
            </p>
            <p className="mt-1 text-sm text-white">
              {scenario.ocrImages} images
            </p>
          </li>
        </ul>

        <div className="flex flex-col justify-center rounded-xl border border-[#4B0082]/30 bg-[#4B0082]/12 p-5 text-center">
          <p className="text-[10px] tracking-[0.18em] text-[#C0C0C0]/55 uppercase">
            Estimated monthly price
          </p>
          <p className="mt-2 font-[family-name:var(--font-geist-sans)] text-3xl font-medium tracking-[-0.03em] text-white">
            {formatInr(estimate.customerPrice)}
          </p>
          <p className="mt-2 text-xs text-[#C0C0C0]/55">
            Provider {formatInr(estimate.providerCost)} · Margin{" "}
            {(estimate.grossMargin * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
