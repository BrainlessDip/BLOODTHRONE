"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function KingsRecords() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-tally]",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-tally-grid]",
              start: "top 82%",
              once: true,
            },
          },
        );
      });
      return () => mm.revert();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="kings-records"
      className="relative border-t px-6 py-section"
      style={{
        backgroundColor: "var(--color-steel-1000)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div
        aria-hidden="true"
        className="tex-scratch pointer-events-none absolute inset-0 opacity-[0.03]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14">
        <SectionHeading
          id="kings-records-heading"
          label={site.records.label}
          heading={site.records.heading}
        />

        <dl
          data-tally-grid
          className="grid w-full grid-cols-2 gap-px lg:grid-cols-4"
          style={{ backgroundColor: "var(--color-steel-850)" }}
        >
          {site.records.stats.map((stat) => (
            <div
              key={stat.label}
              data-tally
              className="flex flex-col items-center gap-3 px-4 py-10 text-center"
              style={{ backgroundColor: "var(--color-steel-1000)" }}
            >
              <dd className="font-display text-4xl leading-none text-steel-200 sm:text-5xl">
                {stat.value}
              </dd>
              <dt
                className="label-herald"
                style={{ color: "var(--color-blood-300)" }}
              >
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* PLAN §14: the snapshot date and the caveat are stated plainly, so the
            figures are never read as a live counter. */}
        <p
          className="prose-throne max-w-xl text-center text-sm text-steel-400"
        >
          {site.records.note} Recorded {site.records.asOf}.
        </p>

        <a
          href={site.records.github}
          target="_blank"
          rel="noreferrer noopener"
          className="label-herald underline underline-offset-8 transition-colors hover:text-blood-300"
          style={{ color: "var(--color-blood-300)" }}
        >
          View {site.handle} on GitHub
        </a>
      </div>
    </section>
  );
}