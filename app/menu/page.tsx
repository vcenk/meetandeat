import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import {
  menuSections,
  type MenuItem,
  type DietaryTag,
} from "@/lib/menu-data";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

const description =
  "Explore the full Meet and Eat menu — kebabs, pides, mezes, traditional Turkish dishes, and Turkish desserts. 100% Halal. Prices in CAD.";

export const metadata: Metadata = {
  title: "Menu",
  description,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | Meet and Eat",
    description,
    url: `${siteConfig.url}/menu`,
  },
};

const dietaryLabel: Record<DietaryTag, string> = {
  halal: "Halal",
  vegetarian: "Veg",
  vegan: "Vegan",
  "vegan-on-request": "Vegan*",
  "gluten-free-on-request": "GF*",
  "contains-dairy": "Dairy",
  "contains-nuts": "Nuts",
};

export default function MenuPage() {
  const pageUrl = `${siteConfig.url}/menu`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Menu", url: "/menu" },
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: "Menu | Meet and Eat",
            description,
            breadcrumb,
          }),
          breadcrumb,
        ]}
      />

      <main className="flex flex-1 flex-col bg-cream">
        {/* === Hero band ====================================================== */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                The Menu
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-impact text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.95] tracking-tight text-brand-navy-900">
                Charcoal grills, stone-oven pides,
                <br />
                <span className="text-brand-orange-500">family recipes.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-ink-soft">
                100% Halal across every meat dish. Mezes and traditional mains
                rotate with what&rsquo;s freshest. Prices in CAD.
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Sticky category nav =========================================== */}
        <nav
          aria-label="Menu categories"
          className="sticky top-36 z-30 border-b border-cream-strong bg-cream/95 backdrop-blur-md sm:top-40"
        >
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 sm:gap-3 sm:py-5">
            {menuSections.map((section) => (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                className="shrink-0 rounded-full border border-brand-navy-200 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy-800 transition-colors hover:border-brand-orange-400 hover:bg-brand-orange-50 sm:px-5 sm:py-2.5"
              >
                {section.name}
              </a>
            ))}
          </div>
        </nav>

        {/* === Category sections ============================================= */}
        {menuSections.map((section, sectionIdx) => (
          <section
            key={section.slug}
            id={section.slug}
            className={`scroll-mt-52 border-b border-cream-strong px-6 py-20 sm:scroll-mt-60 sm:py-28 ${
              sectionIdx % 2 === 0 ? "bg-cream" : "bg-cream-soft"
            }`}
          >
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                  {String(sectionIdx + 1).padStart(2, "0")} /{" "}
                  {String(menuSections.length).padStart(2, "0")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-impact text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[0.95] tracking-tight text-brand-navy-900">
                  {section.name}
                </h2>
              </Reveal>
              {section.description && (
                <Reveal delay={0.15}>
                  <p className="mt-4 max-w-xl text-ink-soft">
                    {section.description}
                  </p>
                </Reveal>
              )}

              {/* Items split into rich cards (default) and compact rows
                  (beverages). Compact rows render below the grid as a clean
                  bar-menu-style two-column list.                              */}
              {(() => {
                const cardItems = section.items.filter((i) => !i.compact);
                const compactItems = section.items.filter((i) => i.compact);
                return (
                  <>
                    {cardItems.length > 0 && (
                      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cardItems.map((item, i) => (
                          <li key={item.name}>
                            <Reveal from="up" delay={Math.min(i * 0.04, 0.3)}>
                              <MenuCard item={item} />
                            </Reveal>
                          </li>
                        ))}
                      </ul>
                    )}
                    {compactItems.length > 0 && (
                      <Reveal from="up" delay={0.1}>
                        <div className="mt-16">
                          <h3 className="font-impact text-2xl uppercase tracking-tight text-brand-navy-900 sm:text-3xl">
                            Beverages
                          </h3>
                          <ul className="mt-6 grid gap-x-12 sm:grid-cols-2">
                            {compactItems.map((item) => (
                              <li
                                key={item.name}
                                className="flex items-baseline justify-between gap-4 border-b border-dashed border-cream-strong py-3"
                              >
                                <span className="font-display text-base font-medium text-brand-navy-800">
                                  {item.name}
                                </span>
                                <span className="shrink-0 font-display text-base font-semibold text-brand-orange-500">
                                  ${item.price.toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    )}
                  </>
                );
              })()}
            </div>
          </section>
        ))}

        {/* === Bottom CTA ===================================================== */}
        <section className="bg-brand-navy-900 px-6 py-24 text-cream sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                Hungry?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-impact text-3xl uppercase leading-tight tracking-tight sm:text-5xl">
                Ready when you are.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-cream/75">
                Book a table for dine-in or order delivery through your
                favourite app.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/reservations"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/30"
                >
                  Book a Table
                </Link>
                {siteConfig.ordering.uberEats && (
                  <a
                    href={siteConfig.ordering.uberEats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                  >
                    Uber Eats →
                  </a>
                )}
                {siteConfig.ordering.doorDash && (
                  <a
                    href={siteConfig.ordering.doorDash}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-cream/30 px-7 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                  >
                    DoorDash →
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const hasImage = !!item.image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy-100 bg-cream shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy-900/10">
      {/* Photo or typographic placeholder */}
      <div className="relative aspect-square overflow-hidden">
        {hasImage ? (
          <Image
            src={item.image!}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-butter-soft p-6 text-center">
            <p className="font-impact text-2xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:text-3xl">
              {item.name}
            </p>
          </div>
        )}
        {item.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-brand-orange-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy-900 shadow-md">
            Signature
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight text-brand-navy-800">
            {item.name}
          </h3>
          <p className="shrink-0 font-display text-lg font-semibold text-brand-orange-500">
            ${item.price}
          </p>
        </div>
        {item.altPrice && (
          <p className="mt-1 text-xs text-ink-soft">
            {item.altPrice.label}: ${item.altPrice.price}
          </p>
        )}
        {item.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {item.description}
          </p>
        )}
        {item.dietary && item.dietary.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {item.dietary.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
              >
                {dietaryLabel[tag]}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
