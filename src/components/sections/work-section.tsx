import Link from "next/link";
import { flagships, projectCounts } from "@/data/registry";
import type { Project } from "@/types";
import { StatusStamp } from "@/components/shared/status-stamp";
import { FactRow } from "@/components/shared/fact-row";
import { MediaFigure } from "@/components/shared/media-figure";
import { SectionHeader } from "@/components/shared/section-header";


export function WorkSection({ className }: { className?: string }): React.ReactElement {
  return (
    <section id="work" aria-label="Work" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <SectionHeader
          index="01"
          title="Work"
          lede="Flagship systems I've built, shipped, or currently operate."
          meta={`${projectCounts.flagship} FLAGSHIPS · ${projectCounts.total} SYSTEMS IN THE FULL ARCHIVE`}
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {flagships.map((project, i) => (
            <ProjectPreview key={project.slug} project={project} flip={i % 2 === 1} />
          ))}
        </div>

        {/* More Projects: compact index; the archive holds the full registry */}
        <div className="mt-24 lg:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
              MORE PROJECTS
            </h3>
            <Link
              href="/projects"
              className="group/archive inline-flex min-h-11 items-center font-mono text-xs tracking-wider text-muted transition-colors hover:text-secondary"
            >
              VIEW ALL PROJECTS
              <span
                aria-hidden
                className="ms-2 transition-transform duration-150 ease-out group-hover/archive:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          <ul className="mt-6 divide-y divide-border-subtle border-t border-border-subtle">
            <MoreRow
              href="/work/bidmart"
              title="BidMart"
              line="Real-time auction platform with live bidding and an integrated payment flow."
              meta="GRADUATION PROJECT"
            />
            <MoreRow
              href="/work/chatbot-app"
              title="Chatbot App"
              line="Bilingual AI chat assistant with Firebase sign-in."
              meta="PERSONAL PRODUCT"
            />
            <MoreRow
              href="/work/bookly"
              title="Bookly"
              line="Book discovery application consuming REST APIs."
              meta="PERSONAL PRODUCT"
            />
            <MoreRow
              href="/work/playzone"
              title="PlayZone"
              line="Personal Flutter build."
              meta="PERSONAL PRODUCT"
            />
            <MoreRow
              href="/projects#curriculum"
              title="NTI Projects"
              line="Six training projects from the NTI Flutter track."
              meta="CURRICULUM"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

function MoreRow({
  href,
  title,
  line,
  meta,
}: {
  href: string;
  title: string;
  line: string;
  meta: string;
}): React.ReactElement {
  return (
    <li>
      <Link
        href={href}
        className="group/row flex min-h-14 flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-border-subtle py-4 transition-colors duration-150 hover:bg-surface"
      >
        <span className="font-medium text-primary transition-colors duration-150 group-hover/row:text-accent">
          {title}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm text-secondary">{line}</span>
        <span className="hidden font-mono text-xs tracking-wide text-muted sm:block">
          {meta}
        </span>
        <span aria-hidden className="text-muted transition-colors group-hover/row:text-accent">
          →
        </span>
      </Link>
    </li>
  );
}

function ProjectPreview({
  project,
  flip = false,
}: {
  project: Project;
  flip?: boolean;
}): React.ReactElement {
  const previews = project.media.slice(0, 3);

  return (
    <article
      aria-labelledby={`work-${project.slug}`}
      className="group/entry grid grid-cols-1 items-start gap-8 border-t border-border-subtle pt-10 transition-colors duration-150 hover:border-border-default lg:grid-cols-12 lg:gap-x-20 lg:gap-y-8"
    >
      {/* Text column */}
      <div className={flip ? "lg:order-2 lg:col-span-5" : "lg:col-span-5"}>
        <div className="flex flex-wrap items-center gap-4">
          <StatusStamp status={project.status} />
          <p className="font-mono text-xs tracking-wider text-muted uppercase">
            {project.origin}
          </p>
        </div>

        <h3
          id={`work-${project.slug}`}
          className="mt-3 text-h3 text-primary transition-colors duration-150 group-hover/entry:text-accent"
        >
          {project.title}
        </h3>

        <p className="mt-3 max-w-[46ch] text-secondary">{project.mission}</p>

        <p className="mt-4 font-mono text-xs leading-relaxed tracking-wide text-muted">
          {project.stack.join(" · ")}
        </p>

        <FactRow facts={project.facts.slice(0, 3)} className="mt-5" />

        <Link
          href={`/work/${project.slug}`}
          className="group/link mt-6 inline-flex min-h-11 items-center font-mono text-[13px] tracking-wider text-primary"
        >
          <span className="border-b border-transparent pb-0.5 transition-colors duration-150 group-hover/link:border-accent group-hover/link:text-accent">
            READ CASE STUDY
          </span>
          <span
            aria-hidden
            className="ms-2 transition-transform duration-150 ease-out group-hover/link:translate-x-0.5"
          >
            →
          </span>
        </Link>

        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-6 inline-flex min-h-11 items-center font-mono text-[13px] tracking-wider text-muted transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Uniform three-screenshot preview row */}
      <div className={flip ? "lg:order-1 lg:col-span-7" : "lg:col-span-7"}>
        {previews.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {previews.map((media, mi) => (
              <MediaFigure
                key={media.src}
                media={media}
                ratio="aspect-[3/4]"
                sizes="(min-width: 1024px) 15rem, (min-width: 640px) 22vw, 30vw"
                imgClassName={mi === 0 ? undefined : "opacity-90 transition-opacity duration-150"}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
