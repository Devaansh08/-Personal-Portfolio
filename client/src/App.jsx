import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroLoader from './components/IntroLoader';
import HireMeModal from './components/HireMeModal';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import ResumeBuilder from './pages/ResumeBuilder';
import TaskManager from './pages/TaskManager';
import Contact from './pages/Contact';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);

  return (
    <>
      {showIntro && <IntroLoader onFinish={() => setShowIntro(false)} />}

      <main>
        <Sidebar onHireMe={() => setIsHireMeOpen(true)} />

        <div className="main-content">
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>

          <Footer />
        </div>
      </main>

      {/* Floating Hire Me Button for quick direct access */}
      <button
        type="button"
        className="floating-hire-btn"
        onClick={() => setIsHireMeOpen(true)}
        title="Hire Devansh Kumar"
        aria-label="Open Hire Me inquiry modal"
      >
        <span className="floating-pulse-dot"></span>
        <ion-icon name="sparkles"></ion-icon>
        <span className="floating-btn-text">Hire Me</span>
      </button>

      {/* Hire Me Modal */}
      <HireMeModal
        isOpen={isHireMeOpen}
        onClose={() => setIsHireMeOpen(false)}
      />
    </>
  );
}
