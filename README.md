# Volunteer Management System

A modern full-stack volunteer management platform built for **Girls Who Math** to help manage volunteers, monitor participation, and automate communication as the organization continues to grow.

Designed and developed as a solo software engineering project, the application centralizes volunteer management into a single dashboard while leveraging AI to generate personalized volunteer outreach.

---

## Overview

As Girls Who Math expanded, managing volunteers through spreadsheets and manual communication became increasingly difficult.

This application provides staff with a centralized platform to:

- Manage volunteer information
- Track volunteer participation
- Identify inactive volunteers
- Upload student feedback
- Generate personalized volunteer outreach using AI
- Improve volunteer engagement through milestone recognition

---
Key features
- Passwordless sign-in with Supabase Auth
- Volunteer directory with add / edit / remove
- Track volunteer hours and identify inactive volunteers
- Upload and parse student feedback CSVs
- Draft personalized outreach emails using an AI service and send as Gmail drafts

Quickstart — Run locally

Prerequisites
- Node.js (v18+ recommended)
- npm
- A Supabase project and credentials

1) Install

```bash
cd client
npm install
cd ../server
npm install
```

2) Add environment variables
- Create `server/.env` from `.env.serverexample` and set your server secrets:

```env
AI_KEY=
AI_MODEL=
AI_URL=
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

- Create `client/.env` (or `client/.env.local`) with your Supabase publishable keys:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

3) Run the app

Start the backend from the `server` folder:

```bash
node server.js
```

Start the frontend from the `client` folder:

```bash
npm run dev
```

Open `http://localhost:5173` to view the app.

Basic usage
- Sign in using the Sign In page (magic link via Supabase).
- From the dashboard you can view volunteers, add or edit records, and track hours.
- To draft re-engagement emails: visit the Inactive Volunteers page, generate emails, and connect your Google account. The app stores a Google refresh token on the server so it can create Gmail drafts for you.

Developer notes
- The frontend runs on Vite (port 5173) and proxies `/api` requests to the Express backend (port 3001).
- Server routes live in the `server/` folder. Key files:
  - `server/google-api.js` — Google OAuth flow and token storage
  - `server/groq-api.js` — AI email generation endpoint
  - `server/supabase-client.js` — server-side Supabase client



