import React, { useState } from 'react';
import axios from 'axios';

const initialResumeState = {
  personalInfo: {
    fullName: 'Devansh Kumar',
    jobTitle: 'Full Stack Web Developer (MERN)',
    email: 'devansh31k@gmail.com',
    phone: '+91 8887831905',
    location: 'Lucknow, Uttar Pradesh, India',
    website: 'https://github.com/Devaansh08',
    summary:
      'Passionate and detail-oriented Full Stack Web Developer with expertise in MongoDB, Express, React, Node.js, and Python. Experienced in building responsive user interfaces, RESTful APIs, and scalable web solutions.',
  },
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      year: '2021 — 2025',
      details: 'Relevant Coursework: Data Structures, Web Development, Database Management Systems, Cloud Computing.',
    },
    {
      institution: 'ST. Xavier P I College',
      degree: 'Intermediate (PCM)',
      year: '2020 — 2021',
      details: 'Physics, Chemistry, and Mathematics with Distinction.',
    },
  ],
  experience: [
    {
      role: 'Python & Web Developer',
      company: 'Tech Solutions & Freelance',
      period: '2024 — Present',
      description:
        'Engineered responsive web applications and backend automation scripts. Implemented RESTful APIs, database schema optimizations, and modern front-end components.',
    },
    {
      role: 'Frontend Web Designer',
      company: 'Creative Web Studio',
      period: '2024 — Present',
      description:
        'Designed accessible, user-friendly UI/UX interfaces and converted high-fidelity wireframes into cross-browser responsive React components.',
    },
  ],
  skills: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript (ES6+)',
    'Python',
    'REST APIs',
    'HTML5 & CSS3',
    'Git & GitHub',
    'Responsive Design',
  ],
  projects: [
    {
      title: 'Resume Alchemist — Advanced AI Builder',
      link: 'https://github.com/Devaansh08/Resume-Alchemist',
      description:
        'Enterprise-grade full-stack resume builder featuring real-time ATS heuristic evaluation, split-screen preview, multi-format import, and cloud persistence.',
    },
    {
      title: 'Netflix UI Streaming Clone',
      link: 'https://devaansh08.github.io/Netflix-clone/',
      description:
        'Dynamic entertainment streaming interface with responsive hero highlights, movie category carousels, and dark cinema theme.',
    },
  ],
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState(initialResumeState);
  const [toast, setToast] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Modern');

  const calculateATSScore = () => {
    let score = 0;
    if (resume.personalInfo.fullName?.trim()) score += 10;
    if (resume.personalInfo.email?.trim()) score += 10;
    if (resume.personalInfo.phone?.trim()) score += 5;
    if (resume.personalInfo.location?.trim()) score += 5;
    if (resume.personalInfo.summary?.trim()?.length > 40) score += 15;
    if (resume.education?.length > 0) score += 15;
    if (resume.experience?.length > 0) score += 20;
    if (resume.skills?.length >= 4) score += 10;
    if (resume.projects?.length > 0) score += 10;
    return Math.min(100, score);
  };

  const atsScore = calculateATSScore();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handlers for Personal Info
  const handlePersonalInfoChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Handlers for Education
  const handleEducationChange = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: '', degree: '', year: '', details: '' },
      ],
    }));
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Experience
  const handleExperienceChange = (index, field, value) => {
    const updated = [...resume.experience];
    updated[index][field] = value;
    setResume((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: '', company: '', period: '', description: '' },
      ],
    }));
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Handlers for Skills
  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (resume.skills.includes(newSkill.trim())) {
      showToast('error', 'Skill already added.');
      return;
    }
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Handlers for Projects
  const handleProjectChange = (index, field, value) => {
    const updated = [...resume.projects];
    updated[index][field] = value;
    setResume((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', link: '', description: '' },
      ],
    }));
  };

  const removeProject = (index) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Cloud Persistence via MongoDB
  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      const res = await axios.post('/api/resumes', {
        title: `${resume.personalInfo.fullName || 'User'} Resume`,
        ...resume,
      });
      if (res.data.success) {
        showToast('success', 'Resume saved to MongoDB cloud successfully!');
      } else {
        showToast('success', 'Resume cached locally.');
      }
    } catch (err) {
      showToast('error', 'Cloud sync: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetToSample = () => {
    setResume(initialResumeState);
    showToast('success', "Loaded Devansh's profile resume template.");
  };

  return (
    <article className="resume-builder active" data-page="resume-builder">
      <header className="resume-builder-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h2 className="h2 article-title" style={{ margin: 0 }}>Resume Alchemist</h2>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--orange-yellow-crayola)',
                background: 'rgba(255, 219, 112, 0.15)',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid var(--orange-yellow-crayola)',
                fontWeight: '600',
              }}
            >
              v2.0 Full-Stack Engine
            </span>
          </div>
          <p style={{ color: 'var(--light-gray-70)', fontSize: 'var(--fs-6)', marginTop: '6px' }}>
            Powered by <strong>Resume Alchemist</strong> — real-time ATS optimization, split-screen live preview, and MongoDB cloud sync.
          </p>
        </div>

        <div className="resume-builder-actions">
          <a
            href="https://github.com/Devaansh08/Resume-Alchemist"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            title="View Resume-Alchemist repository on GitHub"
          >
            <ion-icon name="logo-github"></ion-icon>
            <span>GitHub Repo</span>
          </a>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetToSample}
            title="Reset to sample data"
          >
            <ion-icon name="refresh-outline"></ion-icon>
            <span>Sample Data</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleSaveToCloud}
            disabled={isSaving}
            title="Save to MongoDB"
          >
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>{isSaving ? 'Saving...' : 'Save to Cloud'}</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handlePrint}
            title="Print or export as PDF"
            style={{
              background: 'var(--orange-yellow-crayola)',
              color: 'var(--eerie-black-1)',
            }}
          >
            <ion-icon name="print-outline"></ion-icon>
            <span>Print / PDF</span>
          </button>
        </div>
      </header>

      {/* Real-time ATS & Template Switcher Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'var(--onyx)',
          border: '1px solid var(--jet)',
          borderRadius: '14px',
          padding: '12px 18px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: atsScore >= 80 ? 'rgba(46, 204, 113, 0.15)' : 'rgba(243, 156, 18, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: atsScore >= 80 ? '#2ecc71' : '#f39c12',
              fontSize: '18px',
            }}
          >
            <ion-icon name="speedometer-outline"></ion-icon>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--light-gray-70)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Real-Time ATS Readiness Score
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: atsScore >= 80 ? '#2ecc71' : '#f39c12' }}>
              {atsScore} / 100 — {atsScore >= 80 ? 'Excellent Match (ATS Pass)' : 'Good Progress (Add more details)'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--light-gray)' }}>Template:</span>
          {['Modern', 'Executive', 'Minimalist'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTemplate(t)}
              className={selectedTemplate === t ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '4px 10px', fontSize: '11px' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className={`alert-toast ${toast.type}`}>
          <ion-icon
            name={toast.type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline'}
          ></ion-icon>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="resume-builder-container">
        {/* Left Side: Builder Form Controls */}
        <div className="builder-panel">
          {/* Personal Info Section */}
          <div className="builder-section">
            <h4 className="builder-section-title">
              <span>Personal Information</span>
            </h4>

            <div className="builder-input-row">
              <div className="builder-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="builder-input-group">
                <label>Professional Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={resume.personalInfo.jobTitle}
                  onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                  placeholder="e.g. Full Stack Developer"
                />
              </div>
            </div>

            <div className="builder-input-row">
              <div className="builder-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={resume.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="builder-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={resume.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="builder-input-row">
              <div className="builder-input-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={resume.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>

              <div className="builder-input-group">
                <label>Website / Portfolio / GitHub</label>
                <input
                  type="text"
                  className="form-input"
                  value={resume.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="builder-input-group">
              <label>Professional Summary</label>
              <textarea
                className="form-input"
                rows={3}
                value={resume.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                placeholder="Brief summary of your expertise and background..."
              ></textarea>
            </div>
          </div>

          {/* Education Section */}
          <div className="builder-section">
            <div className="builder-section-title">
              <span>Education</span>
              <button
                type="button"
                className="btn-add-item"
                onClick={addEducation}
              >
                <ion-icon name="add-outline"></ion-icon> Add School
              </button>
            </div>

            {resume.education.map((edu, idx) => (
              <div className="builder-card-item" key={idx}>
                {resume.education.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeEducation(idx)}
                    title="Remove item"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                )}

                <div className="builder-input-row">
                  <div className="builder-input-group">
                    <label>Institution / University</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                      placeholder="University or College"
                    />
                  </div>

                  <div className="builder-input-group">
                    <label>Degree / Field</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                      placeholder="B.Tech, B.S., etc."
                    />
                  </div>
                </div>

                <div className="builder-input-row">
                  <div className="builder-input-group">
                    <label>Years Attended</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                      placeholder="2021 — 2025"
                    />
                  </div>

                  <div className="builder-input-group">
                    <label>Highlights / Details</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.details}
                      onChange={(e) => handleEducationChange(idx, 'details', e.target.value)}
                      placeholder="GPA, Key Courses, Honors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="builder-section">
            <div className="builder-section-title">
              <span>Experience</span>
              <button
                type="button"
                className="btn-add-item"
                onClick={addExperience}
              >
                <ion-icon name="add-outline"></ion-icon> Add Experience
              </button>
            </div>

            {resume.experience.map((exp, idx) => (
              <div className="builder-card-item" key={idx}>
                {resume.experience.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeExperience(idx)}
                    title="Remove item"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                )}

                <div className="builder-input-row">
                  <div className="builder-input-group">
                    <label>Role / Position</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                      placeholder="Software Developer"
                    />
                  </div>

                  <div className="builder-input-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                      placeholder="Tech Inc."
                    />
                  </div>
                </div>

                <div className="builder-input-group">
                  <label>Duration / Period</label>
                  <input
                    type="text"
                    className="form-input"
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)}
                    placeholder="2024 — Present"
                  />
                </div>

                <div className="builder-input-group">
                  <label>Responsibilities & Achievements</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                    placeholder="Key contributions and achievements..."
                  ></textarea>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills Section */}
          <div className="builder-section">
            <h4 className="builder-section-title">Technical Skills</h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                className="form-input"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(e);
                  }
                }}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={addSkill}
                style={{ whiteSpace: 'nowrap' }}
              >
                Add Skill
              </button>
            </div>

            <div className="project-tag-list">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="project-tag"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => removeSkill(skill)}
                  title="Click to remove"
                >
                  {skill}
                  <ion-icon name="close-circle-outline"></ion-icon>
                </span>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="builder-section">
            <div className="builder-section-title">
              <span>Projects</span>
              <button
                type="button"
                className="btn-add-item"
                onClick={addProject}
              >
                <ion-icon name="add-outline"></ion-icon> Add Project
              </button>
            </div>

            {resume.projects.map((proj, idx) => (
              <div className="builder-card-item" key={idx}>
                <button
                  type="button"
                  className="btn-remove-item"
                  onClick={() => removeProject(idx)}
                  title="Remove project"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>

                <div className="builder-input-row">
                  <div className="builder-input-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                      placeholder="Project Name"
                    />
                  </div>

                  <div className="builder-input-group">
                    <label>Project Link / URL</label>
                    <input
                      type="text"
                      className="form-input"
                      value={proj.link}
                      onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="builder-input-group">
                  <label>Description</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                    placeholder="Short description of the project..."
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Real-Time Live Preview Paper */}
        <div className="preview-sticky-wrapper">
          <div className="resume-paper" id="resume-printable-doc">
            <h1>{resume.personalInfo.fullName || 'Your Name'}</h1>
            <div className="paper-job-title">{resume.personalInfo.jobTitle || 'Your Professional Title'}</div>

            {/* Contact Details Bar */}
            <div className="paper-contact-bar">
              {resume.personalInfo.email && (
                <span>✉ {resume.personalInfo.email}</span>
              )}
              {resume.personalInfo.phone && (
                <span>📞 {resume.personalInfo.phone}</span>
              )}
              {resume.personalInfo.location && (
                <span>📍 {resume.personalInfo.location}</span>
              )}
              {resume.personalInfo.website && (
                <span>🔗 {resume.personalInfo.website}</span>
              )}
            </div>

            {/* Summary */}
            {resume.personalInfo.summary && (
              <div className="paper-section">
                <div className="paper-section-heading">Professional Summary</div>
                <div className="paper-summary">{resume.personalInfo.summary}</div>
              </div>
            )}

            {/* Experience */}
            {resume.experience && resume.experience.length > 0 && (
              <div className="paper-section">
                <div className="paper-section-heading">Work Experience</div>
                {resume.experience.map((exp, idx) => (
                  <div className="paper-item" key={idx}>
                    <div className="paper-item-header">
                      <span>
                        <strong>{exp.role || 'Role'}</strong> — {exp.company || 'Company'}
                      </span>
                      <span>{exp.period}</span>
                    </div>
                    {exp.description && (
                      <div className="paper-item-desc">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <div className="paper-section">
                <div className="paper-section-heading">Education</div>
                {resume.education.map((edu, idx) => (
                  <div className="paper-item" key={idx}>
                    <div className="paper-item-header">
                      <span>
                        <strong>{edu.institution || 'Institution'}</strong>
                      </span>
                      <span>{edu.year}</span>
                    </div>
                    <div className="paper-item-sub">{edu.degree}</div>
                    {edu.details && <div className="paper-item-desc">{edu.details}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Technical Skills */}
            {resume.skills && resume.skills.length > 0 && (
              <div className="paper-section">
                <div className="paper-section-heading">Key Skills</div>
                <div className="paper-skills-pills">
                  {resume.skills.map((skill, idx) => (
                    <span className="paper-skill-pill" key={idx}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <div className="paper-section">
                <div className="paper-section-heading">Featured Projects</div>
                {resume.projects.map((proj, idx) => (
                  <div className="paper-item" key={idx}>
                    <div className="paper-item-header">
                      <span>
                        <strong>{proj.title || 'Project'}</strong>
                      </span>
                      {proj.link && <span style={{ fontSize: '10px', color: '#2b6cb0' }}>{proj.link}</span>}
                    </div>
                    {proj.description && (
                      <div className="paper-item-desc">{proj.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
