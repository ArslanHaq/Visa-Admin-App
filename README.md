# Online Visa Application: Admin App

The staff-facing side of an online visa application system. Admins set up visa types, workflows and business rules. Verifiers and decision makers review applications and documents. The applicant side is in [Visa-Web-App](https://github.com/ArslanHaq/Visa-Web-App).

## Features

- **Visual workflow builder:** design review workflows with React Flow, using custom, resizable nodes
- **Libraries:** manage countries, occupations, visa types and sub-types, and durations
- **Business rules:** create, view and review the rules applied to applications
- **Role-based review:** separate inboxes and review screens for verifiers and decision makers, with approve, reject, refer and defer actions
- **Application review:** personal, contact, financial and travel details, travel history, and documents with PDF preview
- **Users and stakeholders:** add and edit users and stakeholders
- **Access control:** NextAuth sign-in, route protection and a forbidden page for unauthorised roles
- **Logging** with winston

## Tech stack

Next.js 14 (App Router) · React · TypeScript · Tailwind CSS · NextAuth · React Flow (`@xyflow/react`) · Axios · react-pdf · winston

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the visa backend API |
| `NEXT_PUBLIC_BACKEND_PROCESS_URL` | Base URL of the workflow and process service |
| `NEXTAUTH_SECRET` | NextAuth secret. Generate one with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Public URL of the app (needed in production) |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` / `npm start` | Production build, served on port 3001 |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/            Routes: sign-in, inbox, application reviews, workflow, libraries, business rules, users, documents
  components/     UI organised as atoms, molecules and organisms
  utils/          Logger and helpers
  middleware.ts   Route protection
```
