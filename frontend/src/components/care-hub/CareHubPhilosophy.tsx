"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import "./CareHubPhilosophy.css";

type PhilosophyBlock = {
  title: string;
  text: string;
  image: string;
};

const blocks: PhilosophyBlock[] = [
  {
    title: "Longevity over quick fixes",
    text: "True quality is not maintained through aggressive cleaning, but through consistency, care and restraint over time.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-Cio7d2EK1vs-unsplash.jpg?updatedAt=1772076785738",
  },
  {
    title: "Materials deserve respect",
    text: "Every surface has its own behaviour. Understanding materials is what allows a space to age with elegance and integrity.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/the-prototype-nhDyDNczz1s-unsplash.jpg?updatedAt=1772085184040",
  },
  {
    title: "Consistency creates beauty",
    text: "Small, repeated habits preserve the integrity of a space far more than occasional deep maintenance ever could.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/peter-muniz-VJ1pilUtw9o-unsplash.jpg?updatedAt=1772077284716",
  },
];

type MouseState = {
  x: number;
  y: number;
  rx: number;
  ry: number;
};

export default function CareHubPhilosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      className="chp-section"
      style={sceneStyle}
      aria-label="The Inhaus care philosophy"
    >
      <div className="chp-cursorGlow" aria-hidden="true" />
      <div className="chp-bgGradient chp-bgGradient--1" aria-hidden="true" />
      <div className="chp-bgGradient chp-bgGradient--2" aria-hidden="true" />
      <div className="chp-bgGradient chp-bgGradient--3" aria-hidden="true" />
      <div className="chp-noise" aria-hidden="true" />
      <div className="chp-vignette" aria-hidden="true" />

      <div className="chp-shell">
        <div className="chp-header" data-reveal>
          <span className="chp-kicker">
            The Inhaus Care Standard
            <span className="chp-kickerDot" aria-hidden="true" />
          </span>

          <h2 className="chp-title">
            <span className="chp-titleGradient">Care is part</span>
            <br />
            <span>of the design.</span>
          </h2>

          <p className="chp-subtitle">
            We don’t just design spaces. We design how they age — with
            consistency, restraint and material respect.
          </p>
        </div>

        <div className="chp-timeline" aria-hidden="true" />

        <div className="chp-blocks">
          {blocks.map((block, index) => (
            <article
              key={block.title}
              className={`chp-block ${index % 2 === 1 ? "is-reverse" : ""}`}
              data-reveal
            >
              <div className="chp-mediaWrap">
                <div className="chp-mediaGlow" />
                <div className="chp-mediaCard">
                  <div className="chp-mediaFrame">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="chp-mediaImage"
                    />
                    <div className="chp-mediaOverlay" />
                    <div className="chp-mediaShine" />
                  </div>
                </div>
              </div>

              <div className="chp-content">
                <span className="chp-index">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <h3 className="chp-blockTitle">{block.title}</h3>

                <p className="chp-blockText">{block.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="chp-footer" data-reveal>
          <span className="chp-footerLine" aria-hidden="true" />
          <span className="chp-footerText">Inhaus Living</span>
          <span className="chp-footerLine" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}