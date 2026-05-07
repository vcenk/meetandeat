# SEO Guide — Meet and Eat (Vancouver Turkish Restaurant)

This is a working reference: each principle is paired with **why it matters**,
**how it applies to a restaurant**, and **where it lives in this codebase**.

The original draft was written for a SaaS product. Where SaaS conventions don't
match local-restaurant SEO, this version says so explicitly.

Status legend: ✅ done · ◐ partial · ☐ todo

---

## 0 · Search intent first

Before any keyword work, define what users actually want when they search the
target term. Every section of the page should serve that intent.

For a Vancouver Turkish restaurant, the dominant intent for
**"Turkish restaurant Vancouver"** is **local + transactional**: users want to
*eat tonight*, *order delivery*, or *book a table*. They do **not** want a
1,500-word essay before the menu.

What this means for the page:
- Menu, hours, address, phone, and CTAs must be reachable from the hero.
- Story/about content supports the intent; it doesn't replace it.
- 4,000-word "ultimate guide" homepages hurt conversion for local restaurants,
  even when they help SaaS landing pages. We're not chasing word count.

---

## 1 · Primary keyword and semantic spread

**Primary keyword:** `Turkish Restaurant in Vancouver`

**Secondary / semantic terms** (use naturally throughout — no stuffing):
authentic Turkish food, halal kebab Vancouver, Adana kebab, lahmacun, mezes,
Turkish catering Vancouver, East Hastings restaurant, Hastings-Sunrise,
charcoal grill, Mediterranean restaurant Vancouver.

> Live in `lib/site-config.ts` → `siteConfig.primaryKeyword`. Used by the
> homepage H1 and metadata.

**Status:** ✅

---

## 2 · Title and description format

**Title** (50–60 chars, keyword first, brand last):
`Turkish Restaurant in Vancouver | Meet and Eat`

**Description** (150–160 chars, opens with keyword, ends with concrete benefit):
`Authentic Turkish restaurant in Vancouver. Handcrafted kebabs, fresh lahmacun, traditional mezes, and Turkish desserts. Dine-in, takeout, and catering on East Hastings.`

Sub-pages use the template `%s | Meet and Eat`, so `/menu` becomes
`Menu | Meet and Eat` and so on.

> Live in `lib/site-config.ts` (`titleDefault`, `description`) and applied via
> Next.js Metadata API in `app/layout.tsx`.

**Status:** ✅

---

## 3 · Heading hierarchy and H1

Rule: **one H1 per page, containing the primary keyword.** Then H2 for major
sections, H3 for subsections.

Homepage outline (current):

| Level | Text |
|---|---|
| H1 | Authentic Turkish Restaurant in Vancouver |
| H2 | Real Turkish cuisine, cooked the traditional way *(About)* |
| H2 | What we cook *(Menu preview)* |
| H3 | Charcoal-Grilled Kebabs / Lahmacun & Pide / Mezes / Desserts |
| H2 | Find Meet and Eat in East Vancouver *(Visit Us)* |
| H2 | Rated 4.8/5 on Google *(Reviews)* |
| H2 | Frequently asked questions |
| H2 | Come share a Turkish meal with us *(Final CTA)* |

> Live in `app/page.tsx`.

**Status:** ✅

---

## 4 · First-100-words rule

The intro paragraph directly under H1 must contain the primary keyword
naturally and explain who, what, where, and why-trust in one short paragraph.

Current intro (in `app/page.tsx`):

> "Meet and Eat is a family-run **Turkish restaurant in Vancouver** serving
> charcoal-grilled kebabs, stone-oven lahmacun, fresh mezes, and traditional
> Turkish desserts on East Hastings. We cook the way we'd cook for our own
> family — halal meats, hand-prepared dough, and recipes brought from Turkey
> to the heart of Hastings-Sunrise."

Hits: who (family-run, recipes from Turkey), what (kebabs/lahmacun/mezes/
desserts), where (East Hastings, Hastings-Sunrise), why-trust (halal,
hand-prepared, family recipes), primary keyword in the first sentence.

**Status:** ✅

---

## 5 · Above-the-fold checklist

Five things must be visible without scrolling on mobile and desktop:

