# Devansh Kumar - MERN Stack Personal Portfolio & Resume Builder

A modern, responsive, full-stack **MERN (MongoDB, Express.js, React, Node.js)** personal portfolio website with a built-in interactive **Resume Builder**, cloud-backed contact form, dynamic project portfolio, and responsive vCard dark glassmorphism design.

---

## 🚀 Key Features

- **Full MERN Architecture**:
  - **MongoDB**: Stores portfolio projects, developer profile, contact inquiries, and resumes.
  - **Express.js & Node.js**: Robust REST API with validation, CORS, error handling, and SPA fallback.
  - **React (Vite) & React Router**: Client-side routing with active tab transitions and zero page reloads.
- **✨ Built-in Interactive Resume Builder**:
  - Real-time two-way responsive resume preview document.
  - Customizable sections: Personal Details, Education, Work Experience, Technical Skills, and Projects.
  - One-click cloud save and load with MongoDB (`/api/resumes`).
  - Native print and clean PDF export styling (`@media print`).
  - "Sample Data" quick-fill button pre-loaded with Devansh's profile.
- **Fixed & Working Routes**:
  - `/about` — About Me, bio, and service capabilities (Web design, Web development, Mobile apps).
  - `/resume` — Interactive education & experience timeline, animated skill proficiency bars.
  - `/portfolio` — Filterable project showcase (All, Web design, Applications, Web development) with modal previews, live links, and GitHub links.
  - `/resume-builder` — The interactive MERN Resume Builder.
  - `/contact` — Functional contact form saving submissions to MongoDB, with live Google Maps embed of Lucknow, UP, India.
- **Exact High-Fidelity UI**:
  - Preserves the vCard aesthetic: dark theme, onyx gradients, vibrant yellow accents (`#FFDB70`), Poppins typography, and smooth transitions.
  - Mobile-first responsive design with collapsible sidebar contacts and dropdown filter tabs.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, React Router 7, Axios, Ionicons, Poppins (Google Fonts)
- **Backend**: Node.js, Express.js, Mongoose, CORS, Dotenv
- **Database**: MongoDB (Local or Atlas)
- **Tooling**: Concurrently (single-command full-stack development)

---

## 📁 Project Structure

```
personal-portfolio/
├── client/                     # React Frontend (Vite)
│   ├── public/                 # Static assets, images, and SVGs
│   │   ├── devansh-profile.jpg
│   │   ├── Netflix-Logo.jpg
│   │   ├── Stone-paper-scissor.png
│   │   ├── tic tac toe.jpg
│   │   ├── icon-design.svg
│   │   ├── icon-dev.svg
│   │   └── icon-app.svg
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Sidebar.jsx     # Profile sidebar with collapsible contacts
│   │   │   ├── Navbar.jsx      # Navigation links with active route states
│   │   │   └── ProjectModal.jsx# Project preview modal dialog
│   │   ├── pages/              # Routed pages
│   │   │   ├── About.jsx       # About me & services
│   │   │   ├── Resume.jsx      # Education, experience & skills
│   │   │   ├── Portfolio.jsx   # Filterable projects grid
│   │   │   ├── ResumeBuilder.jsx# Live interactive MERN Resume Builder
│   │   │   └── Contact.jsx     # Cloud contact form & Google Map
│   │   ├── App.jsx             # Root layout & route configuration
│   │   ├── index.css           # Preserved & enhanced vCard stylesheet
│   │   └── main.jsx            # React root with BrowserRouter
│   ├── index.html
│   ├── vite.config.js          # Vite config with API proxy
│   └── package.json
│
├── server/                     # Express.js REST API
│   ├── models/                 # Mongoose Data Models
│   │   ├── Profile.js          # Profile & skills schema
│   │   ├── Project.js          # Portfolio projects schema
│   │   ├── Message.js          # Contact submissions schema
│   │   └── ResumeData.js       # Cloud resume storage schema
│   ├── routes/
│   │   └── api.js              # REST endpoints for all resources
│   ├── seed/
│   │   └── seed.js             # Initial database seeder
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── .gitignore
├── package.json                # Root orchestration scripts
└── README.md
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

### 2. Installation
From the root directory, install all dependencies for both client and server:
```bash
npm run install:all
```
*(Or install in `client/` and `server/` individually with `npm install`)*

### 3. Environment Configuration
Verify or update `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/devansh_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Seed Database
Populate MongoDB with Devansh's profile, projects (including the Resume Builder), and skills:
```bash
npm run seed
```

### 5. Run the Application in Development Mode
Launch both the backend server (port 5000) and frontend client (port 5173) with a single command:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🚢 Production Deployment

To build the client and serve everything from the Express server:
```bash
npm run build
npm start
```
The application will be served at **[http://localhost:5000](http://localhost:5000)** with client-side SPA routing support.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/profile` | Retrieve developer profile, about text, education, experience, skills |
| `PUT` | `/api/profile` | Update profile information |
| `GET` | `/api/projects` | List projects (optional query: `?category=applications`) |
| `GET` | `/api/projects/:id` | Retrieve single project details |
| `POST` | `/api/projects` | Add a new project |
| `PUT` | `/api/projects/:id` | Update project details |
| `DELETE` | `/api/projects/:id` | Remove a project |
| `POST` | `/api/contact` | Submit contact form message (saved to MongoDB) |
| `GET` | `/api/messages` | View received contact inquiries |
| `GET` | `/api/resumes` | List saved resumes from Resume Builder |
| `GET` | `/api/resumes/:id` | Retrieve single saved resume |
| `POST` | `/api/resumes` | Save a new resume to MongoDB cloud |
| `PUT` | `/api/resumes/:id` | Update an existing resume |

---

## 💻 Included Projects

1. **Resume Builder (MERN Stack)**: Interactive resume generator with real-time preview, multi-section form, MongoDB persistence, and PDF export.
2. **Netflix Clone**: Cinematic media streaming user interface clone.
3. **Stone-Paper-Scissor**: Responsive web game with animations, AI moves, and dynamic scorekeeping.
4. **Tic Tac Toe**: Algorithmic two-player web game with win-condition detection and reset state.
5. **Task Manager Pro**: Full-stack productivity dashboard with category filtering and priority management.
6. **Fundo UI Design**: Modern UI/UX design exploration featuring glassmorphism and micro-interactions.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
