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
          "Firstly, we hold an in-depth meeting with you in one of our showrooms to understand your vision, preferences, and goals for the renovation. Next, we discuss the budgetary constraints and financial expectations to ensure alignment with your resources. From there, we establish a realistic timeline considering deadlines and constraints.",
      },
      {
        title: "Quotation",
        description:
          "Next, we prepare a comprehensive quotation detailing all aspects of the project, including materials, labour, and any additional expenses. The quote is presented clearly, where you will have a chance to address any questions or concerns.",
      },
      {
        title: "Site Assessment",
        description:
          "We conduct a thorough inspection of your apartment to assess its current condition and identify any potential challenges or opportunities for improvement. We take precise measurements and document existing features to inform the design and construction phases accurately.",
      },
      {
        title: "Approval Process",
        description:
          "We guide you through the necessary approval procedures, including obtaining permissions from strata. We assist in preparing and submitting all required documentation, ensuring compliance with local regulations and building codes, and communicate with relevant authorities to minimise delays.",
      },
      {
        title: "Design",
        description:
          "At Inhaus Living, we collaborate closely with you to develop a customised design scheme that reflects your aesthetic preferences and functional requirements.",
      },
      {
        title: "Construction Phase",
        description:
          "We commence the renovation work once all necessary approvals are secured. We coordinate construction activities to ensure efficient progress, supported by regular site inspections to monitor workmanship and quality.",
      },
      {
        title: "Quality Assurance",
        description:
          "We conduct systematic checks and inspections at key milestones to verify compliance with project specifications and address any deficiencies promptly — ensuring a refined final handover.",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      // Start filling when section top hits ~70% viewport
      const start = vh * 0.7;
      // End when section bottom hits ~30% viewport
      const end = vh * 0.3;

      const total = rect.height + (start - end);
      const current = start - rect.top; // how far we've moved into the section
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
      root.querySelectorAll<HTMLElement>(".process-card")
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
      className="renovation-process"
      aria-labelledby="renovation-process-heading"
    >
      {/* background accents */}
      <div className="process-bg process-bg--a" aria-hidden="true" />
      <div className="process-bg process-bg--b" aria-hidden="true" />

      <div className="process-container">
        <header className="process-header">
          <p className="process-kicker">Peace of mind with our process</p>

          <h2 id="renovation-process-heading">
            Why renovate your apartment with us?
          </h2>

          <p className="process-subtitle">
            A structured, strata-aware apartment renovation process designed for
            clarity, compliance and premium craftsmanship, from consultation to
            final quality checks.
          </p>

          <a href="#contact-form" className="process-cta">
            Start My Renovation Journey
          </a>
        </header>

        <div className="process-timeline" aria-label="Renovation process steps">
          {/* progress line */}
          <div className="timeline-rail" aria-hidden="true">
            <span
              className="timeline-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={step.title}
                className={`process-card process-card--${side}`}
                style={{ ["--delay" as any]: `${index * 70}ms` }}
              >
                <div className="process-node" aria-hidden="true">
                  <span className="process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="process-panel">
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