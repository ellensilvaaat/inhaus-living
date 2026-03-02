"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./RenovationProcess.css";

type Step = {
  title: string;
  description: string;
};

export default function FlooringProcess() {
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Initial Consultation",
        description:
          "We begin with a detailed consultation to understand your flooring preferences, lifestyle requirements and property type. We discuss timber, engineered or hybrid flooring options suitable for your Sydney home.",
      },
      {
        title: "Material Selection",
        description:
          "Our team guides you through premium flooring materials, finishes and colour tones. We ensure your chosen flooring complements your interior design and structural conditions.",
      },
      {
        title: "Site Inspection & Measurements",
        description:
          "We conduct a precise site assessment to evaluate subfloor conditions, moisture levels and structural alignment. Accurate measurements ensure seamless installation and long-term durability.",
      },
      {
        title: "Subfloor Preparation",
        description:
          "Proper preparation is critical. We level subfloors, address imperfections and apply moisture barriers where required to ensure stability and compliance with Australian standards.",
      },
      {
        title: "Professional Installation",
        description:
          "Our licensed specialists install your timber, engineered or hybrid flooring with precision craftsmanship. We ensure seamless joins, clean transitions and consistent alignment throughout your space.",
      },
      {
        title: "Finishing & Detailing",
        description:
          "We complete trims, skirting adjustments and finishing details to deliver a refined, high-end result that enhances your home’s aesthetic and property value.",
      },
      {
        title: "Final Inspection & Handover",
        description:
          "Before completion, we conduct a comprehensive quality inspection to ensure your new flooring meets our premium standards. Your space is left clean, polished and ready to enjoy.",
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
      root.querySelectorAll<HTMLElement>(".flooring-process-card")
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
      className="flooring-process"
      aria-labelledby="flooring-process-heading"
    >
      <div className="flooring-process-bg flooring-process-bg--a" />
      <div className="flooring-process-bg flooring-process-bg--b" />

      <div className="flooring-process-container">
        <header className="flooring-process-header">
          <p className="flooring-process-kicker">
            Precision installation with a structured approach
          </p>

          <h2 id="flooring-process-heading">
            Our Flooring Installation Process in Sydney
          </h2>

          <p className="flooring-process-subtitle">
            A refined and professional flooring installation process designed
            for durability, compliance and exceptional craftsmanship.
          </p>

          <a
            href="/contact"
            className="flooring-process-cta"
          >
            Start My Flooring Project
          </a>
        </header>

        <div
          className="flooring-process-timeline"
          aria-label="Flooring installation steps"
        >
          <div className="flooring-timeline-rail">
            <span
              className="flooring-timeline-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <article
                key={step.title}
                className={`flooring-process-card flooring-process-card--${side}`}
                style={{ ["--delay" as any]: `${index * 70}ms` }}
              >
                <div className="flooring-process-node">
                  <span className="flooring-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flooring-process-panel">
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