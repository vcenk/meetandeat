"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { menuSections, type MenuItem } from "@/lib/menu-data";

const ROTATION_MS = 2500;

/**
 * Hand-picked dishes shown on the hero rotation, in display order.
 * Constraints: only items from Kebabs / Traditional Dishes / Pides / Wraps,
 * and only dishes that have a real photo in /public/images/menu/.
 * Span all four categories so users see the range at a glance.
 */
const carouselPicks = [
  "Mixed Kebab Platter", // Kebabs
  "Lamb Shank", // Traditional
  "Beyti Kebab", // Kebabs
  "Mevlana Pide", // Pides
  "Lamb Chops", // Traditional
  "Adana Wrap", // Wraps
  "Ali Nazik", // Kebabs
] as const;

type FeaturedDish = MenuItem & {
  sectionSlug: string;
  categoryLabel: string;
};

const ALLOWED_SLUGS = new Set(["kebabs", "traditional", "pides"]);

function labelFor(slug: string, name: string): string {
  if (slug === "traditional") {
    return name.toLowerCase().includes("wrap") ? "Wraps" : "Traditional";
  }
  if (slug === "kebabs") return "Kebabs";
  if (slug === "pides") return "Pides";
  return "Menu";
}

const indexedDishes = menuSections
  .filter((section) => ALLOWED_SLUGS.has(section.slug))
  .flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      sectionSlug: section.slug,
      categoryLabel: labelFor(section.slug, item.name),
    })),
  );

const featured: FeaturedDish[] = carouselPicks
  .map((name) => indexedDishes.find((d) => d.name === name))
  .filter((d): d is FeaturedDish => Boolean(d?.image));

/**
 * Rotates through hand-picked dishes every {ROTATION_MS} with a smooth
 * crossfade. The card keeps its position; only the inner content swaps.
 *
 * Pauses rotation on hover so users can read the current dish.
 */
export function RotatingDishCard() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || featured.length <= 1) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % featured.length),
      ROTATION_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  if (featured.length === 0) return null;
  const dish = featured[idx];

  return (
    <Link
      href={`/menu#${dish.sectionSlug}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative block w-full max-w-md overflow-hidden rounded-3xl bg-cream p-3 shadow-2xl shadow-brand-navy-900/40 ring-1 ring-cream-strong"
      aria-label={`Featured: ${dish.name}. ${dish.categoryLabel}.`}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-sm font-semibold text-brand-navy-800">
          Experience Our Signature Dishes
        </p>
        <span
          aria-hidden
          className="text-brand-orange-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </div>

      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-brand-navy-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute inset-0"
          >
            <Image
              src={dish.image!}
              alt={dish.name}
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/55 to-brand-navy-900/15" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-orange-300">
                  {dish.categoryLabel}
                </p>
                <p className="mt-1.5 truncate font-display text-2xl font-semibold text-cream">
                  {dish.name}
                </p>
                {dish.description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-cream/75">
                    {dish.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 rounded-full bg-brand-orange-400 px-3 py-1.5 text-xs font-semibold text-brand-navy-900">
                ${dish.price}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 px-3 pt-3 pb-1">
        {featured.map((d, i) => (
          <span
            key={d.name}
            aria-hidden
            className={`h-1 rounded-full transition-all duration-500 ${
              i === idx
                ? "w-6 bg-brand-orange-400"
                : "w-1.5 bg-brand-navy-200"
            }`}
          />
        ))}
      </div>
    </Link>
  );
}
