"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useHeroProgress } from "@/components/hero/HeroProgressContext";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#performance", label: "Performance" },
  { href: "#compare", label: "Compare" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#partners", label: "Partners" },
] as const;

/** Progressive glass → near-black; solid by ~0.55, then stable. */
const NAV_PROGRESS_END = 0.55;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useHeroProgress();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.05) {
      setMenuOpen(false);
    }
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, NAV_PROGRESS_END, 1.5],
    [
      "rgba(5, 8, 20, 0.12)",
      "rgba(5, 8, 20, 0.32)",
      "rgba(0, 0, 0, 0.58)",
      "rgba(0, 0, 0, 0.92)",
      "rgba(0, 0, 0, 0.92)",
    ]
  );

  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, NAV_PROGRESS_END],
    [6, 9, 13, 16]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, NAV_PROGRESS_END],
    [
      "rgba(255, 255, 255, 0.04)",
      "rgba(255, 255, 255, 0.06)",
      "rgba(255, 255, 255, 0.09)",
      "rgba(255, 255, 255, 0.12)",
    ]
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.25, NAV_PROGRESS_END],
    [
      "0 0 0 0 rgba(0, 0, 0, 0)",
      "0 4px 16px rgba(0, 0, 0, 0.12)",
      "0 8px 24px rgba(0, 0, 0, 0.3)",
    ]
  );

  const backdropFilter = useTransform(
    backdropBlur,
    (blur) => `blur(${blur}px)`
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70]" aria-label="Primary">
        <motion.div
          className="border-b"
          style={{
            backgroundColor,
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            borderColor,
            boxShadow,
          }}
        >
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8">
            <Link
              href="#home"
              className="font-[family-name:var(--font-geist-sans)] text-lg font-medium tracking-[-0.02em] text-white sm:text-xl"
            >
              Phantom AI
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-sans)] text-sm tracking-wide text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="#login"
                className="rounded-md border border-white/25 px-4 py-2 font-[family-name:var(--font-sans)] text-sm text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                Sign In
              </Link>
              <Link
                href="#signup"
                className="rounded-md bg-white px-4 py-2 font-[family-name:var(--font-sans)] text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Sign Up
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-white transition-transform ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-white transition-transform ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </nav>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Close menu overlay"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 top-0 border-b border-white/10 bg-black px-5 pb-8 pt-20"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 font-[family-name:var(--font-sans)] text-lg text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="#login"
                  className="rounded-md border border-white/25 px-4 py-3 text-center text-sm text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="#signup"
                  className="rounded-md bg-white px-4 py-3 text-center text-sm font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
