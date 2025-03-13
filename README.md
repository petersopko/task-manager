# Task Manager

A full-stack task management application built with Nuxt 3 and Strapi v5.

## Project Structure

- `/api` - Strapi v5 backend
- `/client` - Nuxt 3 frontend

## Features

- User authentication (register, login, logout)
- Task management (create, read, update, delete)
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v18 or later)
- Bun (v1.0 or later)

## Setup

### Backend (Strapi)

1. Navigate to the API directory:

   ```
   cd api
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Start the development server:
   ```
   bun develop
   ```

The Strapi backend will be available at http://localhost:1337.

### Frontend (Nuxt)

1. Navigate to the client directory:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   bun install
   ```

3. Start the development server:
   ```
   bun run dev
   ```

The Nuxt frontend will be available at http://localhost:3000.

## API Endpoints

### Authentication

- `POST /api/auth/local/register` - Register a new user
- `POST /api/auth/local` - Login
- `GET /api/users/me` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks for the current user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### Backend (Strapi)

Create a `.env` file in the `/api` directory with the following variables:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### Frontend (Nuxt)

Create a `.env` file in the `/client` directory with the following variables:

```
STRAPI_URL=http://localhost:1337
```

## License

MIT
