import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSun, faMoon, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import "./CSS Files/Navbar.css";
import Typewriter from "typewriter-effect/dist/core";
import { supportedLanguages } from "./i18n";

import Pdf from "./Images/CV.pdf";

const THEME_KEY = "portfolio-theme";

function Navbar() {
  const { t, i18n } = useTranslation();
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (!typewriterRef.current) return;
    typewriterRef.current.innerHTML = "";

    const strings = [
      i18n.t("hero.typewriter1"),
      i18n.t("hero.typewriter2"),
      i18n.t("hero.typewriter3"),
    ];
    const typewriter = new Typewriter(typewriterRef.current, {
      strings,
      autoStart: true,
      loop: true,
      typeSpeed: 30,
      deleteSpeed: 50,
    });

    typewriterRef.current.style.display = "flex";
    typewriterRef.current.style.flexWrap = "wrap";

    return () => {
      typewriter.stop();
    };
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add("scrolled");
        } else {
          navbarRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onResumeClick = () => {
    window.open(Pdf);
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" ref={navbarRef}>
        <div className="name-box">
          <div className="Name">
            A<span className="period">.</span>
          </div>
        </div>
        <ul className="nav-links">
          <Link to="About" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.about")}</li>
          </Link>
          <Link to="Projects" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.projects")}</li>
          </Link>
          <Link to="Contact" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.contact")}</li>
          </Link>
        </ul>
        <div className="container">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          </button>
          <div className="lang-switcher">
            {supportedLanguages.map(({ code }) => (
              <button
                key={code}
                type="button"
                className={`lang-btn ${i18n.language === code ? "active" : ""}`}
                onClick={() => i18n.changeLanguage(code)}
                title={code === "en" ? "English" : code === "es" ? "Español" : "Português"}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="https://www.linkedin.com/in/alexishs/" target="_blank" rel="noopener noreferrer" className="icons">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/AlexisHS458" target="_blank" rel="noopener noreferrer" className="icons">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="Resume" onClick={onResumeClick}>
            {t("nav.resume")}
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </nav>
      <div className={`nav-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu} aria-hidden="true" />
      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="nav-mobile-links">
          <Link to="About" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.about")}</li>
          </Link>
          <Link to="Projects" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.projects")}</li>
          </Link>
          <Link to="Contact" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.contact")}</li>
          </Link>
        </ul>
        <div className="nav-mobile-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          </button>
          <div className="lang-switcher">
            {supportedLanguages.map(({ code }) => (
              <button
                key={code}
                type="button"
                className={`lang-btn ${i18n.language === code ? "active" : ""}`}
                onClick={() => i18n.changeLanguage(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="nav-mobile-social">
            <a href="https://www.linkedin.com/in/alexishs/" target="_blank" rel="noopener noreferrer" className="icons">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/AlexisHS458" target="_blank" rel="noopener noreferrer" className="icons">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <a className="Resume" onClick={onResumeClick}>
            {t("nav.resume")}
          </a>
        </div>
      </div>
      <div className="Introduction">
        <h1>{t("hero.heyIm")}</h1>
        <h2>
          <span ref={typewriterRef}></span>
        </h2>
        <p>{t("hero.intro")}</p>
        <div className="hero-buttons">
          <Link to="Projects" smooth={true} duration={700}>
            <button type="button">{t("hero.viewProjects")}</button>
          </Link>
          <Link to="Contact" smooth={true} duration={900}>
            <button type="button">{t("hero.contactMe")}</button>
          </Link>
        </div>
        <p className="hero-highlights">{t("hero.highlights")}</p>
        <Link to="About" smooth={true} duration={800} className="scroll-hint">
          <span className="scroll-hint-text">{t("hero.scrollHint")}</span>
          <span className="scroll-hint-arrow" aria-hidden>↓</span>
        </Link>
      </div>
    </>
  );
}

export default Navbar;

