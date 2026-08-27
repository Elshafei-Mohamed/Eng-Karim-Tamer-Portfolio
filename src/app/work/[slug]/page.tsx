import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProjects, getProjectBySlug, getProjectSlugs } from "@/data/registry";
import { siteConfig } from "@/lib/site-config";
import { StatusStamp } from "@/components/shared/status-stamp";
import { FactRow } from "@/components/shared/fact-row";
import { MediaFigure } from "@/components/shared/media-figure";
import { MiniRail, type RailPart } from "@/components/case-study/mini-rail";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const status = project.status ? ` · ${project.status}` : "";
  return {
    title: `${project.title}${status}`,
    description: project.mission ?? `${project.title} - ${project.origin.toLowerCase()}.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title}${status}`,
      description: project.mission ?? project.origin,
      url: `${siteConfig.url}/work/${project.slug}`,
    },
    twitter: {
      title: `${project.title}${status}`,
      description: project.mission ?? project.origin,
    },
  };
}

const SECTION_CLASSES =
  "scroll-mt-28 border-t border-border-subtle pt-10 mt-16";

function BackToWork({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <Link
      href="/#work"
      className={cnBack(className)}
    >
      ← BACK TO WORK
    </Link>
  );
}

function cnBack(extra: string): string {
  return [
    "inline-flex min-h-11 items-center font-mono text-xs tracking-wider text-muted transition-colors hover:text-secondary",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.slug === slug);
  const prev = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(index + 1) % allProjects.length];
  const [mainMedia, ...additionalMedia] = project.media;
  const groups = project.mediaGroups ?? [];

  const parts: RailPart[] = [
    { id: "overview", label: "OVERVIEW" },
    ...(project.facts.length ? [{ id: "facts", label: "FACTS" as const }] : []),
    ...(project.stack.length ? [{ id: "technology", label: "TECHNOLOGY" as const }] : []),
    ...(project.constraints?.length || project.decisions?.length || project.currentState
      ? [{ id: "details", label: "DETAILS" as const }]
      : []),
    ...(groups.length
      ? groups.map((g, gi) => ({
          id: `media-${gi}`,
          label: g.title.toUpperCase(),
        }))
      : additionalMedia.length
        ? [{ id: "media", label: "MEDIA" as const }]
        : []),
    ...(project.links.length ? [{ id: "source", label: "SOURCE" as const }] : []),
  ];

  return (
    <main id="main-content" className="page-enter flex-1">
      <article className="mx-auto max-w-[1200px] px-6 pb-24 pt-28 md:pt-32 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Rail */}
          <div className="lg:col-span-2">
            <MiniRail parts={parts} />
          </div>

          {/* Body */}
          <div className="lg:col-span-10 xl:col-span-9">
            <header>
              <BackToWork />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StatusStamp status={project.status} />
                <p className="font-mono text-xs tracking-wider text-muted uppercase">
                  {project.origin}
                </p>
              </div>
              <h1 className="mt-4 text-h1 text-primary">{project.title}</h1>
            </header>

            {/* Overview */}
            <section id="overview" aria-label="Overview" className="mt-8">
              {project.mission ? (
                <p className="max-w-[62ch] text-body-lg text-secondary">{project.mission}</p>
              ) : (
                <p className="max-w-[62ch] text-body-lg text-secondary">
                  Documentation for this project is still being prepared. The
                  verified information available today is listed below.
                </p>
              )}
            </section>

            {/* Main media */}
            {mainMedia ? (
              <div
                className={
                  mainMedia.width > mainMedia.height
                    ? "mt-12 max-w-[880px]"
                    : "mt-12 max-w-[380px]"
                }
              >
                <MediaFigure
                  media={{ ...mainMedia, priority: true }}
                  sizes="(min-width: 1024px) 50rem, (min-width: 640px) 70vw, 90vw"
                />
              </div>
            ) : null}

            {/* Facts */}
            {project.facts.length > 0 ? (
              <section id="facts" aria-label="Facts" className={SECTION_CLASSES}>
                <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  Facts
                </h2>
                <FactRow facts={project.facts} className="mt-5 max-w-[52rem]" />
              </section>
            ) : null}

            {/* Technology */}
            {project.stack.length > 0 ? (
              <section id="technology" aria-label="Technology" className={SECTION_CLASSES}>
                <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  Technology
                </h2>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[13px] text-secondary">
                  {project.stack.map((tech) => (
                    <li key={tech} className="flex items-center gap-3">
                      <span>{tech}</span>
                      <span aria-hidden className="text-border-default">
                        /
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Project details */}
            {project.constraints?.length ||
            project.decisions?.length ||
            project.currentState ? (
              <section id="details" aria-label="Project details" className={SECTION_CLASSES}>
                <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  Project details
                </h2>

                {project.constraints?.length ? (
                  <div className="mt-6">
                    <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
                      Constraints
                    </h3>
                    <FactRow facts={project.constraints} className="mt-3" />
                  </div>
                ) : null}

                {project.decisions?.length ? (
                  <div className="mt-10 space-y-10">
                    {project.decisions.map((decision) => (
                      <div key={decision.title}>
                        <h3 className="text-h3 text-primary">{decision.title}</h3>
                        <p className="mt-2 max-w-[62ch]">{decision.body}</p>
                        <p className="mt-3 max-w-[62ch]">
                          <span className="font-mono text-xs tracking-wider text-muted uppercase">
                            Because:{" "}
                          </span>
                          <span>{decision.because}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {project.currentState ? (
                  <div className="mt-10">
                    <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
                      Current state
                    </h3>
                    <p className="mt-3 flex flex-wrap items-center gap-4">
                      <StatusStamp status={project.status} />
                      <span className="max-w-[48ch] text-secondary">
                        {project.currentState.stampNote}
                      </span>
                    </p>
                    <FactRow facts={project.currentState.details} className="mt-4" />
                    <p className="mt-4 font-mono text-xs tracking-wider text-muted">
                      CONTENT LAST REVIEWED {project.currentState.lastReviewed}
                    </p>
                  </div>
                ) : null}
              </section>
            ) : null}

            {/* Media: narrative groups when curated, otherwise sequential */}
            {groups.length > 0
              ? groups.map((group, gi) => (
                  <section
                    key={group.title}
                    id={`media-${gi}`}
                    aria-label={group.title}
                    className={SECTION_CLASSES}
                  >
                    <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                      {String(gi + 1).padStart(2, "0")} · {group.title}
                    </h2>
                <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
                      {group.images.map((media) => (
                        <MediaFigure
                          key={media.src}
                          media={media}
                                          sizes="(min-width: 1024px) 15rem, (min-width: 640px) 28vw, 45vw"
                        />
                      ))}
                    </div>
                  </section>
                ))
            : additionalMedia.length > 0 ? (
              <section id="media" aria-label="Additional media" className={SECTION_CLASSES}>
                <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  Media
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {additionalMedia.map((media) => (
                    <MediaFigure
                      key={media.src}
                      media={media}
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {/* External source */}
            {project.links.length > 0 ? (
              <section id="source" aria-label="External source" className={SECTION_CLASSES}>
                <h2 className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  Source
                </h2>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center font-mono text-[13px] tracking-wider text-primary underline decoration-border-default underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Bottom navigation: back + prev/next */}
            <nav
              aria-label="Project navigation"
              className="mt-20 border-t border-border-subtle pt-10"
            >
              <BackToWork />

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Link
                  href={`/work/${prev.slug}`}
                  aria-label={`Previous project: ${prev.title}`}
                  className="group/p prev block transition-opacity hover:opacity-90"
                >
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    ← Previous
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-h3 text-primary transition-colors group-hover/p:text-accent">
                    {prev.title}
                  </p>
                </Link>
                <Link
                  href={`/work/${next.slug}`}
                  aria-label={`Next project: ${next.title}`}
                  className="group/n block text-right transition-opacity hover:opacity-90 sm:text-right"
                >
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Next →
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-h3 text-primary transition-colors group-hover/n:text-accent">
                    {next.title}
                  </p>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </article>
    </main>
  );
}
