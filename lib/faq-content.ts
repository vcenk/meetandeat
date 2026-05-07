/**
 * Homepage FAQ content. Two SEO rules to remember when editing:
 *
 *   1. The FAQ JSON-LD MUST mirror what's rendered on the page. Don't
 *      ship questions in schema that aren't visible to users — Google
 *      explicitly forbids it and may issue manual actions.
 *   2. Answers should be helpful and ~2-4 sentences. Avoid one-word
 *      answers; they don't satisfy search intent.
 *
 * TODO(client): confirm halal certification, BYOB policy, parking, and
 * private-dining capacity before launch.
 */

export type FaqEntry = { question: string; answer: string };

export const homepageFaqs: FaqEntry[] = [
  {
    question: "Where is Meet and Eat located in Vancouver?",
    answer:
      "Meet and Eat is on East Hastings Street in the Hastings-Sunrise neighbourhood of East Vancouver, at 3663 East Hastings Street. We're a short drive from Burnaby, the PNE, and downtown, with street parking available nearby.",
  },
  {
    question: "Is the meat at Meet and Eat halal?",
    answer:
      "Yes — Meet and Eat is 100% halal. Every meat dish on the menu, from charcoal kebabs to wraps and traditional casseroles, is prepared with halal-certified meat. If you have specific dietary questions, please call us at (604) 844-5040 before your visit.",
  },
  {
    question: "Do you offer vegetarian and vegan options?",
    answer:
      "Yes. Several mezes, salads, and vegetable-based mains are vegetarian, and a number of dishes can be prepared vegan on request. Our staff can guide you through the menu when you arrive.",
  },
  {
    question: "Do you take reservations?",
    answer:
      "Yes — reservations are recommended on Friday and Saturday evenings and for groups of six or more. You can book online from the Reservations page or call (604) 844-5040.",
  },
  {
    question: "Can I order takeout or delivery?",
    answer:
      "Takeout is available directly through us by phone. Delivery is offered through Uber Eats, DoorDash, and SkipTheDishes across East Vancouver, Burnaby, and surrounding neighbourhoods.",
  },
  {
    question: "Do you offer catering for events in Vancouver?",
    answer:
      "Yes. We cater corporate lunches, weddings, and private events across Metro Vancouver with custom Turkish menus. Visit the Catering page or call us to request a quote and available dates.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We're open Monday, Wednesday, Thursday, and Sunday from 11:30 AM to 10:00 PM. Tuesday is dinner only, 5:00 PM to 10:00 PM. Friday hours run until 10:30 PM, and Saturday until 11:00 PM.",
  },
];
