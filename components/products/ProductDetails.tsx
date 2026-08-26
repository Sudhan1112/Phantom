import type { Product } from "./products.config";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-[#C0C0C0]/14 bg-[#0A0A0A]/80 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">
            {product.useCasesTitle}
          </h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.04] sm:grid-cols-2">
            {product.useCases.map((useCase) => (
              <li
                key={useCase.title}
                className="bg-[#0A0A0A] p-5 transition-colors hover:bg-[#0f0a14]"
              >
                <h4 className="text-sm font-medium text-white">
                  {useCase.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#C0C0C0]/70">
                  {useCase.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[1.5rem] border border-[#C0C0C0]/14 bg-[#0A0A0A]/80 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-geist-sans)] text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">
            Built For
          </h3>
          <ul className="mt-6 divide-y divide-white/8 overflow-hidden rounded-xl border border-white/8">
            {product.builtFor.map((audience) => (
              <li
                key={audience.title}
                className="flex gap-4 p-5 transition-colors hover:bg-white/[0.02]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4B0082] shadow-[0_0_10px_rgba(75,0,130,0.8)]"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="text-sm font-medium text-white">
                    {audience.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#C0C0C0]/70">
                    {audience.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-[1.5rem] border border-[#C0C0C0]/14 bg-gradient-to-b from-[#14081f]/80 to-[#0A0A0A] p-6 sm:p-8">
        <p className="text-xs font-medium tracking-[0.24em] text-[#C0C0C0]/60 uppercase">
          Key benefits
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {product.benefits.map((benefit, index) => (
            <li key={benefit.title} className="relative">
              {index > 0 ? (
                <span
                  className="pointer-events-none absolute -left-4 top-1 hidden h-10 w-px bg-white/10 lg:block"
                  aria-hidden="true"
                />
              ) : null}
              <h4 className="text-sm font-medium text-white sm:text-[15px]">
                {benefit.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#C0C0C0]/70">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
