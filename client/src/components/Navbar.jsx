import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
