"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ContactPage.css";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  email: string;
  address: string;
  mobile: string;
  budget: string;
  service: string;
  installationDate: string;
  foundUs: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData | "submit", string>>;
type FormTouched = Partial<Record<keyof FormData, boolean>>;
type GooglePlaceResult = google.maps.places.PlaceResult | null;

const MIN_FULL_NAME_PARTS = 2;

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
] as const;

const serviceOptions = [
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Home Renovation",
  "Apartment Renovation",
  "Flooring Services",
  "Construction & Additions",
] as const;

const foundUsOptions = ["Google", "Instagram", "Referral", "Other"] as const;

const initialFormData: FormData = {
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
};

const trimAndCollapseSpaces = (value: string): string => value.replace(/\s+/g, " ").trim();

const sanitizeName = (value: string): string =>
  value.replace(/[^\p{L}\p{M}\s'.-]/gu, "").replace(/\s{2,}/g, " ");

const sanitizePhoneForDisplay = (value: string): string =>
  value.replace(/[^\d+\s()-]/g, "").replace(/\s{2,}/g, " ");

const normalizePhoneForValidation = (value: string): string => value.replace(/[^\d+]/g, "");

const validateEmail = (value: string): boolean => {
  const email = trimAndCollapseSpaces(value).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

const validatePhone = (value: string): boolean => {
  const normalized = normalizePhoneForValidation(value);

  if (!normalized) return false;

  const digitsOnly = normalized.replace(/\D/g, "");
  if (digitsOnly.length < 8 || digitsOnly.length > 15) return false;

  return /^(?:\+?\d{8,15})$/.test(normalized);
};

const getTodayLocalDate = (): string => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

const isFutureOrToday = (dateValue: string): boolean => {
  if (!dateValue) return false;
  return dateValue >= getTodayLocalDate();
};

const isNameValid = (value: string): boolean => {
  const normalized = trimAndCollapseSpaces(value);
  const parts = normalized.split(" ").filter(Boolean);
  return parts.length >= MIN_FULL_NAME_PARTS && normalized.length >= 5;
};

const isBudgetValid = (value: string): boolean =>
  budgetOptions.includes(value as (typeof budgetOptions)[number]);

const isServiceValid = (value: string): boolean =>
  serviceOptions.includes(value as (typeof serviceOptions)[number]);

const isFoundUsValid = (value: string): boolean =>
  value === "" || foundUsOptions.includes(value as (typeof foundUsOptions)[number]);

const extractAddressMetadata = (place: GooglePlaceResult) => {
  const components: google.maps.GeocoderAddressComponent[] = place?.address_components ?? [];

  const getComponent = (...types: string[]) => {
    const match = components.find((component) =>
      types.every((type) => component.types.includes(type))
    );
    return match?.long_name ?? "";
  };

  const getShortComponent = (...types: string[]) => {
    const match = components.find((component) =>
      types.every((type) => component.types.includes(type))
    );
    return match?.short_name ?? "";
  };

  const streetNumber = getComponent("street_number");
  const route = getComponent("route");
  const suburb =
    getComponent("locality") ||
    getComponent("sublocality", "sublocality_level_1") ||
    getComponent("administrative_area_level_2");
  const state = getShortComponent("administrative_area_level_1");
  const postalCode = getComponent("postal_code");
  const country = getShortComponent("country");

  return {
    streetNumber,
    route,
    suburb,
    state,
    postalCode,
    country,
    hasStreetNumber: Boolean(streetNumber),
    hasRoute: Boolean(route),
    hasSuburb: Boolean(suburb),
    hasState: Boolean(state),
    hasPostalCode: Boolean(postalCode),
    isAustralian: country === "AU",
  };
};

const validateSelectedPlace = (place: GooglePlaceResult): boolean => {
  if (!place?.formatted_address) return false;
  if (!place.place_id) return false;

  const metadata = extractAddressMetadata(place);

  if (!metadata.isAustralian) return false;
  if (!metadata.hasStreetNumber) return false;
  if (!metadata.hasRoute) return false;
  if (!metadata.hasSuburb) return false;
  if (!metadata.hasState) return false;
  if (!metadata.hasPostalCode) return false;

  return true;
};

export default function ContactUsPage() {
  const router = useRouter();

  const formLoadedAt = useRef<number>(Date.now());
  const addressRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const addressSelectedRef = useRef<boolean>(false);
  const selectedPlaceIdRef = useRef<string>("");
  const selectedAddressValidRef = useRef<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [addressHint, setAddressHint] = useState<string>("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const resetAddressSelectionState = useCallback(() => {
    addressSelectedRef.current = false;
    selectedPlaceIdRef.current = "";
    selectedAddressValidRef.current = false;
  }, []);

  const getAddressErrorMessage = useCallback((value: string): string | undefined => {
    const normalized = trimAndCollapseSpaces(value);

    if (!normalized) {
      return "Please enter your address.";
    }

    if (!addressSelectedRef.current) {
      return "Please select an address from the suggestions.";
    }

    if (!selectedAddressValidRef.current) {
      return "Please select a complete address from the suggestions.";
    }

    return undefined;
  }, []);

  const validateField = useCallback(
    (name: keyof FormData, value: string): string | undefined => {
      switch (name) {
        case "fullName": {
          const normalized = trimAndCollapseSpaces(value);
          if (!normalized) return "Please enter your full name.";
          if (!isNameValid(normalized)) return "Please enter your first and last name.";
          return undefined;
        }

        case "email": {
          const normalized = trimAndCollapseSpaces(value);
          if (!normalized) return "Please enter your email.";
          if (!validateEmail(normalized)) return "Please enter a valid email.";
          return undefined;
        }

        case "address":
          return getAddressErrorMessage(value);

        case "mobile": {
          const normalized = trimAndCollapseSpaces(value);
          if (!normalized) return "Mobile number is required.";
          if (!validatePhone(normalized)) return "Please enter a valid mobile number.";
          return undefined;
        }

        case "budget":
          if (!value) return "Please select your budget.";
          if (!isBudgetValid(value)) return "Please select a valid budget option.";
          return undefined;

        case "service":
          if (!value) return "Please select a service.";
          if (!isServiceValid(value)) return "Please select a valid service.";
          return undefined;

        case "installationDate":
          if (!value) return "Please choose a date.";
          if (!isFutureOrToday(value)) return "Please choose today or a future date.";
          return undefined;

        case "foundUs":
          if (!isFoundUsValid(value)) return "Please select a valid option.";
          return undefined;

        case "subject":
          if (value.length > 150) return "Subject must be 150 characters or fewer.";
          return undefined;

        case "message":
          if (value.length > 2000) return "Message must be 2000 characters or fewer.";
          return undefined;

        default:
          return undefined;
      }
    },
    [getAddressErrorMessage]
  );

const validateForm = useCallback(
  (data: FormData): FormErrors => {
    const nextErrors: FormErrors = {};

    (Object.keys(data) as Array<keyof FormData>).forEach((fieldName) => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) nextErrors[fieldName] = error;
    });

    return nextErrors;
  },
  [validateField]
);

const clearFieldError = useCallback((fieldName: keyof FormData) => {
  setErrors((prev) => {
    if (!prev[fieldName]) return prev;
    const next = { ...prev };
    delete next[fieldName];
    return next;
  });
}, []);

const setFieldError = useCallback((fieldName: keyof FormData, message?: string) => {
  setErrors((prev) => {
    const next = { ...prev };

    if (message) {
      next[fieldName] = message;
    } else {
      delete next[fieldName];
    }

    return next;
  });
}, []);

const updateSingleField = useCallback(
  (fieldName: keyof FormData, rawValue: string) => {
    let value = rawValue;

    if (fieldName === "fullName") value = sanitizeName(value);
    if (fieldName === "mobile") value = sanitizePhoneForDisplay(value);
    if (fieldName === "email") value = value.trimStart();
    if (fieldName === "subject") value = value.slice(0, 150);
    if (fieldName === "message") value = value.slice(0, 2000);

    if (fieldName === "address") {
      resetAddressSelectionState();
      addressSelectedRef.current = false;
      selectedAddressValidRef.current = false;

      setAddressHint(
        value.trim() ? "Please select your address from the dropdown suggestions." : ""
      );
    }

    setFormData((prev) => {
      const nextData = { ...prev, [fieldName]: value };
      return nextData;
    });

    if (fieldName === "address") {
      clearFieldError("address");
      return;
    }

    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setFieldError(fieldName, error);
    } else {
      clearFieldError(fieldName);
    }
  },
  [clearFieldError, resetAddressSelectionState, setFieldError, touched, validateField]
);

