import "./Features.css";

export default function Features() {
  return (
    <section
      className="bathroom-features"
      aria-labelledby="bathroom-features-heading"
    >
      <div className="bathroom-features-container">
        <div className="bathroom-features-header">
          <h2 id="bathroom-features-heading">
            Luxury Bathroom Renovations in Sydney by Trusted Specialists
          </h2>

          <p className="bathroom-features-subtitle">
            Inhaus Living delivers premium bathroom renovations across Sydney,
            combining innovative design, precision craftsmanship and over 20
            years of proven industry expertise.
          </p>
        </div>

        <div className="bathroom-features-grid">
          <article className="bathroom-feature-card">
            <h3>Over 20 Years of Renovation Experience</h3>
            <p>
              With more than two decades of experience in residential
              renovations across Sydney, we understand the technical precision
              required for high-end bathroom transformations — from waterproofing
              systems to luxury finishes and custom joinery.
            </p>
          </article>

          <article className="bathroom-feature-card">
            <h3>Licensed and Fully Insured Builders</h3>
            <p>
              Our licensed bathroom renovation specialists manage your project
              from concept through to completion. We ensure compliance with NSW
              building regulations, waterproofing standards and the highest
              level of workmanship.
            </p>
          </article>

          <article className="bathroom-feature-card">
            <h3>Premium Finishes and Bespoke Design</h3>
            <p>
              Every bathroom renovation is thoughtfully designed to maximise
              space, functionality and long-term value. We incorporate premium
              European fixtures, custom vanities and refined detailing to
              deliver elegant, timeless results.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}