import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HireMeModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    projectType: 'Full-Stack MERN Application',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        message: `[Project Type: ${formData.projectType}] ${formData.message}`,
      };
      const res = await axios.post('/api/contact', payload);
      if (res.data.success) {
        setToast({ type: 'success', text: 'Inquiry received! Devansh will respond within 24 hours.' });
        setTimeout(() => {
          onClose();
        }, 2200);
      }
    } catch (err) {
      setToast({ type: 'error', text: err.response?.data?.message || 'Failed to submit inquiry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenContactPage = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <div className="modal-container active">
      <div className="overlay active" onClick={onClose}></div>

      <div className="project-modal-box hire-me-modal-box">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <div className="hire-modal-header">
          <div className="hire-badge">
            <span className="pulse-dot"></span> Available for Hire
          </div>
          <h3 className="h3 modal-title" style={{ marginTop: '10px', marginBottom: '6px' }}>
            Work With Devansh Kumar
          </h3>
          <p style={{ color: 'var(--light-gray-70)', fontSize: 'var(--fs-6)', lineHeight: '1.6' }}>
            Looking for a dedicated Full-Stack MERN Developer, Frontend Engineer, or Python Specialist? Let's connect.
          </p>
        </div>

        {/* Quick Contact Action Pills */}
        <div className="hire-quick-channels">
          <a
            href="mailto:devansh31k@gmail.com?subject=Project%20Inquiry%20for%20Devansh"
            className="quick-channel-item"
            title="Send Direct Email"
          >
            <div className="channel-icon-circle">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div>
              <div className="channel-label">Email Directly</div>
              <div className="channel-val">devansh31k@gmail.com</div>
            </div>
          </a>

          <a
            href="https://wa.me/918887831905?text=Hi%20Devansh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="quick-channel-item"
            title="Chat on WhatsApp"
          >
            <div className="channel-icon-circle" style={{ background: 'rgba(39, 201, 63, 0.15)', color: '#27c93f' }}>
              <ion-icon name="logo-whatsapp"></ion-icon>
            </div>
            <div>
              <div className="channel-label">WhatsApp / Phone</div>
              <div className="channel-val">+91 8887831905</div>
            </div>
          </a>
        </div>

        {toast && (
          <div className={`alert-toast ${toast.type}`} style={{ margin: '15px 0' }}>
            <ion-icon name={toast.type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline'}></ion-icon>
            <span>{toast.text}</span>
          </div>
        )}

        {/* Quick Inquiry Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '18px' }}>
          <h5 style={{ color: 'var(--white-2)', fontSize: '14px', marginBottom: '12px' }}>
            Send a Quick Inquiry:
          </h5>

          <div className="builder-input-row" style={{ marginBottom: '12px' }}>
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Your Full Name *"
              required
              value={formData.fullname}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Your Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <select
              name="projectType"
              className="form-input"
              style={{ background: 'var(--onyx)', color: 'var(--white-2)', padding: '12px' }}
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="Full-Stack MERN Application">Full-Stack MERN Web Application</option>
              <option value="Frontend Development & React">Frontend Development (React, Vite, UI/UX)</option>
              <option value="REST API & Backend Architecture">RESTful API & Database Architecture (Node, Express, Mongo)</option>
              <option value="Python Scripting & Automation">Python Automation & Web Scripting</option>
              <option value="Full-Time Software Engineer Role">Full-Time Software Engineering Opportunity</option>
              <option value="Freelance / Consultation">Freelance Project / Consulting</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <textarea
              name="message"
              className="form-input"
              rows={3}
              placeholder="Describe your project, timeline, or requirements *"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                flex: '1',
                justifyContent: 'center',
                padding: '12px',
                background: 'var(--orange-yellow-crayola)',
                color: 'var(--eerie-black-1)',
                fontWeight: '600',
              }}
            >
              <ion-icon name="paper-plane"></ion-icon>
              <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenContactPage}
              className="btn-secondary"
              style={{ padding: '12px 18px' }}
            >
              <span>Open Contact Page</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
