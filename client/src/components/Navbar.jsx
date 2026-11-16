import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/about"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            data-nav-link
          >
            About
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/resume"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            data-nav-link
          >
            Resume
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/portfolio"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            data-nav-link
          >
            Portfolio
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/resume-builder"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            data-nav-link
          >
            Resume Builder
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink
            to="/contact"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            data-nav-link
          >
            Contact
          </NavLink>
        </li>

        <li className="navbar-item theme-toggle-item">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            type="button"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Pista Green Light Bg'}
            aria-label="Toggle Theme"
          >
            <ion-icon name={theme === 'light' ? 'moon-outline' : 'leaf-outline'}></ion-icon>
            <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Pista Light'}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
