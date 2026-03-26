import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="showroom-hero">
      <div className="showroom-hero__media">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg?updatedAt=1770869458921?tr=w-2200,q-88,f-webp"
          alt="Inhaus showroom in Moore Park"
          className="showroom-hero__image"
        />
      </div>

      <div className="showroom-hero__veil" />

      <div className="showroom-hero__inner">
        {/* LEFT CONTENT */}
        <div className="showroom-hero__content">

          <div className="showroom-hero__card">
            <div className="showroom-hero__topline">
              <span className="showroom-hero__pill">Sydney</span>
              <span className="showroom-hero__divider" />
              <span className="showroom-hero__subpill">
                Kitchens · Bathrooms · Interiors
              </span>
            </div>

            <h1 className="showroom-hero__title">
              A renovation showroom
              <br />
              in the heart of Taren Point
            </h1>

            <p className="showroom-hero__description">
              Explore kitchens, bathrooms and custom interiors, all under one roof.
              A tactile, design-led destination to experience materials, joinery,
              finishes and renovation possibilities in person.
            </p>

            <div className="showroom-hero__actions">
              <a href="#form" className="showroom-hero__primary">
                Plan your showroom visit
              </a>

              <Link href="/contact" className="showroom-hero__secondary">
                Speak with our team
              </Link>
            </div>

            <div className="showroom-hero__meta">
              <div className="showroom-hero__metaItem">
                <span className="showroom-hero__metaLabel">Design-led</span>
                <span className="showroom-hero__metaValue">
                  Curated displays
                </span>
              </div>

              <div className="showroom-hero__metaItem">
                <span className="showroom-hero__metaLabel">In-person</span>
                <span className="showroom-hero__metaValue">
                  Material selection
                </span>
              </div>

              <div className="showroom-hero__metaItem">
                <span className="showroom-hero__metaLabel">Tailored</span>
                <span className="showroom-hero__metaValue">
                  Renovation guidance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING FEATURE (INTEGRATED) */}
        <div className="showroom-hero__floatingCard">
          <span className="showroom-hero__floatingKicker">
            Featured experience
          </span>
          <strong className="showroom-hero__floatingTitle">
            Premium finishes.
            <br />
            Real spaces.
          </strong>
          <p className="showroom-hero__floatingText">
            Discover how luxury renovation decisions feel before they are built.
          </p>
        </div>
      </div>
    </section>
  );
}