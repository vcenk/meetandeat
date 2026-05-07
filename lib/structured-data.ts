/**
 * Schema.org JSON-LD generators for rich results in Google.
 *
 * What each schema unlocks:
 *   - Restaurant: name, hours, address, phone in the SERP knowledge panel
 *   - LocalBusiness (parent): "near me" local pack eligibility
 *   - Menu / MenuItem: menu carousel in mobile search
 *   - BreadcrumbList: breadcrumb trail under page title
 *   - WebSite + SearchAction: sitelinks search box
 *
 * Validate output with: https://search.google.com/test/rich-results
 */

import { siteConfig } from "./site-config";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const dayCodes: Record<Day, string> = {
  Monday: "Mo",
  Tuesday: "Tu",
  Wednesday: "We",
  Thursday: "Th",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "Su",
};

function openingHoursSpecification() {
  return siteConfig.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days.map((d) => `https://schema.org/${d}`),
    opens: slot.opens,
    closes: slot.closes,
  }));
}

/**
 * Compact `openingHours` strings (e.g. "Mo-Th 11:30-22:00") for the legacy
 * format Google still reads alongside the modern OpeningHoursSpecification.
 */
function openingHoursCompact() {
  return siteConfig.openingHours.map((slot) => {
    const codes = slot.days.map((d) => dayCodes[d as Day]).join(",");
    return `${codes} ${slot.opens}-${slot.closes}`;
  });
}

export function restaurantSchema() {
  const sameAs = [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.googleBusinessUrl,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: [`${siteConfig.url}/opengraph-image`],
    logo: `${siteConfig.url}/icon.png`,
    priceRange: siteConfig.priceRange,
    servesCuisine: [...siteConfig.cuisine],
    acceptsReservations: siteConfig.acceptsReservations,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.social.googleBusinessUrl || undefined,
    openingHoursSpecification: openingHoursSpecification(),
    openingHours: openingHoursCompact(),
    menu: `${siteConfig.url}/menu`,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    paymentAccepted: "Cash, Credit Card, Debit Card",
    currenciesAccepted: "CAD",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: { "@id": `${siteConfig.url}/#restaurant` },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ].filter(Boolean),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * MenuItem schema — used on the /menu page once Sanity is wired up.
 * Accepts a single item; render an array of these (one <script> each, or
 * one Menu schema with `hasMenuSection`/`hasMenuItem` nested children).
 */
export function menuItemSchema(input: {
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  image?: string;
  category?: string;
  dietary?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: input.name,
    description: input.description,
    image: input.image,
    offers: input.price
      ? {
          "@type": "Offer",
          price: input.price,
          priceCurrency: input.currency ?? "CAD",
        }
      : undefined,
    suitableForDiet: input.dietary?.map(
      (d) => `https://schema.org/${d}Diet`,
    ),
    menuAddOn: undefined,
  };
}
