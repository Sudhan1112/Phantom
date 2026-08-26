"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICING_COPY } from "./pricing.config";
import { PricingCalculator } from "./PricingCalculator";
import {
  PricingPrinciple,
  UsageEstimator,
  WalletExplainer,
} from "./PricingExtras";
import { SectionHeader } from "@/components/motion/SectionHeader";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24"
      aria-labelledby="pricing-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.18)_0%,transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[32rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.22)_0%,transparent_68%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-[8%] top-[22%] bottom-[30%] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,192,192,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.5) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[18%] top-[34%] h-32 w-px bg-gradient-to-b from-[#D4AF37]/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          id="pricing-heading"
          variant="pricing"
          eyebrow={PRICING_COPY.eyebrow}
          headline={PRICING_COPY.headline}
          support={PRICING_COPY.support}
          supportExtra={PRICING_COPY.estimateLine}
        />

        <motion.div
          className="relative mt-12 sm:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute -right-6 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.4)_0%,transparent_70%)] blur-3xl"
            aria-hidden="true"
          />
          <PricingCalculator />
        </motion.div>

        <div className="mt-4 flex flex-col items-center gap-1 text-center text-[11px] text-[#C0C0C0]/45 sm:flex-row sm:justify-center sm:gap-3">
          <span>{PRICING_COPY.fxLabel}</span>
          <span className="hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <span>{PRICING_COPY.ratesNote}</span>
        </div>

        <div className="mt-14 space-y-8 sm:mt-16 sm:space-y-10">
          <WalletExplainer />
          <UsageEstimator />
          <PricingPrinciple />
        </div>

        <div className="mt-10 space-y-3 text-center text-[11px] leading-relaxed text-[#C0C0C0]/40 sm:mt-12">
          <p className="mx-auto max-w-3xl">{PRICING_COPY.disclaimerPrimary}</p>
          <p className="mx-auto max-w-2xl">{PRICING_COPY.disclaimerSecondary}</p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row">
          <Link
            href="#signup"
            className="relative inline-flex h-12 min-w-[10rem] items-center justify-center rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-[0_0_32px_rgba(75,0,130,0.35)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-white/90"
          >
            <span
              className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.4)_0%,transparent_70%)] blur-md"
              aria-hidden="true"
            />
            Get Started
          </Link>
          <Link
            href="#products"
            className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-xl border border-[#C0C0C0]/35 bg-transparent px-7 text-sm font-medium text-white transition-colors duration-200 hover:border-[#C0C0C0]/55 hover:bg-white/5"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
