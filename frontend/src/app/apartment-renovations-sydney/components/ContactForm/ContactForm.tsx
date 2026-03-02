"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import "./ContactForm.css";

export default function ContactForm() {
  const router = useRouter();
  const formLoadedAt = useRef(Date.now());

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    budget: "",
    service: "",
    message: "",
  });

  const budgetOptions = [
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "$200,000 - $400,000",
    "$400,000 - $600,000",
    "$600,000 - $800,000",
    "$800,000 - $1 million",
    "$1 million - $1.5 million",
    "$2 million +",
  ];

  const serviceOptions = [
    "Kitchen Renovation",
    "Bathroom Renovation",
    "Home Renovation",
    "Apartment Renovation",
    "Flooring Services",
    "Construction & Additions",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () =>
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.mobile.trim() &&
    formData.address.trim();

  const validateStep2 = () =>
    formData.budget.trim() && formData.service.trim() && formData.message.trim();

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setTurnstileError("Please verify you are human.");
      return;
    }

    setIsSubmitting(true);
    setTurnstileError("");

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    const payload = {
      ...formData,

      // 🔥 FIXO PARA ESTA LANDING
      service_key: "apartment-renovation",
      service_label: "Apartment Renovations Sydney",
      suburb: "sydney",
      region: "sydney",

      status: "new",
      formStartedAt: formLoadedAt.current,
      turnstileToken,
    };

    try {
      const res = await fetch(`${apiBase}/api/landing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/thank-you");
        return;
      }

      setTurnstileError(data?.message || "Submission blocked.");
      setTurnstileToken("");
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setTurnstileError("⚠️ Could not connect to the server.");
      setTurnstileToken("");
      setIsSubmitting(false);
    }
  };

  const progressPercent = (step / 3) * 100;

  return (
    <section className="premium-form" aria-labelledby="premium-form-heading">
      <div className="premium-form__container">
        {/* LEFT */}
        <div className="premium-form__info">
          <h2 id="premium-form-heading">
            Start Your <span>Renovation Journey</span>
          </h2>

          <p>
            Complete the steps below and our team will contact you within 24
            hours. We’ll confirm scope, budget, strata considerations and next
            steps.
          </p>

          <div className="premium-form__contact">
            <a href="tel:0296623509">(02) 9662 3509</a>
            <a href="mailto:info@inhausliving.com.au">
              info@inhausliving.com.au
            </a>
          </div>

          <div className="premium-form__steps" aria-label="Form progress">
            <div className={`step-pill ${step === 1 ? "active" : ""}`}>
              01 Details
            </div>
            <div className={`step-pill ${step === 2 ? "active" : ""}`}>
              02 Project
            </div>
            <div className={`step-pill ${step === 3 ? "active" : ""}`}>
              03 Submit
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="premium-form__form" onSubmit={handleSubmit}>
          <div className="progress-wrapper" aria-hidden="true">
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {step === 1 && (
            <div className="form-step" aria-label="Step 1: Your details">
              <div className="form-grid">
                <div className="form-group">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label>Full Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label>Email</label>
                </div>

                <div className="form-group">
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="tel"
                  />
                  <label>Mobile</label>
                </div>

                <div className="form-group">
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="street-address"
                  />
                  <label>Suburb / Address</label>
                </div>
              </div>

              <div className="step-actions single">
                <button type="button" onClick={nextStep} className="next-btn">
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step" aria-label="Step 2: Project details">
              <div className="form-grid">
                <div className="form-group full">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    {budgetOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <label>Budget</label>
                </div>

                <div className="form-group full">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    {serviceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <label>Service Interested In</label>
                </div>

                <div className="form-group full">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder=" "
                  />
                  <label>Tell us about your project</label>
                </div>
              </div>

              <div className="step-actions">
                <button type="button" onClick={prevStep} className="back-btn">
                  ← Back
                </button>
                <button type="button" onClick={nextStep} className="next-btn">
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step" aria-label="Step 3: Submit">
              <div className="turnstile-wrapper">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError("");
                  }}
                  onExpire={() => {
                    setTurnstileToken("");
                    setTurnstileError("Captcha expired.");
                  }}
                />

                {turnstileError && <p className="error">{turnstileError}</p>}
              </div>

              <div className="step-actions">
                <button type="button" onClick={prevStep} className="back-btn">
                  ← Back
                </button>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    "Start My Renovation"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}