# Taskly API

Taskly is a backend API service for a modern task management application.
It provides user authentication and personal task organization capabilities with a focus on clarity, scalability, and mobile-first integration.

---

## Overview

Taskly enables users to create and organize tasks, and track progress across devices.
The backend is designed to be consumed by mobile and web clients.

---

## Features

- User registration & authentication (JWT)
- Create, update, delete, archive tasks
- Task status tracking (Todo → In-Progress → Completed → Dropped)
- Filtering & querying tasks status
- Secure per-user data isolation
- RESTful resource design
- Versioned API (`/api/v1`)

---

## Tech Stack

| Layer     | Choice              |
| --------- | ------------------- |
| Language  | Node.js             |
| Framework | Express.js          |
| Database  | MongoDB             |
| ORM       | Mongoose            |
| Auth      | JWT                 |

---

## Development Roadmap

| Milestone               | Status  |
| ----------------------- | ------- |
| Requirements & Analysis | Done    |
| API Specification       | Done    |
| Backend Implementation  | Done    |
| Deployment              | Done    |
| Web Client              | Done    |
| Android Client          | Future  |

---

## Intended Clients

- **Web Dashboard** (Primary)
- **Android App** (Planned)

---

## License

MIT License

---
