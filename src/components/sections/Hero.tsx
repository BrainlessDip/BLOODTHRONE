"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SigilSecret } from "@/components/sigil/SigilSecret";
import { SentenceOfDeath } from "@/components/animations/SentenceOfDeath";
import { useBladePointer } from "@/hooks/useBladePointer";
import { site } from "@/data/site";

const BLADE_HINT_KEY = "bt:blade-hint";

/**
 * First-arrival caption for the sword cursor. It teaches a mechanic that only
 * exists where the sword mounts, so it is gated on the exact same hook
 * SwordCursor uses: a touch device or a reduced-motion visitor has no blade to
 * point at and never renders this at all.
 *
 * `first` is read during render, but only the `bladed &&` half can differ
 * between server and client render (the hook starts false on both), so the
 * hydration output still matches and there is no flash of the caption.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const bladed = useBladePointer();
  const [first] = useState(() =>
    typeof window === "undefined"
      ? false
      : sessionStorage.getItem(BLADE_HINT_KEY) !== "1",
  );

  useLayoutEffect(() => {
    if (!bladed) return;
    sessionStorage.setItem(BLADE_HINT_KEY, "1");

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

        /* The caption arrives once the hero has settled, holds long enough to
           be read, then withdraws for good. Only the tip brightens, and only by
           opacity — no glow, no scale, nothing the blade itself has to fight
           for.

           Skipped entirely when the caption isn't in the DOM (a returning
           visitor, or a device with no sword): tweening a selector that matches
           nothing is a no-op that logs a warning on every load. */
        if (first) {
          gsap
            .timeline({ delay: 2 })
            .fromTo(
              "[data-blade-hint]",
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            )
            .fromTo(
              "[data-blade-tip]",
              { opacity: 0.3 },
              {
                opacity: 1,
                duration: 1.2,
                repeat: 1,
                yoyo: true,
                ease: "sine.inOut",
              },
              "+=0.15",
            )
            .to(
              "[data-blade-hint]",
              { opacity: 0, duration: 1.3, ease: "power2.in" },
              "+=5",
            );
        }
      });
      return () => mm.revert();
    }, rootRef);
    return () => ctx.revert();
  }, [bladed, first]);

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

        {bladed && first && (
          <p
            data-blade-hint
            className="pointer-events-none mt-1 flex items-center gap-3 font-body text-[0.78rem] leading-relaxed tracking-[0.05em] text-balance text-steel-300"
          >
            {/* A still reduction of the cursor's blade, tip up: the same shape
                the visitor is about to be steering, so the word "tip" has
                something to point at. Decorative only. */}
            <svg
              width="9"
              height="22"
              viewBox="0 0 34 58"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                data-blade-tip
                fill="var(--color-blood-500)"
                d="M17 0L20 14H14Z"
              />
              <path
                fill="oklch(0.78 0.008 250)"
                d="M14 14H20V38L17 46L14 38Z"
              />
              <path
                d="M9 40H25"
                stroke="oklch(0.64 0.009 250)"
                strokeWidth="2.5"
              />
            </svg>
            <span>{site.hero.bladeHint}</span>
          </p>
        )}
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
