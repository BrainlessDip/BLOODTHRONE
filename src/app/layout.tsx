import type { Metadata } from "next";
import { Cinzel, Spectral } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.identity.role}`,
  description: site.summary,
  alternates: {
    canonical: "https://dip.dev.cv/",
  },
  openGraph: {
    type: "profile",
    url: "https://dip.dev.cv/",
    siteName: site.name,
    title: `${site.name} — ${site.identity.role}`,
    description: site.summary,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.identity.role}`,
    description: site.summary,
  },
};

/* Identity facts only — every value is taken from the reference portfolio or
   the public GitHub profile. No private data is exposed here. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: [site.handle, "D1P", site.legalName],
  jobTitle: site.identity.role,
  description: site.summary,
  url: "https://dip.dev.cv/",
  sameAs: site.ironThrone.ravens
    .filter((raven) => !raven.href.startsWith("mailto:"))
    .map((raven) => raven.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", cinzel.variable, spectral.variable)}
    >
      <body className="min-h-full flex flex-col bg-steel-1000 text-steel-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
