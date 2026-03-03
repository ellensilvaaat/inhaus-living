import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/construction-additions-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Extensions Sydney | Construction & Additions Specialists | Inhaus Living",

  description:
    "Premium home extensions and construction services in Sydney. Licensed builders delivering second storey additions, ground floor extensions and structural renovations across NSW.",

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
    url: pageUrl,
    title:
      "Home Extensions Sydney | Construction & Additions Experts",
    description:
      "Expand your home with Sydney’s trusted construction specialists. Structural integrity, premium craftsmanship and council-compliant extensions.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-construction-additions.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury home extension in Sydney by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Home Extensions Sydney | Licensed Construction Specialists",
    description:
      "Second storey additions and structural home extensions delivered by Sydney’s trusted builders.",
    images: [`${siteUrl}/og-construction-additions.jpg`],
  },

  category: "Construction",
};

export default function ConstructionAdditionsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* WebPage */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Extensions Sydney",
        description:
          "Second storey additions, ground floor extensions and structural construction services across Sydney.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* Primary Service */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Home Extensions Sydney",
        serviceType: "Home Extensions & Construction",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
        description:
          "Premium home extensions including second storey additions, structural renovations and council-compliant construction services across NSW.",
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
            name: "Home Extensions Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="construction-additions-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="construction-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}