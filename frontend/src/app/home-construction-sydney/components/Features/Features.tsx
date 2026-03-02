import "./Features.css";

export default function Features() {
  return (
    <section
      className="construction-features"
      aria-labelledby="construction-features-heading"
    >
      <div className="construction-features-container">
        <div className="construction-features-header">
          <h2 id="construction-features-heading">
            Expert Construction and Home Extensions in Sydney
          </h2>

          <p className="construction-features-subtitle">
            Inhaus Living delivers structurally sound home additions and
            extensions across Sydney, combining architectural vision,
            engineering precision and over 20 years of construction expertise.
          </p>
        </div>

        <div className="construction-features-grid">
          <article className="construction-feature-card">
            <h3>Custom Home Extensions and Second Storey Additions</h3>
            <p>
              We design and build seamless ground-floor and second-storey
              extensions tailored to your lifestyle. From expanding living
              areas to adding bedrooms or open-plan layouts, we ensure
              structural integrity and architectural harmony.
            </p>
          </article>

          <article className="construction-feature-card">
            <h3>Structural Engineering and Compliance</h3>
            <p>
              Our licensed builders manage load-bearing modifications,
              structural reinforcements and council approvals in full
              compliance with NSW building regulations. Every project is
              engineered for long-term safety and durability.
            </p>
          </article>

          <article className="construction-feature-card">
            <h3>High-Value, Long-Term Investment</h3>
            <p>
              A professionally built home addition increases both space and
              property value. We focus on quality materials, efficient
              construction timelines and premium finishes to maximise your
              investment across Sydney’s competitive property market.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}