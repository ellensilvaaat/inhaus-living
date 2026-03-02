"use client";

import { useEffect, useMemo, useRef } from "react";
import "./RenovationProcess.css";

type Step = {
  title: string;
  description: string;
};

interface RenovationProcessProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
}

export default function RenovationProcess({
  suburbName,
  renovationLabel,
  businessName,
}: RenovationProcessProps) {
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Initial Consultation",
        description: `We begin with an in-depth consultation to understand your ${renovationLabel.toLowerCase()} goals in ${suburbName}, including design preferences and functional requirements. Our team at ${businessName} ensures every detail is aligned with your expectations and long-term property value.`,
      },
      {
        title: "Detailed Quotation",
        description:
          "We prepare a comprehensive and transparent quotation outlining materials, labour, timelines and project scope. Every detail is clearly presented so you can move forward with confidence.",
      },
      {
        title: "Site Inspection and Assessment",
        description:
          "Our team conducts a thorough site inspection to evaluate structural considerations, services infrastructure and compliance requirements. Precise measurements ensure accurate planning and flawless execution.",
      },
      {
        title: "Compliance and Planning",
        description:
          "We ensure your renovation complies with NSW building regulations and industry standards. Our structured approach minimises delays while maintaining the highest level of safety and durability.",
      },
      {
        title: "Design and Material Selection",
        description:
          "We collaborate with you to select premium materials, fixtures and finishes that align with your aesthetic vision while maximising functionality and long-term value.",
      },
      {
        title: "Construction and Installation",
        description: `Our licensed renovation specialists manage demolition, construction and installation with precision in ${suburbName}. We coordinate trades efficiently to deliver a seamless renovation experience.`,
      },
      {
        title: "Final Quality Inspection",
        description:
          "Before completion, we conduct detailed inspections to ensure workmanship and finishes meet our premium standards. The result is a refined renovation built to last.",
      },
    ],
    [suburbName, renovationLabel, businessName]
  );

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".bathroom-process-card")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bathroom-renovation-process"
      aria-labelledby="renovation-process-heading"
    >
      <div className="bathroom-process-container">
        <header className="bathroom-process-header">
          <p className="bathroom-process-kicker">
            Precision, compliance and craftsmanship
          </p>

          <h2 id="renovation-process-heading">
            Our {renovationLabel} Process in {suburbName}
          </h2>

          <p className="bathroom-process-subtitle">
            A refined and structured {renovationLabel.toLowerCase()} process
            designed for clarity, compliance and premium results in{" "}
            {suburbName}.
          </p>

          <a href="#contact" className="bathroom-process-cta">
            Start My {renovationLabel} in {suburbName}
          </a>
        </header>

        <div className="bathroom-process-grid">
          {steps.map((step, index) => {
            const isLastOdd =
              steps.length % 2 !== 0 && index === steps.length - 1;

            return (
              <article
                key={step.title}
                className={`bathroom-process-card ${
                  index % 2 === 0 ? "left" : "right"
                } ${isLastOdd ? "center" : ""}`}
                style={{ ["--delay" as any]: `${index * 80}ms` }}
              >
                <div className="bathroom-process-node">
                  <span className="bathroom-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="bathroom-process-panel">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}