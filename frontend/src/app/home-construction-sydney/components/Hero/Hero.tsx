import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="construction-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/avi-werde-hHz4yrvxwlA-unsplash.jpg?updatedAt=1772083041759"
        alt="Luxury home extensions and construction additions in Sydney by licensed builders"
        fill
        priority
        className="construction-hero__image"
      />

      <div className="construction-hero__overlay" />

      <div className="construction-hero__content">
        <h1>Construction and Home Additions Sydney</h1>
        <p>
          Premium home extensions, structural renovations and custom additions
          delivered by licensed Sydney builders. Expand your space with
          intelligent design, structural precision and long-term value.
        </p>
      </div>
    </section>
  );
}