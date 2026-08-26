"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the reveal starts. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance — Phase 8 §55: 350ms fade + 12px rise, once.
 * Zero-dependency (IntersectionObserver + CSS) to keep the JS budget.
 * Reduced motion / no-JS: content is simply visible (the hidden state is
 * applied only after the observer arms successfully on the client).
 */
export function Reveal({ children, delay = 0, className }: RevealProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const frame = requestAnimationFrame(() => setArmed(true));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[400ms] ease-standard will-change-[opacity,transform]",
        armed && !shown && "translate-y-3 opacity-0",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
