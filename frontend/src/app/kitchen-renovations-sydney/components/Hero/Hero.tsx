import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="kitchen-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-2g6aRZE9S8s-unsplash%20(1).jpg?updatedAt=1772085186047"
        alt="Luxury kitchen renovations Sydney by licensed kitchen renovators"
        fill
        priority
        className="kitchen-hero__image"
      />

      <div className="kitchen-hero__overlay" />

      <div className="kitchen-hero__content">
        <h1>Kitchen Renovations Sydney</h1>
        <p>
          Transform your kitchen into a functional and luxurious space with
          Sydney’s trusted kitchen renovation specialists — delivering custom
          design, premium finishes and expert craftsmanship tailored to your lifestyle.
        </p>
      </div>
    </section>
  );
}