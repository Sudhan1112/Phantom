"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { COMPARE_COPY } from "./compare.config";
import { CompareAmbient } from "./CompareAmbient";
import { ComparisonTable } from "./ComparisonTable";
import { CompareCta } from "./CompareCta";
import { useInView } from "@/components/performance/usePerformanceMotion";
import { SectionHeader } from "@/components/motion/SectionHeader";

export function CompareSection() {
  const [platformHovered, setPlatformHovered] = useState(false);
  const { ref, inView } = useInView({ amount: 0.12 });
  const reduceMotion = useReducedMotion();
  const revealed = inView || Boolean(reduceMotion);

  return (
    <section
      id="compare"
      ref={ref}
      className="relative overflow-hidden bg-[#0A0A0A] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24"
      aria-labelledby="compare-heading"
    >
      <CompareAmbient platformHovered={platformHovered} />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          id="compare-heading"
          variant="compare"
          eyebrow={COMPARE_COPY.eyebrow}
          headline={COMPARE_COPY.headline}
          support={COMPARE_COPY.support}
        />

        <div className="relative mt-12 sm:mt-14">
          <motion.div
            className="pointer-events-none absolute -left-8 -top-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.4)_0%,transparent_68%)] blur-3xl"
            animate={{
              opacity: revealed ? (platformHovered ? 0.95 : 0.7) : 0,
              scale: platformHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.7 }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute left-[8%] top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(75,0,130,0.5)_0%,transparent_70%)] blur-2xl"
            animate={{
              opacity: revealed ? (platformHovered ? 1 : 0.65) : 0,
            }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          />

          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            animate={
              revealed
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ComparisonTable
              platformHovered={platformHovered}
              onPlatformHover={setPlatformHovered}
              revealed={revealed}
            />
          </motion.div>

          <p className="mt-4 text-center text-[11px] tracking-wide text-[#C0C0C0]/40">
            Comparison values are placeholders pending verified competitor data.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <CompareCta />
        </div>
      </div>
    </section>
  );
}
