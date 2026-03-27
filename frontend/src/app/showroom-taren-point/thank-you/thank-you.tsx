"use client";

import Link from "next/link";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <section className="thankyou-section">
      <img
        src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Logo%20(1).svg"
        alt="Inhaus Logo"
        className="thankyou-logo"
      />

      <div className="thankyou-box">
        <div className="checkmark">
          <span>✓</span>
        </div>

        <h1>Your showroom visit is confirmed</h1>

        <p>
          Thank you for booking your visit to our Taren Point showroom. Our team
          looks forward to welcoming you and helping you explore the best
          kitchen, bathroom and custom joinery solutions for your project.
        </p>

        <Link href="/showroom-taren-point" className="back-btn">
          Back to showroom
        </Link>
      </div>
    </section>
  );
}