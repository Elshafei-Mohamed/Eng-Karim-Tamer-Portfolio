"use client";

import { useRef, useState, type ReactNode } from "react";

export interface PointerDriftProps {
  children: ReactNode;
  max?: number;
  className?: string;
}


export function PointerDrift({
  children,
  max = 3,
  className,
}: PointerDriftProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  function handleEnter(): void {
    if (
      typeof window.matchMedia === "function" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches)
    ) {
      return;
    }
    setEnabled(true);
  }

  function handleMove(event: React.MouseEvent<HTMLDivElement>): void {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-max, Math.min(max, ((event.clientX - cx) / rect.width) * max * 2));
    const dy = Math.max(-max, Math.min(max, ((event.clientY - cy) / rect.height) * max * 2));
    setOffset({ x: dx, y: dy });
  }

  function handleLeave(): void {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
