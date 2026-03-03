"use client";

import Link from "next/link";
import "./AboutUsSection.css";

export default function AboutUsSection() {
  return (
    <section className="aboutus-section-wrapper">
      <div className="aboutus-container">
        
        {/* LEFT SIDE - TEXT */}
        <div className="aboutus-section-content">
          <h2 className="aboutus-heading">
            Over <em>20 Years of Renovation Excellence</em>
          </h2>

          <p className="aboutus-subheading">
            Designing and building refined homes across Sydney and Canberra.
          </p>

          <div className="aboutus-mission-vision">
            <div className="aboutus-block">
              <h3>Our Mission</h3>
              <p>
                At <span className="highlight-orange">Inhaus Living</span>, we
                believe a home is more than structure, it is where life unfolds.
                Our mission is to deliver design-led renovation and construction
                solutions that combine aesthetics, functionality and enduring quality.
              </p>

              <p>
                With over two decades of experience, our
                <span className="highlight-orange"> licensed team </span>
                integrates design, documentation and construction into one
                seamless process, ensuring every project is delivered with clarity
                and craftsmanship.
              </p>
            </div>

            <div className="aboutus-block">
              <h3>Our Vision</h3>
              <p>
                We envision homes that inspire connection, comfort and longevity.
                Each renovation is shaped around the people who live within it,
                reflecting their lifestyle, aspirations and evolving needs.
              </p>

              <p>
                From kitchens and bathrooms to full-home transformations and
                extensions, we aim to set a benchmark for
                <span className="highlight-orange">
                  {" "}premium renovations across Sydney and Canberra.
                </span>
              </p>
            </div>
          </div>

          <div className="aboutus-button">
            <Link href="/services#process">
              <button>Explore Our Process</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - VIDEO */}
        <video
        className="aboutus-video"
         autoPlay
         loop
         muted
         playsInline
         controls={false}
         preload="metadata"
>
  <source src="/videos/about-showcase.mp4" type="video/mp4" />
</video>

      </div>
    </section>
  );
}