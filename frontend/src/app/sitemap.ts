import type { MetadataRoute } from "next";

import { services as coreServices } from "@/lib/serviceConfig";
import { services as bathroomServices } from "@/lib/bathroomConfig";

import { projectsData } from "@/content/projects/index";
import blogPosts from "@/content/posts/postsMeta.json";

const siteUrl = "https://www.inhausliving.com.au";

/* =========================
   SUBURBS USADOS APENAS EM ADS
========================= */

const adsOnlySuburbs = [
  "taren-point",
  "moore-park",
  "canberra"
];

/* =========================
   MERGE DAS CONFIGS
========================= */

const services = {
  ...coreServices,
  ...bathroomServices
};

export default function sitemap(): MetadataRoute.Sitemap {

  const now = new Date();

  const pages: MetadataRoute.Sitemap = [];

  const add = (
    path: string,
    priority: number,
    changeFrequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
  ) => {

    pages.push({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    });

  };

  /* =========================
     CORE
  ========================== */

  add("/", 1.0, "daily");

  [
    "/about/",
    "/services/",
    "/projects/",
    "/blog/",
    "/contact/"
  ].forEach((p) => add(p, 0.9, "monthly"));

  add("/privacy-policy/", 0.3, "yearly");

  /* =========================
     MAIN SERVICE PAGES
  ========================== */

  [
    "/house-renovations-sydney/",
    "/kitchen-renovations-sydney/",
    "/bathroom-renovations-sydney/",
    "/apartment-renovations-sydney/",
    "/flooring-services-sydney/",
    "/construction-additions-sydney/"
  ].forEach((p) => add(p, 0.95, "monthly"));

  /* =========================
     PROGRAMMATIC SERVICE PAGES
  ========================== */

  Object.entries(services).forEach(([serviceSlug, service]) => {

    service.suburbs
      .filter((suburb: string) => !adsOnlySuburbs.includes(suburb))
      .forEach((suburb: string) => {

        let path = "";

        switch (serviceSlug) {

          case "bathroom-renovations":
            path = `/bathroom-renovations/bathroom-renovations-${suburb}/`;
            break;

          case "apartment-renovation":
            path = `/apartment-renovation-${suburb}/`;
            break;

          case "kitchen-renovation":
            path = `/kitchen-renovation-${suburb}/`;
            break;

          case "flooring":
            path = `/flooring-${suburb}/`;
            break;

          case "home-renovation":
            path = `/home-renovation-${suburb}/`;
            break;

          case "home-extensions":
            path = `/home-extension-${suburb}/`;
            break;

          case "home-construction":
            path = `/home-construction-${suburb}/`;
            break;

          case "construction-additions":
            path = `/construction-additions-${suburb}/`;
            break;

          default:
            return;
        }

        add(path, 0.75, "monthly");

      });

  });

  /* =========================
     PROJECTS
  ========================== */

  projectsData.forEach((project: any) => {

    if (!project?.slug) return;

    add(`/projects/${project.slug}/`, 0.7, "yearly");

  });

  /* =========================
     BLOG POSTS
  ========================== */

  blogPosts.forEach((post: any) => {

    if (!post?.slug) return;

    pages.push({
      url: `${siteUrl}/blog/${post.slug}/`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "yearly",
      priority: 0.65,
    });

  });

  return pages;
}