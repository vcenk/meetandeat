import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { homepageFaqs } from "@/lib/faq-content";
import { menuSections } from "@/lib/menu-data";
import { cateringServices } from "@/lib/catering-content";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ScrollVideo } from "@/components/site/scroll-video";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { RotatingDishCard } from "@/components/site/rotating-dish-card";
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

const stats = [
  { value: "100%", label: "Halal certified", body: "Across every meat dish on the menu." },
  { value: "60+", label: "Dishes daily", body: "Mezes, kebabs, pides, traditional mains, and Turkish desserts." },
  { value: "4.8", label: "Google rating", body: `From ${siteConfig.rating.count}+ Vancouver diners.` },
];

const marqueeWords = [
  "100% Halal",
  "Charcoal Grilled",
  "Stone-Oven Pides",
  "Family Recipes",
  "Hastings-Sunrise",
  "Dine-in · Takeout · Catering",
];

function priceRange(prices: number[]): string {
  const valid = prices.filter((p) => p > 0);
  if (valid.length === 0) return "";
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  return min === max ? `$${min}` : `$${min} – $${max}`;
}

const Diamond = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden
    className={`inline-block h-1.5 w-1.5 rotate-45 bg-brand-orange-400 ${className}`}
  />
);

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
        {/* === Hero — dark, full-bleed (Dinevo-style) ========================== */}
        <section className="relative isolate overflow-hidden bg-brand-navy-900 text-cream">
          {/* Background image — full-bleed Turkish food spread on dark wood */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src="/images/photo-hero-table.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Vignette gradient for headline legibility on the left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900/90 via-brand-navy-900/55 to-brand-navy-900/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/40 via-transparent to-brand-navy-900/35" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-32 pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-32">
            <div className="lg:col-span-7">
              <Reveal from="up" delay={0.05}>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                  <span>Hastings-Sunrise</span>
                  <Diamond />
                  <span>East Vancouver</span>
                </div>
              </Reveal>
              <Reveal from="up" delay={0.15}>
                <h1 className="mt-8 font-impact text-[clamp(3rem,8.5vw,7.5rem)] uppercase leading-[0.92] tracking-[-0.01em] text-cream">
                  Authentic Turkish
                  <br />
                  <span className="text-brand-orange-300">Restaurant in</span>
                  <br />
                  Vancouver.
                </h1>
              </Reveal>
              <Reveal from="up" delay={0.3}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
                  Family-run kebab house on East Hastings — charcoal grills,
                  stone-oven pides, fresh mezes, and Turkish desserts. 100%
                  halal, hand-prepared, recipes brought from Turkey.
                </p>
              </Reveal>
              <Reveal from="up" delay={0.45}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/menu"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-medium text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/40"
                  >
                    Explore Menu →
                  </Link>
                  <Link
                    href="/reservations"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                  >
                    Book a Table
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal
              from="left"
              delay={0.4}
              className="self-end lg:col-span-5"
            >
              <RotatingDishCard />
            </Reveal>
          </div>

          {/* Marquee ribbon */}
          <div className="border-y border-cream/10 bg-brand-navy-800/70 py-5 backdrop-blur">
            <Marquee duration={45}>
              {marqueeWords.map((word) => (
                <span
                  key={word}
                  className="flex items-center gap-12 font-display text-2xl italic text-cream sm:text-3xl"
                >
                  {word}
                  <Diamond className="!bg-brand-orange-300" />
                </span>
              ))}
            </Marquee>
          </div>
        </section>

        {/* === Stats =========================================================== */}
        <section className="border-b border-cream-strong bg-cream px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} from="up" delay={i * 0.08}>
                <div>
                  <p className="font-display text-7xl font-semibold leading-none text-brand-navy-800">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 max-w-xs text-ink-soft">{stat.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* === About =========================================================== */}
        <section className="relative overflow-hidden border-t-2 border-brand-orange-500 bg-cream px-6 py-32 sm:py-40">
          {/* Floating images — drift on scroll. Hidden on small screens to
              avoid colliding with the centered text. */}
          <ParallaxImage
            shift={70}
            className="pointer-events-none absolute left-[3%] top-[58%] hidden aspect-square w-32 -rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy-900/15 md:block lg:left-[6%] lg:w-44"
          >
            <Image
              src="/images/photo-group-dining.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 11rem, 8rem"
              className="object-cover"
            />
          </ParallaxImage>
          <ParallaxImage
            shift={-70}
            className="pointer-events-none absolute right-[3%] top-[14%] hidden aspect-square w-32 rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy-900/15 md:block lg:right-[6%] lg:w-44"
          >
            <Image
              src="/images/photo-pide-board.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 11rem, 8rem"
              className="object-cover"
            />
          </ParallaxImage>

          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="font-display text-2xl italic text-brand-orange-500 sm:text-3xl">
                The Art of Food
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-impact text-[clamp(1.5rem,3.2vw,2.75rem)] uppercase leading-[1.2] tracking-tight text-brand-navy-900">
                Meet and Eat was born from a love of Turkish hospitality and
                charcoal-grilled flavour. Our chefs blend Anatolian tradition
                with modern care to craft dishes that excite the senses and
                warm the heart. Every ingredient is carefully chosen.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/menu"
                className="mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange-500 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition-all hover:bg-brand-orange-400 hover:shadow-lg hover:shadow-brand-orange-500/30"
              >
                More about us
                <span aria-hidden className="text-base">→</span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* === Menu preview ==================================================== */}
        <section
          id="menu-preview"
          className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Reveal>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                    The Menu
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-6xl">
                    Browse what&rsquo;s on the{" "}
                    <span className="italic font-normal text-brand-orange-500">
                      grill.
                    </span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.15} from="left">
                <Link
                  href="/menu"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-navy-800 px-7 text-sm font-medium text-cream transition-all hover:bg-brand-navy-700 hover:shadow-lg hover:shadow-brand-navy-900/15"
                >
                  Full menu →
                </Link>
              </Reveal>
            </div>

            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {menuSections.map((section, i) => {
                const range = priceRange(section.items.map((s) => s.price));
                return (
                  <li key={section.slug}>
                    <Reveal from="up" delay={i * 0.06}>
                      <Link
                        href={`/menu#${section.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy-100 bg-cream transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy-900/10"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-cream-soft">
                          <Image
                            src={section.imageSrc}
                            alt={section.imageAlt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy-900/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy-800 backdrop-blur">
                            0{i + 1}
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display text-2xl font-semibold leading-tight text-brand-navy-800">
                              {section.name}
                            </h3>
                            {range && (
                              <span className="shrink-0 text-sm font-medium text-brand-orange-500">
                                {range}
                              </span>
                            )}
                          </div>
                          {section.description && (
                            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                              {section.description}
                            </p>
                          )}
                          <div className="mt-auto pt-6">
                            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
                              {section.items.length} dishes
                              <span
                                aria-hidden
                                className="inline-block h-px flex-1 bg-cream-strong group-hover:bg-brand-orange-300"
                              />
                              <span className="text-brand-orange-500 transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* === Order Online strip (yellow butter callout) ====================== */}
        <section className="border-b border-cream-strong bg-butter px-6 py-14 text-brand-navy-900">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <Reveal from="up" className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-600">
                Order Online
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl">
                Delivered straight to your door.
              </h2>
              <p className="mt-3 text-sm text-brand-navy-800/80">
                Same kitchen, same charcoal, same recipes — through your
                favourite delivery app.
              </p>
            </Reveal>
            <Reveal from="left" delay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {siteConfig.ordering.uberEats && (
                  <a
                    href={siteConfig.ordering.uberEats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-navy-900 px-6 text-sm font-semibold text-cream transition-all hover:bg-brand-navy-800 hover:shadow-lg hover:shadow-brand-navy-900/20"
                  >
                    Order on Uber Eats →
                  </a>
                )}
                {siteConfig.ordering.doorDash && (
                  <a
                    href={siteConfig.ordering.doorDash}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-brand-navy-900 bg-transparent px-6 text-sm font-semibold text-brand-navy-900 transition-all hover:bg-brand-navy-900 hover:text-cream"
                  >
                    Order on DoorDash →
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* === Cinematic video — autoplays when scrolled into view ============ */}
        {/* Swap `src` with the IG-reel MP4 once the client exports it from
            their account. /videos/adana.mp4 is the existing placeholder.        */}
        <section className="relative isolate overflow-hidden bg-brand-navy-900">
          <ScrollVideo
            src="/videos/adana.mp4"
            poster="/images/photo-kebab-platter.jpg"
            className="block h-[60vh] w-full object-cover sm:h-[80vh]"
          />
        </section>

        {/* === Catering 4-card section ========================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Reveal>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                    Catering
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                    We also offer unique{" "}
                    <span className="italic font-normal text-brand-orange-500">
                      services
                    </span>{" "}
                    for your events.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.15} from="left">
                <Link
                  href="/catering"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-brand-navy-200 bg-cream px-7 text-sm font-medium text-brand-navy-800 transition-colors hover:bg-cream-strong"
                >
                  Catering details →
                </Link>
              </Reveal>
            </div>

            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cateringServices.map((service, i) => (
                <li key={service.slug}>
                  <Reveal from="up" delay={i * 0.08}>
                    <Link
                      href={`/catering#${service.slug}`}
                      className="group block h-full"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream">
                        <Image
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-brand-navy-800 transition-colors group-hover:text-brand-orange-500">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {service.description}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* === Pull-quote / Reviews ============================================ */}
        <section className="bg-brand-navy-900 px-6 py-28 text-cream sm:py-36">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                Guests are saying
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 font-display text-3xl leading-[1.2] tracking-tight sm:text-5xl">
                &ldquo;The kind of place where the lamb shish is grilled the
                way your{" "}
                <span className="italic text-brand-orange-300">
                  Turkish friend&rsquo;s grandmother
                </span>{" "}
                would have made it. Generous portions, real charcoal flavour,
                halal end-to-end.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 flex items-center justify-center gap-6 text-sm uppercase tracking-[0.3em] text-cream/70">
                <span>{siteConfig.rating.value} / 5</span>
                <Diamond className="!bg-brand-orange-300" />
                <span>{siteConfig.rating.count}+ Google reviews</span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={siteConfig.social.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Read all Google reviews →
              </a>
            </Reveal>
          </div>
        </section>

        {/* === Visit Us ======================================================== */}
        <section
          id="visit"
          className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  Visit
                </p>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                  3663 East Hastings, in the heart of{" "}
                  <span className="italic font-normal text-brand-orange-500">
                    Hastings-Sunrise.
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-ink-soft">
                  A short drive from downtown Vancouver, Burnaby, and the PNE.
                  Street parking nearby. Reservations recommended on weekends.
                </p>

                <div className="mt-10">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
                    Address
                  </h3>
                  <address className="mt-3 not-italic text-brand-navy-800">
                    {siteConfig.address.streetAddress}
                    <br />
                    {siteConfig.address.addressLocality},{" "}
                    {siteConfig.address.addressRegion}{" "}
                    {siteConfig.address.postalCode}
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
                      href={`tel:${siteConfig.phone}`}
                      className="rounded-full border border-brand-navy-200 bg-cream px-4 py-2 text-brand-navy-800 transition-colors hover:bg-cream-strong"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-500">
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
              </Reveal>

              <Reveal from="right" delay={0.15} className="lg:col-span-7">
                <MapEmbed aspect="square" className="h-full" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* === FAQ ============================================================= */}
        <section className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  Questions
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                  Things people ask{" "}
                  <span className="italic font-normal text-brand-orange-500">
                    before visiting.
                  </span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <FaqAccordion items={homepageFaqs} className="mt-14" />
            </Reveal>
          </div>
        </section>

        {/* === Final CTA ======================================================= */}
        <section className="relative overflow-hidden bg-brand-navy-800 text-cream">
          <div className="border-y border-brand-navy-700 py-5">
            <Marquee duration={50} reverse>
              {marqueeWords.map((word) => (
                <span
                  key={word}
                  className="flex items-center gap-12 font-display text-2xl italic sm:text-3xl"
                >
                  {word}
                  <Diamond className="!bg-brand-orange-300" />
                </span>
              ))}
            </Marquee>
          </div>
          <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                See you on{" "}
                <span className="italic text-brand-orange-300">
                  East Hastings.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-cream/80">
                Whether it&rsquo;s a quick lunch, a Friday dinner, or a catered
                event, we&rsquo;d love to host you.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/reservations"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-medium text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/40"
                >
                  Book a Table
                </Link>
                <Link
                  href="/catering"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Plan Catering
                </Link>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
