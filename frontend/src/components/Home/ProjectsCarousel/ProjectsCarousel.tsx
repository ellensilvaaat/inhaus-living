import Link from "next/link";
import Image from "next/image";
import "./ProjectsCarousel.css";
import { projectsData } from "@/content/projects";

function getShortDescription(content: string, max = 140) {
  if (!content) return "";
  const clean = content.replace(/\n+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trim() + "…";
}

export default function ProjectsCarousel() {
  return (
    <section className="project-carousel">
      <div className="project-carousel__header">
      <h2 className="project-carousel__title">
       Recent Renovation Projects
     </h2>
     <p className="project-carousel__subtitle">
    Explore some of our recently completed kitchen, bathroom and full home
    renovation projects across Sydney and Canberra.
     </p>
   </div>
   <div className="projects_underline"></div>

      <div className="project-carousel__container">
        {projectsData.map((project) => (
          <div className="project-card" key={project.slug}>
            <div className="project-card__wrapper">
              <Image
                src={`${project.heroImage}?tr=w-980,f-webp,q-95`}
                alt={`${project.title} renovation project by Inhaus Living`}
                width={800}
                height={600}
                className="project-card__img"
                loading="lazy"
              />

              <div className="project-card__overlay">
                <h3 className="project-card__title">
                  {project.title}
                </h3>

                <p className="project-card__description">
                  {getShortDescription(project.content)}
                </p>

                <Link
                  href={`/projects/${project.slug}`}
                  className="project-card__button"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bnt">
        <Link href="/contact" className="projects__cta">
          Start Your Renovation Journey
          <span className="corner corner--top-right"></span>
          <span className="corner corner--bottom-left"></span>
        </Link>
      </div>
    </section>
  );
}