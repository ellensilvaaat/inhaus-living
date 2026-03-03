"use client";

import { useMemo, useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./projectDetail.css";
import { projectsData } from "@/content/projects";

interface Props {
  slug: string;
}

const getOptimizedUrl = (url: string, width = 1400, quality = 80) => {
  if (!url) return "";
  const baseUrl = url.split("?")[0];
  return `${baseUrl}?tr=w-${width},q-${quality},f-auto,dpr-auto,us-2`;
};

function getProjectService(slug: string) {
  if (!slug) return "Renovation";
  const s = slug.toLowerCase();
  if (s.includes("bathroom")) return "Bathroom Renovation";
  if (s.includes("kitchen")) return "Kitchen Renovation";
  if (s.includes("apartment")) return "Apartment Renovation";
  if (s.includes("full")) return "Full Home Renovation";
  if (s.includes("build") || s.includes("duplex")) return "New Build";
  if (s.includes("extension")) return "Home Extension";
  return "Renovation";
}

function getProjectQuote(slug: string) {
  if (!slug) return "“Design is about feeling at home.”";
  const s = slug.toLowerCase();
  if (s.includes("bathroom")) return "“Luxury is when comfort meets intention.”";
  if (s.includes("kitchen")) return "“The kitchen is where daily life truly connects.”";
  if (s.includes("apartment")) return "“Great spaces are measured in moments, not metres.”";
  return "“Great design is built on purpose, not trends.”";
}

function cleanContent(raw = "") {
  return raw
    .replace(/Make an enquiry today[\s\S]*/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function autoParagraphs(text: string, maxLength = 520) {
  if (!text) return [];
  const sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/g);
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      paragraphs.push(current.trim());
      current = sentence + " ";
    } else {
      current += sentence + " ";
    }
  }
  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

function highlightKeywords(text: string, project: any) {
  const keywords = [
    project.title,
    "Kitchen Renovation",
    "Bathroom Renovation",
    "Apartment Renovation",
    "Full Home Renovation",
    "New Build",
    "Home Extension",
  ];

  let result = text;
  keywords.forEach((keyword) => {
    const safe = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${safe})\\b`, "gi");
    result = result.replace(regex, "<strong>$1</strong>");
  });

  return result;
}

export default function ProjectDetail({ slug }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLElement | null>(null);

  const project = useMemo(() => projectsData.find((p) => p.slug === slug), [slug]);

  const allImages = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.gallery) && project.gallery.length) return project.gallery;
    if (Array.isArray(project.gallery) && project.gallery.length) return project.gallery;
    return project.heroImage ? [project.heroImage] : [];
  }, [project]);

  // ===== Scroll progress + hero parallax =====
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  const heroY = useTransform(progress, [0, 1], [0, 120]);
  const heroScale = useTransform(progress, [0, 0.7, 1], [1.04, 1.02, 1]);
  const heroOverlayOpacity = useTransform(progress, [0, 0.25], [0.55, 0.75]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const nextImg = useCallback(() => {
    if (!allImages.length) return;
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
  }, [allImages.length]);

  const prevImg = useCallback(() => {
    if (!allImages.length) return;
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 < 0 ? allImages.length - 1 : prev - 1) : 0
    );
  }, [allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "Escape") setCurrentIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, nextImg, prevImg]);

  // ===== reveal on scroll (premium) =====
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".project-text, .project-quote, .project-images, .project-image-wide, .project-gallery, .project-cta"
      )
    );

    targets.forEach((el) => el.classList.add("reveal"));

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("reveal--in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal--in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!project) return null;

  const paragraphs = autoParagraphs(cleanContent(project.content || ""));

  const heroSrc = getOptimizedUrl(project.heroImage || allImages[0], 2200, 85);

  return (
    <section className="project-detail" ref={rootRef}>
      {/* ===== premium progress bar ===== */}
      <div className="project-progress" aria-hidden="true">
        <motion.div className="project-progress__bar" style={{ scaleX: progress }} />
      </div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentIndex(null)}
          >
            <motion.div
              className="lightbox-surface"
              initial={{ opacity: 0, scale: 0.985, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" aria-label="Close gallery" onClick={() => setCurrentIndex(null)}>
                ×
              </button>

              <button
                className="nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImg();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="lightbox-container">
                <motion.img
                  key={allImages[currentIndex]}
                  src={getOptimizedUrl(allImages[currentIndex], 1800, 88)}
                  alt={`${project.title} full view`}
                  className="lightbox-main"
                  initial={{ opacity: 0, scale: 0.992 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  draggable={false}
                />
              </div>

              <button
                className="nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImg();
                }}
                aria-label="Next image"
              >
                ›
              </button>

              <div className="lightbox-meta">
                <span className="lightbox-meta__pill">{getProjectService(project.slug)}</span>
                <span className="lightbox-meta__count">
                  {currentIndex + 1} / {allImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO ===== */}
      <div className="project-detail__hero">
        <motion.img
          src={heroSrc}
          alt={project.title}
          className="project-detail__hero-bg"
          loading="eager"
          style={{ y: heroY, scale: heroScale }}
          draggable={false}
        />

        <motion.div className="project-detail__hero-overlay" style={{ opacity: heroOverlayOpacity }} />

        {/* luxury grain */}
        <div className="project-detail__grain" aria-hidden="true" />

        <div className="project-detail__hero-content">
          <motion.span
            className="project-detail__service"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {getProjectService(project.slug)}
          </motion.span>

          <motion.h1
            className="project-detail__title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.05 }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="project-detail__hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.1 }}
          >
            <button
              className="project-detail__hero-btn"
              type="button"
              onClick={() => {
                const el = document.querySelector(".project-detail__container");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore the project
            </button>

            <Link href="/contact" className="project-detail__hero-btn ghost">
              Book a consultation
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="project-detail__container">
        <div className="project-layout">
          <section className="project-block">
            {paragraphs.slice(0, 2).map((text, i) => (
              <p
                key={i}
                className="project-text"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(text, project),
                }}
              />
            ))}

            <div className="project-images two-equal">
              {allImages.slice(0, 2).map((img, i) => (
                <button
                  key={i}
                  className="img-wrapper"
                  onClick={() => setCurrentIndex(i)}
                  type="button"
                  aria-label={`Open image ${i + 1}`}
                >
                  <img
                    src={getOptimizedUrl(img, 1200, 80)}
                    alt={`${project.title} interior detail`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="img-shine" aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>

          {allImages.length >= 4 && (
            <section className="project-block">
              <p className="project-quote">{getProjectQuote(project.slug)}</p>

              <div className="project-images two-asymmetric">
                {[2, 3].map((idx) => (
                  <button
                    key={idx}
                    className="img-wrapper"
                    onClick={() => setCurrentIndex(idx)}
                    type="button"
                    aria-label={`Open image ${idx + 1}`}
                  >
                    <img
                      src={getOptimizedUrl(allImages[idx], 1200, 80)}
                      alt={`${project.title} design view`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span className="img-shine" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {allImages[4] && (
            <section className="project-block">
              <button
                className="project-image-wide"
                onClick={() => setCurrentIndex(4)}
                type="button"
                aria-label="Open wide image"
              >
                <img
                  src={getOptimizedUrl(allImages[4], 1800, 85)}
                  alt={`${project.title} panoramic view`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="img-shine wide" aria-hidden="true" />
              </button>
            </section>
          )}

          {allImages.length > 5 && (
            <section className="project-gallery">
              {allImages.slice(5).map((img, i) => (
                <button
                  key={i}
                  className="img-wrapper"
                  onClick={() => setCurrentIndex(i + 5)}
                  type="button"
                  aria-label={`Open gallery image ${i + 6}`}
                >
                  <img
                    src={getOptimizedUrl(img, 700, 78)}
                    alt={`${project.title} additional detail`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="img-shine" aria-hidden="true" />
                </button>
              ))}
            </section>
          )}

          <section className="project-cta">
            <div className="project-cta__inner">
              <h3>Ready to create a home that feels like you?</h3>
              <p>
                Let’s shape a space that looks beautiful <br />
                and lives even better.
              </p>
              <Link href="/contact" className="project-cta__btn">
                Book a consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}