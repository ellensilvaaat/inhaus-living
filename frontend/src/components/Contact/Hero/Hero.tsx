"use client";

import "./Hero.css";

const imageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto";

const mobileImageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-600,f-webp,q-60";

export default function Hero() {
  return (
    <>
      {/* preload inteligente */}
      <link
        rel="preload"
        as="image"
        href={mobileImageUrl}
        media="(max-width: 600px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        media="(min-width: 601px)"
        fetchPriority="high"
      />

      <section className="contact-hero">
        <div
          className="contact-hero__background hero-bg-variable"
          style={
            {
              "--bg-desktop": `url('${imageUrl}')`,
              "--bg-mobile": `url('${mobileImageUrl}')`,
            } as React.CSSProperties
          }
        />

        <div className="contact-hero__overlay" />

        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Contact Us</h1>
        </div>

        <div className="contact__bottom-text">
          <span>Design</span>
          <span className="contact__separator">|</span>
          <span>Renovate</span>
          <span className="contact__separator">|</span>
          <span className="contact__highlight">Build</span>
        </div>
      </section>
    </>
  );
}