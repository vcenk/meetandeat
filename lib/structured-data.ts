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
    siteConfig.social.googleMapsUrl,
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
    logo: `${siteConfig.url}${siteConfig.brand.logoSrc}`,
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
    hasMap: siteConfig.social.googleMapsUrl || undefined,
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
    logo: `${siteConfig.url}${siteConfig.brand.logoSrc}`,
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
 * WebPage schema — describes the current page itself, distinct from the
 * Restaurant entity. Helps Google connect the page to the business and the
 * site (`isPartOf`, `about`).
 */
export function webPageSchema(input: {
  url: string;
  name: string;
  description: string;
  breadcrumb?: ReturnType<typeof breadcrumbSchema>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: siteConfig.locale.replace("_", "-"),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#restaurant` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteConfig.url}/opengraph-image` },
    breadcrumb: input.breadcrumb,
  };
}

/**
 * FAQPage schema. Note: as of Aug 2023 Google restricts FAQ rich results to
 * authoritative government/health domains, so this likely won't surface
 * star-decorated FAQ blocks in SERP. Still worth shipping because:
 *   - Bing and other engines still render it
 *   - LLM crawlers (ChatGPT, Perplexity) use it heavily for entity grounding
 *   - The schema must mirror visible page content (Google policy)
 */
export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Menu schema — wraps an array of MenuItems grouped by category.
 * Render once on /menu, not on the homepage (avoid duplicate-entity ambiguity).
 */
export function menuSchema(input: {
  url: string;
  name?: string;
  sections: Array<{
    name: string;
    items: Array<Parameters<typeof menuItemSchema>[0]>;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${input.url}#menu`,
    name: input.name ?? `${siteConfig.name} Menu`,
    inLanguage: siteConfig.locale.replace("_", "-"),
    hasMenuSection: input.sections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      hasMenuItem: section.items.map((item) => menuItemSchema(item)),
    })),
  };
}

/**
 * MenuItem schema — used on the /menu page once Sanity is wired up.
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
  };
}
