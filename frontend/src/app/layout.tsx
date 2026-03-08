import "./globals.css";
import ClientLayoutWrapper from "@/components/Layout/ClientLayoutWrapper";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";

const siteUrl = "https://www.inhausliving.com.au";

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
    default: "Inhaus Living | Renovations Sydney & Canberra",
    template: "%s | Inhaus Living",
  },

  description:
    "Inhaus Living delivers premium home, kitchen and bathroom renovations, flooring installation and construction services across Sydney and Canberra.",

  keywords: [
    "luxury renovations sydney",
    "home renovations sydney",
    "kitchen renovations sydney",
    "bathroom renovations sydney",
    "apartment renovations sydney",
    "flooring installation sydney",
    "construction services sydney",
    "home extensions sydney",
    "luxury builders sydney",
    "renovation company sydney",
    "renovations canberra",
    "home renovation canberra",
    "design and build company sydney",
    "premium home renovations sydney",
    "high end renovations sydney",
    "custom home renovations sydney",
    "home renovation specialists sydney",
    "residential construction sydney",
    "luxury home builders sydney",
    "complete home renovation sydney",
    "full service renovation company",
    "design led renovation sydney",
    "modern home renovations sydney",
    "home transformation sydney",
    "premium renovation company australia",
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
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Canberra" },
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
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Canberra" },
        ],
      },
    ],
  };

  return (
    <html
      lang="en-AU"
      className={`${theSeasons.variable} ${beVietnam.variable}`}
    >
      <head>
        <Script
          id="facebook-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '517158583507495');
fbq('track', 'PageView');
`,
          }}
        />

        <Script
          id="google-maps-places"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </head>

      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=517158583507495&ev=PageView&noscript=1"
          />
        </noscript>

        {/* GOOGLE TAG MANAGER NOSCRIPT */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXGF3XC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* GOOGLE TAG MANAGER SCRIPT */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id=GTM-TXGF3XC'+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXGF3XC');`,
          }}
        />

        <Script
          id="global-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />

        <ClientLayoutWrapper>
          <main>{children}</main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}