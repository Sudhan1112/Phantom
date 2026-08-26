"use client";

import { motion } from "framer-motion";
import { OPERATIONS, type OperationId } from "./pricing.config";

type OperationSelectorProps = {
  selected: OperationId;
  onSelect: (id: OperationId) => void;
};

export function OperationSelector({
  selected,
  onSelect,
}: OperationSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-medium tracking-[0.18em] text-[#C0C0C0]/60 uppercase">
        What do you want to estimate?
      </p>
      <div
        role="tablist"
        aria-label="Pricing operations"
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
      >
        {OPERATIONS.map((op) => {
          const active = op.id === selected;
          return (
            <button
              key={op.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(op.id)}
              className={`relative overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors ${
                active
                  ? "border-[#4B0082]/55 bg-gradient-to-b from-[#4B0082]/45 to-[#1a0a24] text-white shadow-[0_0_28px_rgba(75,0,130,0.35)]"
                  : "border-[#C0C0C0]/14 bg-black/40 text-[#C0C0C0] hover:border-[#C0C0C0]/28 hover:text-white"
              }`}
            >
              {active ? (
                <motion.span
                  className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="block text-sm font-medium tracking-[-0.01em]">
                {op.label}
              </span>
              <span
                className={`mt-1 block text-xs ${
                  active ? "text-white/70" : "text-[#C0C0C0]/50"
                }`}
              >
                {op.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
