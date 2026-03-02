"use client";

import { useEffect, useRef } from "react";
import "./WhyChoose.css";

interface WhyChooseProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
}

export default function WhyChoose({
  suburbName,
  renovationLabel,
  businessName,
}: WhyChooseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".wc-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("wc-visible");
            (entry.target as HTMLElement).style.transitionDelay =
              `${index * 120}ms`;
          }
        });
      },
      { threshold: 0.25 }
    );

    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wc-section"
      aria-label={`Why choose ${businessName} for ${renovationLabel.toLowerCase()} in ${suburbName}`}
    >
      <div className="wc-bg-glow" />

      <div className="wc-container">
        <header className="wc-header">
          <span className="wc-kicker">
            Why Choose {businessName} in {suburbName}
          </span>
          <h2>
            Benefits of Choosing {businessName} for Your {renovationLabel} in {suburbName}
          </h2>
        </header>

        <div className="wc-timeline">
          <div className="wc-line" />

          {/* CARD 1 */}
          <article className="wc-card">
            <h3>Excellent Quality and Service</h3>

            <p>
              At {businessName}, we don’t just complete {renovationLabel.toLowerCase()} in{" "}
              {suburbName}; we bring your vision to life, ensuring that every
              space delivers comfort, elegance and long-term performance.
            </p>

            <p>
              We are intuitive operators focused on understanding your needs,
              goals and expectations to create a result that truly reflects
              your lifestyle.
            </p>

            <p>
              With a team of dedicated experts, you can feel confident and
              empowered throughout your {suburbName} renovation journey with
              full access to our expertise and project support.
            </p>
          </article>

          {/* CARD 2 */}
          <article className="wc-card">
            <h3>Peace of Mind With Our Process</h3>

            <p>
              Our process is structured and transparent. We carefully assess
              your requirements and provide customised solutions tailored to
              your property and budget.
            </p>

            <p>
              We manage the entire journey of your {renovationLabel.toLowerCase()} in{" "}
              {suburbName} — from consultation and design through to final
              completion.
            </p>

            <p>
              Take the stress out of renovation. Rely on specialists who
              guarantee quality workmanship, compliance and refined results.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}