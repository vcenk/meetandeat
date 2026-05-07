import { siteConfig } from "@/lib/site-config";

type Props = {
  className?: string;
  /** Override the default 16:9 aspect for landscape vs square contexts. */
  aspect?: "video" | "square" | "wide";
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
};

/**
 * Lazy-loaded Google Maps embed of the restaurant. Title is required for
 * accessibility (screen readers announce it as the iframe's name).
 */
export function MapEmbed({ className = "", aspect = "video" }: Props) {
  const formattedAddress = `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-brand-navy-100 ${aspectClass[aspect]} ${className}`}>
      <iframe
        src={siteConfig.embeds.googleMaps}
        title={`Map showing ${siteConfig.name} at ${formattedAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
