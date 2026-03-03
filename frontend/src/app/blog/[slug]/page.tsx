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

const siteUrl = "https://inhausliving.com.au";

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

    title: `${post.title} | Renovation Insights Sydney | Inhaus Living`,

    description: post.description,

    keywords: [
      "Luxury Renovation Sydney",
      "Home Renovation Tips Australia",
      "Kitchen Renovation Guide",
      "Bathroom Renovation Advice",
      post.title,
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

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: post.heroImage,
      datePublished: post.date,
      dateModified: post.date,
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
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
  ];

  return (
    <>
      <Script
        id="blogpost-jsonld"
        type="application/ld+json"
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