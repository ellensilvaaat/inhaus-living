"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Intro.css";

const images = [
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/webaliser-_TPTXZd9mOo-unsplash.jpg",
    alt: "Luxury home extension construction Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/gonzz-X7kXiYFt8TI-unsplash.jpg",
    alt: "Second storey home addition Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/marius-christensen-O1yuMkzLEVs-unsplash.jpg",
    alt: "Open plan structural renovation Sydney",
  },
  {
    src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/viktoriia-kondratiuk-nPN6N5kTjuU-unsplash.jpg",
    alt: "Modern home construction addition Sydney",
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
      <section className="construction-section">
        <div className="construction-intro-grid">
          <div className="construction-intro-text">
            <h2>Expand Your Home with Expert Construction and Additions in Sydney</h2>
            <p>
              Inhaus Living delivers premium home extensions, second-storey
              additions and structural renovations across Sydney. Whether you
              need more living space, an open-plan redesign or a complete
              expansion, we build with precision and architectural integrity.
            </p>
            <p>
              With over 20 years of construction experience, our licensed
              builders manage everything from structural engineering to council
              compliance, ensuring your home addition increases both lifestyle
              functionality and long-term property value.
            </p>
          </div>

          <div className="construction-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className="construction-gallery-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={`${img.src}?tr=f-webp,q-90`}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="construction-gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="construction-image-modal" onClick={closeModal}>
          <div
            className="construction-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="construction-modal-close"
              onClick={closeModal}
              aria-label="Close image"
            >
              ×
            </button>

            <Image
              src={`${selectedImage}?tr=w-1600,f-webp,q-95`}
              alt="Expanded home construction and addition project in Sydney"
              fill
              className="construction-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}