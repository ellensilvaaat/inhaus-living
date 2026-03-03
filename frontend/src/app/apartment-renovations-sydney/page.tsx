import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/apartment-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Apartment Renovations Sydney | Luxury Strata Renovators | Inhaus Living",

  description:
    "Premium apartment renovations in Sydney by licensed strata renovation specialists with 20+ years experience. Strata-compliant kitchen, bathroom and full apartment transformations delivered with precision and design excellence.",

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
      "Apartment Renovations Sydney | Strata Specialists | Inhaus Living",
    description:
      "Sydney’s trusted apartment renovation specialists delivering strata-compliant, luxury and design-led apartment transformations.",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* WebPage */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Apartment Renovations Sydney",
        description:
          "Luxury strata-compliant apartment renovations across Sydney delivered by licensed renovation specialists.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* Primary Service */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Apartment Renovations Sydney",
        serviceType: "Apartment and Strata Renovations",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
        description:
          "Strata-compliant apartment renovations including kitchen renovations, bathroom upgrades and full apartment redesigns.",
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
            name: "Apartment Renovations Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="apartment-renovations-structured-data"
        type="application/ld+json"
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