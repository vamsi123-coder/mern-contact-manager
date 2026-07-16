# MERN Contacts Website

A simple MERN (MongoDB, Express, React, Node.js) app for managing contacts.

## Features

- Create contacts
- View contact list
- Update / delete contacts

## Project structure

- `backend/` - Express + MongoDB API
- `client/` - React (Vite) frontend

## Prerequisites

- Node.js (LTS)
- MongoDB (local or remote)

## Setup

### 1) Backend

```bash
cd backend
npm install
```

Update your MongoDB connection in `backend/config/db.js` (or set `MONGO_URI`) if needed.

If you use MongoDB Compass, connect to:

```text
mongodb://127.0.0.1:27017/
```

If Compass still shows a connection error, make sure MongoDB is actually running locally. On Windows, start the service or run:

```bash
mongod --dbpath C:\data\db
```

Run the backend:

```bash
npm start
```

> Note: the current server listens on **port 5000**.

### 2) Frontend

```bash
cd client
npm install
```

Run the frontend:

```bash
npm run dev
```

## Usage

1. Start both backend and frontend.
2. Open the frontend URL shown by Vite.
3. Use the UI to add/edit/delete contacts.

## Git

A root `.gitignore` is included to ignore node modules, build artifacts, and environment files.

