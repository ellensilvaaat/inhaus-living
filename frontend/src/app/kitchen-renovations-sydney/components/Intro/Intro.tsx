"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-2g6aRZE9S8s-unsplash%20(1).jpg",
    alt: "Luxury kitchen renovation Sydney with custom cabinetry",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-alk1-DJoIWI-unsplash.jpg",
    alt: "Modern kitchen renovation Sydney with stone benchtop",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/the-prototype-nhDyDNczz1s-unsplash.jpg",
    alt: "Custom kitchen joinery renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/sufyan-Qpmau1DoIVo-unsplash.jpg",
    alt: "Luxury open-plan kitchen renovation Sydney",
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
      <section className="kitchen-section">
        <div className="kitchen-intro-grid">
          <div className="kitchen-intro-text">
            <h2>Transform Your Space with Kitchen Renovations in Sydney</h2>

            <p>
              Inhaus Living is committed to delivering exceptional kitchen
              renovations in Sydney, combining intelligent design with premium
              craftsmanship. We create kitchens that balance luxury,
              functionality and long-term durability.
            </p>

            <p>
              From custom cabinetry and stone benchtops to leading European
              fixtures and fittings, every element is selected to ensure your
              kitchen renovation is built for a lifetime of high-quality use.
            </p>
          </div>

          <div className="kitchen-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="kitchen-gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="kitchen-gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="kitchen-image-modal" onClick={closeModal}>
          <div
            className="kitchen-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="kitchen-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded kitchen renovation project Sydney"
              fill
              className="kitchen-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}