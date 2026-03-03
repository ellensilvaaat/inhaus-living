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
const pagePath = "/flooring-services-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Flooring Installation Sydney | Timber, Engineered & Hybrid Flooring Specialists | Inhaus Living",

  description:
    "Premium flooring installation in Sydney, NSW. Timber, engineered and hybrid flooring installed by licensed specialists delivering precision craftsmanship and long-lasting durability.",

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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* WebPage */
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Flooring Installation Sydney",
        description:
          "Professional timber, engineered and hybrid flooring installation across Sydney.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* Primary Service */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Flooring Installation Sydney",
        serviceType:
          "Timber, Engineered and Hybrid Flooring Installation",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Sydney",
        },
        description:
          "Professional timber, engineered and hybrid flooring installation including subfloor preparation and premium finishes across Sydney, NSW.",
      },

      /* Local Business Reinforcement */
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        telephone: "+61296623509",
        priceRange: "$$$",
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
            name: "Flooring Installation Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

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