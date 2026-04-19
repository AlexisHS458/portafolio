import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import "./CSS Files/Navbar.css";
import Typewriter from "typewriter-effect/dist/core";
import { supportedLanguages } from "./i18n";

const CV_ES_PDF = "/cv/Alexis_Herrera_CV_ES.pdf";
const CV_EN_PDF = "/cv/Alexis_Herrera_CV_EN.pdf";

const THEME_KEY = "portfolio-theme";

function closeAllNavDropdowns() {
  document.querySelectorAll("details.nav-dropdown[open]").forEach((el) => {
    el.removeAttribute("open");
  });
}

function closeDetailsFromEvent(e: MouseEvent<HTMLElement>) {
  e.currentTarget.closest("details")?.removeAttribute("open");
}

function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const langCode =
    supportedLanguages.find(
      ({ code }) => i18n.language === code || i18n.language.startsWith(`${code}-`)
    )?.code ?? "en";
  const currentName = supportedLanguages.find((l) => l.code === langCode)?.name ?? "English";

  return (
    <details className="nav-dropdown">
      <summary className="nav-dropdown-summary">
        {currentName}
        <FontAwesomeIcon icon={faChevronDown} className="nav-dropdown-chevron" aria-hidden />
      </summary>
      <div className="nav-dropdown-panel" role="group" aria-label={t("nav.languageLabel")}>
        {supportedLanguages.map(({ code, name }) => (
          <button
            key={code}
            type="button"
            className={`nav-dropdown-option${langCode === code ? " is-active" : ""}`}
            onClick={(e) => {
              i18n.changeLanguage(code);
              closeDetailsFromEvent(e);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </details>
  );
}

function Navbar() {
  const { t, i18n } = useTranslation();
  const langCode =
    supportedLanguages.find(
      ({ code }) => i18n.language === code || i18n.language.startsWith(`${code}-`)
    )?.code ?? "en";
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

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      document.querySelectorAll("details.nav-dropdown[open]").forEach((details) => {
        if (!details.contains(target)) {
          details.removeAttribute("open");
        }
      });
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      closeAllNavDropdowns();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    closeAllNavDropdowns();
  };

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
          <Link to="Experience" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.experience")}</li>
          </Link>
          <Link to="Projects" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.projects")}</li>
          </Link>
          <Link to="TechnicalTests" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.technicalTests")}</li>
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
          <LanguageDropdown />
          <details className="nav-dropdown">
            <summary className="nav-dropdown-summary">
              {t("nav.cvMenu")}
              <FontAwesomeIcon icon={faChevronDown} className="nav-dropdown-chevron" aria-hidden />
            </summary>
            <div className="nav-dropdown-panel" role="group" aria-label={t("nav.cvMenu")}>
              <a
                href={CV_ES_PDF}
                target="_blank"
                rel="noopener noreferrer"
                title={t("nav.cvSpanishTitle")}
                className="nav-dropdown-option nav-dropdown-option--link"
                onClick={closeDetailsFromEvent}
              >
                {t("nav.cvSpanish")}
              </a>
              <a
                href={CV_EN_PDF}
                target="_blank"
                rel="noopener noreferrer"
                title={t("nav.cvEnglishTitle")}
                className="nav-dropdown-option nav-dropdown-option--link"
                onClick={closeDetailsFromEvent}
              >
                {t("nav.cvEnglish")}
              </a>
            </div>
          </details>
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
          <Link to="Experience" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.experience")}</li>
          </Link>
          <Link to="Projects" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.projects")}</li>
          </Link>
          <Link to="TechnicalTests" smooth={true} duration={500} onClick={closeMenu}>
            <li>{t("nav.technicalTests")}</li>
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
          <div className="nav-mobile-langs" role="group" aria-label={t("nav.languageLabel")}>
            {supportedLanguages.map(({ code, name }) => (
              <button
                key={code}
                type="button"
                className={`nav-mobile-lang-btn${langCode === code ? " is-active" : ""}`}
                onClick={() => {
                  i18n.changeLanguage(code);
                  closeMenu();
                }}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="nav-mobile-cv" role="group" aria-label={t("nav.cvMenu")}>
            <a
              href={CV_ES_PDF}
              target="_blank"
              rel="noopener noreferrer"
              title={t("nav.cvSpanishTitle")}
              className="nav-mobile-cv-link"
              onClick={closeMenu}
            >
              <span className="nav-mobile-cv-link-kicker">{t("nav.cvMenu")}</span>
              <span className="nav-mobile-cv-link-sep" aria-hidden>
                {" · "}
              </span>
              {t("nav.cvSpanish")}
            </a>
            <a
              href={CV_EN_PDF}
              target="_blank"
              rel="noopener noreferrer"
              title={t("nav.cvEnglishTitle")}
              className="nav-mobile-cv-link"
              onClick={closeMenu}
            >
              <span className="nav-mobile-cv-link-kicker">{t("nav.cvMenu")}</span>
              <span className="nav-mobile-cv-link-sep" aria-hidden>
                {" · "}
              </span>
              {t("nav.cvEnglish")}
            </a>
          </div>
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

