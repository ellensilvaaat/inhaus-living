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

export async function generateStaticParams() {
  const params: { serviceSlug: string }[] = [];

  Object.entries(services).forEach(([serviceKey, config]) => {
    config.suburbs.forEach((suburb) => {
      params.push({
        serviceSlug: `${serviceKey}-${suburb}`,
      });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const parsed = parseServiceSlug(serviceSlug);

  if (!parsed) return {};

  const suburbName = formatSuburbName(parsed.suburb);
  const pageUrl = `${siteUrl}/${serviceSlug}/`;

  return {
    title: `${parsed.config.label} ${suburbName} | ${parsed.config.businessName}`,
    description: `Premium ${parsed.config.label.toLowerCase()} in ${suburbName}.`,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const parsed = parseServiceSlug(serviceSlug);

  if (!parsed) notFound();

  const suburbName = formatSuburbName(parsed.suburb);
  const pageUrl = `${siteUrl}/${serviceSlug}/`;

  const isCanberra = parsed.suburb === "canberra";

  const phone = isCanberra
    ? "(02) 6176 2807"
    : "(02) 9662 3509";

  const phoneRaw = isCanberra
    ? "+61261762807"
    : "+61296623509";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${parsed.config.label} ${suburbName}`,
    serviceType: parsed.config.label,
    areaServed: {
      "@type": "AdministrativeArea",
      name: suburbName,
    },
    provider: {
      "@type": "Organization",
      name: parsed.config.businessName,
      telephone: phoneRaw,
      address: isCanberra
        ? {
            "@type": "PostalAddress",
            streetAddress: "Unit 2/58 Wollongong St",
            addressLocality: "Fyshwick",
            addressRegion: "ACT",
            postalCode: "2609",
            addressCountry: "AU",
          }
        : undefined,
    },
    url: pageUrl,
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
  email={
    parsed.suburb === "canberra"
      ? "info@inhausliving.com.au"
      : "info@inhausliving.com.au"
  }
  locationLabel={
    parsed.suburb === "canberra"
      ? "Fyshwick ACT"
      : suburbName
  }
/>

  <Footer region={parsed.suburb === "canberra" ? "canberra" : "sydney"} />
</main>
    </>
  );
}