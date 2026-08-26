"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COMPARISON_CATEGORIES,
  COMPETITORS,
  type Capability,
  type CompetitorId,
} from "./compare.config";
import { SupportIndicator } from "./SupportIndicator";

type ComparisonTableProps = {
  platformHovered: boolean;
  onPlatformHover: (hovered: boolean) => void;
  revealed: boolean;
};

export function ComparisonTable({
  platformHovered,
  onPlatformHover,
  revealed,
}: ComparisonTableProps) {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  let checkDelay = 0;

  return (
    <>
      {/* Desktop / tablet scrollable table */}
      <div className="relative hidden md:block">
        <div className="overflow-x-auto rounded-[1.5rem] border border-[#C0C0C0]/14 bg-[#0A0A0A]/92 shadow-[0_0_0_1px_rgba(75,0,130,0.08)] [-ms-overflow-style:none] [scrollbar-width:none] backdrop-blur-sm [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/8">
                <th className="sticky left-0 z-20 bg-[#0A0A0A]/95 px-5 py-5 text-[11px] font-medium tracking-[0.22em] text-[#C0C0C0]/65 uppercase sm:px-6">
                  Capability
                </th>
                {COMPETITORS.map((competitor) => (
                  <th
                    key={competitor.id}
                    className={`relative px-4 py-5 text-center sm:px-5 ${
                      competitor.isOurs
                        ? "bg-gradient-to-b from-[#4B0082]/30 to-[#4B0082]/08"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      competitor.isOurs && onPlatformHover(true)
                    }
                    onMouseLeave={() =>
                      competitor.isOurs && onPlatformHover(false)
                    }
                  >
                    {competitor.isOurs ? (
                      <>
                        <span
                          className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-[#D4AF37]/70 via-[#D4AF37]/25 to-transparent"
                          aria-hidden="true"
                        />
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            boxShadow: platformHovered
                              ? "inset 0 0 40px rgba(75,0,130,0.25)"
                              : "inset 0 0 0 rgba(75,0,130,0)",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <p className="relative text-[10px] font-medium tracking-[0.2em] text-[#D4AF37]/90 uppercase">
                          {competitor.subtitle}
                        </p>
                        <p className="relative mt-1 text-sm font-medium text-white sm:text-[15px]">
                          {competitor.name}
                        </p>
                      </>
                    ) : (
                      <p className="text-[11px] font-medium tracking-[0.16em] text-[#C0C0C0]/55 uppercase sm:text-xs">
                        {competitor.shortLabel}
                      </p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_CATEGORIES.map((category) => {
                const baseDelay = 0.05 + checkDelay * 0.035;
                checkDelay += category.capabilities.length;
                return (
                  <CategoryRows
                    key={category.id}
                    label={category.label}
                    capabilities={category.capabilities}
                    activeCapability={activeCapability}
                    setActiveCapability={setActiveCapability}
                    platformHovered={platformHovered}
                    onPlatformHover={onPlatformHover}
                    revealed={revealed}
                    baseDelay={baseDelay}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile capability cards */}
      <div className="space-y-3 md:hidden">
        {COMPARISON_CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-2">
            <p className="px-1 pt-3 text-[11px] font-medium tracking-[0.22em] text-[#C0C0C0]/55 uppercase">
              {category.label}
            </p>
            {category.capabilities.map((capability, i) => (
              <MobileCapabilityCard
                key={capability.id}
                capability={capability}
                revealed={revealed}
                delay={0.04 * i}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function CategoryRows({
  label,
  capabilities,
  activeCapability,
  setActiveCapability,
  platformHovered,
  onPlatformHover,
  revealed,
  baseDelay,
}: {
  label: string;
  capabilities: Capability[];
  activeCapability: string | null;
  setActiveCapability: (id: string | null) => void;
  platformHovered: boolean;
  onPlatformHover: (hovered: boolean) => void;
  revealed: boolean;
  baseDelay: number;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={COMPETITORS.length + 1}
          className="bg-white/[0.02] px-5 py-3 text-[11px] font-medium tracking-[0.2em] text-[#C0C0C0]/50 uppercase sm:px-6"
        >
          {label}
        </td>
      </tr>
      {capabilities.map((capability, index) => {
        const isActive = activeCapability === capability.id;
        return (
          <motion.tr
            key={capability.id}
            className="group border-b border-white/[0.04] last:border-b-0"
            initial={{ opacity: 0, y: 8 }}
            animate={
              revealed
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{
              duration: 0.4,
              delay: baseDelay + index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setActiveCapability(capability.id)}
            onMouseLeave={() => setActiveCapability(null)}
          >
            <td
              className={`sticky left-0 z-10 bg-[#0A0A0A]/95 px-5 py-3.5 sm:px-6 ${
                isActive ? "text-white" : "text-[#C0C0C0]/85"
              }`}
            >
              <div className="relative">
                <span
                  className={`absolute inset-y-0 -left-5 w-0.5 rounded-full transition-opacity sm:-left-6 ${
                    isActive ? "bg-[#4B0082] opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium transition-colors">
                  {capability.label}
                </p>
                <AnimatePresence>
                  {isActive && capability.description ? (
                    <motion.p
                      className="mt-1 max-w-xs text-xs leading-relaxed text-[#C0C0C0]/55"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {capability.description}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </td>
            {COMPETITORS.map((competitor) => {
              const isOurs = Boolean(competitor.isOurs);
              return (
                <td
                  key={competitor.id}
                  className={`relative px-4 py-3.5 text-center sm:px-5 ${
                    isOurs
                      ? `bg-gradient-to-b from-[#4B0082]/18 to-transparent ${
                          platformHovered || isActive
                            ? "from-[#4B0082]/28"
                            : ""
                        }`
                      : isActive
                        ? "bg-[#4B0082]/06"
                        : ""
                  }`}
                  onMouseEnter={() => isOurs && onPlatformHover(true)}
                  onMouseLeave={() => isOurs && onPlatformHover(false)}
                >
                  {isOurs ? (
                    <motion.span
                      className="pointer-events-none absolute inset-0"
                      animate={{
                        boxShadow:
                          platformHovered || isActive
                            ? "inset 0 0 24px rgba(75,0,130,0.18)"
                            : "inset 0 0 0 rgba(75,0,130,0)",
                      }}
                    />
                  ) : null}
                  <SupportIndicator
                    level={capability.support[competitor.id as CompetitorId]}
                    emphasize={isOurs}
                    delay={baseDelay + index * 0.04 + (isOurs ? 0.05 : 0)}
                    active={revealed}
                  />
                </td>
              );
            })}
          </motion.tr>
        );
      })}
    </>
  );
}

function MobileCapabilityCard({
  capability,
  revealed,
  delay,
}: {
  capability: Capability;
  revealed: boolean;
  delay: number;
}) {
  return (
    <motion.article
      className="rounded-xl border border-[#C0C0C0]/12 bg-[#0A0A0A]/90 p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay }}
    >
      <p className="text-sm font-medium text-white">{capability.label}</p>
      {capability.description ? (
        <p className="mt-1 text-xs leading-relaxed text-[#C0C0C0]/55">
          {capability.description}
        </p>
      ) : null}
      <ul className="mt-4 space-y-2">
        {COMPETITORS.map((competitor) => (
          <li
            key={competitor.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              competitor.isOurs
                ? "border border-[#4B0082]/35 bg-[#4B0082]/15"
                : "bg-white/[0.02]"
            }`}
          >
            <span
              className={`text-xs ${
                competitor.isOurs ? "text-white" : "text-[#C0C0C0]/65"
              }`}
            >
              {competitor.isOurs ? competitor.subtitle : competitor.shortLabel}
            </span>
            <SupportIndicator
              level={capability.support[competitor.id]}
              emphasize={Boolean(competitor.isOurs)}
              active={revealed}
              delay={delay + 0.1}
            />
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
