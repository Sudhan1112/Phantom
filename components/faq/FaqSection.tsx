"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FAQ_CATEGORIES,
  FAQ_COPY,
  type FaqCategoryId,
  type FaqItem,
} from "./faq.config";
import { SectionHeader } from "@/components/motion/SectionHeader";

function FaqAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-white"
        >
          <span
            className={`text-sm font-medium sm:text-[15px] ${
              open ? "text-white" : "text-[#C0C0C0]/90"
            }`}
          >
            {item.question}
          </span>
          <span
            className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
              open
                ? "border-[#4B0082]/55 bg-[#4B0082]/20 text-white"
                : "border-[#C0C0C0]/20 text-[#C0C0C0]/70"
            }`}
            aria-hidden="true"
          >
            <span className="absolute h-px w-2.5 bg-current" />
            <span
              className={`absolute h-2.5 w-px bg-current transition-transform ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-8 text-sm leading-relaxed text-[#C0C0C0]/70">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [activeCategory, setActiveCategory] =
    useState<FaqCategoryId>("product");
  const [openId, setOpenId] = useState<string | null>(
    FAQ_CATEGORIES[0].items[0].id
  );

  const category =
    FAQ_CATEGORIES.find((c) => c.id === activeCategory) ?? FAQ_CATEGORIES[0];

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#0A0A0A] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24"
      aria-labelledby="faq-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.14)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeader
          id="faq-heading"
          variant="faq"
          eyebrow={FAQ_COPY.eyebrow}
          headline={FAQ_COPY.headline}
          support={FAQ_COPY.support}
          headlineClassName="text-[clamp(1.85rem,3.8vw,2.75rem)]"
          supportClassName="mt-4 max-w-md text-sm text-[#C0C0C0]/75 sm:text-base"
        />

        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {FAQ_CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(cat.items[0]?.id ?? null);
                }}
                className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-colors sm:text-[13px] ${
                  active
                    ? "border-[#4B0082]/55 bg-[#4B0082]/25 text-white shadow-[0_0_18px_rgba(75,0,130,0.25)]"
                    : "border-[#C0C0C0]/15 text-[#C0C0C0]/70 hover:border-[#C0C0C0]/30 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#C0C0C0]/12 bg-[#0A0A0A]/80 px-5 sm:px-7">
          {category.items.map((item) => (
            <FaqAccordionItem
              key={`${category.id}-${item.id}`}
              item={item}
              open={openId === item.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === item.id ? null : item.id
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
