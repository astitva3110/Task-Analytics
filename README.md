# Task Analytics API

Task Analytics API provides authentication, user management, and
role-based operations for task analytics workflows.\
This README documents setup, environment configuration, and the
available endpoints with example requests.

## Tech Stack

-   Node.js + Express\
-   JWT-based authentication\
-   Modular layered architecture (controllers, services, repositories,
    models)\
-   Rate limiting on sensitive routes\
-   Redis (for caching / rate limiting)

## Project Structure
```
   config/                     # App & DB configuration
 ├── database.js
 └── redis.js

controllers/                # Handle requests & responses
 ├── admin.controller.js
 ├── auth.controller.js
 ├── manager.controller.js
 └── user.controller.js

loaders/                    # Initialize services on startup
 └── index.js

middlewares/                # Pre-controller logic (auth, roles, limits)
 ├── auth.middleware.js
 ├── rateLimit.middleware.js
 └── role.middleware.js

models/                     # MongoDB schemas & data structure
 ├── Task.model.js
 └── User.model.js

repositories/               # Database queries (DB access layer)
 ├── task.repository.js
 └── user.repository.js

routes/                     # API endpoints mapping to controllers
 ├── admin.route.js
 ├── auth.route.js
 ├── manager.route.js
 └── user.route.js

services/                   # Business logic for features
 ├── admin.service.js
 ├── auth.service.js
 ├── manager.service.js
 └── user.service.js

utils/                      # Reusable helpers & utilities
 ├── email.util.js
 └── validator.util.js

.gitignore
app.js                      # Main Express app config
package-lock.json
package.json
server.js                   # Server startup & shutdown

```
## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   A running database\
-   A running Redis instance (see `config/redis.js`)

## Setup

### 1. Clone the repository

``` sh
git clone https://github.com/astitva3110/Task-Analytics.git
cd Task-Analytics
```

### 2. Install dependencies

``` sh
npm install
```

### 3. Create a `.env` file
```
MONGO_URI=
SMTP_USER=
SMTP_PASS=
JWT_SECRET=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

### 4. Run the server

#### Development:

``` sh
npm run dev
```

#### Production:

``` sh
npm start
```

## Base URL

-   Local: `http://localhost:3000/api/v1`

# Authentication

JWT Bearer tokens are used for protected routes.

Include this header after login:

    Authorization: Bearer <token>



### Postman Variables:

-   `{{baseUrl}}` = `http://localhost:3000/api/v1`
-   `{{authToken}}` = your JWT after login

# Endpoints

## Auth

### POST /auth/register

**Body**

``` json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Passw0rd!"
  "role":"user"
  "username":"user1"
}
```

### POST /auth/login

**Body**

``` json
{
  "email": "jane@example.com",
  "password": "Passw0rd!"
}
```

# Rate Limiting

Some routes (e.g., login and register) may be rate-limited.
If you receive a `429 (Too Many Requests)`, check the `Retry-After`
header.


# Changelog

-   v1 -- Initial API Release

# License

MIT
