"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import "./CardsSection.css";
import arrowIcon from "@/assets/arrow.svg";

const cardsData = [
  {
    title: "Home Renovations",
    description:
      "Whole-home transformations planned, built and finished under one roof.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card1.jpg?tr=w-800,f-webp,q-95",
    anchor: "homes",
  },
  {
    title: "Apartment Renovations",
    description:
      "Clever space planning and strata-savvy builds for effortless apartment upgrades.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/elena-popova-NYIDN7fBfkI-unsplash.jpg?tr=w-500,f-webp,q-95",
    anchor: "apartments",
  },
  {
    title: "Kitchen Renovations",
    description:
      "High-performance layouts, premium finishes, integrated appliances.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-800,f-webp,q-95",
    anchor: "kitchens",
  },
  {
    title: "Bathroom Renovations",
    description:
      "Spa-level details, quality waterproofing, lighting and fixtures.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card4.jpg?tr=w-700,f-webp,q-95",
    anchor: "bathrooms",
  },
  {
    title: "Flooring Services",
    description:
      "Hybrid, timber, parquetry and carpet; specified and installed.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card5.jpg?tr=w-700,f-webp,q-95",
    anchor: "flooring",
  },
  {
    title: "Construction & Additions",
    description:
      "Licensed builders for extensions, new builds and second-storey additions.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/0baa5f64-bab8-432c-a9ed-55bfa89fbb16.JPG?tr=w-1400,f-webp,q-95",
    anchor: "construction",
  },
];

export default function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.classList.add("is-inview");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-inview");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let pointerId: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;

      if (e.pointerType === "mouse" && e.button !== 0) return;

      isDown = true;
      pointerId = e.pointerId;
      track.setPointerCapture(pointerId);

      track.classList.add("is-dragging");
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;

      const dx = e.clientX - startX;
      track.scrollLeft = startScrollLeft - dx;

      e.preventDefault();
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;

      if (pointerId !== null) {
        try {
          track.releasePointerCapture(pointerId);
        } catch {}
      }
      pointerId = null;

      track.classList.remove("is-dragging");
    };

    track.addEventListener("pointerdown", onPointerDown, { passive: false });
    track.addEventListener("pointermove", onPointerMove, { passive: false });
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", endDrag);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = sectionRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".cards-section__card[data-tilt]")
    );

    const onMove = (card: HTMLElement, e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const max = 9;
      const ry = (x - 0.5) * (max * 2);
      const rx = (0.5 - y) * (max * 2);

      card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      card.classList.add("is-tilting");
    };

    const onLeave = (card: HTMLElement) => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--mx", `50%`);
      card.style.setProperty("--my", `50%`);
    };

    const cleanups: Array<() => void> = [];

    for (const card of cards) {
      const handleMove = (e: PointerEvent) => onMove(card, e);
      const handleLeave = () => onLeave(card);

      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--mx", `50%`);
      card.style.setProperty("--my", `50%`);

      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
      card.addEventListener("pointercancel", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
        card.removeEventListener("pointercancel", handleLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [prefersReducedMotion]);

  return (
    <section className="cards-section" ref={sectionRef}>
      <div className="cards-section__header">
        <h2 className="cards-section__title">
          Design–Build Renovation and Construction Services
        </h2>
        <p className="cards-section__subtitle">
          Spaces that welcome you home, delivered by a licensed team across Sydney and Canberra.
        </p>
      </div>

      <div className="cards-section__scroll" ref={scrollRef}>
        {cardsData.map((card, index) => (
          <Link
            key={index}
            href={`/services#${card.anchor}`}
            className="cards-section__card"
            data-tilt
          >
            <Image
              src={card.image}
              alt={card.title}
              width={800}
              height={600}
              className="cards-section__img-bg"
              loading="lazy"
            />

            <div className="cards-section__overlay"></div>

            <div className="cards-section__content">
              <div className="cards-section__white-box">
                <h3 className="cards-section__card-title">{card.title}</h3>
              </div>

              <p className="cards-section__description">{card.description}</p>

              <div className="cards-section__btn">
                <Image src={arrowIcon} alt="arrow" width={24} height={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/projects" className="cs-cta-main">
        Explore Projects
        <span className="cs-cta-line cs-cta-line--tr"></span>
        <span className="cs-cta-line cs-cta-line--bl"></span>
      </Link>
    </section>
  );
}