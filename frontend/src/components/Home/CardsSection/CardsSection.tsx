import Link from "next/link";
import Image from "next/image";
import "./CardsSection.css";
import arrowIcon from "@/assets/arrow.svg";

const cardsData = [
  {
    title: "Home Renovations",
    description:
      "Whole-home transformations planned, built and finished under one roof.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card1.jpg?tr=w-800,f-webp,q-95",
    anchor: "homes",
  },
  {
    title: "Apartment Renovations",
    description:
      "Clever space planning and strata-savvy builds for effortless apartment upgrades.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/elena-popova-NYIDN7fBfkI-unsplash.jpg?tr=w-500,f-webp,q-95",
    anchor: "apartments",
  },
  {
    title: "Kitchen Renovations",
    description:
      "High-performance layouts, premium finishes, integrated appliances.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-800,f-webp,q-95",
    anchor: "kitchens",
  },
  {
    title: "Bathroom Renovations",
    description:
      "Spa-level details, quality waterproofing, lighting and fixtures.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card4.jpg?tr=w-700,f-webp,q-95",
    anchor: "bathrooms",
  },
  {
    title: "Flooring Services",
    description:
      "Hybrid, timber, parquetry and carpet; specified and installed.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card5.jpg?tr=w-700,f-webp,q-95",
    anchor: "flooring",
  },
  {
    title: "Construction & Additions",
    description:
      "Licensed builders for extensions, new builds and second-storey additions.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/card6.jpg?tr=w-800,f-webp,q-95",
    anchor: "construction",
  },
];

export default function CardsSection() {
  return (
    <section className="cards-section">
      <div className="cards-section__header">
      <h2 className="cards-section__title">
       Design–Build Renovation & Construction Services
      </h2>
      <p className="cards-section__subtitle">
      Spaces that welcome you home, delivered by a
      licensed team across Sydney and Canberra.
     </p>
    </div>

      <div className="cards-section__scroll">
        {cardsData.map((card, index) => (
          <div className="cards-section__card" key={index}>
            <Image
              src={card.image}
              alt={card.title}
              width={800}
              height={600}
              className="cards-section__img-bg"
              loading="lazy"
            />

            <div className="cards-section__content">
              <div className="cards-section__white-box">
                <h3 className="cards-section__card-title">
                  {card.title}
                </h3>
              </div>

              <p className="cards-section__description">
                {card.description}
              </p>

              <Link
                href={`/services#${card.anchor}`}
                className="cards-section__btn"
              >
                <Image
                  src={arrowIcon}
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link href="/projects" className="cs-cta-main">
        Explore Projects
        <span className="cs-cta-line cs-cta-line--tr"></span>
        <span className="cs-cta-line cs-cta-line--bl"></span>
      </Link>
    </section>
  );
}