"use client";

import { HeroProgressProvider } from "@/components/hero/HeroProgressContext";
import { ParallaxHero } from "@/components/hero/ParallaxHero";
import { Navbar } from "@/components/navbar/Navbar";
import { ProductsSection } from "@/components/products/ProductsSection";
import { PerformanceSection } from "@/components/performance/PerformanceSection";
import { CompareSection } from "@/components/compare/CompareSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { SiteFooter } from "@/components/footer/SiteFooter";

export default function HomePage() {
  return (
    <HeroProgressProvider>
      <main id="home">
        <ParallaxHero />
        <Navbar />
        <ProductsSection />
        <PerformanceSection />
        <CompareSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </HeroProgressProvider>
  );
}
