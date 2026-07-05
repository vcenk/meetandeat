import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { MapEmbed } from "@/components/map-embed";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

const description = `Contact Meet and Eat — Halal Turkish restaurant on East Hastings in Vancouver. Call ${siteConfig.phoneDisplay}, email ${siteConfig.email}, or visit us at ${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}. Hours, map, and directions.`;

export const metadata: Metadata = {
  title: "Contact — Visit Meet and Eat on East Hastings, Vancouver",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Visit Meet and Eat on East Hastings, Vancouver",
    description,
    url: `${siteConfig.url}/contact`,
  },
};

const hoursDisplay: Array<{ day: string; hours: string }> = [
  { day: "Monday", hours: "4:00 PM – 10:00 PM" },
  { day: "Tuesday", hours: "4:00 PM – 10:00 PM" },
  { day: "Wednesday", hours: "4:00 PM – 10:00 PM" },
  { day: "Thursday", hours: "4:00 PM – 10:00 PM" },
  { day: "Friday", hours: "4:00 PM – 10:00 PM" },
  { day: "Saturday", hours: "12:00 PM – 10:30 PM" },
  { day: "Sunday", hours: "12:00 PM – 10:00 PM" },
];

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 011-2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
    <path d="M12 22s8-7.6 8-13a8 8 0 10-16 0c0 5.4 8 13 8 13z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="3" />
  </svg>
);

export default function ContactPage() {
  const pageUrl = `${siteConfig.url}/contact`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  const fullAddress = `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: "Contact | Meet and Eat",
            description,
            breadcrumb,
          }),
          breadcrumb,
        ]}
      />

      <main className="flex flex-1 flex-col bg-cream">
        {/* === Hero =========================================================== */}
        <section className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-impact text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.92] tracking-tight text-brand-navy-900">
                Get in <span className="text-brand-orange-500">touch</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Bookings, catering inquiries, feedback, or anything else —
                we&rsquo;d love to hear from you.
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Three big contact cards ======================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3 sm:gap-6">
            {/* Call */}
            <Reveal from="up" delay={0.0}>
              <a
                href={`tel:${siteConfig.phone}`}
                className="group flex h-full flex-col rounded-3xl border border-brand-navy-100 bg-cream p-8 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-500 transition-colors group-hover:bg-brand-orange-400 group-hover:text-brand-navy-900">
                  <PhoneIcon />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                  Call
                </p>
                <p className="mt-3 min-h-[3.75rem] font-impact text-2xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:min-h-[4.75rem] sm:text-3xl">
                  {siteConfig.phoneDisplay}
                </p>
                <p className="mt-3 text-sm text-ink-soft">
                  Fastest for same-day reservations and questions.
                </p>
              </a>
            </Reveal>

            {/* Email */}
            <Reveal from="up" delay={0.08}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex h-full flex-col rounded-3xl border border-brand-navy-100 bg-cream p-8 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-500 transition-colors group-hover:bg-brand-orange-400 group-hover:text-brand-navy-900">
                  <MailIcon />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                  Email
                </p>
                <p className="mt-3 flex min-h-[3.75rem] items-center font-impact text-lg uppercase leading-tight tracking-tight text-brand-navy-900 sm:min-h-[4.75rem] sm:text-xl">
                  {siteConfig.email}
                </p>
                <p className="mt-3 text-sm text-ink-soft">
                  Best for catering quotes, media, and partnerships.
                </p>
              </a>
            </Reveal>

            {/* Visit */}
            <Reveal from="up" delay={0.16}>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-brand-navy-100 bg-cream p-8 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-500 transition-colors group-hover:bg-brand-orange-400 group-hover:text-brand-navy-900">
                  <PinIcon />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                  Visit
                </p>
                <p className="mt-3 min-h-[3.75rem] font-impact text-2xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:min-h-[4.75rem] sm:text-3xl">
                  3663 East
                  <br />
                  Hastings St.
                </p>
                <p className="mt-3 text-sm text-ink-soft">
                  {siteConfig.address.addressLocality},{" "}
                  {siteConfig.address.addressRegion}{" "}
                  {siteConfig.address.postalCode}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-orange-500 transition-colors group-hover:text-brand-orange-600">
                  Get directions →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* === Hours + Map ==================================================== */}
        <section className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                Hours
              </p>
              <h2 className="mt-4 font-impact text-4xl uppercase leading-[0.95] tracking-tight text-brand-navy-900 sm:text-6xl">
                When you can
                <br />
                find us
              </h2>
              <p className="mt-6 text-ink-soft">
                Walk-ins welcome any time, reservations recommended on
                weekend evenings. Last orders 30 minutes before close.
              </p>

              <dl className="mt-10 space-y-1.5 text-brand-navy-800">
                {hoursDisplay.map((row) => (
                  <div
                    key={row.day}
                    className="flex justify-between gap-6 border-b border-dashed border-cream-strong py-2 last:border-0"
                  >
                    <dt className="font-medium">{row.day}</dt>
                    <dd className="text-ink-soft">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal from="right" delay={0.15} className="lg:col-span-7">
              <MapEmbed aspect="square" className="h-full" />
            </Reveal>
          </div>
        </section>

        {/* === Topic shortcuts =============================================== */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  Looking for something specific?
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-impact text-3xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:text-5xl">
                  Quick paths.
                </h2>
              </Reveal>
            </div>

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li>
                <Reveal from="up" delay={0.0}>
                  <Link
                    href="/reservations"
                    className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                      Reservations
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                      Book a table for dine-in
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                      Reserve →
                    </span>
                  </Link>
                </Reveal>
              </li>
              <li>
                <Reveal from="up" delay={0.06}>
                  <Link
                    href="/catering"
                    className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                      Catering
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                      Host an event or large gathering
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                      View packages →
                    </span>
                  </Link>
                </Reveal>
              </li>
              <li>
                <Reveal from="up" delay={0.12}>
                  {siteConfig.ordering.uberEats || siteConfig.ordering.doorDash ? (
                    <a
                      href={
                        siteConfig.ordering.uberEats ||
                        siteConfig.ordering.doorDash
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                        Delivery
                      </p>
                      <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                        Order on Uber Eats &amp; DoorDash
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                        Order →
                      </span>
                    </a>
                  ) : null}
                </Reveal>
              </li>
              <li>
                <Reveal from="up" delay={0.18}>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                      Instagram
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                      Daily specials &amp; behind-the-grill
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                      Follow @meetandeat.ca ↗
                    </span>
                  </a>
                </Reveal>
              </li>
              <li>
                <Reveal from="up" delay={0.24}>
                  <a
                    href={siteConfig.social.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                      Google
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                      Read &amp; leave a review
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                      Open on Google ↗
                    </span>
                  </a>
                </Reveal>
              </li>
              <li>
                <Reveal from="up" delay={0.3}>
                  <Link
                    href="/menu"
                    className="group block h-full rounded-3xl border border-brand-navy-100 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-brand-orange-300 hover:shadow-xl hover:shadow-brand-navy-900/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                      Menu
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy-800">
                      Browse the full menu
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                      Explore →
                    </span>
                  </Link>
                </Reveal>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
