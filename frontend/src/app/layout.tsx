import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ClientLayoutWrapper from "@/components/Layout/ClientLayoutWrapper";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";

const siteUrl = "https://inhausliving.com.au";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Inhaus Living | Luxury Renovations Sydney & Canberra",
    template: "%s | Inhaus Living",
  },

  description:
    "Inhaus Living specializes in luxury home, kitchen and bathroom renovations, flooring and construction services across Sydney and Canberra.",

  alternates: {
    canonical: siteUrl,
  },

  applicationName: "Inhaus Living",

  authors: [{ name: "Inhaus Living" }],
  creator: "Inhaus Living",
  publisher: "Inhaus Living",

  icons: {
  icon: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
  shortcut: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
  apple: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/favicon.png?updatedAt=1767487361967",
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
      "Design-led renovation and construction services delivered across Sydney and Canberra.",
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
    title: "Inhaus Living | Luxury Renovations",
    description:
      "Luxury renovation specialists in Sydney and Canberra.",
    images: [`${siteUrl}/og-image.jpg`],
  },

  verification: {
    google: "COLE_SEU_CODIGO_AQUI", // 🔥 coloque o código do Search Console
  },
};

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
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.jpg`,
        },
        foundingDate: "2001",
        description:
          "Design-led luxury renovation and construction company operating across Sydney and Canberra.",
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
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#moore-park`,
        name: "Inhaus Living Moore Park Showroom",
        url: siteUrl,
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
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#taren-point`,
        name: "Inhaus Living Taren Point Showroom",
        url: siteUrl,
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
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#canberra`,
        name: "Inhaus Living Canberra Showroom",
        url: siteUrl,
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