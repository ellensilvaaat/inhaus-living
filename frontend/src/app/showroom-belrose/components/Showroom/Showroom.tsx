"use client";

import { useEffect, useRef, useState } from "react";
import "./Showroom.css";

const images = [
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/jonathan-borba-COzqEKjaxqo-unsplash.jpg?updatedAt=1770867614175",
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-varhNULWOBE-unsplash.jpg?updatedAt=1767997426792",
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/brian-zajac-lE7pmNZZ3Fw-unsplash.jpg?updatedAt=1767842616798",
];

export default function Showroom() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 detectar mobile corretamente
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="showroom">
      <div className="showroom-inner">

        <div className="showroom-text">
          <p className="eyebrow">A new experience is coming</p>

          <h2>
            A space designed to reflect
            <br />
            how you live today.
          </h2>

          <p className="description">
            The Belrose showroom is not just a place to see design.  
            It’s a space to experience what your home can become — 
            open, connected, and aligned with your life.
          </p>
        </div>

        <div className="showroom-grid">
          {images.map((src, i) => (
            <div
              key={i}
              className="image-wrapper"
              style={{
                transform: isMobile
                  ? "none"
                  : `translateY(${progress * (i % 2 === 0 ? -40 : 40)}px)`
              }}
            >
              <img src={`${src}?w=1200&q=80`} alt="space" />
            </div>
          ))}
        </div>

        <div
          className="showroom-highlight"
          style={{
            opacity: progress,
            transform: `translateY(${40 - progress * 40}px)`
          }}
        >
          <h3>
            This is not about renovation.
            <br />
            It’s about realignment.
          </h3>
        </div>

      </div>
    </section>
  );
}