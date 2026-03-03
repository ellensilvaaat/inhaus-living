import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/bathroom-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Bathroom Renovations Sydney | Luxury Bathroom Renovators | Inhaus Living",

  description:
    "Premium bathroom renovations in Sydney by licensed and insured builders with over 20 years experience. Custom luxury bathroom design, waterproofing compliance and high-end finishes tailored to your home.",

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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* WebPage */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Bathroom Renovations Sydney",
        description:
          "Luxury bathroom renovation services across Sydney delivered by licensed renovation specialists.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* Primary Service */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Bathroom Renovations Sydney",
        serviceType: "Bathroom Renovation and Design",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
        description:
          "Luxury bathroom renovations including waterproofing compliance, custom vanities, premium tiling and full design & build services.",
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
            name: "Bathroom Renovations Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="bathroom-renovations-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="bathroom-page">
        <Navbar />
        <Hero />
        <Intro />
        <Features />
        <RenovationProcess />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}