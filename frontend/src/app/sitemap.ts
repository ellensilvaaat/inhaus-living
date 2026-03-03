import type { MetadataRoute } from "next";

const siteUrl = "https://www.inhausliving.com.au";

type ChangeFreq = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/contact",
    "/privacy-policy",
  ];

  const servicePages = [
    "/services/house-renovations-sydney",
    "/services/kitchen-renovations-sydney",
    "/services/bathroom-renovations-sydney",
    "/services/apartment-renovations-sydney",
    "/services/flooring-services-sydney",
    "/services/construction-additions-sydney",
  ];

  const bathroomLPs = [
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
    "bondi-junction","moore-park"
  ];

  const apartmentLPs = [
    "jannali","kangaroo-point","grays-point","como","kirrawee",
    "oyster-bay","port-hacking","dolans-bay","burraneer","cronulla",
    "sylvania-waters","sylvania","gymea-bay","gymea","caringbah-south",
    "yowie-bay","woolooware","narrabundah","kingston","campbell"
  ];

  const projects = [
    "bathroom-and-kitchen-renovation-sagars-road-dural",
    "full-home-renovation-northcote-avenue-caringbah-south",
    "apartment-renovation-bellevue-road-bellevue-hill",
    "terrace-renovation-elfred-street-paddington",
    "duplex-clareville-ave-duplex-1-sandringham",
    "ocean-st-woollahra",
    "lavender-street-milsons-point",
    "apartment-renovation-maclaey-street-elizabeth-bay",
    "terrace-renovation-glenmore-road-paddington",
    "brompton-road-kensington",
    "full-apartment-renovation-sutherland-cr-darling-point",
    "bathroom-and-kitchen-renovation-new-beach-road-darling-point",
    "full-home-renovation-newport-beach",
    "clareville-ave-duplex-2-sandringham",
    "bathroom-and-kitchen-renovation-rosehill-street-redfern",
    "bathroom-renovation-woodward-st-coogee",
    "wallaroy-crescent-woollahra",
    "full-apartment-renovation-osullivan-st-rose-bay",
    "full-home-renovation-mccarrs-creek-road-church-point",
    "full-home-renovation-mermaid-avenue-maroubra",
    "venetia-street-sylvania",
  ];

  const blogPosts = [
    "why-should-you-work-with-a-fully-licensed-class-2-builder",
    "how-to-integrate-smart-home-technology-into-your-kitchen",
    "is-it-better-to-replace-or-refinish-your-existing-flooring",
    "inside-an-inhaus-living-design-consultation-what-fyshwick-homeowners-can-expect",
    "how-to-maximise-space-in-a-small-sydney-apartment-without-losing-style",
    "the-surprising-benefits-of-a-bathroom-renovation-why-upgrading-your-space-is-more-than-just-aesthetics",
    "discover-the-pros-and-cons-of-l-shaped-kitchens-for-kitchen-renovations-in-sydney",
    "luxurious-retreats-designing-homes-for-ultimate-comfort-and-serenity",
    "estimating-cost-and-duration-guide-to-kitchen-renovation-in-sydney",
    "top-9-considerations-in-implementing-a-comprehensive-renovation-project-for-your-home",
    "how-to-find-the-right-custom-home-builder-in-sydney",
    "apartment-living-is-the-new-australian-dream",
    "15-point-checklist-before-starting-your-bathroom-renovation-in-sydney",
    "how-to-plan-your-kitchen-renovation-in-sydney",
    "how-long-does-a-bathroom-renovation-take-in-sydney",
    "sydneysiders-purchasing-apartments-over-houses",
    "how-new-flooring-installed-by-professional-flooring-installation-services-in-sydney-can-enhance-your-home",
    "kitchen-renovation-checklist-in-sydney-a-guide-by-inhaus-living",
    "luxury-home-design-trends-your-home-renovations-clients-will-love-in-2024",
    "top-questions-to-ask-your-sydney-home-renovation-builder",
    "top-kitchen-renovation-ideas",
    "ultimate-checklist-for-choosing-a-kitchen-remodeling-contractor",
    "do-you-want-to-upgrade-your-kitchen-explore-these-makeover-ideas",
    "unveiling-luxury-your-guide-to-bathroom-renovations-in-sydney",
    "benefits-of-a-kitchen-renovation",
    "things-you-should-consider-before-renovating-your-bathroom-in-sydney",
    "embarking-on-a-home-renovation-in-sydney-heres-your-10-point-checklist",
    "transform-your-sydney-home-with-expert-renovation-and-construction-services",
    "how-to-choose-a-builder-for-a-renovation-in-sydney",
    "how-to-remodel-your-bathroom-without-breaking-the-bank-in-sydney-2024",
    "does-a-bathroom-renovation-increase-the-value-of-my-sydney-home",
    "how-to-incorporate-biophilic-design-in-renovations",
    "why-is-visiting-a-showroom-important-before-starting-a-renovation",
    "how-interior-design-services-are-transforming-fyshwick-apartments",
    "what-role-does-a-dedicated-project-manager-play-in-a-successful-renovation",
    "7-small-terrace-design-tips-we-recommend",
    "cracking-the-code-how-to-budget-for-a-sydney-home-renovation",
    "why-inhaus-living-is-your-ideal-choice-for-home-renovations-in-sydney",
    "simple-renovation-tips-for-a-brighter-home",
    "7-interior-design-trends-fyshwick-homeowners-are-embracing-in-2025",
    "luxury-meets-functionality-how-to-design-a-high-end-practical-home",
    "the-top-benefits-of-heated-flooring-in-your-bathroom",
    "top-2025-home-design-trends-in-sydney",
    "tackling-unexpected-home-renovation-problems",
    "professional-vs-diy-renovations-which-ones-right-for-you",
    "how-to-soundproof-your-home-a-comprehensive-guide",
    "why-inhaus-living-is-fyshwicks-go-to-team-for-kitchen-renovations",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency:
        (route === "" ? "weekly" : "monthly") as ChangeFreq,
      priority: route === "" ? 1 : 0.8,
    })),

    ...servicePages.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.95,
    })),

    ...bathroomLPs.map((city) => ({
      url: `${siteUrl}/bathroom-renovations/bathroom-renovations-${city}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.75,
    })),

    ...apartmentLPs.map((city) => ({
      url: `${siteUrl}/apartment-renovation-${city}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.75,
    })),

    ...projects.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.85,
    })),

    ...blogPosts.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.7,
    })),
  ];
}