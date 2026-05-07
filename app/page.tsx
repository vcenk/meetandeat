import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { homepageFaqs } from "@/lib/faq-content";
import { menuSections } from "@/lib/menu-data";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import {
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: siteConfig.titleDefault,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.titleDefault,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

const fullAddress = `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

const hoursDisplay: Array<{ day: string; hours: string }> = [
  { day: "Monday", hours: "11:30 AM – 10:00 PM" },
  { day: "Tuesday", hours: "5:00 PM – 10:00 PM" },
  { day: "Wednesday", hours: "11:30 AM – 10:00 PM" },
  { day: "Thursday", hours: "11:30 AM – 10:00 PM" },
  { day: "Friday", hours: "11:30 AM – 10:30 PM" },
  { day: "Saturday", hours: "11:30 AM – 11:00 PM" },
  { day: "Sunday", hours: "11:30 AM – 10:00 PM" },
];

const trustTiles = [
  { label: "100% Halal", body: "Halal-certified meat across the kebab and grill menu." },
  { label: "Charcoal grilled", body: "Kebabs cooked over charcoal in the Anatolian tradition." },
  { label: "Stone-oven pides", body: "Hand-shaped flatbreads baked fresh to order." },
  { label: "Family recipes", body: "Mezes and traditional dishes brought from Turkey." },
];

function priceRange(prices: number[]): string {
  const valid = prices.filter((p) => p > 0);
  if (valid.length === 0) return "";
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  return min === max ? `$${min}` : `$${min} – $${max}`;
}

const primaryButton =
  "inline-flex h-12 items-center justify-center rounded-full bg-brand-navy-800 px-6 text-sm font-medium text-cream transition-colors hover:bg-brand-navy-700";
const secondaryButton =
  "inline-flex h-12 items-center justify-center rounded-full border border-brand-navy-200 bg-cream px-6 text-sm font-medium text-brand-navy-800 transition-colors hover:bg-cream-soft";
const accentButton =
  "inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-6 text-sm font-medium text-brand-navy-900 transition-colors hover:bg-brand-orange-300";

export default function Home() {
  const pageUrl = `${siteConfig.url}/`;
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: "/" }]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: siteConfig.titleDefault,
            description: siteConfig.description,
            breadcrumb,
          }),
          breadcrumb,
          faqPageSchema(homepageFaqs),
        ]}
      />

      <main className="flex flex-1 flex-col">
        {/* === Hero / Above-the-fold ============================================ */}
        <section className="relative overflow-hidden px-6 pt-12 pb-24 sm:pt-20 sm:pb-32">
          {/* Soft cream-on-cream radial accent for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-cream-soft to-transparent"
          />
          <div className="mx-auto max-w-4xl text-center">
            <Image
              src={siteConfig.brand.logoSrc}
              alt={siteConfig.brand.logoAlt}
              width={140}
              height={140}
              priority
              className="mx-auto h-32 w-32 sm:h-36 sm:w-36"
            />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
              {siteConfig.address.neighbourhood} · Vancouver
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-brand-navy-800 sm:text-6xl md:text-7xl">
              Authentic Turkish Restaurant
              <br className="hidden sm:block" /> in Vancouver
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Meet and Eat is a family-run Turkish restaurant in Vancouver
              serving charcoal-grilled kebabs, stone-oven lahmacun, fresh
              mezes, and traditional Turkish desserts on East Hastings. We cook
              the way we&rsquo;d cook for our own family — halal meats,
              hand-prepared dough, and recipes brought from Turkey to the heart
              of Hastings-Sunrise.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/menu" className={primaryButton}>
                See the Menu
              </Link>
              <Link href="/reservations" className={secondaryButton}>
                Book a Table
              </Link>
              <a href={`tel:${siteConfig.phone}`} className={secondaryButton}>
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Halal · Dine-in · Takeout · Catering · Reservations recommended on
              weekends
            </p>
          </div>
        </section>

        {/* === About / Story =================================================== */}
        <section className="border-t border-cream-strong bg-cream-soft px-6 py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
                About Meet and Eat
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy-800 sm:text-4xl">
                Real Turkish cuisine, cooked the traditional way
              </h2>
              <div className="mt-6 space-y-4 text-ink-soft">
                <p>
                  Turkish cuisine is more than kebabs — it&rsquo;s a tradition
                  of charcoal grills, stone ovens, fresh mezes, and meals
                  shared slowly with family. At Meet and Eat, we bring that
                  tradition to East Vancouver with recipes our chefs have
                  refined over decades, using halal-certified meats,
                  daily-baked breads, and produce from local Vancouver
                  suppliers.
                </p>
                <p>
                  Whether you&rsquo;re stopping in for an Adana kebab on a
                  Tuesday evening, sharing mezes with friends on a Saturday
                  night, or planning a wedding reception, we want you to leave
                  the table feeling like you visited a Turkish home.
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {trustTiles.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-brand-navy-100 bg-cream p-5"
                >
                  <p className="font-semibold text-brand-navy-800">{item.label}</p>
                  <p className="mt-1 text-ink-soft">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* === Menu preview ==================================================== */}
        <section
          id="menu-preview"
          className="border-t border-cream-strong px-6 py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
                Our Menu
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy-800 sm:text-4xl">
                Browse the menu
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
                Charcoal-grilled kebabs, stone-oven pides, fresh mezes, and
                traditional Turkish desserts — all halal. Tap any section to
                see the full list with prices.
              </p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {menuSections.map((section) => {
                const range = priceRange(section.items.map((i) => i.price));
                return (
                  <li
                    key={section.slug}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-brand-navy-100 bg-cream"
                  >
                    <Link
                      href={`/menu#${section.slug}`}
                      className="flex flex-1 flex-col"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-cream-soft">
                        <Image
                          src={section.imageSrc}
                          alt={section.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-xl font-semibold text-brand-navy-800">
                            {section.name}
                          </h3>
                          {range && (
                            <span className="text-sm font-medium text-brand-orange-500">
                              {range}
                            </span>
                          )}
                        </div>
                        {section.description && (
                          <p className="mt-2 text-sm text-ink-soft">
                            {section.description}
                          </p>
                        )}
                        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-soft">
                          {section.items.length} dishes
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-12 text-center">
              <Link href="/menu" className={primaryButton}>
                View the full menu
              </Link>
            </div>
          </div>
        </section>

        {/* === Visit Us (location, hours, map) ================================= */}
        <section
          id="visit"
          className="border-t border-cream-strong bg-cream-soft px-6 py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
                Visit Us
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy-800 sm:text-4xl">
                Find Meet and Eat in East Vancouver
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
                We&rsquo;re on East Hastings Street in the Hastings-Sunrise
                neighbourhood, just a short drive from downtown Vancouver,
                Burnaby, and the PNE.
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <MapEmbed aspect="wide" />
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange-500">
                  Address
                </h3>
                <address className="mt-3 not-italic text-brand-navy-800">
                  {siteConfig.address.streetAddress}
                  <br />
                  {siteConfig.address.addressLocality},{" "}
                  {siteConfig.address.addressRegion}{" "}
                  {siteConfig.address.postalCode}
                  <br />
                  <span className="text-ink-soft">
                    {siteConfig.address.neighbourhood}
                  </span>
                </address>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-brand-navy-200 bg-cream px-4 py-2 text-brand-navy-800 transition-colors hover:bg-cream-strong"
                  >
                    Get directions
                  </a>
                  <a
                    href={siteConfig.social.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-brand-navy-200 bg-cream px-4 py-2 text-brand-navy-800 transition-colors hover:bg-cream-strong"
                  >
                    Read Google reviews
                  </a>
                </div>

                <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange-500">
                  Hours
                </h3>
                <dl className="mt-3 space-y-1 text-brand-navy-800">
                  {hoursDisplay.map((row) => (
                    <div
                      key={row.day}
                      className="flex justify-between gap-6 border-b border-dashed border-cream-strong py-1.5 last:border-0"
                    >
                      <dt className="font-medium">{row.day}</dt>
                      <dd className="text-ink-soft">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* === Reviews / Trust ================================================= */}
        <section className="border-t border-cream-strong px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
              What guests are saying
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy-800 sm:text-4xl">
              Rated {siteConfig.rating.value}/5 on Google
            </h2>
            <p className="mt-4 text-ink-soft">
              Based on {siteConfig.rating.count}+ reviews from diners across
              Vancouver. Read what our community has to say and leave your own
              review after your visit.
            </p>
            <div className="mt-8">
              <a
                href={siteConfig.social.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButton}
              >
                Read all Google reviews →
              </a>
            </div>
          </div>
        </section>

        {/* === FAQ ============================================================= */}
        <section className="border-t border-cream-strong bg-cream-soft px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-500">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy-800 sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <dl className="mt-10 divide-y divide-cream-strong">
              {homepageFaqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="font-display text-lg font-semibold text-brand-navy-800">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-ink-soft">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* === Final CTA ======================================================= */}
        <section className="border-t border-cream-strong bg-brand-navy-800 px-6 py-20 text-cream">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange-300">
              Come share a meal
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Come share a Turkish meal with us
            </h2>
            <p className="mt-4 text-cream/80">
              Whether it&rsquo;s a quick lunch, a Friday dinner, or a catered
              event, we&rsquo;d love to host you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/reservations" className={accentButton}>
                Book a Table
              </Link>
              <Link
                href="/catering"
                className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-6 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Plan Catering
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-6 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
