import {
  LAYER_SCALE_END,
  LAYER_SCALE_START,
  PARALLAX_RANGE_PX,
} from "./hero.config";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Locked five-phase cinematic pacing.
 *
 * Raw → eased travel:
 * 0.00–0.20 entrance      → ~0.00–0.08
 * 0.20–0.50 depth reveal  → ~0.08–0.40
 * 0.50–0.70 wow zone      → ~0.40–0.78
 * 0.70–0.85 slowing       → ~0.78–0.92
 * 0.85–1.00 gentle settle → ~0.92–1.00
 */
const PHASE_INPUT = [0, 0.2, 0.5, 0.7, 0.85, 1] as const;
const PHASE_OUTPUT = [0, 0.08, 0.4, 0.78, 0.92, 1] as const;

export function easeHeroProgress(raw: number): number {
  const p = clamp01(raw);

  for (let i = 0; i < PHASE_INPUT.length - 1; i++) {
    const inStart = PHASE_INPUT[i];
    const inEnd = PHASE_INPUT[i + 1];
    if (p <= inEnd || i === PHASE_INPUT.length - 2) {
      if (p < inStart) return PHASE_OUTPUT[i];
      const t = (p - inStart) / (inEnd - inStart);
      // Soft ease within each phase so boundaries don't feel linear-mechanical
      const smooth = t * t * (3 - 2 * t);
      return lerp(PHASE_OUTPUT[i], PHASE_OUTPUT[i + 1], smooth);
    }
  }

  return 1;
}

/** Subtle depth parallax — progress 0 = identity (y 0). Uses eased progress. */
export function getDepthParallaxPx(depth: number, rawProgress: number): number {
  const eased = easeHeroProgress(rawProgress);
  if (eased <= 0) return 0;
  if (eased >= 1) return -depth * PARALLAX_RANGE_PX;
  return -depth * PARALLAX_RANGE_PX * eased;
}

/** Shared scale bleed — 1 at progress 0, 1.04 at progress 1. Uses eased progress. */
export function getLayerScale(rawProgress: number): number {
  const eased = easeHeroProgress(rawProgress);
  if (eased <= 0) return LAYER_SCALE_START;
  if (eased >= 1) return LAYER_SCALE_END;
  return lerp(LAYER_SCALE_START, LAYER_SCALE_END, eased);
}

/** Content-plane y — three phases: hold → subtle lift → graceful recede. */
function mapContentY(
  rawProgress: number,
  midY: number,
  endY: number
): number {
  const p = clamp01(rawProgress);

  // Phase 1: 0 → 0.20 — almost stationary
  if (p <= 0.2) {
    return lerp(0, midY * 0.05, p / 0.2);
  }

  // Phase 2: 0.20 → 0.70 — subtle upward parallax
  if (p <= 0.7) {
    const t = (p - 0.2) / 0.5;
    const smooth = t * t * (3 - 2 * t);
    return lerp(midY * 0.05, midY, smooth);
  }

  // Phase 3: 0.70 → 1.00 — recede with deceleration (no late acceleration)
  const t = (p - 0.7) / 0.3;
  const decelerate = 1 - Math.pow(1 - t, 2.2);
  return lerp(midY, endY, decelerate);
}

/** Eyebrow: slowest content plane. */
export function getEyebrowY(rawProgress: number): number {
  return mapContentY(rawProgress, -16, -45);
}

/** Heading: slightly deeper than eyebrow. */
export function getHeadingY(rawProgress: number): number {
  return mapContentY(rawProgress, -20, -62);
}

/** Subheading: slightly faster than heading. */
export function getSubheadingY(rawProgress: number): number {
  return mapContentY(rawProgress, -28, -72);
}

/** CTA group: slightly faster again. */
export function getCtaY(rawProgress: number): number {
  return mapContentY(rawProgress, -34, -82);
}

/** Soft fade while receding — still readable through most of the hero. */
export function getContentOpacity(rawProgress: number): number {
  const p = clamp01(rawProgress);
  if (p <= 0.7) {
    return lerp(1, 0.98, p / 0.7);
  }
  const t = (p - 0.7) / 0.3;
  const decelerate = 1 - Math.pow(1 - t, 2.2);
  return lerp(0.98, 0.85, decelerate);
}

/** Tiny scale-down as content recedes — depth without shrinking dramatically. */
export function getContentScale(rawProgress: number): number {
  const p = clamp01(rawProgress);
  if (p <= 0.7) {
    return lerp(1, 0.99, p / 0.7);
  }
  const t = (p - 0.7) / 0.3;
  const decelerate = 1 - Math.pow(1 - t, 2.2);
  return lerp(0.99, 0.97, decelerate);
}

/** Vignette strengthens slightly as the scene deepens. */
export function getVignetteOpacity(rawProgress: number): number {
  return lerp(0.45, 0.7, easeHeroProgress(rawProgress));
}
