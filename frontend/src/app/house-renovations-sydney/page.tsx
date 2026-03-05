import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://www.inhausliving.com.au";
const pagePath = "/house-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "House Renovations Sydney | Home Renovators | Inhaus Living",

  description:
    "House renovations in Sydney by licensed builders. Full home transformations, extensions and design-led renovations tailored to your lifestyle.",

keywords: [
  "house renovations sydney",
  "home renovations sydney",
  "full home renovation sydney",
  "luxury home renovation sydney",
  "home renovation builders sydney",
  "house remodeling sydney",
  "complete home renovation sydney",
  "home renovation company sydney",
  "home renovation contractors sydney",
  "custom home renovations sydney",
  "modern home renovations sydney",
  "high end home renovations sydney",
  "house renovation specialists sydney",
  "home renovation experts sydney",
  "design and build renovations sydney",
  "home transformation sydney",
  "residential renovation builders sydney",
  "premium home renovations sydney",
  "whole house renovation sydney",
  "major home renovations sydney"
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
    type: "website",
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

      /* PAGE */

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

      /* SERVICE */

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
        serviceArea: {
          "@type": "AdministrativeArea",
          name: "New South Wales",
        },
        description:
          "Luxury house renovations including structural upgrades, home extensions and complete interior redesigns.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#house-renovation-business`,
        name: "Inhaus Living House Renovations Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "House Renovations"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-house-renovations.jpg`,
        caption: "Luxury full house renovation project in Sydney"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a house renovation cost in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "House renovation costs in Sydney vary depending on the size of the property, structural changes and finishes. Full home renovations typically involve design, structural work, compliance and high-quality materials."
            }
          },
          {
            "@type": "Question",
            name: "Do house renovations require council approval?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Some house renovations require council approval or a complying development certificate depending on the scope of structural changes. Professional renovation builders can assist with planning and approvals."
            }
          },
          {
            "@type": "Question",
            name: "How long does a full home renovation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Full home renovations may take several months depending on the scope of work, design complexity and structural upgrades involved in the project."
            }
          }
        ]
      },

      /* BREADCRUMB */

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