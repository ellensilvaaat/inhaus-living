import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}apartment-renovations-sydney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Apartment Renovations Sydney | Luxury Strata Renovators | Inhaus Living",

  description:
    "Premium apartment renovations in Sydney by licensed strata renovation specialists with 20+ years experience. Strata-compliant kitchen, bathroom and full apartment transformations delivered with precision and design excellence.",

  keywords: [
    "Apartment Renovations Sydney",
    "Strata Renovations Sydney",
    "Sydney Apartment Renovators",
    "Luxury Apartment Renovations",
    "Apartment Kitchen Renovation Sydney",
    "Apartment Bathroom Renovation Sydney",
    "Strata Builders Sydney",
    "Design and Build Sydney",
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
    title:
      "Apartment Renovations Sydney | Strata Specialists | Inhaus Living",
    description:
      "Sydney’s trusted apartment renovation specialists delivering strata-compliant, luxury and design-led apartment transformations.",
    url: pageUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-apartment-renovations.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury apartment renovation in Sydney by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Apartment Renovations Sydney | Strata-Compliant Specialists",
    description:
      "Transform your Sydney apartment with licensed strata renovation experts.",
    images: [`${siteUrl}/og-apartment-renovations.jpg`],
  },

  category: "Construction",
};

export default function ApartmentRenovationsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Apartment Renovations Sydney",
      serviceType: "Apartment and Strata Renovations",
      url: pageUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      description:
        "Strata-compliant apartment renovations across Sydney including kitchen renovations, bathroom upgrades and full apartment redesigns.",
    },
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
          name: "Apartment Renovations Sydney",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="apartment-renovations-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="apartment-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}