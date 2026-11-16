import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultResume = {
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      period: '2021 — 2025',
      degree: 'B.Tech in Computer Science and Engineering',
      details: 'Comprehensive study of Data Structures, Algorithms, Database Management Systems (DBMS), Operating Systems, Software Engineering, and Full-Stack Web Technologies. Developed Resume Alchemist as flagship senior capstone application.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2020 — 2021',
      degree: 'Intermediate (12th Grade)',
      details: 'Focused on Physics, Chemistry, and Mathematics (PCM) with distinction, building strong analytical and problem-solving foundations.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2018 — 2019',
      degree: 'High School (10th Grade)',
      details: 'Science & Mathematics curriculum completed with 85% aggregate score.',
    },
  ],
  experience: [
    {
      title: 'Full-Stack MERN Developer',
      period: '2024 — Present',
      description: 'Architecting and developing full-stack web applications with React 19, Node.js, Express, and MongoDB. Engineered Resume Alchemist featuring real-time ATS scoring heuristic, live preview, and multi-template export. Built interactive Kanban Task Manager and modular REST APIs.',
    },
    {
      title: 'Python Developer & Software Engineer',
      period: '2024 — Present',
      description: 'Developing backend services, automation scripts, and algorithmic data processing tools using Python. Focusing on clean code, REST integration, database operations, and system efficiency.',
    },
    {
      title: 'Frontend UI/UX Designer',
      period: '2023 — Present',
      description: 'Designing intuitive, modern, responsive dark-mode web interfaces with smooth CSS animations, component-based architectures, and optimal cross-device performance.',
    },
  ],
  skills: [
    { name: 'MERN Stack (MongoDB, Express, React, Node.js)', percentage: 90 },
    { name: 'React.js & Frontend Architecture', percentage: 88 },
    { name: 'JavaScript (ES6+) & TypeScript', percentage: 85 },
    { name: 'RESTful API Design & Node.js Backend', percentage: 85 },
    { name: 'Python Programming & Scripting', percentage: 78 },
    { name: 'Responsive Web Design & UI/UX (CSS3/Figma)', percentage: 88 },
    { name: 'Git, GitHub & Cloud Deployment', percentage: 82 },
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
