"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  /** Direction the content slides in from. */
  from?: Direction;
  /** Distance in px the content travels (default 24). */
  distance?: number;
  /** Delay in seconds (default 0). */
  delay?: number;
  /** Duration in seconds (default 0.7). */
  duration?: number;
  /** When true, the reveal replays each time the element scrolls into view. */
  replay?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "transition" | "viewport">;

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 0 },
  down: { y: 0 },
  left: { x: 0 },
  right: { x: 0 },
  none: {},
};

/**
 * Scroll-triggered reveal — fade + translate from a direction.
 * Plays once per element by default; pass `replay` to retrigger.
 */
export function Reveal({
  children,
  from = "up",
  distance = 24,
  delay = 0,
  duration = 0.7,
  replay = false,
  className,
  ...rest
}: RevealProps) {
  const initial = { ...offsets[from], opacity: 0 };
  if (from === "up") initial.y = distance;
  if (from === "down") initial.y = -distance;
  if (from === "left") initial.x = distance;
  if (from === "right") initial.x = -distance;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: !replay, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — children using <Reveal> can pass `delay={i * 0.08}`
 * to chain in. Use this when you want a single class for the parent grid.
 */
export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
