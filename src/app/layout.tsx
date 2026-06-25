import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ChatBot } from "@/components/ui/ChatBot";
import { COMPANY } from "@/lib/utils";
import PublicShell from "@/components/layout/PublicShell";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shadotech.lu"),
  title: {
    default: "Shadotech Automotive — Vitres Teintées, Covering & PPF Luxembourg",
    template: "%s | Shadotech Automotive Luxembourg",
  },
  description:
    "Shadotech Automotive à Kayl, Luxembourg : vitres teintées, covering, PPF, ciel étoilé, lumière d'ambiance et CarPlay. Spécialiste customisation automobile au Luxembourg.",
  keywords: [
    "vitres teintées Luxembourg",
    "covering voiture Luxembourg",
    "PPF Luxembourg",
    "film protection peinture Kayl",
    "ciel étoilé voiture Luxembourg",
    "CarPlay installation Luxembourg",
    "customisation automobile Luxembourg",
    "Shadotech Automotive",
  ],
  authors: [{ name: "Shadotech Automotive" }],
  creator: "Shadotech Automotive",
  openGraph: {
    type: "website",
    locale: "fr_LU",
    url: "https://shadotech.lu",
    siteName: "Shadotech Automotive",
    title: "Shadotech Automotive — Customisation automobile au Luxembourg",
    description:
      "Vitres teintées, covering, PPF, ciel étoilé et CarPlay. Basé à Kayl, Luxembourg.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadotech Automotive Luxembourg",
    description: "Spécialiste customisation automobile au Luxembourg",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://shadotech.lu" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  name: COMPANY.name,
  description:
    "Spécialiste en customisation automobile : vitres teintées, covering, PPF, ciel étoilé, lumière d'ambiance et CarPlay au Luxembourg.",
  url: "https://shadotech.lu",
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "53 Rue de Noertzange",
    postalCode: "3670",
    addressLocality: "Kayl",
    addressCountry: "LU",
    addressRegion: "Canton de Esch-sur-Alzette",
  },
  geo: { "@type": "GeoCoordinates", latitude: 49.492, longitude: 6.036 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: { "@type": "Country", name: "Luxembourg" },
  hasMap: COMPANY.googleMapsUrl,
  sameAs: [COMPANY.instagram, COMPANY.googleBusinessUrl],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={outfit.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#111111] text-[#F5F5F5] font-[var(--font-outfit)] antialiased">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
