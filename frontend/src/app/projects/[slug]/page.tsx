import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

import { projectsData } from "@/content/projects";
import ProjectDetail from "@/components/Projects/projectDetail/projectDetail";

const siteUrl = "https://inhausliving.com.au";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ================= STATIC PARAMS ================= */

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

/* ================= SEO HELPERS ================= */

function detectServiceType(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("bathroom")) return "Bathroom Renovation";
  if (s.includes("kitchen")) return "Kitchen Renovation";
  if (s.includes("apartment")) return "Apartment Renovation";
  if (s.includes("full")) return "Full Home Renovation";
  if (s.includes("extension")) return "Home Extension";
  if (s.includes("duplex")) return "Duplex Construction";
  return "Luxury Renovation";
}

function detectLocation(slug: string) {
  const parts = slug.split("-");
  const last = parts[parts.length - 1] || "Sydney";
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function cleanContent(raw = "") {
  return raw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function buildDescription(title: string, slug: string, content: string) {
  const service = detectServiceType(slug);
  const location = detectLocation(slug);

  const snippet = cleanContent(content).slice(0, 140);
  const base = `${service} project in ${location}. ${snippet}`;

  return base.length > 155 ? base.slice(0, 152) + "..." : base;
}

/* ================= METADATA ================= */

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Inhaus Living",
      robots: { index: false, follow: false },
    };
  }

  const service = detectServiceType(slug);
  const location = detectLocation(slug);
  const description = buildDescription(
    project.title,
    slug,
    project.content
  );

  const pagePath = `/projects/${slug}`;
  const url = `${siteUrl}${pagePath}`;

  return {
    metadataBase: new URL(siteUrl),

    title: `${project.title} | ${service} in ${location} | Inhaus Living`,

    description,

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
      type: "article",
      url,
      title: project.title,
      description,
      siteName: "Inhaus Living",
      locale: "en_AU",
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Inhaus Living`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.heroImage],
    },
  };
}

/* ================= PAGE ================= */

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  const service = detectServiceType(slug);
  const location = detectLocation(slug);

  const pageUrl = `${siteUrl}/projects/${slug}`;
  const plainDescription = buildDescription(
    project.title,
    slug,
    project.content
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: project.title,
        description: plainDescription,
        image: [project.heroImage],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
        },
        author: {
          "@id": `${siteUrl}/#organization`,
        },
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.title,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service,
        serviceType: service,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "Place",
          name: location,
        },
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
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="project-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ProjectDetail slug={slug} />
    </>
  );
}