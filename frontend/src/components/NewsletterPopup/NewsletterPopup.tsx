"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./NewsletterPopup.css";

const STORAGE_KEY = "inhaus_popup_closed";
const EXPIRATION_DAYS = 7;

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  /* =====================================================
     POPUP TRIGGER (SCROLL 50% + HOME ONLY)
  ===================================================== */

  useEffect(() => {
    if (!isHome) return;

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const { timestamp } = JSON.parse(stored);
        const now = Date.now();
        const daysPassed =
          (now - timestamp) / (1000 * 60 * 60 * 24);

        if (daysPassed < EXPIRATION_DAYS) return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    let triggered = false;

    const show = () => {
      if (triggered) return;
      triggered = true;
      setShowPopup(true);
      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercent =
        (scrollTop / docHeight) * 100;

      if (scrollPercent >= 50) {
        show();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  /* =====================================================
     CLOSE POPUP (SALVA NO LOCALSTORAGE)
  ===================================================== */

  const closePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    setFormData({ name: "", email: "" });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
      })
    );
  };

  /* =====================================================
     FORM HANDLING
  ===================================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Something went wrong.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "" });

      // ❌ NÃO salva no localStorage aqui
      // (UX melhor — deixa aparecer novamente no futuro)

    } catch (error) {
      console.error("Newsletter error:", error);
      alert("Error sending. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

   if (!showPopup) return null;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="newsletter-popup-overlay">
      <div className="newsletter-popup show">
        <button
          className="close-btn"
          onClick={closePopup}
        >
          ×
        </button>

        {submitted ? (
          <div className="thank-you-message fade-in">
            <h2>Thank you!</h2>
            <p>
              You're now part of the{" "}
              <strong>Inhaus Living</strong>{" "}
              crew and will receive exclusive
              updates, inspirations and smart
              renovation insights.
            </p>
          </div>
        ) : (
          <div className="popup-content">
            <h2>
              <span>Transform</span> your
              home with confidence
            </h2>

            <p>
              Subscribe for smart ideas,
              trends, quick guides and real
              project stories to help
              transform your home.
            </p>

            <form
              className="popup-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Subscribe"}
              </button>
            </form>
          </div>
        )}

        {!submitted && (
          <small className="popup-disclaimer">
            By subscribing, you agree to
            receive communications from
            Inhaus Living. You can unsubscribe
            at any time.
          </small>
        )}
      </div>
    </div>
  );
}