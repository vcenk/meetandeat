import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Animation duration in seconds. Larger = slower. */
  duration?: number;
  /** Reverse scroll direction. */
  reverse?: boolean;
  className?: string;
};

/**
 * Pure-CSS infinite marquee. Renders content twice and translates by 50%
 * so the loop is seamless. No JS needed; respects prefers-reduced-motion
 * via the keyframe rule in globals.css.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex items-center gap-12">{children}</div>
        <div className="flex items-center gap-12">{children}</div>
      </div>
    </div>
  );
}
