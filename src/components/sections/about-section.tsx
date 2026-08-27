import Image from "next/image";
import { education, courses } from "@/data/education";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/shared/section-header";


export function AboutSection({ className }: { className?: string }): React.ReactElement {
  return (
    <section id="about" aria-label="About" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <SectionHeader index="04" title="About" lede="The operator's file." />

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Portrait + credentials rail */}
          <div className="lg:col-span-4">
            <Image
              src={siteConfig.profileImage}
              alt={`Portrait of ${siteConfig.name}`}
              width={480}
              height={480}
              sizes="(min-width: 1024px) 24rem, 60vw"
              className="w-56 rounded-lg object-cover"
            />
            <dl className="mt-10 space-y-6 border-t border-border-subtle pt-8">
              <div>
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">EDUCATION</dt>
                <dd className="mt-1 text-sm text-primary">
                  {education.degree}
                  <br />
                  {education.university} · {education.period}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                  INSTRUCTOR TRAINING
                </dt>
                <dd className="mt-1 font-mono text-xs leading-relaxed tracking-wide text-secondary">
                  NTI · CREATIVA MANSOURA
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                  CONTINUING EDUCATION
                </dt>
                <dd className="mt-2 space-y-1.5">
                  {courses.map((course) => (
                    <p key={course.title} className="text-sm text-secondary">
                      {course.title}
                      <span className="block font-mono text-xs text-muted">
                        {course.platform} · {course.duration}
                      </span>
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">FOCUS</dt>
                <dd className="mt-1 font-mono text-xs leading-relaxed tracking-wide text-secondary">
                  FLUTTER · PRODUCT ENGINEERING · WEB
                </dd>
              </div>
            </dl>
          </div>

          {/* The arc + skills */}
          <div className="lg:col-span-8 lg:pl-8">
            <div className="max-w-[62ch] space-y-10">
              <div>
                <h3 className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
                  ACT I / TRAINEE
                </h3>
                <p className="mt-3 text-body-lg text-secondary">
                  In February 2025 I sat on the other side of NTI&apos;s Flutter track as a
                  trainee. I finished it in March, and it gave me the two things every
                  developer eventually needs: a structure to build against, and the
                  standard to notice when my own code fell short of it.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
                  ACT II / BUILDER
                </h3>
                <p className="mt-3 text-body-lg text-secondary">
                  Two weeks after finishing, a client handed me a marketplace and a
                  fourteen-day deadline. I delivered. Since then I&apos;ve kept building:
                  an app live on Google Play, an on-device video generator, and a booking
                  platform that is still growing. Shipping is where the real education
                  started.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
                  ACT III / INSTRUCTOR
                </h3>
                <p className="mt-3 text-body-lg text-secondary">
                  In October 2025, NTI hired me back to teach the track I had just
                  completed. My first round, I was nervous teaching people older than me.
                  Five rounds and 100+ engineers later, teaching is how I keep myself
                  honest: if I can&apos;t explain it clearly, I don&apos;t fully understand
                  it yet.
                </p>
              </div>
            </div>

            {/* Skill inventory: mono groups, no progress bars */}
            <div className="mt-16 border-t border-border-subtle pt-10">
              <h3 className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                SKILL INVENTORY
              </h3>
              <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <dt className="font-mono text-xs tracking-wider text-muted">{group.label}</dt>
                    <dd className="mt-2 font-mono text-[13px] leading-relaxed text-secondary">
                      {group.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
