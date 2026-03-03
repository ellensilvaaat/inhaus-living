import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Services/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection/ServicesSection";
import HowItWorks from "@/components/Services/HowItWorks/HowItWorks";
import ReadySection from "@/components/Home/ReadySection/ReadySection";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}/services/`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation And Construction Services Sydney & Canberra | Luxury Specialists",

  description:
    "Premium home renovation services in Sydney and Canberra. Kitchen renovations, bathroom remodels, flooring installation and full home transformations delivered with expert craftsmanship.",

  keywords: [
    "home renovation sydney",
    "kitchen renovation sydney",
    "bathroom renovation sydney",
    "home renovation canberra",
    "flooring installation sydney",
    "luxury renovations australia",
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Luxury Renovation Services | Inhaus Living",
    description:
      "Explore our complete renovation and construction services across Sydney and Canberra.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Inhaus Living Renovation Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Home Renovation Services | Inhaus Living",
    description:
      "Kitchen, bathroom and full home renovations across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* COLLECTION PAGE (HUB) */
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Renovation Services",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@type": "Thing",
          name: "Home Renovation Services in Sydney and Canberra",
        },
        inLanguage: "en-AU",
      },

      /* SERVICE PROVIDER */
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        serviceType: "Home Renovation and Construction",
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Sydney",
          },
          {
            "@type": "City",
            name: "Canberra",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Renovation Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Apartment Renovations Sydney",
                url: `${siteUrl}/apartment-renovations-sydney/`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home Renovations Sydney",
                url: `${siteUrl}/house-renovations-sydney/`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kitchen Renovations Sydney",
                url: `${siteUrl}/kitchen-renovations-sydney/`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Bathroom Renovations Sydney",
                url: `${siteUrl}/bathroom-renovations-sydney/`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Flooring Services Sydney",
                url: `${siteUrl}/flooring-services-sydney/`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home Construction Sydney",
                url: `${siteUrl}/home-construction-sydney/`,
              },
            },
          ],
        },
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
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="services-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="services">
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <ReadySection />
      </div>
    </>
  );
}