import "./Features.css";

export default function Features() {
  return (
    <section
      className="kitchen-features"
      aria-labelledby="kitchen-features-heading"
    >
      <div className="kitchen-features-container">
        <div className="kitchen-features-header">
          <h2 id="kitchen-features-heading">
            Luxury Kitchen Renovations in Sydney by Trusted Specialists
          </h2>

          <p className="kitchen-features-subtitle">
            Inhaus Living delivers premium kitchen renovations across Sydney,
            combining intelligent layouts, custom joinery and over 20 years of
            renovation expertise.
          </p>
        </div>

        <div className="kitchen-features-grid">
          <article className="kitchen-feature-card">
            <h3>Custom Kitchen Design and Joinery</h3>
            <p>
              Every kitchen renovation is tailored to your space and lifestyle.
              We design functional layouts with custom cabinetry, intelligent
              storage solutions and seamless appliance integration to maximise
              both efficiency and aesthetics.
            </p>
          </article>

          <article className="kitchen-feature-card">
            <h3>Premium Fixtures and Finishes</h3>
            <p>
              We source leading European fixtures, stone benchtops and
              high-quality fittings to ensure your kitchen renovation delivers
              long-term durability and timeless sophistication.
            </p>
          </article>

          <article className="kitchen-feature-card">
            <h3>Licensed and Experienced Renovators</h3>
            <p>
              With over 20 years of industry experience, our fully licensed and
              insured team manages your kitchen renovation from concept to
              completion, ensuring compliance, precision workmanship and
              exceptional results.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}