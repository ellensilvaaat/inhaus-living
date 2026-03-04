import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Services/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection/ServicesSection";
import HowItWorks from "@/components/Services/HowItWorks/HowItWorks";
import ReadySection from "@/components/Home/ReadySection/ReadySection";

const siteUrl = "https://inhaus-living.vercel.app";
const pageUrl = `${siteUrl}/services`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation & Construction Services Sydney & Canberra | Inhaus Living",

  description:
    "Premium renovation services across Sydney and Canberra including kitchen renovations, bathroom renovations, apartment upgrades, flooring installation and full home transformations.",

  keywords: [
    "home renovation sydney",
    "kitchen renovation sydney",
    "bathroom renovation sydney",
    "apartment renovation sydney",
    "flooring installation sydney",
    "home construction sydney"
  ],

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

      /* WEBPAGE */

      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Renovation & Construction Services",
        description:
          "Explore the full range of renovation and construction services offered by Inhaus Living across Sydney and Canberra.",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        mainEntity: {
          "@id": `${pageUrl}#servicescatalog`
        }
      },

      /* WEBSITE */

      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Inhaus Living",
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      },

      /* ORGANIZATION */

      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`
        },
        sameAs: [
          "https://www.instagram.com/inhaus_living",
          "https://www.facebook.com/inhausliving.com.au"
        ]
      },

      /* LOCAL BUSINESS */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Inhaus Living",
        url: siteUrl,
        description:
          "Luxury renovation and construction company specialising in kitchens, bathrooms and full home transformations.",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: [
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Canberra" }
        ],
        priceRange: "$$$"
      },

      /* SERVICES CATALOG */

      {
        "@type": "OfferCatalog",
        "@id": `${pageUrl}#servicescatalog`,
        name: "Renovation and Construction Services",
        itemListElement: [

          {
            "@type": "Service",
            name: "Apartment Renovations Sydney",
            description:
              "Specialised apartment renovation services focused on spatial optimisation, strata compliance and premium material selections.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/apartment-renovations-sydney`
          },

          {
            "@type": "Service",
            name: "Home Renovations Sydney",
            description:
              "Full home transformations designed to improve layout, comfort and long-term property value.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/house-renovations-sydney`
          },

          {
            "@type": "Service",
            name: "Kitchen Renovations Sydney",
            description:
              "High-performance kitchens with custom joinery, intelligent layouts and seamless appliance integration.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/kitchen-renovations-sydney`
          },

          {
            "@type": "Service",
            name: "Bathroom Renovations Sydney",
            description:
              "Luxury bathroom renovations combining spa-level detailing with high-quality waterproofing systems.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/bathroom-renovations-sydney`
          },

          {
            "@type": "Service",
            name: "Flooring Services Sydney",
            description:
              "Supply and installation of premium flooring systems including timber, hybrid and parquetry.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/flooring-services-sydney`
          },

          {
            "@type": "Service",
            name: "Construction and Additions Sydney",
            description:
              "Structural alterations, home extensions and second-storey additions delivered by licensed builders.",
            provider: {
              "@id": `${siteUrl}/#organization`
            },
            areaServed: "Sydney",
            url: `${siteUrl}/home-construction-sydney`
          }

        ]
      },

      /* SERVICES LIST */

      {
        "@type": "ItemList",
        "@id": `${pageUrl}#serviceslist`,
        name: "Renovation Services",
        itemListElement: [

          {
            "@type": "ListItem",
            position: 1,
            url: `${siteUrl}/apartment-renovations-sydney`
          },

          {
            "@type": "ListItem",
            position: 2,
            url: `${siteUrl}/house-renovations-sydney`
          },

          {
            "@type": "ListItem",
            position: 3,
            url: `${siteUrl}/kitchen-renovations-sydney`
          },

          {
            "@type": "ListItem",
            position: 4,
            url: `${siteUrl}/bathroom-renovations-sydney`
          },

          {
            "@type": "ListItem",
            position: 5,
            url: `${siteUrl}/flooring-services-sydney`
          },

          {
            "@type": "ListItem",
            position: 6,
            url: `${siteUrl}/home-construction-sydney`
          }

        ]
      },

      /* HOW THE PROCESS WORKS */

      {
        "@type": "HowTo",
        "@id": `${pageUrl}#process`,
        name: "How the Renovation Process Works",
        step: [

          {
            "@type": "HowToStep",
            name: "Initial Consultation",
            text: "Discuss your renovation goals, design ideas and project scope with our team."
          },

          {
            "@type": "HowToStep",
            name: "Design and Planning",
            text: "Our team prepares layouts, materials and technical planning for your renovation."
          },

          {
            "@type": "HowToStep",
            name: "Construction",
            text: "Licensed builders execute the renovation with strict quality and safety standards."
          },

          {
            "@type": "HowToStep",
            name: "Project Completion",
            text: "Final detailing, inspections and handover of your newly renovated space."
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