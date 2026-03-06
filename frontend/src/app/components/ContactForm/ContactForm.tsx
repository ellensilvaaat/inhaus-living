"use client";

import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import "./ContactForm.css";

interface ContactFormProps {
  renovationLabel: string;
  businessName: string;
  phoneLabel: string;
  email: string;
  locationLabel: string;
}

export default function ContactForm({
  renovationLabel,
  businessName,
  phoneLabel,
  email,
  locationLabel,
}: ContactFormProps) {
  const router = useRouter();
  const params = useParams();
  const formLoadedAt = useRef(Date.now());

  // capturar service e slug dinamicamente
  const serviceKey = params?.service as string | undefined;
  const slug = params?.slug as string | undefined;

  function extractSuburb(service?: string, slugValue?: string) {
    if (!service || !slugValue) return null;
    if (!slugValue.startsWith(service + "-")) return null;
    return slugValue.replace(service + "-", "");
  }

  const suburb = extractSuburb(serviceKey, slug);
  const region = suburb === "canberra" ? "canberra" : "sydney";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    budget: "",
    service: renovationLabel,
    message: "",
  });

  const budgetOptions = [
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $75,000",
    "$75,000 - $100,000",
    "$100,000 +",
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
    formData.budget.trim() && formData.message.trim();

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    const pagePath = window.location.pathname;

    const payload = {
      ...formData,
      service_key: serviceKey,
      service_label: renovationLabel,
      suburb,
      region,
      page_path: pagePath,
      status: "new",
      formStartedAt: formLoadedAt.current,
    };

    try {
      const res = await fetch(`${apiBase}/api/landing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/thank-you");
        return;
      }

      setSubmitError(data?.message || "Submission failed.");
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitError("⚠️ Could not connect to the server.");
      setIsSubmitting(false);
    }
  };

  const progressPercent = (step / 3) * 100;
  const phoneHref = `tel:${phoneLabel.replace(/\s|\(|\)/g, "")}`;

  return (
    <section
      id="contact"
      className="bathroom-form"
      aria-labelledby="renovation-form-heading"
    >
      <div className="bathroom-form__container">

        {/* LEFT */}
        <div className="bathroom-form__info">
          <h2 id="renovation-form-heading">
            Start Your <span>{renovationLabel} in {locationLabel}</span>
          </h2>

          <p>
            Complete the steps below and our team at {businessName} will contact
            you within 24 hours to discuss your {renovationLabel.toLowerCase()},
            project scope and budget expectations.
          </p>

          <div className="bathroom-form__contact">
            <a href={phoneHref}>{phoneLabel}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>

          <div className="bathroom-form__steps" aria-label="Form progress">
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
        <form className="bathroom-form__form" onSubmit={handleSubmit}>

          <div className="progress-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {step === 1 && (
            <div className="form-step">

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
            <div className="form-step">

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
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder=" "
                  />
                  <label>
                    Tell us about your {renovationLabel.toLowerCase()}
                  </label>
                </div>

              </div>

              <div className="step-actions">

                <button
                  type="button"
                  onClick={prevStep}
                  className="back-btn"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="next-btn"
                >
                  Next →
                </button>

              </div>

            </div>
          )}

          {step === 3 && (
            <div className="form-step">

              {submitError && (
                <p className="error">{submitError}</p>
              )}

              <div className="step-actions">

                <button
                  type="button"
                  onClick={prevStep}
                  className="back-btn"
                >
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
                    `Start My ${renovationLabel}`
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