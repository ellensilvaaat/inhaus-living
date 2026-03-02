"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
  return (
    content.replace(/\n+/g, " ").trim().slice(0, maxLength) + "…"
  );
}

function getProjectType(slug: string) {
  if (!slug) return "Renovation";
  if (slug.includes("kitchen")) return "Kitchen";
  if (slug.includes("bathroom")) return "Bathroom";
  if (slug.includes("full")) return "Full house";
  if (slug.includes("build")) return "Building works";
  return "Renovation";
}


export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] =
    useState<string>("All");

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const projectsPerPage = 5;

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  /* ================= FILTER ================= */

  const filteredProjects: Project[] =
    selectedFilter === "All"
      ? (projectsData as Project[])
      : (projectsData as Project[]).filter(
          (project) =>
            getProjectType(project.slug) ===
            selectedFilter
        );

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  const startIndex =
    (currentPage - 1) * projectsPerPage;

  const currentProjects =
    filteredProjects.slice(
      startIndex,
      startIndex + projectsPerPage
    );

  /* ================= RENDER ================= */

  return (
    <section className="project-page">
      <h2 className="project-page__title">
        Our Projects
      </h2>

      {/* FILTERS */}
      <div className="project-page__filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`project-page__filter-btn ${
              selectedFilter === filter
                ? "active"
                : ""
            }`}
            onClick={() => {
              setSelectedFilter(filter);
              setCurrentPage(1);
            }}
            aria-label={`Filter by ${filter}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <div className="project-page__list">
        {currentProjects.map(
          (project: Project) => (
            <article
              key={project.slug}
              className="projects-card"
            >
              {/* GALERIA */}
              <div className="projects-card__image-wrapper">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  slidesPerView={1}
                >
                  {(
                    project.listGallery?.length
                      ? project.listGallery
                      : project.gallery?.length
                      ? project.gallery
                      : [project.heroImage]
                  ).map(
                    (img: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${img}?tr=w-1200,h-800,fo-auto,q-75,f-webp,us-2`}
                          alt={`${project.title} gallery image ${
                            index + 1
                          }`}
                          className="project-cards__image"
                          loading="lazy"
                          decoding="async"
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>

              {/* TEXTO */}
              <div className="projects-card__text">
                <h3 className="projects-card__title">
                  {project.title}
                </h3>

                <p className="projects-card__description">
                  {getExcerpt(project.content)}
                </p>

                <Link
                  href={`/projects/${project.slug}`}
                  className="projects-card__read-more"
                  aria-label={`Read more about ${project.title}`}
                >
                  Read more
                </Link>
              </div>
            </article>
          )
        )}
      </div>

      {/* PAGINATION */}
      <div className="project-page__pagination">
        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.max(p - 1, 1)
            )
          }
          className="project-page__page-btn"
        >
          ‹
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() =>
              setCurrentPage(pageNum)
            }
            className={`project-page__page-btn ${
              currentPage === pageNum
                ? "active"
                : ""
            }`}
            aria-current={
              currentPage === pageNum
                ? "page"
                : undefined
            }
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
          className="project-page__page-btn"
        >
          ›
        </button>
      </div>

      {/* MAP */}
      <div className="map-preview-section">
        <h2 className="map-preview-title">
          See where Inhaus Living is present
        </h2>
        <ProjectsMapImpact />
      </div>
    </section>
  );
}