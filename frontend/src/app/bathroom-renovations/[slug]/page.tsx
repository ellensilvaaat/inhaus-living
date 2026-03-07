import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { services } from "@/lib/bathroomConfig";

import Hero from "../../components/Hero/Hero";
import Intro from "../../components/Intro/Intro";
import Features from "../../components/Features/Features";
import RenovationProcess from "../../components/RenovationProcess/RenovationProcess";
import ContactForm from "../../components/ContactForm/ContactForm";
import CinematicCTA from "../../components/CinematicCTA/CinematicCTA";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import ProjectsCarousel from "@/components/Home/ProjectsCarousel/ProjectsCarousel";
import FeedbackSection from "../../components/FeedbackSectionStatic/FeedbackSectionStatic";
import Footer from "../../components/Footer/Footer";

const siteUrl = "https://www.inhausliving.com.au";

const serviceKey = "bathroom-renovations";
const service = services[serviceKey];

function extractSuburb(slug?: string) {
  if (!slug) return null;
  if (!slug.startsWith("bathroom-renovations-")) return null;
  return slug.replace("bathroom-renovations-", "");
}

function formatSuburbName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return service.suburbs.map((suburb: string) => ({
    slug: `bathroom-renovations-${suburb}`,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ================= METADATA ================= */

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { slug } = await params;

  const suburbSlug = extractSuburb(slug);

  if (!suburbSlug || !service.suburbs.includes(suburbSlug)) {
    return {};
  }

  const suburbName = formatSuburbName(suburbSlug);

  const pagePath = `/bathroom-renovations/${slug}/`;
  const pageUrl = `${siteUrl}${pagePath}`;

  return {
    title: `Bathroom Renovations ${suburbName} | Licensed Renovators | ${service.businessName}`,

    description: `Premium bathroom renovations in ${suburbName} by licensed builders. Waterproof compliant, design-led bathrooms built for durability and long-term value.`,

    keywords: [
  `bathroom renovations ${suburbName}`,
  `bathroom renovation ${suburbName}`,
  `bathroom renovators ${suburbName}`,
  `bathroom remodel ${suburbName}`,
  `luxury bathroom renovation ${suburbName}`,
  `bathroom renovation builders ${suburbName}`,
  `bathroom renovation company ${suburbName}`,
  `bathroom renovation contractors ${suburbName}`,
  `bathroom renovation specialists ${suburbName}`,
  `modern bathroom renovation ${suburbName}`,
  `ensuite renovation ${suburbName}`,
  `small bathroom renovation ${suburbName}`,
  `custom bathroom renovation ${suburbName}`,
  `premium bathroom renovation ${suburbName}`,
  `bathroom refurbishment ${suburbName}`
],

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      url: pageUrl,
      title: `Bathroom Renovations ${suburbName}`,
      description: `Luxury bathroom renovations in ${suburbName} by licensed renovation specialists.`,
      siteName: service.businessName,
      locale: "en_AU",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: `Bathroom Renovations ${suburbName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Bathroom Renovations ${suburbName}`,
      description: `Premium bathroom renovation services in ${suburbName}.`,
      images: [service.heroImage],
    },
  };
}

/* ================= PAGE ================= */

export default async function BathroomRenovationPage({
  params,
}: PageProps) {

  const { slug } = await params;

  const suburbSlug = extractSuburb(slug);

  if (!suburbSlug || !service.suburbs.includes(suburbSlug)) {
    notFound();
  }

  const suburbName = formatSuburbName(suburbSlug);

  const region =
    suburbSlug === "canberra" ? "canberra" : "sydney";

  const phoneLabel =
    region === "canberra"
      ? "(02) 6176 2807"
      : "(02) 9662 3509";

  const locationLabel =
    region === "canberra" ? "Canberra" : "Sydney";

  const pagePath = `/bathroom-renovations/${slug}/`;
  const pageUrl = `${siteUrl}${pagePath}`;

  /* ================= STRUCTURED DATA ================= */

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `Bathroom Renovations ${suburbName}`,
      description: `Premium bathroom renovations in ${suburbName} by licensed builders.`,
      inLanguage: "en-AU",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      primaryImageOfPage: {
        "@id": `${pageUrl}#image`
      }
    },

    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: `Bathroom Renovations ${suburbName}`,
      description: `Luxury bathroom renovation services in ${suburbName} delivered by licensed builders.`,
      serviceType: "Bathroom Renovation",
      provider: {
        "@id": `${siteUrl}/#organization`
      },
      areaServed: {
        "@type": "City",
        name: suburbName
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          name: suburbName
        }
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: pageUrl
      },
      url: pageUrl
    },

    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteUrl}/#bathroom-renovation-${suburbSlug}`,
      name: service.businessName,
      url: siteUrl,
      parentOrganization: {
        "@id": `${siteUrl}/#organization`
      },
      areaServed: {
        "@type": "City",
        name: suburbName
      },
      makesOffer: {
        "@id": `${pageUrl}#service`
      }
    },

    {
      "@type": "ImageObject",
      "@id": `${pageUrl}#image`,
      contentUrl: service.heroImage,
      caption: `Bathroom Renovations ${suburbName}`
    },

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
          name: "Bathroom Renovations",
          item: `${siteUrl}/bathroom-renovations/`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: suburbName,
          item: pageUrl
        }
      ]
    }

  ]
};

  return (
    <>
      <Script
        id={`structured-data-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="bathroom-page">

        <Hero
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
          phoneLabel={phoneLabel}
          heroImage={service.heroImage}
        />

        <Intro
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
        />

        <Features
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
        />

        <WhyChoose
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
        />

        <RenovationProcess
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
        />

        <CinematicCTA
          suburbName={suburbName}
          renovationLabel={service.label}
          businessName={service.businessName}
        />

        <ProjectsCarousel />

        <FeedbackSection />

        <ContactForm
          renovationLabel={service.label}
          businessName={service.businessName}
          phoneLabel={phoneLabel}
          email="info@inhausliving.com.au"
          locationLabel={locationLabel}
        />

        <Footer region={region} />

      </main>
    </>
  );
}