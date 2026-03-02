import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="house-hero">
      <Image
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/avi-werde-hHz4yrvxwlA-unsplash.jpg"
        alt="Luxury house renovations in Sydney by licensed home renovators"
        fill
        priority
        className="house-hero__image"
      />

      <div className="house-hero__overlay" />

      <div className="house-hero__content">
        <h1>House Renovators Sydney</h1>
        <p>
          Transform your home with Sydney’s trusted house renovation
          specialists — delivering design-led, high-quality renovations
          tailored to your lifestyle.
        </p>
      </div>
    </section>
  );
}