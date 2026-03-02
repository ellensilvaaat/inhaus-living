import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Projects/Hero/Hero";
import ProjectsPage from "@/components/Projects/ProjectsPage/ProjectsPage";
import ReadySection from "@/components/Home/ReadySection/ReadySection";

const siteUrl = "https://inhausliving.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Luxury Renovation Projects in Sydney & Canberra | Inhaus Living Portfolio",
    template: "%s | Inhaus Living",
  },

  description:
    "Discover award-worthy luxury renovations across Sydney and Canberra. Explore our kitchen renovations, bathroom remodels, home extensions and full home transformations crafted by Inhaus Living.",

  keywords: [
    "luxury renovation sydney",
    "kitchen renovation sydney",
    "bathroom renovation canberra",
    "high end home renovation australia",
    "home extension sydney",
    "custom renovation projects",
  ],

  alternates: {
    canonical: "/projects",
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
    url: `${siteUrl}/projects`,
    title:
      "Luxury Renovation Portfolio | Sydney & Canberra Projects",
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
    title:
      "Luxury Renovation Projects | Inhaus Living",
    description:
      "Explore premium kitchen, bathroom and full home renovation projects across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?updatedAt=1767744534201",
    ],
  },

  category: "Construction",
};

export default function Projects() {
  return (
    <>
      {/* 🔥 STRUCTURED DATA - COLLECTION PAGE */}
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Inhaus Living Renovation Projects",
            url: `${siteUrl}/projects`,
            description:
              "Portfolio of luxury renovation projects across Sydney and Canberra.",
            isPartOf: {
              "@type": "WebSite",
              name: "Inhaus Living",
              url: siteUrl,
            },
            about: {
              "@type": "Thing",
              name: "Luxury Home Renovations",
            },
          }),
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