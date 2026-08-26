import Link from "next/link";

export function ParallaxTestSection() {
  return (
    <section
      id="work"
      className="relative flex min-h-svh w-full items-center justify-center bg-[#050505] px-6 py-24"
      aria-labelledby="explore-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-[family-name:var(--font-sans)] text-xs tracking-[0.28em] text-white/45 uppercase">
          Section Two
        </p>
        <h2
          id="explore-heading"
          className="font-[family-name:var(--font-geist-sans)] text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-[-0.03em] text-white"
        >
          Explore the Work
        </h2>
        <p className="mx-auto mt-6 max-w-md font-[family-name:var(--font-sans)] text-base leading-relaxed text-white/65 sm:text-lg">
          We create digital experiences where design, technology and motion come
          together. This section confirms the cinematic parallax transitions
          naturally into the rest of the portfolio.
        </p>
        <div className="mt-10">
          <Link
            href="#work"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 font-[family-name:var(--font-sans)] text-sm font-medium tracking-wide text-black transition-colors hover:bg-white/90"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
