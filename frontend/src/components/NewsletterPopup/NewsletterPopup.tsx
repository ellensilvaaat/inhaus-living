"use client";

import { useEffect, useState } from "react";
import "./NewsletterPopup.css";

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] =
    useState(false);
  const [submitted, setSubmitted] =
    useState(false);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
    });
  const [loading, setLoading] =
    useState(false);

  // ✅ Next way
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "";

  useEffect(() => {
    const hasSeenPopup =
      localStorage.getItem(
        "inhaus_popup_closed"
      );

    if (hasSeenPopup) return;

    let triggered = false;
    let hasScrolledEnough = false;
    let observer: MutationObserver | null =
      null;

    const triggerPopup = () => {
      if (
        triggered ||
        !hasScrolledEnough
      )
        return;

      triggered = true;
      setShowPopup(true);
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      observer?.disconnect();
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercent =
        (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25) {
        hasScrolledEnough = true;
        triggerPopup();
      }
    };

    const startPopupLogic = () => {
      window.addEventListener(
        "scroll",
        handleScroll
      );
    };

    if (
      document.body.classList.contains(
        "site-loaded"
      )
    ) {
      startPopupLogic();
    } else {
      observer =
        new MutationObserver(() => {
          if (
            document.body.classList.contains(
              "site-loaded"
            )
          ) {
            observer?.disconnect();
            startPopupLogic();
          }
        });

      observer.observe(
        document.body,
        {
          attributes: true,
          attributeFilter: ["class"],
        }
      );
    }

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      observer?.disconnect();
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
    });

    localStorage.setItem(
      "inhaus_popup_closed",
      "true"
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
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
      const response =
        await fetch(
          `${API_BASE}/api/newsletter`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              formData
            ),
          }
        );

      if (!response.ok) {
        const err =
          await response.json();

        alert(
          `Error: ${
            err.message ||
            "Something went wrong."
          }`
        );

        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
      });

      localStorage.setItem(
        "inhaus_popup_closed",
        "true"
      );
    } catch (error) {
      console.error(
        "Newsletter error:",
        error
      );

      alert(
        "Error sending. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!showPopup) return null;

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
              <strong>
                Inhaus Living
              </strong>{" "}
              crew and will receive
              exclusive updates,
              inspirations, and smart
              renovation insights.
            </p>
          </div>
        ) : (
          <div className="popup-content">
            <h2>
              <span>
                Transform
              </span>{" "}
              your home with confidence
            </h2>

            <p>
              Subscribe for smart ideas,
              trends, quick guides, and
              real project stories to
              help transform your home.
            </p>

            <form
              className="popup-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
              />

              <input
                type="email"
                name="email"
                placeholder="example@domain.com"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
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
            By subscribing, you agree
            to receive communications
            from Inhaus Living. You can
            unsubscribe at any time.
          </small>
        )}
      </div>
    </div>
  );
}