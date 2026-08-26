"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  easeHeaderProgress,
  getHeaderBlur,
  getHeaderGlowOpacity,
  getHeaderOpacity,
  getHeaderProfile,
  getHeaderScale,
  mapFromProgress,
  type SectionHeaderVariant,
} from "./sectionHeaderMotion";

type SectionHeaderProps = {
  id: string;
  eyebrow?: string;
  headline: ReactNode;
  support?: ReactNode;
  supportExtra?: ReactNode;
  variant?: SectionHeaderVariant;
  className?: string;
  headlineClassName?: string;
  supportClassName?: string;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function SectionHeader({
  id,
  eyebrow,
  headline,
  support,
  supportExtra,
  variant = "products",
  className = "",
  headlineClassName = "",
  supportClassName = "",
}: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const profile = getHeaderProfile(variant, isMobile);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.32"],
  });

  const progress = useTransform(scrollYProgress, (raw) =>
    reduceMotion ? 1 : easeHeaderProgress(raw, profile.speedBias)
  );

  const eyebrowY = useTransform(progress, (p) =>
    mapFromProgress(p, profile.eyebrowY, 0)
  );
  const headingY = useTransform(progress, (p) =>
    mapFromProgress(p, profile.headingY, 0)
  );
  const supportY = useTransform(progress, (p) =>
    mapFromProgress(p, profile.supportY, 0)
  );
  const glowY = useTransform(progress, (p) =>
    mapFromProgress(p, profile.glowY, 0)
  );

  const eyebrowOpacity = useTransform(progress, (p) =>
    mapFromProgress(Math.min(1, p * 1.15), 0, 1)
  );
  const headingOpacity = useTransform(progress, getHeaderOpacity);
  const supportOpacity = useTransform(progress, (p) =>
    mapFromProgress(Math.max(0, (p - 0.08) / 0.92), 0, 1)
  );

  const headingScale = useTransform(progress, getHeaderScale);
  const headingBlur = useTransform(progress, (p) =>
    getHeaderBlur(p, isMobile)
  );
  const headingFilter = useTransform(
    headingBlur,
    (blur) => `blur(${blur}px)`
  );

  const glowOpacity = useTransform(progress, (p) =>
    getHeaderGlowOpacity(p, profile.glowIntensity)
  );
  const gridOpacity = useTransform(glowOpacity, (o) => o * 0.35);

  return (
    <header
      ref={ref}
      className={`relative mx-auto max-w-3xl text-center ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] h-40 w-[min(90%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(75,0,130,0.55)_0%,transparent_68%)] blur-3xl"
        style={{ y: glowY, opacity: glowOpacity }}
        aria-hidden="true"
      />

      {profile.showGrid ? (
        <motion.div
          className="pointer-events-none absolute inset-x-8 -top-4 bottom-0"
          style={{
            y: glowY,
            opacity: gridOpacity,
            backgroundImage:
              "linear-gradient(rgba(192,192,192,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.55) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      ) : null}

      {eyebrow ? (
        <motion.p
          className="relative text-xs font-medium tracking-[0.3em] text-[#C0C0C0]/65 uppercase"
          style={{ y: eyebrowY, opacity: eyebrowOpacity }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        id={id}
        className={`relative mt-4 font-[family-name:var(--font-geist-sans)] text-[clamp(2rem,4.2vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white ${headlineClassName}`}
        style={{
          y: headingY,
          opacity: headingOpacity,
          scale: headingScale,
          filter: headingFilter,
        }}
      >
        {headline}
      </motion.h2>

      {support ? (
        <motion.p
          className={`relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#C0C0C0]/80 sm:text-lg ${supportClassName}`}
          style={{ y: supportY, opacity: supportOpacity }}
        >
          {support}
        </motion.p>
      ) : null}

      {supportExtra ? (
        <motion.p
          className="relative mt-3 text-sm text-[#C0C0C0]/55"
          style={{ y: supportY, opacity: supportOpacity }}
        >
          {supportExtra}
        </motion.p>
      ) : null}
    </header>
  );
}
