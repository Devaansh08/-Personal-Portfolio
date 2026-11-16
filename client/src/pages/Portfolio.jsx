import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectModal from '../components/ProjectModal';

const categories = ['All', 'Web design', 'Applications', 'Web development'];

const fallbackProjects = [
  {
    _id: '1',
    title: 'Resume Builder (MERN Stack)',
    category: 'applications',
    image: '/Screenshot 2025-03-28 120329.png',
    description: 'A dynamic, full-stack Resume Builder built with the MERN stack. Features real-time live preview, modular sections (Education, Experience, Skills), MongoDB persistence, and instant one-click PDF printing.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    liveUrl: '/resume-builder',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: true,
  },
  {
    _id: '2',
    title: 'Netflix Clone',
    category: 'web development',
    image: '/Netflix-Logo.jpg',
    description: 'A responsive Netflix front-end clone featuring cinematic dark UI, movie carousel highlights, category browsing, and immersive media player styling.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://devaansh08.github.io/Netflix-clone/',
    githubUrl: 'https://github.com/Devaansh08/Netflix-clone',
    featured: true,
  },
  {
    _id: '3',
    title: 'Stone-Paper-Scissor',
    category: 'web development',
    image: '/Stone-paper-scissor.png',
    description: 'Interactive browser game with custom animations, AI computer move generation, dynamic scoreboard tracking, and instant win/loss feedback.',
    techStack: ['JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://devaansh08.github.io/Stone-Paper-Scissors/',
    githubUrl: 'https://github.com/Devaansh08/Stone-Paper-Scissors',
  },
  {
    _id: '4',
    title: 'Tic Tac Toe Game',
    category: 'web development',
    image: '/tic tac toe.jpg',
    description: 'Classic 2-player Tic Tac Toe web game equipped with win-condition calculations, turn status tracking, round counter, and quick reset.',
    techStack: ['JavaScript', 'HTML5', 'CSS Grid'],
    liveUrl: 'https://devaansh08.github.io/tic-tac-toe/',
    githubUrl: 'https://github.com/Devaansh08/tic-tac-toe',
  },
  {
    _id: '5',
    title: 'Task Manager Pro',
    category: 'applications',
    image: '/Screenshot 2025-03-28 120434.png',
    description: 'Feature-rich productivity dashboard supporting status boards, priority badges, category filters, and persistent state management.',
    techStack: ['React', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Devaansh08',
  },
  {
    _id: '6',
    title: 'Fundo UI Design',
    category: 'web design',
    image: '/devansh-profile.jpg',
    description: 'Modern UI/UX portfolio concept emphasizing sleek typography, dark mode glassmorphism, responsive navigation, and micro-interactions.',
    techStack: ['Figma', 'UI/UX', 'CSS3'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Devaansh08',
  },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeModalProject, setActiveModalProject] = useState(null);

  useEffect(() => {
    axios
      .get('/api/projects')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch((err) => {
        console.warn('Using fallback projects:', err.message);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        {/* Desktop Filter Tabs */}
        <ul className="filter-list">
          {categories.map((cat) => (
            <li className="filter-item" key={cat}>
              <button
                className={selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                data-filter-btn
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Filter Select Dropdown */}
        <div className="filter-select-box">
          <button
            className={`filter-select ${isSelectOpen ? 'active' : ''}`}
            onClick={() => setIsSelectOpen((prev) => !prev)}
            type="button"
            data-select
          >
            <div className="select-value" data-selecct-value>
              {selectedCategory}
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          {isSelectOpen && (
            <ul className="select-list" style={{ display: 'block' }}>
              {categories.map((cat) => (
                <li className="select-item" key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsSelectOpen(false);
                    }}
                    type="button"
                    data-select-item
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Project Grid */}
        <ul className="project-list">
          {filteredProjects.map((project) => (
            <li
              className="project-item active"
              key={project._id || project.title}
              data-filter-item
              data-category={project.category}
            >
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveModalProject(project)}
              >
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img
                    src={project.image || '/devansh-profile.jpg'}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/devansh-profile.jpg';
                    }}
                  />
                </figure>

                <div className="project-card-content">
                  <h3 className="project-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{project.title}</span>
                    {project.featured && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: 'var(--orange-yellow-crayola)',
                          background: 'rgba(255, 219, 112, 0.15)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--orange-yellow-crayola)',
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                  </h3>

                  <p className="project-category">{project.category}</p>

                  {project.techStack && project.techStack.length > 0 && (
                    <div className="project-tag-list">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="project-tag">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="project-tag">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Project Details Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </article>
  );
}
