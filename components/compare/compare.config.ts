/**
 * Centralized comparison data.
 * Placeholder competitor names and values — replace with verified data before production.
 * Do not hardcode comparison values throughout UI components.
 */

export type CompetitorId = "ours" | "compA" | "compB" | "compC";

export type SupportLevel = "full" | "partial" | "conditional" | "none";

export type Competitor = {
  id: CompetitorId;
  shortLabel: string;
  name: string;
  subtitle?: string;
  isOurs?: boolean;
};

export type Capability = {
  id: string;
  label: string;
  description?: string;
  support: Record<CompetitorId, SupportLevel>;
};

export type CapabilityCategory = {
  id: string;
  label: string;
  capabilities: Capability[];
};

export const COMPETITORS: Competitor[] = [
  {
    id: "ours",
    shortLabel: "Our Platform",
    name: "AI Intelligence Platform",
    subtitle: "OUR PLATFORM",
    isOurs: true,
  },
  {
    id: "compA",
    shortLabel: "Competitor A",
    name: "Competitor A",
  },
  {
    id: "compB",
    shortLabel: "Competitor B",
    name: "Competitor B",
  },
  {
    id: "compC",
    shortLabel: "Competitor C",
    name: "Competitor C",
  },
];

export const COMPARISON_CATEGORIES: CapabilityCategory[] = [
  {
    id: "intelligence",
    label: "Intelligence",
    capabilities: [
      {
        id: "stt",
        label: "Speech-to-Text",
        description: "Capture spoken input and convert it into usable text context.",
        support: { ours: "full", compA: "full", compB: "full", compC: "none" },
      },
      {
        id: "ocr",
        label: "OCR / Visual Intelligence",
        description: "Understand questions and text visible on screen.",
        support: { ours: "full", compA: "full", compB: "none", compC: "partial" },
      },
      {
        id: "question",
        label: "Question Understanding",
        description: "Interpret the intent behind spoken or visual questions.",
        support: { ours: "full", compA: "none", compB: "full", compC: "none" },
      },
      {
        id: "context",
        label: "Context-Aware AI",
        description: "Use surrounding workflow context when generating assistance.",
        support: { ours: "full", compA: "partial", compB: "full", compC: "none" },
      },
      {
        id: "multimodel",
        label: "Multi-Model Intelligence",
        description: "Route requests across supported AI models as needed.",
        support: { ours: "full", compA: "none", compB: "full", compC: "partial" },
      },
    ],
  },
  {
    id: "interaction",
    label: "Interaction",
    capabilities: [
      {
        id: "capslock",
        label: "Caps Lock Intelligence",
        description: "Trigger assistance through a keyboard interaction.",
        support: { ours: "full", compA: "none", compB: "none", compC: "none" },
      },
      {
        id: "autotyping",
        label: "AI Auto Typing",
        description: "Move generated responses into supported input fields.",
        support: { ours: "full", compA: "none", compB: "none", compC: "none" },
      },
      {
        id: "desktop",
        label: "Native Desktop Experience",
        description: "Run as a native desktop layer across supported workflows.",
        support: { ours: "full", compA: "full", compB: "none", compC: "none" },
      },
      {
        id: "overlay",
        label: "Overlay / On-Screen Interaction",
        description: "Interact with intelligence without leaving the active screen.",
        support: { ours: "full", compA: "partial", compB: "none", compC: "none" },
      },
    ],
  },
  {
    id: "usecases",
    label: "Use Cases",
    capabilities: [
      {
        id: "interviews",
        label: "Interviews",
        description: "Support spoken and on-screen interview workflows.",
        support: { ours: "full", compA: "full", compB: "full", compC: "none" },
      },
      {
        id: "assessments",
        label: "Assessments",
        description: "Assist across assessment-style questions and formats.",
        support: { ours: "full", compA: "none", compB: "full", compC: "none" },
      },
      {
        id: "coding",
        label: "Coding",
        description: "Work with technical prompts and coding-related questions.",
        support: { ours: "full", compA: "full", compB: "full", compC: "full" },
      },
      {
        id: "mcq",
        label: "MCQ",
        description: "Capture and assist with multiple-choice question formats.",
        support: { ours: "full", compA: "partial", compB: "full", compC: "none" },
      },
      {
        id: "technical",
        label: "Technical Questions",
        description: "Handle structured technical and problem-solving prompts.",
        support: { ours: "full", compA: "full", compB: "partial", compC: "partial" },
      },
    ],
  },
  {
    id: "economics",
    label: "Economics",
    capabilities: [
      {
        id: "payg",
        label: "Pay-as-you-go",
        description: "Use the platform with flexible, usage-based access.",
        support: { ours: "full", compA: "none", compB: "none", compC: "full" },
      },
      {
        id: "credits",
        label: "Credit-Based Usage",
        description: "Track and consume usage through a credit model.",
        support: { ours: "full", compA: "partial", compB: "none", compC: "full" },
      },
      {
        id: "calculator",
        label: "Usage Calculator",
        description: "Estimate usage before committing to a plan or session.",
        support: { ours: "full", compA: "none", compB: "none", compC: "partial" },
      },
      {
        id: "routing",
        label: "Flexible AI Model Routing",
        description: "Choose processing paths based on the task at hand.",
        support: { ours: "full", compA: "none", compB: "partial", compC: "none" },
      },
    ],
  },
];

export const COMPARE_COPY = {
  eyebrow: "COMPARE",
  headline: "See the Difference",
  support:
    "One intelligent workspace for speech, vision, interaction, and AI-powered response.",
  ctaHeadline: "Experience the Difference",
  ctaSupport:
    "See what intelligent interaction looks like when speech, vision, and action work together.",
  ctaPrimary: "Get Started",
  ctaSecondary: "Explore Products",
} as const;

export const SUPPORT_LABELS: Record<SupportLevel, string> = {
  full: "Available",
  partial: "Limited",
  conditional: "Conditional",
  none: "Not available",
};
