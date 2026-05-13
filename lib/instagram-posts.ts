/**
 * Tiles shown in the footer marquee strip.
 *
 * Sourced from menuSections — every dish with a real photograph becomes a
 * marquee tile, so the footer doubles as a visual showcase of the menu.
 * New menu photos appear here automatically with no edits.
 *
 * Each tile links to the Instagram profile for now (drives follows from
 * every page). When the client wants individual tiles to deep-link to
 * their corresponding IG post, add a `postUrl` override per dish in
 * menu-data.ts and read it here.
 */

import { siteConfig } from "./site-config";
import { menuSections } from "./menu-data";

export type InstagramPost = {
  image: string;
  alt: string;
  postUrl: string;
};

const profileUrl = siteConfig.social.instagram;

export const instagramPosts: InstagramPost[] = menuSections.flatMap((section) =>
  section.items
    .filter((item) => Boolean(item.image))
    .map((item) => ({
      image: item.image!,
      alt: `${item.name} — ${section.name} at Meet and Eat`,
      postUrl: profileUrl,
    })),
);
