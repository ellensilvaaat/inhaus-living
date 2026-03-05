import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/Blog/Hero/Hero";
import BlogPage from "@/components/Blog/BlogPage/BlogPage";

const siteUrl = "https://www.inhausliving.com.au";
const pagePath = "/blog";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "Home Renovation Blog | Sydney & Canberra Experts | Inhaus Living",

  description:
    "Expert renovation insights for Sydney and Canberra homeowners. Explore renovation costs, kitchen design trends, bathroom upgrades and expert advice.",

keywords: [
  "home renovation blog",
  "renovation advice sydney",
  "home renovation tips australia",
  "kitchen renovation ideas sydney",
  "bathroom renovation tips sydney",
  "home renovation costs sydney",
  "construction advice australia",
  "luxury home renovation tips",
  "sydney renovation blog",
  "canberra home renovation tips",
  "home renovation guide australia",
  "kitchen design trends australia",
  "bathroom design trends australia",
  "renovation planning guide",
  "how to plan a home renovation",
  "renovation budget guide",
  "home extension ideas australia",
  "apartment renovation tips",
  "renovation mistakes to avoid",
  "before and after renovation ideas",
  "modern kitchen design ideas",
  "luxury bathroom design ideas",
  "renovation inspiration australia",
  "design and build insights",
  "home improvement blog australia"
],

  alternates: {
    canonical: pageUrl,
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
    type: "website",
    url: pageUrl,
    title:
      "Home Renovation Blog | Expert Advice from Inhaus Living",
    description:
      "Renovation insights, design inspiration and expert advice tailored for Sydney and Canberra homeowners.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Home renovation blog by Inhaus Living",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Home Renovation Blog | Inhaus Living",
    description:
      "Expert renovation advice, design trends and cost guides for Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/prydumano-design-vXMbcO1mRBY-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function BlogPageRoute() {

  const posts = [
  {
    slug: "7-interior-design-trends-fyshwick-homeowners-are-embracing-in-2025",
    title: "7 Interior Design Trends Fyshwick Homeowners Are Embracing In 2025"
  },
  {
    slug: "7-small-terrace-design-tips-we-recommend",
    title: "7 Small Terrace Design Tips We Recommend"
  },
  {
    slug: "a-penny-saved-the-top-5-tips-for-budget-friendly-renovations",
    title: "A Penny Saved: The Top 5 Tips For Budget Friendly Renovations"
  },
  {
    slug: "apartment-living-is-the-new-australian-dream",
    title: "Apartment Living Is The New Australian Dream"
  },
  {
    slug: "benefits-of-a-kitchen-renovation",
    title: "Benefits Of A Kitchen Renovation"
  },
  {
    slug: "boost-your-propertys-worth-with-the-right-renovation-company-in-sydney",
    title: "Boost Your Property’s Worth With The Right Renovation Company In Sydney"
  },
  {
    slug: "breath-fresh-life-into-your-kitchen-sydney-makeover-tips",
    title: "Breathe Fresh Life Into Your Kitchen: Sydney Makeover Tips"
  },
  {
    slug: "case-study-renovating-a-two-story-home-on-venetia-st-sylvania",
    title: "Case Study: Renovating A Two-Storey Home On Venetia St, Sylvania"
  },
  {
    slug: "cracking-the-code-how-to-budget-for-a-sydney-home-renovation",
    title: "Cracking The Code: How To Budget For A Sydney Home Renovation"
  },
  {
    slug: "discover-the-pros-and-cons-of-l-shaped-kitchens-for-kitchen-renovations-in-sydney",
    title: "Discover The Pros And Cons Of L-Shaped Kitchens For Renovations In Sydney"
  },
  {
    slug: "do-this-15-point-checklist-before-starting-your-bathroom-renovation-in-sydney",
    title: "Do This 15-Point Checklist Before Starting Your Bathroom Renovation In Sydney"
  },
  {
    slug: "do-you-want-to-upgrade-your-kitchen-explore-these-makeover-ideas",
    title: "Do You Want To Upgrade Your Kitchen? Explore These Makeover Ideas"
  },
  {
    slug: "does-a-bathroom-renovation-increase-the-value-of-my-sydney-home",
    title: "Does A Bathroom Renovation Increase The Value Of My Sydney Home?"
  },
  {
    slug: "embarking-on-a-home-renovation-in-sydney-heres-your-10-point-checklist",
    title: "Embarking On A Home Renovation In Sydney? Here’s Your 10-Point Checklist"
  },
  {
    slug: "estimating-cost-and-duration-a-comprehensive-guide-to-kitchen-renovation-in-sydney",
    title: "Estimating Cost And Duration: A Comprehensive Guide To Kitchen Renovation In Sydney"
  },
  {
    slug: "how-interior-design-services-are-transforming-fyshwick-apartments",
    title: "How Interior Design Services Are Transforming Fyshwick Apartments"
  },
  {
    slug: "how-long-does-a-bathroom-renovation-take-in-sydney",
    title: "How Long Does A Bathroom Renovation Take In Sydney?"
  },
  {
    slug: "how-new-flooring-installed-by-professional-flooring-installation-services-in-sydney-can-enhance-your-home",
    title: "How New Flooring Installed By Professional Flooring Services In Sydney Can Enhance Your Home"
  },
  {
    slug: "how-to-find-the-right-custom-home-builder-in-sydney",
    title: "How To Find The Right Custom Home Builder In Sydney"
  },
  {
    slug: "how-to-incorporate-biophilic-design-in-renovations",
    title: "How To Incorporate Biophilic Design In Renovations"
  },
  {
    slug: "how-to-integrate-smart-home-technology-into-your-kitchen",
    title: "How To Integrate Smart Home Technology Into Your Kitchen"
  },
  {
    slug: "how-to-maximise-space-in-a-small-sydney-apartment-without-losing-style",
    title: "How To Maximise Space In A Small Sydney Apartment Without Losing Style"
  },
  {
    slug: "how-to-plan-your-kitchen-renovation-in-sydney",
    title: "How To Plan Your Kitchen Renovation In Sydney"
  },
  {
    slug: "how-to-remodel-your-bathroom-without-breaking-the-bank-in-sydney-2024",
    title: "How To Remodel Your Bathroom Without Breaking The Bank In Sydney"
  },
  {
    slug: "how-to-soundproof-your-home-a-comprehensive-guide",
    title: "How To Soundproof Your Home: A Comprehensive Guide"
  },
  {
    slug: "inside-an-inhaus-living-design-consultation-what-fyshwick-homeowners-can-expect",
    title: "Inside An Inhaus Living Design Consultation: What Fyshwick Homeowners Can Expect"
  },
  {
    slug: "is-it-better-to-replace-or-refinish-your-existing-flooring",
    title: "Is It Better To Replace Or Refinish Your Existing Flooring?"
  },
  {
    slug: "kitchen-renovation-checklist-in-sydney-a-guide-by-inhaus-living",
    title: "Kitchen Renovation Checklist In Sydney: A Guide By Inhaus Living"
  },
  {
    slug: "luxury-home-design-trends-your-home-renovations-clients-will-love-in-2024",
    title: "Luxury Home Design Trends Australian Renovation Clients Will Love"
  },
  {
    slug: "luxury-meets-functionality-how-to-design-a-high-end-practical-home",
    title: "Luxury Meets Functionality: How To Design A High-End Practical Home"
  },
  {
    slug: "professional-vs-diy-renovations-which-ones-right-for-you",
    title: "Professional vs DIY Renovations: Which One Is Right For You?"
  },
  {
    slug: "renovation-tips-steer-clear-of-these-5-common-mistakes",
    title: "Renovation Tips: Steer Clear Of These 5 Common Mistakes"
  },
  {
    slug: "simple-renovation-tips-for-a-brighter-home",
    title: "Simple Renovation Tips For A Brighter Home"
  },
  {
    slug: "stretch-your-dollar-budgeting-renovation-for-maximum-savings",
    title: "Stretch Your Dollar: Budgeting Renovations For Maximum Savings"
  },
  {
    slug: "sydneysiders-purchasing-apartments-over-houses",
    title: "Why Sydneysiders Are Purchasing Apartments Over Houses"
  },
  {
    slug: "tackling-unexpected-home-renovation-problems",
    title: "Tackling Unexpected Home Renovation Problems"
  },
  {
    slug: "the-best-flooring-options-for-sydney-homeowners",
    title: "The Best Flooring Options For Sydney Homeowners"
  },
  {
    slug: "the-perks-unveiled-benefits-of-home-renovations-in-sydney",
    title: "The Perks Unveiled: Benefits Of Home Renovations In Sydney"
  },
  {
    slug: "the-top-benefits-of-heated-flooring-in-your-bathroom",
    title: "The Top Benefits Of Heated Flooring In Your Bathroom"
  },
  {
    slug: "the-ultimate-guide-to-canberra-home-renovations",
    title: "The Ultimate Guide To Canberra Home Renovations"
  },
  {
    slug: "things-you-should-consider-before-renovating-your-bathroom-in-sydney-2023",
    title: "Things You Should Consider Before Renovating Your Bathroom In Sydney"
  },
  {
    slug: "top-2025-home-design-trends-in-sydney",
    title: "Top 2025 Home Design Trends In Sydney"
  },
  {
    slug: "top-9-considerations-in-implementing-a-comprehensive-renovation-project-for-your-home",
    title: "Top 9 Considerations For A Comprehensive Home Renovation Project"
  },
  {
    slug: "top-kitchen-renovation-ideas",
    title: "Top Kitchen Renovation Ideas For Modern Australian Homes"
  },
  {
    slug: "top-questions-to-ask-your-sydney-home-renovation-builder",
    title: "Top Questions To Ask Your Sydney Home Renovation Builder"
  },
  {
    slug: "transform-your-sydney-home-with-expert-renovation-and-construction-services",
    title: "Transform Your Sydney Home With Expert Renovation And Construction Services"
  },
  {
    slug: "ultimate-checklist-for-choosing-a-kitchen-remodeling-contractor",
    title: "Ultimate Checklist For Choosing A Kitchen Remodeling Contractor"
  },
  {
    slug: "unveiling-luxury-your-guide-to-bathroom-renovations-in-sydney",
    title: "Unveiling Luxury: Your Guide To Bathroom Renovations In Sydney"
  },
  {
    slug: "visiting-showroom-renovation",
    title: "Visiting An Inhaus Living Showroom: What To Expect"
  },
  {
    slug: "what-role-does-a-dedicated-project-manager-play-in-a-successful-renovation",
    title: "What Role Does A Dedicated Project Manager Play In A Successful Renovation?"
  },
  {
    slug: "why-choose-professional-flooring-installation-in-canberra-top-benefits-explained",
    title: "Why Choose Professional Flooring Installation In Canberra? Top Benefits Explained"
  },
  {
    slug: "why-inhaus-living-is-fyshwicks-go-to-team-for-kitchen-renovations",
    title: "Why Inhaus Living Is Fyshwick’s Go-To Team For Kitchen Renovations"
  },
  {
    slug: "why-inhaus-living-is-your-ideal-choice-for-home-renovations-in-sydney",
    title: "Why Inhaus Living Is Your Ideal Choice For Home Renovations In Sydney"
  },
  {
    slug: "why-is-visiting-a-showroom-important-before-starting-a-renovation",
    title: "Why Is Visiting A Showroom Important Before Starting A Renovation?"
  },
  {
    slug: "why-should-you-work-with-a-fully-licensed-class-2-builder",
    title: "Why Should You Work With A Fully Licensed Class 2 Builder?"
  },
  {
    slug: "why-your-canberra-home-deserves-professional-renovation",
    title: "Why Your Canberra Home Deserves Professional Renovation"
  },
  {
    slug: "your-guide-to-luxury-kitchen-remodelling-makeover-tips-that-wont-cost-a-fortune",
    title: "Your Guide To Luxury Kitchen Remodelling: Makeover Tips That Won’t Cost A Fortune"
  }
  ];

  const itemList = posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}/blog/${post.slug}`,
    name: post.title,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      {
        "@type": "Blog",
        "@id": `${pageUrl}#blog`,
        url: pageUrl,
        name: "Inhaus Living Renovation Blog",
        description:
          "Expert renovation insights for Sydney and Canberra homeowners.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },

      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Home Renovation Blog",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@type": "Thing",
          name: "Home Renovation Advice"
        },
        inLanguage: "en-AU",
      },

      {
        "@type": "ItemList",
        "@id": `${pageUrl}#blogposts`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: posts.length,
        itemListElement: itemList
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
            name: "Blog",
            item: pageUrl,
          },
        ],
      },

    ],
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="blog">
        <Hero />
        <BlogPage />
      </div>
    </>
  );
}