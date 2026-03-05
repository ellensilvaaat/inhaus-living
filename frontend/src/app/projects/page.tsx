import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Projects/Hero/Hero";
import ProjectsPage from "@/components/Projects/ProjectsPage/ProjectsPage";
import ReadySection from "@/components/Home/ReadySection/ReadySection";
import { projectsData } from "@/content/projects";

const siteUrl = "https://inhaus-living.vercel.app";
const pagePath = "/projects";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation Projects in Sydney & Canberra | Inhaus Living Portfolio",

  description:
    "Explore luxury home renovation projects by Inhaus Living across Sydney and Canberra, including kitchens, bathrooms, apartments and full home transformations.",

 keywords: [
  "luxury renovation projects",
  "home renovation projects sydney",
  "home renovation projects canberra",
  "renovation portfolio sydney",
  "renovation portfolio canberra",
  "kitchen renovation projects",
  "bathroom renovation projects",
  "apartment renovation projects",
  "full home renovation projects",
  "home extension projects",
  "luxury home renovation portfolio",
  "completed renovation projects",
  "before and after home renovation",
  "design and build projects sydney",
  "custom home renovation projects",
  "luxury kitchen renovation projects",
  "luxury bathroom renovation projects",
  "apartment renovation portfolio sydney",
  "modern home renovation projects",
  "inhaus living projects"
],

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
      "Luxury Renovation Portfolio | Sydney & Canberra Projects | Inhaus Living",
    description:
      "Browse our portfolio of premium renovation projects across Sydney and Canberra.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury renovation portfolio by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Renovation Projects | Inhaus Living",
    description:
      "Explore premium renovation projects across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function Projects() {
  const itemList = projectsData.map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${siteUrl}/projects/${p.slug}`,
    name: p.title,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Inhaus Living Renovation Portfolio",
        description:
          "Portfolio of luxury renovation projects completed across Sydney and Canberra.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@type": "CreativeWorkSeries",
          name: "Luxury Renovation Projects",
        },
        mainEntity: {
          "@id": `${pageUrl}#portfolio`,
        },
        inLanguage: "en-AU",
      },

      {
        "@type": "CreativeWorkSeries",
        "@id": `${pageUrl}#portfolio`,
        name: "Inhaus Living Renovation Portfolio",
        creator: {
          "@id": `${siteUrl}/#organization`,
        },
      },

      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projectlist`,
        name: "Renovation Projects",
        numberOfItems: projectsData.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: itemList,
      },

      // Helps Google understand your regions / map coverage
      {
        "@type": "Place",
        "@id": `${pageUrl}#serviceareas`,
        name: "Sydney Renovation Areas",
        containsPlace: [
          { "@type": "Place", name: "Northern Beaches" },
          { "@type": "Place", name: "Eastern Suburbs" },
          { "@type": "Place", name: "Sutherland Shire" },
          { "@type": "Place", name: "Inner West" },
          { "@type": "Place", name: "Parramatta" },
          { "@type": "Place", name: "Western Sydney" },
          { "@type": "Place", name: "South Sydney" },
          { "@type": "Place", name: "Sydney City" },
          { "@type": "Place", name: "Outer West" },
          { "@type": "Place", name: "Lower North Shore" },
          { "@type": "Place", name: "Upper North Shore" },
          { "@type": "Place", name: "South West" },
        ],
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
            name: "Projects",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="projects">
        <Hero />
        <ProjectsPage />
        <ReadySection />
      </div>
    </>
  );
}