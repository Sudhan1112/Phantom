/**
 * Shared scroll-entrance motion for section headers.
 * Mirrors the Hero depth language: Depth → Movement → Focus → Rest.
 */

export type SectionHeaderVariant =
  | "products"
  | "performance"
  | "compare"
  | "pricing"
  | "faq"
  | "cta";

type VariantProfile = {
  /** Desktop travel distances in px */
  eyebrowY: number;
  headingY: number;
  supportY: number;
  glowY: number;
  /** Max purple glow intensity (0–1) */
  glowIntensity: number;
  /** Progress remapping — higher = arrives sooner */
  speedBias: number;
  showGrid: boolean;
};

const PROFILES: Record<SectionHeaderVariant, VariantProfile> = {
  products: {
    eyebrowY: 30,
    headingY: 70,
    supportY: 45,
    glowY: 120,
    glowIntensity: 0.72,
    speedBias: 1,
    showGrid: false,
  },
  performance: {
    eyebrowY: 26,
    headingY: 58,
    supportY: 38,
    glowY: 100,
    glowIntensity: 0.45,
    speedBias: 1.25,
    showGrid: true,
  },
  compare: {
    eyebrowY: 30,
    headingY: 68,
    supportY: 42,
    glowY: 130,
    glowIntensity: 0.85,
    speedBias: 1,
    showGrid: false,
  },
  pricing: {
    eyebrowY: 28,
    headingY: 64,
    supportY: 42,
    glowY: 140,
    glowIntensity: 0.7,
    speedBias: 1.05,
    showGrid: false,
  },
  faq: {
    eyebrowY: 18,
    headingY: 36,
    supportY: 24,
    glowY: 60,
    glowIntensity: 0.22,
    speedBias: 1.1,
    showGrid: false,
  },
  cta: {
    eyebrowY: 22,
    headingY: 48,
    supportY: 32,
    glowY: 90,
    glowIntensity: 0.55,
    speedBias: 1.1,
    showGrid: false,
  },
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Remap raw scroll progress with optional speed bias (arrives earlier when > 1). */
export function easeHeaderProgress(raw: number, speedBias = 1): number {
  return smoothstep(Math.pow(clamp01(raw), 1 / speedBias));
}

export function getHeaderProfile(
  variant: SectionHeaderVariant,
  isMobile: boolean
): VariantProfile {
  const base = PROFILES[variant];
  if (!isMobile) return base;
  const mobileScale = 0.55;
  return {
    ...base,
    eyebrowY: base.eyebrowY * mobileScale,
    headingY: Math.min(base.headingY * mobileScale, 45),
    supportY: base.supportY * mobileScale,
    glowY: base.glowY * mobileScale,
    glowIntensity: base.glowIntensity * 0.75,
  };
}

export function mapFromProgress(
  progress: number,
  from: number,
  to: number
): number {
  return lerp(from, to, clamp01(progress));
}

/** Glow peaks near settle, then rests softly. */
export function getHeaderGlowOpacity(
  progress: number,
  intensity: number
): number {
  const p = clamp01(progress);
  if (p <= 0) return 0;
  if (p < 0.82) {
    return intensity * lerp(0.15, 0.95, p / 0.82);
  }
  return intensity * lerp(0.95, 0.38, (p - 0.82) / 0.18);
}

export function getHeaderBlur(progress: number, isMobile: boolean): number {
  const maxBlur = isMobile ? 2 : 4;
  return mapFromProgress(progress, maxBlur, 0);
}

export function getHeaderScale(progress: number): number {
  return mapFromProgress(progress, 0.96, 1);
}

export function getHeaderOpacity(progress: number): number {
  return mapFromProgress(progress, 0, 1);
}
