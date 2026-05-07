# MindCareAI

A digital mental health and psychological support platform designed for students in higher education. Students can chat with an AI counselor, book sessions with professionals, and access mental wellness resources — all in one place.

## Features

- **AI Chat** — Powered by Groq (Llama 3.3-70b), providing empathetic mental health support
- **Appointment Booking** — Students book sessions with approved counselors
- **Role-Based Access** — Student / Counselor / Admin dashboards with full route protection
- **Admin Panel** — Manage users, approve counselor applications, view platform statistics
- **Self-Assessment** — Quick mental health check-in tool
- **Community & Resources** — Articles, guides, and peer support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Radix UI, React Router v7 |
| Backend | Node.js, Express.js 5, MongoDB (Mongoose) |
| Auth | JWT (30-day tokens), bcrypt (12 rounds) |
| AI | Groq API — Llama-3.3-70b-versatile |
| Security | Helmet, express-rate-limit, Joi validation |

## Project Structure

```
MindCareAI/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, error handling, validation
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── seeds/           # Admin seeding script
│   ├── utils/           # Logger, token generation
│   ├── validation/      # Joi schemas
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # AuthContext
│   │   ├── lib/         # Axios instance
│   │   └── pages/       # Route-level components
│   └── .env.example
├── docker-compose.yml
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Groq API key — free at [console.groq.com](https://console.groq.com)

### 1. Clone and install

```bash
git clone <repo-url>
cd MindCareAI
npm run install:all
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env — set MONGO_URI, JWT_SECRET, GROQ_API_KEY
```

Generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Seed an admin account

```bash
ADMIN_NAME="Your Name" ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="securepassword" npm run seed:admin
```

### 4. Run in development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:8008
- Health:   http://localhost:8008/health

## API Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register student or counselor |
| POST | `/api/auth/login` | Public | Log in |
| GET | `/api/auth/me` | Auth | Get current user |
| GET | `/api/auth/counselors` | Public | List approved counselors |
| POST | `/api/appointment/book` | Student | Book a session |
| GET | `/api/appointment/my` | Student | View own appointments |
| GET | `/api/appointment/counselor` | Counselor | View assigned appointments |
| PATCH | `/api/appointment/:id/status` | Counselor | Update appointment status |
| GET | `/api/admin/stats` | Admin | Platform statistics |
| GET | `/api/admin/users` | Admin | All users |
| GET | `/api/admin/pending-counselors` | Admin | Pending applications |
| PATCH | `/api/admin/approve-counselor/:id` | Admin | Approve counselor |
| DELETE | `/api/admin/reject-counselor/:id` | Admin | Reject counselor |
| POST | `/api/chatbot/message` | Auth | Send message to AI |

## Security

- All sensitive routes protected with JWT middleware
- Rate limiting: 20 req/15 min on auth endpoints, 200 req/15 min globally
- Helmet.js sets secure HTTP headers
- Joi validates all request bodies
- Passwords hashed with bcrypt (12 rounds)
- Admin accounts can only be created via the seed script (not through the UI)

## License

ISC
