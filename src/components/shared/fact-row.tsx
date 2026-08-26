import type { Fact } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Fact row — instrument-voice key/value pairs (Phase 7 §7).
 * Desktop: KEY VALUE · KEY VALUE …
 * Mobile : stacked KEY over VALUE (Phase 8 §14) — intentional.
 */
export function FactRow({
  facts,
  className,
}: {
  facts: readonly Fact[];
  className?: string;
}): React.ReactElement {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-3 font-mono text-[13px] leading-relaxed tracking-wide",
        className,
      )}
    >
      {facts.map((fact) => (
        <li
          key={fact.label}
          className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
        >
          <span className="text-muted">{fact.label}</span>
          <span className="whitespace-nowrap text-primary">{fact.value}</span>
        </li>
      ))}
    </ul>
  );
}