const markFieldTouched = useCallback((fieldName: keyof FormData) => {
  setTouched((prev) => ({ ...prev, [fieldName]: true }));
}, []);

const handleFocus = useCallback(
  (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name as keyof FormData;
    markFieldTouched(fieldName);
  },
  [markFieldTouched]
);

const handleBlur = useCallback(
  (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name as keyof FormData;
    const value = e.target.value;

    if (fieldName === "address") {
      if (!trimAndCollapseSpaces(value)) {
        setAddressHint("");
        setFieldError("address", undefined);
        return;
      }

      // 🔥 NÃO trava validação aqui (deixa pro submit)
      return;
    }

    const error = validateField(fieldName, value);
    setFieldError(fieldName, error);
  },
  [setFieldError, validateField]
);

const handleChange = useCallback(
  (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name as keyof FormData;
    updateSingleField(fieldName, e.target.value);

    if (submitError) {
      setSubmitError("");
    }
  },
  [submitError, updateSingleField]
);

// ✅ AUTOCOMPLETE CORRIGIDO (SEM QUEBRAR DROPDOWN)
useEffect(() => {
  if (!addressRef.current) return;

  const input = addressRef.current;

  const initAutocomplete = () => {
    if (!window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "au" },
      fields: ["formatted_address", "place_id", "address_components"],
      types: ["address"],
    });

    autocompleteRef.current = autocomplete;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const formatted = place?.formatted_address || "";

      if (!formatted) return;

      addressSelectedRef.current = true;
      selectedAddressValidRef.current = true;
      selectedPlaceIdRef.current = place.place_id || "";

      // 🔥 IMPORTANTE: atualiza direto no input (evita bug do React)
      if (addressRef.current) {
        addressRef.current.value = formatted;
      }

      setFormData((prev) => ({
        ...prev,
        address: formatted,
      }));

      setAddressHint("");
      clearFieldError("address");
    });
  };

  const timeout = setTimeout(initAutocomplete, 300);
  return () => clearTimeout(timeout);
}, [clearFieldError]);

