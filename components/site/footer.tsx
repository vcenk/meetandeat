import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { instagramPosts } from "@/lib/instagram-posts";
import { Marquee } from "@/components/motion/marquee";
import { primaryNav } from "./nav-links";

const compactHours: Array<[string, string]> = [
  ["Mon, Wed–Thu, Sun", "11:30 AM – 10 PM"],
  ["Tue", "5 PM – 10 PM"],
  ["Fri", "11:30 AM – 10:30 PM"],
  ["Sat", "11:30 AM – 11 PM"],
];

const ArrowUpRight = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={`h-3.5 w-3.5 ${className}`}
  >
    <path d="M5 11L11 5M11 5H6M11 5V10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-brand-navy-900 text-cream/85">
      {/* === Instagram strip — full-bleed marquee of square food photos. ====== */}
      <div className="border-b border-cream/10 py-6">
        <Marquee duration={55}>
          {instagramPosts.map((post, i) => (
            <a
              key={`${post.postUrl}-${i}`}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square w-44 overflow-hidden rounded-2xl sm:w-56"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(min-width: 640px) 14rem, 11rem"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-brand-navy-900/0 transition-colors duration-300 group-hover:bg-brand-navy-900/30" />
            </a>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {/* === Newsletter row =============================================== */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-cream sm:text-5xl">
              Sign up for updates, offers, and delicious surprises
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange-300">
              Newsletter
            </p>
            {/* TODO(client): wire to Mailchimp / Klaviyo / ConvertKit. For now
                this is a static styled input — submitting goes nowhere. */}
            <form
              action="#"
              method="post"
              className="mt-4 flex items-center gap-2 rounded-full border border-cream/15 bg-brand-navy-800/60 px-2 py-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2 text-base text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange-400 text-brand-navy-900 transition-colors hover:bg-brand-orange-300"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* === Signature wordmark + link columns ============================ */}
        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="block"
            >
              <span className="block font-impact text-[clamp(4rem,14vw,12rem)] uppercase leading-[0.85] tracking-tight text-cream">
                Meet
                <br />
                and Eat
              </span>
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src={siteConfig.brand.logoSrc}
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 rounded-full bg-cream/95 p-1"
              />
              <p className="max-w-xs text-sm text-cream/65">
                {siteConfig.shortDescription} 100% Halal · East Hastings,
                Vancouver.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            {/* Pages */}
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
                Pages
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-cream/85 transition-colors hover:text-brand-orange-300">
                    Home
                  </Link>
                </li>
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/85 transition-colors hover:text-brand-orange-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit */}
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
                Visit
              </h3>
              <address className="mt-5 not-italic text-sm leading-relaxed text-cream/85">
                {siteConfig.address.streetAddress}
                <br />
                {siteConfig.address.addressLocality},{" "}
                {siteConfig.address.addressRegion}{" "}
                {siteConfig.address.postalCode}
              </address>
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-3 inline-block text-sm text-cream/85 transition-colors hover:text-brand-orange-300"
              >
                {siteConfig.phoneDisplay}
              </a>
              <dl className="mt-5 space-y-1.5 text-xs text-cream/65">
                {compactHours.map(([day, hours]) => (
                  <div key={day} className="flex justify-between gap-3">
                    <dt>{day}</dt>
                    <dd className="text-cream/85">{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Follow */}
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
                Follow Us
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {siteConfig.social.instagram && (
                  <li>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-brand-orange-300"
                    >
                      Instagram
                      <ArrowUpRight />
                    </a>
                  </li>
                )}
                {siteConfig.social.googleMapsUrl && (
                  <li>
                    <a
                      href={siteConfig.social.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-brand-orange-300"
                    >
                      Google Reviews
                      <ArrowUpRight />
                    </a>
                  </li>
                )}
                {siteConfig.social.facebook && (
                  <li>
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-brand-orange-300"
                    >
                      Facebook
                      <ArrowUpRight />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* === Copyright bar =================================================== */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-cream/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>
            {siteConfig.address.neighbourhood} · Vancouver, BC · 100% Halal
          </p>
        </div>
      </div>
    </footer>
  );
}
