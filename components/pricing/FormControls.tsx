"use client";

import type { ReactNode } from "react";

type FieldLabelProps = {
  children: ReactNode;
  hint?: string;
};

export function FieldLabel({ children, hint }: FieldLabelProps) {
  return (
    <div className="mb-2 flex items-end justify-between gap-3">
      <label className="text-[11px] font-medium tracking-[0.18em] text-[#C0C0C0]/65 uppercase">
        {children}
      </label>
      {hint ? (
        <span className="text-[11px] text-[#C0C0C0]/45">{hint}</span>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
};

export function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-[#C0C0C0]/18 bg-black/50 px-4 text-sm text-white outline-none transition-colors focus:border-[#4B0082]/60"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-[#0A0A0A]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
};

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  hint,
}: NumberFieldProps) {
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(Math.max(min, next));
        }}
        className="h-11 w-full rounded-xl border border-[#C0C0C0]/18 bg-black/50 px-4 text-sm text-white outline-none transition-colors focus:border-[#4B0082]/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}

type PresetRowProps = {
  presets: { label: string; value: number }[];
  activeValue: number;
  onSelect: (value: number) => void;
};

export function PresetRow({ presets, activeValue, onSelect }: PresetRowProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {presets.map((preset) => {
        const active = preset.value === activeValue;
        return (
          <button
            key={preset.label}
            type="button"
            onClick={() => onSelect(preset.value)}
            className={`rounded-full border px-2.5 py-1 text-[11px] tracking-wide transition-colors ${
              active
                ? "border-[#4B0082]/55 bg-[#4B0082]/25 text-white"
                : "border-[#C0C0C0]/15 text-[#C0C0C0]/65 hover:border-[#C0C0C0]/30 hover:text-white"
            }`}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

type RangeFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  display: string;
};

export function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
}: RangeFieldProps) {
  return (
    <div>
      <FieldLabel hint={display}>{label}</FieldLabel>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#4B0082]"
      />
    </div>
  );
}
