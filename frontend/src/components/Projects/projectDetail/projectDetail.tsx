"use client";

import {
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "./projectDetail.css";
import { projectsData } from "@/content/projects";

interface Props {
  slug: string;
}

const getOptimizedUrl = (
  url: string,
  width = 1400,
  quality = 80
) => {
  if (!url) return "";
  const baseUrl = url.split("?")[0];
  return `${baseUrl}?tr=w-${width},q-${quality},f-auto,dpr-auto,us-2`;
};

function getProjectService(slug: string) {
  if (!slug) return "Renovation";
  const s = slug.toLowerCase();
  if (s.includes("bathroom"))
    return "Bathroom Renovation";
  if (s.includes("kitchen"))
    return "Kitchen Renovation";
  if (s.includes("apartment"))
    return "Apartment Renovation";
  if (s.includes("full"))
    return "Full Home Renovation";
  if (s.includes("build")) return "New Build";
  return "Renovation";
}

function getProjectQuote(slug: string) {
  if (!slug)
    return "“Design is about feeling at home.”";
  const s = slug.toLowerCase();
  if (s.includes("bathroom"))
    return "“Luxury is when comfort meets intention.”";
  if (s.includes("kitchen"))
    return "“The kitchen is where daily life truly connects.”";
  return "“Great design is built on purpose, not trends.”";
}

function cleanContent(raw = "") {
  return raw
    .replace(/Make an enquiry today[\s\S]*/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function autoParagraphs(
  text: string,
  maxLength = 500
) {
  if (!text) return [];
  const sentences = text.split(
    /(?<=[.?!])\s+(?=[A-Z])/g
  );
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

  if (current.trim())
    paragraphs.push(current.trim());

  return paragraphs;
}

function highlightKeywords(
  text: string,
  project: any
) {
  const keywords = [
    project.title,
    "Kitchen Renovation",
    "Bathroom Renovation",
    "Apartment Renovation",
    "Full Home Renovation",
  ];

  let result = text;

  keywords.forEach((keyword) => {
    const regex = new RegExp(
      `\\b(${keyword})\\b`,
      "gi"
    );
    result = result.replace(
      regex,
      "<strong>$1</strong>"
    );
  });

  return result;
}

export default function ProjectDetail({
  slug,
}: Props) {
  const [currentIndex, setCurrentIndex] =
    useState<number | null>(null);

  const project = useMemo(
    () =>
      projectsData.find(
        (p) => p.slug === slug
      ),
    [slug]
  );

  const allImages = useMemo(() => {
    if (!project) return [];
    return Array.isArray(project.gallery)
      ? project.gallery
      : project.heroImage
      ? [project.heroImage]
      : [];
  }, [project]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const nextImg = useCallback(() => {
    if (!allImages.length) return;
    setCurrentIndex((prev) =>
      prev !== null
        ? (prev + 1) % allImages.length
        : 0
    );
  }, [allImages.length]);

  const prevImg = useCallback(() => {
    if (!allImages.length) return;
    setCurrentIndex((prev) =>
      prev !== null
        ? prev - 1 < 0
          ? allImages.length - 1
          : prev - 1
        : 0
    );
  }, [allImages.length]);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight")
        nextImg();
      if (e.key === "ArrowLeft")
        prevImg();
      if (e.key === "Escape")
        setCurrentIndex(null);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [currentIndex, nextImg, prevImg]);

  if (!project) return null;

  const paragraphs = autoParagraphs(
    cleanContent(project.content || "")
  );

  return (
    <section className="project-detail">
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setCurrentIndex(null)
            }
          >
            <button
              className="lightbox-close"
              aria-label="Close gallery"
            >
              ×
            </button>

            <button
              className="nav-btn prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImg();
              }}
            >
              ‹
            </button>

            <div className="lightbox-container">
              <motion.img
                key={
                  allImages[currentIndex]
                }
                src={getOptimizedUrl(
                  allImages[currentIndex],
                  1600,
                  85
                )}
                alt={`${project.title} full view`}
                className="lightbox-main"
                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              className="nav-btn next"
              onClick={(e) => {
                e.stopPropagation();
                nextImg();
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="project-detail__hero">
        <img
          src={getOptimizedUrl(
            project.heroImage ||
              allImages[0],
            1920,
            80
          )}
          alt={project.title}
          className="project-detail__hero-bg"
          loading="eager"
        />

        <div className="project-detail__hero-overlay" />

        <div className="project-detail__hero-content">
          <span className="project-detail__service">
            {getProjectService(
              project.slug
            )}
          </span>
          <h1 className="project-detail__title">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="project-detail__container">
        <div className="project-layout">
          <section className="project-block">
            {paragraphs
              .slice(0, 2)
              .map((text, i) => (
                <p
                  key={i}
                  className="project-text"
                  dangerouslySetInnerHTML={{
                    __html:
                      highlightKeywords(
                        text,
                        project
                      ),
                  }}
                />
              ))}

            <div className="project-images two-equal">
              {allImages
                .slice(0, 2)
                .map((img, i) => (
                  <div
                    key={i}
                    className="img-wrapper"
                    onClick={() =>
                      setCurrentIndex(i)
                    }
                  >
                    <img
                      src={getOptimizedUrl(
                        img,
                        1000,
                        75
                      )}
                      alt={`${project.title} interior detail`}
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
          </section>

          {allImages.length >= 4 && (
            <section className="project-block">
              <p className="project-quote">
                {getProjectQuote(
                  project.slug
                )}
              </p>

              <div className="project-images two-asymmetric">
                {[2, 3].map(
                  (idx) => (
                    <div
                      key={idx}
                      className="img-wrapper"
                      onClick={() =>
                        setCurrentIndex(
                          idx
                        )
                      }
                    >
                      <img
                        src={getOptimizedUrl(
                          allImages[idx],
                          1000,
                          75
                        )}
                        alt={`${project.title} design view`}
                        loading="lazy"
                      />
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {allImages[4] && (
            <section className="project-block">
              <div
                className="project-image-wide"
                onClick={() =>
                  setCurrentIndex(4)
                }
              >
                <img
                  src={getOptimizedUrl(
                    allImages[4],
                    1600,
                    80
                  )}
                  alt={`${project.title} panoramic view`}
                  loading="lazy"
                />
              </div>
            </section>
          )}

          {allImages.length > 5 && (
            <section className="project-gallery">
              {allImages
                .slice(5)
                .map((img, i) => (
                  <div
                    key={i}
                    className="img-wrapper"
                    onClick={() =>
                      setCurrentIndex(
                        i + 5
                      )
                    }
                  >
                    <img
                      src={getOptimizedUrl(
                        img,
                        400,
                        70
                      )}
                      alt={`${project.title} additional detail`}
                      loading="lazy"
                    />
                  </div>
                ))}
            </section>
          )}

          <section className="project-cta">
            <div className="project-cta__inner">
              <h3>
                Ready to create a home
                that feels like you?
              </h3>
              <p>
                Let’s shape a space
                that looks beautiful
                and lives even better.
              </p>
              <Link
                href="/contact"
                className="project-cta__btn"
              >
                Book a consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}