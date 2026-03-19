"use client";

import { useEffect, useRef } from "react";
import "./CareHubFinal.css";

export default function CareHubFinal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="chf-section chf-cinematic">
      <div className="chf-glow chf-glow--left" />
      <div className="chf-glow chf-glow--right" />

      <div className="chf-shell">
        <div className="chf-content">
          <h2 className="chf-title">
            Designed to last.
            <br />
            Maintained with intention.
          </h2>

          <p className="chf-sub">
            Your space was created with precision.
            Care ensures it stays that way.
          </p>

          <a href="/" className="chf-cta">
            Back to Inhaus Living
            <span className="chf-ctaGlow" />
          </a>
        </div>
      </div>
    </section>
  );
}