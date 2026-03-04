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
const pagePath = "/bathroom-renovations-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Bathroom Renovations Sydney | Luxury Bathroom Renovators | Inhaus Living",

  description:
    "Premium bathroom renovations in Sydney by licensed and insured builders with over 20 years experience. Custom luxury bathroom design, waterproofing compliance and high-end finishes tailored to your home.",

  keywords: [
    "bathroom renovations sydney",
    "bathroom renovation company sydney",
    "luxury bathroom renovations sydney",
    "bathroom remodeling sydney",
    "bathroom renovation builder sydney",
    "custom bathroom renovation sydney",
    "bathroom renovation specialists sydney",
    "bathroom design and renovation sydney"
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

      /* PAGE */

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

      /* SERVICE */

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Bathroom Renovations Sydney",
        serviceType: "Bathroom Renovations",
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
          "Luxury bathroom renovations including waterproofing compliance, custom vanities, premium tiling and full design & build services.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#bathroom-renovation-business`,
        name: "Inhaus Living Bathroom Renovations Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "Bathroom Renovations"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-bathroom-renovations.jpg`,
        caption: "Luxury bathroom renovation project in Sydney"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a bathroom renovation cost in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Bathroom renovation costs in Sydney depend on layout changes, materials and finishes. Projects can range from mid-range updates to luxury custom bathrooms depending on the scope of work."
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