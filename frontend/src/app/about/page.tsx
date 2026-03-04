import type { Metadata } from "next";
import Script from "next/script";

import Hero from "@/components/About/Hero/Hero";
import AboutUsSection from "@/components/About/AboutUsSection/AboutUsSection";
import CounterSection from "@/components/About/CounterSection/CounterSection";
import WhyChooseUs from "@/components/About/DifferentialSection/DifferentialSection";
import TrustedPartners from "@/components/About/TrustedPartners/TrustedPartners";

const siteUrl = "https://inhaus-living.vercel.app";
const pagePath = "/about";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "About Inhaus Living | 20+ Years of Luxury Renovations in Sydney & Canberra",

  description:
    "Discover the story behind Inhaus Living — a premium renovation and construction company delivering luxury home transformations across Sydney and Canberra for over 20 years.",

  keywords: [
    "inhaus living",
    "renovation company sydney",
    "luxury renovations sydney",
    "construction company canberra",
    "home renovation experts australia"
  ],

  alternates: {
    canonical: pagePath,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title:
      "About Inhaus Living | Luxury Renovation Experts",
    description:
      "Meet the team behind Inhaus Living and discover over two decades of premium renovation excellence in Sydney and Canberra.",
    siteName: "Inhaus Living",
    locale: "en_AU",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Inhaus Living renovation team",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "About Inhaus Living | Luxury Renovation Specialists",
    description:
      "Over 20 years delivering premium renovations across Sydney and Canberra.",
    images: [
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg",
    ],
  },

  category: "Construction",
};

export default function AboutPage() {

  const structuredData = {

    "@context": "https://schema.org",

    "@graph": [

      /* WebPage */

      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "About Inhaus Living",
        description:
          "Learn about Inhaus Living, a leading renovation and construction company serving Sydney and Canberra.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg"
        },
        mainEntity: {
          "@id": `${siteUrl}/#organization`
        }
      },

      /* Website */

      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Inhaus Living",
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      },

      /* Organization */

      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Inhaus Living",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`
        },
        sameAs: [
          "https://www.instagram.com/inhaus_living",
          "https://www.facebook.com/inhausliving.com.au"
        ]
      },

      /* Local Business */

      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Inhaus Living",
        url: siteUrl,
        description:
          "Luxury renovation and construction company specializing in kitchens, bathrooms and full home transformations.",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: [
          {
            "@type": "City",
            name: "Sydney"
          },
          {
            "@type": "City",
            name: "Canberra"
          }
        ],
        priceRange: "$$$"
      },

      /* Experience / Company Facts */

      {
        "@type": "QuantitativeValue",
        "@id": `${pageUrl}#experience`,
        name: "Years of Experience",
        value: 20
      },

      {
        "@type": "QuantitativeValue",
        "@id": `${pageUrl}#projects`,
        name: "Projects Completed",
        value: 800
      },

      {
        "@type": "QuantitativeValue",
        "@id": `${pageUrl}#partners`,
        name: "Trusted Business Partners",
        value: 35
      },

      /* Mission */

      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#mission`,
        name: "Company Mission",
        text: "To deliver exceptional renovation and construction experiences through craftsmanship, transparency and thoughtful design."
      },

      /* Why Choose Us */

      {
        "@type": "ItemList",
        "@id": `${pageUrl}#whychoose`,
        name: "Why Choose Inhaus Living",
        itemListElement: [

          {
            "@type": "ListItem",
            position: 1,
            name: "Over 20 years of renovation experience"
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "Licensed builders and expert craftsmen"
          },

          {
            "@type": "ListItem",
            position: 3,
            name: "Design-build renovation process"
          },

          {
            "@type": "ListItem",
            position: 4,
            name: "Premium materials and finishes"
          }

        ]
      },

      /* Partners */

      {
        "@type": "ItemList",
        "@id": `${pageUrl}#partnerslist`,
        name: "Trusted Construction Partners",
        itemListElement: [
          {
            "@type": "Organization",
            name: "Trusted Partner"
          }
        ]
      },

      /* Breadcrumb */

      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [

          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: pageUrl
          }

        ]
      }

    ]

  };

  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="about-us">
        <Hero />
        <AboutUsSection />
        <CounterSection />
        <WhyChooseUs />
        <TrustedPartners />
      </div>
    </>
  );
}