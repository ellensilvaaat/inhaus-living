import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="bathroom-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-_XkcDuSKMXg-unsplash.jpg"
        alt="Luxury bathroom renovations Taren Point by licensed bathroom renovation specialists"
        fill
        priority
        className="bathroom-hero__image"
      />

      <div className="bathroom-hero__overlay" />

      <div className="bathroom-hero__content">
        <h1>Bathroom Renovations Taren Point, NSW</h1>
        <p>
          Transform your space with Taren Point’s trusted bathroom renovation
          specialists. Delivering luxury finishes, precision craftsmanship and
          design-led bathroom transformations built to last.
        </p>
      </div>
    </section>
  );
}