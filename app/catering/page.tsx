import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  cateringFaqs,
  cateringPackages,
  cateringServices,
} from "@/lib/catering-content";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { RotatingDishCard } from "@/components/site/rotating-dish-card";
import { CateringForm } from "@/components/site/catering-form";
import {
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Turkish Catering in Vancouver — Family Platters & Custom Menus",
  description:
    "Halal Turkish catering for corporate lunches, weddings, and private events in Vancouver. Charcoal kebab platters, mezes, and stone-oven pides from $35.",
  alternates: { canonical: "/catering" },
  openGraph: {
    title: "Turkish Catering in Vancouver | Meet and Eat",
    description:
      "Halal Turkish catering for corporate, weddings, birthdays, and events. Family kebab platters from $35.",
    url: `${siteConfig.url}/catering`,
  },
};

const Diamond = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden
    className={`inline-block h-1.5 w-1.5 rotate-45 bg-brand-orange-400 ${className}`}
  />
);

const cateringMarqueeWords = [
  "100% Halal",
  "Family Platters",
  "Charcoal Kebabs",
  "Stone-Oven Pides",
  "Mezes & Salads",
  "Custom Wedding Menus",
];

export default function CateringPage() {
  const pageUrl = `${siteConfig.url}/catering`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Catering", url: "/catering" },
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: "Turkish Catering in Vancouver",
            description:
              "Halal Turkish catering — family platters, mezes, pides, and custom event menus across Metro Vancouver.",
            breadcrumb,
          }),
          breadcrumb,
          faqPageSchema(cateringFaqs),
        ]}
      />

      <main className="flex flex-1 flex-col">
        {/* === Hero (dark, full-bleed) ========================================= */}
        <section className="relative isolate overflow-hidden bg-brand-navy-900 text-cream">
          {/* Background image — Turkish food spread on dark wood */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src="/images/photo-hero-table.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900/90 via-brand-navy-900/55 to-brand-navy-900/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/40 via-transparent to-brand-navy-900/35" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-32 pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-32">
            <div className="lg:col-span-7">
              <Reveal from="up" delay={0.05}>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                  <span>01 · Catering</span>
                  <Diamond />
                  <span>Vancouver · Burnaby · Tri-Cities</span>
                </div>
              </Reveal>
              <Reveal from="up" delay={0.15}>
                <h1
                  className="mt-8 font-impact text-[clamp(3rem,8.5vw,7.5rem)] uppercase leading-[0.92] tracking-[-0.01em] text-cream"
                >
                  Turkish Catering
                  <br />
                  <span className="text-brand-orange-300">that brings</span>
                  <br />
                  the feast.
                </h1>
              </Reveal>
              <Reveal from="up" delay={0.3}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
                  Charcoal kebab platters, fresh-baked pides, and meze
                  spreads — 100% halal, hand-prepared, delivered or set up at
                  your event. From office lunches to wedding receptions.
                </p>
              </Reveal>
              <Reveal from="up" delay={0.45}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="#quote"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-medium text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/40"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    href="#packages"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                  >
                    View Packages
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
              {cateringMarqueeWords.map((word) => (
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
            {[
              { value: "100%", label: "Halal", body: "Across every meat dish, no exceptions." },
              { value: "48h", label: "Notice", body: "Minimum lead time for most orders." },
              { value: "$35+", label: "Per platter", body: "Family-style pricing scales with your guest count." },
            ].map((stat, i) => (
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

        {/* === Services (Dinevo-style) ========================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                02 · What we cater
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-6xl">
                We also offer unique{" "}
                <span className="italic font-normal text-brand-orange-500">
                  services
                </span>{" "}
                for your events.
              </h2>
            </Reveal>

            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cateringServices.map((service, i) => (
                <li key={service.slug}>
                  <Reveal from="up" delay={i * 0.08}>
                    <div className="group h-full">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream">
                        <Image
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-brand-navy-800">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* === Packages ======================================================== */}
        <section
          id="packages"
          className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  03 · Packages
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-impact text-4xl uppercase leading-[1.05] tracking-tight text-brand-navy-900 sm:text-6xl">
                  Choose a set, or we&rsquo;ll
                  <br />
                  <span className="text-brand-orange-500">customize</span> for your event.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mx-auto mt-6 max-w-2xl text-ink-soft">
                  Three starting points, sized by event. Need something
                  bigger or different? Custom menus available — just ask.
                </p>
              </Reveal>
            </div>

            <ul className="mt-16 grid gap-6 lg:grid-cols-3">
              {cateringPackages.map((pkg, i) => (
                <li key={pkg.slug}>
                  <Reveal from="up" delay={i * 0.08}>
                    <div
                      className={`flex h-full flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                        pkg.highlight
                          ? "border-brand-orange-300 bg-brand-orange-50 hover:shadow-brand-orange-400/30"
                          : "border-brand-navy-100 bg-cream hover:shadow-brand-navy-900/10"
                      }`}
                    >
                      <h3 className="font-impact text-3xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:text-4xl">
                        {pkg.name}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                        {pkg.description}
                      </p>
                      <ul className="mt-6 space-y-2.5 text-sm text-brand-navy-800">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-400"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 pt-2">
                        <span
                          className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold ${
                            pkg.highlight
                              ? "bg-brand-orange-400 text-brand-navy-900"
                              : "bg-brand-navy-800 text-cream"
                          }`}
                        >
                          {pkg.tagline}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <p className="mt-12 text-center text-sm text-ink-soft">
                Looking for a wedding or larger event?{" "}
                <Link
                  href="#quote"
                  className="font-medium text-brand-navy-800 underline underline-offset-4 hover:text-brand-orange-500"
                >
                  Tell us about it
                </Link>{" "}
                and we&rsquo;ll send a custom proposal.
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Process ========================================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                04 · How it works
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                Three steps from{" "}
                <span className="italic font-normal text-brand-orange-500">
                  inquiry
                </span>{" "}
                to served.
              </h2>
            </Reveal>
            <ol className="mt-16 grid gap-10 lg:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Tell us about your event",
                  body: "Date, guest count, venue, dietary needs. Two minutes is enough — we&rsquo;ll follow up with questions.",
                },
                {
                  n: "02",
                  title: "We design the menu",
                  body: "A tailored proposal with a fixed quote — no surprise charges. Sample tastings available for weddings.",
                },
                {
                  n: "03",
                  title: "We deliver and set up",
                  body: "Charcoal grills are fired the same day. Hot dishes arrive in insulated trays; cold mezes ready to plate.",
                },
              ].map((step, i) => (
                <li key={step.n}>
                  <Reveal from="up" delay={i * 0.1}>
                    <div className="flex flex-col">
                      <span className="font-impact text-7xl text-brand-orange-400">
                        {step.n}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-brand-navy-800">
                        {step.title}
                      </h3>
                      <p
                        className="mt-3 text-ink-soft"
                        // step text contains an HTML entity; render literally
                        dangerouslySetInnerHTML={{ __html: step.body }}
                      />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* === Quote form ====================================================== */}
        <section
          id="quote"
          className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                05 · Request a quote
              </p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                Tell us about your{" "}
                <span className="italic font-normal text-brand-orange-500">
                  event.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-ink-soft">
                We&rsquo;ll send a custom proposal within one business day.
                Prefer to talk? Call{" "}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-medium text-brand-navy-800 underline underline-offset-4 hover:text-brand-orange-500"
                >
                  {siteConfig.phoneDisplay}
                </a>
                .
              </p>
            </Reveal>
            <Reveal from="up" delay={0.15} className="lg:col-span-7">
              <CateringForm />
            </Reveal>
          </div>
        </section>

        {/* === FAQ ============================================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  06 · Catering questions
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                  Things people ask{" "}
                  <span className="italic font-normal text-brand-orange-500">
                    when planning.
                  </span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <FaqAccordion items={cateringFaqs} className="mt-14" />
            </Reveal>
          </div>
        </section>

        {/* === Final CTA ======================================================= */}
        <section className="bg-brand-navy-800 px-6 py-24 text-cream">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Ready to plan a meal{" "}
                <span className="italic text-brand-orange-300">
                  worth gathering for?
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#quote"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-medium text-brand-navy-900 transition-colors hover:bg-brand-orange-300"
                >
                  Request a Quote
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
