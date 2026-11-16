import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectModal({ project, onClose }) {
  const navigate = useNavigate();

  if (!project) return null;

  const isInternalLink = project.liveUrl && project.liveUrl.startsWith('/');

  const handleLiveClick = (e) => {
    if (isInternalLink) {
      e.preventDefault();
      onClose();
      navigate(project.liveUrl);
    }
  };

  return (
    <div className="modal-container active">
      <div className="overlay active" onClick={onClose}></div>

      <div className="project-modal-box">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <h3 className="h3 modal-title" style={{ marginBottom: '15px' }}>
          {project.title}
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <span className="project-tag">{project.category}</span>
          {project.featured && (
            <span
              className="project-tag"
              style={{
                marginLeft: '8px',
                borderColor: 'var(--orange-yellow-crayola)',
                background: 'rgba(255, 219, 112, 0.15)',
              }}
            >
              ★ Featured Project
            </span>
          )}
        </div>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/devansh-profile.jpg';
            }}
          />
        )}

        <div className="modal-desc">
          <p>{project.description}</p>
        </div>

        {project.techStack && project.techStack.length > 0 && (
          <div style={{ margin: '15px 0' }}>
            <h5 className="h5" style={{ color: 'var(--white-2)', marginBottom: '8px' }}>
              Technologies Used:
            </h5>
            <div className="project-tag-list">
              {project.techStack.map((tech, index) => (
                <span key={index} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="project-btn-group" style={{ marginTop: '20px' }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              onClick={handleLiveClick}
              target={isInternalLink ? undefined : '_blank'}
              rel={isInternalLink ? undefined : 'noopener noreferrer'}
              className="btn-primary"
            >
              <ion-icon name="open-outline"></ion-icon>
              <span>{isInternalLink ? 'Launch Live App' : 'View Live Demo'}</span>
            </a>
          )}

          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <ion-icon name="logo-github"></ion-icon>
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
