"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./Navbar.css";

const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <Link href="/" className="navbar__logo" onClick={closeMenu}>
            <Image
              src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-400,f-webp"
              alt="Inhaus"
              width={160}
              height={32}
              priority
              className="navbar__logo-img"
            />
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`navbar__link ${isActive(link.path) ? "navbar__link--active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="navbar__right">
            <Link href="/showroom-belrose#early-access" className="navbar__cta">
              Early Access
            </Link>

            <button
              className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu__overlay ${menuOpen ? "mobile-menu__overlay--open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      >
        <div
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu__top">
            <Link href="/" className="mobile-menu__logo" onClick={closeMenu}>
              <Image
                src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-400,f-webp"
                alt="Inhaus"
                width={140}
                height={28}
                className="mobile-menu__logo-img"
              />
            </Link>

            <button
              className="mobile-menu__close"
              onClick={closeMenu}
              aria-label="Close menu"
              type="button"
            >
              ×
            </button>
          </div>

          <div className="mobile-menu__content">
            <nav className="mobile-menu__nav" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`mobile-menu__link ${
                    isActive(link.path) ? "mobile-menu__link--active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mobile-menu__footer">
              <Link
                href="/showroom-belrose#early-access"
                className="mobile-menu__cta"
                onClick={closeMenu}
              >
                Early Access
              </Link>

              <p className="mobile-menu__note">
                Belrose Showroom — Opening Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}