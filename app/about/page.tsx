import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

const description =
  "From İstanbul's bustling streets to Vancouver's cozy neighborhoods — we bring the soul of Türkiye to your table with halal ingredients, time-honored techniques, and heartfelt hospitality.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Meet and Eat",
    description,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const pageUrl = `${siteConfig.url}/about`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: "About | Meet and Eat",
            description,
            breadcrumb,
          }),
          breadcrumb,
        ]}
      />

      <main className="flex flex-1 flex-col bg-cream">
        {/* === Hero — Our Story ============================================ */}
        <section className="relative isolate overflow-hidden border-b border-cream-strong bg-cream px-6 py-24 sm:py-36">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                About Us
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-impact text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.92] tracking-tight text-brand-navy-900">
                Our <span className="text-brand-orange-500">Story.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                From İstanbul&rsquo;s bustling streets to Vancouver&rsquo;s
                cozy neighborhoods — we bring the soul of Türkiye to your
                table with halal ingredients, time-honored techniques, and
                heartfelt hospitality.
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Our Journey ================================================= */}
        <section className="border-b border-cream-strong bg-cream-soft px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                01 / Journey
              </p>
              <h2 className="mt-4 font-impact text-4xl uppercase leading-[0.95] tracking-tight text-brand-navy-900 sm:text-6xl">
                Our
                <br />
                Journey
              </h2>
            </Reveal>
            <Reveal from="up" delay={0.15} className="lg:col-span-8">
              <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                <p>
                  Our journey, born out of a passion for authentic Turkish
                  cuisine and a commitment to creating unforgettable dining
                  experiences, began in Northern Cyprus in 1994 and extended
                  to Canada in 2015. During our 10 years of Canadian
                  experience, we successfully operated a restaurant in
                  Richmond Hill, Ontario, from 2015 to 2021.
                </p>
                <p>
                  Since the summer of 2021, we have grown on Toronto&rsquo;s
                  famous Yonge and Danforth Streets, becoming a favorite for
                  those seeking a blend of traditional and modern Turkish
                  flavors. Our philosophy is founded on hospitality,
                  community, and the joy of sharing delicious meals with
                  loved ones.
                </p>
                <p>
                  Now, we are excited to bring our distinctive Turkish flavors
                  and unique family recipes to Vancouver. We aim to establish
                  a strong presence by infusing the warmth and richness of our
                  cuisine into your city. Our restaurant&rsquo;s journey is an
                  inspiring narrative of our unwavering commitment to
                  authentic flavors and connection to the community.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* === Mission + Vision ============================================ */}
        <section className="border-b border-cream-strong bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                02 / Mission
              </p>
              <h2 className="mt-4 font-impact text-4xl uppercase leading-[0.95] tracking-tight text-brand-navy-900 sm:text-5xl">
                Our Mission
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                At Meet and Eat, our mission is to provide an authentic
                Turkish dining experience that connects people through
                exceptional food and genuine hospitality. We embrace
                innovation to transform every meal into a memorable
                celebration while honoring the rich traditions of Turkish
                cuisine.
              </p>
            </Reveal>
            <Reveal delay={0.15} from="up">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                03 / Vision
              </p>
              <h2 className="mt-4 font-impact text-4xl uppercase leading-[0.95] tracking-tight text-brand-navy-900 sm:text-5xl">
                Our Vision
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                We aspire to become Canada&rsquo;s leading destination for
                Turkish cuisine, renowned for our outstanding food and
                welcoming atmosphere. We envision a place where tradition
                meets innovation, where every guest is treated like family,
                and where sustainability and environmental responsibility are
                prioritized in everything we do.
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Sustainability ============================================== */}
        <section className="border-b border-cream-strong bg-butter-soft px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-600">
                04 / Sustainability
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 max-w-3xl font-impact text-4xl uppercase leading-[0.95] tracking-tight text-brand-navy-900 sm:text-6xl">
                Cooking with the
                <br />
                planet in mind.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal from="up" delay={0.15}>
                <h3 className="font-display text-xl font-semibold text-brand-navy-900 sm:text-2xl">
                  Sustainability Policy
                </h3>
                <p className="mt-4 leading-relaxed text-brand-navy-800/80">
                  At Meet and Eat, sustainability is at the heart of our
                  operations. We adopt an approach that respects and protects
                  the environment while creating delicious food, aiming to
                  reduce our carbon footprint and support a healthier planet.
                  Our goal is to produce exceptional cuisine while conserving
                  the environment, thus ensuring that future generations can
                  enjoy the natural resources and culinary traditions we
                  value today.
                </p>
              </Reveal>
              <Reveal from="up" delay={0.25}>
                <h3 className="font-display text-xl font-semibold text-brand-navy-900 sm:text-2xl">
                  Local Ingredients &amp; Environmental Responsibility
                </h3>
                <p className="mt-4 leading-relaxed text-brand-navy-800/80">
                  By sourcing fresh, seasonal ingredients from local
                  suppliers, we reduce food miles and guarantee the highest
                  quality. Remaining committed to sustainability, we minimize
                  plastic use, promote recycling, and implement
                  energy-efficient practices.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* === Meet Chef Mehmet ============================================ */}
        <section className="relative isolate overflow-hidden bg-brand-navy-900 px-6 py-24 text-cream sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal from="up" className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-navy-800 shadow-2xl shadow-brand-navy-900/50">
                <Image
                  src="/images/Chef_Mehmet.png"
                  alt="Chef Mehmet — head chef at Meet and Eat"
                  fill
                  sizes="(min-width: 1024px) 36rem, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.15} className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                05 / Behind the kitchen
              </p>
              <h2 className="mt-4 font-impact text-4xl uppercase leading-[0.95] tracking-tight text-cream sm:text-6xl">
                Meet
                <br />
                <span className="text-brand-orange-300">Chef Mehmet.</span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-cream/80 sm:text-lg">
                <p>
                  Meet Chef Mehmet, the culinary genius and visionary behind
                  our restaurant. With a career dedicated to the fine art of
                  Turkish cuisine, Chef Mehmet has gained extensive
                  experience over many years in the most prestigious
                  institutions across Turkey and the international culinary
                  scene.
                </p>
                <p>
                  Chef Mehmet&rsquo;s deep love for the kitchen translates
                  into a meticulous pursuit of excellence evident in every
                  dish. His expertise blends the rich cultural roots of
                  Turkish cuisine with a modern sensibility. Using only the
                  highest quality ingredients, he ensures every bite is
                  authentic, soulful, and unforgettable.
                </p>
              </div>

              <p className="mt-10 font-display text-2xl italic text-brand-orange-300">
                — Meet &amp; Eat
              </p>
            </Reveal>
          </div>
        </section>

        {/* === Bottom CTA ================================================== */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-500">
                Come say hello
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-impact text-3xl uppercase leading-tight tracking-tight text-brand-navy-900 sm:text-5xl">
                Dinner is ready when you are.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/reservations"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange-400 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy-900 transition-all hover:bg-brand-orange-300 hover:shadow-lg hover:shadow-brand-orange-400/30"
                >
                  Book a Table
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-brand-navy-300 px-7 text-sm font-medium text-brand-navy-800 transition-colors hover:bg-brand-navy-800 hover:text-cream"
                >
                  Explore Menu →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
