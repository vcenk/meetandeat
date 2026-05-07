"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxImageProps = {
  children: ReactNode;
  /** Pixels of vertical drift across the section's full scroll range. Negative = moves up faster, positive = moves down. */
  shift?: number;
  className?: string;
};

/**
 * Wraps content in a `motion.div` whose `y` is driven by the scroll progress
 * of its nearest scroll-tracked ancestor. Use inside a section that itself is
 * the `target` of `useScroll`, or provide your own ref via the parent.
 *
 * For floating decorative images that drift slightly as the user scrolls.
 */
export function ParallaxImage({ children, shift = 80, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
