import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Home/Hero/Hero";
import CardsSection from "@/components/Home/CardsSection/CardsSection";
import OurProcess from "@/components/Home/OurProcess/OurProcess";
import ProjectsCarousel from "@/components/Home/ProjectsCarousel/ProjectsCarousel";
import FeedbackSection from "@/components/Home/FeedbackSection/FeedbackSection";
import ReadySection from "@/components/Home/ReadySection/ReadySection";
import NewsletterPopup from "@/components/NewsletterPopup/NewsletterPopup";

const siteUrl = "https://inhaus-living.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Luxury Home Renovations Sydney & Canberra | Inhaus Living",

  description:
    "Luxury home renovations in Sydney and Canberra. Kitchen renovations, bathroom renovations, apartment upgrades and full home transformations delivered by the licensed design-build team at Inhaus Living.",

  keywords: [
    "home renovation sydney",
    "home renovation canberra",
    "kitchen renovation sydney",
    "bathroom renovation sydney",
    "apartment renovation sydney",
    "luxury renovations australia",
    "construction and renovation company sydney"
  ],

  alternates: {
    canonical: "/",
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
    url: siteUrl,
    siteName: "Inhaus Living",
    locale: "en_AU",
    title:
      "Luxury Home Renovations Sydney & Canberra | Inhaus Living",
    description:
      "Premium kitchen, bathroom and full home renovations across Sydney and Canberra.",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury home renovation by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Luxury Home Renovations Sydney & Canberra | Inhaus Living",
    description:
      "Premium kitchen, bathroom and full home renovations across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function HomePage() {

  const structuredData = {

    "@context": "https://schema.org",

    "@graph": [

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

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Inhaus Living",
        url: siteUrl,
        image: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
        description:
          "Design-build renovation and construction company delivering luxury home renovations across Sydney and Canberra.",
        areaServed: [
          {
            "@type": "City",
            name: "Sydney"
          },
          {
            "@type": "City",
            name: "Canberra"
          }
        ],
        priceRange: "$$$",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        }
      },

      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Inhaus Living",
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      },

      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#homepage`,
        url: siteUrl,
        name: "Luxury Home Renovations Sydney & Canberra",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        about: {
          "@id": `${siteUrl}/#services`
        }
      },

      {
        "@type": "OfferCatalog",
        "@id": `${siteUrl}/#services`,
        name: "Renovation Services",
        itemListElement: [

          {
            "@type": "Service",
            name: "Home Renovations",
            serviceType: "Full Home Renovation",
            areaServed: "Sydney & Canberra"
          },

          {
            "@type": "Service",
            name: "Apartment Renovations",
            serviceType: "Apartment Renovation",
            areaServed: "Sydney & Canberra"
          },

          {
            "@type": "Service",
            name: "Kitchen Renovations",
            serviceType: "Kitchen Renovation",
            areaServed: "Sydney & Canberra"
          },

          {
            "@type": "Service",
            name: "Bathroom Renovations",
            serviceType: "Bathroom Renovation",
            areaServed: "Sydney & Canberra"
          },

          {
            "@type": "Service",
            name: "Flooring Services",
            serviceType: "Floor Installation",
            areaServed: "Sydney & Canberra"
          },

          {
            "@type": "Service",
            name: "Construction & Additions",
            serviceType: "Home Construction",
            areaServed: "Sydney & Canberra"
          }

        ]
      },

      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Featured Renovation Projects",
        itemListElement: [
          {
            "@type": "CreativeWork",
            name: "Kitchen Renovation Project",
            creator: {
              "@id": `${siteUrl}/#organization`
            }
          },
          {
            "@type": "CreativeWork",
            name: "Bathroom Renovation Project",
            creator: {
              "@id": `${siteUrl}/#organization`
            }
          },
          {
            "@type": "CreativeWork",
            name: "Full Home Renovation Project",
            creator: {
              "@id": `${siteUrl}/#organization`
            }
          }
        ]
      },

      {
        "@type": "AggregateRating",
        "@id": `${siteUrl}/#reviews`,
        itemReviewed: {
          "@id": `${siteUrl}/#localbusiness`
        },
        ratingValue: "5",
        reviewCount: "120"
      },

      {
        "@type": "ContactAction",
        target: `${siteUrl}/contact`,
        name: "Request Renovation Consultation"
      }

    ]

  };

  return (
    <>
      <Script
        id="seo-schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="home">
        <Hero />
        <CardsSection />
        <OurProcess />
        <ProjectsCarousel />
        <FeedbackSection />
        <ReadySection />
        <NewsletterPopup />
      </div>
    </>
  );
}