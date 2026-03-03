import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Blog/Hero/Hero";
import BlogPage from "@/components/Blog/BlogPage/BlogPage";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/blog";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation Blog | Sydney & Canberra Experts | Inhaus Living",

  description:
    "Expert renovation insights for Sydney and Canberra homeowners. Discover renovation costs, kitchen design trends, bathroom upgrades and construction advice from industry professionals.",

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
      "Home Renovation Blog | Expert Advice from Inhaus Living",
    description:
      "Renovation insights, design inspiration and expert advice tailored for Sydney and Canberra homeowners.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Home renovation blog by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Home Renovation Blog | Inhaus Living",
    description:
      "Expert renovation advice, design trends and cost guides for Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function BlogPageRoute() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${pageUrl}#blog`,
        url: pageUrl,
        name: "Inhaus Living Renovation Blog",
        description:
          "Expert renovation insights for Sydney and Canberra homeowners.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Renovation Blog",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },
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
            name: "Blog",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="blog">
        <Hero />
        <BlogPage />
      </div>
    </>
  );
}