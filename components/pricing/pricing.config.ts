/**
 * Centralized pricing configuration.
 * Update rates, margin, FX, and credit value here — calculator UI reads from this file.
 * All values are indicative snapshots for design/demo purposes.
 */

export type OperationId = "llm" | "stt" | "ocr" | "combined";

export type LlmProviderId =
  | "anthropic"
  | "openai"
  | "google"
  | "xai"
  | "kimi";

export type OcrProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "kimi"
  | "xai";

/** Gross margin target (0.80 = 80%). Customer price = providerCost / (1 - margin). */
export const GROSS_MARGIN = 0.8;

/** Temporary UI assumption: 1 credit = ₹0.10 */
export const CREDIT_VALUE_INR = 0.1;

/** Indicative USD/INR reference rate used for this pricing snapshot */
export const USD_INR_RATE = 95.4;

export const PRICING_COPY = {
  eyebrow: "PRICING",
  headline: "Pay for Intelligence. Not Idle Time.",
  support: "Use the capabilities you need and pay based on your actual AI usage.",
  estimateLine: "Estimate your usage before you spend.",
  calculatorLabel: "Calculate Your Usage",
  configureLabel: "Configure Usage",
  resultLabel: "Estimated Usage Cost",
  operationPrompt: "What do you want to estimate?",
  walletHeadline: "One Wallet. Multiple Intelligence Operations.",
  walletSupport: "Your credits can be used across supported AI operations.",
  principleHeadline: "Pay for what you use.",
  principleSupport:
    "No fixed AI workload assumptions. Your usage determines your cost.",
  scenariosHeadline: "What Would Your Usage Look Like?",
  disclaimerPrimary:
    "Estimates are based on the configured model rates and an indicative USD/INR conversion of ₹95.40/$1. Actual costs may vary based on provider pricing, exchange rates, usage patterns, caching, context length, model routing, and other platform costs.",
  disclaimerSecondary:
    "Displayed performance and pricing values are estimates and should not be interpreted as guaranteed rates.",
  fxLabel: `USD/INR reference rate: ₹${USD_INR_RATE.toFixed(2)}/$1`,
  ratesNote:
    "Rates are indicative and may change based on provider pricing and exchange rates.",
  imageAssumption: "Assumes 1024 × 1024 pixels / approximately 1 MP per image.",
  xaiVisionNote:
    "Vision tokenization data not available in our current reference dataset.",
  sttExternalNote: "Requires a separate STT layer",
} as const;

export const OPERATIONS: {
  id: OperationId;
  label: string;
  description: string;
}[] = [
  { id: "llm", label: "LLM", description: "Text & reasoning" },
  { id: "stt", label: "STT", description: "Speech-to-text" },
  { id: "ocr", label: "OCR / Vision", description: "Image understanding" },
  {
    id: "combined",
    label: "Combined",
    description: "Multi-step AI workflow",
  },
];

export type RateTier = {
  id: string;
  label: string;
  /** INR per 1M tokens (LLM) or INR per unit */
  value: number;
};

export type LlmModel = {
  id: string;
  name: string;
  input: RateTier[];
  output: RateTier[];
};

export type LlmProvider = {
  id: LlmProviderId;
  name: string;
  models: LlmModel[];
};

