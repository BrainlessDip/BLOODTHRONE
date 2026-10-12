import { LedgerNote } from "@/components/layout/LedgerNote";
import { SentenceOfDeath } from "@/components/animations/SentenceOfDeath";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

export function IronThrone() {
  const empty = site.ironThrone.ravens.length === 0;

  return (
    <section
      id="iron-throne"
      className="relative border-t px-6 pt-section pb-16"
      style={{
        backgroundColor: "var(--color-steel-950)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div aria-hidden="true" className="tex-grain pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10">
        <SectionHeading
          id="iron-throne-heading"
          label={site.ironThrone.label}
          heading={site.ironThrone.heading}
        />

        <p className="prose-throne text-center">{site.ironThrone.support}</p>

        <p
          className="label-herald text-center"
          style={{ color: "var(--color-blood-300)" }}
        >
          {site.identity.availability} · {site.identity.responseTime}
        </p>

        {empty ? (
          <LedgerNote
            flavour={site.ledger.throneEmpty.flavour}
            plain={site.ledger.throneEmpty.plain}
          />
        ) : (
          <ul className="flex flex-col items-center gap-px sm:flex-row">
            {site.ironThrone.ravens.map((raven) => (
              <li
                key={raven.href}
                className="flex min-w-48 flex-1 items-center justify-center"
              >
                <SentenceOfDeath href={raven.href} className="w-full">
                  {raven.label}
                </SentenceOfDeath>
              </li>
            ))}
          </ul>
        )}

        <p
          className="label-herald mt-8"
          style={{ color: "var(--color-steel-400)" }}
        >
          {site.name} — {site.tagline}
        </p>
      </div>
    </section>
  );
}