import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.ogImage.alt;
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
export const contentType = "image/png";

/**
 * Dynamic OG card. Replaced with brand artwork once the visual identity
 * is finalized (Day 2). Keeps the social card crawlable from day one.
 */
export default function OpenGraphImage() {
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
          background:
            "linear-gradient(135deg, #7a1f1f 0%, #b23a3a 55%, #d9a441 100%)",
          color: "#fff8ec",
          fontFamily: "sans-serif",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          Vancouver · Turkish Cuisine
        </div>
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 40, fontWeight: 400, maxWidth: 900, opacity: 0.95 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
