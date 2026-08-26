"use client";

import Link from "next/link";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  getContentOpacity,
  getContentScale,
  getCtaY,
  getHeadingY,
  getSubheadingY,
  getVignetteOpacity,
} from "./layerMotion";

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.25-1.25L21 3v8.5h-9.75V4.25ZM3 13.5h7.5v7.1L3 19.5v-6Zm8.25 0H21V21l-9.75-1.4V13.5Z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.7 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-.9 2.7-1.9.8-1.2 1.2-2.3 1.2-2.4-.03-.01-2.3-.9-2.3-3.5Zm-2.1-6.2c.6-.8 1.1-1.8.9-2.9-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.8 1.1.1 2.2-.5 2.9-1.4Z" />
    </svg>
  );
}

const CTA_BASE =
  "inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl px-6 font-[family-name:var(--font-geist-sans)] text-[15px] font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-[250ms] ease-out sm:px-7 sm:text-base";

type HeroContentProps = {
  scrollYProgress: MotionValue<number>;
};

export function HeroContent({ scrollYProgress }: HeroContentProps) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const headingY = useTransform(scrollYProgress, (p) =>
    animate ? getHeadingY(p) : 0
  );
  const subY = useTransform(scrollYProgress, (p) =>
    animate ? getSubheadingY(p) : 0
  );
  const ctaY = useTransform(scrollYProgress, (p) =>
    animate ? getCtaY(p) : 0
  );
  const contentOpacity = useTransform(scrollYProgress, (p) =>
    animate ? getContentOpacity(p) : 1
  );
  const contentScale = useTransform(scrollYProgress, (p) =>
    animate ? getContentScale(p) : 1
  );
  const vignetteOpacity = useTransform(scrollYProgress, (p) =>
    animate ? getVignetteOpacity(p) : 0.5
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[60] flex justify-center px-5 pt-[14vh] sm:px-8 sm:pt-[15vh] lg:pt-[16vh]">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[8%] h-[48%] w-[min(90vw,52rem)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(8,10,28,0.55)_0%,rgba(12,8,32,0.22)_48%,transparent_70%)] blur-3xl"
        style={{ opacity: vignetteOpacity }}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex w-full max-w-[66rem] flex-col items-center text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.75,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="flex w-full flex-col items-center will-change-transform"
          style={{ opacity: contentOpacity, scale: contentScale }}
        >
          <motion.h1
            className="max-w-[52rem] font-[family-name:var(--font-geist-sans)] text-[clamp(2.5rem,4.5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.035em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.28)]"
            style={{ y: headingY }}
          >
            The Native AI-Intelligence Layer for Candidate Excellence
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[48rem] font-[family-name:var(--font-geist-sans)] text-lg leading-[1.5] font-normal text-white/80 sm:mt-7 sm:text-xl"
            style={{ y: subY }}
          >
            Context-aware AI assistance, orchestrated in real time across
            assessments, coding challenges, mock interviews, and real-time
            meetings.
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3.5"
            style={{ y: ctaY }}
          >
            <Link
              href="#download-windows"
              className={`${CTA_BASE} bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] hover:-translate-y-px hover:bg-black hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.16)]`}
            >
              <WindowsIcon className="h-4 w-4 shrink-0" />
              Download for Windows
            </Link>
            <Link
              href="#download-macos"
              className={`${CTA_BASE} border border-white/30 bg-white/5 text-white shadow-[0_4px_18px_rgba(0,0,0,0.28)] backdrop-blur-sm hover:-translate-y-px hover:border-white/40 hover:bg-black hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.16)]`}
            >
              <AppleIcon className="h-4 w-4 shrink-0" />
              Download for macOS
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
