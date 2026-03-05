import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Features from "./components/Features/Features";
import RenovationProcess from "./components/RenovationProcess/RenovationProcess";
import ContactForm from "./components/ContactForm/ContactForm";

const siteUrl = "https://inhaus-living.vercel.app";
const pagePath = "/kitchen-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Kitchen Renovations Sydney | Kitchen Renovators | Inhaus Living",

  description:
    "Premium kitchen renovations in Sydney by licensed builders with 20+ years experience. Custom luxury kitchens designed for performance and elegance.",

  keywords: [
  "kitchen renovations sydney",
  "kitchen renovation company sydney",
  "luxury kitchen renovations sydney",
  "kitchen remodeling sydney",
  "custom kitchen renovation sydney",
  "kitchen design and renovation sydney",
  "modern kitchen renovations sydney",
  "kitchen renovation specialists sydney",
  "kitchen renovation contractors sydney",
  "kitchen renovation builders sydney",
  "kitchen remodel sydney",
  "high end kitchen renovation sydney",
  "custom kitchen design sydney",
  "luxury kitchen design sydney",
  "kitchen refurbishment sydney",
  "premium kitchen renovations sydney",
  "open plan kitchen renovation sydney",
  "small kitchen renovation sydney",
  "kitchen upgrade sydney",
  "kitchen renovation experts sydney"
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      /* PAGE */

      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Kitchen Renovations Sydney",
        description:
          "Luxury kitchen renovation services across Sydney delivered by licensed renovation specialists.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* SERVICE */

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Kitchen Renovations Sydney",
        serviceType: "Kitchen Renovation & Design",
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
          "Luxury kitchen renovations including custom cabinetry, premium stone benchtops, European appliances and full kitchen redesigns.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#kitchen-renovation-business`,
        name: "Inhaus Living Kitchen Renovations Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "Kitchen Renovations"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-kitchen-renovations.jpg`,
        caption: "Luxury kitchen renovation project in Sydney"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a kitchen renovation cost in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Kitchen renovation costs in Sydney depend on size, materials and layout changes. Custom cabinetry, stone benchtops and premium appliances can influence the final project cost."
            }
          },
          {
            "@type": "Question",
            name: "How long does a kitchen renovation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most kitchen renovations take between three to six weeks depending on the complexity of the design, cabinetry manufacturing and installation stages."
            }
          },
          {
            "@type": "Question",
            name: "Do I need council approval for a kitchen renovation?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most kitchen renovations do not require council approval unless structural changes or plumbing modifications significantly alter the layout of the property."
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
            name: "Kitchen Renovations Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };

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