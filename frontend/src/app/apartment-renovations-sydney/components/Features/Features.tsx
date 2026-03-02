import "./Features.css";

export default function Features() {
  return (
    <section
      className="apartment-features"
      aria-labelledby="apartment-features-heading"
    >
      <div className="features-container">
        <div className="features-header">
          <h2 id="apartment-features-heading">
            Premium Apartment Renovations at Inhaus Living
          </h2>
          <p className="features-subtitle">
            Trusted apartment renovation specialists in Sydney delivering
            premium craftsmanship, strata expertise and exceptional value.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <h3>Over 20 Years of Experience</h3>
            <p>
              We’ve been in the industry for over 20 years, building a strong
              reputation across Sydney. Our experience ensures smooth strata
              approvals, efficient planning and renovation solutions that
              truly work within apartment environments.
            </p>
          </article>

          <article className="feature-card">
            <h3>Fully Licensed Builders</h3>
            <p>
              Inhaus Living are fully licensed and insured builders. We manage
              every stage of your apartment renovation with compliance,
              precision and transparency, ensuring it’s done right the first
              time.
            </p>
          </article>

          <article className="feature-card">
            <h3>Premium Results</h3>
            <p>
              We are dedicated to delivering high-quality apartment renovations
              at competitive prices. Our team works strategically to maximise
              your budget, providing breathtaking results with intelligent
              storage and functional design.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}