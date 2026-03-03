"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./ServicesSection.css";

const services = [
  {
    id: "apartments",
    slug: "apartment-renovations-sydney",
    title: "Apartment Renovations Sydney",
    description:
      "At Inhaus Living, we specialise in transforming compact spaces into highly functional and refined urban homes across Sydney and Canberra. Our team understands strata requirements, spatial optimisation and premium material selections tailored for apartment living.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/apartment.png",
  },
  {
    id: "homes",
    slug: "house-renovations-sydney",
    title: "Home Renovations Sydney",
    description:
      "Our home renovations are designed to evolve with your lifestyle. From partial upgrades to full-scale transformations, we deliver design-led solutions backed by over 20 years of experience and Class 2 licensed construction expertise.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/home.png",
  },
  {
    id: "kitchens",
    slug: "kitchen-renovations-sydney",
    title: "Kitchen Renovations Sydney",
    description:
      "The heart of the home deserves thoughtful planning and premium craftsmanship. We design high-performance kitchens with custom joinery, intelligent layouts and seamless appliance integration.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/kitchen.png",
  },
  {
    id: "bathrooms",
    slug: "bathroom-renovations-sydney",
    title: "Bathroom Renovations Sydney",
    description:
      "Elevate your daily routine with spa-level detailing, advanced waterproofing systems and refined finishes. Our bathroom renovations balance beauty with long-term durability.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bathroom.png",
  },
  {
    id: "flooring",
    slug: "flooring-services-sydney",
    title: "Flooring Services Sydney",
    description:
      "From engineered timber to hybrid and parquetry solutions, we supply and install premium flooring systems that enhance comfort, durability and aesthetic cohesion.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/flooring.png",
  },
  {
    id: "construction",
    slug: "home-construction-sydney",
    title: "Construction and Additions Sydney",
    description:
      "Planning to expand? Our licensed team delivers structural alterations, extensions and second-storey additions with precision, compliance and full project management.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/construction.png",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".service");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("service--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      aria-label="Renovation and Construction Services"
    >
      {services.map((svc) => (
        <article className="service" id={svc.id} key={svc.id}>
          <div className="service__images">
            <Link href={`/${svc.slug}/`}>
              <div className="service__img-wrapper">
                <Image
                  src={`${svc.image}?tr=w-900,f-webp,q-90`}
                  alt={`${svc.title} in Sydney and Canberra by Inhaus Living`}
                  width={900}
                  height={700}
                  className="service__img"
                />
                <div className="service__img-overlay" />
              </div>
            </Link>
          </div>

          <div className="service__content">
            <h2 className="services-section__title">
              <Link
                href={`/${svc.slug}/`}
                className="services-section__title-link"
              >
                <span className="highlight">
                  {svc.title.split(" ")[0]}
                </span>{" "}
                {svc.title.split(" ").slice(1).join(" ")}
              </Link>
            </h2>

            <p className="services-section__description">
              {svc.description}
            </p>

            <Link
              href={`/${svc.slug}/`}
              className="services-section__learn-more"
            >
              Learn More
              <span className="learn-more-line"></span>
            </Link>
          </div>
        </article>
      ))}

      <div className="services-section__cta">
        <Link
          href="/projects/"
          className="services-section__button"
        >
          Explore Projects
        </Link>
      </div>
    </section>
  );
}