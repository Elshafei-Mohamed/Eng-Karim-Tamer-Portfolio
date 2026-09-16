import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { getHeroRegistry } from "@/data/registry";
import { StatusStamp } from "@/components/shared/status-stamp";
import { PointerDrift } from "@/components/shared/pointer-drift";


export function HeroSection(): React.ReactElement {
  const registry = getHeroRegistry();

  return (
    <section aria-label="Introduction" className="relative">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 pb-20 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Operator */}
        <div className="lg:col-span-7">
          <div className="boot flex items-center gap-4">
            <PointerDrift max={3}>
              <Image
                src={siteConfig.profileImage}
                alt={`Portrait of ${siteConfig.name}`}
                width={72}
                height={72}
                priority
                sizes="72px"
                className="rounded-lg object-cover"
              />
            </PointerDrift>
            <div>
              <p className="font-mono text-xl font-semibold leading-tight tracking-wide text-primary">
                {siteConfig.name}
              </p>
              <p className="mt-1 label">Flutter Developer</p>
            </div>
          </div>

          <h1
            className="boot mt-8 max-w-[16ch] text-display text-primary"
            style={{ animationDelay: "70ms" }}
          >
            I build products people use.
            <br />
            Then teach others to build theirs.
          </h1>

          <p
            className="boot mt-8 max-w-[58ch] text-body-lg text-secondary"
            style={{ animationDelay: "140ms" }}
          >
            I build and ship mobile products, work with real constraints, and
            teach developers how to do the same at NTI.
          </p>

          <div
            className="boot mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "430ms" }}
          >
            <a
              href="#work"
              className="btn btn-solid"
            >
              READ WORK →
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
            >
              OPEN CHANNEL →
            </a>
          </div>
        </div>

        {/* System registry */}
        <div className="lg:col-span-5 lg:pl-8">
          <p
            className="boot label"
            style={{ animationDelay: "200ms" }}
          >
            SYSTEM REGISTRY
          </p>
          <ul className="mt-5 divide-y divide-border-subtle border-y border-border-subtle">
            {registry.map(({ project }, i) => (
              <li
                key={project.slug}
                className="boot"
                style={{ animationDelay: `${260 + i * 60}ms` }}
              >
                <a
                  href="#work"
                  className="group block py-5 transition-opacity hover:opacity-90"
                >
                  <StatusStamp status={project.status} />
                  <p className="mt-2 text-h3 text-primary transition-colors duration-150 group-hover:text-accent">
                    {project.title}
                  </p>
                  <p className="mt-1 mono-note transition-colors duration-150 group-hover:text-secondary">
                    {project.stack.slice(0, 3).join(" · ")}
                    {project.status === "LIVE" ? " · GOOGLE PLAY" : ""}
                  </p>
                </a>
              </li>
            ))}
            <li className="boot" style={{ animationDelay: "380ms" }}>
              <a
                href="#teaching"
                className="group block py-5 transition-opacity hover:opacity-90"
              >
                <StatusStamp status="CURRICULUM" />
                <p className="mt-2 text-h3 text-primary transition-colors duration-150 group-hover:text-accent">
                  100+ engineers trained
                </p>
                <p className="mt-1 mono-note transition-colors duration-150 group-hover:text-secondary">
                  NTI · 5 ROUNDS · INSTRUCTOR
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
