import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/house-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "House Renovations Sydney | Luxury Home Renovators | Inhaus Living",

  description:
    "Award-winning house renovations in Sydney by licensed builders with 20+ years experience. Luxury home transformations, extensions and design-led renovations tailored to your lifestyle and long-term property value.",

  alternates: {
    canonical: pagePath,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "article",
    title:
      "Luxury House Renovations Sydney | Trusted Home Renovators | Inhaus Living",
    description:
      "Premium house renovations across Sydney. Design-led, structurally sound and fully compliant home transformations by licensed renovation specialists.",
    url: pageUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-house-renovations.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury house renovation in Sydney by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "House Renovations Sydney | Luxury Home Renovators | Inhaus Living",
    description:
      "Transform your home with Sydney’s trusted renovation specialists.",
    images: [`${siteUrl}/og-house-renovations.jpg`],
  },

  category: "Construction",
};

export default function HouseRenovationsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* WebPage */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "House Renovations Sydney",
        description:
          "Luxury house renovations and full home transformations across Sydney.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* Primary Service */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "House Renovations Sydney",
        serviceType: "House & Full Home Renovations",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
        description:
          "Luxury house renovations including structural upgrades, home extensions and complete interior redesigns.",
      },

      /* Local Business Reinforcement */
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        telephone: "+61296623509",
        priceRange: "$$$$",
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
      },

      /* Breadcrumb */
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "House Renovations Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="house-renovations-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="house-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}