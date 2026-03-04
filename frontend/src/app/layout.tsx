import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ClientLayoutWrapper from "@/components/Layout/ClientLayoutWrapper";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";

const siteUrl = "https://inhaus-living.vercel.app";

/* ================= FONTS ================= */

const theSeasons = localFont({
  src: [
    {
      path: "../../public/fonts/Fontspring-DEMO-theseasons-bd.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-title",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-primary",
  display: "swap",
});

/* ================= METADATA ================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Inhaus Living | Luxury Renovations Sydney & Canberra",
    template: "%s | Inhaus Living",
  },

  description:
    "Inhaus Living delivers luxury home renovations, kitchen renovations, bathroom renovations, flooring installation and construction services across Sydney and Canberra.",

  keywords: [
    "luxury renovations Sydney",
    "home renovations Sydney",
    "kitchen renovations Sydney",
    "bathroom renovations Sydney",
    "apartment renovations Sydney",
    "flooring installation Sydney",
    "construction services Sydney",
    "home extensions Sydney",
    "luxury builders Sydney",
    "renovation company Sydney",
    "renovations Canberra",
    "home renovation Canberra",
  ],

  alternates: {
    canonical: siteUrl,
  },

  applicationName: "Inhaus Living",

  authors: [{ name: "Inhaus Living" }],
  creator: "Inhaus Living",
  publisher: "Inhaus Living",

  icons: {
    icon: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
    shortcut:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
    apple:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
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
    locale: "en_AU",
    url: siteUrl,
    siteName: "Inhaus Living",
    title: "Luxury Renovations in Sydney & Canberra",
    description:
      "Design-led renovation and construction services across Sydney and Canberra including kitchen, bathroom, apartment and full home renovations.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Inhaus Living Luxury Renovations",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Inhaus Living | Luxury Renovations Sydney",
    description:
      "Luxury renovation specialists delivering kitchen, bathroom and full home renovations across Sydney and Canberra.",
    images: [`${siteUrl}/og-image.jpg`],
  },

  verification: {
    google: "COLE_SEU_CODIGO_AQUI",
  },
};

/* ================= LAYOUT ================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [

      /* ORGANIZATION */

      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        logo: `${siteUrl}/og-image.jpg`,
        foundingDate: "2001",
        description:
          "Inhaus Living is a luxury renovation and construction company delivering design-led home transformations across Sydney and Canberra.",

        sameAs: [
          "https://www.instagram.com/inhaus_living/",
          "https://www.facebook.com/inhausliving.com.au/",
        ],
      },

      /* WEBSITE */

      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Inhaus Living",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-AU",
      },

      /* BUSINESS MAIN */

      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#business`,
        name: "Inhaus Living",
        url: siteUrl,
        image: `${siteUrl}/og-image.jpg`,
        priceRange: "$$$$",
        telephone: "+61296623509",
        email: "info@inhausliving.com.au",

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

        serviceType: [
          "Home Renovations",
          "Kitchen Renovations",
          "Bathroom Renovations",
          "Apartment Renovations",
          "Flooring Installation",
          "Home Construction",
          "Home Extensions",
        ],
      },

      /* LOCATION — MOORE PARK */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#moore-park`,
        name: "Inhaus Living Moore Park Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
        telephone: "+61296623509",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop 10/2A Todman Ave",
          addressLocality: "Kensington",
          addressRegion: "NSW",
          postalCode: "2033",
          addressCountry: "AU",
        },
      },

      /* LOCATION — TAREN POINT */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#taren-point`,
        name: "Inhaus Living Taren Point Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
        telephone: "+61283591679",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit 2/175 Taren Point Rd",
          addressLocality: "Caringbah",
          addressRegion: "NSW",
          postalCode: "2229",
          addressCountry: "AU",
        },
      },

      /* LOCATION — CANBERRA */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#canberra`,
        name: "Inhaus Living Canberra Showroom",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
        telephone: "+61261762807",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit 2/58 Wollongong St",
          addressLocality: "Fyshwick",
          addressRegion: "ACT",
          postalCode: "2609",
          addressCountry: "AU",
        },
      },

      /* SERVICES CATALOG */

      {
        "@type": "Service",
        "@id": `${siteUrl}/#services`,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        serviceType: [
          "Kitchen Renovations Sydney",
          "Bathroom Renovations Sydney",
          "Apartment Renovations Sydney",
          "Luxury Home Renovations Sydney",
          "Home Extensions Sydney",
          "Flooring Installation Sydney",
          "Construction Services Sydney",
        ],
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
      },
    ],
  };

  return (
    <html
      lang="en-AU"
      className={`${theSeasons.variable} ${beVietnam.variable}`}
    >
      <body>

        <Script
          id="global-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />

        <ClientLayoutWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientLayoutWrapper>

      </body>
    </html>
  );
}