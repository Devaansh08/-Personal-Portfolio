import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';
import ResumeData from '../models/ResumeData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devansh_portfolio';

const seedProfile = {
  name: 'Devansh Kumar',
  title: 'Web developer',
  avatar: '/devansh-profile.jpg',
  email: 'devansh31k@gmail.com',
  phone: '+91 8887831905',
  birthday: 'August 31, 2003',
  location: 'Lucknow, Uttar Pradesh, India',
  socialLinks: {
    github: 'https://github.com/Devaansh08',
    linkedin: 'https://www.linkedin.com/in/devansh-kumar-8515a8220/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },
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
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      period: '2021 — 2025',
      degree: 'B.Tech in Computer Science and Engineering',
      details: 'Focused on core computer science subjects, data structures, algorithms, and full-stack software development.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2020 — 2021',
      degree: 'Intermediate',
      details: 'Physics, Chemistry, and Mathematics with distinction.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2018 — 2019',
      degree: 'High School',
      details: 'Science stream with 85% marks.',
    },
  ],
  experience: [
    {
      title: 'Python Developer',
      period: '2024 — Present',
      description: 'Working as a fresher Python developer in web development with good knowledge of front-end and back-end architectures.',
    },
    {
      title: 'Web designer',
      period: '2024 — Present',
      description: 'Creating visually stunning, user-centric, and responsive web designs with modern CSS and frontend libraries.',
    },
  ],
  skills: [
    { name: 'Web Development (MERN)', percentage: 85 },
    { name: 'React.js', percentage: 75 },
    { name: 'Graphic design / UI', percentage: 70 },
    { name: 'Python', percentage: 65 },
    { name: 'WordPress', percentage: 50 },
  ],
};

