"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
    alt: "Luxury apartment living room renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/peter-muniz-VJ1pilUtw9o-unsplash.jpg",
    alt: "Apartment bathroom renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/bilal-mansuri-NppJ8sOQeEg-unsplash.jpg",
    alt: "Apartment bedroom interior renovation",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/prydumano-design-1Uw-a7Os5rk-unsplash%20(1).jpg",
    alt: "Apartment dining area renovation Sydney",
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
      <section className="apartment-section">
        <div className="apartment-intro-grid">
          <div className="apartment-intro-text">
            <h2>Transform Your Space with Expert Apartment Renovators</h2>
            <p>
              With over 20 years of experience, Inhaus Living specialises in
              strata-compliant apartment renovations across Sydney.
              From sleek modern kitchens to luxurious spa-inspired bathrooms,
              we deliver exceptional results tailored to your lifestyle.
            </p>
          </div>

          <div className="apartment-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded apartment renovation image"
              fill
              className="modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}