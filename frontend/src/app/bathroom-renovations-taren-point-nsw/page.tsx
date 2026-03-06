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
const pagePath = "/bathroom-renovations-taren-point-nsw";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Bathroom Renovations Taren Point | Luxury Bathroom Renovators | Inhaus Living",

  description:
    "Premium bathroom renovations in Taren Point by licensed builders with 20+ years experience. Custom bathroom design, waterproofing compliance and luxury finishes.",

  keywords: [
  "bathroom renovations Taren Point",
  "bathroom renovation company Taren Point",
  "luxury bathroom renovations Taren Point",
  "bathroom remodeling Taren Point",
  "bathroom renovation builder Taren Point",
  "custom bathroom renovation Taren Point",
  "bathroom renovation specialists Taren Point",
  "bathroom design and renovation Taren Point",
  "bathroom renovation contractors Taren Point",
  "modern bathroom renovations Taren Point",
  "high end bathroom renovation Taren Point",
  "small bathroom renovation Taren Point",
  "ensuite renovation Taren Point",
  "bathroom renovation experts Taren Point",
  "bathroom renovation services Taren Point",
  "luxury bathroom design Taren Point",
  "bathroom refurbishment Taren Point",
  "bathroom remodel contractors Taren Point",
  "bathroom renovation builders Taren Point",
  "premium bathroom renovations Taren Point"
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
      "Luxury Bathroom Renovations Taren Point | Trusted Renovation Specialists",
    description:
      "Design-led bathroom renovations across Taren Point. Fully licensed builders delivering waterproof-compliant, high-end bathroom transformations.",
    url: pageUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-bathroom-renovations.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury bathroom renovation in Taren Point by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Bathroom Renovations Taren Point | Bathroom Builders",
    description:
      "Transform your bathroom with Taren Point’s trusted renovation specialists.",
    images: [`${siteUrl}/og-bathroom-renovations.jpg`],
  },

  category: "Construction",
};

export default function BathroomRenovationsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      /* PAGE */

      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Bathroom Renovations Taren Point",
        description:
          "Luxury bathroom renovation services across Taren Point delivered by licensed renovation specialists.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* SERVICE */

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Bathroom Renovations Taren Point",
        serviceType: "Bathroom Renovations",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Taren Point",
        },
        serviceArea: {
          "@type": "AdministrativeArea",
          name: "New South Wales",
        },
        description:
          "Luxury bathroom renovations including waterproofing compliance, custom vanities, premium tiling and full design & build services.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Taren Point"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#bathroom-renovation-business`,
        name: "Inhaus Living Bathroom Renovations Taren Point",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Taren Point"
        },
        serviceType: "Bathroom Renovations"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-bathroom-renovations.jpg`,
        caption: "Luxury bathroom renovation project in Taren Point"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a bathroom renovation cost in Taren Point?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Bathroom renovation costs in Taren Point depend on layout changes, materials and finishes. Projects can range from mid-range updates to luxury custom bathrooms depending on the scope of work."
            }
          },
          {
            "@type": "Question",
            name: "How long does a bathroom renovation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most bathroom renovations take between 2 to 4 weeks depending on the complexity of plumbing, waterproofing, tiling and custom cabinetry."
            }
          },
          {
            "@type": "Question",
            name: "Do bathroom renovations require waterproofing certification?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes. Australian building regulations require compliant waterproofing systems for bathroom renovations to ensure long-term durability and protection against water damage."
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
            name: "Bathroom Renovations Taren Point",
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
        strategy="afterInteractive"
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