import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectModal from '../components/ProjectModal';

const categories = ['All', 'Mini browser projects', 'Applications', 'Web development', 'Web design'];

const fallbackProjects = [
  // 1. Applications
  {
    _id: '1',
    title: 'Resume Alchemist (AI Resume Builder)',
    category: 'applications',
    image: '/projects/resume-builder.jpg',
    description: 'Advanced full-stack AI resume builder featuring real-time ATS heuristic evaluation, split-screen live preview, multi-format export, professional templates, and MongoDB cloud synchronization.',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'ATS Scoring'],
    liveUrl: 'https://resume-alchemist.vercel.app/',
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

  // 2. Web Development
  {
    _id: '3',
    title: 'BidVault - Luxury Auction Platform',
    category: 'web development',
    image: '/projects/bidvault.jpg',
    description: 'Automated luxury auction web platform eliminating geographic barriers, featuring secure payment gateways, live bidding countdowns, and a responsive lightweight interface.',
    techStack: ['React', 'Vercel', 'Tailwind CSS', 'Live Bidding', 'Payment Gateway'],
    liveUrl: 'https://bidvault-luxury-auctions.vercel.app',
    githubUrl: 'https://github.com/Devaansh08/bidvault-luxury-auctions',
    featured: true,
  },

  // 3. Mini Browser Projects (Pure in-browser working interactive apps & games)
  {
    _id: '4',
    title: 'Stone-Paper-Scissors AI Arena',
    category: 'mini browser projects',
    image: '/projects/sps-arena.jpg',
    description: 'Fast-paced interactive browser game against intelligent randomized AI, featuring real-time round feedback, animated move choices, and dynamic score tracking.',
    techStack: ['JavaScript', 'DOM API', 'CSS3 Keyframes', 'In-Browser Game'],
    liveUrl: '/games/stone-paper-scissors/index.html',
    githubUrl: 'https://github.com/Devaansh08/Stone-Paper-Scissor',
    featured: true,
  },
  {
    _id: '5',
    title: 'Tic Tac Toe Pro Board',
    category: 'mini browser projects',
    image: '/projects/tictactoe.jpg',
    description: 'Interactive 2-player grid strategy battle game with win-condition matrix calculations, active turn toggling, winner detection banner, and instant reset.',
    techStack: ['JavaScript', 'HTML5', 'CSS Grid', 'In-Browser Game'],
    liveUrl: '/games/tic-tac-toe/index.html',
    githubUrl: 'https://github.com/Devaansh08/Tic-Tac-Toe-Game',
    featured: true,
  },
  {
    _id: '6',
    title: 'WebCode Sandbox (Mini Live IDE)',
    category: 'mini browser projects',
    image: '/projects/code-playground.jpg',
    description: 'In-browser live HTML, CSS, and JavaScript editor with real-time DOM sandbox rendering, code templates, and instant live preview.',
    techStack: ['JavaScript', 'DOM Sandbox', 'HTML5 iframe', 'Live IDE'],
    liveUrl: '/games/code-playground/index.html',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: true,
  },
  {
    _id: '7',
    title: 'SpeedTyper Benchmark',
    category: 'mini browser projects',
    image: '/projects/speed-type.jpg',
    description: 'Interactive in-browser typing speed test calculating real-time Words Per Minute (WPM), accuracy percentage, mistake highlights, and 60-second countdown timer.',
    techStack: ['JavaScript', 'Timer API', 'WPM Metrics', 'Speed Test'],
    liveUrl: '/games/speed-type/index.html',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: false,
  },
  {
    _id: '8',
    title: 'DevCalc Glassmorphism',
    category: 'mini browser projects',
    image: '/projects/calculator.jpg',
    description: 'Sleek dark-mode glassmorphic web calculator supporting complex mathematical operations, keyboard input support, decimal calculations, and calculation history.',
    techStack: ['JavaScript', 'CSS Glassmorphism', 'Keyboard Support', 'Math Engine'],
    liveUrl: '/games/calculator/index.html',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: false,
  },

  // 4. Web Design
  {
    _id: '9',
    title: 'ColorCraft Studio',
    category: 'web design',
    image: '/projects/color-craft.jpg',
    description: 'Interactive web design tool for generating harmonious color palettes, linear gradients, and copying ready-to-use CSS rules with one click.',
    techStack: ['JavaScript', 'CSS Variables', 'Clipboard API', 'Design Tools'],
    liveUrl: '/games/color-craft/index.html',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: false,
  },
];

export default function Portfolio() {
  const navigate = useNavigate();
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
    const cat = (project.category || '').toLowerCase();
    const sel = selectedCategory.toLowerCase();
    if (cat === sel) return true;
    if (sel === 'mini browser projects' && (cat.includes('browser') || project.liveUrl?.includes('/games/'))) {
      return true;
    }
    return false;
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

                  <div className="project-card-meta">
                    <p className="project-category">{project.category}</p>

                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target={
                          project.liveUrl.startsWith('/') &&
                          !project.liveUrl.startsWith('/games/') &&
                          !project.liveUrl.includes('.html')
                            ? undefined
                            : '_blank'
                        }
                        rel="noopener noreferrer"
                        className="card-live-pill"
                        onClick={(e) => {
                          if (
                            project.liveUrl.startsWith('/') &&
                            !project.liveUrl.startsWith('/games/') &&
                            !project.liveUrl.includes('.html')
                          ) {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(project.liveUrl);
                          } else {
                            e.stopPropagation();
                          }
                        }}
                        title="Launch live project directly in browser"
                      >
                        <span className="live-pulse"></span>
                        <span>Live Demo ↗</span>
                      </a>
                    )}
                  </div>

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
