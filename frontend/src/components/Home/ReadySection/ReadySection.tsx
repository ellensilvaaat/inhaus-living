import Link from "next/link";
import "./ReadySection.css";

export default function ReadySection() {
  return (
    <section className="ready-section">
      <div className="ready-section__inner">
        <h2 className="ready-section__title">
          Start Your Renovation with Confidence
        </h2>

        <p className="ready-section__text">
          At Inhaus Living, every renovation begins with understanding how you live.
          From initial concepts through to documentation and construction, licensed 
          team delivers a seamless design-build experience across Sydney and Canberra. 
          With transparent scopes, realistic timelines and premium finishes available 
          to explore in our showrooms, your project is guided with clarity, craftsmanship and care.
        </p>

        <div className="ready-section__btn-container">
          <Link href="/contact" className="ready-cta">
            Request a Proposal
            <span className="ready-corner ready-corner--tr"></span>
            <span className="ready-corner ready-corner--bl"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}