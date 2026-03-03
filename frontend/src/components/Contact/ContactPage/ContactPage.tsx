"use client";

import React, { useState, useEffect, useRef } from "react";
import "./ContactPage.css";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactUsPage() {
  const router = useRouter();

  const formLoadedAt = useRef<number>(Date.now());

  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    budget: "",
    service: "",
    installationDate: "",
    foundUs: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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

  const foundUsOptions = ["Google", "Instagram", "Referral", "Other"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof typeof formData)[] = [
      "fullName",
      "email",
      "address",
      "mobile",
      "budget",
      "service",
      "installationDate",
    ];

    for (const key of requiredFields) {
      if (!formData[key]) {
        alert(`⚠️ Please fill in the ${key} field.`);
        return;
      }
    }

    if (!turnstileToken) {
      setTurnstileError("Please verify you are human.");
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    if (!apiBase) {
      alert("API base URL not configured.");
      return;
    }

    const payload = {
      ...formData,
      status: "new",
      formStartedAt: formLoadedAt.current,
      turnstileToken,
      foundUs: formData.foundUs || null,
      subject: formData.subject || null,
      message: formData.message || null,
    };

    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/thank-you");
      } else {
        setTurnstileError(data.message || "Submission blocked.");
        setTurnstileToken("");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("⚠️ Could not connect to the server.");
      setTurnstileToken("");
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-page__wrapper">
        <div className="contact-page__info">
          <h2 className="contact-page__title">
            Let’s Talk About <span className="highlight">Your Project</span>
          </h2>
          <p>
            Whether you’re ready to renovate or just exploring ideas, our team
            is here to help. Visit us, call us, or send a message, let’s start
            the conversation.
          </p>

          <div className="contact-page__visit">
            <h3>📍 Visit Us</h3>

            <div className="location">
              <strong className="location_name">Moore Park</strong>
              <br />
              <a
                href="https://www.google.com/maps/place/Shop+10%2F2A+Todman+Ave,+Kensington+NSW+2033"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop 10/2A Todman Ave, Kensington NSW 2033
              </a>
              <br />
              <h4 className="location_namee">
                Phone: <a href="tel:0296623509">(02) 9662 3509</a>
              </h4>
            </div>

            <div className="location">
              <strong className="location_name">Taren Point</strong>
              <br />
              <a
                href="https://www.google.com/maps/place/2%2F175+Taren+Point+Rd,+Caringbah+NSW+2229"
                target="_blank"
                rel="noopener noreferrer"
              >
                2/175 Taren Point Rd, Caringbah NSW 2229
              </a>
              <br />
              <h4 className="location_namee">
                Phone: <a href="tel:0283591679">(02) 8359 1679</a>
              </h4>
            </div>

            <div className="location">
              <strong className="location_name">Fyshwick</strong>
              <br />
              <a
                href="https://www.google.com/maps/place/2%2F58+Wollongong+St,+Fyshwick+ACT+2609"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unit 2/58 Wollongong St, Fyshwick ACT 2609
              </a>
              <br />
              <h4 className="location_namee">
                Phone: <a href="tel:0261762807">(02) 6176 2807</a>
              </h4>
            </div>
          </div>

          <div className="contact-page__email">
            <h3>📧 Email Us</h3>
            <a
              className="contact__emaill"
              href="mailto:info@inhausliving.com.au"
            >
              info@inhausliving.com.au
            </a>
          </div>
        </div>

        <form className="contact-page__form" onSubmit={handleSubmit}>
          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              >
                <option value="">Select your budget</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="service">Interested Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select service</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="installationDate">
                Ideal Installation Date
              </label>
              <input
                type="date"
                id="installationDate"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="foundUs">How did you find us?</label>
              <select
                id="foundUs"
                name="foundUs"
                value={formData.foundUs}
                onChange={handleChange}
              >
                <option value="">Select one</option>
                {foundUsOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Tell us about your project</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: "14px", marginBottom: "6px" }}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setTurnstileError("");
              }}
              onError={() => {
                setTurnstileToken("");
                setTurnstileError("Captcha error. Please try again.");
              }}
              onExpire={() => {
                setTurnstileToken("");
                setTurnstileError("Captcha expired. Please verify again.");
              }}
              options={{ theme: "light" }}
            />
            {turnstileError && (
              <p style={{ color: "#c0392b", fontSize: "0.9rem", marginTop: 6 }}>
                {turnstileError}
              </p>
            )}
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}