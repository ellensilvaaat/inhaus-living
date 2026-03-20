"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import "./ContactForm.css";

interface ContactFormProps {
  renovationLabel: string;
  businessName: string;
  phoneLabel: string;
  email: string;
  locationLabel: string;
}

declare global {
  interface Window {
    google: any;
  }
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
  const addressRef = useRef<HTMLInputElement | null>(null);
  const addressSelectedRef = useRef(false);

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

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    mobile: false,
    address: false,
    budget: false,
  });

  const budgetOptions = [
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $75,000",
    "$75,000 - $100,000",
    "$100,000 +",
  ];

  /* ================= GOOGLE AUTOCOMPLETE ================= */

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

  /* ================= CHANGE HANDLER ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
  };

  /* ================= VALIDATION ================= */

  const validateStep1 = () => {
    const newErrors = {
      fullName: formData.fullName.trim().length < 3,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      mobile: !/^[0-9+\s]{8,15}$/.test(formData.mobile),
      address: !addressSelectedRef.current,
      budget: false,
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return !Object.values(newErrors).some(Boolean);
  };

  const validateStep2 = () => {
    const budgetError = formData.budget === "";
    setErrors((prev) => ({ ...prev, budget: budgetError }));
    return !budgetError;
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
    } catch {
      setSubmitError("⚠️ Could not connect to the server.");
    } finally {
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

          <div className="bathroom-form__steps">
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

                <div className={`form-group ${errors.fullName ? "invalid" : ""}`}>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder=" "
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
                  <label>Street Address *</label>
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