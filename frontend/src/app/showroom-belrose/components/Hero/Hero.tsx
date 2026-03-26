"use client";

import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const HERO_IMAGE =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg?updatedAt=1772076858918";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 120);

    const handleScroll = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visible = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height))
      );

      setScrollProgress(visible);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const moveX = (x - 0.5) * 16;
      const moveY = (y - 0.5) * 16;

      heroRef.current.style.setProperty("--mouse-x", `${moveX.toFixed(2)}px`);
      heroRef.current.style.setProperty("--mouse-y", `${moveY.toFixed(2)}px`);
    };

    const handleMouseLeave = () => {
      if (!heroRef.current) return;
      heroRef.current.style.setProperty("--mouse-x", `0px`);
      heroRef.current.style.setProperty("--mouse-y", `0px`);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const imageTranslateY = scrollProgress * 48;
  const contentTranslateY = scrollProgress * -18;
  const contentOpacity = Math.max(0.15, 1 - scrollProgress * 0.35);

  return (
    <section
      ref={heroRef}
      className={`showroom-hero ${isLoaded ? "is-loaded" : ""}`}
      style={
        {
          "--hero-image": `url("${HERO_IMAGE}")`,
        } as React.CSSProperties
      }
    >
      <div
        className="showroom-hero__bg"
        style={{
          transform: `translate3d(var(--mouse-x, 0px), calc(${imageTranslateY}px + var(--mouse-y, 0px)), 0) scale(1.08)`,
        }}
      />

      <div className="showroom-hero__vignette" />
      <div className="showroom-hero__gradient" />
      <div className="showroom-hero__glow showroom-hero__glow--one" />
      <div className="showroom-hero__glow showroom-hero__glow--two" />
      <div className="showroom-hero__grain" />

      <div className="showroom-hero__frame" />

      <div className="showroom-hero__meta showroom-hero__meta--left">
        <span className="showroom-hero__meta-label">New showroom</span>
        <span className="showroom-hero__meta-value">Belrose</span>
      </div>

      <div className="showroom-hero__meta showroom-hero__meta--right">
        <span className="showroom-hero__meta-label">Pre-launch access</span>
        <span className="showroom-hero__meta-value">Now open</span>
      </div>

      <div
        className="showroom-hero__content"
        style={{
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
          opacity: contentOpacity,
        }}
      >
        <div className="showroom-hero__eyebrow-wrap">
          <span className="showroom-hero__eyebrow-line" />
          <p className="showroom-hero__eyebrow">Inhaus — Belrose Showroom Opening</p>
        </div>

        <div className="showroom-hero__headline">
          <span className="showroom-hero__headline-line">Your home was designed</span>
          <span className="showroom-hero__headline-line">for a different</span>
          <span className="showroom-hero__headline-line showroom-hero__headline-line--accent">
            version of your life.
          </span>
        </div>

        <p className="showroom-hero__description">
          Spaces become misaligned quietly. Layouts feel closed. Rooms feel disconnected.
          What once worked no longer reflects how you live today.
        </p>

        <div className="showroom-hero__actions">
          <a href="#early-access" className="showroom-hero__button showroom-hero__button--primary">
            Get early access
          </a>

          <a href="#storytelling" className="showroom-hero__button showroom-hero__button--secondary">
            Discover the experience
          </a>
        </div>

        <div className="showroom-hero__footer-note">
          <span className="showroom-hero__footer-line" />
          <p>
            A new space to experience how renovation can bring your home back into
            alignment with the way you live now.
          </p>
        </div>
      </div>

      <div className="showroom-hero__scroll-indicator" aria-hidden="true">
        <span className="showroom-hero__scroll-text">Scroll to enter</span>
        <span className="showroom-hero__scroll-line" />
      </div>
    </section>
  );
}