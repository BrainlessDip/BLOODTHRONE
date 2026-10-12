"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LedgerNote } from "@/components/layout/LedgerNote";
import { SectionHeading } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function WarTable() {
  const rootRef = useRef<HTMLElement>(null);
  const empty = site.warTable.conquests.length === 0;

  useLayoutEffect(() => {
    if (empty) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-conquest]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-conquest-grid]",
              start: "top 80%",
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
      id="war-table"
      className="relative border-t px-6 py-section"
      style={{
        backgroundColor: "var(--color-steel-950)",
        borderColor: "var(--color-steel-850)",
      }}
    >
      <div aria-hidden="true" className="tex-scratch pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <SectionHeading
          id="war-table-heading"
          label={site.warTable.label}
          heading={site.warTable.heading}
        />

        {empty ? (
          <LedgerNote
            flavour={site.ledger.warEmpty.flavour}
            plain={site.ledger.warEmpty.plain}
          />
        ) : (
          <ul
            data-conquest-grid
            className="grid grid-cols-1 gap-px sm:grid-cols-2"
            style={{ backgroundColor: "var(--color-steel-850)" }}
          >
            {site.warTable.conquests.map((conquest) => (
              <li
                key={conquest.name}
                data-conquest
                className="group relative flex flex-col gap-7 p-8"
                style={{ backgroundColor: "var(--color-steel-950)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-0 transition-[width] duration-500 ease-[var(--ease-blade)] group-hover:w-full group-focus-within:w-full"
                  style={{ backgroundColor: "var(--color-blood-600)" }}
                />

                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-h3 font-display uppercase text-steel-200">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="text-left underline-offset-8 hover:underline focus-visible:underline"
                        >
                          {conquest.name}
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-display uppercase text-steel-200">
                            {conquest.name}
                          </DialogTitle>
                          <DialogDescription className="prose-throne text-sm">
                            {conquest.summary}
                          </DialogDescription>
                        </DialogHeader>

                        <ul className="flex flex-wrap gap-2">
                          {conquest.stack.map((tech) => (
                            <li
                              key={tech}
                              className="label-herald border px-2 py-1"
                              style={{
                                borderColor: "var(--color-steel-800)",
                                color: "var(--color-steel-300)",
                              }}
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>

                        {(conquest.demo || conquest.source) && (
                          <div className="flex flex-wrap gap-5">
                            {conquest.demo && (
                              <a
                                href={conquest.demo}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="label-herald underline underline-offset-4"
                                style={{ color: "var(--color-blood-300)" }}
                              >
                                Live siege
                              </a>
                            )}
                            {conquest.source && (
                              <a
                                href={conquest.source}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="label-herald underline underline-offset-4"
                                style={{ color: "var(--color-blood-300)" }}
                              >
                                Source
                              </a>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-3xl leading-none"
                    style={{ color: "var(--color-blood-700)" }}
                  >
                    {conquest.emblem}
                  </span>
                </div>

                <p className="prose-throne text-sm text-steel-400">
                  {conquest.summary}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {conquest.stack.map((tech) => (
                      <li
                        key={tech}
                        className="label-herald border px-2 py-1"
                        style={{
                          borderColor: "var(--color-steel-800)",
                          color: "var(--color-steel-300)",
                        }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="label-herald"
                    style={{ color: "var(--color-blood-300)" }}
                  >
                    {conquest.status}
                  </span>
                </div>

                {(conquest.demo || conquest.source) && (
                  <div className="flex gap-5">
                    {conquest.demo && (
                      <a
                        href={conquest.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="label-herald underline underline-offset-4 transition-colors hover:text-blood-300"
                        style={{ color: "var(--color-steel-400)" }}
                      >
                        Live siege
                      </a>
                    )}
                    {conquest.source && (
                      <a
                        href={conquest.source}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="label-herald underline underline-offset-4 transition-colors hover:text-blood-300"
                        style={{ color: "var(--color-steel-400)" }}
                      >
                        Source
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}