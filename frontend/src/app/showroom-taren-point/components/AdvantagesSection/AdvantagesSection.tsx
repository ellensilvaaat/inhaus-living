"use client";

import Image from "next/image";
import "./AdvantagesSection.css";

type Advantage = {
  id: number;
  icon: string;
  title: string;
  text: string;
};

const advantages: Advantage[] = [
  {
    id: 1,
    icon: "https://img.icons8.com/ios/50/blueprint.png",
    title: "Experienced designers",
    text: "Guidance from experts who understand your renovation needs.",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/ios/50/process--v1.png",
    title: "Trusted process",
    text: "Clear steps designed to make every decision simple and confident.",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/dotty/80/project.png",
    title: "Quality assurance",
    text: "Reliable, durable and carefully curated products for your project.",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/ios/50/time_2.png",
    title: "Save time",
    text: "Everything you need in one place, so your renovation moves faster.",
  },
];

export default function AdvantagesSection() {
  return (
    <section className="advantages-section">
      <div className="advantages-container">

        <div className="advantages-header">
          <span className="advantages-eyebrow">Why Inhaus</span>

          <h2 className="advantages-title">
            Why homeowners choose us
          </h2>

          <p className="advantages-subtitle">
            Trusted by homeowners across Sydney and Canberra, Inhaus Living is
            known for thoughtful design, immersive showrooms and a considered
            approach to renovation.
          </p>

          <div className="advantages-line" />
        </div>

        <div className="advantages-grid">
          {advantages.map((item) => (
            <div className="adv-card" key={item.id}>
              <div className="adv-icon-wrapper">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                />
              </div>

              <h3 className="adv-title">{item.title}</h3>
              <p className="adv-text">{item.text}</p>

              <div className="adv-glow" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}