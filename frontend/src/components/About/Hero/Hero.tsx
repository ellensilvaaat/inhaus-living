"use client";

import Head from "next/head";
import "./Hero.css";

const imageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-1600,f-webp,q-80,dpr-auto";

const mobileImageUrl =
  "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-600,f-webp,q-60";

export default function AboutHero() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={mobileImageUrl}
          media="(max-width: 501px)"
        />
        <link
          rel="preload"
          as="image"
          href={imageUrl}
          media="(min-width: 502px)"
        />
      </Head>

      <section className="about-hero">
        <div
          className="about-hero__background"
          style={
            {
              "--bg-desktop": `url('${imageUrl}')`,
              "--bg-mobile": `url('${mobileImageUrl}')`,
            } as React.CSSProperties
          }
        />

        <div className="about-hero__overlay" />

        <div className="about-hero__content">
          <h1 className="about-hero__title">
            About Inhaus Living
          </h1>
        </div>

        <div className="blog__bottom-text">
          <span>Design</span>
          <span className="blog__separator">|</span>
          <span>Renovate</span>
          <span className="blog__separator">|</span>
          <span>Build</span>
        </div>
      </section>
    </>
  );
}