import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Home/Hero/Hero";
import CardsSection from "@/components/Home/CardsSection/CardsSection";
import OurProcess from "@/components/Home/OurProcess/OurProcess";
import ProjectsCarousel from "@/components/Home/ProjectsCarousel/ProjectsCarousel";
import FeedbackSection from "@/components/Home/FeedbackSection/FeedbackSection";
import ReadySection from "@/components/Home/ReadySection/ReadySection";
import NewsletterPopup from "@/components/NewsletterPopup/NewsletterPopup";

const siteUrl = "https://inhausliving.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Luxury Home Renovations Sydney & Canberra | Award-Winning Builders",

  description:
    "Award-winning luxury home renovations in Sydney and Canberra. Kitchen renovations, bathroom remodels, flooring and full home transformations delivered with expert craftsmanship.",

  keywords: [
    "luxury home renovations sydney",
    "home renovation canberra",
    "kitchen renovation sydney",
    "bathroom renovation sydney",
    "luxury builders sydney",
    "construction company canberra",
  ],

  alternates: {
    canonical: siteUrl,
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
      "Luxury Home Renovations in Sydney & Canberra | Inhaus Living",
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
      "Luxury Home Renovations Sydney & Canberra",
    description:
      "Award-winning renovation specialists delivering premium craftsmanship.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function HomePage() {
  const structuredData = [
    // 🔥 WEBPAGE (HOME)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/#homepage`,
      url: siteUrl,
      name: "Luxury Home Renovations Sydney & Canberra",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@type": "Thing",
        name: "Luxury Home Renovations",
      },
    },

    // 🔥 PRIMARY SERVICE ENTITY
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Luxury Home Renovations",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: [
        { "@type": "City", name: "Sydney" },
        { "@type": "City", name: "Canberra" },
      ],
      serviceType: "Home Renovation and Construction",
    },
  ];

  return (
    <>
      <Script
        id="homepage-structured-data"
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