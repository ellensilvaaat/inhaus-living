"use client";

import Image from "next/image";
import { useCallback } from "react";
import "./Hero.css";

interface HeroProps {
  suburbName: string;
  renovationLabel: string;
  businessName: string;
  phoneLabel: string;
  heroImage: string;
}

export default function Hero({
  suburbName,
  renovationLabel,
  businessName,
  phoneLabel,
  heroImage,
}: HeroProps) {
  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const phoneHref = `tel:${phoneLabel.replace(/\s|\(|\)/g, "")}`;

  return (
    <section
      className="mp-hero"
      aria-label={`${renovationLabel} ${suburbName}`}
    >
      {/* BG */}
      <Image
        src={heroImage}
        alt={`Luxury ${renovationLabel.toLowerCase()} in ${suburbName} by ${businessName}`}
        fill
        priority
        className="mp-hero__bg"
      />
      <div className="mp-hero__scrim" />
      <div className="mp-hero__noise" />

      {/* NAV */}
      <header className="mp-nav" role="banner">
        <div className="mp-nav__inner">
          <a className="mp-nav__brand" href="/" aria-label={`${businessName} Home`}>
            <Image
              src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-420,f-webp,q-90"
              alt={businessName}
              width={190}
              height={40}
              priority
              className="mp-nav__logo"
            />
            <span className="mp-nav__brandGlow" aria-hidden="true" />
          </a>

          <nav className="mp-nav__actions" aria-label="Primary actions">
            <a className="mp-nav__phone" href={phoneHref}>
              {phoneLabel}
              <span className="mp-nav__phoneDot" aria-hidden="true" />
            </a>

            <button
              type="button"
              className="mp-nav__cta"
              onClick={scrollToContact}
            >
              Request a Quote
              <span className="mp-nav__ctaArrow" aria-hidden="true">
                →
              </span>
              <span className="mp-nav__ctaShine" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mp-hero__container">
        <div className="mp-hero__grid">
          <div className="mp-hero__content">
            <div className="mp-hero__badge">
              <span className="mp-hero__badgeDot" aria-hidden="true" />
              WHAT WE DO
              <span className="mp-hero__badgeLine" aria-hidden="true" />
            </div>

            <h1 className="mp-hero__title">
              {suburbName}’s Best <br />
              <span className="mp-hero__titleAccent">
                {renovationLabel}
              </span>
            </h1>

            <p className="mp-hero__lead">
              At {businessName}, we are committed to delivering premium{" "}
              {renovationLabel.toLowerCase()} in {suburbName}. We ensure every
              detail is thoughtfully designed and built to the highest
              standards of craftsmanship and durability.
            </p>

            <div className="mp-hero__ctaRow">
              <button
                type="button"
                className="mp-hero__primary"
                onClick={scrollToContact}
              >
                Get a Free Consultation
                <span className="mp-hero__primaryGlow" aria-hidden="true" />
              </button>

              <a className="mp-hero__secondary" href={phoneHref}>
                Call {phoneLabel}
                <span className="mp-hero__secondaryLine" aria-hidden="true" />
              </a>
            </div>

            <div className="mp-hero__trust" aria-label="Trust indicators">
              <div className="mp-hero__trustItem">
                <span className="mp-hero__trustNum">20+</span>
                <span className="mp-hero__trustLabel">Years experience</span>
              </div>
              <div className="mp-hero__trustItem">
                <span className="mp-hero__trustNum">Premium</span>
                <span className="mp-hero__trustLabel">Design + Build</span>
              </div>
              <div className="mp-hero__trustItem">
                <span className="mp-hero__trustNum">Trusted</span>
                <span className="mp-hero__trustLabel">
                  NSW Specialists
                </span>
              </div>
            </div>
          </div>

          {/* GLASS PANEL */}
          <aside className="mp-hero__panel" aria-label="Quick actions">
            <div className="mp-hero__panelHeader">
              <h2 className="mp-hero__panelTitle">
                Start Your {renovationLabel}
              </h2>
              <p className="mp-hero__panelText">
                Tap below to jump straight to the consultation form.
              </p>
            </div>

            <button
              type="button"
              className="mp-hero__panelBtn"
              onClick={scrollToContact}
            >
              Go to Contact Form
              <span className="mp-hero__panelBtnArrow" aria-hidden="true">
                ↓
              </span>
            </button>

            <div className="mp-hero__panelDivider" />

            <ul className="mp-hero__panelList">
              <li>
                <span className="mp-hero__check" aria-hidden="true">
                  ✓
                </span>
                Custom design + premium finishes
              </li>
              <li>
                <span className="mp-hero__check" aria-hidden="true">
                  ✓
                </span>
                Licensed & fully insured builders
              </li>
              <li>
                <span className="mp-hero__check" aria-hidden="true">
                  ✓
                </span>
                Dedicated project management
              </li>
            </ul>

            <span className="mp-hero__panelGlow" aria-hidden="true" />
          </aside>
        </div>

        <div className="mp-hero__scrollHint" aria-hidden="true">
          <span className="mp-hero__scrollDot" />
          <span className="mp-hero__scrollText">Scroll</span>
        </div>
      </div>
    </section>
  );
}