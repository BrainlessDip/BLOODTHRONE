"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SigilSecret } from "@/components/sigil/SigilSecret";
import { SentenceOfDeath } from "@/components/animations/SentenceOfDeath";
import { site } from "@/data/site";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(
            "[data-hero-sigil]",
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          )
          .fromTo(
            "[data-hero-word]",
            { yPercent: 118 },
            { yPercent: 0, duration: 0.85, stagger: 0.09, ease: "power4.out" },
            0.35,
          )
          .fromTo(
            "[data-hero-rest]",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
            0.8,
          );
      });
      return () => mm.revert();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="kingdom"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="tex-scratch absolute inset-0 opacity-[0.045]" />
        <div className="tex-grain absolute inset-0 opacity-[0.05]" />
        {[
          { left: "12%", delay: "0s", duration: "22s" },
          { left: "38%", delay: "6s", duration: "28s" },
          { left: "67%", delay: "3s", duration: "25s" },
          { left: "86%", delay: "11s", duration: "30s" },
        ].map((mote) => (
          <span
            key={mote.left}
            className="ash absolute bottom-0 h-px w-px"
            style={{
              left: mote.left,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
              backgroundColor: "var(--color-steel-400)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 text-center">
        <div data-hero-sigil>
          <SigilSecret />
        </div>

        <p
          data-hero-rest
          className="label-herald"
          style={{ color: "var(--color-blood-300)" }}
        >
          {site.opening.label}
        </p>

        <h1 className="text-display font-display text-balance uppercase text-steel-200">
          {site.tagline.split(/(?<=\.)\s+/).map((phrase) => (
            <span key={phrase} className="block">
              {phrase.split(" ").map((word, i, all) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span data-hero-word className="inline-block">
                    {word}
                    {i < all.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p data-hero-rest className="prose-throne text-center">
          {site.summary}
        </p>

        <div data-hero-rest className="mt-4 flex flex-col gap-4 sm:flex-row">
          {site.hero.actions.map((action) => (
            <SentenceOfDeath
              key={action.href}
              href={action.href}
              skin={
                action.primary
                  ? undefined
                  : {
                      bg: "var(--color-steel-950)",
                      border: "var(--color-steel-600)",
                      fg: "var(--color-steel-200)",
                    }
              }
            >
              {action.label}
            </SentenceOfDeath>
          ))}
        </div>
      </div>

      <div
        data-hero-rest
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="label-herald" style={{ color: "var(--color-steel-400)" }}>
          {site.hero.scrollHint}
        </span>
        <span
          className="mx-auto mt-3 block h-10 w-px"
          style={{
            backgroundColor: "var(--color-steel-800)",
            animation: "hint-fall 3s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
