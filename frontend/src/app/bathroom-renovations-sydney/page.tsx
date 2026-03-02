import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}bathroom-renovations-sydney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Bathroom Renovations Sydney | Luxury Bathroom Renovators | Inhaus Living",

  description:
    "Premium bathroom renovations in Sydney by licensed and insured builders with over 20 years experience. Custom luxury bathroom design, waterproofing compliance and high-end finishes tailored to your home.",

  keywords: [
    "Bathroom Renovations Sydney",
    "Sydney Bathroom Renovators",
    "Luxury Bathroom Renovations Sydney",
    "Bathroom Remodel Sydney",
    "Custom Bathroom Design Sydney",
    "Licensed Bathroom Builders Sydney",
    "Bathroom Waterproofing Sydney",
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
      "Luxury Bathroom Renovations Sydney | Trusted Renovation Specialists",
    description:
      "Design-led bathroom renovations across Sydney. Fully licensed builders delivering waterproof-compliant, high-end bathroom transformations.",
    url: pageUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-bathroom-renovations.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury bathroom renovation in Sydney by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Bathroom Renovations Sydney | Luxury Bathroom Builders",
    description:
      "Transform your bathroom with Sydney’s trusted renovation specialists.",
    images: [`${siteUrl}/og-bathroom-renovations.jpg`],
  },

  category: "Construction",
};

export default function BathroomRenovationsPage() {
  const structuredData = [
    // 🔥 SERVICE ENTITY
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Bathroom Renovations Sydney",
      serviceType: "Bathroom Renovation and Design",
      url: pageUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      description:
        "Luxury bathroom renovations in Sydney including waterproofing, custom vanities, premium tiling and full design & build services.",
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
          name: "Bathroom Renovations Sydney",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="bathroom-renovations-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="bathroom-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}