const seedProjects = [
  // 1. Applications (App Development)
  {
    title: 'Resume Alchemist (AI Resume Builder)',
    category: 'applications',
    image: '/projects/resume-builder.jpg',
    description: 'Advanced full-stack AI resume builder featuring real-time ATS heuristic evaluation, split-screen live preview, multi-format export, professional templates, and MongoDB cloud synchronization.',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'ATS Scoring'],
    liveUrl: '/resume-builder',
    githubUrl: 'https://github.com/Devaansh08/Resume-Alchemist',
    featured: true,
    order: 1,
  },
  {
    title: 'DevTask - Kanban Task Manager',
    category: 'applications',
    image: '/projects/task-manager.jpg',
    description: 'Interactive Agile project management suite with Kanban workflow boards (To Do, In Progress, Completed), priority tagging, dynamic task creation, and state persistence.',
    techStack: ['React', 'JavaScript', 'State Management', 'Local Storage', 'CSS Grid'],
    liveUrl: '/task-manager',
    githubUrl: 'https://github.com/Devaansh08/-Personal-Portfolio',
    featured: true,
    order: 2,
  },
  {
    title: 'FitPulse - Workout & Health Tracker',
    category: 'applications',
    image: '/projects/fitpulse.jpg',
    description: 'Mobile-first progressive web app for tracking daily workout routines, active calorie burn metrics, water hydration goals, and exercise streak analytics.',
    techStack: ['React', 'PWA', 'Tailwind CSS', 'Mobile First', 'Analytics'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: false,
    order: 3,
  },

  // 2. Web Development
  {
    title: 'ShopSphere - MERN E-Commerce',
    category: 'web development',
    image: '/projects/shopsphere.jpg',
    description: 'Full-stack modern e-commerce storefront with product search, category filtering, shopping cart drawer, simulated checkout flow, and REST API product inventory.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: true,
    order: 4,
  },
  {
    title: 'Netflix Cinema UI Clone',
    category: 'web development',
    image: '/projects/netflix-cinema.jpg',
    description: 'A responsive Netflix front-end clone featuring cinematic dark UI, movie trailer highlight banners, category browsing carousels, and responsive streaming media styling.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    liveUrl: 'https://devaansh08.github.io/Netflix-clone/',
    githubUrl: 'https://github.com/Devaansh08/Netflix-clone',
    featured: false,
    order: 5,
  },
  {
    title: 'Stone-Paper-Scissors AI Arena',
    category: 'web development',
    image: '/projects/sps-arena.jpg',
    description: 'Interactive browser battle game with custom animations, AI computer move generation, dynamic scoreboard tracking, and instant win/loss round feedback.',
    techStack: ['JavaScript', 'DOM API', 'CSS3 Keyframes'],
    liveUrl: 'https://devaansh08.github.io/Stone-Paper-Scissors/',
    githubUrl: 'https://github.com/Devaansh08/Stone-Paper-Scissors',
    featured: false,
    order: 6,
  },
  {
    title: 'Tic Tac Toe Pro Board',
    category: 'web development',
    image: '/projects/tictactoe.jpg',
    description: 'Classic 2-player Tic Tac Toe web game equipped with win-condition calculations, turn status tracking, round counter, and quick state reset.',
    techStack: ['JavaScript', 'HTML5', 'CSS Grid'],
    liveUrl: 'https://devaansh08.github.io/tic-tac-toe/',
    githubUrl: 'https://github.com/Devaansh08/tic-tac-toe',
    featured: false,
    order: 7,
  },

  // 3. Web Design (Web Designer)
  {
    title: 'Fundo - UI/UX Design System',
    category: 'web design',
    image: '/projects/fundo-design.jpg',
    description: 'Comprehensive UI/UX design system featuring dark glassmorphic cards, accessible color tokens, fluid typography scales, interactive component states, and Figma specs.',
    techStack: ['Figma', 'UI/UX Design', 'Design Tokens', 'CSS3 Variables'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: true,
    order: 8,
  },
  {
    title: 'Zenith Studio - Creative Agency',
    category: 'web design',
    image: '/projects/zenith-agency.jpg',
    description: 'Modern digital agency web design exploration showcasing dark mode glassmorphism, responsive grid layouts, geometric typography, and interactive showcase reels.',
    techStack: ['Figma', 'UI/UX Prototyping', 'CSS Grid', 'Typography'],
    liveUrl: 'https://github.com/Devaansh08',
    githubUrl: 'https://github.com/Devaansh08',
    featured: false,
    order: 9,
  },
];

const seedDefaultResume = {
  title: 'Devansh Kumar - Web Developer Resume',
  personalInfo: {
    fullName: 'Devansh Kumar',
    jobTitle: 'Web Developer / Full Stack Enthusiast',
    email: 'devansh31k@gmail.com',
    phone: '+91 8887831905',
    location: 'Lucknow, Uttar Pradesh, India',
    website: 'https://github.com/Devaansh08',
    summary: 'Enthusiastic and results-driven web developer with solid foundations in the MERN stack (MongoDB, Express, React, Node.js) and Python. Passionate about building intuitive, performant, and accessible user experiences.',
  },
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      year: '2021 — 2025',
      details: 'Computer Science, Data Structures, Web Technologies, Database Systems.',
    },
    {
      institution: 'ST. Xavier P I College',
      degree: 'Intermediate (PCM)',
      year: '2020 — 2021',
      details: 'Physics, Chemistry, and Mathematics.',
    },
  ],
  experience: [
    {
      company: 'Tech Solutions / Freelance',
      role: 'Python Developer',
      period: '2024 — Present',
      description: 'Developing responsive web applications, backend scripts, and frontend user interfaces with clean architecture.',
    },
    {
      company: 'Creative Studio',
      role: 'Web Designer & Developer',
      period: '2024 — Present',
      description: 'Creating high-fidelity UI designs and translating them into responsive, mobile-first web pages.',
    },
  ],
  skills: [
    { name: 'React.js', level: 85 },
    { name: 'Node.js & Express', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'JavaScript (ES6+)', level: 85 },
    { name: 'Python', level: 70 },
    { name: 'HTML5 & CSS3', level: 90 },
  ],
  projects: [
    {
      title: 'MERN Resume Builder',
      link: '/resume-builder',
      description: 'Cloud-synced resume generator with real-time preview and PDF generation.',
    },
    {
      title: 'DevTask Kanban Board',
      link: '/task-manager',
      description: 'Agile project management and task board with priority sorting.',
    },
  ],
};

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting database seeding...');

    // Clear existing
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await ResumeData.deleteMany({});

    // Insert seeds
    await Profile.create(seedProfile);
    console.log('Profile seeded successfully.');

    await Project.insertMany(seedProjects);
    console.log(`${seedProjects.length} Projects seeded successfully across Web dev, Applications, and Web design.`);

    await ResumeData.create(seedDefaultResume);
    console.log('Default Resume seeded successfully.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
