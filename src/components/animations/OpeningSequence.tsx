"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { RoyalSigil } from "@/components/sigil/RoyalSigil";
import { site } from "@/data/site";

const SEEN_KEY = "bt:awakened";

/**
 * THE KINGDOM AWAKENS — PLAN §11.
 *
 * The overlay is opaque and server-rendered, so it occludes the hero from the
 * very first paint. The page underneath is therefore left completely untouched:
 * no opacity gating on the content, no extra render, and a JS-disabled visitor
 * still sees the portfolio once the overlay's own paint fails.
 *
 * useLayoutEffect runs before paint, so a returning visitor or a reduced-motion
 * one has the overlay removed without a single frame of it appearing. Runs once
 * per session and never blocks the portfolio.
 */
export function OpeningSequence({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const dismiss = () => {
      gsap.set(overlay, { display: "none" });
      overlay.setAttribute("aria-hidden", "true");
    };

    const returning = sessionStorage.getItem(SEEN_KEY) === "1";
    const calm = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (returning || calm) {
      dismiss();
      return;
    }

    sessionStorage.setItem(SEEN_KEY, "1");

    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: dismiss })
        .fromTo(
          "[data-awaken-line]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.16, ease: "power2.out" },
          0.35,
        )
        .fromTo(
          "[data-awaken-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power3.out" },
          0.6,
        )
        .to(overlay, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 1.55);
    }, overlay);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {children}

      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-6 bg-steel-1000"
      >
        <RoyalSigil size="lg" />
        <div
          data-awaken-rule
          className="h-px w-40 origin-center"
          style={{ backgroundColor: "var(--color-blood-700)" }}
        />
        <p
          data-awaken-line
          className="label-herald"
          style={{ color: "var(--color-steel-300)" }}
        >
          {site.opening.lines[0]}
        </p>
        <p
          data-awaken-line
          className="label-herald"
          style={{ color: "var(--color-steel-400)" }}
        >
          {site.opening.lines[1]}
        </p>
      </div>
    </>
  );
}