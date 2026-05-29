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

## Getting Started (Docker)

\`\`\`bash
docker compose up --build
\`\`\`

The database is seeded automatically on first run.

- Client: http://localhost:80
- API: http://localhost:3000

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
