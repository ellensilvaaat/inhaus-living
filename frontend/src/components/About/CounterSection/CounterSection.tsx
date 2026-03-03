"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import "./CounterSection.css";

const stats = [
  { id: 1, plus: "+", value: 20, label: "Years of Experience" },
  { id: 3, plus: "+", value: 800, label: "Renovation Projects Delivered" },
  { id: 4, plus: "+", value: 35, label: "Trusted Brand Partners" },
];

export default function CounterSection() {

  const sectionRef = useRef<HTMLElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  /* PARALLAX BACKGROUND */

  useEffect(() => {

    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {

      const rect = el.getBoundingClientRect();
      const offset = rect.top * -0.15;

      el.style.setProperty("--parallax", `${offset}px`);

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <section
      className={`counter-section ${inView ? "counter-visible" : ""}`}
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
    >
      <div className="counter-section__intro">

        <h2 className="counter-section__title">
          Proven Results Across Sydney and Canberra
        </h2>

        <p className="counter-section__subtitle">
          With over two decades of experience, our licensed
          design-build team has delivered hundreds of high-quality renovation
          and construction projects with precision and care.
        </p>

      </div>

      <div className="counter-section__stats">

        {stats.map((stat) => (

          <div
            key={stat.id}
            className={`counter-section__stat ${inView ? "stat-visible" : ""}`}
          >

            <div className="counter-section__value">

              <span className="counter-section__plus">
                {stat.plus}
              </span>

              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.8}
                  separator=","
                  easingFn={(t, b, c, d) => {
                    t /= d;
                    return -c * t * (t - 2) + b; // cinematic ease
                  }}
                />
              ) : (
                <span>0</span>
              )}

            </div>

            <div className="counter-section__line"></div>

            <div className="counter-section__label">
              {stat.label}
            </div>

          </div>

        ))}

      </div>
    </section>
  );
}