import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}flooring-services-sydney`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Flooring Installation Sydney | Timber, Engineered & Hybrid Flooring Specialists",

  description:
    "Premium flooring installation in Sydney, NSW. Timber, engineered and hybrid flooring installed by licensed specialists delivering precision craftsmanship and long-lasting durability.",

  keywords: [
    "Flooring Installation Sydney",
    "Timber Flooring Sydney",
    "Hybrid Flooring Sydney",
    "Engineered Timber Flooring Sydney",
    "Flooring Specialists Sydney",
    "Professional Floor Installers Sydney",
    "Timber Floor Installation NSW",
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
      "Flooring Installation Sydney | Timber & Hybrid Flooring Experts",
    description:
      "Sydney’s trusted flooring installation specialists delivering premium timber, engineered and hybrid flooring with expert craftsmanship.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-flooring-services.jpg`,
        width: 1200,
        height: 630,
        alt: "Premium timber flooring installation in Sydney",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Flooring Installation Sydney | Timber & Hybrid Flooring Specialists",
    description:
      "Upgrade your Sydney home with premium timber, engineered and hybrid flooring installed by experts.",
    images: [`${siteUrl}/og-flooring-services.jpg`],
  },

  category: "Construction",
};

export default function FlooringServicesSydneyPage() {
  const structuredData = [
    // 🔥 SERVICE ENTITY (Primary Ranking Signal)
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Flooring Installation Sydney",
      serviceType: "Timber, Engineered and Hybrid Flooring Installation",
      url: pageUrl,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "City",
        name: "Sydney",
      },
      description:
        "Professional timber, engineered and hybrid flooring installation across Sydney, NSW including subfloor preparation and premium finishes.",
    },

    // 🔥 LOCAL SEO REINFORCEMENT
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${pageUrl}/#localbusiness`,
      name: "Inhaus Living",
      url: siteUrl,
      telephone: "+61296623509",
      priceRange: "$$$",
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
          name: "Flooring Installation Sydney",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="flooring-services-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="flooring-page">
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
      </div>
    </>
  );
}