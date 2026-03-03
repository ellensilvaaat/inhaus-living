"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import ProjectsMapImpact from "../ProjectsMapImpact/ProjectsMapImpact";
import "./ProjectsPage.css";
import { projectsData } from "@/content/projects";

interface Project {
  slug: string;
  title: string;
  heroImage: string;
  content: string;
  gallery?: string[];
  listGallery?: string[];
}

const filters = [
  "All",
  "Kitchen",
  "Bathroom",
  "Renovation",
  "Full house",
  "Building works",
];

function getExcerpt(content: string, maxLength = 160) {
  if (!content) return "";
  return content.replace(/\n+/g, " ").trim().slice(0, maxLength) + "…";
}

function getProjectType(slug: string) {
  if (!slug) return "Renovation";
  const s = slug.toLowerCase();
  if (s.includes("kitchen")) return "Kitchen";
  if (s.includes("bathroom")) return "Bathroom";
  if (s.includes("full")) return "Full house";
  if (s.includes("build") || s.includes("duplex")) return "Building works";
  return "Renovation";
}

/* ================= MAGNETIC (ONLY FOR PAGINATION + LINK) ================= */

function useMagnetic(strength = 10) {
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "translate3d(0,0,0)",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tx = (x / (rect.width / 2)) * strength;
      const ty = (y / (rect.height / 2)) * strength;

      setStyle({
        transform: `translate3d(${tx}px, ${ty}px, 0)`,
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: "translate3d(0,0,0)" });
  }, []);

  return { onMouseMove, onMouseLeave, style };
}

/* ================= FRAMER VARIANTS (FIXED TYPES) ================= */

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55 },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)",
    transition: { duration: 0.25 },
  },
};

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 5;
  const pathname = usePathname();

  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  /* ================= FILTER ================= */

  const filteredProjects: Project[] =
    selectedFilter === "All"
      ? (projectsData as Project[])
      : (projectsData as Project[]).filter(
          (project) => getProjectType(project.slug) === selectedFilter
        );

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  /* ================= SEGMENTED PILL ================= */

  const updatePill = useCallback(() => {
    const btn = filterRefs.current[selectedFilter];
    if (!btn) return;

    const parent = btn.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rect = btn.getBoundingClientRect();

    setPillStyle({
      width: rect.width,
      left: rect.left - parentRect.left,
    });
  }, [selectedFilter]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill, currentProjects.length]);

  return (
    <section className="project-page">
      <div className="project-page__header">
        <h2 className="project-page__title">Our Projects</h2>
        <p className="project-page__subtitle">
          A curated portfolio of luxury renovations and builds — crafted with precision, warmth and restraint.
        </p>
      </div>

      {/* FILTERS (NO MAGNETIC HERE) */}
      <div
        className="project-page__filters project-page__filters--segmented"
        role="tablist"
      >
        <motion.div
          className="project-page__seg-pill"
          layout
          transition={{ type: "spring", stiffness: 520, damping: 42 }}
          style={{ width: pillStyle.width, left: pillStyle.left }}
        />

        {filters.map((filter) => (
          <button
            key={filter}
            ref={(el) => {
              filterRefs.current[filter] = el;
            }}
            className={`project-page__filter-btn ${
              selectedFilter === filter ? "active" : ""
            }`}
            onClick={() => {
              setSelectedFilter(filter);
              setCurrentPage(1);
            }}
            role="tab"
            aria-selected={selectedFilter === filter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <motion.div
        className="project-page__list"
        variants={listVariants}
        initial="hidden"
        animate="show"
        key={`${selectedFilter}-${currentPage}`}
      >
        <AnimatePresence>
          {currentProjects.map((project: Project) => (
            <motion.article
              key={project.slug}
              className="projects-card"
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
            >
              <div className="projects-card__image-wrapper">
                <Swiper modules={[Navigation]} navigation loop slidesPerView={1}>
                  {(project.listGallery?.length
                    ? project.listGallery
                    : project.gallery?.length
                    ? project.gallery
                    : [project.heroImage]
                  ).map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${img}?tr=w-1400,h-900,fo-auto,q-82,f-webp,us-2`}
                        alt={`${project.title} gallery image ${index + 1}`}
                        className="project-cards__image"
                        loading="lazy"
                        decoding="async"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="projects-card__image-glass" />
              </div>

              <div className="projects-card__text">
                <div className="projects-card__meta">
                  <span className="projects-card__pill">
                    {getProjectType(project.slug)}
                  </span>
                  <span className="projects-card__dot">•</span>
                  <span className="projects-card__small">
                    Sydney & Canberra
                  </span>
                </div>

                <h3 className="projects-card__title">
                  {project.title}
                </h3>

                <p className="projects-card__description">
                  {getExcerpt(project.content)}
                </p>

                <MagneticLink
                  href={`/projects/${project.slug}`}
                  className="projects-card__read-more"
                >
                  Read more
                </MagneticLink>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* PAGINATION */}
      <div className="project-page__pagination">
        <MagneticButton
          className="project-page__page-btn"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          ariaLabel="Previous page"
        >
          ‹
        </MagneticButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <MagneticButton
              key={pageNum}
              className={`project-page__page-btn ${
                currentPage === pageNum ? "active" : ""
              }`}
              onClick={() => setCurrentPage(pageNum)}
              ariaLabel={`Go to page ${pageNum}`}
            >
              {pageNum}
            </MagneticButton>
          )
        )}

        <MagneticButton
          className="project-page__page-btn"
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          ariaLabel="Next page"
        >
          ›
        </MagneticButton>
      </div>

      <div className="map-preview-section">
        <h2 className="map-preview-title">
          See where Inhaus Living is present
        </h2>
        <ProjectsMapImpact />
      </div>
    </section>
  );
}

/* ================= MAGNETIC HELPERS ================= */

function MagneticButton({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  const mag = useMagnetic(7);
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      style={mag.style}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      type="button"
    >
      {children}
    </button>
  );
}

function MagneticLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const mag = useMagnetic(7);
  return (
    <Link
      href={href}
      className={className}
      style={mag.style}
      onMouseMove={mag.onMouseMove as any}
      onMouseLeave={mag.onMouseLeave as any}
    >
      {children}
    </Link>
  );
}