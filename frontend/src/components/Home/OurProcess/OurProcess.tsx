import Image from "next/image";
import "./OurProcess.css";

const steps = [
  {
    number: "01",
    title: "In-Store Consultation",
    text: `Visit one of our Sydney or Canberra showrooms for a personalised consultation. We discuss your vision, lifestyle needs and budget to shape a clear renovation direction.`,
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step1.png?tr=w-500,f-webp,q-95",
    alt: "Renovation consultation at Inhaus Living showroom in Sydney",
    flip: false,
  },
  {
    number: "02",
    title: "Site Visit",
    text: `Our team conducts a detailed on-site assessment to take precise measurements, review conditions and identify any structural or compliance considerations.`,
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step2.png?tr=w-500,f-webp,q-95",
    alt: "On-site renovation assessment by licensed builder",
    flip: true,
  },
  {
    number: "03",
    title: "Plans & Kickoff",
    text: `We finalise layouts, specifications and documentation before commencing works. With clear timelines and dedicated project management, your renovation begins with confidence.`,
    image:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step3.png?tr=w-500,f-webp,q-95",
    alt: "Renovation plans and project kickoff meeting",
    flip: false,
  },
];

export default function OurProcess() {
  return (
    <section className="our-process">
      <div className="container">
        <h2>Our Process</h2>
        <div className="underline" />

        <p className="process-intro">
          A clear, structured and transparent approach that ensures every
          renovation project is delivered with precision, quality and care.
        </p>

        {steps.map(({ number, title, text, image, alt, flip }, index) => (
          <div key={index} className={`process-step ${flip ? "flip" : ""}`}>
            <div className="process-step__image">
              <Image
                src={image}
                alt={alt}
                width={450}
                height={450}
                loading="lazy"
              />
            </div>

            <div className="process-step__text">
              <span className="step-number">{number}</span>

              <h3 className="process-step__title">
                {title}
              </h3>

              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}