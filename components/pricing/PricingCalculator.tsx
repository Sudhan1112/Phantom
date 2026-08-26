"use client";

import { useMemo, useState } from "react";
import {
  IMAGE_PRESETS,
  LLM_PROVIDERS,
  MINUTE_PRESETS,
  OCR_PROVIDERS,
  PRICING_COPY,
  STT_MODELS,
  TOKEN_PRESETS,
  type LlmProviderId,
  type OcrProviderId,
  type OperationId,
} from "./pricing.config";
import {
  buildBreakdown,
  calcLlmProviderCost,
  calcOcrProviderCost,
  calcSttProviderCost,
  formatTokens,
  getLlmModel,
  getLlmProvider,
  getOcrModel,
  getOcrProvider,
  getSttModel,
} from "./pricing.math";
import {
  NumberField,
  PresetRow,
  RangeField,
  SelectField,
} from "./FormControls";
import { OperationSelector } from "./OperationSelector";
import { CostResult } from "./CostResult";

type CalculatorState = {
  operation: OperationId;
  llmProviderId: LlmProviderId;
  llmModelId: string;
  llmInputTierId: string;
  llmOutputTierId: string;
  inputTokens: number;
  outputTokens: number;
  sttModelId: string;
  sttTierId: string;
  sttMinutes: number;
  ocrProviderId: OcrProviderId;
  ocrModelId: string;
  ocrTierId: string;
  ocrImages: number;
};

const INITIAL: CalculatorState = {
  operation: "llm",
  llmProviderId: "anthropic",
  llmModelId: "sonnet-5",
  llmInputTierId: "default",
  llmOutputTierId: "default",
  inputTokens: 100_000,
  outputTokens: 20_000,
  sttModelId: "whisper-transcribe",
  sttTierId: "default",
  sttMinutes: 30,
  ocrProviderId: "anthropic",
  ocrModelId: "haiku-4-5-ocr",
  ocrTierId: "default",
  ocrImages: 50,
};

function resolveTier(
  tiers: { id: string; label: string; value: number }[],
  tierId: string
) {
  return tiers.find((t) => t.id === tierId) ?? tiers[0];
}

