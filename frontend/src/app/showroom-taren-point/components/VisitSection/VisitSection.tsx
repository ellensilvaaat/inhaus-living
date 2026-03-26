"use client";

import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import TimeSlots from "./TimeSlots";
import "./VisitSection.css";

type ServiceOption = "" | "Kitchen" | "Bathroom" | "Full Home" | "Flooring";

export default function VisitSection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [fullName, setFullName] = useState("");
  const [service, setService] = useState<ServiceOption>("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const AU_PHONE_REGEX = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(value: string) {
    if (!value) {
      setEmailError("");
      return;
    }

    setEmailError(EMAIL_REGEX.test(value) ? "" : "Please enter a valid email");
  }

  function validateMobile(value: string) {
    if (!value) {
      setMobileError("");
      return;
    }

    setMobileError(
      AU_PHONE_REGEX.test(value)
        ? ""
        : "Please enter a valid Australian phone number"
    );
  }

  async function fetchBookedTimes(dateString: string) {
    if (!API_URL) return [];

    try {
      const res = await fetch(
        `${API_URL}/api/visits_tp/booked?date=${dateString}`,
        {
          cache: "no-store",
        }
      );

      const json = await res.json();
      const times = Array.isArray(json.bookedTimes) ? json.bookedTimes : [];

      setBookedTimes(times);

      return times;
    } catch {
      setBookedTimes([]);
      return [];
    }
  }

  useEffect(() => {
    if (!selectedDate) return;

    const dateString = selectedDate.toISOString().split("T")[0];
    fetchBookedTimes(dateString);
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedTime) return;

    if (bookedTimes.includes(selectedTime)) {
      setSelectedTime(null);
    }
  }, [bookedTimes, selectedTime]);

  useEffect(() => {
    if (!selectedDate || !showCalendar || !API_URL) return;

    const interval = setInterval(() => {
      const dateString = selectedDate.toISOString().split("T")[0];
      fetchBookedTimes(dateString);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedDate, showCalendar, API_URL]);

  function handleServiceChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as ServiceOption;

    setService(value);
    setShowCalendar(value !== "");
    setSelectedDate(null);
    setSelectedTime(null);
    setBookedTimes([]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      emailError ||
      mobileError ||
      !fullName ||
      !email ||
      !service ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    if (!API_URL) {
      alert("API configuration missing");
      return;
    }

    const visit_day = selectedDate.toISOString().split("T")[0];

    try {
      setIsSubmitting(true);

      const res = await fetch(`${API_URL}/api/visits_mp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          mobile: mobile || null,
          email,
          service,
          visit_day,
          visit_time: selectedTime,
          page_path: window.location.pathname,
        }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          await fetchBookedTimes(visit_day);
          setSelectedTime(null);
          alert("This time has just been booked. Please select another one.");
          return;
        }

        throw new Error("Failed request");
      }

      window.location.href = "/thank-you";
    } catch {
      alert("Failed request");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid =
    !!fullName &&
    !!email &&
    !!service &&
    !!selectedDate &&
    !!selectedTime &&
    !emailError &&
    !mobileError;

  return (
    <section id="form" className="visit-section">
      <div className="visit-section__glow visit-section__glow--left" />
      <div className="visit-section__glow visit-section__glow--right" />

      <div className="visit-container">
        <div className="visit-header">
          <span className="visit-eyebrow">Book a showroom visit</span>
          <h2 className="visit-title">Prepare for your visit</h2>
          <p className="visit-subtitle">
            Leave your details and let us know what you’re interested in, 
            so we can make your visit more relevant and helpful.
          </p>
        </div>

        <form className="visit-form" onSubmit={handleSubmit}>
          <div className="form-row form-row--two">
            <div className="field">
              <label>Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="field">
              <label>Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  validateMobile(e.target.value);
                }}
                className={mobileError ? "invalid" : ""}
                placeholder="04xx xxx xxx"
              />
              {mobileError && <p className="error-msg">{mobileError}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className={emailError ? "invalid" : ""}
                placeholder="you@example.com"
              />
              {emailError && <p className="error-msg">{emailError}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Interested Service *</label>
              <select value={service} onChange={handleServiceChange}>
                <option value="">Select...</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Full Home">Full Home</option>
                <option value="Flooring">Flooring</option>
              </select>
            </div>
          </div>

          {showCalendar && (
            <div className="visit-form__booking">
              <WeeklyCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
              />

              {selectedDate && (
                <TimeSlots
                  date={selectedDate}
                  selectedTime={selectedTime}
                  bookedTimes={bookedTimes}
                  onSelect={setSelectedTime}
                />
              )}
            </div>
          )}

          {/* 🔥 UX MELHORADA */}
          {!selectedDate && showCalendar && (
            <p className="error-msg">Please select a date</p>
          )}

          {selectedDate && !selectedTime && (
            <p className="error-msg">Please select a time</p>
          )}

          <button
            className="submit-btn"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}