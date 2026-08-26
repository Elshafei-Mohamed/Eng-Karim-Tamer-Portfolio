import { contactGroups } from "@/data/contact";
import { ContactForm } from "@/components/shared/contact-form";

/**
 * SCREEN 07 — Contact: open a channel (Phase 8 §34–37).
 * Two audience paths with equal dignity; centered invitation permitted here.
 */
export function ContactSection({ className }: { className?: string }): React.ReactElement {
  return (
    <section id="contact" aria-label="Contact" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[13px] tracking-[0.1em] text-accent uppercase">
            05 · CONTACT
          </p>
          <h2 className="mt-4 text-h1 text-primary [text-wrap:balance]">
            Have a product that needs an accountable builder?
          </h2>
          <p className="mt-4 text-body-lg">
            Let&apos;s talk. For hiring, freelance work, or a technical conversation.
            Choose the channel that fits.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Channels */}
          <div className="space-y-10 lg:col-span-5">
            {contactGroups.map((group) => (
              <div key={group.audience}>
                <h3 className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  {group.audience}
                </h3>
                <ul className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
                  {group.channels.map((channel) => (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        {...(channel.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        {...(channel.id === "resume" ? { download: true } : {})}
                        className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <channel.icon className="size-4 text-muted group-hover:text-accent" aria-hidden />
                          <span className="text-primary transition-colors group-hover:text-accent">
                            {channel.label.toUpperCase()}{" "}
                            {channel.href.startsWith("http") ? "↗" : channel.id === "resume" ? "↓" : "→"}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-muted">{channel.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
