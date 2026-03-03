"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./CounterSection.css";

const stats = [
  { id: 1, plus: "+", value: 20, label: "Years of Experience" },
  { id: 3, plus: "+", value: 800, label: "Renovation Projects Delivered" },
  { id: 4, plus: "+", value: 35, label: "Trusted Brand Partners" },
];

export default function CounterSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="counter-section" ref={ref}>
      <div className="counter-section__intro">
        <h2 className="counter-section__title">
          Proven Results Across Sydney & Canberra
        </h2>

        <p className="counter-section__subtitle">
          With over two decades of experience, our Class 2 (NCC) licensed
          design-build team has delivered hundreds of high-quality renovation
          and construction projects with precision and care.
        </p>
      </div>

      <div className="counter-section__stats">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="counter-section__stat"
          >
            <div className="counter-section__value">
              <span className="counter-section__plus">
                {stat.plus}
              </span>

              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={3}
                  separator=","
                />
              ) : (
                <span>0</span>
              )}
            </div>

            <div className="counter-section__label">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}