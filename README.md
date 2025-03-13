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
   bun dev
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
   bun dev
   ```

The Nuxt frontend will be available at http://localhost:3000.

The project includes an `.env.example` file in the `/client` directory that you can use as a template:

1. Copy the example file to create your own `.env` file:

   ```
   cp client/.env.example client/.env
   ```

2. For development, you can use the example values as-is, but for production, update the `STRAPI_URL` to point to your production Strapi instance.

The following environment variables are used by the Nuxt frontend:

| Variable        | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| STRAPI_URL      | The URL of your Strapi backend (default: http://localhost:1337)             |
| PUBLIC_BASE_URL | (Optional) The public URL of your frontend (default: http://localhost:3000) |

## ⚠️ IMPORTANT: Configuring Strapi Permissions ⚠️

> **CRITICAL SETUP STEP**: Without completing these permission settings, users will not be able to access or manage tasks!

When starting the application for the first time, you **MUST** configure permissions in Strapi to allow authenticated users to interact with tasks:

1. After starting the Strapi server, navigate to http://localhost:1337/admin
2. Create an admin account if you haven't already
3. Go to Settings → Users & Permissions Plugin → Roles
4. Select the "Authenticated" role
5. In the Permissions section, find "Task" and enable the following permissions:
   - find (GET)
   - findOne (GET)
   - create (POST)
   - update (PUT)
   - delete (DELETE)
6. Save your changes

**⚠️ WARNING**: Skipping this configuration will result in authentication errors and prevent the application from functioning correctly. This is a required step that cannot be automated (in an easy manner).

This configuration ensures that authenticated users can perform all CRUD operations on their tasks.

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

The project includes an `.env.example` file in the `/api` directory that you can use as a template:

1. Copy the example file to create your own `.env` file:

   ```
   cp api/.env.example api/.env
   ```

2. For development, you can use the example values as-is, but for production, replace all security keys and secrets with strong random values.

You can generate secure random strings using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

The following environment variables are required for Strapi:

| Variable            | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| HOST                | The host address Strapi will run on (0.0.0.0 allows external connections) |
| PORT                | The port Strapi will use (default: 1337)                                  |
| APP_KEYS            | Comma-separated keys used for cookie encryption                           |
| API_TOKEN_SALT      | Salt used for API token generation                                        |
| ADMIN_JWT_SECRET    | Secret for admin panel authentication                                     |
| TRANSFER_TOKEN_SALT | Salt used for data transfer operations                                    |
| JWT_SECRET          | Secret for user authentication (critical for frontend integration)        |

### Frontend (Nuxt)

The project includes an `.env.example` file in the `/client` directory that you can use as a template:

1. Copy the example file to create your own `.env` file:

   ```
   cp client/.env.example client/.env
   ```

2. For development, you can use the example values as-is, but for production, update the `STRAPI_URL` to point to your production Strapi instance.

The following environment variables are used by the Nuxt frontend:

| Variable        | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| STRAPI_URL      | The URL of your Strapi backend (default: http://localhost:1337)             |
| PUBLIC_BASE_URL | (Optional) The public URL of your frontend (default: http://localhost:3000) |

## License

MIT
