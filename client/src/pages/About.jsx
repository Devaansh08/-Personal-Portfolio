import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultAbout = {
  aboutParagraphs: [
    "I am a passionate Full-Stack MERN Developer and UI/UX Designer based in Lucknow, India, completing my B.Tech in Computer Science and Engineering at Ambalika Institute of Management & Technology (2021—2025). I specialize in engineering high-performance web applications using MongoDB, Express.js, React, Node.js, and Python, combining robust backend architectures with clean, intuitive user interfaces.",
    "My focus centers on architecting production-ready solutions — from interactive productivity tools like Kanban boards to AI-driven applications like Resume Alchemist with real-time ATS heuristic evaluation. I adhere strictly to clean code practices, component-driven design systems, secure RESTful APIs, and cross-device responsiveness, ensuring every product is fast, accessible, and purpose-built for scale."
  ],
  services: [
    {
      title: 'Full-Stack Web Development',
      description: 'Building end-to-end MERN applications with scalable Node.js/Express backends, MongoDB databases, and dynamic React frontends.',
      icon: '/icon-dev.svg',
    },
    {
      title: 'Frontend & UI/UX Engineering',
      description: 'Crafting responsive, pixel-perfect user interfaces with React, modern CSS systems, micro-interactions, and accessible layouts.',
      icon: '/icon-design.svg',
    },
    {
      title: 'RESTful API & Database Architecture',
      description: 'Designing performant REST APIs, data schemas with Mongoose, prepared queries, input validation, and cloud database integrations.',
      icon: '/icon-dev.svg',
    },
    {
      title: 'Python Scripting & Automation',
      description: 'Developing data extraction scripts, algorithmic utilities, and backend automation pipelines engineered for efficiency.',
      icon: '/icon-app.svg',
    },
  ],
};

const engineeringHighlights = [
  {
    icon: 'code-slash-outline',
    title: 'Full-Stack MERN Stack',
    desc: 'React 19, Node.js, Express, MongoDB & Mongoose ORM',
  },
  {
    icon: 'speedometer-outline',
    title: 'Performance & Speed',
    desc: 'Vite build tooling, zero redundant re-renders & fast loading',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Clean Architecture',
    desc: 'Prepared queries, server-side validation & secure endpoints',
  },
  {
    icon: 'phone-portrait-outline',
    title: 'Responsive Design',
    desc: 'Mobile-first layout across 320px to 4K displays',
  },
];

export default function About() {
  const [data, setData] = useState(defaultAbout);

  useEffect(() => {
    axios
      .get('/api/profile')
      .then((res) => {
        if (res.data && res.data.aboutParagraphs) {
          setData({
            aboutParagraphs: res.data.aboutParagraphs,
            services: res.data.services?.length ? res.data.services : defaultAbout.services,
          });
        }
      })
      .catch((err) => {
        console.warn('Using default about info:', err.message);
      });
  }, []);

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        {data.aboutParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {/* Services */}
      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>

        <ul className="service-list">
          {data.services.map((service, index) => {
            const iconSrc =
              service.icon && service.icon.startsWith('/')
                ? service.icon
                : service.icon === 'design'
                ? '/icon-design.svg'
                : service.icon === 'app'
                ? '/icon-app.svg'
                : '/icon-dev.svg';

            return (
              <li className="service-item" key={index}>
                <div className="service-icon-box">
                  <img src={iconSrc} alt={`${service.title} icon`} width="40" />
                </div>

                <div className="service-content-box">
                  <h4 className="h4 service-item-title">{service.title}</h4>
                  <p className="service-item-text">{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Core Engineering Highlights */}
      <section style={{ marginTop: '32px' }}>
        <h3 className="h3 service-title" style={{ marginBottom: '20px' }}>
          Engineering Philosophy
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {engineeringHighlights.map((item, idx) => (
            <div
              key={idx}
              className="content-card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: 'var(--border-gradient-onyx)',
                border: '1px solid var(--jet)',
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 219, 112, 0.12)',
                  color: 'var(--orange-yellow-crayola)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                <ion-icon name={item.icon}></ion-icon>
              </div>
              <div>
                <h5
                  style={{
                    color: 'var(--white-2)',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    color: 'var(--light-gray-70)',
                    fontSize: '12px',
                    lineHeight: '1.5',
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
