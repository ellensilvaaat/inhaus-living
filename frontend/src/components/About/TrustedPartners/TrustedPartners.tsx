"use client";

import { motion } from "framer-motion";
import "./TrustedPartners.css";

const logos = [
  { id: 1, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/otti.png?tr=w-106,h-84", alt: "Otti" },
  { id: 2, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/geberit.png?tr=w-106,h-18", alt: "Geberit" },
  { id: 3, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Laminex.jpg?tr=w-128,h-43", alt: "Laminex" },
  { id: 4, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Nikpol.webp?tr=w-128,h-48", alt: "Nikpol" },
  { id: 5, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/everstone.jpg?tr=w-250,h-50", alt: "Everstone" },
  { id: 6, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/Fienza-logo-smaller.png?tr=w-128,h-48", alt: "Fienza" },
  { id: 7, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/nero.svg?tr=w-106,h-84", alt: "Nero" },
  { id: 8, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/caesarstone.png?tr=w-128,h-71", alt: "Caesarstone" },
  { id: 9, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/meir.png?tr=w-106,h-30", alt: "Meir" },
  { id: 10, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/Cosentino.png?tr=w-128,h-10", alt: "Cosentino" },
  { id: 11, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/blaupunkt-logo.svg?tr=w-90,h-10", alt: "Blaupunkt" },
  { id: 12, src: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/AC-Stone-Group-640w.webp?tr=w-110,h-57", alt: "AC Stone" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function TrustedPartners() {
  return (
    <section className="trusted-partners">
      <div className="trusted-partners__container">
        <div className="trusted-partners__text">
          <h2 className="trusted-partners__title">
            Our Trusted Partners
          </h2>

          <div className="trusted-partners__underline"></div>

          <p className="trusted-partners__description">
            We collaborate with industry-leading suppliers and brands to ensure every project reflects the highest standards of quality and design.
          </p>
        </div>

        <motion.div
          className="trusted-partners__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              className="trusted-partners__card"
              key={logo.id}
              variants={itemVariants}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`trusted-partners__logo${
                  logo.alt === "Blaupunkt"
                    ? " trusted-partners__logo--small"
                    : ""
                }`}
                loading="lazy"
                width="106"
                height="84"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}