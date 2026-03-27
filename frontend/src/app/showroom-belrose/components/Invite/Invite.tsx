"use client";

import { useState } from "react";
import "./Invite.css";

export default function Invite() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE;

  const handleChange = (field: "name" | "email", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) return;

    if (!API_URL) {
      alert("API configuration missing");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`${API_URL}/api/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
        }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert("You are already on the list!");
          return;
        }

        throw new Error();
      }

      // 👉 SUCCESS
      setSubmitted(true);
      setForm({ name: "", email: "" });

      // 🔥 REDIRECT (como você pediu)
      window.location.href = "/showroom-belrose/thank-you/";

    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="invite" id="early-access">
      <div className="invite-glow" />

      <div className="invite-inner">
        {!submitted ? (
          <>
            <p className="invite-eyebrow">
              Belrose Showroom — Early Access
            </p>

            <h2>
              Be among the first
              <br />
              to experience what’s next.
            </h2>

            <p className="invite-description">
              Join the pre-launch list to receive priority access before the official opening.
            </p>

            <form className="invite-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request access"}
              </button>
            </form>

            <p className="invite-note">
              Limited access. Invitations sent before launch.
            </p>
          </>
        ) : (
          <div className="invite-success">
            <h3>You’re in.</h3>
            <p>We’ll notify you before the showroom opens.</p>
          </div>
        )}
      </div>
    </section>
  );
}