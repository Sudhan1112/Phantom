"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/motion/SectionHeader";

export function FinalCtaSection() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 py-20 sm:px-8 sm:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.35)_0%,transparent_68%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <SectionHeader
          id="final-cta-heading"
          variant="cta"
          headline="Ready to experience AI differently?"
          support="Start with the platform and see what happens when intelligence understands more than a prompt."
          headlineClassName="mt-0 text-[clamp(1.85rem,4vw,2.85rem)]"
          supportClassName="mt-4 max-w-md text-sm text-[#C0C0C0]/75 sm:text-base"
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            href="#download-windows"
            className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-xl border border-[#C0C0C0]/35 bg-transparent px-7 text-sm font-medium text-white transition-colors duration-200 hover:border-[#C0C0C0]/55 hover:bg-white/5"
          >
            Download App
          </Link>
        </div>
      </div>
    </section>
  );
}
