import Link from "next/link";
import "./DifferentialSection.css";

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <h2 className="why-choose-us__title">
        Why Choose Inhaus Living?
      </h2>
      <div className="why-choose-us__underline"></div>

      <div className="why-choose-us__content">
        {/* Left column */}
        <div className="why-choose-us__column why-choose-us__column--left">
          <div className="why-choose-us__item">
            <span className="why-choose-us__number">01</span>
            <h3 className="why-choose-us__heading">
              One team, <br />
              <strong>end-to-end</strong>
            </h3>
            <p className="why-choose-us__text">
              From design and selections to approvals, construction and handover,
              every stage is managed under one experienced design-build team.
            </p>
          </div>

          <div className="why-choose-us__item">
            <span className="why-choose-us__number">02</span>
            <h3 className="why-choose-us__heading">
              Dedicated project <br /><strong>management</strong>
            </h3>
            <p className="why-choose-us__text">
              A single point of contact coordinating trades, timelines and budgets
              to ensure a smooth renovation experience across Sydney and Canberra.
            </p>
          </div>
        </div>

        {/* Center image */}
        <div className="why-choose-us__image-wrapper">
          <img
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/why_choose_us_house.png?updatedAt=1767743409864"
            alt="Architectural illustration representing renovation planning and construction"
            className="why-choose-us__image"
          />
        </div>

        {/* Right column */}
        <div className="why-choose-us__column why-choose-us__column--right">
          <div className="why-choose-us__item">
            <span className="why-choose-us__number">03</span>
            <h3 className="why-choose-us__heading">
              Licensed & <br />
              <strong>insured (Class 2)</strong>
            </h3>
            <p className="why-choose-us__text">
              Fully licensed and insured, delivering compliant, high-quality
              renovation and construction work you can trust.
            </p>
          </div>

          <div className="why-choose-us__item">
            <span className="why-choose-us__number">04</span>
            <h3 className="why-choose-us__heading">
              Transparent
              <br /> <strong>scope & timeline</strong>
            </h3>
            <p className="why-choose-us__text">
              Detailed proposals, defined milestones and realistic timeframes
              so you always know what to expect.
            </p>
          </div>
        </div>
      </div>

      <div className="why-choose-us__cta-wrapper">
        <Link href="/contact">
          <button className="why-choose-us__cta-button">
            Book Your Consultation
          </button>
        </Link>
      </div>
    </section>
  );
}