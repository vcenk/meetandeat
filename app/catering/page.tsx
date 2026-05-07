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
          {/* Background image — kebab menu image, heavily darkened */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src="/images/menu-kebabs.png"
              alt=""
              fill
              priority
              className="object-cover opacity-25 [filter:contrast(1.15)_brightness(0.55)]"
              sizes="100vw"
            />
            {/* Navy overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-900/95 via-brand-navy-900/85 to-brand-navy-800/75" />
            {/* Warm orange bokeh accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(245,160,43,0.30),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(245,160,43,0.18),transparent_45%)]" />
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
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-brand-navy-800 sm:text-5xl">
                  Family-style platters,{" "}
                  <span className="italic font-normal text-brand-orange-500">
                    priced transparently.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mx-auto mt-6 max-w-2xl text-ink-soft">
                  Built around our most-loved kebab platters. Need something
                  bigger or different? Custom menus available for weddings and
                  large events.
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
                      {pkg.highlight && (
                        <p className="mb-4 inline-block w-fit rounded-full bg-brand-orange-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy-900">
                          Most popular
                        </p>
                      )}
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange-500">
                        {pkg.servings}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-brand-navy-800">
                        {pkg.name}
                      </h3>
                      <p className="mt-4 font-display text-5xl font-semibold text-brand-navy-800">
                        ${pkg.price}
                      </p>
                      <ul className="mt-6 space-y-2 text-sm text-ink-soft">
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
                      <Link
                        href="#quote"
                        className={`mt-auto inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${
                          pkg.highlight
                            ? "bg-brand-navy-800 text-cream hover:bg-brand-navy-700"
                            : "border border-brand-navy-200 text-brand-navy-800 hover:bg-cream-soft"
                        } pt-3`}
                      >
                        Request this package
                      </Link>
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
              <form
                action={`mailto:${siteConfig.email}`}
                method="post"
                encType="text/plain"
                className="rounded-3xl border border-brand-navy-100 bg-cream-soft p-6 sm:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldText label="Your name" name="name" required />
                  <FieldText label="Email" name="email" type="email" required />
                  <FieldText label="Phone" name="phone" type="tel" />
                  <FieldText label="Event date" name="date" type="date" />
                  <FieldSelect
                    label="Event type"
                    name="event_type"
                    options={[
                      "Corporate / office",
                      "Birthday",
                      "Wedding",
                      "Engagement / shower",
                      "Religious holiday",
                      "Other private event",
                    ]}
                  />
                  <FieldText label="Guest count" name="guests" type="number" />
                </div>
                <div className="mt-5">
                  <FieldTextarea
                    label="Tell us anything else"
                    name="message"
                    rows={4}
                    placeholder="Venue, dietary needs, time of day, anything we should know."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-navy-800 px-8 text-sm font-medium text-cream transition-colors hover:bg-brand-navy-700"
                >
                  Send request
                </button>
                <p className="mt-4 text-xs text-ink-soft">
                  By sending you agree to be contacted about your event. We
                  don&rsquo;t share your details.
                </p>
              </form>
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

/* ----------------------------------------------------------------------- */

function FieldText({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">
        {label}
        {required && <span className="text-brand-orange-500"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-11 rounded-full border border-brand-navy-100 bg-cream px-4 text-brand-navy-800 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200"
      />
    </label>
  );
}

function FieldSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">{label}</span>
      <select
        name={name}
        className="h-11 rounded-full border border-brand-navy-100 bg-cream px-4 text-brand-navy-800 outline-none transition-colors focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200"
        defaultValue=""
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  rows,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-brand-navy-800">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="rounded-3xl border border-brand-navy-100 bg-cream px-4 py-3 text-brand-navy-800 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-200"
      />
    </label>
  );
}
