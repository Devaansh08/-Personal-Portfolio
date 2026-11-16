import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid =
    formData.fullname.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim()) &&
    formData.message.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        showToast('success', res.data.message || 'Message sent successfully!');
        setFormData({ fullname: '', email: '', message: '' });
      } else {
        showToast('error', res.data.message || 'Something went wrong.');
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || 'Failed to send message. Please try again.';
      showToast('error', errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      {/* Map Section */}
      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113874.96393168694!2d80.87412064203177!3d26.8466934958829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sbd!4v1718531529445!5m2!1sen!2sbd"
            width="400"
            height="300"
            loading="lazy"
            title="Devansh Location Map"
          ></iframe>
        </figure>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        {toast && (
          <div className={`alert-toast ${toast.type}`}>
            <ion-icon
              name={toast.type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline'}
            ></ion-icon>
            <span>{toast.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleChange}
              data-form-input
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            data-form-input
          ></textarea>

          <button
            className="form-btn"
            type="submit"
            disabled={!isValid || isSubmitting}
            data-form-btn
          >
            <ion-icon name="paper-plane"></ion-icon>
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </section>
    </article>
  );
}
