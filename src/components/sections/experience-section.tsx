import { jobs } from "@/data/experience";
import { SectionHeader } from "@/components/shared/section-header";
import type { Job } from "@/types";


export function ExperienceSection({ className }: { className?: string }): React.ReactElement {
  const [instructor, freelance, trainee] = jobs;

  return (
    <section id="experience" aria-label="Experience" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <SectionHeader
            index="02"
            title="Experience"
            lede="An operation log: increasing responsibility, newest first."
          />

        <div className="mt-16 space-y-20">
          <InstructorEntry job={instructor} />
          <CompactEntry job={freelance} />
          <CompactEntry job={trainee} last />
        </div>
      </div>
    </section>
  );
}

function InstructorEntry({ job }: { job: Job }): React.ReactElement {
  return (
    <article aria-labelledby="exp-instructor" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">{job.period}</p>
        <h3 id="exp-instructor" className="mt-3 text-h1 text-primary">
          {job.position}
          <span className="text-secondary"> · {job.organization}</span>
        </h3>
        <p className="mt-4 max-w-[58ch] text-body-lg text-secondary">{job.summary}</p>
        <ul className="mt-6 max-w-[62ch] space-y-2">
          {job.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <dl className="lg:col-span-5 lg:pl-8">
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {job.facts?.map((fact) => (
            <div key={fact.label} className="flex items-baseline justify-between py-4">
              <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                {fact.label}
              </dt>
              <dd className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-tight text-primary">
                {fact.value}
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </article>
  );
}

function CompactEntry({ job, last = false }: { job: Job; last?: boolean }): React.ReactElement {
  return (
    <article
      aria-label={`${job.position} at ${job.organization}`}
      className={`border-t border-border-subtle pt-8 ${last ? "" : "pb-2"}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-h3 font-normal text-primary">
          {job.position}
          <span className="text-secondary"> · {job.organization}</span>
        </h3>
        <p className="font-mono text-xs tracking-wider text-muted uppercase">{job.period}</p>
      </div>
      <p className="mt-2 max-w-[62ch] text-sm text-secondary">{job.summary}</p>
    </article>
  );
}
