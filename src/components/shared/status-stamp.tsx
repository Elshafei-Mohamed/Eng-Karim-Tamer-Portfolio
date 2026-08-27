import type { SystemStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_META: Partial<
  Record<SystemStatus, { word: string; mark: string; className: string }>
> = {
  LIVE: { word: "LIVE", mark: "●", className: "text-live" },
  BUILDING: { word: "BUILDING", mark: "◐", className: "text-building" },
  DELIVERED: { word: "DELIVERED", mark: "✔", className: "text-delivered" },
  CURRICULUM: { word: "CURRICULUM", mark: "◆", className: "text-curriculum" },
};

export interface StatusStampProps {
  status?: SystemStatus;
  className?: string;
}


export function StatusStamp({
  status,
  className,
}: StatusStampProps): React.ReactElement | null {
  if (!status) return null;
  const meta = STATUS_META[status];
  if (!meta) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-150",
        meta.className,
        className,
      )}
    >
      <span aria-hidden>{meta.mark}</span>
      {meta.word}
    </span>
  );
}
