"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { HERO_TRACK_VH, PARALLAX_LAYERS } from "./hero.config";
import { useHeroProgress } from "./HeroProgressContext";
import { ParallaxLayer } from "./ParallaxLayer";
import { HeroContent } from "./HeroContent";

/** Shared 16:9 stage — cover-fits the viewport as ONE unit for all layers. */
function ParallaxStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "max(100%, calc(100svh * 16 / 9))",
          height: "max(100svh, calc(100vw * 9 / 16))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress: sharedProgress } = useHeroProgress();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    sharedProgress.set(latest);
  });

  useEffect(() => {
    sharedProgress.set(scrollYProgress.get());
  }, [scrollYProgress, sharedProgress]);

  return (
    <section
      ref={heroRef}
      className="relative w-full"
      style={{ height: `${HERO_TRACK_VH}vh` }}
      aria-label="Cinematic landscape hero"
    >
      <div
        className="sticky top-0 h-svh w-full overflow-hidden"
        style={{
          backgroundColor: "#050814",
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 70%, rgba(88, 28, 135, 0.28), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(49, 46, 129, 0.35), transparent 65%)",
        }}
      >
        <ParallaxStage>
          {PARALLAX_LAYERS.map((layer) => (
            <ParallaxLayer
              key={layer.id}
              layer={layer}
              scrollYProgress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </ParallaxStage>
        <HeroContent scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
