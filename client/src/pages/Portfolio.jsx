import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectModal from '../components/ProjectModal';

const categories = ['All', 'Web design', 'Applications', 'Web development'];

const fallbackProjects = [
  // 1. Applications
  {
    _id: '1',
    title: 'Resume Alchemist (AI Resume Builder)',
    category: 'applications',
    image: '/projects/resume-builder.jpg',
    description: 'Advanced full-stack AI resume builder featuring real-time ATS heuristic evaluation, split-screen live preview, multi-format export, professional templates, and MongoDB cloud synchronization.',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'ATS Scoring'],
    liveUrl: '/resume-builder',
    githubUrl: 'https://github.com/Devaansh08/Resume-Alchemist',
    featured: true,
  },
  {
    _id: '2',
    title: 'DevTask - Kanban Task Manager',
    category: 'applications',
    image: '/projects/task-manager.jpg',
    description: 'Interactive Agile project management suite with Kanban workflow boards (To Do, In Progress, Completed), priority tagging, dynamic task creation, and state persistence.',
    techStack: ['React', 'JavaScript', 'State Management', 'Local Storage', 'CSS Grid'],
    liveUrl: '/task-manager',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: true,
  },
  {
    _id: '3',
    title: 'FitPulse - Workout & Health Tracker',
    category: 'applications',
    image: '/projects/fitpulse.jpg',
    description: 'Mobile-first progressive web app for tracking daily workout routines, active calorie burn metrics, water hydration goals, and exercise streak analytics.',
    techStack: ['React', 'PWA', 'Tailwind CSS', 'Mobile First', 'Analytics'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: false,
  },

  // 2. Web Development
  {
    _id: '4',
    title: 'ShopSphere - MERN E-Commerce',
    category: 'web development',
    image: '/projects/shopsphere.jpg',
    description: 'Full-stack modern e-commerce storefront with product search, category filtering, shopping cart drawer, simulated checkout flow, and REST API product inventory.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: true,
  },
  {
    _id: '5',
    title: 'Netflix Cinema UI Clone',
    category: 'web development',
    image: '/projects/netflix-cinema.jpg',
    description: 'A responsive Netflix front-end clone featuring cinematic dark UI, movie trailer highlight banners, category browsing carousels, and responsive streaming media styling.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    liveUrl: 'https://devaansh08.github.io/Netflix-clone/',
    githubUrl: 'https://github.com/Devaansh08/Netflix-clone',
    featured: false,
  },
  {
    _id: '6',
    title: 'Stone-Paper-Scissors AI Arena',
    category: 'web development',
    image: '/projects/sps-arena.jpg',
    description: 'Interactive browser battle game with custom animations, AI computer move generation, dynamic scoreboard tracking, and instant win/loss round feedback.',
    techStack: ['JavaScript', 'DOM API', 'CSS3 Keyframes'],
    liveUrl: 'https://devaansh08.github.io/Stone-Paper-Scissors/',
    githubUrl: 'https://github.com/Devaansh08/Stone-Paper-Scissors',
    featured: false,
  },
  {
    _id: '7',
    title: 'Tic Tac Toe Pro Board',
    category: 'web development',
    image: '/projects/tictactoe.jpg',
    description: 'Classic 2-player Tic Tac Toe web game equipped with win-condition calculations, turn status tracking, round counter, and quick state reset.',
    techStack: ['JavaScript', 'HTML5', 'CSS Grid'],
    liveUrl: 'https://devaansh08.github.io/tic-tac-toe/',
    githubUrl: 'https://github.com/Devaansh08/tic-tac-toe',
    featured: false,
  },

  // 3. Web Design
  {
    _id: '8',
    title: 'Fundo - UI/UX Design System',
    category: 'web design',
    image: '/projects/fundo-design.jpg',
    description: 'Comprehensive UI/UX design system featuring dark glassmorphic cards, accessible color tokens, fluid typography scales, interactive component states, and Figma specs.',
    techStack: ['Figma', 'UI/UX Design', 'Design Tokens', 'CSS3 Variables'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: true,
  },
  {
    _id: '9',
    title: 'Zenith Studio - Creative Agency',
    category: 'web design',
    image: '/projects/zenith-agency.jpg',
    description: 'Modern digital agency web design exploration showcasing dark mode glassmorphism, responsive grid layouts, geometric typography, and interactive showcase reels.',
    techStack: ['Figma', 'UI/UX Prototyping', 'CSS Grid', 'Typography'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: false,
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
