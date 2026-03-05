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
const pagePath = "/flooring-services-sydney";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Flooring Installation Sydney | Timber, Engineered & Hybrid Flooring Specialists | Inhaus Living",

  description:
    "Premium flooring installation in Sydney, NSW. Timber, engineered and hybrid floors installed by licensed specialists with precision craftsmanship.",

keywords: [
  "flooring installation sydney",
  "timber flooring sydney",
  "engineered flooring sydney",
  "hybrid flooring sydney",
  "flooring installation company sydney",
  "floor renovation sydney",
  "timber floor installers sydney",
  "flooring specialists sydney",
  "timber floor installation sydney",
  "engineered timber flooring sydney",
  "hybrid floor installation sydney",
  "wood flooring installation sydney",
  "floating floor installation sydney",
  "hardwood flooring sydney",
  "flooring contractors sydney",
  "luxury flooring installation sydney",
  "premium flooring sydney",
  "floor replacement sydney",
  "timber flooring installers sydney",
  "engineered wood flooring installers"
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

      /* PAGE */

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

      /* SERVICE */

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
        serviceArea: {
          "@type": "AdministrativeArea",
          name: "New South Wales",
        },
        description:
          "Professional timber, engineered and hybrid flooring installation including subfloor preparation and premium finishes across Sydney, NSW.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Sydney"
        }
      },

      /* LOCAL BUSINESS */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#flooring-installation-business`,
        name: "Inhaus Living Flooring Services Sydney",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: {
          "@type": "City",
          name: "Sydney"
        },
        serviceType: "Flooring Installation"
      },

      /* IMAGE */

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#gallery`,
        contentUrl: `${siteUrl}/og-flooring-services.jpg`,
        caption: "Premium timber flooring installation project in Sydney"
      },

      /* FAQ */

      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What flooring options are best for homes in Sydney?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Popular flooring options in Sydney include engineered timber, solid timber and hybrid flooring. These materials provide durability, moisture resistance and a premium aesthetic suitable for modern homes."
            }
          },
          {
            "@type": "Question",
            name: "How long does flooring installation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Most flooring installations take between one to three days depending on the floor area, preparation required and the type of flooring being installed."
            }
          },
          {
            "@type": "Question",
            name: "Do floors need preparation before installation?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes. Proper subfloor preparation ensures long-lasting performance. This may include leveling, moisture testing and removing old flooring before installing new timber, engineered or hybrid flooring."
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