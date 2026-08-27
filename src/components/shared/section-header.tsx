import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  index?: string;
  title: string;
  lede?: string;
  meta?: string;
  className?: string;
  children?: ReactNode;
}


export function SectionHeader({
  index,
  title,
  lede,
  meta,
  className,
}: SectionHeaderProps): React.ReactElement {
  return (
    <header className={cn("max-w-[68ch]", className)}>
      {index ? (
        <p className="font-mono text-[13px] font-medium tracking-[0.1em] text-accent">
          {index}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-h2 text-primary [text-wrap:balance]",
          index ? "mt-2" : "",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 max-w-[58ch] text-body-lg text-secondary">{lede}</p>
      ) : null}
      {meta ? (
        <p className="mt-4 font-mono text-xs tracking-wider text-muted">
          {meta}
        </p>
      ) : null}
    </header>
  );
}
