"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

type ScrollVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Muted, looped video that auto-plays once it scrolls into view and pauses
 * when it leaves. Mirrors the cinematic full-bleed clip on dinevo.framer.website.
 *
 * `muted` + `playsInline` are required for mobile autoplay. `preload="metadata"`
 * keeps the initial download small until the video is needed.
 */
export function ScrollVideo({ src, poster, className }: ScrollVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) {
      // play() returns a promise that may reject if the browser blocks
      // autoplay (e.g. unmuted) — swallow it so it doesn't error in the console.
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
