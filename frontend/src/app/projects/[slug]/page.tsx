import { notFound } from "next/navigation";
import { projectsData } from "@/content/projects";
import type { Metadata } from "next";
import Script from "next/script";
import ProjectDetail from "@/components/Projects/projectDetail/projectDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const siteUrl = "https://inhausliving.com.au";

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
  const last = parts[parts.length - 1];
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function cleanContent(raw = "") {
  return raw.replace(/<[^>]+>/g, "").trim();
}

function buildDescription(
  title: string,
  slug: string,
  content: string
) {
  const service = detectServiceType(slug);
  const location = detectLocation(slug);

  const base =
    `${service} in ${location}, Sydney. ` +
    cleanContent(content).slice(0, 120);

  return base.length > 155
    ? base.slice(0, 152) + "..."
    : base;
}

/* ================= METADATA ================= */

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const project = projectsData.find(
    (p) => p.slug === slug
  );

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

  const url = `${siteUrl}/projects/${slug}`;

  return {
    metadataBase: new URL(siteUrl),

    title: `${project.title} | Luxury ${service} in ${location} | Inhaus Living`,

    description,

    keywords: [
      `${service} ${location}`,
      `Luxury ${service} Sydney`,
      "High End Renovation Sydney",
      "Premium Home Renovation Australia",
      project.title,
    ],

    alternates: { canonical: url },

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

export default async function ProjectPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = projectsData.find(
    (p) => p.slug === slug
  );

  if (!project) {
    notFound();
  }

  const service = detectServiceType(slug);
  const location = detectLocation(slug);
  const url = `${siteUrl}/projects/${slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: project.title,
      description: cleanContent(project.content).slice(0, 160),
      image: project.heroImage,
      mainEntityOfPage: url,
      author: {
        "@type": "Organization",
        name: "Inhaus Living",
      },
      publisher: {
        "@type": "Organization",
        name: "Inhaus Living",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service,
      areaServed: {
        "@type": "Place",
        name: location,
      },
      provider: {
        "@type": "Organization",
        name: "Inhaus Living",
        url: siteUrl,
      },
    },

    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
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
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="project-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ProjectDetail slug={slug} />
    </>
  );
}