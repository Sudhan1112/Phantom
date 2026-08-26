"use client";

import { motion } from "framer-motion";
import {
  PERFORMANCE_METRICS,
  type PerformanceMetric,
} from "./performance.config";
import {
  LanguageNetwork,
  ProgressRing,
  PulseLine,
  TokenFlow,
} from "./MetricVisuals";
import { useCountUp, useInView } from "./usePerformanceMotion";

function formatCounted(metric: PerformanceMetric, counted: number) {
  switch (metric.format) {
    case "percent":
      return `${counted.toFixed(1)}%`;
    case "seconds":
      return `< ${counted.toFixed(1)}s`;
    case "approxPercent":
      return `~${Math.round(counted)}%`;
    case "count":
      return `${Math.round(counted)}+`;
    default:
      return metric.display;
  }
}

function MetricCard({
  metric,
  index,
}: {
  metric: PerformanceMetric;
  index: number;
}) {
  const { ref, inView } = useInView({ amount: 0.35 });
  const decimals =
    metric.format === "percent" || metric.format === "seconds" ? 1 : 0;
  const counted = useCountUp({
    value: metric.value,
    active: inView,
    decimals,
    durationMs: 1300 + index * 80,
  });

  return (
    <motion.article
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-[#C0C0C0]/14 bg-[#0A0A0A]/90 p-5 sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,0,130,0.16)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[12.5rem] flex-col items-center text-center">
        {metric.id === "understanding" ? (
          <ProgressRing percent={metric.value} active={inView} size={118}>
            <p className="font-[family-name:var(--font-geist-sans)] text-[1.65rem] font-medium tracking-[-0.03em] text-white sm:text-[1.85rem]">
              {formatCounted(metric, counted)}
            </p>
          </ProgressRing>
        ) : null}

        {metric.id === "responseTime" ? (
          <div className="flex w-full flex-col items-center gap-4 pt-2">
            <p className="font-[family-name:var(--font-geist-sans)] text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.15rem]">
              {formatCounted(metric, counted)}
            </p>
            <PulseLine active={inView} />
          </div>
        ) : null}

        {metric.id === "languages" ? (
          <div className="flex w-full flex-col items-center gap-1 pt-1">
            <p className="font-[family-name:var(--font-geist-sans)] text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.15rem]">
              {formatCounted(metric, counted)}
            </p>
            <LanguageNetwork active={inView} />
          </div>
        ) : null}

        {metric.id === "tokenEfficiency" ? (
          <div className="flex w-full flex-col items-center gap-3 pt-2">
            <p className="font-[family-name:var(--font-geist-sans)] text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.15rem]">
              {formatCounted(metric, counted)}
            </p>
            <TokenFlow active={inView} />
          </div>
        ) : null}

        <div className="mt-auto w-full pt-5">
          <h3 className="text-sm font-medium text-white sm:text-[15px]">
            {metric.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#C0C0C0]/70">
            {metric.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function PrimaryMetrics() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {PERFORMANCE_METRICS.map((metric, index) => (
        <MetricCard key={metric.id} metric={metric} index={index} />
      ))}
    </div>
  );
}
