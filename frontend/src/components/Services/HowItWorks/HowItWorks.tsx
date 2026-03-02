"use client";

import "./HowItWorks.css";

const steps = [
  {
    id: "01",
    title: "Initial site consultation",
    description:
      "Each renovation begins with a detailed discussion of your vision and property conditions, ensuring tailored recommendations and alignment with expectations.",
  },
  {
    id: "02",
    title: "In-store meeting",
    description:
      "A collaborative session to refine design and function, explore options, and make informed choices aligned with your vision, budget, and timeline.",
  },
  {
    id: "03",
    title: "Formulating the scope of works",
    description:
      "We outline every project detail based on your input and site assessments, ensuring clarity and alignment through open communication before moving forward.",
  },
  {
    id: "04",
    title: "Project Delivery",
    description:
      "Our Project Managers lead the renovation with precision, managing everything from demolition to installation while keeping you informed and ensuring quality and timely delivery.",
  },
  {
    id: "05",
    title: "New Beginning",
    description:
      "We conduct a final inspection to ensure the highest standards and deliver a finished project ready for you to enjoy.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="how-it-works"
      id="process"
    >
      <div className="how-it-works__overlay">
        <h2 className="how-it-works__title">
          HOW IT WORKS
        </h2>

        <p className="how-it-works__subtitle">
          From first meeting to final handover, we guide you through every stage with precision
        </p>

        <div className="how-it-works__timeline">
          <div className="how-it-works__line"></div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="how-it-works__step"
            >
              <div className="how-it-works__dot" />
              <h3 className="how-it-works__number">
                {step.id}
              </h3>
              <h4 className="how-it-works__step-title">
                {step.title}
              </h4>
              <p className="how-it-works__step-desc">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}