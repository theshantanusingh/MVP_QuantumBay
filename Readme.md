# QuantumBay MVP

**QuantumBay** is a full-stack chat platform MVP featuring JWT-based authentication, secure user profiles, and a foundation for real-time messaging. This project is designed for learning full-stack, DevOps, and distributed systems concepts.

---

## Features

- **User Authentication (Auth Service)**
  - Signup and login using JWT access and refresh tokens.
  - Refresh tokens stored as `httpOnly` cookies.
  - Short-lived access tokens and long-lived refresh tokens.

- **User Profile (Profile Service)**
  - Protected routes requiring a valid access token.
  - Fetch and update profile: name, email, location, contact number, and country.

- **Security & Middleware**
  - Helmet to secure HTTP headers.
  - Input validation and error handling.

- **Ready for Future Features**
  - WebSocket chat for real-time messaging.
  - User matchmaking.
  - Analytics and performance tracking.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/quantumbay.git
cd quantumbay/backend

2. Install dependencies

npm install

Create a .env file with the following variables:

PORT=5000
SERVICE_NAME=QuantumBay
NODE_ENV=development
MONGOURI=<your_mongodb_uri>
JWT_ACCESS_SECRET=<your_access_secret>
JWT_REFRESH_SECRET=<your_refresh_secret>

Start the server

npm start
