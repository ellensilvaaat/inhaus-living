import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { services } from "@/lib/ serviceConfig";

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
  return service.suburbs.map((suburb) => ({
    slug: `bathroom-renovations-${suburb}`,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const suburbSlug = extractSuburb(slug);
  if (!suburbSlug || !service.suburbs.includes(suburbSlug)) {
    return {};
  }

  const suburbName = formatSuburbName(suburbSlug);
  const pageUrl = `${siteUrl}/bathroom-renovations/${slug}/`;

  return {
    title: `${service.label} ${suburbName} | ${service.businessName}`,
    description: `Premium ${service.label.toLowerCase()} in ${suburbName} delivered by licensed and insured builders.`,
    alternates: { canonical: pageUrl },
  };
}

export default async function BathroomRenovationPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const suburbSlug = extractSuburb(slug);

  if (!suburbSlug || !service.suburbs.includes(suburbSlug)) {
    notFound();
  }

  const suburbName = formatSuburbName(suburbSlug);

  // 🔥 REGION DETECTION
  const region =
    suburbSlug === "canberra" ? "canberra" : "sydney";

  const phoneLabel =
    region === "canberra"
      ? "(02) 6176 2807"
      : "(02) 9662 3509";

  const locationLabel =
    region === "canberra" ? "Canberra" : "Sydney";

  const pageUrl = `${siteUrl}/bathroom-renovations/${slug}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.label} ${suburbName}`,
    serviceType: service.label,
    areaServed: {
      "@type": "AdministrativeArea",
      name: suburbName,
    },
    provider: {
      "@type": "Organization",
      name: service.businessName,
      url: siteUrl,
      telephone:
        region === "canberra"
          ? "+61261762807"
          : "+61296623509",
    },
    url: pageUrl,
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