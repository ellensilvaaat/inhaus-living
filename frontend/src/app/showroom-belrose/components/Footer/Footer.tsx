"use client";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        <div className="footer-top">
          <h2>
            Your home should evolve
            <br />
            with you.
          </h2>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">

          <div className="footer-brand">
            <h3>Inhaus Living</h3>
            <p>Design. Renovate. build.</p>
          </div>

          <div className="footer-links">
            <a href="#">Projects</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-meta">
            <p>Belrose Showroom — Opening Soon</p>
            <p>© {new Date().getFullYear()} Inhaus</p>
          </div>

        </div>

      </div>

    </footer>
  );
}