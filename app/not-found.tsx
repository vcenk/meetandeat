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
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          404 — Page not found
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          The page may have moved or no longer exists. Try one of the links below
          or call us at{" "}
          <a className="underline underline-offset-4" href={`tel:${siteConfig.phone}`}>
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
                className="rounded-full border border-zinc-300 px-4 py-2 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
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
