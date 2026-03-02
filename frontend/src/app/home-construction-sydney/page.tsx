import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}construction-additions-sydney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Extensions Sydney | Construction & Additions Specialists NSW",

  description:
    "Premium home extensions and construction services in Sydney. Licensed builders delivering second storey additions, ground floor extensions and structural renovations across NSW.",

  keywords: [
    "Home Extensions Sydney",
    "Construction Services Sydney",
    "Second Storey Additions Sydney",
    "Home Additions NSW",
    "Ground Floor Extensions Sydney",
    "Structural Renovations Sydney",
    "Licensed Builders Sydney",
  ],

  alternates: {
    canonical: pageUrl,
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
  const structuredData = [
    // 🔥 PRIMARY SERVICE ENTITY
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home Extensions Sydney",
      serviceType: "Home Extensions & Construction",
      url: pageUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      description:
        "Premium home extensions, second storey additions and structural construction services across Sydney, NSW. Fully licensed and compliant with local building regulations.",
    },

    // 🔥 LOCAL SEO REINFORCEMENT
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${pageUrl}/#localbusiness`,
      name: "Inhaus Living",
      url: siteUrl,
      telephone: "+61296623509",
      priceRange: "$$$$",
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },

    // 🔥 BREADCRUMB
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
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
  ];

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