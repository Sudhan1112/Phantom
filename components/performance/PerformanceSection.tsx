"use client";

import { PERFORMANCE_COPY } from "./performance.config";
import { PrimaryMetrics } from "./PrimaryMetrics";
import { SectionHeader } from "@/components/motion/SectionHeader";

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24"
      aria-labelledby="performance-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.16)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-[40%] h-72 w-72 rounded-full bg-[#4B0082]/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          id="performance-heading"
          variant="performance"
          eyebrow={PERFORMANCE_COPY.eyebrow}
          headline={PERFORMANCE_COPY.headline}
          support={PERFORMANCE_COPY.support}
        />

        <div className="mt-12 sm:mt-14">
          <PrimaryMetrics />
        </div>
      </div>
    </section>
  );
}
