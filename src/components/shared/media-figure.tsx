import Image from "next/image";
import type { MediaItem } from "@/types";
import { cn } from "@/lib/utils";

export interface MediaFigureProps {
  media: MediaItem;
  ratio?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  compact?: boolean;
}


export function MediaFigure({
  media,
  ratio,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 70vw",
  className,
  imgClassName,
  compact = false,
}: MediaFigureProps): React.ReactElement {
  const isPortrait = media.height > media.width;

  // Portrait captures: full screenshot, fixed readable width, no cropping.
  if (!ratio && isPortrait) {
    return (
      <figure className={cn("group/media", className)}>
        <div className="w-full max-w-[340px]">
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={sizes}
            priority={media.priority}
            className={cn(
              "h-auto w-full rounded-[var(--radius-media)] bg-surface transition-[transform,opacity] duration-200 ease-out group-hover/media:scale-[1.01]",
              imgClassName,
            )}
          />
        </div>
        {compact ? null : (
          <figcaption className="mt-3 mono-note">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Landscape / forced-ratio path: balanced cover mask.
  const aspectClass = ratio ?? "aspect-[3/2]";
  return (
    <figure className={cn("group/media", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-media)] bg-surface",
          aspectClass,
        )}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={media.priority}
          className={cn(
            "object-cover object-top transition-[transform,opacity] duration-200 ease-out group-hover/media:scale-[1.01]",
            imgClassName,
          )}
        />
      </div>
      {compact ? null : (
        <figcaption className="mt-3 mono-note">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
