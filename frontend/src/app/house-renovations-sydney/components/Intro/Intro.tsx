"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-Cio7d2EK1vs-unsplash.jpg",
    alt: "Luxury house living room renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/jason-briscoe-AQl-J19ocWE-unsplash.jpg",
    alt: "Modern house bathroom renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/bilal-mansuri-NppJ8sOQeEg-unsplash.jpg",
    alt: "Custom home bedroom renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/prydumano-design-1Uw-a7Os5rk-unsplash%20(1).jpg",
    alt: "Luxury home dining renovation Sydney",
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
      <section className="house-section">
        <div className="house-intro-grid">
          <div className="house-intro-text">
            <h2>Transform Your Space with House Renovations in Sydney</h2>
            <p>
              Inhaus Living designs homes that combine unique architectural
              vision with luxury, functionality and timeless beauty. Your house
              should reflect who you are — and we are here to make that happen.
            </p>
            <p>
              With over 20 years of industry experience, our expert team works
              closely with you to create a home renovation that enhances your
              lifestyle while increasing long-term value.
            </p>
          </div>

          <div className="house-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="house-gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="house-gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="house-image-modal" onClick={closeModal}>
          <div
            className="house-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="house-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded house renovation project Sydney"
              fill
              className="house-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}