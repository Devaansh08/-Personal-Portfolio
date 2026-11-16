# Devansh Kumar — Full-Stack MERN Personal Portfolio & Apps Showcase

[![Live Portfolio](https://img.shields.io/badge/Portfolio-Live_MERN_App-FFDB70?style=for-the-badge&logo=react&logoColor=black)](http://localhost:5173)
[![Resume Alchemist](https://img.shields.io/badge/Resume_Alchemist-Live_on_Vercel-27C93F?style=for-the-badge&logo=vercel&logoColor=white)](https://resume-alchemist.vercel.app/)
[![BidVault](https://img.shields.io/badge/BidVault-Live_Auctions-38BDF8?style=for-the-badge&logo=vercel&logoColor=white)](https://bidvault-luxury-auctions.vercel.app)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A production-grade, responsive, full-stack **MERN (MongoDB, Express.js, React, Node.js)** personal portfolio application designed with a dark glassmorphic vCard UI, built-in **Resume Alchemist** AI builder, an interactive **DevTask Kanban Board**, in-browser mini games and developer tools, smooth entrance animations, minimal footer, and a direct **Hire Me** channel with MongoDB contact persistence.

---

## 🌟 Key Highlights & Features

### 1. 🚀 Modern MERN Stack Architecture
- **MongoDB**: Centralized cloud database storing projects catalog, developer profile, contact inquiries, and resume templates.
- **Express.js & Node.js**: High-throughput REST API with prepared queries, server-side validation, CORS, error handling, and SPA routing fallback.
- **React 19 & Vite**: Ultra-fast build times, zero redundant re-renders, and smooth client-side routing via React Router.

### 2. ⚡ Entrance Intro Animation (`<DK/>`)
- Main entrance intro overlay with an animated rotating glow ring around the `<DK/>` developer monogram.
- Dynamic MERN stack initialization status milestones with animated progress bar and live percentage counter.
- Quick "Skip Intro" option and smooth opacity/blur fade-out transition.

### 3. 📄 Built-In Resume Alchemist Integration
- Linked directly to the flagship live web application: **[Resume Alchemist](https://resume-alchemist.vercel.app/)**.
- **Real-Time ATS Score Calculator**: Evaluates contact info, summary length, education, experience, and project keywords on a 100-point scale.
- Split-screen live preview supporting multi-template layouts (Modern, Minimal, Executive).
- One-click cloud save and load with MongoDB (`/api/resumes`).
- Clean `@media print` stylesheet for browser-native A4 PDF export with zero noise.

### 4. 🎮 In-Browser Mini Projects (100% Working Live Links)
Every project card in the portfolio features a direct working in-browser application without dead GitHub links:
- **Stone-Paper-Scissors AI Arena** (`/games/stone-paper-scissors/index.html`): Real-time interactive battle game against randomized AI with animated cards, score counters, and round feedback.
- **Tic-Tac-Toe Pro Board** (`/games/tic-tac-toe/index.html`): 2-player grid duel with glowing marks, win-condition matrix calculations, tie detection, and round history.
- **WebCode Sandbox** (`/games/code-playground/index.html`): Live in-browser HTML/CSS/JavaScript editor with split panes and real-time DOM sandbox rendering.
- **SpeedTyper Benchmark** (`/games/speed-type/index.html`): Real-time typing speed test calculating Words Per Minute (WPM), accuracy %, and mistake highlights.
- **DevCalc Glassmorphism** (`/games/calculator/index.html`): Dark-mode glassmorphic scientific calculator with keyboard typing support and history.
- **ColorCraft Studio** (`/games/color-craft/index.html`): CSS gradient generator and harmonious palette designer with 1-click clipboard copy.

### 5. 💼 "Hire Me" Modal & Direct Inquiry Channels
- **Sidebar & Floating CTAs**: Gold-accented "Hire Me" button inside the sidebar plus a persistent floating action pill for quick access across all devices.
- **Quick Connect Channels**: Direct one-click mailto (`devansh31k@gmail.com`) and pre-filled WhatsApp direct chat (`+91 8887831905`).
- **MongoDB Inquiry Form**: Select project type (Full-Stack MERN, Frontend React, Python Services, etc.) and submit directly to `POST /api/contact` with toast alerts.

### 6. 📱 Minimal Modern Footer & Smooth Scrolling
- Global smooth scrolling enabled (`html { scroll-behavior: smooth; }`).
- Live green pulsing availability badge: *"Available for New Projects & Full-Time Roles"*.
- Smooth easing **Back to Top** button and quick navigation links.

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router, Axios, Ionicons, CSS3 Variables, Glassmorphism |
| **Backend** | Node.js, Express.js, Mongoose ORM, CORS, Dotenv |
| **Database** | MongoDB (Local Service / Atlas Cloud) |
| **Architecture** | RESTful APIs, Single-Page Application (SPA), Mobile-First Responsive Design |
| **Live Deployments**| Vercel (`Resume Alchemist`, `BidVault`), GitHub Pages |

---

## 📁 Repository Structure

```
personal-portfolio/
├── client/                     # React Frontend Application (Vite)
│   ├── public/                 # Static assets, images, and in-browser games
│   │   ├── devansh-profile.jpg # Profile photo with clean backdrop
│   │   ├── games/              # In-browser mini applications
│   │   │   ├── stone-paper-scissors/
│   │   │   ├── tic-tac-toe/
│   │   │   ├── code-playground/
│   │   │   ├── speed-type/
│   │   │   ├── calculator/
│   │   │   └── color-craft/
│   │   └── projects/           # Custom high-res project cover cards
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx     # Profile sidebar with Hire Me CTA
│   │   │   ├── Navbar.jsx      # Top/bottom desktop/mobile navigation bar
│   │   │   ├── Footer.jsx      # Minimal footer with pulse dot & back-to-top
│   │   │   ├── IntroLoader.jsx # Entrance animation with monogram & progress bar
│   │   │   ├── HireMeModal.jsx # Direct inquiry modal (Email, WhatsApp, Contact)
│   │   │   └── ProjectModal.jsx# Detailed project preview modal
│   │   ├── pages/
│   │   │   ├── About.jsx       # Bio, services, and engineering philosophy
│   │   │   ├── Resume.jsx      # Timeline (AIMT, St. Xavier) and skill meters
│   │   │   ├── Portfolio.jsx   # Filterable grid with direct Live Demo pills
│   │   │   ├── ResumeBuilder.jsx# Live interactive ATS Resume Builder
│   │   │   ├── TaskManager.jsx # Agile Kanban task management suite
│   │   │   └── Contact.jsx     # Cloud contact form & Google Maps Lucknow
│   │   ├── App.jsx             # Main router & global components
│   │   ├── index.css           # Preserved dark vCard design system
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js          # Vite configuration with `/api` proxy
│   └── package.json
│
├── server/                     # Express.js REST API Backend
│   ├── models/                 # Mongoose Data Models
│   │   ├── Profile.js          # Bio, services, education, experience, skills
│   │   ├── Project.js          # Portfolio project catalog schema
│   │   ├── Message.js          # Inquiries and contact submissions
│   │   └── ResumeData.js       # Cloud resume storage
│   ├── routes/
│   │   └── api.js              # REST endpoints for all resources
│   ├── seed/
│   │   └── seed.js             # Automated database seeder with real data
│   ├── .env.example
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── package.json                # Root orchestration (concurrently dev scripts)
└── README.md
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI.

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/Devaansh08/-Personal-Portfolio.git
cd -Personal-Portfolio
npm run install:all
```

### 3. Environment Setup
Configure your environment variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/devansh_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Seed the Database
Populate MongoDB with verified profile details, real projects, and resume templates:
```bash
npm run seed
```

### 5. Launch Development Server
Start both backend (Express on `:5000`) and frontend (Vite on `:5173`) concurrently:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check probe |
| `GET` | `/api/profile` | Fetch developer profile, education, experience, and skills |
| `PUT` | `/api/profile` | Update profile information |
| `GET` | `/api/projects` | List projects (supports `?category=mini%20browser%20projects`) |
| `GET` | `/api/projects/:id` | Get single project details |
| `POST` | `/api/projects` | Add a new project |
| `PUT` | `/api/projects/:id` | Update existing project |
| `DELETE` | `/api/projects/:id` | Remove project |
| `POST` | `/api/contact` | Submit contact / hire inquiry (persisted to MongoDB) |
| `GET` | `/api/messages` | View inquiries log |
| `GET` | `/api/resumes` | Fetch saved resumes |
| `POST` | `/api/resumes` | Save a new resume document to MongoDB |
| `PUT` | `/api/resumes/:id` | Update saved resume |

---

## 🚢 Production Build & Deployment

To compile the React frontend for production:
```bash
npm run build
npm start
```
The Express server will automatically serve the production-optimized client build from `client/dist` on port `5000`.

---

## 👨‍💻 Author

**Devansh Kumar**
- **Role**: Full-Stack MERN Developer & UI Designer
- **Education**: B.Tech in Computer Science & Engineering (2021—2025), Ambalika Institute of Management & Technology, Lucknow, UP, India
- **GitHub**: [@Devaansh08](https://github.com/Devaansh08)
- **LinkedIn**: [Devansh Kumar](https://www.linkedin.com/in/devansh-kumar-8515a8220/)
- **Email**: [devansh31k@gmail.com](mailto:devansh31k@gmail.com)
- **Phone / WhatsApp**: [+91 8887831905](https://wa.me/918887831905)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
