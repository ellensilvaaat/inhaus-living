"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./RenovationProcess.css";

type Step = {
  title: string;
  description: string;
};

export default function RenovationProcess() {
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Initial Consultation",
        description:
          "We begin with an in-depth consultation to understand your bathroom renovation goals, design preferences and functional requirements. We discuss layout possibilities, fixture selections and budget expectations tailored to your Sydney property.",
      },
      {
        title: "Detailed Quotation",
        description:
          "We prepare a comprehensive and transparent quotation outlining materials, labour, waterproofing systems and timelines. Every detail is clearly presented so you can move forward with confidence.",
      },
      {
        title: "Site Inspection & Assessment",
        description:
          "Our team conducts a thorough site inspection to evaluate plumbing infrastructure, structural considerations and waterproofing requirements. Precise measurements ensure accurate planning and flawless execution.",
      },
      {
        title: "Compliance & Waterproofing Standards",
        description:
          "We ensure your bathroom renovation complies with NSW building regulations and waterproofing standards. Our structured approach minimises delays while maintaining the highest level of safety and durability.",
      },
      {
        title: "Design & Material Selection",
        description:
          "We collaborate with you to select premium tiles, custom vanities, tapware and European fixtures that align with your aesthetic vision while maximising functionality and long-term value.",
      },
      {
        title: "Construction & Installation",
        description:
          "Our licensed bathroom renovation specialists manage demolition, plumbing, waterproofing, tiling and installation with precision. We coordinate trades efficiently to deliver a seamless renovation experience.",
      },
      {
        title: "Final Quality Inspection",
        description:
          "Before completion, we conduct detailed inspections to ensure workmanship, finishes and waterproofing meet our premium standards. The result is a refined, luxury bathroom renovation built to last.",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      const start = vh * 0.7;
      const end = vh * 0.3;

      const total = rect.height + (start - end);
      const current = start - rect.top;
      const raw = total > 0 ? current / total : 0;

      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".bathroom-process-card")
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((c) => io.observe(c));

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bathroom-renovation-process"
      aria-labelledby="bathroom-renovation-process-heading"
    >
      <div
        className="bathroom-process-bg bathroom-process-bg--a"
        aria-hidden="true"
      />
      <div
        className="bathroom-process-bg bathroom-process-bg--b"
        aria-hidden="true"
      />

      <div className="bathroom-process-container">
        <header className="bathroom-process-header">
          <p className="bathroom-process-kicker">
            Precision, compliance and craftsmanship
          </p>

          <h2 id="bathroom-renovation-process-heading">
            Our Bathroom Renovation Process in Sydney
          </h2>

          <p className="bathroom-process-subtitle">
            A refined and structured bathroom renovation process designed for
            clarity, waterproofing compliance and premium results.
          </p>

          <a href="/contact" className="bathroom-process-cta">
            Start My Bathroom Renovation
          </a>
        </header>

        <div
          className="bathroom-process-timeline"
          aria-label="Bathroom renovation process steps"
        >
          <div className="bathroom-timeline-rail" aria-hidden="true">
            <span
              className="bathroom-timeline-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={step.title}
                className={`bathroom-process-card bathroom-process-card--${side}`}
                style={{ ["--delay" as any]: `${index * 70}ms` }}
              >
                <div className="bathroom-process-node" aria-hidden="true">
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