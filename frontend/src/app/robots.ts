import type { MetadataRoute } from "next";

const siteUrl = "https://inhausliving.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,

    host: siteUrl,
  };
}