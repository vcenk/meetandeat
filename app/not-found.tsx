import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Browse our menu, make a reservation, or contact Meet and Eat in Vancouver.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
          404 — Page not found
        </p>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-brand-navy-800 sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          The page may have moved or no longer exists. Try one of the links
          below or call us at{" "}
          <a
            className="text-brand-navy-800 underline underline-offset-4 hover:text-brand-orange-500"
            href={`tel:${siteConfig.phone}`}
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/reservations", label: "Reservations" },
            { href: "/catering", label: "Catering" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                className="rounded-full border border-brand-navy-200 bg-cream px-4 py-2 text-brand-navy-800 transition-colors hover:bg-cream-soft"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
