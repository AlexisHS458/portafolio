import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-scroll";
import "./CSS Files/Navbar.css";
import Typewriter from "typewriter-effect/dist/core";

import Pdf from "./Images/CV.pdf";

function Navbar() {
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!typewriterRef.current) return;

    const typewriter = new Typewriter(typewriterRef.current, {
      strings: [
        "Frontend Developer",
        "Vue & React Specialist",
        "UI/UX Enthusiast",
      ],
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
  }, []);

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
          <Link to="About" smooth={true} duration={500}>
            <li>About</li>
          </Link>
          <Link to="Projects" smooth={true} duration={500}>
            <li>Projects</li>
          </Link>
          <Link to="Contact" smooth={true} duration={500}>
            <li>Contact</li>
          </Link>
        </ul>
        <div className="container">
          <a href="https://www.linkedin.com/in/alexishs/" target="_blank" rel="noopener noreferrer" className="icons">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/AlexisHS458" target="_blank" rel="noopener noreferrer" className="icons">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="Resume" onClick={onResumeClick}>
            Resume
          </a>
        </div>
      </nav>
      <div className="Introduction">
        <h1>Hey, I&apos;m Alexis</h1>
        <h2>
          <span ref={typewriterRef}></span>
        </h2>
        <p>
          Frontend Developer with 3+ years of experience building responsive and performant 
          web applications. Passionate about creating beautiful and functional user experiences.
        </p>
        <Link to="Contact" smooth={true} duration={900}>
          <button>Contact Me</button>
        </Link>
      </div>
    </>
  );
}

export default Navbar;

