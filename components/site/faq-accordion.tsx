"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FaqEntry } from "@/lib/faq-content";

type Props = {
  items: FaqEntry[];
  className?: string;
};

export function FaqAccordion({ items, className = "" }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <ul className={`divide-y divide-cream-strong ${className}`}>
      {items.map((faq, i) => {
        const isOpen = openIdx === i;
        const id = `faq-${i}`;
        return (
          <li key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={id}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-brand-orange-500"
            >
              <span className="font-display text-lg font-semibold text-brand-navy-800 sm:text-xl">
                {faq.question}
              </span>
              <span
                aria-hidden
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-navy-200 text-brand-navy-800 transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-brand-orange-300 bg-brand-orange-100"
                    : "bg-cream"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-ink-soft">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
