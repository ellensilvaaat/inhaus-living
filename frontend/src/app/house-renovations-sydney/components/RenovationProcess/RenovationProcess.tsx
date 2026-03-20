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
          "We begin with an in-depth consultation to understand your vision, lifestyle needs and renovation goals. We discuss budget expectations and establish a realistic timeline tailored to your home renovation project in Sydney.",
      },
      {
        title: "Comprehensive Quotation",
        description:
          "We prepare a detailed quotation outlining materials, labour, project scope and timelines. Everything is presented clearly and transparently, ensuring you have complete confidence before construction begins.",
      },
      {
        title: "Site Assessment",
        description:
          "Our team conducts a thorough inspection of your home to assess structure, layout opportunities and potential challenges. Precise measurements and documentation allow for accurate planning and design development.",
      },
      {
        title: "Approvals and Compliance",
        description:
          "Where required, we assist with council approvals and ensure compliance with NSW building regulations and codes. Our structured process minimises delays and ensures your home renovation proceeds smoothly.",
      },
      {
        title: "Design Development",
        description:
          "We collaborate closely with you to create a customised design that reflects your aesthetic vision while maximising space, functionality and long-term property value.",
      },
      {
        title: "Construction Phase",
        description:
          "Once approvals are secured, our licensed builders commence construction. We coordinate trades efficiently, maintain site quality standards and provide consistent progress updates throughout the build.",
      },
      {
        title: "Quality Assurance",
        description:
          "Before completion, we conduct detailed inspections at key milestones to ensure workmanship meets our premium standards. The final result is a refined home renovation delivered with precision and care.",
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
      root.querySelectorAll<HTMLElement>(".house-process-card")
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
      className="house-renovation-process"
      aria-labelledby="house-renovation-process-heading"
    >
      <div className="house-process-bg house-process-bg--a" aria-hidden="true" />
      <div className="house-process-bg house-process-bg--b" aria-hidden="true" />

      <div className="house-process-container">
        <header className="house-process-header">
          <p className="house-process-kicker">
            Peace of mind with our structured process
          </p>

          <h2 id="house-renovation-process-heading">
            Why renovate your house with Inhaus Living?
          </h2>

          <p className="house-process-subtitle">
            A refined and structured house renovation process designed for
            clarity, compliance and premium craftsmanship across Sydney.
          </p>

          <a href="#contact-form" className="house-process-cta">
            Start My Home Renovation Journey
          </a>
        </header>

        <div
          className="house-process-timeline"
          aria-label="House renovation process steps"
        >
          <div className="house-timeline-rail" aria-hidden="true">
            <span
              className="house-timeline-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={step.title}
                className={`house-process-card house-process-card--${side}`}
                style={{ ["--delay" as any]: `${index * 70}ms` }}
              >
                <div className="house-process-node" aria-hidden="true">
                  <span className="house-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="house-process-panel">
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