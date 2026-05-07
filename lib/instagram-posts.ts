/**
 * Instagram post tiles shown in the footer marquee.
 *
 * These are static placeholders pointing at the Instagram profile. Replace
 * `image` with downloaded post screenshots and `postUrl` with the per-post
 * permalink (https://www.instagram.com/p/<id>/) once the client picks
 * which posts to feature. Update quarterly or wire up to Sanity later.
 */

import { siteConfig } from "./site-config";

export type InstagramPost = {
  image: string;
  alt: string;
  postUrl: string;
};

const profileUrl = siteConfig.social.instagram;

export const instagramPosts: InstagramPost[] = [
  {
    image: "/images/photo-kebab-platter.jpg",
    alt: "Charcoal-grilled kebab platter from Meet and Eat",
    postUrl: profileUrl,
  },
  {
    image: "/images/photo-pide-board.jpg",
    alt: "Stone-oven pide board",
    postUrl: profileUrl,
  },
  {
    image: "/images/photo-lamb-platter.jpg",
    alt: "Lamb platter served at Meet and Eat",
    postUrl: profileUrl,
  },
  {
    image: "/images/photo-group-dining.jpg",
    alt: "Guests sharing a meal at Meet and Eat",
    postUrl: profileUrl,
  },
  {
    image: "/images/photo-server.jpg",
    alt: "Server bringing dishes to a table",
    postUrl: profileUrl,
  },
  {
    image: "/images/photo-hero-table.jpg",
    alt: "Turkish table spread on dark wood",
    postUrl: profileUrl,
  },
  {
    image: "/images/menu-kebabs.png",
    alt: "Kebab section of the menu",
    postUrl: profileUrl,
  },
  {
    image: "/images/menu-pides.png",
    alt: "Pide section of the menu",
    postUrl: profileUrl,
  },
];
