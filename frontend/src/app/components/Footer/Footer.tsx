"use client";

import Image from "next/image";
import {
  FaLinkedin,
  FaPinterest,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Typewriter from "typewriter-effect";
import "./Footer.css";

interface FooterProps {
  region: "sydney" | "canberra";
}

export default function Footer({ region }: FooterProps) {
  const isCanberra = region === "canberra";

  const email = "info@inhausliving.com.au";

  const addresses = isCanberra
    ? ["Unit 2/58 Wollongong St, Fyshwick ACT 2609"]
    : [
        "Shop 10/2A Todman Ave, Kensington NSW",
        "Unit 2/175 Taren Point Rd, Caringbah NSW",
      ];

  return (
    <footer className="foooter">
      <div className="foooter__columns">

        {/* LEFT */}
        <div className="foooter__column footer__typewriter">
          <h2 className="foooter__typewriter-text">
            <strong className="foooter__we">we</strong>{" "}
            <span className="foooter__animated-word">
              <Typewriter
                options={
                  {
                    strings: ["build.", "renovate.", "design.", "transform."],
                    autoStart: true,
                    loop: true,
                    pauseFor: 2000,
                    deleteSpeed: 50,
                  } as any
                }
              />
            </span>
          </h2>
          <Image
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
            alt="Inhaus Logo"
            width={180}
            height={50}
            className="foooter__logo"
          />
        </div>

        {/* RIGHT */}
        <div className="foooter__column footer__contact">
          <p className="footoer__contact-title">Contact Us</p>

          <p className="foooter__contact-email">{email}</p>

          <p className="foooter__address-title">Address</p>

          {addresses.map((address, index) => (
            <p key={index} className="foooter__address">
              {address}
            </p>
          ))}

          <div className="foooter__social">
            <a
              href="https://www.linkedin.com/company/inhausliving"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://au.pinterest.com/inhausliving"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest />
            </a>

            <a
              href="https://www.instagram.com/inhaus_living"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/inhausliving.com.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="foooter__bottom">
        <span>
          © {new Date().getFullYear()} INHAUS LIVING. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}