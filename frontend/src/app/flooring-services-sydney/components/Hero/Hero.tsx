import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="flooring-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-gdCFm911Jeo-unsplash.jpg"
        alt="Luxury timber and engineered flooring installation in Sydney by Inhaus Living"
        fill
        priority
        className="flooring-hero__image"
      />

      <div className="flooring-hero__overlay" />

      <div className="flooring-hero__content">
        <h1>Flooring Services Sydney</h1>
        <p>
          Premium timber, engineered and hybrid flooring installations across
          Sydney, delivering durability, elegance and flawless craftsmanship
          for modern homes and apartments.
        </p>
      </div>
    </section>
  );
}