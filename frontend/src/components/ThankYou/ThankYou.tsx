"use client";

import Link from "next/link";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <section className="thankyou-section">
      {/* LOGO */}
      <img
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Logo%20(1).svg"
        alt="Inhaus Logo"
        className="thankyou-logo"
      />

      <div className="thankyou-box">
        {/* CHECK ANIMADO */}
        <div className="checkmark">
          <span>✓</span>
        </div>

        <h1>
          Thank you for getting in touch
        </h1>

        <p>
          We’ve received your project
          details and our team will reach
          out soon to discuss your
          renovation plans and next
          steps. In the meantime, feel
          free to explore our latest
          projects and get inspired for
          your transformation.
        </p>

        <Link
          href="/projects"
          className="back-btn"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}