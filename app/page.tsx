"use client";

import { HeroProgressProvider } from "@/components/hero/HeroProgressContext";
import { ParallaxHero } from "@/components/hero/ParallaxHero";
import { Navbar } from "@/components/navbar/Navbar";
import { ParallaxTestSection } from "@/components/sections/ParallaxTestSection";

export default function HomePage() {
  return (
    <HeroProgressProvider>
      <main id="home">
        <ParallaxHero />
        <Navbar />
        <ParallaxTestSection />
      </main>
    </HeroProgressProvider>
  );
}
