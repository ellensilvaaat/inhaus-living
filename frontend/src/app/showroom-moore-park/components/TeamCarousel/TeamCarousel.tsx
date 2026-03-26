"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./TeamCarousel.css";

type TeamMember = {
  id: number;
  name: string;
  image: string;
  description: string;
};

const team: TeamMember[] = [
  {
    id: 1,
    name: "Bathrooms & fixtures",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/steven-ungermann-Aac7IlKnYX8-unsplash.jpg",
    description:
      "Bathroom environments showcasing tapware, vanities, tiles and finishes.",
  },
  {
    id: 2,
    name: "Materials, colours & finishes",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/mohammad-lotfian-D6mlvnGbAVg-unsplash.jpg",
    description:
      "Explore a wide range of colours, finishes, stones and surface options you can see and touch.",
  },
  {
    id: 3,
    name: "Tiles, flooring & surfaces",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/maria-kovalets-SMHlc6u80-A-unsplash.jpg",
    description:
      "Flooring, tiles and stone options to help you compare materials and make confident choices.",
  },
];

export default function TeamCarousel() {
  return (
    <section className="team-carousel">
      <motion.div
        className="team-carousel__header"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
      >
        <h2 className="team-carousel__title">What you will find</h2>
        <div className="team_underline"></div>
      </motion.div>

      <div className="team-carousel__container">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            className="team-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="team-card__image">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="team-card__img"
                sizes="(max-width: 768px) 100vw, 320px"
              />

              {/* LIGHT SWEEP */}
              <div className="light-sweep" />

              {/* TITLE */}
              <p className="team-card__name">
                {member.name.includes("&") ? (
                  <>
                    {member.name.split("&")[0].trim()} <br />
                    & {member.name.split("&")[1].trim()}
                  </>
                ) : (
                  member.name
                )}
              </p>

              {/* OVERLAY */}
              <div className="team-card__overlay">
                <p className="team-card__description">
                  {member.description}
                </p>
              </div>
            </div>

            <p className="team-card__mobile-text">
              {member.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}