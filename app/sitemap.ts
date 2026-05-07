import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Static page sitemap. Once menu items are sourced from Sanity (Day 3+),
 * fetch them here and append per-item URLs if we expose them as routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${base}/menu`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${base}/catering`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/reservations`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6, lastModified: now },
  ];

  return routes;
}
