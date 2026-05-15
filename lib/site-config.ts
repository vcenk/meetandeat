/**
 * Single source of truth for restaurant identity, NAP (Name/Address/Phone),
 * geo, hours, and brand metadata. Used by:
 *   - app/layout.tsx (Metadata + JSON-LD)
 *   - app/sitemap.ts
 *   - app/robots.ts
 *   - app/opengraph-image.tsx
 *   - components/* (footer, contact, schema generators)
 *
 * Keep NAP identical to Google Business Profile — inconsistency hurts local SEO.
 *
 * TODO(client): confirm street address, postal code, geo coordinates, social
 * handles, and current opening hours before launch.
 */

const FALLBACK_URL = "https://meetandeat.ca";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_URL;
  try {
    // Validate it parses as a real URL so a malformed env var (e.g. someone
    // pastes `NEXT_PUBLIC_SITE_URL=https://...` as the value) can't crash the
    // build inside `new URL(metadataBase)`.
    return new URL(raw).origin;
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[site-config] NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}". Falling back to ${FALLBACK_URL}.`,
      );
    }
    return FALLBACK_URL;
  }
}

const SITE_URL = resolveSiteUrl();

export const siteConfig = {
  // --- Brand ---
  name: "Meet and Eat",
  legalName: "Meet and Eat Restaurant",
  tagline: "Authentic Turkish Cuisine in Vancouver",
  // Primary search target — drives H1, title format, semantic keyword spread.
  primaryKeyword: "Turkish Restaurant in Vancouver",
  // Title format follows the "Primary Keyword | Secondary - Brand" SEO pattern.
  titleDefault: "Turkish Restaurant in Vancouver | Meet and Eat",
  description:
    "Authentic Turkish restaurant in Vancouver. Handcrafted kebabs, fresh lahmacun, traditional mezes, and Turkish desserts. Dine-in, takeout, and catering on East Hastings.",
  shortDescription: "Authentic Turkish kebabs, mezes, and desserts in Vancouver.",

  // --- Identity / URLs ---
  url: SITE_URL,
  locale: "en_CA",
  defaultLocale: "en",
  // If we add Turkish later: ["en", "tr"]
  locales: ["en"] as const,

  // --- Contact (NAP) ---
  // Verified from meetandeat.ca footer + Google Maps listing (May 2026).
  // Keep IDENTICAL to Google Business Profile to preserve local-pack ranking.
  phone: "+1-604-844-5040",
  phoneDisplay: "(604) 844-5040",
  email: "info@meetandeat.ca", // TODO(client): confirm preferred public email
  address: {
    streetAddress: "3663 East Hastings Street",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    postalCode: "V5K 0H7",
    addressCountry: "CA",
    neighbourhood: "Hastings-Sunrise",
  },
  geo: {
    latitude: 49.2812889,
    longitude: -123.0246416,
  },

  // --- Hours (24h format) ---
  // Verified from meetandeat.ca footer (May 2026). Note Tuesday is dinner only.
  openingHours: [
    { days: ["Monday", "Wednesday", "Thursday", "Sunday"], opens: "11:30", closes: "22:00" },
    { days: ["Tuesday"], opens: "17:00", closes: "22:00" },
    { days: ["Friday"], opens: "11:30", closes: "22:30" },
    { days: ["Saturday"], opens: "11:30", closes: "23:00" },
  ],

  // --- Cuisine / Business attributes ---
  cuisine: ["Turkish", "Mediterranean", "Middle Eastern", "Halal"],
  priceRange: "$$", // 1-4 dollar signs per Google convention
  servesAlcohol: false, // TODO(client): confirm
  acceptsReservations: true,
  hasDelivery: true, // via UberEats / DoorDash
  hasTakeout: true,
  hasDineIn: true,
  isHalal: true, // Per logo — "100% HALAL"

  // --- Brand identity (drives Day 2 Tailwind theme) ---
  // Sourced from the logo: navy primary + orange accent, on cream/white.
  brand: {
    /** Colored / dark logo — use on light surfaces (cream, butter, white). */
    logoSrc: "/images/logo/logo.png",
    /** All-white logo — use on dark surfaces (navy hero, footer). */
    logoLightSrc: "/images/logo/logo-white.png",
    logoAlt: "Meet and Eat — 100% Halal Turkish Restaurant",
    colors: {
      navy: "#0c1f3f",   // logo wordmark color
      orange: "#f5a02b", // logo ring + accents
      cream: "#fdf8f0",  // menu background
      ink: "#171717",
    },
  },

  // --- Social / external profiles ---
  // Used in JSON-LD `sameAs` array — strengthens entity recognition for Google.
  social: {
    instagram: "https://www.instagram.com/meetandeat.ca/",
    instagramHandle: "@meetandeat.ca",
    facebook: "", // TODO(client)
    // Google Maps short link → resolves to the place page with reviews.
    googleMapsUrl: "https://maps.app.goo.gl/nuPHagRGzMc63sTG7",
    // Place feature ID (FID) extracted from the Maps URL: 1s<hex>:<hex>
    googleMapsFid: "0x548671d1ce99d747:0xe7e68dc2ebaa75b8",
    // Decimal CID — equivalent to the FID's second hex value, usable as
    // https://maps.google.com/?cid=<CID> for direct deep-link.
    googleMapsCid: "16710094693892826552",
  },

  // --- Embed URLs (kept here so a single edit updates every embed instance) ---
  embeds: {
    // Iframe `src` for the Google Maps embed (place card with rating + Directions).
    googleMaps:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1301.3655184453603!2d-123.0251342!3d49.2814935!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671d1ce99d747%3A0xe7e68dc2ebaa75b8!2sMeet%20and%20Eat!5e0!3m2!1sen!2sca",
  },

  // --- Third-party ordering links ---
  ordering: {
    uberEats:
      "https://www.ubereats.com/store-browse-uuid/a65bbbe2-3d62-5341-b84e-4ed3ed62ee67?diningMode=DELIVERY",
    // DoorDash-powered order page (white-labelled via order.online — kept
    // from the previous "Istanbul Restaurant" listing at the same address).
    doorDash:
      "https://order.online/store/istanbul-restaurant-vancouver-29193065",
    skipTheDishes: "", // TODO(client)
  },

  // --- Reviews snapshot (optional; only populate if confidence is high) ---
  // Populating aggregateRating in JSON-LD requires the rating to be visible
  // on-page too (Google's policy). Wire this up only when we render reviews.
  rating: {
    value: 4.8,
    count: 506,
    source: "Google",
  },

  // --- Verification tokens (set as env vars, surfaced here for visibility) ---
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  },

  // --- OG / social card defaults ---
  ogImage: {
    width: 1200,
    height: 630,
    alt: "Meet and Eat — Authentic Turkish Cuisine in Vancouver",
  },
} as const;

export type SiteConfig = typeof siteConfig;
