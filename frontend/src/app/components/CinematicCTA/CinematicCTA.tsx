"use client";

import { useEffect, useRef } from "react";
import "./CinematicCTA.css";

interface CinematicCTAProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
}

export default function CinematicCTA({
  suburbName,
  renovationLabel,
  businessName,
}: CinematicCTAProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const offset = window.scrollY;
      sectionRef.current.style.backgroundPositionY = `${offset * 0.4}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="cinematic-cta"
      aria-label={`Start your ${renovationLabel.toLowerCase()} in ${suburbName}`}
    >
      <div className="cinematic-overlay" />

      <div className="cinematic-content">
        <span className="cinematic-kicker">
          Start Your {renovationLabel}
        </span>

        <h2>
          Take Advantage of the {businessName} Expertise
        </h2>

        <p>
          Speak with our renovation specialists about your{" "}
          {renovationLabel.toLowerCase()} needs in {suburbName}.
        </p>

        <button
          className="cinematic-button"
          onClick={scrollToContact}
        >
          Book Your Consultation
          <span className="cinematic-button-glow" />
        </button>
      </div>
    </section>
  );
}