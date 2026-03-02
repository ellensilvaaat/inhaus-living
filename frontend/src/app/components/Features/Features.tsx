import "./Features.css";

interface FeaturesProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
}

export default function Features({
  suburbName,
  renovationLabel,
  businessName,
}: FeaturesProps) {
  return (
    <section
      className="bathroom-features"
      aria-labelledby="renovation-features-heading"
    >
      <div className="bathroom-features-container">
        <div className="bathroom-features-header">
          <h2 id="renovation-features-heading">
            Luxury {renovationLabel} in {suburbName} by Trusted Specialists
          </h2>

          <p className="bathroom-features-subtitle">
            {businessName} delivers premium {renovationLabel.toLowerCase()} in{" "}
            {suburbName}, combining innovative design, precision craftsmanship
            and over 20 years of proven industry expertise.
          </p>
        </div>

        <div className="bathroom-features-grid">
          <article className="bathroom-feature-card">
            <h3>Over 20 Years of Renovation Experience</h3>
            <p>
              With more than two decades of experience in residential renovations
              across {suburbName} and greater NSW, we understand the technical
              precision required for high-end {renovationLabel.toLowerCase()} —
              from structural upgrades to premium finishes and custom detailing.
            </p>
          </article>

          <article className="bathroom-feature-card">
            <h3>Licensed and Fully Insured Builders</h3>
            <p>
              Our licensed renovation specialists manage your project in{" "}
              {suburbName} from concept through to completion. We ensure
              compliance with NSW building regulations and deliver the highest
              level of workmanship.
            </p>
          </article>

          <article className="bathroom-feature-card">
            <h3>Premium Finishes and Bespoke Design</h3>
            <p>
              Every {renovationLabel.toLowerCase()} in {suburbName} is
              thoughtfully designed to maximise space, functionality and
              long-term value. We incorporate premium materials and refined
              detailing to deliver elegant, timeless results.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}