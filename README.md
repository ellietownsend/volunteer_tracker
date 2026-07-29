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

## Features

### Authentication

- Passwordless email sign-in
- Secure authentication using Supabase Auth
- Protected dashboard routes

---

### Volunteer Management

- View all volunteers
- Add new volunteers
- Edit volunteer information
- Remove volunteers
- Search volunteers by:
  - First Name
  - Last Name
  - Role
  - Subject

---

### Volunteer Dashboard

Central dashboard displaying volunteer information with:

- Search & filtering
- Volunteer cards
- Subject badges
- Role management
- Quick editing

---

### Student Feedback

Upload completed student feedback CSV files.

Features include:

- CSV validation
- Duplicate upload prevention
- Future reporting support

---

### AI-Powered Volunteer Outreach

Using the Groq API, the application automatically drafts personalized volunteer emails.

The AI uses information such as:

- Volunteer hours
- Volunteer role
- Student feedback
- Participation history
- Milestone achievements

to send:

- Thank-you emails
- Volunteer milestone recognition
- Re-engagement emails for inactive volunteers

The goal is to reduce administrative work while creating personalized communication at scale.

---

### Inactive Volunteer Detection

Automatically identifies volunteers who have not participated within the past 30 days.

Staff can generate personalized outreach drafts encouraging volunteers to return.

---

## Tech Stack

### Frontend

- React 19
- React Router
- Vite
- CSS Modules
- Chart.js

### Backend

- Express.js
- Node.js

### Database & Authentication

- Supabase
- Supabase Authentication

### AI

- Groq API

### Testing

- Vitest
- React Testing Library

---

## Project Structure

```
src
│
├── assets
├── components
│   ├── ImageUploader
│   ├── ShoutoutForm
│   ├── ShowInactiveVolunteers
│   ├── SignInForm
│   ├── StudentFeedbackForm
│   ├── VolunteerHoursChart
│   └── VolunteerList
│
├── context
├── routes
├── services
├── styles
└── utils
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

AI_KEY=
AI_MODEL=
AI_URL=
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/volunteer-management.git
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Start the Express server

```bash
node server.js
```

---

## Running Tests

```bash
npm test
```

The project uses:

- Vitest
- React Testing Library

to verify:

- Volunteer creation
- Volunteer editing
- Volunteer removal
- Form validation
- Service integration

---

## Future Enhancements

- Volunteer attendance tracking
- Volunteer scheduling
- Analytics dashboard
- Student progress reports
- Automated reminder emails
- Role-based permissions
- Email history
- Volunteer hour approval workflow
- CSV export
- Mobile responsive improvements

---

## Lessons Learned

This project strengthened my experience with:

- React application architecture
- State management
- REST APIs
- Express.js
- Supabase
- Authentication
- AI integration
- Automated testing
- Component-driven development
- Full-stack application design
- Building software for a real client
