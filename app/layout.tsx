import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  organizationSchema,
  restaurantSchema,
  websiteSchema,
} from "@/lib/structured-data";

const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Bold condensed caps — drives both --font-display and --font-impact in
// globals.css, so it covers every heading and display utility on the site.
const fontImpact = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Keyword-first per SEO best practice: "Primary Keyword | Brand Name".
    default: siteConfig.titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: "Next.js",
  keywords: [
    "Turkish restaurant Vancouver",
    "kebab Vancouver",
    "lahmacun Vancouver",
    "halal restaurant Vancouver",
    "Mediterranean food Vancouver",
    "Turkish food near me",
    "Meet and Eat",
    "Turkish catering Vancouver",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Restaurant",
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.titleDefault,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.titleDefault,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: siteConfig.verification.google || undefined,
    other: siteConfig.verification.bing
      ? { "msvalidate.01": siteConfig.verification.bing }
      : undefined,
  },
  icons: {
    icon: "/favicon.ico",
    apple: siteConfig.brand.logoSrc,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: siteConfig.brand.colors.navy,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.defaultLocale}
      className={`${fontSans.variable} ${fontImpact.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header />
        <div className="flex flex-1 flex-col pt-40 sm:pt-48">{children}</div>
        <Footer />
        <JsonLd data={[restaurantSchema(), websiteSchema(), organizationSchema()]} />
      </body>
    </html>
  );
}
