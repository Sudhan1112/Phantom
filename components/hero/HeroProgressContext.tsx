"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

type HeroProgressContextValue = {
  /** Shared hero scroll progress — ParallaxHero writes; Navbar reads. */
  scrollYProgress: MotionValue<number>;
};

const HeroProgressContext = createContext<HeroProgressContextValue | null>(
  null
);

export function HeroProgressProvider({ children }: { children: ReactNode }) {
  const scrollYProgress = useMotionValue(0);

  const value = useMemo(() => ({ scrollYProgress }), [scrollYProgress]);

  return (
    <HeroProgressContext.Provider value={value}>
      {children}
    </HeroProgressContext.Provider>
  );
}

export function useHeroProgress() {
  const ctx = useContext(HeroProgressContext);
  if (!ctx) {
    throw new Error("useHeroProgress must be used within HeroProgressProvider");
  }
  return ctx;
}
