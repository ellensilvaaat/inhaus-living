"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./RenovationProcess.css";

type Step = {
  title: string;
  description: string;
};

export default function ConstructionProcess() {
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Initial Consultation",
        description:
          "We begin with an in-depth consultation to understand your goals, property structure and expansion requirements. Whether it’s a ground-floor extension or second-storey addition, we assess feasibility and vision.",
      },
      {
        title: "Concept and Planning",
        description:
          "Our team develops a tailored construction plan including layout design, engineering considerations and project scope. We align architectural design with structural integrity and council requirements.",
      },
      {
        title: "Site Assessment and Engineering",
        description:
          "We conduct detailed structural inspections, soil assessments and load-bearing evaluations to ensure your home extension is engineered for safety, durability and long-term performance.",
      },
      {
        title: "Approvals and Compliance",
        description:
          "We manage council approvals, certifications and compliance with NSW building regulations. Our structured process ensures minimal delays and complete legal compliance.",
      },
      {
        title: "Structural Construction Phase",
        description:
          "Our licensed builders execute structural framing, reinforcements and major construction works with precision. We coordinate trades efficiently while maintaining premium quality standards.",
      },
      {
        title: "Finishing and Integration",
        description:
          "We seamlessly integrate the new addition with your existing structure, ensuring architectural consistency, high-end finishes and flawless transitions throughout your home.",
      },
      {
        title: "Final Inspection and Handover",
        description:
          "Before completion, we conduct rigorous quality inspections to ensure structural soundness and finish excellence. Your expanded home is delivered ready for immediate enjoyment.",
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
      root.querySelectorAll<HTMLElement>(".construction-process-card")
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
      className="construction-process"
      aria-labelledby="construction-process-heading"
    >
      <div className="construction-process-bg construction-process-bg--a" />
      <div className="construction-process-bg construction-process-bg--b" />

      <div className="construction-process-container">
        <header className="construction-process-header">
          <p className="construction-process-kicker">
            Structured planning for major home expansions
          </p>

          <h2 id="construction-process-heading">
            Our Construction and Home Extension Process in Sydney
          </h2>

          <p className="construction-process-subtitle">
            A comprehensive and compliant construction process designed for
            structural integrity, efficiency and premium craftsmanship.
          </p>

          <a
            href="/contact"
            className="construction-process-cta"
          >
            Start My Home Extension Project
          </a>
        </header>

        <div
          className="construction-process-timeline"
          aria-label="Construction and home extension steps"
        >
          <div className="construction-timeline-rail">
            <span
              className="construction-timeline-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={step.title}
                className={`construction-process-card construction-process-card--${side}`}
                style={{ ["--delay" as any]: `${index * 70}ms` }}
              >
                <div className="construction-process-node">
                  <span className="construction-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="construction-process-panel">
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