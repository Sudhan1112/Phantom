"use client";

import { motion } from "framer-motion";
import { PRODUCTS, type ProductId } from "./products.config";
import { ProductIcon } from "./icons";

type ProductSelectorProps = {
  selected: ProductId;
  onSelect: (id: ProductId) => void;
};

export function ProductSelector({ selected, onSelect }: ProductSelectorProps) {
  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Product capabilities"
        className="relative mx-auto flex w-full max-w-5xl gap-1 overflow-x-auto rounded-[1.75rem] border border-[#C0C0C0]/25 bg-black/40 p-1.5 shadow-[0_0_40px_rgba(75,0,130,0.12)] backdrop-blur-sm scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-0 sm:overflow-visible sm:rounded-full [&::-webkit-scrollbar]:hidden"
      >
        {PRODUCTS.map((product) => {
          const isActive = product.id === selected;

          return (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`product-tab-${product.id}`}
              aria-controls="product-panel"
              onClick={() => onSelect(product.id)}
              className="relative min-w-[11.5rem] flex-1 rounded-[1.35rem] px-3 py-3 text-left transition-colors sm:min-w-0 sm:rounded-full sm:px-4 sm:py-3.5"
            >
              {isActive ? (
                <motion.span
                  layoutId="product-selector-active"
                  className="absolute inset-0 rounded-[1.35rem] border border-[#C0C0C0]/35 bg-gradient-to-b from-[#4B0082]/45 to-[#1a0a24]/90 shadow-[0_0_28px_rgba(75,0,130,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}

              <span className="relative z-10 flex items-start gap-2.5">
                <ProductIcon
                  id={product.id}
                  className={`mt-0.5 h-4 w-4 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-[#C0C0C0]/55"
                  }`}
                />
                <span className="min-w-0">
                  <span
                    className={`block text-[13px] font-medium tracking-[-0.01em] sm:text-sm ${
                      isActive ? "text-white" : "text-[#C0C0C0]/75"
                    }`}
                  >
                    {product.selectorLabel}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11px] leading-snug sm:text-xs ${
                      isActive ? "text-white/70" : "text-[#C0C0C0]/45"
                    }`}
                  >
                    {product.selectorDescription}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
