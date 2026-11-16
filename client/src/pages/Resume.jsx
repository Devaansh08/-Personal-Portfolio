import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultResume = {
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      period: '2021 — 2025',
      degree: 'B.Tech in Computer Science and Engineering',
      details: 'Focused on core computer science subjects, data structures, algorithms, and full-stack software development.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2020 — 2021',
      degree: 'Intermediate',
      details: 'Physics, Chemistry, and Mathematics with distinction.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2018 — 2019',
      degree: 'High school in Science with 85% marks.',
      details: 'Foundational secondary school education.',
    },
  ],
  experience: [
    {
      title: 'Python Developer',
      period: '2024 — Present',
      description: 'Working as a fresher Python developer in web development with good knowledge of front-end and back-end architectures.',
    },
    {
      title: 'Web designer',
      period: '2024 — Present',
      description: 'Creating visually stunning, user-centric, and responsive web designs with modern CSS and frontend libraries.',
    },
  ],
  skills: [
    { name: 'Web Development (MERN)', percentage: 85 },
    { name: 'React.js', percentage: 75 },
    { name: 'Graphic design / UI', percentage: 70 },
    { name: 'Python', percentage: 65 },
    { name: 'WordPress', percentage: 50 },
  ],
};

export default function Resume() {
  const [data, setData] = useState(defaultResume);

  useEffect(() => {
    axios
      .get('/api/profile')
      .then((res) => {
        if (res.data) {
          setData({
            education: res.data.education?.length ? res.data.education : defaultResume.education,
            experience: res.data.experience?.length ? res.data.experience : defaultResume.experience,
            skills: res.data.skills?.length ? res.data.skills : defaultResume.skills,
          });
        }
      })
      .catch((err) => {
        console.warn('Using default resume timeline:', err.message);
      });
  }, []);

  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Education Timeline */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {data.education.map((item, idx) => (
            <li className="timeline-item" key={idx}>
              <h4 className="h4 timeline-item-title">{item.institution}</h4>
              <span>{item.period}</span>
              <p className="timeline-text" style={{ fontWeight: '500', color: 'var(--white-2)', marginBottom: '4px' }}>
                {item.degree}
              </p>
              {item.details && <p className="timeline-text">{item.details}</p>}
            </li>
          ))}
        </ol>
      </section>

      {/* Experience Timeline */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="briefcase-outline"></ion-icon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {data.experience.map((item, idx) => (
            <li className="timeline-item" key={idx}>
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span>{item.period}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills Section */}
      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>

        <ul className="skills-list content-card">
          {data.skills.map((skill, idx) => (
            <li className="skills-item" key={idx}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.percentage}>{skill.percentage}%</data>
              </div>

              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
