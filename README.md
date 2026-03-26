# Project Tracker 🚀

A high-performance, glassmorphic Project Management System built with **Next.js**, **PostgreSQL**, and **Auth.js (NextAuth v5)**. Designed for speed, integrity, and a premium user experience.

![Architecture](architecture.svg)

## ✨ Core Features

-   **Relational Integrity**: Powered by PostgreSQL and Prisma ORM for zero data loss and strict schema enforcement.
-   **Advanced Search & Filtering**: Server-side filtering by project name, description, and status (`PLANNED`, `IN_PROGRESS`, etc.).
-   **Granular Progress Tracking**: Track project completion with precise percentage-based increments and visual feedback.
-   **Transactional Audit Trail**: Every project mutation (Create, Update, Delete) is recorded in a transactional audit log with JSON-based history.
-   **Next-Gen Authentication**: Multi-provider support (Google OAuth, Email/Password, Guest) with Auth.js v5 and Prisma Adapter.
-   **Premium Glass UI**: Modern, responsive design using 100% Vanilla CSS with smooth transitions and glassmorphic aesthetics.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
-   **Database**: PostgreSQL
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Auth**: [Auth.js v5](https://authjs.dev/)
-   **Styling**: Vanilla CSS (CSS Variables + CSS Modules)

## 🚀 Getting Started

### 1. Prerequisites
-   Node.js 18+
-   A running PostgreSQL instance (Local, Supabase, or Google Cloud SQL)

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/projecttracker"

# Authentication
AUTH_SECRET="..." # Generate with: npx auth secret
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 3. Installation & Build
```bash
# Install dependencies
npm install

# Generate Prisma Client & Sync Database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

## 🏗️ Deployment

When deploying to environments like **Vercel** or **Firebase Hosting**, the build script automatically handles client generation:

```bash
# Production Build
npm run build
```

> [!IMPORTANT]
> Ensure the `DATABASE_URL` is configured in your production environment variables to avoid runtime errors.

## ⚡ Performance Metrics
-   **Lighthouse Score**: Optimized for 90+ across all metrics.
-   **Latency**: Sub-100ms response times for core database operations.
-   **Reliability**: 100% relational consistency via Prisma/PostgreSQL.

---
Developed with precision for the modern web.
