/**
 * Catering page content. Adjust copy with the client; structure stays.
 *
 * TODO(client): confirm minimum order, notice required, delivery radius,
 * setup/cleanup options, and tax/gratuity policy before launch.
 */

export type CateringService = {
  slug: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const cateringServices: CateringService[] = [
  {
    slug: "corporate",
    name: "Corporate Catering",
    description:
      "Office lunches, client meetings, and team celebrations across Vancouver and Burnaby. Halal kebab boxes, meze platters, fresh salads.",
    imageSrc: "/images/photo-server.jpg",
    imageAlt:
      "A server presenting a Turkish dish at Meet and Eat — professional service appropriate for corporate catering",
  },
  {
    slug: "birthdays",
    name: "Birthdays",
    description:
      "Family-style platters and Turkish dessert spreads. From an intimate dinner at home to a 50-guest celebration.",
    imageSrc: "/images/photo-group-dining.jpg",
    imageAlt:
      "A group of friends celebrating around a table full of Turkish dishes including kebabs, mezes, and salads",
  },
  {
    slug: "weddings",
    name: "Weddings",
    description:
      "Custom Turkish wedding menus — charcoal kebab stations, mezes, stone-oven pides, and traditional sweets for your guests.",
    imageSrc: "/images/menu/Kebabs/Mixed Kebab For Family 4.png",
    imageAlt:
      "A grand family-size mixed kebab platter for wedding catering — Adana, lamb shish, chicken shish, beef doner, kofte, and wings over rice",
  },
  {
    slug: "events",
    name: "Private Events",
    description:
      "Anniversaries, graduations, religious holidays, and private parties. Halal end-to-end with adjustable menus and portions.",
    imageSrc: "/images/menu/Appetizer/Mix Mezze.jpg",
    imageAlt:
      "A Turkish mezze spread for private events — ezme, eggplant puree, cacik, and hummus across five small plates",
  },
];

export type CateringPackage = {
  slug: string;
  name: string;
  /** Short description / fit for the event size. */
  description: string;
  /** Bottom-of-card pill text — descriptive label or badge. */
  tagline: string;
  /** Highlights the middle "most popular" card with a different surface. */
  highlight?: boolean;
  /** Bullet list of what's included. */
  includes: string[];
};

export const cateringPackages: CateringPackage[] = [
  {
    slug: "meze-bites",
    name: "Meze & Bites",
    description:
      "Perfect for receptions and light gatherings (10–60 ppl).",
    tagline: "Cold & hot appetizers",
    includes: [
      "Hummus, Ezme, Haydari, Eggplant salad",
      "Sigara böreği, mini lahmacun",
      "Fresh pita & seasonal crudités",
    ],
  },
  {
    slug: "grill-classics",
    name: "Grill Classics",
    description: "Heartier platters for lunch or dinner (15–120 ppl).",
    tagline: "Most Popular",
    highlight: true,
    includes: [
      "Adana, Chicken shish, Köfte selection",
      "Rice pilaf, grilled veggies, salads",
      "Yogurt & sauces",
    ],
  },
  {
    slug: "feast-sweets",
    name: "Feast & Sweets",
    description: "Full-course menu with dessert.",
    tagline: "Dessert included",
    includes: [
      "Appetizers + Grill mains",
      "Iskender or Lamb options",
      "Sütlaç or Baklava",
    ],
  },
];

export const cateringFaqs = [
  {
    question: "How much notice do you need for catering?",
    answer:
      "We recommend at least 48 hours for orders under 20 guests, and 5–7 days for weddings or events with custom menus. For very last-minute requests, call us at (604) 844-5040 — we'll do what we can.",
  },
  {
    question: "Is everything halal?",
    answer:
      "Yes. Meet and Eat is 100% halal across the entire kitchen — every meat dish we cater is prepared with halal-certified meat, no exceptions.",
  },
  {
    question: "Do you deliver?",
    answer:
      "We deliver across East Vancouver, Burnaby, and the Tri-Cities. For weddings and larger events outside this area, contact us directly to discuss logistics and any delivery fees.",
  },
  {
    question: "Can the menu be customized?",
    answer:
      "Absolutely. We can build custom Turkish menus around dietary needs (vegetarian, vegan options), guest count, and budget. Tell us about your event and we'll send a tailored proposal.",
  },
  {
    question: "Is there a minimum order?",
    answer:
      "No formal minimum, but the family-style platters are designed for 2 or more guests. For corporate orders we typically start at 8 guests for the most efficient pricing.",
  },
];
