# MERN Contact Manager

A full-stack contact management app built with MongoDB, Express, React, and Node.js. Each user registers and logs in with a JWT-secured account, and can only see, create, update, and delete their own contacts.

🔗 **Live demo:** [mern-contact-manager-lemon.vercel.app](https://mern-contact-manager-lemon.vercel.app)

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication, with protected routes on both client and server
- Contacts are scoped per user — every create/read/update/delete is filtered by the logged-in user's ID
- Full contact CRUD: add, view, edit, and delete contacts
- Persistent sessions via a token stored in `localStorage`
- Responsive React UI with a dashboard, contact form, and contact list

## Tech stack

**Frontend:** React 19, React Router, Axios, Vite
**Backend:** Node.js, Express 5, Mongoose
**Auth:** JSON Web Tokens (`jsonwebtoken`), password hashing (`bcryptjs`)
**Database:** MongoDB (local or Atlas)

## Project structure

```
backend/
├── config/
│   └── db.js               # MongoDB connection
├── middleware/
│   └── auth.js             # JWT verification middleware
├── models/
│   ├── User.js             # User schema (hashed password, comparePassword)
│   └── Contact.js          # Contact schema (scoped to a userId)
├── routes/
│   ├── authRoutes.js       # /api/auth/register, /api/auth/login
│   └── contactRoutes.js    # /api/contacts (protected CRUD)
└── server.js               # Express app entry point

client/
└── src/
    ├── api.js                 # Axios instance for /api/contacts (attaches JWT)
    ├── api/authApi.js         # Axios instance for /api/auth
    ├── App.jsx                # Routes + dashboard
    ├── ContactForm.jsx
    ├── ContactList.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   └── PrivateRoute.jsx   # Redirects to /login if no token
    └── pages/
        ├── Login.jsx
        └── Register.jsx
```

## Prerequisites

- Node.js (LTS)
- MongoDB (local instance or a MongoDB Atlas connection string)

## Setup

### 1) Backend

```bash
cd backend
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

`.env` variables:

| Variable      | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `MONGO_URI`   | MongoDB connection string (defaults to `mongodb://127.0.0.1:27017/contact-manager` if omitted) |
| `JWT_SECRET`  | Long random string used to sign JWTs                               |
| `PORT`        | Port for the API server (defaults to `5000`)                       |
| `CORS_ORIGIN` | Frontend origin allowed to call the API (e.g. your Vercel URL)     |

If you're running MongoDB locally and don't have it started yet:

```bash
mongod --dbpath C:\data\db   # Windows example
```

Start the backend:

```bash
npm start
```

The API runs on `http://localhost:5000` by default.

### 2) Frontend

```bash
cd client
npm install
```

Optionally set the API URL (defaults to `http://localhost:5000` if not set) by creating `client/.env`:

```
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

## Usage

1. Start the backend and frontend.
2. Open the frontend URL shown by Vite.
3. Register a new account, then log in.
4. Add, edit, and delete contacts — you'll only ever see contacts tied to your account.

## API endpoints

| Method | Endpoint              | Auth required | Description                           |
| ------ | --------------------- | :-----------: | ------------------------------------- |
| POST   | `/api/auth/register`  |      No       | Create a new user account             |
| POST   | `/api/auth/login`     |      No       | Log in and receive a JWT              |
| GET    | `/api/contacts`       |      Yes      | List the current user's contacts      |
| POST   | `/api/contacts`       |      Yes      | Create a contact for the current user |
| PUT    | `/api/contacts/:id`   |      Yes      | Update a contact you own              |
| DELETE | `/api/contacts/:id`   |      Yes      | Delete a contact you own              |

Protected endpoints require an `Authorization: Bearer <token>` header, using the token returned from register/login.

## Deployment notes

- The frontend (`client/`) is set up for Vercel (`vercel.json` includes SPA rewrites) and is live at the link above.
- The backend can be deployed to any Node host (e.g. Render, Railway) — set `MONGO_URI`, `JWT_SECRET`, and `CORS_ORIGIN` as environment variables there.
