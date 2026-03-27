"use client";

import Link from "next/link";
import "./thank-you.css";

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

        <h1>Visit booked successfully</h1>

        <p>
          Thank you for booking your visit to our Moore Park showroom. Our team
          is looking forward to welcoming you and guiding you through our
          kitchens, bathrooms and custom interior solutions in person.
        </p>

        <Link href="/showroom-moore-park" className="back-btn">
          Back to showroom
        </Link>
      </div>
    </section>
  );
}