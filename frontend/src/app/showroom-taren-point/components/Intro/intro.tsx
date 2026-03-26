import "./intro.css";

export default function Intro() {
  return (
    <section className="showroom-intro">
      <div className="showroom-intro__container">
        {/* IMAGE SIDE */}
        <div className="showroom-intro__media">
          <img
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-wYHJ3uNZ_nI-unsplash.jpg?tr=w-1400,q-90,f-webp"
            alt="Inhaus showroom experience"
            className="showroom-intro__image"
          />

          <div className="showroom-intro__imageGlow" />
          <div className="showroom-intro__imageAccent" />
        </div>

        {/* CONTENT */}
        <div className="showroom-intro__content">
          <div className="showroom-intro__card">
            <span className="showroom-intro__kicker">
              The Experience
            </span>

            <h2 className="showroom-intro__title">
              Designed for
              <br />
              real decisions
            </h2>

            <p className="showroom-intro__text">
              Created as part of the
              <span className="showroom-intro__highlight">
                {" "}Inhaus Living experience
              </span>, this space goes beyond inspiration — offering a tactile and
              immersive way to understand renovation before it begins.
            </p>

            <p className="showroom-intro__text">
              With expert guidance throughout your visit, every detail is designed
              to help you move forward with clarity, confidence, and intent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}