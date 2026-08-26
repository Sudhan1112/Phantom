import type { Product } from "./products.config";

type HowItWorksProps = {
  product: Product;
};

export function HowItWorks({ product }: HowItWorksProps) {
  return (
    <div className="rounded-[1.5rem] border border-[#C0C0C0]/14 bg-[#0A0A0A]/80 p-6 sm:p-8">
      <p className="text-xs font-medium tracking-[0.24em] text-[#C0C0C0]/60 uppercase">
        How it works
      </p>

      <ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {product.howItWorks.map((step, index) => (
          <li key={step.number} className="relative flex gap-4 lg:block lg:px-5">
            {index < product.howItWorks.length - 1 ? (
              <span
                className="pointer-events-none absolute left-[1.15rem] top-10 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#4B0082]/50 to-transparent lg:left-auto lg:right-0 lg:top-[1.15rem] lg:h-px lg:w-full lg:bg-gradient-to-r"
                aria-hidden="true"
              />
            ) : null}

            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#4B0082]/45 bg-[#4B0082]/20 shadow-[0_0_18px_rgba(75,0,130,0.35)]">
              <span className="text-[11px] font-medium tracking-wide text-white">
                {step.number}
              </span>
            </div>

            <div className="min-w-0 lg:mt-4">
              <h4 className="text-sm font-medium text-white sm:text-[15px]">
                {step.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-[#C0C0C0]/70">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
