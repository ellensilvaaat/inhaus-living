import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Projects/Hero/Hero";
import ProjectsPage from "@/components/Projects/ProjectsPage/ProjectsPage";
import ReadySection from "@/components/Home/ReadySection/ReadySection";
import { projectsData } from "@/content/projects";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/projects";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Luxury Renovation Projects in Sydney & Canberra | Inhaus Living Portfolio",

  description:
    "Discover award-worthy luxury renovations across Sydney and Canberra. Explore our kitchen renovations, bathroom remodels, home extensions and full home transformations crafted by Inhaus Living.",

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
    title: "Luxury Renovation Portfolio | Sydney & Canberra Projects",
    description:
      "Browse our completed high-end renovation and construction projects across Sydney and Canberra. See the craftsmanship of Inhaus Living.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201",
        width: 1200,
        height: 630,
        alt: "Inhaus Living Luxury Renovation Projects",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Renovation Projects | Inhaus Living",
    description:
      "Explore premium kitchen, bathroom and full home renovation projects across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201",
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
      /* CollectionPage */
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Inhaus Living Renovation Projects",
        description:
          "Portfolio of luxury renovation projects across Sydney and Canberra.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@type": "Thing",
          name: "Luxury Home Renovations",
        },
        inLanguage: "en-AU",
      },

      /* ItemList (helps Google understand it’s a portfolio list) */
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name: "Renovation Projects",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projectsData.length,
        itemListElement: itemList,
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