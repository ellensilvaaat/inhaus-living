"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsMapImpact.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsMapImpact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const idleCallback =
      (window as any).requestIdleCallback ||
      function (cb: Function) {
        return setTimeout(cb, 1);
      };

    idleCallback(() => {
      if (!sectionRef.current) return;

      gsap.set(labelsRef.current, {
        opacity: 0,
        y: 30,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          labelsRef.current.forEach((el, i) => {
            if (!el) return;

            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.15,
              ease: "power2.out",
            });
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) =>
        t.kill()
      );
    };
  }, []);

  const labelData = [
    { class: "northern-beaches", text: ["297+ Projects", "in Northern Beaches"] },
    { class: "eastern-suburbs", text: ["380+ Projects", "in Eastern Suburbs"] },
    { class: "sutherland-shire", text: ["129+ Projects", "in Sutherland Shire"] },
    { class: "inner-west", text: ["85+ Projects", "in Inner West"] },
    { class: "parramatta", text: ["42+ Projects", "in Parramatta"] },
    { class: "north-west", text: ["21+ Projects", "in Western Sydney"] },
    { class: "south-sydney", text: ["117+ Projects", "in South Sydney"] },
    { class: "south-west", text: ["34+ Projects", "in South West"] },
    { class: "sydney-city", text: ["89+ Projects", "in Sydney City"] },
    { class: "outer-west", text: ["67+ Projects", "in Outer West"] },
    { class: "lower-north-shore", text: ["75+ Projects", "in Lower North Shore"] },
    { class: "upper-north-shore", text: ["24+ Projects", "in Upper North Shore"] },
  ];

  return (
    <section ref={sectionRef} className="map-impact-section">
      <div className="map-impact-stage">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Frame%202.png?tr=w-1400,q-60,f-webp"
          className="map-layer"
          alt="Sydney map grey"
          loading="lazy"
          decoding="async"
        />

        <div className="map-labels-container">
          {labelData.map((label, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) labelsRef.current[i] = el;
              }}
              className={`map-label ${label.class}`}
            >
              <span>{label.text[0]}</span>
              <br />
              <span>{label.text[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}