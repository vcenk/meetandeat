import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { primaryNav } from "./nav-links";

const compactHours: Array<[string, string]> = [
  ["Mon, Wed–Thu, Sun", "11:30 AM – 10 PM"],
  ["Tue", "5 PM – 10 PM"],
  ["Fri", "11:30 AM – 10:30 PM"],
  ["Sat", "11:30 AM – 11 PM"],
];

export function Footer() {
  return (
    <footer className="border-t border-brand-navy-700 bg-brand-navy-900 text-cream/85">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src={siteConfig.brand.logoSrc}
              alt={siteConfig.brand.logoAlt}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-cream p-1"
            />
            <span className="font-display text-2xl font-semibold text-cream">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {siteConfig.shortDescription} 100% Halal · Family-run since the
            grill was first lit on East Hastings.
          </p>
        </div>

        {/* Visit */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
            Visit
          </h3>
          <address className="mt-4 not-italic text-sm leading-relaxed text-cream/85">
            {siteConfig.address.streetAddress}
            <br />
            {siteConfig.address.addressLocality},{" "}
            {siteConfig.address.addressRegion}{" "}
            {siteConfig.address.postalCode}
            <br />
            <span className="text-cream/60">
              {siteConfig.address.neighbourhood}
            </span>
          </address>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-4 inline-block text-sm text-cream/85 hover:text-brand-orange-300"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
            Hours
          </h3>
          <dl className="mt-4 space-y-1.5 text-sm text-cream/85">
            {compactHours.map(([day, hours]) => (
              <div key={day} className="flex justify-between gap-4">
                <dt className="text-cream/60">{day}</dt>
                <dd>{hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links + social */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange-300">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
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
          {(siteConfig.social.instagram || siteConfig.social.googleMapsUrl) && (
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 transition-colors hover:text-brand-orange-300"
                >
                  Instagram
                </a>
              )}
              {siteConfig.social.googleMapsUrl && (
                <a
                  href={siteConfig.social.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 transition-colors hover:text-brand-orange-300"
                >
                  Google Reviews
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-brand-navy-700">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-cream/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>{siteConfig.address.neighbourhood} · Vancouver, BC · 100% Halal</p>
        </div>
      </div>
    </footer>
  );
}
