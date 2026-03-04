import type { MetadataRoute } from "next";

const siteUrl = "https://inhaus-living.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: [
          "/",
          "/projects/",
          "/blog/",
          "/contact/",
          "/about/",
        ],

        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/tmp/",
          "/*.json$",
        ],
      },

      /* Allow Google full crawl */
      {
        userAgent: "Googlebot",
        allow: "/",
      },

      /* Allow Bing */
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],

    sitemap: [
      `${siteUrl}/sitemap.xml`,
    ],

    host: siteUrl,
  };
}