"use client";

import type { Product } from "./products.config";
import { DemoFrame } from "./DemoFrame";

type ProductShowcaseProps = {
  product: Product;
};

export function ProductShowcase({ product }: ProductShowcaseProps) {
  return (
    <div
      id="product-panel"
      role="tabpanel"
      aria-labelledby={`product-tab-${product.id}`}
      className="relative overflow-hidden rounded-[1.75rem] border border-[#C0C0C0]/18 bg-[#0A0A0A]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.28)_0%,transparent_52%),linear-gradient(180deg,rgba(75,0,130,0.08)_0%,transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10 xl:p-12">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <p className="text-xs font-medium tracking-[0.28em] text-[#C0C0C0]/70 uppercase">
            {product.eyebrow}
          </p>
          <h3 className="mt-4 max-w-xl font-[family-name:var(--font-geist-sans)] text-[clamp(1.65rem,2.8vw,2.35rem)] font-medium leading-[1.12] tracking-[-0.03em] text-white">
            {product.headline}
          </h3>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#C0C0C0]/85 sm:text-base">
            {product.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[#C0C0C0]/20 bg-white/[0.03] px-3 py-1.5 text-xs tracking-wide text-[#C0C0C0] sm:text-[13px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <DemoFrame productId={product.id} />
        </div>
      </div>
    </div>
  );
}
