"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./Tension.css";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export default function Tension() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      const raw = -rect.top / Math.max(totalScrollable, 1);
      const clamped = clamp(raw);

      // 🔥 SMOOTH (resolve travado)
      progressRef.current += (clamped - progressRef.current) * 0.08;

      setProgress(progressRef.current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // 🔥 TIMING AJUSTADO
  const tensionReveal = mapProgress(progress, 0.05, 0.18);
  const gridReveal = mapProgress(progress, 0.18, 0.40);
  const bridgeReveal = mapProgress(progress, 0.45, 0.60);
  const possibilityReveal = mapProgress(progress, 0.65, 0.82);
  const endReveal = mapProgress(progress, 0.85, 1);

  // 🔥 NÃO TRAVA DURANTE GRID
  const stageTranslate = useMemo(() => {
    const intro =
      progress < 0.4
        ? progress * -18
        : -18;

    return `translate3d(0, ${intro}px, 0)`;
  }, [progress]);

  // 🔥 EASING NO GRID
  const easedGrid = gridReveal * gridReveal;

  const panelScale = 0.96 + easedGrid * 0.04;
  const panelOpacity = 0.2 + easedGrid * 0.8;

  return (
    <section ref={sectionRef} className="tension-section" id="tension">
      <div className="tension-section__sticky">
        <div className="tension-section__bg" />
        <div className="tension-section__radial tension-section__radial--one" />
        <div className="tension-section__radial tension-section__radial--two" />
        <div className="tension-section__noise" />

        <div
          className="tension-section__inner"
          style={{ transform: stageTranslate }}
        >
          <div
            className="tension-section__intro"
            style={{
              opacity: tensionReveal,
              transform: `translate3d(0, ${32 - tensionReveal * 32}px, 0)`,
            }}
          >
            <div className="tension-section__eyebrow">
              <span className="tension-section__eyebrow-line" />
              <p>The friction you feel every day</p>
            </div>

            <h2 className="tension-section__title">
              Layouts feel closed.
              <br />
              Spaces feel disconnected.
            </h2>

            <p className="tension-section__lede">
              Not because your life stopped making sense. Because your home no
              longer reflects the way it moves.
            </p>
          </div>

          <div
            className="tension-section__panel"
            style={{
              opacity: panelOpacity,
              transform: `scale(${panelScale}) translate3d(0, ${28 - gridReveal * 28}px, 0)`,
            }}
          >
            <div className="tension-section__panel-grid">
              <article
                className="tension-card tension-card--soft"
                style={{
                  opacity: mapProgress(progress, 0.2, 0.34),
                  transform: `translate3d(0, ${34 - mapProgress(progress, 0.2, 0.34) * 34}px, 0)`,
                }}
              >
                <span className="tension-card__index">01</span>
                <h3>Flow breaks down</h3>
                <p>
                  The home asks you to adapt to it, instead of supporting how
                  you actually live now.
                </p>
              </article>

              <article
                className="tension-card tension-card--accent"
                style={{
                  opacity: mapProgress(progress, 0.28, 0.44),
                  transform: `translate3d(0, ${34 - mapProgress(progress, 0.28, 0.44) * 34}px, 0)`,
                }}
              >
                <span className="tension-card__index">02</span>
                <h3>Rooms lose meaning</h3>
                <p>
                  Spaces that once worked begin to feel underused, fragmented,
                  or disconnected from your routines.
                </p>
              </article>

              <article
                className="tension-card tension-card--soft"
                style={{
                  opacity: mapProgress(progress, 0.34, 0.5),
                  transform: `translate3d(0, ${34 - mapProgress(progress, 0.34, 0.5) * 34}px, 0)`,
                }}
              >
                <span className="tension-card__index">03</span>
                <h3>Life keeps moving</h3>
                <p>
                  Your priorities evolved. The layout didn’t. And the gap
                  becomes part of everyday life.
                </p>
              </article>

              <article
                className="tension-card tension-card--outline"
                style={{
                  opacity: mapProgress(progress, 0.4, 0.56),
                  transform: `translate3d(0, ${34 - mapProgress(progress, 0.4, 0.56) * 34}px, 0)`,
                }}
              >
                <span className="tension-card__index">04</span>
                <h3>Comfort turns into compromise</h3>
                <p>
                  What once supported your home life now creates subtle friction,
                  day after day.
                </p>
              </article>
            </div>
          </div>

          <div
            className="tension-section__bridge"
            style={{
              opacity: bridgeReveal,
              transform: `translate3d(0, ${20 - bridgeReveal * 20}px, 0)`,
            }}
          >
            <p>
              The problem is not that your life changed.
              <span> It’s that your home didn’t evolve with it.</span>
            </p>
          </div>

          <div
            className="tension-section__possibility"
            style={{
              opacity: possibilityReveal,
              transform: `translate3d(0, ${26 - possibilityReveal * 26}px, 0)`,
            }}
          >
            <div className="tension-section__possibility-mark" />
            <h3>
              What if your home
              <br />
              was designed for how you live today?
            </h3>
            <p>
              Renovation is not just change. It is realignment. A way to bring
              clarity, openness and intention back into the spaces you live in
              every day.
            </p>
          </div>

          <div
            className="tension-section__handoff"
            style={{
              opacity: endReveal,
              transform: `translate3d(0, ${24 - endReveal * 24}px, 0)`,
            }}
          >
            <span className="tension-section__handoff-line" />
            <p>
              Inhaus transforms homes into spaces aligned with your lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}