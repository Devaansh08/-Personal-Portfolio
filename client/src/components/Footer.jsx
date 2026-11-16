import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="minimal-footer">
      <div className="footer-top-row">
        <div className="footer-status-pill">
          <span className="footer-pulse-dot"></span>
          <span>Available for New Projects & Full-Time Roles</span>
        </div>

        <button
          onClick={scrollToTop}
          type="button"
          className="footer-back-to-top"
          title="Smooth scroll to top"
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
          <span>Top</span>
        </button>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-content-row">
        <div className="footer-copyright">
          <p>
            © {new Date().getFullYear()} <strong>Devansh Kumar</strong>. Built with MongoDB, Express, React & Node.js.
          </p>
          <p className="footer-subtext">
            Lucknow, Uttar Pradesh, India • devansh31k@gmail.com
          </p>
        </div>

        <ul className="footer-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/portfolio">Projects</Link>
          </li>
          <li>
            <Link to="/resume-builder">Resume Alchemist</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <a
              href="https://github.com/Devaansh08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/devansh-kumar-8515a8220/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
