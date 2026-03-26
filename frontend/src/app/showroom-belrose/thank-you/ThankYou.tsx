"use client";

import Link from "next/link";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <section className="thankyou">

      <div className="thankyou-glow" />

      <div className="thankyou-inner">

        <p className="thankyou-eyebrow">
          Belrose Showroom — Early Access
        </p>

        <h1>
          You’re in.
          <br />
          And this is just the beginning.
        </h1>

        <p className="thankyou-description">
          You’ll be among the first to experience the new Inhaus showroom in Belrose.
          We’ll reach out before the official opening with exclusive access details.
        </p>

        <div className="thankyou-divider" />

        <p className="thankyou-note">
          Until then, explore how spaces can evolve with you.
        </p>

        <Link href="/" className="thankyou-link">
          Back to homepage
        </Link>

      </div>
    </section>
  );
}