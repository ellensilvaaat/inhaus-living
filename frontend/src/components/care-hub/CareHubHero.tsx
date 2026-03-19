"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import "./CareHubHero.css";

type MouseState = {
  x: number;
  y: number;
  rx: number;
  ry: number;
};

const mediaItems = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-Cio7d2EK1vs-unsplash.jpg?updatedAt=1772076785738",
    alt: "Luxury interior care inspiration",
    className: "ch-media-card--1",
    depth: 24,
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg?updatedAt=1772076858918",
    alt: "Premium renovation finish",
    className: "ch-media-card--2",
    depth: 18,
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/the-prototype-nhDyDNczz1s-unsplash.jpg?updatedAt=1772085184040",
    alt: "Curated material detail",
    className: "ch-media-card--3",
    depth: 22,
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/peter-muniz-VJ1pilUtw9o-unsplash.jpg?updatedAt=1772077284716",
    alt: "Refined interior atmosphere",
    className: "ch-media-card--4",
    depth: 16,
  },
];

export default function CareHubHero() {
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
  });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = event.clientX;
      const y = event.clientY;

      const px = (x / innerWidth - 0.5) * 2;
      const py = (y / innerHeight - 0.5) * 2;

      setMouse({
        x,
        y,
        rx: px,
        ry: py,
      });
    };

    const handleLeave = () => {
      setMouse((prev) => ({
        ...prev,
        rx: 0,
        ry: 0,
      }));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const sceneStyle = useMemo(
    () =>
      ({
        "--mx": `${mouse.x}px`,
        "--my": `${mouse.y}px`,
        "--rx": `${mouse.rx}`,
        "--ry": `${mouse.ry}`,
      }) as React.CSSProperties,
    [mouse]
  );

  return (
    <section className="ch-hero" style={sceneStyle}>
      <div className="ch-bg-base" />
      <div className="ch-bg-gradient ch-bg-gradient--1" />
      <div className="ch-bg-gradient ch-bg-gradient--2" />
      <div className="ch-bg-gradient ch-bg-gradient--3" />
      <div className="ch-grid" />
      <div className="ch-noise" />
      <div className="ch-vignette" />

      <div className="ch-cursor-glow" aria-hidden="true" />
      <div className="ch-center-glow" aria-hidden="true" />

      <header className="ch-nav">
        <div className="ch-nav-inner">
          <a href="/" className="ch-brand" aria-label="Inhaus Living home">
            <Image
              src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-420,f-webp,q-90"
              alt="Inhaus Living"
              width={170}
              height={38}
              priority
              className="ch-brand-logo"
            />
          </a>

          <div className="ch-nav-right">
            <div className="ch-nav-labelWrap">
              <span className="ch-nav-kicker">Care Hub</span>
              <span className="ch-nav-sub">by Inhaus Living</span>
            </div>

            <a href="/" className="ch-nav-back">
              Back to website
              <span className="ch-nav-backLine" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <div className="ch-scene">
        <div className="ch-media-layer" aria-hidden="true">
          {mediaItems.map((item) => (
            <figure
              key={item.className}
              className={`ch-media-card ${item.className}`}
              style={
                {
                  "--depth": item.depth,
                } as React.CSSProperties
              }
            >
              <div className="ch-media-cardFrame">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="ch-media-image"
                />
              </div>
              <span className="ch-media-shine" />
            </figure>
          ))}

          <div className="ch-glass ch-glass--left" />
          <div className="ch-glass ch-glass--right" />
        </div>

        <div className="ch-hero-center">
          <span className="ch-label">
            Inhaus Client Experience
            <span className="ch-labelDot" aria-hidden="true" />
          </span>

          <h1 className="ch-title">
            <span className="ch-title-line">CARE</span>
            <span className="ch-title-line ch-title-line--accent">HUB</span>
            <span className="ch-title-sweep" aria-hidden="true" />
          </h1>

          <p className="ch-subtitle">
            Designed to help protect materials, preserve finishes, and maintain the beauty
            of your renovation long after completion.
          </p>

          <div className="ch-ctaRow">
            <a href="#guides" className="ch-cta ch-cta--primary">
              Explore Care Guides
              <span className="ch-ctaGlow" aria-hidden="true" />
            </a>
          </div>

          <div className="ch-trust">
            <div className="ch-trustItem">
              <span className="ch-trustValue">Premium</span>
              <span className="ch-trustLabel">After-care guidance</span>
            </div>

            <div className="ch-trustItem">
              <span className="ch-trustValue">Curated</span>
              <span className="ch-trustLabel">By the Inhaus team</span>
            </div>

            <div className="ch-trustItem">
              <span className="ch-trustValue">Long-term</span>
              <span className="ch-trustLabel">Care for your finishes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ch-scrollHint" aria-hidden="true">
        <span className="ch-scrollMouse" />
        <span className="ch-scrollText">Scroll</span>
      </div>
    </section>
  );
}