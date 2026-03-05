import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://www.inhausliving.com.au";
const pagePath = "/apartment-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Apartment Renovations Sydney | Luxury Strata Renovators | Inhaus Living",

  description:
    "Premium apartment renovations in Sydney by licensed strata renovation specialists with 20+ years experience. Strata-compliant kitchen, bathroom and full apartment transformations delivered with precision and design excellencePremium apartment renovations in Sydney by licensed strata specialists. Kitchen, bathroom and full apartment transformations delivered with precision.",

  keywords: [
  "apartment renovations sydney",
  "strata renovations sydney",
  "apartment renovation company sydney",
  "apartment kitchen renovation sydney",
  "apartment bathroom renovation sydney",
  "strata renovation specialists sydney",
  "luxury apartment renovation sydney",
  "sydney apartment remodeling",
  "apartment renovation contractors sydney",
  "strata compliant renovations sydney",
  "apartment remodel sydney",
  "apartment renovation builders sydney",
  "modern apartment renovations sydney",
  "apartment renovation experts sydney",
  "high end apartment renovation sydney",
  "apartment refurbishment sydney",
  "apartment renovation design sydney",
  "strata apartment renovations sydney",
  "inner city apartment renovation sydney",
  "apartment renovation specialists sydney"
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

      /* PAGE */

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

      /* SERVICE */

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Apartment Renovations Sydney",
        serviceType: "Apartment Renovations",
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
          "Strata-compliant apartment renovations including kitchen renovations, bathroom upgrades and full apartment redesigns.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#apartment-renovation-business`,
        name: "Inhaus Living Apartment Renovations Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "Apartment Renovations"
      },

      /* IMAGE GALLERY */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-apartment-renovations.jpg`,
        caption: "Luxury apartment renovation project in Sydney"
      },

      /* FAQ (POWERFUL FOR SEO) */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does an apartment renovation cost in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Apartment renovation costs in Sydney depend on the size, materials and scope of work. Kitchen or bathroom upgrades may start from mid-range budgets while full apartment renovations can vary depending on design and finishes."
            }
          },
          {
            "@type": "Question",
            name: "Do apartment renovations require strata approval?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most apartment renovations in Sydney require strata approval, especially when structural elements, plumbing or waterproofing are involved. Licensed renovation specialists ensure compliance with strata regulations."
            }
          },
          {
            "@type": "Question",
            name: "How long does an apartment renovation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Typical apartment renovations may take between a few weeks to several months depending on the complexity of the renovation and strata approval processes."
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
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="apartment-page">
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