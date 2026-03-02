import "./Hero.css";

const imageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto";

const mobileImageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-600,f-webp,q-60";

export default function ProjectsHero() {
  return (
    <section className="projects-hero">
      <div
        className="projects-hero__background"
        style={{
          //@ts-ignore
          "--bg-desktop": `url('${imageUrl}')`,
          "--bg-mobile": `url('${mobileImageUrl}')`,
        }}
      />

      <div className="projects-hero__overlay" />

      <div className="projects-hero__content">
        <h1 className="projects-hero__title">Projects</h1>
      </div>

      <div className="projects__bottom-text">
        <span>Design</span>
        <span className="projects__separator">|</span>
        <span>Renovate</span>
        <span className="projects__separator">|</span>
        <span className="projects__highlight">Build</span>
      </div>
    </section>
  );
}