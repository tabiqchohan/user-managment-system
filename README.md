# Full Stack CRUD Application with Neon PostgreSQL + Next.js

A complete full-stack CRUD application built with:
- Backend: Node.js, Express.js, Neon PostgreSQL, Prisma ORM
- Frontend: Next.js (App Router), Tailwind CSS
- Database: Neon PostgreSQL

## Features

### Backend
- REST API with full CRUD operations (GET, POST, PUT, PATCH, DELETE)
- Neon PostgreSQL database with Prisma ORM
- Input validation and error handling
- Proper HTTP status codes
- Clean folder structure

### Frontend
- Next.js with App Router
- User-friendly interface for managing users
- Create, read, update, and delete operations
- Loading and error states
- Responsive design with Tailwind CSS

## Database Schema

### User Table
- `id` (UUID, primary key)
- `name` (string, required)
- `email` (string, required, unique)
- `createdAt` (timestamp, default: now())

## API Endpoints

- `GET /api/users` → Get all users
- `GET /api/users/:id` → Get single user
- `POST /api/users` → Create user
- `PUT /api/users/:id` → Update full user
- `PATCH /api/users/:id` → Update partial user
- `DELETE /api/users/:id` → Delete user

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Neon PostgreSQL account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Neon PostgreSQL database and get the connection string

4. Create a `.env` file in the backend directory with your database connection:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Push the database schema:
   ```bash
   npx prisma db push
   ```

7. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both backend and frontend servers are running
2. Visit `http://localhost:3000` in your browser
3. Use the interface to create, read, update, and delete users

## Project Structure

```
assignment/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── prisma/
│   │   └── schema.prisma
│   └── middleware/
│       └── errorHandler.js
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── .env.local
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── users/
│   │   │   ├── page.js
│   │   │   ├── create/
│   │   │   │   └── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   └── globals.css
│   └── components/
│       ├── UserList.js
│       ├── UserForm.js
│       └── LoadingSpinner.js
└── README.md
```

## Error Handling

- Proper HTTP status codes (200, 201, 400, 404, 500)
- Validation errors with descriptive messages
- Database errors handled gracefully
- Not found errors with appropriate responses

## Development

For development, you can run the backend and frontend separately:

- Backend: `npm run dev` in the `backend` directory
- Frontend: `npm run dev` in the `frontend` directory

## Deployment

For production deployment:
1. Build the Next.js app: `npm run build` in the `frontend` directory
2. Set environment variables for production
3. Deploy both backend and frontend to your preferred hosting platform