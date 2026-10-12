"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Embers, RavenSilhouette } from "@/components/layout/Atmosphere";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function GreatHall() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-oath-line]",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-oath]",
              start: "top 88%",
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
      id="great-hall"
      className="relative border-t px-6 py-section"
      style={{
        backgroundColor: "var(--color-steel-950)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="tex-scratch absolute inset-0 opacity-[0.035]" />
        <Embers />
        <RavenSilhouette className="absolute right-[6%] bottom-[16%] h-20 opacity-[0.09]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14">
        <SectionHeading
          id="great-hall-heading"
          label={site.greatHall.label}
          heading={site.greatHall.heading}
        />

        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <p className="prose-throne text-steel-300">{site.greatHall.body}</p>
            <p
              data-oath
              className="prose-throne border-l-2 pl-6 text-steel-400 italic"
              style={{ borderColor: "var(--color-blood-700)" }}
            >
              {site.greatHall.oath.map((line) => (
                <span key={line} data-oath-line className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <dl className="flex flex-col justify-center gap-px self-start lg:self-auto">
            {[
              ["Wielded", "Python, JavaScript"],
              ["Forged in", "React, Node.js"],
              ["Held at", "FastAPI, SQL"],
            ].map(([term, detail]) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-6 border-b py-4"
                style={{ borderColor: "var(--color-steel-800)" }}
              >
                <dt
                  className="label-herald"
                  style={{ color: "var(--color-steel-400)" }}
                >
                  {term}
                </dt>
                <dd className="text-right font-display text-sm tracking-[0.18em] text-steel-300 uppercase">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}