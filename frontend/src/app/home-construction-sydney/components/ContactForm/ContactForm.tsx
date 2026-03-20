"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./ContactForm.css";

declare global {
  interface Window {
    google: any;
  }
}

export default function ContactForm() {
  const router = useRouter();
  const formLoadedAt = useRef(Date.now());
  const addressRef = useRef<HTMLInputElement | null>(null);
  const addressSelectedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    mobile: false,
    address: false,
    budget: false,
    service: false,
  });

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

  /* ================= GOOGLE AUTOCOMPLETE FIX ================= */

  useEffect(() => {
    if (!addressRef.current) return;

    const input = addressRef.current;

    const init = () => {
      if (!window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "au" },
        fields: ["formatted_address", "place_id"],
        types: ["address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const formatted = place?.formatted_address || "";

        if (!formatted) return;

        addressSelectedRef.current = true;

        if (addressRef.current) {
          addressRef.current.value = formatted;
        }

        setFormData((prev) => ({
          ...prev,
          address: formatted,
        }));

        setErrors((prev) => ({
          ...prev,
          address: false,
        }));
      });
    };

    const timeout = setTimeout(init, 300);
    return () => clearTimeout(timeout);
  }, []);

  /* ================= CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "address") {
      addressSelectedRef.current = false;
      setErrors((prev) => ({ ...prev, address: false }));
      return;
    }

    if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: value.trim().length < 3,
      }));
    }

    if (name === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      setErrors((prev) => ({
        ...prev,
        email: !valid,
      }));
    }

    if (name === "mobile") {
      const valid = /^[0-9+\s]{8,15}$/.test(value);

      setErrors((prev) => ({
        ...prev,
        mobile: !valid,
      }));
    }

    if (name === "budget") {
      setErrors((prev) => ({
        ...prev,
        budget: value === "",
      }));
    }

    if (name === "service") {
      setErrors((prev) => ({
        ...prev,
        service: value === "",
      }));
    }

  };

  /* ================= VALIDATION ================= */

  const validateStep1 = () => {

    const newErrors = {
      fullName: formData.fullName.trim().length < 3,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      mobile: !/^[0-9+\s]{8,15}$/.test(formData.mobile),
      address: !addressSelectedRef.current,
      budget: false,
      service: false,
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return !Object.values(newErrors).some(Boolean);

  };

  const validateStep2 = () => {

    const newErrors = {
      ...errors,
      budget: formData.budget === "",
      service: formData.service === "",
    };

    setErrors(newErrors);

    return !newErrors.budget && !newErrors.service && formData.message.trim() !== "";

  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!addressSelectedRef.current) {
      setErrors((prev) => ({ ...prev, address: true }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    const payload = {
      ...formData,

      service_key: "apartment-renovation",
      service_label: "Apartment Renovations Sydney",
      suburb: "sydney",
      region: "sydney",

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

  return (
    <section id="contact-form"className="premium-form" aria-labelledby="premium-form-heading">
      <div className="premium-form__container">

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

        <form className="premium-form__form" onSubmit={handleSubmit}>

          <div className="progress-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {step === 1 && (

            <div className="form-step">

              <div className="form-grid">

                <div className={`form-group ${errors.fullName ? "invalid" : ""}`}>

                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="name"
                  />

                  <label>Full Name *</label>

                  {errors.fullName && (
                    <span className="field-error">
                      Please enter your full name
                    </span>
                  )}

                </div>

                <div className={`form-group ${errors.email ? "invalid" : ""}`}>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="email"
                  />

                  <label>Email *</label>

                  {errors.email && (
                    <span className="field-error">
                      Please enter a valid email
                    </span>
                  )}

                </div>

                <div className={`form-group ${errors.mobile ? "invalid" : ""}`}>

                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="tel"
                  />

                  <label>Mobile *</label>

                  {errors.mobile && (
                    <span className="field-error">
                      Please enter a valid phone number
                    </span>
                  )}

                </div>

                <div className={`form-group ${errors.address ? "invalid" : ""}`}>

                  <input
                    ref={addressRef}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    autoComplete="street-address"
                  />

                  <label>Suburb / Address *</label>

                  {errors.address && (
                    <span className="field-error">
                      Please enter a valid address (street and suburb)
                    </span>
                  )}

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

                <div className={`form-group full ${errors.budget ? "invalid" : ""}`}>

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

                  <label>Budget *</label>

                  {errors.budget && (
                    <span className="field-error">
                      Please select your budget
                    </span>
                  )}

                </div>

                <div className={`form-group full ${errors.service ? "invalid" : ""}`}>

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

                  <label>Service Interested In *</label>

                  {errors.service && (
                    <span className="field-error">
                      Please select a service
                    </span>
                  )}

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

                  <label>Tell us about your project *</label>

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