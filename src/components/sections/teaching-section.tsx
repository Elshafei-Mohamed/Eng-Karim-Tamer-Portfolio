import { ntiProjects } from "@/data/registry";
import { siteFacts } from "@/data/facts";
import { teachingTopics } from "@/data/skills";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";


export function TeachingSection({ className }: { className?: string }): React.ReactElement {
  return (
    <section id="teaching" aria-label="Teaching" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <SectionHeader
            index="03"
            title="Teaching"
            lede="Teaching is the same operational skill applied to people: run the program, ship the outcome, own the result."
          />

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Monument + copy */}
          <div className="lg:col-span-5">
            <p className="text-metric-2xl text-primary">
              {siteFacts.engineersTrained}
            </p>
            <p className="mt-2 label">
              ENGINEERS TRAINED ACROSS {siteFacts.trainingRounds} ROUNDS
            </p>
            <p className="mt-6 max-w-[48ch] text-body-lg text-secondary">
              I teach developers how to turn requirements into software that can
              survive outside the classroom: the same Cubit, REST API, and MVVM
              practices used by the systems in my registry.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            {/* Topics */}
            <h3 className="label">
              WHAT I TEACH
            </h3>
            <ul className="mono-data mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {teachingTopics.map((topic) => (
                <li key={topic} className="flex items-center gap-3">
                  <span>{topic}</span>
                  <span aria-hidden className="text-border-default">
                    /
                  </span>
                </li>
              ))}
            </ul>

            {/* Curriculum set */}
            <div className="mt-10 border-t border-border-subtle pt-8">
              <div className="flex items-center gap-4">
                <span aria-hidden className="text-curriculum">
                  ◆
                </span>
                <h3 className="label-primary">
                  CURRICULUM / NTI · {ntiProjects.length} PROJECTS
                </h3>
              </div>
              <ol className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
                {ntiProjects.map((project, i) => (
                  <li key={project.slug} className="list-none">
                    <Link
                      href={`/work/${project.slug}`}
                      aria-label={`${project.title} - open project details`}
                      className="group/row -mx-3 flex cursor-pointer items-baseline justify-between rounded-md px-3 py-3.5 transition-colors duration-150 hover:bg-surface"
                    >
                      <span className="text-sm text-secondary transition-colors duration-150 group-hover/row:text-accent">
                        <span className="me-3 mono-note">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {project.title}
                      </span>
                      <span className="mono-note">NTI TRACK</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Verified factual outcome */}
            <div className="mt-10 border-t border-border-subtle pt-8">
              <h3 className="label">OUTCOME</h3>
              <p className="mt-3 max-w-[58ch] text-body-lg text-secondary">
                {siteFacts.engineersTrained} engineers have completed NTI&apos;s intensive
                hands-on Flutter program across {siteFacts.trainingRounds} rounds, each
                finishing with real applications built and reviewed.
              </p>
              <p className="mt-3 mono-note">
                SOURCE: NTI INSTRUCTOR RECORD · CREATIVA MANSOURA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
