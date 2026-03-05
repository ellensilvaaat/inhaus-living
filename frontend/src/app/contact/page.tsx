import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Contact/Hero/Hero";
import ContactPage from "@/components/Contact/ContactPage/ContactPage";

const siteUrl = "https://inhaus-living.vercel.app";
const pagePath = "/contact";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Contact Inhaus Living | Luxury Renovations & Construction",
    template: "%s | Inhaus Living",
  },

  description:
    "Contact Inhaus Living for premium kitchen, bathroom and home renovations in Sydney and Canberra. Book a consultation or visit our showroom.",

  keywords: [
    "contact renovation company Sydney",
    "Inhaus Living contact",
    "kitchen renovation Sydney consultation",
    "bathroom renovation Sydney contact",
    "home renovation builder Sydney contact",
    "renovation consultation Canberra",
    "luxury renovation company Sydney",
    "Inhaus Living showroom Sydney",
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
    title:
      "Contact Inhaus Living | Luxury Renovations & Construction Experts",
    description:
      "Speak with our renovation specialists in Sydney & Canberra. Book a consultation, visit our showrooms or start your project with Inhaus Living.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Inhaus Living Showrooms",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Contact Inhaus Living | Luxury Renovations & Construction Experts",
    description:
      "Get in touch with Inhaus Living for high-end renovations and construction projects.",
    images: [`${siteUrl}/og-contact.jpg`],
  },

  category: "Construction",
};

export default function Contact() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      /* CONTACT PAGE */

      {
        "@type": "ContactPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Contact Inhaus Living",
        description:
          "Contact page for Inhaus Living renovation and construction services.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* ORGANIZATION */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        image: `${siteUrl}/og-contact.jpg`,
        email: "info@inhausliving.com.au",
        priceRange: "$$$$",

        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+61-2-9662-3509",
          contactType: "customer service",
          areaServed: "AU",
          availableLanguage: "English",
        },

        sameAs: [
          "https://www.instagram.com/inhaus_living",
          "https://www.facebook.com/inhausliving.com.au"
        ],
      },

      /* LOCATION 1 — MOORE PARK */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#moore-park`,
        name: "Inhaus Living Moore Park Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop 10/2A Todman Ave",
          addressLocality: "Kensington",
          addressRegion: "NSW",
          postalCode: "2033",
          addressCountry: "AU",
        },
        telephone: "+61-2-9662-3509"
      },

      /* LOCATION 2 — TAREN POINT */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#taren-point`,
        name: "Inhaus Living Taren Point Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "2/175 Taren Point Rd",
          addressLocality: "Caringbah",
          addressRegion: "NSW",
          postalCode: "2229",
          addressCountry: "AU",
        },
        telephone: "+61-2-8359-1679"
      },

      /* LOCATION 3 — FYSHWICK */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#fyshwick`,
        name: "Inhaus Living Fyshwick Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit 2/58 Wollongong St",
          addressLocality: "Fyshwick",
          addressRegion: "ACT",
          postalCode: "2609",
          addressCountry: "AU",
        },
        telephone: "+61-2-6176-2807"
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
            name: "Contact",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="contact">
        <Hero />
        <ContactPage />
      </div>
    </>
  );
}