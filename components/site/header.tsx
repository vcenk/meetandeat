"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { primaryNav } from "./nav-links";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-cream-strong/80 bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src={siteConfig.brand.logoSrc}
              alt={siteConfig.brand.logoAlt}
              width={48}
              height={48}
              priority
              className="h-10 w-10 sm:h-11 sm:w-11"
            />
            <span className="hidden font-display text-xl font-semibold text-brand-navy-800 sm:inline">
              {siteConfig.name}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-brand-navy-800 transition-colors hover:text-brand-orange-500"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-orange-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden text-sm font-medium text-brand-navy-800 hover:text-brand-orange-500 md:inline"
            >
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/reservations"
              className="hidden h-10 items-center justify-center rounded-full bg-brand-navy-800 px-5 text-sm font-medium text-cream transition-colors hover:bg-brand-navy-700 md:inline-flex"
            >
              Book a Table
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy-200 bg-cream text-brand-navy-800 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden
              >
                {open ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-navy-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-cream-strong bg-cream pt-20 lg:hidden"
            aria-label="Mobile primary"
          >
            <ul className="flex flex-col px-6 text-lg">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-cream-strong py-4 font-display font-semibold text-brand-navy-800 transition-colors hover:text-brand-orange-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 p-6">
              <Link
                href="/reservations"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-brand-navy-800 text-sm font-medium text-cream transition-colors hover:bg-brand-navy-700"
              >
                Book a Table
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex h-12 items-center justify-center rounded-full border border-brand-navy-200 text-sm font-medium text-brand-navy-800 transition-colors hover:bg-cream-soft"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