export const LLM_PROVIDERS: LlmProvider[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      {
        id: "haiku-4-5",
        name: "Haiku 4.5",
        input: [{ id: "default", label: "Standard", value: 95.4 }],
        output: [{ id: "default", label: "Standard", value: 477 }],
      },
      {
        id: "sonnet-5",
        name: "Sonnet 5",
        input: [{ id: "default", label: "Standard", value: 190.8 }],
        output: [{ id: "default", label: "Standard", value: 954 }],
      },
      {
        id: "opus-5",
        name: "Opus 5",
        input: [{ id: "default", label: "Standard", value: 477 }],
        output: [{ id: "default", label: "Standard", value: 2385 }],
      },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    models: [
      {
        id: "gpt-5-6-luna",
        name: "GPT-5.6 Luna",
        input: [
          { id: "low", label: "Low", value: 19 },
          { id: "high", label: "High", value: 95.4 },
        ],
        output: [
          { id: "low", label: "Low", value: 114 },
          { id: "high", label: "High", value: 572 },
        ],
      },
      {
        id: "gpt-5-6-terra",
        name: "GPT-5.6 Terra",
        input: [
          { id: "low", label: "Low", value: 190.8 },
          { id: "high", label: "High", value: 238.5 },
        ],
        output: [
          { id: "low", label: "Low", value: 1145 },
          { id: "high", label: "High", value: 1431 },
        ],
      },
      {
        id: "gpt-5-6-sol",
        name: "GPT-5.6 Sol",
        input: [{ id: "default", label: "Standard", value: 477 }],
        output: [{ id: "default", label: "Standard", value: 2862 }],
      },
    ],
  },
  {
    id: "google",
    name: "Google",
    models: [
      {
        id: "gemini-3-1-flash-lite",
        name: "Gemini 3.1 Flash-Lite",
        input: [{ id: "default", label: "Standard", value: 23.85 }],
        output: [{ id: "default", label: "Standard", value: 143.1 }],
      },
      {
        id: "gemini-3-flash",
        name: "Gemini 3.6 / 3.7 Flash",
        input: [
          { id: "low", label: "Low", value: 71.55 },
          { id: "high", label: "High", value: 143.1 },
        ],
        output: [
          { id: "low", label: "Low", value: 357.75 },
          { id: "high", label: "High", value: 858.6 },
        ],
      },
      {
        id: "gemini-3-1-pro",
        name: "Gemini 3.1 Pro",
        input: [{ id: "default", label: "Standard", value: 190.8 }],
        output: [{ id: "default", label: "Standard", value: 1145 }],
      },
    ],
  },
  {
    id: "xai",
    name: "xAI",
    models: [
      {
        id: "grok-4-1-fast",
        name: "Grok 4.1 Fast",
        input: [{ id: "default", label: "Standard", value: 19.08 }],
        output: [{ id: "default", label: "Standard", value: 47.7 }],
      },
      {
        id: "grok-4-6",
        name: "Grok 4.6",
        input: [{ id: "default", label: "Standard", value: 190.8 }],
        output: [{ id: "default", label: "Standard", value: 572.4 }],
      },
    ],
  },
  {
    id: "kimi",
    name: "Kimi",
    models: [
      {
        id: "k2-5",
        name: "K2.5",
        input: [{ id: "default", label: "Standard", value: 57.24 }],
        output: [{ id: "default", label: "Standard", value: 286.2 }],
      },
      {
        id: "k2-6-code",
        name: "K2.6 / K2.7 Code",
        input: [{ id: "default", label: "Standard", value: 90.63 }],
        output: [{ id: "default", label: "Standard", value: 381.6 }],
      },
      {
        id: "k3",
        name: "K3",
        input: [{ id: "default", label: "Standard", value: 286.2 }],
        output: [{ id: "default", label: "Standard", value: 1431 }],
      },
    ],
  },
];

export type SttModel = {
  id: string;
  name: string;
  /** INR per minute — single value or selectable tiers */
  rates: RateTier[];
  note?: string;
};

export const STT_MODELS: SttModel[] = [
  {
    id: "whisper-transcribe",
    name: "OpenAI Whisper / GPT-4o Transcribe",
    rates: [{ id: "default", label: "Standard", value: 0.57 }],
  },
  {
    id: "mini-transcribe",
    name: "OpenAI GPT-4o Mini Transcribe",
    rates: [{ id: "default", label: "Standard", value: 0.29 }],
  },
  {
    id: "realtime-whisper",
    name: "OpenAI Realtime / Streaming Whisper",
    rates: [{ id: "default", label: "Standard", value: 1.62 }],
  },
  {
    id: "gemini-flash-lite-stt",
    name: "Gemini 3.1 Flash-Lite",
    rates: [{ id: "default", label: "Standard", value: 0.036 }],
  },
  {
    id: "gemini-flash-stt",
    name: "Gemini 3.6 / 3.7 Flash",
    rates: [
      { id: "low", label: "Low", value: 0.11 },
      { id: "high", label: "High", value: 0.21 },
    ],
  },
  {
    id: "gemini-pro-stt",
    name: "Gemini 3.1 Pro",
    rates: [{ id: "default", label: "Standard", value: 0.29 }],
  },
  {
    id: "external-stt",
    name: "Claude / Grok / Kimi (via STT layer)",
    rates: [{ id: "default", label: "Whisper-class", value: 0.57 }],
    note: PRICING_COPY.sttExternalNote,
  },
];

export type OcrModel = {
  id: string;
  name: string;
  rates: RateTier[];
  available: boolean;
};

export type OcrProvider = {
  id: OcrProviderId;
  name: string;
  models: OcrModel[];
};

