import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}kitchen-renovations-sydney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Kitchen Renovations Sydney | Luxury Kitchen Renovators | Inhaus Living",

  description:
    "Premium kitchen renovations in Sydney by licensed and insured builders with 20+ years experience. Custom luxury kitchens designed for performance, elegance and long-term value.",

  keywords: [
    "Kitchen Renovations Sydney",
    "Luxury Kitchen Renovations Sydney",
    "Kitchen Renovators Sydney",
    "Custom Kitchens Sydney",
    "Modern Kitchen Renovation Sydney",
    "High-End Kitchen Builders Sydney",
    "Sydney Kitchen Design",
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
      "Luxury Kitchen Renovations Sydney | Custom Kitchen Builders | Inhaus Living",
    description:
      "Design-led kitchen renovations across Sydney. Premium finishes, European appliances and licensed builders delivering timeless kitchen transformations.",
    url: pageUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-kitchen-renovations.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury kitchen renovation in Sydney by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Kitchen Renovations Sydney | Luxury Kitchen Specialists",
    description:
      "Transform your kitchen with Sydney’s trusted renovation specialists.",
    images: [`${siteUrl}/og-kitchen-renovations.jpg`],
  },

  category: "Construction",
};

export default function KitchenRenovationsPage() {
  const structuredData = [
    // 🔥 PRIMARY SERVICE ENTITY
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Kitchen Renovations Sydney",
      serviceType: "Kitchen Renovation & Design",
      url: pageUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      description:
        "Luxury kitchen renovations across Sydney including custom cabinetry, stone benchtops, European appliances and full kitchen redesigns.",
    },

    // 🔥 LOCAL BUSINESS REINFORCEMENT
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
          name: "Kitchen Renovations Sydney",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="kitchen-renovations-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="kitchen-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}