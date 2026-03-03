import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Services/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection/ServicesSection";
import HowItWorks from "@/components/Services/HowItWorks/HowItWorks";
import ReadySection from "@/components/Home/ReadySection/ReadySection";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}/services`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation & Construction Services Sydney & Canberra | Inhaus Living",

  description:
    "Premium home renovation services in Sydney and Canberra. Kitchen renovations, bathroom remodels, flooring installation and full home transformations delivered with expert craftsmanship.",

  alternates: {
    canonical: "/services",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title:
      "Luxury Home Renovation Services Sydney & Canberra | Inhaus Living",
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
    title:
      "Home Renovation Services Sydney & Canberra | Inhaus Living",
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
      /* COLLECTION PAGE */
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Renovation & Construction Services",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* PRIMARY SERVICE ENTITY */
      {
        "@type": "Service",
        "@id": `${pageUrl}#primaryservice`,
        name: "Home Renovation and Construction Services",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: [
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Canberra" }
        ],
        serviceType: "Residential Renovation & Construction",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Inhaus Living Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Apartment Renovations Sydney",
                url: `${siteUrl}/apartment-renovations-sydney`
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home Renovations Sydney",
                url: `${siteUrl}/house-renovations-sydney`
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kitchen Renovations Sydney",
                url: `${siteUrl}/kitchen-renovations-sydney`
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Bathroom Renovations Sydney",
                url: `${siteUrl}/bathroom-renovations-sydney`
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Flooring Services Sydney",
                url: `${siteUrl}/flooring-services-sydney`
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home Construction Sydney",
                url: `${siteUrl}/home-construction-sydney`
              }
            }
          ]
        }
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
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: pageUrl
          }
        ]
      }
    ]
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