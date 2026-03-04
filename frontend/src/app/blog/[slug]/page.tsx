import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import Script from "next/script";
import postsMeta from "@/content/posts/postsMeta.json";
import BlogPost from "@/components/Blog/BlogPost/BlogPost";

interface PostMeta {
  id: number;
  title: string;
  description: string;
  date: string;
  heroImage: string;
  slug: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const siteUrl = "https://inhaus-living.vercel.app";

/* ================= STATIC PARAMS ================= */

export function generateStaticParams() {
  return (postsMeta as PostMeta[]).map((post) => ({
    slug: post.slug,
  }));
}

/* ================= METADATA ================= */

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const post = (postsMeta as PostMeta[]).find(
    (p) => p.slug === slug
  );

  if (!post) {
    return {
      title: "Article Not Found | Inhaus Living",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/blog/${slug}`;

  return {
    metadataBase: new URL(siteUrl),

    title: `${post.title} | Inhaus Living Blog`,

    description: post.description,

    keywords: [
      "home renovation blog",
      "Sydney renovation tips",
      "bathroom renovation Sydney",
      "kitchen renovation Sydney",
      "home renovation advice",
      "construction tips Australia",
      "Inhaus Living renovation blog"
    ],

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
      title: post.title,
      description: post.description,
      siteName: "Inhaus Living",
      locale: "en_AU",
      publishedTime: post.date,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.heroImage],
    },

    category: "Construction",
  };
}

/* ================= PAGE ================= */

export default async function BlogSlugPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const post = (postsMeta as PostMeta[]).find(
    (p) => p.slug === slug
  );

  if (!post) return notFound();

  const filePath = path.join(
    process.cwd(),
    "src/content/posts",
    `${slug}.md`
  );

  let content = "";

  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    return notFound();
  }

  const url = `${siteUrl}/blog/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      /* BLOG POST */

      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: {
          "@type": "ImageObject",
          url: post.heroImage,
          width: 1200,
          height: 630
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
        },
        author: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Inhaus Living"
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Inhaus Living",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`
          }
        },
        articleSection: "Home Renovation",
        keywords: [
          "home renovation",
          "kitchen renovation",
          "bathroom renovation",
          "Sydney renovation",
          "construction tips",
          "home improvement"
        ]
      },

      /* WEBPAGE */

      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: post.title,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      /* BREADCRUMB */

      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
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
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },

    ],
  };

  return (
    <>
      <Script
        id="blogpost-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="blog-post">
        <BlogPost slug={slug} content={content} />
      </div>
    </>
  );
}