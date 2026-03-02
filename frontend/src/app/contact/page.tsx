import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Contact/Hero/Hero";
import ContactPage from "@/components/Contact/ContactPage/ContactPage";

const siteUrl = "https://inhausliving.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Contact Inhaus Living | Luxury Renovations & Construction",
    template: "%s | Inhaus Living",
  },

  description:
    "Contact Inhaus Living for premium kitchen renovations, bathroom renovations, home extensions and luxury construction projects in Sydney and Canberra. Visit our showrooms or request a consultation today.",

  keywords: [
    "Inhaus Living contact",
    "luxury renovations Sydney",
    "kitchen renovation Sydney",
    "bathroom renovation Sydney",
    "home renovation Canberra",
    "construction company Australia",
    "Moore Park showroom",
    "Taren Point showroom",
    "Fyshwick showroom",
    "renovation consultation",
  ],

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    url: `${siteUrl}/contact`,
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
  return (
    <>
      {/* 🔥 STRUCTURED DATA - CONTACT PAGE + LOCAL BUSINESS */}
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Inhaus Living",
              url: `${siteUrl}/contact`,
              description:
                "Contact page for Inhaus Living renovation and construction services.",
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Inhaus Living",
              image: `${siteUrl}/og-contact.jpg`,
              url: siteUrl,
              telephone: "+61-2-9662-3509",
              email: "info@inhausliving.com.au",
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
              areaServed: [
                {
                  "@type": "Place",
                  name: "Sydney",
                },
                {
                  "@type": "Place",
                  name: "Canberra",
                },
              ],
              sameAs: [
                "https://www.instagram.com/inhausliving/",
                "https://www.facebook.com/inhausliving/",
              ],
            },
          ]),
        }}
      />

      <div className="contact">
        <Hero />
        <ContactPage />
      </div>
    </>
  );
}