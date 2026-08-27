"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface RailPart {
  id: string;
  label: string;
}

export interface MiniRailProps {
  parts: readonly RailPart[];
}


export function MiniRail({ parts }: MiniRailProps): React.ReactElement | null {
  const [active, setActive] = useState(parts[0]?.id ?? "");

  useEffect(() => {
    if (parts.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const part of parts) {
      const el = document.getElementById(part.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [parts]);

  if (parts.length === 0) return null;

  return (
    <nav aria-label="Briefing sections" className="hidden lg:block">
      <ul className="sticky top-32 space-y-3">
        {parts.map((part, i) => (
          <li key={part.id}>
            <a
              href={`#${part.id}`}
              aria-current={active === part.id ? "true" : undefined}
              className={cn(
                "group inline-flex min-h-8 items-center gap-2 font-mono text-xs tracking-wider transition-colors",
                active === part.id ? "text-primary" : "text-muted hover:text-secondary",
              )}
            >
              <span className="text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-px w-4 transition-colors",
                  active === part.id ? "bg-accent" : "bg-border-default group-hover:bg-muted",
                )}
              />
              {part.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
