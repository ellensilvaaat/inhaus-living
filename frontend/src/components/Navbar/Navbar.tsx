"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./Navbar.css";

const links = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* 🔥 TOPBAR SÓ NA HOME */}
      {isHome && (
        <div className="topbar">
          <div className="topbar__inner">
            <Link href="/showroom-belrose" className="topbar__link">
              <span className="topbar__pill">New</span>

              <span className="topbar__text">
                Belrose showroom opening soon
              </span>

              <span className="topbar__divider" />

              <span className="topbar__cta">
                Get early access
              </span>

              <span className="topbar__arrow">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* 🔥 NAVBAR */}
      <header
        className="navbar"
        style={{
          top: isHome ? "40px" : "0px", // 👈 aqui resolve TUDO
        }}
      >
        <div className="navbar__container">
          <Link href="/" className="navbar__logo" onClick={closeMenu}>
            <Image
              src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png?tr=w-400,f-webp"
              alt="Inhaus Living Logo"
              width={175}
              height={35}
              priority
              className="navbar__logo-img"
            />
          </Link>

          <nav className="navbar__nav">
            <ul className="navbar__list">
              {links.map((link) => (
                <li key={link.name} className="navbar__item">
                  <Link
                    href={link.path}
                    className={
                      pathname === link.path ||
                      (link.path !== "/" && pathname.startsWith(link.path))
                        ? "navbar__link navbar__link--active"
                        : "navbar__link"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`navbar__hamburger ${
              menuOpen ? "navbar__hamburger--hidden" : ""
            }`}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu__overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="mobile-menu__close"
              onClick={closeMenu}
            >
              &times;
            </button>

            <ul className="mobile-menu__list">
              {links.map((link) => (
                <li key={link.name} className="mobile-menu__item">
                  <Link
                    href={link.path}
                    className={
                      pathname === link.path
                        ? "mobile-menu__link mobile-menu__link--active"
                        : "mobile-menu__link"
                    }
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}