export const OCR_PROVIDERS: OcrProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      {
        id: "gpt-5-6-luna-ocr",
        name: "GPT-5.6 Luna",
        available: true,
        rates: [
          { id: "low", label: "Low", value: 0.015 },
          { id: "high", label: "High", value: 0.073 },
        ],
      },
      {
        id: "gpt-5-6-terra-ocr",
        name: "GPT-5.6 Terra",
        available: true,
        rates: [
          { id: "low", label: "Low", value: 0.15 },
          { id: "high", label: "High", value: 0.18 },
        ],
      },
      {
        id: "gpt-5-6-sol-ocr",
        name: "GPT-5.6 Sol",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.37 }],
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      {
        id: "haiku-4-5-ocr",
        name: "Haiku 4.5",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.13 }],
      },
      {
        id: "sonnet-5-ocr",
        name: "Sonnet 5",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.25 }],
      },
      {
        id: "opus-5-ocr",
        name: "Opus 5",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.64 }],
      },
    ],
  },
  {
    id: "google",
    name: "Google",
    models: [
      {
        id: "gemini-flash-lite-ocr",
        name: "Gemini 3.1 Flash-Lite",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.006 }],
      },
      {
        id: "gemini-flash-ocr",
        name: "Gemini 3.6 / 3.7 Flash",
        available: true,
        rates: [
          { id: "low", label: "Low", value: 0.018 },
          { id: "high", label: "High", value: 0.037 },
        ],
      },
      {
        id: "gemini-pro-ocr",
        name: "Gemini 3.1 Pro",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.049 }],
      },
    ],
  },
  {
    id: "kimi",
    name: "Kimi",
    models: [
      {
        id: "k2-5-ocr",
        name: "K2.5",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.11 }],
      },
      {
        id: "k2-6-ocr",
        name: "K2.6 / K2.7 Code",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.18 }],
      },
      {
        id: "k3-ocr",
        name: "K3",
        available: true,
        rates: [{ id: "default", label: "Standard", value: 0.57 }],
      },
    ],
  },
  {
    id: "xai",
    name: "xAI",
    models: [
      {
        id: "xai-unavailable",
        name: "Not currently estimated",
        available: false,
        rates: [],
      },
    ],
  },
];

export const TOKEN_PRESETS = [10_000, 50_000, 100_000, 500_000, 1_000_000] as const;
export const MINUTE_PRESETS = [5, 15, 30, 60, 120] as const;
export const IMAGE_PRESETS = [1, 10, 50, 100, 500] as const;

export type UsageScenarioId = "light" | "moderate" | "heavy";

export type UsageScenario = {
  id: UsageScenarioId;
  label: string;
  llmInputTokens: number;
  llmOutputTokens: number;
  sttMinutes: number;
  ocrImages: number;
  /** Default models used for scenario estimates */
  llmProviderId: LlmProviderId;
  llmModelId: string;
  sttModelId: string;
  ocrProviderId: OcrProviderId;
  ocrModelId: string;
};

export const USAGE_SCENARIOS: UsageScenario[] = [
  {
    id: "light",
    label: "Light",
    llmInputTokens: 10_000,
    llmOutputTokens: 5_000,
    sttMinutes: 10,
    ocrImages: 10,
    llmProviderId: "anthropic",
    llmModelId: "haiku-4-5",
    sttModelId: "mini-transcribe",
    ocrProviderId: "google",
    ocrModelId: "gemini-flash-lite-ocr",
  },
  {
    id: "moderate",
    label: "Moderate",
    llmInputTokens: 100_000,
    llmOutputTokens: 20_000,
    sttMinutes: 30,
    ocrImages: 50,
    llmProviderId: "anthropic",
    llmModelId: "sonnet-5",
    sttModelId: "whisper-transcribe",
    ocrProviderId: "anthropic",
    ocrModelId: "haiku-4-5-ocr",
  },
  {
    id: "heavy",
    label: "Heavy",
    llmInputTokens: 500_000,
    llmOutputTokens: 100_000,
    sttMinutes: 120,
    ocrImages: 500,
    llmProviderId: "openai",
    llmModelId: "gpt-5-6-terra",
    sttModelId: "realtime-whisper",
    ocrProviderId: "openai",
    ocrModelId: "gpt-5-6-terra-ocr",
  },
];

export const WALLET_OPS = [
  { id: "llm", label: "LLM", description: "Reasoning & Responses" },
  { id: "stt", label: "STT", description: "Speech Understanding" },
  { id: "ocr", label: "OCR / Vision", description: "Visual Understanding" },
  {
    id: "other",
    label: "Other AI Operations",
    description: "As Supported",
  },
] as const;

export const PRINCIPLE_STEPS = [
  { id: "estimate", label: "Estimate" },
  { id: "use", label: "Use" },
  { id: "track", label: "Track" },
] as const;
