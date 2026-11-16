import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';
import ResumeData from '../models/ResumeData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devansh_portfolio';

const seedProfile = {
  name: 'Devansh Kumar',
  title: 'Full-Stack MERN Developer & UI Designer',
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
    "I am a passionate Full-Stack MERN Developer and UI/UX Designer based in Lucknow, India, completing my B.Tech in Computer Science and Engineering at Ambalika Institute of Management & Technology (2021—2025). I specialize in engineering high-performance web applications using MongoDB, Express.js, React, Node.js, and Python, combining robust backend architectures with clean, intuitive user interfaces.",
    "My focus centers on architecting production-ready solutions — from interactive productivity tools like Kanban boards to AI-driven applications like Resume Alchemist with real-time ATS heuristic evaluation. I adhere strictly to clean code practices, component-driven design systems, secure RESTful APIs, and cross-device responsiveness, ensuring every product is fast, accessible, and purpose-built for scale."
  ],
  services: [
    {
      title: 'Full-Stack Web Development',
      description: 'Building end-to-end MERN applications with scalable Node.js/Express backends, MongoDB databases, and dynamic React frontends.',
      icon: '/icon-dev.svg',
    },
    {
      title: 'Frontend & UI/UX Engineering',
      description: 'Crafting responsive, pixel-perfect user interfaces with React, modern CSS systems, micro-interactions, and accessible layouts.',
      icon: '/icon-design.svg',
    },
    {
      title: 'RESTful API & Database Architecture',
      description: 'Designing performant REST APIs, data schemas with Mongoose, prepared queries, input validation, and cloud database integrations.',
      icon: '/icon-dev.svg',
    },
    {
      title: 'Python Scripting & Automation',
      description: 'Developing data extraction scripts, algorithmic utilities, and backend automation pipelines engineered for efficiency.',
      icon: '/icon-app.svg',
    },
  ],
  education: [
    {
      institution: 'Ambalika Institute of Management & Technology',
      period: '2021 — 2025',
      degree: 'B.Tech in Computer Science and Engineering',
      details: 'Comprehensive study of Data Structures, Algorithms, Database Management Systems (DBMS), Operating Systems, Software Engineering, and Full-Stack Web Technologies. Developed Resume Alchemist as flagship senior capstone application.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2020 — 2021',
      degree: 'Intermediate (12th Grade)',
      details: 'Focused on Physics, Chemistry, and Mathematics (PCM) with distinction, building strong analytical and problem-solving foundations.',
    },
    {
      institution: 'ST. Xavier P I College',
      period: '2018 — 2019',
      degree: 'High School (10th Grade)',
      details: 'Science & Mathematics curriculum completed with 85% aggregate score.',
    },
  ],
  experience: [
    {
      title: 'Full-Stack MERN Developer',
      period: '2024 — Present',
      description: 'Architecting and developing full-stack web applications with React 19, Node.js, Express, and MongoDB. Engineered Resume Alchemist featuring real-time ATS scoring heuristic, live preview, and multi-template export. Built interactive Kanban Task Manager and modular REST APIs.',
    },
    {
      title: 'Python Developer & Software Engineer',
      period: '2024 — Present',
      description: 'Developing backend services, automation scripts, and algorithmic data processing tools using Python. Focusing on clean code, REST integration, database operations, and system efficiency.',
    },
    {
      title: 'Frontend UI/UX Designer',
      period: '2023 — Present',
      description: 'Designing intuitive, modern, responsive dark-mode web interfaces with smooth CSS animations, component-based architectures, and optimal cross-device performance.',
    },
  ],
  skills: [
    { name: 'MERN Stack (MongoDB, Express, React, Node.js)', percentage: 90 },
    { name: 'React.js & Frontend Architecture', percentage: 88 },
    { name: 'JavaScript (ES6+) & TypeScript', percentage: 85 },
    { name: 'RESTful API Design & Node.js Backend', percentage: 85 },
    { name: 'Python Programming & Scripting', percentage: 78 },
    { name: 'Responsive Web Design & UI/UX (CSS3/Figma)', percentage: 88 },
    { name: 'Git, GitHub & Cloud Deployment', percentage: 82 },
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
    liveUrl: 'https://resume-alchemist.vercel.app/',
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
