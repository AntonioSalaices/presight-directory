# Presight Directory

A full-stack user directory with search, filtering, and infinite scroll.

## Tech Stack

**Client:** React, TypeScript, TanStack Query, TanStack Virtual, Tailwind CSS

**Server:** Node.js, Express, TypeScript, SQLite (better-sqlite3)

**Infrastructure:** Docker, Docker Compose, Nginx

## Project Structure

\`\`\`
presight-directory/
client/ # React app
server/ # Express API
docker-compose.yml
\`\`\`

## Prerequisites

- Node.js 20+
- Yarn
- Docker & Docker Compose (for Docker setup)

## Design Decisions

- **SQLite + better-sqlite3** — synchronous driver chosen for simplicity and performance at this scale
- **Virtual scroll** — renders only visible items for smooth performance with large datasets
- **URL-based state** — all filters and sort are reflected in the URL, enabling shareable and bookmarkable views
- **AND logic for hobbies** — users must have all selected hobbies, not just any
- **OR logic for nationalities** — users from any selected nationality are included
- **Sidebar counts** — top 20 hobbies and nationalities reflect active filters, not the global dataset
- **Rate limiting** — 100 requests per 15 minutes per IP
- **Centralized error handling** — all errors are caught and returned with consistent structure

## Getting Started (Local)

Install dependencies from the root:
\`\`\`bash
yarn install
\`\`\`

Start both client and server (the API seeds the database automatically on first run):
\`\`\`bash
yarn dev
\`\`\`

- Client: http://localhost:5173
- API: http://localhost:3000

### Environment variables (local)

Defaults match local dev out of the box; override only when you need different ports, CORS, rate limits, or API URL.

**Server** — reference: `server/src/.env.example`. Node does not load a `.env` file automatically; export variables in your shell before starting the server, or rely on the built-in fallbacks below.

| Variable               | Default                 | Description                           |
| ---------------------- | ----------------------- | ------------------------------------- |
| `PORT`                 | `3000`                  | API listen port                       |
| `CLIENT_URL`           | `http://localhost:5173` | Allowed CORS origin (Vite dev server) |
| `RATE_LIMIT_WINDOW_MS` | `900000`                | Rate-limit window (15 minutes)        |
| `RATE_LIMIT_MAX`       | `100`                   | Max requests per IP per window        |

**Client** — copy `client/.env.example` to `client/.env`. Vite loads it on `yarn dev` and bakes `VITE_*` values in at build time.

| Variable            | Default | Description                   |
| ------------------- | ------- | ----------------------------- |
| `VITE_API_BASE_URL` | `/api`  | API base path or absolute URL |

Use `/api` for local dev and Docker: Vite (dev) and Nginx (Docker) proxy `/api` to the backend. Use an absolute URL only if the API is on another host (no proxy); rebuild the client image after changing `VITE_*` in Docker.

## Getting Started (Docker)

\`\`\`bash
docker compose up --build
\`\`\`

The database is seeded automatically on first run.

- Client: http://localhost:80
- API: http://localhost:3000

Server env vars are set in `docker-compose.yml` (`CLIENT_URL=http://localhost:80`, rate limits, etc.). The client build uses `VITE_API_BASE_URL=/api` by default (relative path via Nginx proxy).

## API Reference

### GET /api/users

Returns a paginated list of users with filter options.

| Param       | Type     | Description                                                |
| ----------- | -------- | ---------------------------------------------------------- |
| search      | string   | Filter by first or last name                               |
| nationality | string[] | Filter by nationality (OR)                                 |
| hobby       | string[] | Filter by hobby (AND)                                      |
| sortBy      | string   | Field to sort by (first_name, last_name, age, nationality) |
| sortDir     | string   | Sort direction (asc, desc)                                 |
| page        | number   | Page number (default: 1)                                   |
| limit       | number   | Results per page (default: 20)                             |

**Response:**
\`\`\`json
{
"data": [...],
"total": 1000,
"hasMore": true,
"hobbies": [{ "value": "coding", "count": 120 }],
"nationalities": [{ "value": "Mexican", "count": 65 }]
}
\`\`\`

## Features

- Virtual scroll + infinite scroll
- Search by first and last name with debounce
- Filter by nationality (OR logic)
- Filter by hobbies (AND logic)
- Sort by name, age, or nationality
- URL-based state — filters persist on reload
- Responsive layout
- Dark theme based on Presight brand
