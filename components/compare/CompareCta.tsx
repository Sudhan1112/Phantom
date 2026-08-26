"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPARE_COPY } from "./compare.config";

export function CompareCta() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#C0C0C0]/12 bg-[#0A0A0A] px-6 py-12 text-center sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.35)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-[family-name:var(--font-geist-sans)] text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.03em] text-white">
          {COMPARE_COPY.ctaHeadline}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#C0C0C0]/75 sm:text-[15px]">
          {COMPARE_COPY.ctaSupport}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#signup"
            className="relative inline-flex h-12 min-w-[10rem] items-center justify-center rounded-xl bg-white px-7 text-sm font-semibold text-black shadow-[0_0_32px_rgba(75,0,130,0.35)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-white/90"
          >
            <span
              className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.4)_0%,transparent_70%)] blur-md"
              aria-hidden="true"
            />
            {COMPARE_COPY.ctaPrimary}
          </Link>
          <Link
            href="#products"
            className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-xl border border-[#C0C0C0]/35 bg-transparent px-7 text-sm font-medium text-white transition-colors duration-200 hover:border-[#C0C0C0]/55 hover:bg-white/5"
          >
            {COMPARE_COPY.ctaSecondary}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
