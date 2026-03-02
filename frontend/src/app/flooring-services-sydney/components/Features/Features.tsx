import "./Features.css";

export default function Features() {
  return (
    <section
      className="flooring-features"
      aria-labelledby="flooring-features-heading"
    >
      <div className="flooring-features-container">
        <div className="flooring-features-header">
          <h2 id="flooring-features-heading">
            Premium Flooring Installation in Sydney by Trusted Specialists
          </h2>

          <p className="flooring-features-subtitle">
            Inhaus Living delivers high-quality timber, engineered and hybrid
            flooring solutions across Sydney, combining structural precision,
            premium materials and over 20 years of industry expertise.
          </p>
        </div>

        <div className="flooring-features-grid">
          <article className="flooring-feature-card">
            <h3>Expert Timber and Engineered Flooring Installation</h3>
            <p>
              We specialise in solid timber, engineered oak and hybrid flooring
              systems tailored to modern Sydney homes. Our installation process
              ensures level subfloors, seamless transitions and long-lasting
              durability.
            </p>
          </article>

          <article className="flooring-feature-card">
            <h3>Fully Licensed and Insured Professionals</h3>
            <p>
              With over 20 years of experience in residential construction and
              renovations, our licensed team guarantees compliance with
              Australian building standards and precise flooring installation
              across houses and apartments.
            </p>
          </article>

          <article className="flooring-feature-card">
            <h3>Durable, Elegant and Value-Driven Results</h3>
            <p>
              Quality flooring enhances warmth, acoustics and long-term
              property value. We deliver refined finishes and premium materials
              designed to withstand daily wear while elevating your interior
              aesthetic.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}