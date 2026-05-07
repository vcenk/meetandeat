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
    imageSrc: "/images/menu-traditional-wraps.png",
    imageAlt:
      "Traditional Turkish dishes including lamb shank, casseroles, and wraps suitable for corporate catering",
  },
  {
    slug: "birthdays",
    name: "Birthdays",
    description:
      "Family-style platters and Turkish dessert spreads. From an intimate dinner at home to a 50-guest celebration.",
    imageSrc: "/images/menu-desserts-beverages.png",
    imageAlt:
      "Turkish desserts and beverages including kunefe and rice pudding for birthday catering",
  },
  {
    slug: "weddings",
    name: "Weddings",
    description:
      "Custom Turkish wedding menus — charcoal kebab stations, mezes, stone-oven pides, and traditional sweets for your guests.",
    imageSrc: "/images/menu-kebabs.png",
    imageAlt:
      "Selection of charcoal-grilled Turkish kebabs and family platters for wedding catering",
  },
  {
    slug: "events",
    name: "Private Events",
    description:
      "Anniversaries, graduations, religious holidays, and private parties. Halal end-to-end with adjustable menus and portions.",
    imageSrc: "/images/menu-pides.png",
    imageAlt:
      "Stone-oven Turkish pides and flatbreads served at private events",
  },
];

export type CateringPackage = {
  slug: string;
  name: string;
  servings: string;
  price: number;
  highlight?: boolean;
  includes: string[];
};

// Pricing pulled from menu-data.ts (the existing in-restaurant platters).
export const cateringPackages: CateringPackage[] = [
  {
    slug: "individual",
    name: "Mixed Kebab Platter",
    servings: "Serves 1",
    price: 35,
    includes: [
      "Adana, chicken, and lamb shish kebabs",
      "Rice and sour red cabbage salad",
      "Fresh flatbread",
    ],
  },
  {
    slug: "small",
    name: "Mixed Platter for 2–3",
    servings: "Serves 2 to 3",
    price: 55,
    highlight: true,
    includes: [
      "1 lamb shish, 1 chicken shish, 1 Adana, 2 wings, 2 kofte, beef doner",
      "Rice and sour red cabbage salad",
      "2 fresh flatbreads",
    ],
  },
  {
    slug: "family",
    name: "Family Platter for 4–5",
    servings: "Serves 4 to 5",
    price: 85,
    includes: [
      "1 lamb shish, 1 chicken shish, 1 Adana, 2 wings, 4 kofte, beef doner",
      "Rice and sour red cabbage salad",
      "2 fresh flatbreads",
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