export function PricingCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL);

  const update = <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const setLlmProvider = (providerId: LlmProviderId) => {
    const provider = getLlmProvider(providerId);
    const model = provider.models[0];
    setState((prev) => ({
      ...prev,
      llmProviderId: providerId,
      llmModelId: model.id,
      llmInputTierId: model.input[0].id,
      llmOutputTierId: model.output[0].id,
    }));
  };

  const setLlmModel = (modelId: string) => {
    const model = getLlmModel(state.llmProviderId, modelId);
    setState((prev) => ({
      ...prev,
      llmModelId: modelId,
      llmInputTierId: model.input[0].id,
      llmOutputTierId: model.output[0].id,
    }));
  };

  const setOcrProvider = (providerId: OcrProviderId) => {
    const provider = getOcrProvider(providerId);
    const model = provider.models[0];
    setState((prev) => ({
      ...prev,
      ocrProviderId: providerId,
      ocrModelId: model.id,
      ocrTierId: model.rates[0]?.id ?? "default",
    }));
  };

  const setOcrModel = (modelId: string) => {
    const model = getOcrModel(state.ocrProviderId, modelId);
    setState((prev) => ({
      ...prev,
      ocrModelId: modelId,
      ocrTierId: model.rates[0]?.id ?? "default",
    }));
  };

  const setSttModel = (modelId: string) => {
    const model = getSttModel(modelId);
    setState((prev) => ({
      ...prev,
      sttModelId: modelId,
      sttTierId: model.rates[0].id,
    }));
  };

  const { breakdown, parts } = useMemo(() => {
    const llmModel = getLlmModel(state.llmProviderId, state.llmModelId);
    const inputTier = resolveTier(llmModel.input, state.llmInputTierId);
    const outputTier = resolveTier(llmModel.output, state.llmOutputTierId);
    const llmProviderCost = calcLlmProviderCost(
      state.inputTokens,
      state.outputTokens,
      inputTier.value,
      outputTier.value
    );

    const sttModel = getSttModel(state.sttModelId);
    const sttTier = resolveTier(sttModel.rates, state.sttTierId);
    const sttProviderCost = calcSttProviderCost(
      state.sttMinutes,
      sttTier.value
    );

    const ocrModel = getOcrModel(state.ocrProviderId, state.ocrModelId);
    const ocrAvailable = ocrModel.available && ocrModel.rates.length > 0;
    const ocrTier = ocrAvailable
      ? resolveTier(ocrModel.rates, state.ocrTierId)
      : null;
    const ocrProviderCost =
      ocrAvailable && ocrTier
        ? calcOcrProviderCost(state.ocrImages, ocrTier.value)
        : 0;

    if (state.operation === "llm") {
      return { breakdown: buildBreakdown(llmProviderCost), parts: undefined };
    }
    if (state.operation === "stt") {
      return { breakdown: buildBreakdown(sttProviderCost), parts: undefined };
    }
    if (state.operation === "ocr") {
      if (!ocrAvailable) {
        return {
          breakdown: buildBreakdown(0, {
            available: false,
            note: PRICING_COPY.xaiVisionNote,
          }),
          parts: undefined,
        };
      }
      return { breakdown: buildBreakdown(ocrProviderCost), parts: undefined };
    }

    const total = llmProviderCost + sttProviderCost + ocrProviderCost;
    return {
      breakdown: buildBreakdown(total),
      parts: [
        { label: "LLM provider", amount: llmProviderCost },
        { label: "STT provider", amount: sttProviderCost },
        {
          label: "OCR provider",
          amount: ocrAvailable ? ocrProviderCost : 0,
        },
      ],
    };
  }, [state]);

  const llmModel = getLlmModel(state.llmProviderId, state.llmModelId);
  const sttModel = getSttModel(state.sttModelId);
  const ocrModel = getOcrModel(state.ocrProviderId, state.ocrModelId);
  const showLlm =
    state.operation === "llm" || state.operation === "combined";
  const showStt =
    state.operation === "stt" || state.operation === "combined";
  const showOcr =
    state.operation === "ocr" || state.operation === "combined";

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#C0C0C0]/14 bg-[#0A0A0A]/90 p-5 sm:p-7 lg:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(75,0,130,0.14)_0%,transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#C0C0C0]/55 uppercase">
          {PRICING_COPY.calculatorLabel}
        </p>

        <div className="mt-5">
          <OperationSelector
            selected={state.operation}
            onSelect={(id) => update("operation", id)}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div className="space-y-6 rounded-2xl border border-white/8 bg-black/30 p-5 sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#C0C0C0]/55 uppercase">
              {PRICING_COPY.configureLabel}
            </p>

            {showLlm ? (
              <div className="space-y-4">
                {state.operation === "combined" ? (
                  <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37]/80 uppercase">
                    LLM
                  </p>
                ) : null}
                <SelectField
                  label="Provider"
                  value={state.llmProviderId}
                  onChange={(v) => setLlmProvider(v as LlmProviderId)}
                  options={LLM_PROVIDERS.map((p) => ({
                    id: p.id,
                    label: p.name,
                  }))}
                />
                <SelectField
                  label="Model"
                  value={state.llmModelId}
                  onChange={setLlmModel}
                  options={getLlmProvider(state.llmProviderId).models.map(
                    (m) => ({ id: m.id, label: m.name })
                  )}
                />
                {llmModel.input.length > 1 ? (
                  <SelectField
                    label="Input Rate Tier"
                    value={state.llmInputTierId}
                    onChange={(v) => update("llmInputTierId", v)}
                    options={llmModel.input.map((t) => ({
                      id: t.id,
                      label: `${t.label} · ₹${t.value}/1M`,
                    }))}
                  />
                ) : null}
                {llmModel.output.length > 1 ? (
                  <SelectField
                    label="Output Rate Tier"
                    value={state.llmOutputTierId}
                    onChange={(v) => update("llmOutputTierId", v)}
                    options={llmModel.output.map((t) => ({
                      id: t.id,
                      label: `${t.label} · ₹${t.value}/1M`,
                    }))}
                  />
                ) : null}
                <div>
                  <NumberField
                    label="Input Tokens"
                    value={state.inputTokens}
                    onChange={(v) => update("inputTokens", v)}
                    min={0}
                    step={1000}
                    hint={formatTokens(state.inputTokens)}
                  />
                  <PresetRow
                    activeValue={state.inputTokens}
                    onSelect={(v) => update("inputTokens", v)}
                    presets={TOKEN_PRESETS.map((n) => ({
                      label: formatTokens(n),
                      value: n,
                    }))}
                  />
                </div>
                <div>
                  <NumberField
                    label="Output Tokens"
                    value={state.outputTokens}
                    onChange={(v) => update("outputTokens", v)}
                    min={0}
                    step={1000}
                    hint={formatTokens(state.outputTokens)}
                  />
                  <PresetRow
                    activeValue={state.outputTokens}
                    onSelect={(v) => update("outputTokens", v)}
                    presets={TOKEN_PRESETS.map((n) => ({
                      label: formatTokens(n),
                      value: n,
                    }))}
                  />
                </div>
                <RangeField
                  label="Input slider"
                  value={Math.min(state.inputTokens, 1_000_000)}
                  onChange={(v) => update("inputTokens", v)}
                  min={0}
                  max={1_000_000}
                  step={1000}
                  display={formatTokens(state.inputTokens)}
                />
              </div>
            ) : null}

            {showStt ? (
              <div className="space-y-4">
                {state.operation === "combined" ? (
                  <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37]/80 uppercase">
                    STT
                  </p>
                ) : null}
                <SelectField
                  label="STT Model"
                  value={state.sttModelId}
                  onChange={setSttModel}
                  options={STT_MODELS.map((m) => ({
                    id: m.id,
                    label: m.name,
                  }))}
                />
                {sttModel.note ? (
                  <p className="text-xs text-[#C0C0C0]/55">{sttModel.note}</p>
                ) : null}
                {sttModel.rates.length > 1 ? (
                  <SelectField
                    label="Rate Tier"
                    value={state.sttTierId}
                    onChange={(v) => update("sttTierId", v)}
                    options={sttModel.rates.map((t) => ({
                      id: t.id,
                      label: `${t.label} · ₹${t.value}/min`,
                    }))}
                  />
                ) : null}
                <div>
                  <NumberField
                    label="Audio Duration (minutes)"
                    value={state.sttMinutes}
                    onChange={(v) => update("sttMinutes", v)}
                    min={0}
                    step={1}
                  />
                  <PresetRow
                    activeValue={state.sttMinutes}
                    onSelect={(v) => update("sttMinutes", v)}
                    presets={MINUTE_PRESETS.map((n) => ({
                      label: `${n} min`,
                      value: n,
                    }))}
                  />
                </div>
              </div>
            ) : null}

            {showOcr ? (
              <div className="space-y-4">
                {state.operation === "combined" ? (
                  <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37]/80 uppercase">
                    OCR / Vision
                  </p>
                ) : null}
                <SelectField
                  label="Provider"
                  value={state.ocrProviderId}
                  onChange={(v) => setOcrProvider(v as OcrProviderId)}
                  options={OCR_PROVIDERS.map((p) => ({
                    id: p.id,
                    label: p.name,
                  }))}
                />
                <SelectField
                  label="Model"
                  value={state.ocrModelId}
                  onChange={setOcrModel}
                  options={getOcrProvider(state.ocrProviderId).models.map(
                    (m) => ({ id: m.id, label: m.name })
                  )}
                />
                {ocrModel.available && ocrModel.rates.length > 1 ? (
                  <SelectField
                    label="Rate Tier"
                    value={state.ocrTierId}
                    onChange={(v) => update("ocrTierId", v)}
                    options={ocrModel.rates.map((t) => ({
                      id: t.id,
                      label: `${t.label} · ₹${t.value}/image`,
                    }))}
                  />
                ) : null}
                {ocrModel.available ? (
                  <>
                    <div>
                      <NumberField
                        label="Number of Images"
                        value={state.ocrImages}
                        onChange={(v) => update("ocrImages", v)}
                        min={0}
                        step={1}
                      />
                      <PresetRow
                        activeValue={state.ocrImages}
                        onSelect={(v) => update("ocrImages", v)}
                        presets={IMAGE_PRESETS.map((n) => ({
                          label: String(n),
                          value: n,
                        }))}
                      />
                    </div>
                    <p className="text-[11px] text-[#C0C0C0]/45">
                      {PRICING_COPY.imageAssumption}
                    </p>
                  </>
                ) : (
                  <p className="text-xs leading-relaxed text-[#C0C0C0]/55">
                    {PRICING_COPY.xaiVisionNote}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <CostResult breakdown={breakdown} parts={parts} />
        </div>
      </div>
    </div>
  );
}
