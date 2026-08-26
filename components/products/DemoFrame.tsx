"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProductId } from "./products.config";
import { PlayIcon } from "./icons";
import { SttDemo } from "./demos/SttDemo";
import { VisualDemo } from "./demos/VisualDemo";
import { CapsLockDemo } from "./demos/CapsLockDemo";
import { AutoTypingDemo } from "./demos/AutoTypingDemo";

type DemoFrameProps = {
  productId: ProductId;
};

function DemoContent({ productId }: { productId: ProductId }) {
  switch (productId) {
    case "stt":
      return <SttDemo />;
    case "visual":
      return <VisualDemo />;
    case "capslock":
      return <CapsLockDemo />;
    case "autotyping":
      return <AutoTypingDemo />;
    default:
      return null;
  }
}

export function DemoFrame({ productId }: DemoFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(75,0,130,0.28)_0%,transparent_68%)] blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        key={productId}
        className="relative aspect-video overflow-hidden rounded-2xl border border-[#C0C0C0]/20 bg-[#0A0A0A] shadow-[0_0_0_1px_rgba(75,0,130,0.15),0_24px_80px_rgba(0,0,0,0.55)]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.22)_0%,transparent_55%)]"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 z-20 rounded-md border border-[#C0C0C0]/25 bg-black/55 px-2 py-0.5 font-[family-name:var(--font-geist-sans)] text-[10px] font-medium tracking-[0.18em] text-[#C0C0C0] uppercase backdrop-blur-sm">
          Demo
        </span>

        <div className="absolute inset-0 z-10">
          <DemoContent productId={productId} />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-white/8 bg-black/55 px-4 py-2.5 backdrop-blur-md">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C0C0C0]/25 bg-white/5 text-white transition-colors hover:border-[#C0C0C0]/45 hover:bg-white/10"
            aria-label="Play demo"
          >
            <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
          </button>

          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-[#4B0082] to-[#C0C0C0]/80" />
          </div>

          <div className="flex items-center gap-2 text-[#C0C0C0]/70">
            <span className="text-[10px] tracking-wide" aria-hidden="true">
              0:18
            </span>
            <span
              className="block h-3.5 w-3.5 rounded-[2px] border border-current opacity-70"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
