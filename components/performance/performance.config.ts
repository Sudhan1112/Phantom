/**
 * Centralized performance metrics.
 * Replace placeholder values here after real benchmarks are measured.
 * Do not hardcode these numbers in UI components.
 */

export type MetricFormat = "percent" | "seconds" | "count" | "approxPercent";

export type PerformanceMetricId =
  | "understanding"
  | "responseTime"
  | "languages"
  | "tokenEfficiency";

export type PerformanceMetric = {
  id: PerformanceMetricId;
  /** Numeric value used for count-up / progress visuals */
  value: number;
  /** Display string shown as the headline (may include symbols) */
  display: string;
  label: string;
  description: string;
  format: MetricFormat;
};

export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    id: "understanding",
    value: 96.8,
    display: "96.8%",
    label: "Question Understanding",
    description: "Understand the input before generating a response.",
    format: "percent",
  },
  {
    id: "responseTime",
    value: 1.2,
    display: "< 1.2s",
    label: "Response Time",
    description: "Move from input to usable intelligence quickly.",
    format: "seconds",
  },
  {
    id: "languages",
    value: 40,
    display: "40+",
    label: "Languages",
    description: "Support multiple interaction modes and languages.",
    format: "count",
  },
  {
    id: "tokenEfficiency",
    value: 38,
    display: "~38%",
    label: "Token Efficiency",
    description: "Optimize model usage and reduce unnecessary processing.",
    format: "approxPercent",
  },
];

export const PERFORMANCE_COPY = {
  eyebrow: "PERFORMANCE",
  headline: "Performance That Keeps Up With You",
  support:
    "Fast enough for real-time interaction. Intelligent enough to understand the context.",
} as const;
