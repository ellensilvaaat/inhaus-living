"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-eGy6ovTXHD8-unsplash.jpg",
    alt: "Premium timber flooring installation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-U-0-AgPDpHk-unsplash.jpg",
    alt: "Engineered timber flooring Sydney living room",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-5UF7CaaGf-I-unsplash.jpg",
    alt: "Hybrid flooring installation Sydney apartment",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-uQTswS1WmVs-unsplash.jpg",
    alt: "Luxury oak flooring Sydney home renovation",
  },
];

export default function Intro() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedImage]);

  return (
    <>
      <section className="flooring-section">
        <div className="flooring-intro-grid">
          <div className="flooring-intro-text">
            <h2>Transform Your Space with Premium Flooring in Sydney</h2>
            <p>
              At Inhaus Living, we specialise in high-quality timber,
              engineered and hybrid flooring installations across Sydney.
              Flooring is the foundation of your interior — it defines warmth,
              texture and architectural flow.
            </p>
            <p>
              With over 20 years of experience in residential renovations, our
              licensed team delivers precision installation, structural
              preparation and flawless finishes that stand the test of time.
            </p>
          </div>

          <div className="flooring-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="flooring-gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="flooring-gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="flooring-image-modal" onClick={closeModal}>
          <div
            className="flooring-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flooring-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded flooring installation project in Sydney"
              fill
              className="flooring-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}