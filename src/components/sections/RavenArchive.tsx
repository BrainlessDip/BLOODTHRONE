"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LedgerNote } from "@/components/layout/LedgerNote";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function RavenArchive() {
  const rootRef = useRef<HTMLElement>(null);
  const empty = site.ravenArchive.entries.length === 0;

  useLayoutEffect(() => {
    if (empty) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-chronicle-entry]",
          { opacity: 0, x: -22 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-chronicle-list]",
              start: "top 80%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          "[data-chronicle-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-chronicle-list]",
              start: "top 75%",
              once: true,
            },
          },
        );
      });
      return () => mm.revert();
    }, rootRef);
    return () => ctx.revert();
  }, [empty]);

  return (
    <section
      ref={rootRef}
      id="raven-archive"
      className="relative border-t px-6 py-section"
      style={{
        backgroundColor: "var(--color-steel-1000)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div
        aria-hidden="true"
        className="tex-parchment pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <SectionHeading
          id="raven-archive-heading"
          label={site.ravenArchive.label}
          heading={site.ravenArchive.heading}
        />

        {empty ? (
          <LedgerNote
            flavour={site.ledger.ravenEmpty.flavour}
            plain={site.ledger.ravenEmpty.plain}
          />
        ) : (
          <ol data-chronicle-list className="relative flex flex-col gap-10 pl-10">
            <span
              data-chronicle-rail
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-[7px] w-px"
              style={{ backgroundColor: "var(--color-blood-800)" }}
            />

            {site.ravenArchive.entries.map((entry) => (
              <li
                key={`${entry.date}-${entry.title}`}
                data-chronicle-entry
                className="relative flex flex-col gap-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-10 h-[15px] w-[15px]"
                  style={{
                    backgroundColor: "var(--color-blood-600)",
                    clipPath:
                      "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                />
                <time
                  className="label-herald"
                  style={{ color: "var(--color-blood-300)" }}
                >
                  {entry.date}
                </time>
                <h3 className="text-h3 font-display uppercase text-steel-200">
                  {entry.title}
                </h3>
                <p className="prose-throne text-sm text-steel-400">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}