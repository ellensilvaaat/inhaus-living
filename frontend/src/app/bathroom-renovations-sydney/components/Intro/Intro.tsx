"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-_XkcDuSKMXg-unsplash.jpg",
    alt: "Luxury bathroom renovation Sydney with marble finishes",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/backbone-L4iRkKL5dng-unsplash.jpg",
    alt: "Modern bathroom renovation Sydney with custom vanity",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-8MPy_wwyBKI-unsplash.jpg",
    alt: "Contemporary bathroom design Sydney with premium fittings",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/carlos-masias-yg8zkwBS30Q-unsplash%20(1).jpg",
    alt: "High-end bathroom renovation Sydney by licensed builders",
  },
];

export default function Intro() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedImage]);

  return (
    <>
      <section className="bathroom-section">
        <div className="bathroom-intro-grid">
          <div className="bathroom-intro-text">
            <h2>
              Transform Your Space with Bathroom Renovations in Sydney
            </h2>
            <p>
              At Inhaus Living, we redefine luxury through exceptional
              craftsmanship and innovative design. Specialising in bespoke
              bathroom renovations in Sydney, we create refined spaces that
              combine elegance, durability and everyday functionality.
            </p>
            <p>
              From premium European fixtures to custom vanities and precision
              tiling, our licensed bathroom renovation specialists deliver
              high-end results tailored to your lifestyle and long-term value.
            </p>
          </div>

          <div className="bathroom-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="bathroom-gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="bathroom-gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="bathroom-image-modal" onClick={closeModal}>
          <div
            className="bathroom-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bathroom-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded bathroom renovation project in Sydney"
              fill
              className="bathroom-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}