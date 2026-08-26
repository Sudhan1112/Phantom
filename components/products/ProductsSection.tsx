"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  DEFAULT_PRODUCT_ID,
  getProduct,
  type ProductId,
} from "./products.config";
import { ProductSelector } from "./ProductSelector";
import { ProductShowcase } from "./ProductShowcase";
import { HowItWorks } from "./HowItWorks";
import { ProductDetails } from "./ProductDetails";
import { SectionHeader } from "@/components/motion/SectionHeader";

export function ProductsSection() {
  const [selected, setSelected] = useState<ProductId>(DEFAULT_PRODUCT_ID);
  const product = getProduct(selected);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
      aria-labelledby="products-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.22)_0%,transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#4B0082]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-[#4B0082]/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          id="products-heading"
          variant="products"
          eyebrow="Products"
          headline="Four Ways to Interact with Intelligence"
          support="Multiple intelligent capabilities. One seamless experience."
        />

        <div className="mt-12 sm:mt-14">
          <ProductSelector selected={selected} onSelect={setSelected} />
        </div>

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              className="space-y-6 sm:space-y-8"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 18, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -12, filter: "blur(6px)" }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductShowcase product={product} />
              <HowItWorks product={product} />
              <ProductDetails product={product} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
