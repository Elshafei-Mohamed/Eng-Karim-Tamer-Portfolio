import { siteConfig } from "@/lib/site-config";

export function Footer(): React.ReactElement {
  return (
    <footer className="mt-section border-t border-border-subtle">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <p className="font-h2 text-primary">{siteConfig.name}</p>
            <p className="mt-1 font-mono text-xs tracking-wider text-muted uppercase">
              Flutter Developer · Product Engineer
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            {[
              ["WORK", "#work"],
              ["EXPERIENCE", "#experience"],
              ["TEACHING", "#teaching"],
              ["ABOUT", "#about"],
              ["CONTACT", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs tracking-wider text-muted transition-colors hover:text-secondary"
              >
                {label}
              </a>
            ))}
          </nav>

          <ul className="space-y-2">
            {[
              ["GITHUB ↗", siteConfig.githubUrl],
              ["LINKEDIN ↗", siteConfig.linkedInUrl],
              ["EMAIL →", `mailto:${siteConfig.email}`],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono text-xs tracking-wider text-muted transition-colors hover:text-secondary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col justify-center items-center space-y-2 border-t border-border-subtle pt-8 font-mono text-xs leading-relaxed text-muted">
          <p>
            DESIGNED, BUILT, AND MEASURED BY{" "}
            <a
              href="https://1.elshafeimohamed2005.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-primary"
            >
              ELSHAFEI MOHAMED
            </a>
            .
          </p>
          <p>© {new Date().getFullYear()} KARIM TAMER</p>
        </div>
      </div>
    </footer>
  );
}
