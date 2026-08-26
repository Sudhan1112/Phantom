"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type UseInViewOptions = {
  once?: boolean;
  amount?: number;
  rootMargin?: string;
};

export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { once = true, amount = 0.25, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once, rootMargin]);

  return { ref, inView };
}

type UseCountUpOptions = {
  value: number;
  active: boolean;
  durationMs?: number;
  decimals?: number;
};

export function useCountUp({
  value,
  active,
  durationMs = 1400,
  decimals = 0,
}: UseCountUpOptions) {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = value * eased;
      setCurrent(
        decimals > 0
          ? Number(next.toFixed(decimals))
          : Math.round(next)
      );
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, decimals, durationMs, reduceMotion, value]);

  return current;
}
