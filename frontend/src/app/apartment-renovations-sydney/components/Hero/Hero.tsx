import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="apartment-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg?updatedAt=1772076858918"
        alt="Luxury apartment renovation Sydney"
        fill
        priority
        className="apartment-hero__image"
      />

      <div className="apartment-hero__overlay" />

      <div className="apartment-hero__content">
        <h1>Apartment Renovations Sydney</h1>
        <p>
          Transform your apartment into a refined, functional and
          design-led space with Sydney’s trusted renovation experts.
        </p>
      </div>
    </section>
  );
}