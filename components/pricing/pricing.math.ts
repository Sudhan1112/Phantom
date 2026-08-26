import {
  CREDIT_VALUE_INR,
  GROSS_MARGIN,
  LLM_PROVIDERS,
  OCR_PROVIDERS,
  STT_MODELS,
  USAGE_SCENARIOS,
  type LlmProviderId,
  type OcrProviderId,
  type UsageScenario,
  type UsageScenarioId,
} from "./pricing.config";

export type CostBreakdown = {
  providerCost: number;
  customerPrice: number;
  grossProfit: number;
  grossMargin: number;
  credits: number;
  available: boolean;
  note?: string;
};

export type CombinedParts = {
  llm: number;
  stt: number;
  ocr: number;
};

/** Customer price from provider cost using configured gross margin. */
export function customerPriceFromProvider(providerCost: number): number {
  const denominator = 1 - GROSS_MARGIN;
  if (denominator <= 0) return providerCost;
  return providerCost / denominator;
}

export function buildBreakdown(
  providerCost: number,
  options?: { available?: boolean; note?: string }
): CostBreakdown {
  const available = options?.available ?? true;
  if (!available) {
    return {
      providerCost: 0,
      customerPrice: 0,
      grossProfit: 0,
      grossMargin: GROSS_MARGIN,
      credits: 0,
      available: false,
      note: options?.note,
    };
  }

  const customerPrice = customerPriceFromProvider(providerCost);
  const grossProfit = customerPrice - providerCost;
  const grossMargin =
    customerPrice > 0 ? grossProfit / customerPrice : GROSS_MARGIN;
  const credits =
    CREDIT_VALUE_INR > 0 ? customerPrice / CREDIT_VALUE_INR : 0;

  return {
    providerCost,
    customerPrice,
    grossProfit,
    grossMargin,
    credits,
    available: true,
    note: options?.note,
  };
}

export function calcLlmProviderCost(
  inputTokens: number,
  outputTokens: number,
  inputRatePerMillion: number,
  outputRatePerMillion: number
): number {
  const inputCost = (inputTokens / 1_000_000) * inputRatePerMillion;
  const outputCost = (outputTokens / 1_000_000) * outputRatePerMillion;
  return inputCost + outputCost;
}

export function calcSttProviderCost(
  minutes: number,
  ratePerMinute: number
): number {
  return minutes * ratePerMinute;
}

export function calcOcrProviderCost(
  images: number,
  ratePerImage: number
): number {
  return images * ratePerImage;
}

export function getLlmProvider(id: LlmProviderId) {
  return LLM_PROVIDERS.find((p) => p.id === id) ?? LLM_PROVIDERS[0];
}

export function getLlmModel(providerId: LlmProviderId, modelId: string) {
  const provider = getLlmProvider(providerId);
  return provider.models.find((m) => m.id === modelId) ?? provider.models[0];
}

export function getSttModel(modelId: string) {
  return STT_MODELS.find((m) => m.id === modelId) ?? STT_MODELS[0];
}

export function getOcrProvider(id: OcrProviderId) {
  return OCR_PROVIDERS.find((p) => p.id === id) ?? OCR_PROVIDERS[0];
}

export function getOcrModel(providerId: OcrProviderId, modelId: string) {
  const provider = getOcrProvider(providerId);
  return provider.models.find((m) => m.id === modelId) ?? provider.models[0];
}

export function formatInr(amount: number, digits = 2): string {
  if (!Number.isFinite(amount)) return "—";
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

export function formatCredits(credits: number): string {
  return Math.round(credits).toLocaleString("en-IN");
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function estimateScenario(scenario: UsageScenario): CostBreakdown {
  const llmModel = getLlmModel(scenario.llmProviderId, scenario.llmModelId);
  const sttModel = getSttModel(scenario.sttModelId);
  const ocrModel = getOcrModel(scenario.ocrProviderId, scenario.ocrModelId);

  const llmCost = calcLlmProviderCost(
    scenario.llmInputTokens,
    scenario.llmOutputTokens,
    llmModel.input[0].value,
    llmModel.output[0].value
  );
  const sttCost = calcSttProviderCost(
    scenario.sttMinutes,
    sttModel.rates[0].value
  );
  const ocrCost = ocrModel.available
    ? calcOcrProviderCost(scenario.ocrImages, ocrModel.rates[0].value)
    : 0;

  return buildBreakdown(llmCost + sttCost + ocrCost);
}

export function getScenario(id: UsageScenarioId): UsageScenario {
  return USAGE_SCENARIOS.find((s) => s.id === id) ?? USAGE_SCENARIOS[1];
}