// ✅ ADICIONA AQUI (ANTES DO HANDLE SUBMIT)
const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

const handleSubmit = useCallback(
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitError("");

    const normalizedData: FormData = {
      fullName: trimAndCollapseSpaces(formData.fullName),
      email: trimAndCollapseSpaces(formData.email).toLowerCase(),
      address: trimAndCollapseSpaces(formData.address),
      mobile: trimAndCollapseSpaces(formData.mobile),
      budget: formData.budget,
      service: formData.service,
      installationDate: formData.installationDate,
      foundUs: formData.foundUs,
      subject: trimAndCollapseSpaces(formData.subject),
      message: formData.message.trim(),
    };

    setFormData(normalizedData);

    const validationErrors = validateForm(normalizedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        fullName: true,
        email: true,
        address: true,
        mobile: true,
        budget: true,
        service: true,
        installationDate: true,
        foundUs: true,
        subject: true,
        message: true,
      });
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    if (!apiBase) {
      setSubmitError("Server configuration error.");
      return;
    }

    const formStartedAt = Number(formLoadedAt.current);

    if (!Number.isFinite(formStartedAt) || formStartedAt <= 0) {
      setSubmitError("Form session error. Please refresh and try again.");
      return;
    }

    const payload = {
      ...normalizedData,
      status: "new",
      formStartedAt,
      foundUs: normalizedData.foundUs || null,
      subject: normalizedData.subject || null,
      message: normalizedData.message || null,
      addressMeta: {
        placeId: selectedPlaceIdRef.current || null,
        selectedFromAutocomplete: addressSelectedRef.current,
        selectedAddressValid: selectedAddressValidRef.current,
      },
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseData: any = null;

      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      if (response.ok && responseData?.success) {
        router.push("/thank-you");
        return;
      }

      const message =
        responseData?.message ||
        "We could not submit your form right now. Please try again.";

      setSubmitError(message);
    } catch {
      setSubmitError("⚠️ Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  },
  [formData, router, validateForm]
);

  return (
    <section className="contact-page">
      <div className="contact-page__wrapper">
        <div className="contact-page__info">
          <h2 className="contact-page__title">
            Let’s Talk About <span className="highlight">Your Project</span>
          </h2>

          <p>
            Whether you’re ready to renovate or just exploring ideas, our team is here
            to help. Visit us, call us, or send a message, let’s start the conversation.
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
            <a className="contact__emaill" href="mailto:info@inhausliving.com.au">
              info@inhausliving.com.au
            </a>
          </div>
        </div>

        <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                inputMode="text"
                maxLength={120}
                value={formData.fullName}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.fullName && errors.fullName ? "input-error" : ""}
                aria-invalid={Boolean(touched.fullName && errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />

              {touched.fullName && errors.fullName && (
                <p id="fullName-error" className="error-text">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>

              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                maxLength={160}
                value={formData.email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.email && errors.email ? "input-error" : ""}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {touched.email && errors.email && (
                <p id="email-error" className="error-text">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="address">Address *</label>

              <input
                ref={addressRef}
                type="text"
                id="address"
                name="address"
                autoComplete="off"
                inputMode="text"
                maxLength={255}
                placeholder="Start typing and select your address"
                value={formData.address}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.address && errors.address ? "input-error" : ""}
                aria-invalid={Boolean(touched.address && errors.address)}
                aria-describedby={
                  touched.address && errors.address
                    ? addressHint
                      ? "address-error address-hint"
                      : "address-error"
                    : addressHint
                    ? "address-hint"
                    : undefined
                }
              />

              {!!addressHint && (
                <p
                  id="address-hint"
                  style={{
                    marginTop: 6,
                    marginBottom: 0,
                    fontSize: 13,
                    color:
                      touched.address && errors.address
                        ? "#c0392b"
                        : addressSelectedRef.current && selectedAddressValidRef.current
                        ? "#2d7a46"
                        : "#666",
                  }}
                >
                  {addressHint}
                </p>
              )}

              {touched.address && errors.address && (
                <p id="address-error" className="error-text">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile *</label>

              <input
                type="tel"
                id="mobile"
                name="mobile"
                autoComplete="tel"
                inputMode="tel"
                maxLength={25}
                value={formData.mobile}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.mobile && errors.mobile ? "input-error" : ""}
                aria-invalid={Boolean(touched.mobile && errors.mobile)}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
              />

              {touched.mobile && errors.mobile && (
                <p id="mobile-error" className="error-text">
                  {errors.mobile}
                </p>
              )}
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="budget">Budget *</label>

              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.budget && errors.budget ? "input-error" : ""}
                aria-invalid={Boolean(touched.budget && errors.budget)}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              >
                <option value="">Select your budget</option>

                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {touched.budget && errors.budget && (
                <p id="budget-error" className="error-text">
                  {errors.budget}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="service">Interested Service *</label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={touched.service && errors.service ? "input-error" : ""}
                aria-invalid={Boolean(touched.service && errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                <option value="">Select service</option>

                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {touched.service && errors.service && (
                <p id="service-error" className="error-text">
                  {errors.service}
                </p>
              )}
            </div>
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label htmlFor="installationDate">Ideal Installation Date *</label>

              <input
                type="date"
                id="installationDate"
                name="installationDate"
                min={getTodayLocalDate()}
                value={formData.installationDate}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  touched.installationDate && errors.installationDate ? "input-error" : ""
                }
                aria-invalid={Boolean(
                  touched.installationDate && errors.installationDate
                )}
                aria-describedby={
                  errors.installationDate ? "installationDate-error" : undefined
                }
              />

              {touched.installationDate && errors.installationDate && (
                <p id="installationDate-error" className="error-text">
                  {errors.installationDate}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="foundUs">How did you find us?</label>

              <select
                id="foundUs"
                name="foundUs"
                value={formData.foundUs}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(touched.foundUs && errors.foundUs)}
                aria-describedby={errors.foundUs ? "foundUs-error" : undefined}
              >
                <option value="">Select one</option>

                {foundUsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {touched.foundUs && errors.foundUs && (
                <p id="foundUs-error" className="error-text">
                  {errors.foundUs}
                </p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <input
              type="text"
              id="subject"
              name="subject"
              maxLength={150}
              value={formData.subject}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-invalid={Boolean(touched.subject && errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : "subject-count"}
            />

            <p
              id="subject-count"
              style={{
                marginTop: 6,
                marginBottom: 0,
                fontSize: 13,
                color: "#666",
              }}
            >
              {formData.subject.length}/150
            </p>

            {touched.subject && errors.subject && (
              <p id="subject-error" className="error-text">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Tell us about your project</label>

            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={2000}
              value={formData.message}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={errors.message ? "message-error" : "message-count"}
            />

            <p
              id="message-count"
              style={{
                marginTop: 6,
                marginBottom: 0,
                fontSize: 13,
                color: "#666",
              }}
            >
              {formData.message.length}/2000
            </p>

            {touched.message && errors.message && (
              <p id="message-error" className="error-text">
                {errors.message}
              </p>
            )}
          </div>

          {submitError && (
            <p style={{ color: "#c0392b", marginBottom: 10 }}>{submitError}</p>
          )}

          <div className="form-submit">
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}