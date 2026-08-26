import type { Metadata } from "next";
import Link from "next/link";
import {
  flagships,
  ntiProjects,
  projectCounts,
  selectedProjects,
} from "@/data/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Project Archive",
  description: `The complete project registry: ${projectCounts.total} systems - ${projectCounts.personal} personal builds and ${projectCounts.nti} NTI training projects.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Project Archive | Karim Tamer",
    description: `Complete project registry: ${projectCounts.total} systems.`,
    url: `${siteConfig.url}/projects`,
  },
  twitter: {
    title: "Project Archive | Karim Tamer",
    description: `Complete project registry: ${projectCounts.total} systems.`,
  },
};

function ArchiveRow({
  slug,
  title,
  line,
  meta,
}: {
  slug: string;
  title: string;
  line: string;
  meta: string;
}) {
  return (
    <li>
      <Link
        href={`/work/${slug}`}
        className="group flex min-h-14 items-baseline gap-x-6 gap-y-1 border-b border-border-subtle py-4 transition-colors duration-150 hover:bg-surface"
      >
        <span className="font-medium text-primary transition-colors duration-150 group-hover:text-accent">
          {title}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm text-secondary">{line}</span>
        <span className="hidden font-mono text-xs tracking-wide text-muted sm:block">
          {meta}
        </span>
        <span
          aria-hidden
          className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </li>
  );
}

export default function ProjectArchivePage(): React.ReactElement {
  return (
    <main id="main-content" className="page-enter flex-1">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-28 md:pt-32 lg:px-10">
        <header>
          <p className="font-mono text-[13px] font-medium tracking-[0.1em] text-accent uppercase">
            Project archive
          </p>
          <h1 className="mt-3 text-h1 text-primary">Every system in the registry.</h1>
          <p className="mt-4 max-w-[58ch] text-body-lg text-secondary">
            {projectCounts.total} projects: {projectCounts.flagship} flagship systems,
            {" "}
            {projectCounts.personal - projectCounts.flagship} additional personal
            builds, and {projectCounts.nti} NTI training projects.
          </p>
        </header>

        {/* Flagship */}
        <section aria-label="Flagship systems" className="mt-16">
          <h2 className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
            FLAGSHIP SYSTEMS / {flagships.length}
          </h2>
          <ul className="mt-4 divide-y divide-border-subtle border-t border-border-subtle">
            {flagships.map((p) => (
              <ArchiveRow
                key={p.slug}
                slug={p.slug}
                title={p.title}
                line={p.mission ?? p.origin}
                meta={p.status ?? p.origin}
              />
            ))}
          </ul>
        </section>

        {/* Selected personal */}
        <section aria-label="Selected personal work" className="mt-14">
          <h2 className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
            SELECTED PERSONAL WORK / {selectedProjects.length}
          </h2>
          <ul className="mt-4 divide-y divide-border-subtle border-t border-border-subtle">
            {selectedProjects.map((p) => (
              <ArchiveRow
                key={p.slug}
                slug={p.slug}
                title={p.title}
                line={p.mission ?? p.origin}
                meta={p.origin}
              />
            ))}
          </ul>
        </section>

        {/* NTI curriculum */}
        <section aria-label="NTI curriculum projects" className="mt-14 scroll-mt-24" id="curriculum">
          <h2 className="font-mono text-xs tracking-[0.1em] text-curriculum uppercase">
            CURRICULUM / NTI · {ntiProjects.length}
          </h2>
          <ul className="mt-4 divide-y divide-border-subtle border-t border-border-subtle">
            {ntiProjects.map((p, i) => (
              <ArchiveRow
                key={p.slug}
                slug={p.slug}
                title={p.title}
                line={p.mission ?? "NTI Flutter track training project."}
                meta={`NTI · ${String(i + 1).padStart(2, "0")}`}
              />
            ))}
          </ul>
        </section>

        <p className="mt-16">
          <Link
            href="/#work"
            className="font-mono text-xs tracking-wider text-muted transition-colors hover:text-secondary"
          >
            ← BACK TO WORK
          </Link>
        </p>
      </div>
    </main>
  );
}
