import { notFound } from "next/navigation";
import { projectsData } from "@/content/projects";
import type { Metadata } from "next";
import Script from "next/script";
import ProjectDetail from "@/components/Projects/projectDetail/projectDetail";

interface Props {
  params: {
    slug: string;
  };
}

const siteUrl = "https://inhausliving.com.au";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

function createDescription(content: string) {
  const clean = content.replace(/<[^>]+>/g, "");
  return clean.length > 155 ? clean.slice(0, 152) + "..." : clean;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const project = projectsData.find(
    (p) => p.slug === params.slug
  );

  if (!project) {
    return {
      title: "Project Not Found | Inhaus Living",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/projects/${project.slug}`;
  const description = createDescription(project.content);

  return {
    metadataBase: new URL(siteUrl),

    title: `${project.title} | Luxury Renovation Project | Inhaus Living`,

    description,

    alternates: {
      canonical: url,
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
          alt: project.title,
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

export default function ProjectPage({ params }: Props) {
  const project = projectsData.find(
    (p) => p.slug === params.slug
  );

  if (!project) return notFound();

  const url = `${siteUrl}/projects/${project.slug}`;
  const description = createDescription(project.content);

  const structuredData = [
    // 🔥 Article Schema
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: project.title,
      description,
      image: project.heroImage,
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
      mainEntityOfPage: url,
    },

    // 🔥 Breadcrumb Schema
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
        id="project-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="project-detail">
        <ProjectDetail slug={params.slug} />
      </div>
    </>
  );
}