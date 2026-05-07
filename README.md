# Meet and Eat — Website

Marketing site for [Meet and Eat](https://meetandeat.ca), a Turkish restaurant in Vancouver.

Built with **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**, with **Sanity** as the CMS (added Day 3) and **Cloudflare Pages** for hosting.

## Getting started

```bash
cp .env.example .env.local   # fill in NEXT_PUBLIC_SITE_URL etc.
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/                  # Next.js App Router routes
  layout.tsx          # Root layout: metadata, JSON-LD, fonts
  page.tsx            # Homepage
  robots.ts           # /robots.txt generator
  sitemap.ts          # /sitemap.xml generator
  opengraph-image.tsx # /opengraph-image (1200×630 social card)
components/           # Reusable React components
  json-ld.tsx         # <script type="application/ld+json"> wrapper
lib/
  site-config.ts      # Single source of truth: NAP, hours, geo, social
  structured-data.ts  # Schema.org JSON-LD generators
public/               # Static assets (favicons, OG fallback, etc.)
```

## SEO foundation

This project ships SEO baked in from day one:

| Layer | Implementation | What it does |
|---|---|---|
| Metadata API | `app/layout.tsx` + per-page `metadata` exports | `<title>`, OG, Twitter, canonical, robots |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml` | Lists all routes for crawlers |
| Robots | `app/robots.ts` → `/robots.txt` | Crawl rules + sitemap reference |
| OG image | `app/opengraph-image.tsx` → `/opengraph-image` | 1200×630 dynamic social card |
| Structured data | `lib/structured-data.ts` + `<JsonLd>` | Restaurant, WebSite, Organization schemas |
| Verification | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env | Google Search Console meta tag |

### Validating SEO output

After running `npm run dev`:

- View source on `/` and confirm `<meta>` tags + JSON-LD are present.
- Visit `/robots.txt` and `/sitemap.xml` directly.
- Visit `/opengraph-image` to preview the social card.
- Paste the rendered JSON-LD into [Rich Results Test](https://search.google.com/test/rich-results).
- Run Lighthouse (`SEO` and `Performance`) — target ≥95 on both.

### Submitting to Google after launch

1. Verify ownership in [Google Search Console](https://search.google.com/search-console) using the meta-tag method (set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
2. Submit `https://meetandeat.ca/sitemap.xml`.
3. Request indexing for the homepage, menu, and catering pages.
4. Connect a Google Business Profile and ensure NAP matches `lib/site-config.ts` exactly.

## Tech stack notes

> ⚠️ This is **Next.js 16** + **React 19** + **Tailwind v4**. APIs and conventions
> differ from older Next/Tailwind. Read `node_modules/next/dist/docs/` before
> writing non-trivial features. See `AGENTS.md`.

- Tailwind v4 uses CSS-based theming via `@theme` in `app/globals.css` — no `tailwind.config.js`.
- The Metadata API supports streaming (disabled automatically for crawlers).
- `app/sitemap.ts` and `app/robots.ts` are special Route Handlers, cached by default.
