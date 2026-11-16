import React, { useState, useEffect } from 'react';

export default function IntroLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing MERN stack...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 20, text: 'Loading UI Components & Design Tokens...' },
      { at: 45, text: 'Connecting to MongoDB Cloud Services...' },
      { at: 70, text: 'Mounting Resume Alchemist & Project Catalog...' },
      { at: 90, text: 'Finalizing Smooth Animations...' },
      { at: 100, text: 'Welcome to Devansh Kumar Portfolio' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 300);
          return 100;
        }

        const next = prev + 4;
        const currentStatus = statuses.find((s) => next >= s.at && prev < s.at);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }
        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <div className={`intro-loader-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="intro-loader-content">
        {/* Animated Brand Logo / Monogram */}
        <div className="intro-monogram-box">
          <div className="monogram-glow-ring"></div>
          <div className="monogram-inner">
            <span className="monogram-code">&lt;</span>
            <span className="monogram-initials">DK</span>
            <span className="monogram-code">/&gt;</span>
          </div>
        </div>

        {/* Developer Title */}
        <h1 className="intro-name">Devansh Kumar</h1>
        <p className="intro-title">Full Stack MERN Developer & UI Designer</p>

        {/* Progress Bar */}
        <div className="intro-progress-container">
          <div className="intro-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Status text & percentage */}
        <div className="intro-status-row">
          <span className="intro-status-text">{statusText}</span>
          <span className="intro-percentage">{progress}%</span>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="intro-skip-btn"
          title="Skip intro animation"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