| Element | Implementation |
|---|---|
| Eyebrow context (brand · neighbourhood) | `<p>Meet and Eat · Hastings-Sunrise, Vancouver</p>` |
| Keyword-bearing H1 | `<h1>Authentic Turkish Restaurant in Vancouver</h1>` |
| Short intro with primary keyword | First paragraph |
| Primary CTA + secondary CTAs | "See the Menu" / "Book a Table" / "Call …" |
| Trust signal | "Halal · Dine-in · Takeout · Catering · Reservations recommended" |

**Status:** ✅

---

## 6 · Homepage section structure (restaurant-adapted)

The original guide listed two near-identical SaaS outlines (§10 and §14). For
a local restaurant, the right shape is:

1. Hero (above-the-fold, see §5)
2. About / Story
3. Menu preview
4. Visit Us — address, hours, **map embed**, directions
5. Reviews / trust signal (linked to Google reviews)
6. FAQ
7. Final CTA

Each section is a single H2. We don't pad with sections that don't serve
restaurant intent (no "Pricing", no "How It Works").

**Status:** ✅

---

## 7 · Content quality, length, and E-E-A-T

The original draft set a 4,000–5,000-word target. **We're explicitly
disregarding that for the homepage** — local restaurant SEO is dominated by
Google Business Profile signals and proximity, not word count. A bloated
homepage hurts conversion and Core Web Vitals.

**Our target:** 800–1,500 words of *substantive* content. Every paragraph
either answers a real question, removes a doubt, or reinforces a trust signal.

E-E-A-T (Experience, Expertise, Authority, Trust) for a restaurant comes from
specifics, not adjectives. Concrete > generic:

- ❌ "We are passionate about food."
- ✅ "Recipes our chefs have refined over decades, using halal-certified meats
  and produce from local Vancouver suppliers."

**Status:** ◐ — copy is currently ours, will refine with client during content
review.

---

## 8 · FAQ section

Seven questions on the homepage, drawn from things real diners ask: location,
halal certification, vegetarian options, reservations, delivery, catering,
hours.

**Important caveat on FAQ rich results:** Google restricted FAQ rich results
to authoritative government/health sites in August 2023. We still ship
FAQPage schema because:
- Bing and other engines render it
- LLM crawlers (ChatGPT, Perplexity, Google AI Overviews) use it for
  entity grounding
- Schema must mirror visible page content (Google policy) — both are present

> FAQ content: `lib/faq-content.ts` · schema: `lib/structured-data.ts` →
> `faqPageSchema()` · render + JSON-LD: `app/page.tsx`.

**Status:** ✅

---

## 9 · Schema / JSON-LD

