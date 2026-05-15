import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.ogImage.alt;
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
export const contentType = "image/png";

/**
 * Dynamic OG card — logo-led, brand-palette frame.
 * One card serves Facebook, Twitter (summary_large_image), LinkedIn, and
 * Instagram DM/Story previews — they all read these OpenGraph tags.
 *
 * The <img> uses an absolute URL so Vercel's edge runtime can fetch the
 * logo PNG from the same deployment when a social crawler hits the OG
 * endpoint.
 */
export default function OpenGraphImage() {
  const { navy, orange, cream } = siteConfig.brand.colors;
  const logoSrc = `${siteConfig.url}/images/logo/logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: cream,
          color: navy,
          fontFamily: "serif",
          padding: 56,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: orange,
          }}
        />
        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: orange,
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={240}
          height={240}
          style={{
            width: 240,
            height: 240,
            marginBottom: 28,
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: orange,
            marginBottom: 18,
            fontWeight: 600,
          }}
        >
          100% Halal · Vancouver
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: navy,
            lineHeight: 1.1,
            maxWidth: 880,
            letterSpacing: -1,
          }}
        >
          Authentic Turkish Restaurant on East Hastings
        </div>
      </div>
    ),
    { ...size },
  );
}
