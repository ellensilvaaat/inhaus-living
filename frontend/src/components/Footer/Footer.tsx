"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaPinterest,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Typewriter from "typewriter-effect";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columns">

        <div className="footer__column footer__typewriter">
          <h2 className="footer__typewriter-text">
            <strong className="footer__we">we</strong>{" "}
            <span className="footer__animated-word">
              <Typewriter
                options={{
                  strings: ["build.", "renovate.", "design.", "transform."],
                  autoStart: true,
                  loop: true,
                  pauseFor: 2000,
                  deleteSpeed: 50,
                } as any }
              />
            </span>
          </h2>

          <Image
            src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
            alt="Inhaus Logo"
            width={180}
            height={50}
            className="footer__logo"
          />
        </div>

        <div className="footer__column footer__nav">
          <p className="footer__nav-title">Quick Links</p>
          <Link href="/" className="footer__link">Home</Link>
          <Link href="/about" className="footer__link">About Us</Link>
          <Link href="/services" className="footer__link">Services</Link>
          <Link href="/projects" className="footer__link">Projects</Link>
          <Link href="/blog" className="footer__link">Blog</Link>
          <Link href="/contact" className="footer__link">Contact Us</Link>
        </div>

        <div className="footer__column footer__contact">
          <p className="footer__contact-title">Contact us</p>
          <p className="footer__contact-email">info@inhausliving.com.au</p>

          <p className="footer__address-title">Address</p>
          <p className="footer__address">Shop 10/2A Todman Ave, Kensington, NSW</p>
          <p className="footer__address">Unit 2/175 Taren Point Rd, Caringbah, NSW</p>
          <p className="footer__address">Unit 2/58 Wollongong St, Fyshwick ACT</p>

          <div className="footer__social">
            <a href="https://www.linkedin.com/company/inhausliving" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://au.pinterest.com/inhausliving" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
            <a href="https://www.instagram.com/inhaus_living" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/inhausliving.com.au" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} INHAUS LIVING. ALL RIGHTS RESERVED.
        </span>

        <Link href="/privacy-policy" className="footer__privacy">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}