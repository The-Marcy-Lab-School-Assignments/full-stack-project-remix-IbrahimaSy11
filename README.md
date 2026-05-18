# MedDash — Full-Stack Medical Dashboard

A full-stack medical dashboard built with React, Express, and Postgres. Users can track their medications, log daily health notes, and view upcoming appointments — all behind a secure, session-based authentication system.

## Screenshots

### Login Page
![Login Page](./docs/Screenshot%202026-05-18%20at%207.13.49%20PM.png)

### Register Page
![Register Page](./docs/Screenshot%202026-05-18%20at%207.14.13%20PM.png)

### Dashboard
![Dashboard](./docs/Screenshot%202026-05-18%20at%207.14.33%20PM.png)

## User Stories

**Auth**
- A user can register for an account with a username and password
- A user can log in to an existing account
- A user can log out
- A returning user who has an active session is automatically logged in when they revisit the app

**Medications**
- A logged-in user can see all of their medications
- A logged-in user can add a new medication with a name, dosage, and frequency
- A logged-in user can mark a medication as taken or not taken for the day
- A logged-in user can delete a medication

## Schema

```
users
─────────────────────────────
user_id       SERIAL PRIMARY KEY
username      TEXT UNIQUE NOT NULL
password_hash TEXT NOT NULL

medications
─────────────────────────────
medication_id  SERIAL PRIMARY KEY
name           TEXT NOT NULL
dosage         TEXT NOT NULL
frequency      TEXT NOT NULL
is_taken       BOOLEAN DEFAULT FALSE
user_id        INTEGER REFERENCES users(user_id) ON DELETE CASCADE
```

A user has many medications. Deleting a user cascades to delete all of their medications.

## API Contract

### Auth endpoints

| Method | Endpoint             | Request Body             | Response                          |
| ------ | -------------------- | ------------------------ | --------------------------------- |
| POST   | `/api/auth/register` | `{ username, password }` | `{ user_id, username }`           |
| POST   | `/api/auth/login`    | `{ username, password }` | `{ user_id, username }`           |
| DELETE | `/api/auth/logout`   | —                        | `{ message }`                     |
| GET    | `/api/auth/me`       | —                        | `{ user_id, username }` or `null` |

### Medication endpoints (all require authentication)

| Method | Endpoint               | Request Body                  | Response                                                          |
| ------ | ---------------------- | ----------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/medications`     | —                             | `[{ medication_id, name, dosage, frequency, is_taken, user_id }]` |
| POST   | `/api/medications`     | `{ name, dosage, frequency }` | `{ medication_id, name, dosage, frequency, is_taken, user_id }`   |
| PATCH  | `/api/medications/:id` | `{ is_taken }`                | `{ medication_id, name, dosage, frequency, is_taken, user_id }`   |
| DELETE | `/api/medications/:id` | —                             | `{ medication_id, name, dosage, frequency, is_taken, user_id }`   |

## Setup

### 1. Database

Create a local Postgres database:

```sh
createdb meddash
```

### 2. Server

```sh
cd server
npm install
cp .env.template .env
```

Open `.env` and fill in your Postgres credentials and a session secret. Then seed the database:

```sh
npm run db:seed
```

Start the server:

```sh
npm run dev
```

The server runs on `http://localhost:8080`.

### 3. Frontend

In a second terminal:

```sh
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`. The Vite dev proxy forwards all `/api` requests to the Express server so session cookies work correctly.

## Seed Users

After running `npm run db:seed`, these accounts are available:

| Username | Password    |
| -------- | ----------- |
| ibrahim  | password123 |
| testuser | password123 |

## Application Structure

```
full-stack-project-remix-IbrahimaSy11/
├── docs/                            # Screenshots
├── frontend/                        # React app (Vite)
│   ├── src/
│   │   ├── App.jsx                  # Root component: currentUser state, session rehydration, auth handlers
│   │   ├── adapters/
│   │   │   ├── auth-adapters.js     # Fetch adapters for /api/auth/* endpoints
│   │   │   └── medication-adapters.js  # Fetch adapters for /api/medications/* endpoints
│   │   └── components/
│   │       ├── AuthPage.jsx         # Login + Register forms (shown when logged out)
│   │       ├── Dashboard.jsx        # Main app container (shown when logged in)
│   │       ├── MedicationList.jsx   # Renders a list of MedicationItems
│   │       ├── MedicationItem.jsx   # Single medication: toggle taken, name, dosage, delete button
│   │       └── AddMedicationForm.jsx # Form to add a new medication
│   └── vite.config.js               # Proxies /api requests to Express in development
└── server/                          # Express + Postgres API
    ├── index.js                     # App entry point, route definitions
    ├── controllers/
    │   ├── authControllers.js       # register, login, logout, getMe
    │   └── medicationControllers.js # list, create, update, delete medications
    ├── models/
    │   ├── userModel.js             # SQL queries for the users table
    │   └── medicationModel.js       # SQL queries for the medications table
    ├── middleware/
    │   ├── checkAuthentication.js   # Blocks unauthenticated requests
    │   └── logRoutes.js             # Logs each incoming request
    └── db/
        ├── pool.js                  # Postgres connection pool
        └── seed.js                  # Creates tables and inserts sample data
```

## Roadmap

Stretch features to build after MVP is complete:

- **Appointments** — users can add upcoming doctor appointments with a date, doctor name, and reason
- **Vitals tracker** — users can log daily health readings (heart rate, blood pressure, weight)
- **AI chatbot** — a health assistant that answers questions based on the user's own dashboard data
- **React Router** — separate pages for medications, appointments, and vitals
- **Edit medication** — a PATCH form to update an existing medication's name, dosage, or frequency