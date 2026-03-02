import "./Features.css";

export default function Features() {
  return (
    <section
      className="house-features"
      aria-labelledby="house-features-heading"
    >
      <div className="house-features-container">
        <div className="house-features-header">
          <h2 id="house-features-heading">
            Luxury House Renovations in Sydney by Trusted Experts
          </h2>

          <p className="house-features-subtitle">
            Inhaus Living delivers premium home renovations across Sydney,
            combining architectural vision, structural expertise and over
            20 years of proven industry experience.
          </p>
        </div>

        <div className="house-features-grid">
          <article className="house-feature-card">
            <h3>Over 20 Years of Industry Experience</h3>
            <p>
              With more than two decades in residential construction and home
              renovations across Sydney, we understand what works — from
              structural modifications to high-end interior transformations.
              Our experience ensures precision, efficiency and exceptional
              outcomes.
            </p>
          </article>

          <article className="house-feature-card">
            <h3>Fully Licensed Builders</h3>
            <p>
              Inhaus Living are fully licensed and insured builders. We manage
              your house renovation from concept through to completion,
              ensuring compliance with building codes, safety regulations and
              the highest standards of workmanship.
            </p>
          </article>

          <article className="house-feature-card">
            <h3>Premium Results</h3>
            <p>
              Every home renovation we deliver is thoughtfully designed to
              enhance lifestyle, functionality and long-term property value.
              We maximise your investment through intelligent layouts,
              quality materials and refined craftsmanship.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}