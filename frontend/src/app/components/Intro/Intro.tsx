import "./Intro.css";

interface IntroProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
}

export default function Intro({
  suburbName,
  renovationLabel,
  businessName,
}: IntroProps) {
  return (
    <section
      className="mp-intro"
      aria-label={`${suburbName} ${renovationLabel} intro`}
    >
      <div className="mp-intro__container">
        <div className="mp-intro__left">
          <p className="mp-intro__kicker">
            {suburbName} • NSW
          </p>

          <h2 className="mp-intro__title">
            {suburbName}’s Best {renovationLabel}
          </h2>

          <div className="mp-intro__divider" />
        </div>

        <div className="mp-intro__right">
          <p>
            Why settle for ordinary? At {businessName}, we are committed to
            delivering premium {renovationLabel.toLowerCase()} in {suburbName}.
            Every project is tailored to reflect your lifestyle, functional
            needs and long-term property value.
          </p>

          <p>
            We combine architectural design thinking with practical
            functionality, ensuring your space is both refined and durable.
            From structural upgrades to bespoke joinery and premium finishes,
            we deliver results built to last.
          </p>

          <p>
            Our team works closely with you to understand your goals, budget
            and vision — transforming properties in {suburbName} into elegant,
            high-performing living spaces.
          </p>

          <div className="mp-intro__highlights">
            <span>Premium Materials</span>
            <span>Tailored Design</span>
            <span>Built for Durability</span>
            <span>Transparent Budgeting</span>
          </div>
        </div>
      </div>
    </section>
  );
}