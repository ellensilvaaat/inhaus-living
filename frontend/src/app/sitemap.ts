import type { MetadataRoute } from "next";

const siteUrl = "https://inhaus-living.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const now = new Date();

  const build = (
    paths: string[],
    priority: number,
    changeFrequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
  ) =>
    paths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }));

  /* =========================
     CORE
  ========================== */

  const home = build(["/"], 1.0, "daily");

  const mainPages = build(
    [
      "/about/",
      "/services/",
      "/projects/",
      "/contact/",
      "/blog/",
    ],
    0.9,
    "weekly"
  );

  const legal = build(
    ["/privacy-policy/"],
    0.3,
    "yearly"
  );

  /* =========================
     MAIN SERVICE LPs
  ========================== */

  const coreServices = build(
    [
      "/house-renovations-sydney/",
      "/kitchen-renovations-sydney/",
      "/bathroom-renovations-sydney/",
      "/apartment-renovations-sydney/",
      "/flooring-services-sydney/",
      "/construction-additions-sydney/",
    ],
    0.95,
    "monthly"
  );

  /* =========================
     BATHROOM PROGRAMMATIC
  ========================== */

  const bathroomSuburbs = [
    "rushcutters-bay","arncliffe","matraville","botany","hillsdale",
    "eastgardens","rosebery","surry-hills","banksmeadow","waverley",
    "clovelly","chippendale","daceyville","paddington","camperdown",
    "maroubra","edgecliff","newtown","double-bay","sydney-cbd",
    "bondi","mascot","haymarket","woollahra","bronte",
    "darlinghurst","darlington","bellevue-hill","pagewood","st-peters",
    "malabar","eastlakes","beaconsfield","kensington","zetland",
    "alexandria","eveleigh","kingsford","erskineville","randwick",
    "waterloo","coogee","port-botany","centennial-park","bondi-beach",
    "tempe","green-square","south-coogee","redfern","queens-park",
    "bondi-junction","moore-park","canberra"
  ];

  const bathroomLPs = build(
    bathroomSuburbs.map(
      (s) => `/bathroom-renovations/bathroom-renovations-${s}/`
    ),
    0.8,
    "monthly"
  );

  /* =========================
     APARTMENT PROGRAMMATIC
  ========================== */

  const apartmentSuburbs = [
    "jannali","kangaroo-point","grays-point","como","kirrawee",
    "oyster-bay","port-hacking","dolans-bay","burraneer","cronulla",
    "sylvania-waters","sylvania","gymea-bay","gymea",
    "caringbah-south","yowie-bay","woolooware","canberra"
  ];

  const apartmentLPs = build(
    apartmentSuburbs.map(
      (s) => `/apartment-renovation-${s}/`
    ),
    0.8,
    "monthly"
  );

  /* =========================
     PROJECTS
  ========================== */

  const projects = [
    "apartment-renovation-bellevue-road-bellevue-hill",
    "brompton-road-kensington",
    "full-home-renovation-northcote-avenue-caringbah-south",
    "full-home-renovation-mccarrs-creek-road-church-point",
    "bathroom-renovation-woodward-st-coogee",
    "full-apartment-renovation-sutherland-cr-darling-point",
    "full-home-renovation-mermaid-avenue-maroubra",
    "lavender-street-milsons-point",
    "full-home-renovation-newport-beach",
    "terrace-renovation-elfred-street-paddington",
    "terrace-renovation-glenmore-road-paddington",
    "bathroom-and-kitchen-renovation-rosehill-street-redfern",
    "full-apartment-renovation-osullivan-st-rose-bay",
    "venetia-street-sylvania",
    "wallaroy-crescent-woollahra",
    "house-extension-paddington",
    "river-road-townhouse",
    "dillon-street-residence"
  ];

  const projectPages = build(
    projects.map((p) => `/projects/${p}/`),
    0.85,
    "yearly"
  );

  /* =========================
     BLOG POSTS
  ========================== */

  const blogPosts = [
    "7-interior-design-trends-fyshwick-homeowners-are-embracing-in-2025",
    "7-small-terrace-design-tips-we-recommend",
    "a-penny-saved-the-top-5-tips-for-budget-friendly-renovations",
    "apartment-living-is-the-new-australian-dream",
    "benefits-of-a-kitchen-renovation",
    "boost-your-propertys-worth-with-the-right-renovation-company-in-sydney",
    "breath-fresh-life-into-your-kitchen-sydney-makeover-tips",
    "case-study-renovating-a-two-story-home-on-venetia-st-sylvania",
    "cracking-the-code-how-to-budget-for-a-sydney-home-renovation",
    "discover-the-pros-and-cons-of-l-shaped-kitchens-for-kitchen-renovations-in-sydney",
    "do-this-15-point-checklist-before-starting-your-bathroom-renovation-in-sydney",
    "do-you-want-to-upgrade-your-kitchen-explore-these-makeover-ideas",
    "does-a-bathroom-renovation-increase-the-value-of-my-sydney-home",
    "embarking-on-a-home-renovation-in-sydney-heres-your-10-point-checklist",
    "estimating-cost-and-duration-a-comprehensive-guide-to-kitchen-renovation-in-sydney",
    "how-interior-design-services-are-transforming-fyshwick-apartments",
    "how-long-does-a-bathroom-renovation-take-in-sydney",
    "how-new-flooring-installed-by-professional-flooring-installation-services-in-sydney-can-enhance-your-home",
    "how-to-find-the-right-custom-home-builder-in-sydney",
    "how-to-incorporate-biophilic-design-in-renovations",
    "how-to-integrate-smart-home-technology-into-your-kitchen",
    "how-to-maximise-space-in-a-small-sydney-apartment-without-losing-style",
    "how-to-plan-your-kitchen-renovation-in-sydney",
    "how-to-remodel-your-bathroom-without-breaking-the-bank-in-sydney-2024",
    "how-to-soundproof-your-home-a-comprehensive-guide",
    "inside-an-inhaus-living-design-consultation-what-fyshwick-homeowners-can-expect",
    "is-it-better-to-replace-or-refinish-your-existing-flooring",
    "kitchen-renovation-checklist-in-sydney-a-guide-by-inhaus-living",
    "luxury-home-design-trends-your-home-renovations-clients-will-love-in-2024",
    "luxury-meets-functionality-how-to-design-a-high-end-practical-home",
    "professional-vs-diy-renovations-which-ones-right-for-you",
    "renovation-tips-steer-clear-of-these-5-common-mistakes",
    "simple-renovation-tips-for-a-brighter-home",
    "stretch-your-dollar-budgeting-renovation-for-maximum-savings",
    "sydneysiders-purchasing-apartments-over-houses",
    "tackling-unexpected-home-renovation-problems",
    "the-best-flooring-options-for-sydney-homeowners",
    "the-perks-unveiled-benefits-of-home-renovations-in-sydney",
    "the-top-benefits-of-heated-flooring-in-your-bathroom",
    "the-ultimate-guide-to-canberra-home-renovations",
    "things-you-should-consider-before-renovating-your-bathroom-in-sydney-2023",
    "top-2025-home-design-trends-in-sydney",
    "top-9-considerations-in-implementing-a-comprehensive-renovation-project-for-your-home",
    "top-kitchen-renovation-ideas",
    "top-questions-to-ask-your-sydney-home-renovation-builder",
    "transform-your-sydney-home-with-expert-renovation-and-construction-services",
    "ultimate-checklist-for-choosing-a-kitchen-remodeling-contractor",
    "unveiling-luxury-your-guide-to-bathroom-renovations-in-sydney",
    "visiting-showroom-renovation",
    "what-role-does-a-dedicated-project-manager-play-in-a-successful-renovation",
    "why-choose-professional-flooring-installation-in-canberra-top-benefits-explained",
    "why-inhaus-living-is-fyshwicks-go-to-team-for-kitchen-renovations",
    "why-inhaus-living-is-your-ideal-choice-for-home-renovations-in-sydney",
    "why-is-visiting-a-showroom-important-before-starting-a-renovation",
    "why-should-you-work-with-a-fully-licensed-class-2-builder",
    "why-your-canberra-home-deserves-professional-renovation",
    "your-guide-to-luxury-kitchen-remodelling-makeover-tips-that-wont-cost-a-fortune"
  ];

  const blogPages = build(
    blogPosts.map((b) => `/blog/${b}/`),
    0.7,
    "yearly"
  );

  return [
    ...home,
    ...mainPages,
    ...coreServices,
    ...legal,
    ...bathroomLPs,
    ...apartmentLPs,
    ...projectPages,
    ...blogPages,
  ];
}