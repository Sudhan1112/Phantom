import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { href: "#products", label: "Products" },
      { href: "#performance", label: "Performance" },
      { href: "#compare", label: "Compare" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#faq", label: "FAQ" },
      { href: "#get-started", label: "Get Started" },
      { href: "#download-windows", label: "Download" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "#login", label: "Sign In" },
      { href: "#signup", label: "Sign Up" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 bg-[#0A0A0A] px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="#home"
              className="font-[family-name:var(--font-geist-sans)] text-lg font-medium tracking-[-0.02em] text-white"
            >
              Phantom AI
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#C0C0C0]/60">
              A native AI intelligence layer for interviews, assessments, and
              career workflows.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-[#C0C0C0]/45 uppercase">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#C0C0C0]/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-[#C0C0C0]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Phantom AI. All rights reserved.</p>
          <p>Pricing and performance figures shown are estimates.</p>
        </div>
      </div>
    </footer>
  );
}
