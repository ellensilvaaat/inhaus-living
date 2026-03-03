import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { services } from "@/lib/ serviceConfig";
import { parseServiceSlug } from "@/lib/slugParser";

import Hero from "../components/Hero/Hero";
import Intro from "../components/Intro/Intro";
import Features from "../components/Features/Features";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import RenovationProcess from "../components/RenovationProcess/RenovationProcess";
import CinematicCTA from "../components/CinematicCTA/CinematicCTA";
import ContactForm from "../components/ContactForm/ContactForm";
import ProjectsCarousel from "@/components/Home/ProjectsCarousel/ProjectsCarousel";
import FeedbackSection from "../components/FeedbackSectionStatic/FeedbackSectionStatic";
import Footer from "../components/Footer/Footer";

const siteUrl = "https://www.inhausliving.com.au";

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

function formatSuburbName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ================= STATIC PARAMS ================= */

export async function generateStaticParams() {
  const params: { serviceSlug: string }[] = [];

  Object.entries(services).forEach(([serviceKey, config]) => {
    config.suburbs.forEach((suburb: string) => {
      params.push({
        serviceSlug: `${serviceKey}-${suburb}`,
      });
    });
  });

  return params;
}

/* ================= METADATA ================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const parsed = parseServiceSlug(serviceSlug);

  if (!parsed) return {};

  const suburbName = formatSuburbName(parsed.suburb);
  const pagePath = `/${serviceSlug}/`;
  const pageUrl = `${siteUrl}${pagePath}`;

  return {
    title: `${parsed.config.label} ${suburbName} | ${parsed.config.businessName}`,

    description: `Premium ${parsed.config.label.toLowerCase()} in ${suburbName}. Licensed renovation specialists delivering high-quality craftsmanship.`,

    alternates: {
      canonical: pagePath,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",
      url: pageUrl,
      title: `${parsed.config.label} ${suburbName}`,
      description: `Professional ${parsed.config.label.toLowerCase()} in ${suburbName}.`,
      siteName: parsed.config.businessName,
      locale: "en_AU",
      images: [
        {
          url: parsed.config.heroImage,
          width: 1200,
          height: 630,
          alt: `${parsed.config.label} ${suburbName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${parsed.config.label} ${suburbName}`,
      description: `Premium ${parsed.config.label.toLowerCase()} in ${suburbName}.`,
      images: [parsed.config.heroImage],
    },
  };
}

/* ================= PAGE ================= */

export default async function ServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const parsed = parseServiceSlug(serviceSlug);

  if (!parsed) notFound();

  const suburbName = formatSuburbName(parsed.suburb);

  const pagePath = `/${serviceSlug}/`;
  const pageUrl = `${siteUrl}${pagePath}`;

  const isCanberra = parsed.suburb === "canberra";

  const phone = isCanberra
    ? "(02) 6176 2807"
    : "(02) 9662 3509";

  const phoneRaw = isCanberra
    ? "+61261762807"
    : "+61296623509";

  /* ================= STRUCTURED DATA ================= */

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${parsed.config.label} ${suburbName}`,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${parsed.config.label} ${suburbName}`,
        serviceType: parsed.config.label,
        areaServed: {
          "@type": "AdministrativeArea",
          name: suburbName,
        },
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        url: pageUrl,
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
            name: parsed.config.label,
            item: `${siteUrl}/${parsed.serviceKey}/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: suburbName,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id={`structured-data-${serviceSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>
        <Hero
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
          phoneLabel={phone}
          heroImage={parsed.config.heroImage}
        />

        <Intro
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
        />

        <Features
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
        />

        <WhyChoose
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
        />

        <RenovationProcess
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
        />

        <CinematicCTA
          suburbName={suburbName}
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
        />

        <ProjectsCarousel />
        <FeedbackSection />

        <ContactForm
          renovationLabel={parsed.config.label}
          businessName={parsed.config.businessName}
          phoneLabel={phone}
          email="info@inhausliving.com.au"
          locationLabel={isCanberra ? "Fyshwick ACT" : suburbName}
        />

        <Footer region={isCanberra ? "canberra" : "sydney"} />
      </main>
    </>
  );
}