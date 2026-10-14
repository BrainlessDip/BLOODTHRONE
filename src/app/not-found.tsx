import type { Metadata } from "next";
import Link from "next/link";
import { OrnamentDivider } from "@/components/layout/Ornaments";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Not found — ${site.name}`,
  description: "The page you were looking for does not exist.",
};

/**
 * Built to a static `out/404.html`, which Cloudflare Pages serves for any URL
 * it does not hold as a file. A server component throughout — nothing here
 * needs to run in the browser, so the page ships as HTML alone.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="tex-scratch absolute inset-0 opacity-[0.045]" />
        <div className="tex-grain absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <p
          className="label-herald"
          style={{ color: "var(--color-blood-300)" }}
        >
          {site.notFound.label}
        </p>

        <h1 className="text-display font-display text-balance uppercase text-steel-200">
          {site.notFound.heading}
        </h1>

        <OrnamentDivider />

        <p className="prose-throne text-center">{site.notFound.body}</p>

        <Link
          href="/"
          className="label-herald mt-4 border px-6 py-3 transition-colors duration-200 ease-[var(--ease-blade)]"
          style={{
            borderColor: "var(--color-blood-700)",
            color: "var(--color-steel-200)",
          }}
        >
          {site.notFound.action}
        </Link>
      </div>
    </section>
  );
}