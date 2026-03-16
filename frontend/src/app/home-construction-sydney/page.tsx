import type { Metadata } from "next";
import Script from "next/script";

import Hero from "./components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://www.inhausliving.com.au";
const pagePath = "/construction-additions-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Extensions Sydney | Construction & Additions Specialists",

  description:
    "Premium home extensions and construction in Sydney. Licensed builders delivering second storey additions and ground floor extensions across NSW.",

keywords: [
  "home extensions sydney",
  "home construction sydney",
  "second storey additions sydney",
  "house extensions sydney",
  "home addition builders sydney",
  "home extension builders sydney",
  "structural renovation sydney",
  "house construction company sydney",
  "second storey extension sydney",
  "ground floor extension sydney",
  "house extension builders sydney",
  "custom home builders sydney",
  "design and build company sydney",
  "luxury home extensions sydney",
  "home renovation and extension sydney",
  "home expansion sydney",
  "house additions sydney",
  "construction builders sydney",
  "licensed builders sydney",
  "residential construction sydney"
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

      /* PAGE */

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

      /* SERVICE */

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
        serviceArea: {
          "@type": "AdministrativeArea",
          name: "New South Wales",
        },
        description:
          "Premium home extensions including second storey additions, structural renovations and council-compliant construction services across Sydney.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#construction-business`,
        name: "Inhaus Living Home Construction Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "Home Construction and Extensions"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-construction-additions.jpg`,
        caption: "Luxury home extension construction project in Sydney"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a home extension cost in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Home extension costs in Sydney vary depending on size, structural complexity and finishes. Second storey additions and ground floor extensions typically require structural engineering, council approval and licensed builders."
            }
          },
          {
            "@type": "Question",
            name: "Do home extensions require council approval in NSW?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most home extensions require council approval or a complying development certificate in New South Wales. Professional builders can assist with planning, engineering and compliance."
            }
          },
          {
            "@type": "Question",
            name: "How long does a home extension take to build?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Construction timelines depend on the complexity of the project, but most home extensions in Sydney take several months including planning, approvals and building stages."
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