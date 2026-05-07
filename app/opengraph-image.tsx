import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.ogImage.alt;
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
export const contentType = "image/png";

/**
 * Dynamic OG card using the brand palette (navy + orange on cream).
 * Mirrors the logo identity so social shares feel consistent with the site.
 */
export default function OpenGraphImage() {
  const { navy, orange, cream } = siteConfig.brand.colors;

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
          padding: 80,
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

        <div
          style={{
            fontSize: 24,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: orange,
            marginBottom: 28,
            fontWeight: 600,
          }}
        >
          100% Halal · Vancouver
        </div>
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 28,
            letterSpacing: -2,
          }}
        >
          Meet &amp; Eat
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            maxWidth: 900,
            color: navy,
            opacity: 0.85,
          }}
        >
          Authentic Turkish Restaurant on East Hastings
        </div>
      </div>
    ),
    { ...size },
  );
}
