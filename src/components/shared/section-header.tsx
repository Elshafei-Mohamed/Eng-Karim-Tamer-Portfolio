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
        <p className="label-accent">
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
        <p className="mt-4 text-pretty max-w-[58ch] text-body-lg text-secondary">{lede}</p>
      ) : null}
      {meta ? (
        <p className="label mt-4 text-pretty">
          {meta}
        </p>
      ) : null}
    </header>
  );
}
