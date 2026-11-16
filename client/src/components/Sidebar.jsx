import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultProfile = {
  name: 'Devansh Kumar',
  title: 'Web developer',
  avatar: '/devansh-profile.jpg',
  email: 'devansh31k@gmail.com',
  phone: '+91 8887831905',
  birthday: 'August 31, 2003',
  location: 'Lucknow, Uttar Pradesh, India',
  socialLinks: {
    github: 'https://github.com/Devaansh08',
    linkedin: 'https://www.linkedin.com/in/devansh-kumar-8515a8220/',
    twitter: '#',
    instagram: '#',
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    axios
      .get('/api/profile')
      .then((res) => {
        if (res.data && res.data.name) {
          setProfile((prev) => ({
            ...prev,
            ...res.data,
            socialLinks: { ...prev.socialLinks, ...(res.data.socialLinks || {}) },
          }));
        }
      })
      .catch((err) => {
        // Fallback to defaultProfile if server is unreachable
        console.warn('Using default profile data:', err.message);
      });
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img
            src={profile.avatar || '/devansh-profile.jpg'}
            alt={profile.name}
            width="80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/devansh-profile.jpg';
            }}
          />
        </figure>

        <div className="info-content">
          <h1 className="name" title={profile.name}>
            {profile.name}
          </h1>
          <p className="title">{profile.title}</p>
        </div>

        <button
          className="info_more-btn"
          data-sidebar-btn
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          aria-label="Toggle contacts"
        >
          <span>{isOpen ? 'Hide Contacts' : 'Show Contacts'}</span>
          <ion-icon name={isOpen ? 'chevron-up' : 'chevron-down'}></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href={`mailto:${profile.email}`} className="contact-link">
                {profile.email}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href={`tel:${profile.phone}`} className="contact-link">
                {profile.phone}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="2003-08-31">{profile.birthday}</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>{profile.location}</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          {profile.socialLinks?.github && (
            <li className="social-item">
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          )}

          {profile.socialLinks?.linkedin && (
            <li className="social-item">
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          )}

          {profile.socialLinks?.twitter && (
            <li className="social-item">
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Twitter"
              >
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
          )}

          {profile.socialLinks?.instagram && (
            <li className="social-item">
              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Instagram"
              >
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
