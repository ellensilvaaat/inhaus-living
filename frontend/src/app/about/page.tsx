import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/About/Hero/Hero";
import AboutUsSection from "@/components/About/AboutUsSection/AboutUsSection";
import CounterSection from "@/components/About/CounterSection/CounterSection";
import WhyChooseUs from "@/components/About/DifferentialSection/DifferentialSection";
import TrustedPartners from "@/components/About/TrustedPartners/TrustedPartners";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/about";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "About Inhaus Living | 20+ Years of Luxury Renovations in Sydney & Canberra",

  description:
    "For over 20 years, Inhaus Living has delivered premium home, kitchen and bathroom renovations across Sydney and Canberra. Discover our story, expertise and commitment to craftsmanship.",

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
      "About Inhaus Living | Luxury Renovation Experts",
    description:
      "Meet the team behind Inhaus Living and discover over two decades of premium renovation excellence in Sydney and Canberra.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Inhaus Living renovation team",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "About Inhaus Living | Luxury Renovation Specialists",
    description:
      "Over 20 years delivering premium renovations across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      /* About Page */
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "About Inhaus Living",
        description:
          "Learn about Inhaus Living, a leading renovation and construction company serving Sydney and Canberra.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-AU",
      },

      /* Organization Reinforcement */
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
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
            name: "About",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="about-us">
        <Hero />
        <AboutUsSection />
        <CounterSection />
        <WhyChooseUs />
        <TrustedPartners />
      </div>
    </>
  );
}