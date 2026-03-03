import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Contact/Hero/Hero";
import ContactPage from "@/components/Contact/ContactPage/ContactPage";

const siteUrl = "https://inhausliving.com.au";
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
    "Contact Inhaus Living for premium kitchen renovations, bathroom renovations, home extensions and luxury construction projects in Sydney and Canberra. Visit our showrooms or request a consultation today.",

  alternates: {
    canonical: pagePath,
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
      /* WebPage */
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

      /* Organization (connected globally) */
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        image: `${siteUrl}/og-contact.jpg`,
        telephone: "+61296623509",
        email: "info@inhausliving.com.au",
        priceRange: "$$$$",
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
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "Shop 10/2A Todman Ave",
            addressLocality: "Kensington",
            addressRegion: "NSW",
            postalCode: "2033",
            addressCountry: "AU",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "2/175 Taren Point Rd",
            addressLocality: "Caringbah",
            addressRegion: "NSW",
            postalCode: "2229",
            addressCountry: "AU",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Unit 2/58 Wollongong St",
            addressLocality: "Fyshwick",
            addressRegion: "ACT",
            postalCode: "2609",
            addressCountry: "AU",
          },
        ],
        sameAs: [
          "https://www.instagram.com/inhausliving/",
          "https://www.facebook.com/inhausliving/",
        ],
      },

      /* Breadcrumb */
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