We ship JSON-LD (Google's preferred format). Every emitted schema must mirror
visible page content — no fake reviews, fake hours, or fake offers.

| Schema | Coverage | File |
|---|---|---|
| Restaurant | NAP, hours, geo, cuisine, priceRange, sameAs, hasMap | `lib/structured-data.ts` → `restaurantSchema()` |
| WebSite | site identity, search publisher | `websiteSchema()` |
| Organization | legal entity, social profiles | `organizationSchema()` |
| WebPage | per-page entity, ties to Restaurant + WebSite | `webPageSchema()` |
| BreadcrumbList | breadcrumb trail | `breadcrumbSchema()` |
| FAQPage | homepage FAQs (mirrors visible content) | `faqPageSchema()` |
| Menu / MenuItem | for `/menu` page once Sanity is wired | `menuSchema()` / `menuItemSchema()` |

**AggregateRating:** *not* in JSON-LD yet. Google requires the rating to be
visibly rendered on the same page — we link out to Google reviews instead of
re-publishing the aggregate. We can add it once we render rating prominently
on-page with a clear data source.

> Validate at https://search.google.com/test/rich-results after each deploy.

**Status:** ✅

---

## 10 · Internal linking

The homepage links into every supporting page so crawlers (and humans) can
reach the rest of the site without scrolling through it. Current links from
the homepage: `/menu`, `/reservations`, `/catering`, `/contact`, plus
`tel:` and external Google Maps / directions URLs.

To add at Day 4 once header/footer components exist: a sticky header with
nav, a footer with full sitemap, and breadcrumbs on subpages.

**Status:** ◐ — homepage internal links done; site-wide nav/footer pending.

---

## 11 · Image SEO

Each image needs:

- Descriptive **filename** (kebab-case, lowercase) — `adana-kebab.jpg`, not
  `menu1.png`
- Specific **alt text** describing what's in the image *and* why it's there
- Proper dimensions and modern format (WebP/AVIF) — `next/image` handles this
- Lazy loading for below-the-fold images — `next/image` default

**Action item:** rename `public/Images/` to `public/images/` (lowercase) and
rename `menu1–5.png` to descriptive filenames once we identify each dish.

**Status:** ◐ — alt text done in current homepage; filenames + folder rename
pending client identification of each photo.

---

## 12 · Technical SEO checklist

| Item | Implementation | Status |
|---|---|---|
| Indexability (no accidental noindex) | `robots` in `app/layout.tsx` | ✅ |
| Canonical URL | `alternates.canonical` in metadata | ✅ |
| `robots.txt` | `app/robots.ts` | ✅ |
| `sitemap.xml` | `app/sitemap.ts` | ✅ |
| Mobile responsive | Tailwind v4, mobile-first | ✅ |
| Page speed / Core Web Vitals | Next.js + static prerender | ◐ — measure post-deploy |
| 404 returns 404 + helpful links | `app/not-found.tsx` | ✅ |
| Heading hierarchy | One H1 + structured H2/H3 | ✅ |
| Search Console verification | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env | ☐ — set after deploy |
| OG image | `app/opengraph-image.tsx` | ✅ |

---

## 13 · Local SEO (the part SaaS guides skip)

For a local restaurant, this section is more important than half of the rest
of this doc combined.

| Signal | Action |
|---|---|
| **NAP consistency** | Name/Address/Phone in `lib/site-config.ts` must exactly match Google Business Profile, Yelp, OpenTable, UberEats, etc. Any character mismatch (hyphen vs. period) weakens local-pack ranking. |
| **Google Business Profile** | Claim & verify the listing. Post 3–4 updates per month. Upload current dish photos. Respond to every review (even 5-stars). |
| **Reviews** | We currently link to Google reviews via the short URL `https://maps.app.goo.gl/nuPHagRGzMc63sTG7`. Encourage post-meal review prompts (table card / receipt note). |
| **Citations** | List the restaurant on Yelp, TripAdvisor, OpenTable, Zomato, BlogTO Vancouver, Vancouver Magazine. Use identical NAP. |
| **Geo metadata** | Lat/lng in `restaurantSchema().geo` matches the GBP pin. |
| **Neighbourhood keywords** | "Hastings-Sunrise" and "East Vancouver" appear naturally in copy — captures hyper-local searches. |

**Status:** ◐ — schema-side done; off-site citations + GBP work is client-side
and continues post-launch.

---

## 14 · Pre-launch SEO checklist

Run through this **after** content is finalized but **before** flipping DNS:

1. ☐ Replace placeholder copy with client-approved text
2. ☐ Rename `public/Images/` → `public/images/` and rename each photo
3. ☐ Confirm address, hours, phone exactly match Google Business Profile
4. ☐ Set `NEXT_PUBLIC_SITE_URL=https://meetandeat.ca` in production env
5. ☐ Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from Search Console
6. ☐ Run Lighthouse on production URL — target ≥95 on SEO and Performance
7. ☐ Validate JSON-LD at https://search.google.com/test/rich-results
8. ☐ Submit `https://meetandeat.ca/sitemap.xml` to Search Console
9. ☐ Request indexing for `/`, `/menu`, `/catering`
10. ☐ Verify NAP exact-match across Google Business Profile, Yelp,
    OpenTable, UberEats, DoorDash, SkipTheDishes
11. ☐ Set up monthly Search Console + GBP review cadence

---

## 15 · What we are deliberately *not* doing

- **No 4,000-word homepage.** SaaS landing-page convention; wrong fit for a
  local restaurant. (See §0 and §7.)
- **No fake reviews or AggregateRating not backed by visible page content.**
  Google manual-action territory.
- **No FAQPage schema for marketing-fluff questions.** Schema must mirror
  visible content; questions must be ones real users ask.
- **No keyword stuffing.** Semantic spread (§1) only.
- **No Article schema on the homepage.** It's not an article.
- **No SoftwareApplication / Product / Offer schema.** Wrong schema types
  for a restaurant. (Original SaaS-oriented draft suggested these.)
