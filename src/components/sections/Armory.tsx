"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function Armory() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-weapon]",
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-weapon-grid]",
              start: "top 78%",
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
      id="armory"
      className="relative border-t px-6 py-section"
      style={{
        backgroundColor: "var(--color-steel-1000)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <SectionHeading
          id="armory-heading"
          label={site.armory.label}
          heading={site.armory.heading}
        />

        <ul
          data-weapon-grid
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ backgroundColor: "var(--color-steel-850)" }}
        >
          {site.armory.weapons.map((weapon) => (
            <li
              key={weapon.tech}
              data-weapon
              className="group relative flex min-h-56 flex-col justify-between gap-6 p-8 transition-colors duration-200"
              style={{ backgroundColor: "var(--color-steel-1000)" }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-0 transition-[width] duration-500 ease-[var(--ease-blade)] group-hover:w-full group-focus-within:w-full"
                style={{ backgroundColor: "var(--color-blood-600)" }}
              />

              <div className="flex flex-col gap-3">
                <h3 className="text-h3 font-display uppercase text-steel-200">
                  {weapon.title}
                </h3>
                <p
                  className="label-herald"
                  style={{ color: "var(--color-blood-300)" }}
                >
                  {weapon.tech}
                </p>
              </div>

              <p className="prose-throne text-sm text-steel-400">
                {weapon.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
