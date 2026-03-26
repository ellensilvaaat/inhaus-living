"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import "./Process.css";

type Step = {
  number: string;
  title: string;
  text: string;
  image: string;
  flip: boolean;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Visit the <br/> showroom",
    text: "Explore kitchens, bathrooms, materials and finishes in a real-life setting.",
    image: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/IMG_1128.JPG",
    flip: false,
  },
  {
    number: "02",
    title: "Get guided <br/> support",
    text: "Receive light guidance from our team to help you navigate the showroom and explore relevant spaces.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/mohammad-lotfian-D6mlvnGbAVg-unsplash.jpg",
    flip: true,
  },
  {
    number: "03",
    title: "Plan your and <br/> next steps",
    text: "Leave with clearer ideas and a better understanding of what’s possible for your renovation.",
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/pickawood-ZRVSxFkbUss-unsplash.jpg",
    flip: false,
  },
];

export default function OurProcess() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end 85%"],
  });

  const timelineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="our-process">
      <div className="our-process__ambient our-process__ambient--left" />
      <div className="our-process__ambient our-process__ambient--right" />

      <div className="container">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="process-header__eyebrow">Experience flow</span>
          <h2>Our Process</h2>
          <p>
            A considered journey through spaces, finishes and decisions — designed
            to feel effortless, tactile and deeply inspiring.
          </p>
          <div className="underline" />
        </motion.div>

        <div className="process-timeline">
          <div className="process-timeline__rail" />
          <motion.div
            className="process-timeline__progress"
            style={{ scaleY: timelineScaleY, height: progressHeight }}
          />
        </div>

        <div className="process-steps">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  total,
}: {
  step: Step;
  index: number;
  total: number;
}) {
  return (
    <motion.article
      className={`process-step ${step.flip ? "flip" : ""}`}
      initial={{ opacity: 0, y: 90, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{
        duration: 1,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="process-step__anchor" aria-hidden="true">
        <span className="process-step__anchor-dot" />
        <span className="process-step__anchor-ring" />
      </div>

      <motion.div
        className="image"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={step.image}
          alt={step.title.replace(/<br\/>/g, " ")}
          fill
          className="img"
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <div className="image-overlay" />
        <div className="image-sweep" />
      </motion.div>

      <div className="text">
        <span className="big-number">{step.number}</span>

        <div className="text-reveal">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
            duration: 0.8,
            delay: 0.1,
            }}
            dangerouslySetInnerHTML={{
            __html: step.title.replace(
            /(.*?)(\s+)(\S+)(<br\/>|$)/,
            "$1$2<strong>$3</strong>$4"
            ),
           }}
          />
        </div>

        <div className="text-reveal text-reveal--paragraph">
          <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, amount: 0.8 }}
           transition={{
           duration: 0.8,
           delay: 0.2,
           }}
           >
          {step.text}
          </motion.p>
        </div>

        <motion.div
          className="process-step__meta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>
            Step {step.number} / {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}