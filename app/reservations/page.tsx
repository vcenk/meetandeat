import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { ScrollVideo } from "@/components/site/scroll-video";
import { ReservationForm } from "@/components/site/reservation-form";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data";

const description =
  "Reserve your table at Meet and Eat — authentic Turkish kebabs, charcoal-grilled mains, and mezes in East Vancouver.";

export const metadata: Metadata = {
  title: "Reservations",
  description,
  alternates: { canonical: "/reservations" },
  openGraph: {
    title: "Reservations | Meet and Eat",
    description,
    url: `${siteConfig.url}/reservations`,
  },
};

const reels = [
  { src: "/videos/adana.mp4", poster: "/images/photo-kebab-platter.jpg", label: "Adana" },
  { src: "/videos/beyti.mp4", poster: "/images/photo-lamb-platter.jpg", label: "Beyti" },
  { src: "/videos/lahmajun.mp4", poster: "/images/photo-pide-board.jpg", label: "Lahmacun" },
];

export default function ReservationsPage() {
  const pageUrl = `${siteConfig.url}/reservations`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Reservations", url: "/reservations" },
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: pageUrl,
            name: "Reservations | Meet and Eat",
            description,
            breadcrumb,
          }),
          breadcrumb,
        ]}
      />

      <main className="flex flex-1 flex-col bg-brand-navy-900 text-cream">
        <div className="grid lg:min-h-screen lg:grid-cols-12">
          {/* === Visual side — vertical video triptych ====================== */}
          <aside className="relative isolate lg:sticky lg:top-0 lg:col-span-6 lg:h-screen lg:self-start">
            <div className="flex h-[55vh] flex-col sm:h-[65vh] lg:h-full">
              {reels.map((reel) => (
                <div
                  key={reel.src}
                  className="relative flex-1 overflow-hidden border-b border-cream/10 last:border-b-0"
                >
                  <ScrollVideo
                    src={reel.src}
                    poster={reel.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <p className="absolute bottom-3 right-4 font-impact text-xs uppercase tracking-[0.3em] text-cream/85 mix-blend-difference">
                    {reel.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Headline overlay — bottom-left, gradient for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-brand-navy-900/95 via-brand-navy-900/55 to-transparent p-8 sm:p-12">
              <Reveal>
                <p className="font-display text-xl italic text-brand-orange-300 sm:text-2xl">
                  Save your seat
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-3 font-impact text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.95] tracking-tight text-cream">
                  Reserve
                  <br />
                  your table.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 max-w-md text-sm text-cream/75 sm:text-base">
                  Charcoal grills, stone-oven pides, family recipes — we&rsquo;ll
                  hold a seat at the table for you.
                </p>
              </Reveal>
            </div>
          </aside>

          {/* === Form side ================================================== */}
          <section className="relative bg-brand-navy-900 px-6 py-20 sm:py-28 lg:col-span-6 lg:px-12 lg:py-32 xl:px-20">
            <div className="mx-auto max-w-xl">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-orange-300">
                  Reservations
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-impact text-3xl uppercase leading-[1.1] tracking-tight text-cream sm:text-5xl">
                  Tell us when
                  <br />
                  you&rsquo;d like to dine.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-cream/65">
                  Walk-ins are always welcome. For groups of 4+ or weekend
                  nights, reserving ahead is recommended.
                </p>
              </Reveal>

              {/* Quick WhatsApp escape hatch — for guests who'd rather chat
                  than fill the form. Uses wa.me deep link with the restaurant's
                  phone digits, opens WhatsApp app on mobile or web on desktop. */}
              <Reveal delay={0.25}>
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    "Hi! I'd like to make a reservation at Meet and Eat.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 px-5 py-3 text-sm font-medium text-cream transition-colors hover:border-brand-orange-300 hover:bg-cream/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-brand-orange-300"
                    aria-hidden
                  >
                    <path d="M20.5 3.5A11.7 11.7 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3zM12 22a10 10 0 01-5-1.4l-.4-.2-3.6.9.9-3.5-.2-.4A10 10 0 1112 22zm5.5-7.5c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0c-.3-.2-1.3-.5-2.5-1.5a9 9 0 01-1.7-2.1c-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4s-1 1-1 2.5 1 2.9 1.2 3.1c.1.2 2 3 4.7 4.2 1.7.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z" />
                  </svg>
                  Quick chat on WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </Reveal>

              <ReservationForm />

              <Reveal delay={0.2}>
                <div className="mt-16 border-t border-cream/10 pt-10">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-300">
                    Large parties &amp; private dining
                  </h3>
                  <p className="mt-4 text-sm text-cream/75">
                    Hosting 12 or more? We accommodate group dinners, family
                    celebrations, and rehearsal-style meals.{" "}
                    <Link
                      href="/catering"
                      className="text-cream underline decoration-brand-orange-300 underline-offset-4 transition-colors hover:text-brand-orange-200"
                    >
                      See catering options →
                    </Link>
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

