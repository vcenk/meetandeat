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

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://meetandeat.ca").replace(/\/$/, "");

export const siteConfig = {
  // --- Brand ---
  name: "Meet and Eat",
  legalName: "Meet and Eat Restaurant",
  tagline: "Authentic Turkish Cuisine in Vancouver",
  description:
    "Authentic Turkish restaurant in Vancouver serving handcrafted kebabs, fresh lahmacun, traditional mezes, and classic Turkish desserts. Dine in, takeout, and catering available.",
  shortDescription: "Authentic Turkish kebabs, mezes, and desserts in Vancouver.",

  // --- Identity / URLs ---
  url: SITE_URL,
  locale: "en_CA",
  defaultLocale: "en",
  // If we add Turkish later: ["en", "tr"]
  locales: ["en"] as const,

  // --- Contact (NAP) ---
  // Keep IDENTICAL to Google Business Profile listing.
  phone: "+1-604-844-5040",
  phoneDisplay: "(604) 844-5040",
  email: "info@meetandeat.ca", // TODO(client): confirm
  address: {
    streetAddress: "TODO: street address", // TODO(client)
    addressLocality: "Vancouver",
    addressRegion: "BC",
    postalCode: "TODO", // TODO(client)
    addressCountry: "CA",
  },
  geo: {
    // TODO(client): replace with exact GPS from Google Business Profile
    latitude: 49.2827,
    longitude: -123.1207,
  },

  // --- Hours (24h format, IANA-style days) ---
  // TODO(client): confirm exact hours per day; current values estimated
  // from existing site footer ("11:30 a.m. to 10:00-11:00 p.m. depending on day").
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"], opens: "11:30", closes: "22:00" },
    { days: ["Friday", "Saturday"], opens: "11:30", closes: "23:00" },
  ],

  // --- Cuisine / Business attributes ---
  cuisine: ["Turkish", "Mediterranean", "Middle Eastern", "Halal"],
  priceRange: "$$", // 1-4 dollar signs per Google convention
  servesAlcohol: false, // TODO(client): confirm
  acceptsReservations: true,
  hasDelivery: true, // via UberEats / DoorDash
  hasTakeout: true,
  hasDineIn: true,

  // --- Social / external profiles ---
  // Used in JSON-LD `sameAs` array — strengthens entity recognition for Google.
  social: {
    instagram: "https://www.instagram.com/meetandeatyvr/", // TODO(client): confirm handle
    facebook: "", // TODO(client)
    googleMapsPlaceId: "", // TODO(client): get from Google Maps URL
    googleBusinessUrl: "", // TODO(client): full URL to GBP
  },

  // --- Third-party ordering links ---
  ordering: {
    uberEats: "", // TODO(client)
    doorDash: "", // TODO(client)
    skipTheDishes: "", // TODO(client)
  },

  // --- Reviews snapshot (optional; only populate if confidence is high) ---
  // Populating aggregateRating in JSON-LD requires the rating to be visible
  // on-page too (Google's policy). Wire this up only when we render reviews.
  rating: {
    value: 4.8,
    count: 172,
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
