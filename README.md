# Kunal Vibhute — Portfolio

A full-stack personal portfolio: a Node/Express API backend and a React (Vite + TypeScript + Tailwind + Framer Motion) frontend.

```
portfolio/
├── backend/     Express API — projects, experience, certifications, contact form, resume download, GitHub stats
└── frontend/    React app — terminal intro, hero, about, experience timeline, tech stack, projects + case studies,
                 GitHub dashboard, certifications, contact form
```

## Quick start

Run both servers in separate terminals.

### 1. Backend

```bash
cd backend
cp .env.example .env    # edit as needed (see below)
npm install
npm run dev              # nodemon, auto-restarts on changes
# or: npm start
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies all `/api/*` requests to the backend (configured in `vite.config.ts`), so no CORS setup is needed in development.

## Configuring the backend (`backend/.env`)

| Variable | Purpose | Required |
|---|---|---|
| `PORT` | API port | No (defaults to 5000) |
| `CLIENT_ORIGIN` | Allowed CORS origin | No (defaults to the Vite dev server) |
| `GITHUB_USERNAME` | Username shown in the GitHub dashboard section | Yes, for that section to work |
| `GITHUB_TOKEN` | Personal access token, raises GitHub's rate limit from 60/hr to 5,000/hr | No, but recommended |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `CONTACT_TO_EMAIL` | If set, contact form submissions are emailed via nodemailer in addition to being saved | No |

Without SMTP configured, contact form messages are still safely persisted to `backend/data/messages.json`.

## Adding your resume

Drop your resume PDF at:

```
backend/public/resume/Kunal_Vibhute_Resume.pdf
```

The "Download Resume" buttons hit `GET /api/resume`, which streams that file.

## Editing content

Almost everything is data-driven, no JSX digging required:

- **Projects & case studies** — `backend/data/projects.json`
- **Work experience** — `backend/data/experience.json`
- **Certifications** — `backend/data/certifications.json`
- **Name, bio, socials, tech stack groups, terminal intro lines** — `frontend/src/constants/content.ts`
- **Colors / theme** — `frontend/tailwind.config.js`

## Production build

```bash
cd frontend
npm run build     # outputs to frontend/dist
npm run preview   # serve the production build locally
```

Deploy `frontend/dist` as a static site (Vercel, Netlify, etc.) and the `backend/` folder as a Node service (Render, Railway, Fly.io, a VPS, etc.). Point `CLIENT_ORIGIN` in the backend's `.env` at your deployed frontend URL, and update the frontend's API calls (currently relative `/api/...` paths via the dev proxy) to point at your deployed backend URL, or reverse-proxy `/api` on the same domain.

## Tech stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, React Icons
**Backend:** Node.js, Express, express-rate-limit, nodemailer, dotenv, cors
