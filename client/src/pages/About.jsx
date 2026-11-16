import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultAbout = {
  aboutParagraphs: [
    "I'm a passionate and detail-oriented web developer embarking on my professional journey, I bring a fresh perspective, a hunger for learning, and a solid foundation in modern web technologies. I enjoy turning complex problems into simple, beautiful and intuitive designs.",
    "My job is to build your website so that it is functional and user-friendly but at the same time attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way."
  ],
  services: [
    {
      title: 'Web design',
      description: 'The most modern and high-quality design made at a professional level.',
      icon: '/icon-design.svg',
    },
    {
      title: 'Web development',
      description: 'High-quality development of sites at the professional level.',
      icon: '/icon-dev.svg',
    },
    {
      title: 'Mobile apps',
      description: 'Professional development of applications for iOS and Android.',
      icon: '/icon-app.svg',
    },
  ],
};

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
        <h3 className="h3 service-title">What i'm doing</h3>

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
    </article>
  );
}
