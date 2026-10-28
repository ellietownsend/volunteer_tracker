# Volunteer Tracker Server

This directory contains the backend for the Volunteer Tracker application. It handles API requests from the frontend, communicates with Supabase, creates AI-generated volunteer outreach emails, and manages Google OAuth for Gmail draft creation.

## What the server does

- Serves the Express API for the dashboard
- Generates personalized re-engagement emails using Groq
- Stores and retrieves Google refresh tokens in Supabase
- Connects to Google OAuth and Gmail Draft API
- Exposes endpoints used by the client application
- Serves a production frontend bundle if one is present in the `dist` folder

## Tech stack

- Node.js
- Express
- Supabase
- Groq SDK
- Google APIs
- dotenv for environment configuration

## Project structure

- `server.js` — app setup, middleware, route registration, and server startup
- `groq-api.js` — AI email generation endpoint using Groq
- `google-api.js` — Google authentication flow and Gmail draft generation
- `supabase-client.js` — Supabase client initialization
- `schema.js` — JSON schema used to constrain AI output
- `.env` — local environment secrets
- `.env.serverexample` — template for required environment variables

## Environment variables

Create a `.env` file in this folder using the template in `.env.serverexample`.

```env
AI_KEY=
AI_MODEL=
AI_URL=
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
SUPABASE_URL=
SUPABASE_ANON_KEY=
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

### Variable notes

- `AI_KEY` — API key for Groq
- `AI_MODEL` — model name used for email generation
- `CLIENT_ID` and `CLIENT_SECRET` — Google OAuth credentials
- `GOOGLE_REDIRECT_URI` — callback endpoint used after Google sign-in
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` — credentials for the Supabase project
- `PORT` — backend port; defaults to `3001`
- `CLIENT_ORIGIN` — frontend origin allowed by CORS

## Installation

From this folder:

```bash
npm install
```

## Run locally

```bash
node server.js
```

The server starts on:

```text
http://localhost:3001
```

## API routes

The server mounts all routes under `/api`.

### AI email generation

- `POST /api/generateEmails`
  - Sends volunteer inactivity data to Groq
  - Returns structured AI-generated email drafts
  - Output follows the schema defined in `schema.js`

### Google authentication flow

- `GET /api/auth/google`
  - Starts the Google OAuth login flow
  - Stores a state token to prevent tampering

- `GET /api/auth/google/callback`
  - Handles Google redirect after login
  - Exchanges the authorization code for tokens
  - Saves the refresh token in Supabase

- `GET /api/auth/google/status?uuid=<user-id>`
  - checks whether a Google refresh token exists for a user

### Gmail draft creation

- `POST /api/draftemails`
  - Accepts a user UUID and generated email objects
  - Looks up the user’s Google refresh token
  - Creates a Gmail draft for each email
  - Returns a summary of successful and failed draft operations

## Important behavior

### Google token storage

The backend stores a refresh token in the `tokens` table in Supabase using the user UUID as the identifier. This allows the server to generate Gmail drafts without requiring the user to sign in again each time.

### Response validation

The Groq endpoint uses a strict JSON schema to keep the AI output consistent. This helps ensure each generated email includes:

- recipient email
- subject
- greeting
- body
- closing

### CORS and frontend integration

The server uses CORS with the frontend origin configured as `http://localhost:5173` by default. This allows the client to communicate with the backend during local development.

## Notes

- The app is configured as an ES module (`"type": "module"`)
- The server also serves static files from `dist` when present
- If a frontend production build is available, it can be served directly by Express

## Troubleshooting

### Missing environment variables

If the server fails to start, check that `.env` exists and contains valid values for Supabase, Google, and Groq credentials.

### Google auth flow issues

Make sure:

- the redirect URI matches exactly the one configured in Google Cloud
- `CLIENT_ID` and `CLIENT_SECRET` are valid
- the Supabase `tokens` table exists and has the expected columns

### AI generation errors

Verify that:

- `AI_KEY` is valid
- `AI_MODEL` matches a model available to your Groq account
- the request payload matches the expected structure for the AI prompt

## Development reminders

When editing the server, keep these concerns separated:

- route logic in the API files
- Supabase access in `supabase-client.js`
- AI schema definitions in `schema.js`
- startup and middleware in `server.js`

This keeps the backend easier to maintain as the app grows.
