import { shippedSystemsCount, siteFacts } from "@/data/facts";

/**
 * SCREEN 02 — Proof bar (Phase 8 §14–15).
 * Three monumental proof moments, server-rendered immediately.
 * No counters, no animation. Numbers come from the shared facts module.
 */
export function ProofSection({ className }: { className?: string }): React.ReactElement {
  const proofs = [
    {
      value: siteFacts.engineersTrained,
      label: "ENGINEERS TRAINED AT NTI",
      href: "#teaching",
    },
    {
      value: String(siteFacts.mvpDeliveryDays),
      label: "DAYS TO CLIENT MVP DELIVERY",
      href: "#work",
    },
    {
      value: String(shippedSystemsCount),
      label: "SHIPPED SYSTEMS IN THE REGISTRY",
      href: "#work",
    },
  ] as const;

  return (
    <section id="proof" aria-label="Verified track record" className={`scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <dl className="grid grid-cols-1 gap-y-12 border-y border-border-subtle py-14 sm:grid-cols-3 sm:gap-x-10">
          {proofs.map((proof) => (
            <div key={proof.label}>
              <dt className="sr-only">{proof.label}</dt>
              <dd>
                <a href={proof.href} className="group block transition-opacity hover:opacity-85">
                  <span className="block text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-tight text-primary">
                    {proof.value}
                  </span>
                  <span className="mt-3 block font-mono text-xs tracking-[0.08em] text-muted group-hover:text-secondary">
                    {proof.label}
                  </span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
