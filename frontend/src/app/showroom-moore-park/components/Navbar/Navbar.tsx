import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="showroom-navbar">
      <Link href="/" className="showroom-navbar__logoWrap">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Frame%2012.svg"
          alt="Inhaus Living"
          className="showroom-navbar__logo"
        />
      </Link>

      <div className="showroom-navbar__right">
        <a
          href="tel:0296623509"
          className="showroom-navbar__call"
        >
          Call Now
        </a>
      </div>
    </header>
  );
}