# Developed by CV Infotech

We build Web Applications, AI Solutions, Mobile Apps, and Enterprise Software.

# Website:
 https://www.cvinfotech.com/

# Live Demo of Project
https://frontend-resume-taupe.vercel.app/

# ai-resume-builder-node-react

AI-powered Resume Builder built with React, Node.js, Express, and MongoDB. Create professional resumes with AI-assisted content generation, switch between multiple templates with real-time preview, and export resumes as PDF.

A modern AI Resume Builder built with:

- ReactJS
- NodeJS
- ExpressJS
- MongoDB

## Features

✔ Create Resume
✔ Multiple Templates
✔ PDF Export
✔ Authentication
✔ Responsive Design

## Tech Stack

### Frontend

- React
- TypeScript
- Bootstrap

### Backend

- NodeJS
- Express

### Database

- MongoDB

## Installation

```bash
git clone ...
npm install
npm run dev
```

## 📸 Screenshots

![Hero Section](images/img1.png)
![Create Account](images/img2.png)
![Login](images/image7.png)
![Dashboard](images/img3.png)
![Resume Creation](images/img4.png)
![Resume Creation](images/img5.png)
![template](images/img6.png)



# Resume Builder

A full-stack resume builder — build your resume in a live form, preview it instantly, and save it. Includes multiple resume templates, AI-assisted summary writing.

> ⚠️ Some details below (exact env variable names, deploy target, repo URL) are placeholders — fill in the `<...>` spots with your actual values before publishing this file.

## Features

- Multi-section resume form: personal info, professional summary, projects, experience, education, skills
- Live preview that mirrors the form as you type
- 5 resume templates (Classic, Sidebar, Photo-Header, Card, Modern) sharing one data shape
- Automatic A4 pagination — preview splits into multiple pages once content overflows a page
- Custom accent-color swatch picker
- "AI Enhance" button on the Professional Summary field (calls an AI API to improve wording)
- Save/load resumes, with validation (full name + email required) and success/error feedback

## Tech Stack

**Frontend**
- React + TypeScript
- Vite (build tool / dev server)
- Axios (HTTP client)
- React Context (auth/session state)

**Backend**
- `<Node.js/Express or your framework>` — runs as a separate service from the frontend
- `<Database, e.g. MongoDB>`

---

## Installation

### Prerequisites
- Node.js `>= 18`
- npm (or yarn/pnpm)
- `<Database name>` running locally or a connection string to a hosted instance

### Clone the repo

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### Frontend setup

```bash
cd frontend
npm install
```

### Backend setup

```bash
cd backend
npm install
```

---

## Configuration

Both frontend and backend are configured through environment variables loaded from `.env` files. Copy the example files and fill in your own values:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Restart the dev server any time you change a `.env` file — Vite only reads them on startup.

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:5000/api` |
| `VITE_AI_ENHANCE_ENABLED` | Toggles the AI Enhance button on/off | `true` |

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the backend server listens on | `5000` |
| `DATABASE_URL` | Connection string for the database | `<your DB connection string>` |
| `JWT_SECRET` | Secret used to sign auth tokens | `<random-long-string>` |
| `AI_API_KEY` | API key for the AI Enhance feature's provider | `<your AI provider key>` |
| `CORS_ORIGIN` | Allowed origin(s) for the frontend | `http://localhost:5173` |

> Never commit real `.env` files — keep them in `.gitignore` and only commit the `.env.example` versions with placeholder values.

---

## Folder Structure

```
resume-builder/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── templates/          # ClassicTemplate, SidebarTemplate, PhotoHeaderTemplate, CardTemplate, ModernTemplate
│   │   │   ├── form/                # Section forms: PersonalInfo, Experience, Education, Projects, Skills
│   │   │   └── shared/              # ColorSwatchDropdown, ThemeToggle, etc.
│   │   ├── context/                 # AuthContext and other React Context providers
│   │   ├── hooks/
│   │   ├── pages/                   # ResumeBuilder (parent), Dashboard, Login, etc.
│   │   ├── services/                # axios instances / API call wrappers
│   │   ├── types/                   # Shared TypeScript types (ResumeData, etc.)
│   │   ├── utils/                   # Pagination logic, formatters
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/               # auth, error handling
│   │   ├── services/                 # AI Enhance integration, etc.
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
└── README.md
```

> Adjust this to match your actual folder layout — this reflects the typical structure for the features currently built.

---

## API Documentation

Base URL: `VITE_API_BASE_URL` (e.g. `http://localhost:5000/api`)

### Auth

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `POST` | `/auth/register` | Create a new user account | `{ email, password, full_name }` |
| `POST` | `/auth/login` | Log in and receive a session/token | `{ email, password }` |
| `POST` | `/auth/logout` | Log out the current session | — |

### Resumes

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/resumes` | List all resumes for the logged-in user | — |
| `GET` | `/resumes/:id` | Get a single resume by ID | — |
| `POST` | `/resumes` | Create a new resume | `ResumeData` object (personal_info, professional_summary, experience, education, project, skills, template, accent_color) |
| `PUT` | `/resumes/:id` | Update an existing resume | `ResumeData` object |
| `DELETE` | `/resumes/:id` | Delete a resume | — |

### AI Enhance

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `POST` | `/ai/enhance-summary` | Send the current professional summary and get an improved version back | `{ summary: string }` |

**Example response**
```json
{
  "success": true,
  "data": {
    "enhanced_summary": "..."
  }
}
```

> Update this section with your real routes/param names/response shapes once the backend is finalized — these reflect the features described in the project so far, not a confirmed API contract.

---

## Deployment Guide

### Frontend
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist/` folder to a static host — e.g. **Vercel**, **Netlify**, or **GitHub Pages**.
3. Set `VITE_API_BASE_URL` in your host's environment variable settings to point at your deployed backend URL.

### Backend
1. Set all required environment variables (see [Environment Variables](#environment-variables)) on your hosting platform — e.g. **Render**, **Railway**, or a VPS.
2. Build/start:
   ```bash
   cd backend
   npm run build
   npm start
   ```
3. Make sure `CORS_ORIGIN` matches your deployed frontend's URL.
4. Point your database connection string (`DATABASE_URL`) at your production database.

> Fill in your actual hosting providers once decided — placeholders above are common choices for a React + Node stack.

---

## Contribution Guide

1. Fork the repository and clone your fork.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, following the existing code style (TypeScript, functional React components).
4. Test your changes locally (frontend + backend running together).
5. Commit with a clear message:
   ```bash
   git commit -m "Add: short description of the change"
   ```
6. Push your branch and open a Pull Request against `main`, describing what changed and why.
7. Link any related issues in the PR description.

### Guidelines
- Keep components small and reusable — new resume templates should follow the existing shared `ResumeData` shape.
- Don't commit `.env` files or secrets.
- Prefer clear, descriptive names over comments where possible.



