import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }])} />

      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Vancouver · Turkish Cuisine
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {siteConfig.tagline}
        </p>
        <p className="mt-8 text-sm text-zinc-500">
          Site under construction — full launch coming soon.
        </p>
      </div>
    </main>
  );
}
