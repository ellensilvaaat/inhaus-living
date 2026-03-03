"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsMapImpact.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsMapImpact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);
  const mapRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Map subtle reveal
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 1.04, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Labels reveal
      gsap.set(labelsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: "blur(8px)",
      });

      gsap.to(labelsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Subtle floating animation
      labelsRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: "+=6",
          duration: 3 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
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
          ref={mapRef}
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Frame%202.png?tr=w-1600,q-70,f-webp"
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
              <span>{label.text[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}