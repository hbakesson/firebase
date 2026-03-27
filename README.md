# Project Tracker 🚀

A high-performance, glassmorphic Project Management System built with **Next.js**, **PostgreSQL**, and **Auth.js (NextAuth v5)**. Designed for speed, integrity, and a premium user experience.

![Architecture](architecture.svg)

## ✨ Core Features

- **Cloud-Native Database**: Deeply integrated with **Google Cloud SQL** using the official **Node.js Cloud SQL Connector** for secure, serverless-optimized connections.
- **Relational Integrity**: Powered by PostgreSQL and Prisma ORM for zero data loss and strict schema enforcement.
- **Advanced Search & Filtering**: Server-side filtering by project name, description, and status (`PLANNED`, `IN_PROGRESS`, etc.).
- **Granular Progress Tracking**: Track project completion with precise percentage-based increments and visual feedback.
- **Transactional Audit Trail**: Every project mutation (Create, Update, Delete) is recorded in a transactional audit log with JSON-based history.
- **Next-Gen Authentication**: Multi-provider support (Google OAuth, Email/Password, Guest) with Auth.js v5 and Prisma Adapter.
- **Premium Glass UI**: Modern, responsive design using 100% Vanilla CSS with smooth transitions and glassmorphic aesthetics.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Database**: [Google Cloud SQL](https://cloud.google.com/sql/) (PostgreSQL)
- **Connector**: [@google-cloud/cloud-sql-connector](https://github.com/GoogleCloudPlatform/cloud-sql-nodejs-connector)
- **ORM**: [Prisma](https://www.prisma.io/) with Driver Adapter
- **Auth**: [Auth.js v5](https://authjs.dev/)
- **Styling**: Vanilla CSS (CSS Variables + CSS Modules)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A Google Cloud Project with Cloud SQL (PostgreSQL) enabled.

### 2. Environment Setup
Create a `.env` file in the root directory:

```env
# Database (Cloud SQL Format)
# Use the 'host=' parameter to specify the Instance Connection Name
DATABASE_URL="postgresql://user:password@/dbname?host=PROJECT:REGION:INSTANCE"

# Authentication
AUTH_SECRET="..." # Generate with: npx auth secret
AUTH_URL="https://your-app.web.app"
NEXTAUTH_URL="https://your-app.web.app"
AUTH_TRUST_HOST="true"

# Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 3. Installation & Build
```bash
# Install dependencies
npm install

# Generate Prisma Client (uses driverAdapters)
npx prisma generate

# Run development server
npm run dev
```

## 🏗️ Deployment

This project is optimized for deployment to **Firebase Hosting** and **Google Cloud Run** via the Firebase CLI:

```bash
# Deploy to Production (Functions + Hosting)
firebase deploy
```

> [!IMPORTANT]
> **Cloud SQL Connectivity**: In production, the Prisma Client uses the `@prisma/adapter-pg` driver adapter. A `Proxy`-based LazyPool is implemented in `src/lib/prisma.ts` to ensure the Cloud SQL Connector's asynchronous handshake only occurs upon the first query, avoiding cold-start latency issues.

## ⚡ Performance Metrics
- **Optimization**: Uses a lazy-initialized database pool to satisfy Prisma's synchronous requirements in a serverless context.
- **Reliability**: Leverages the official Google Cloud SQL Connector for secure IAM/SSL handshakes.
- **Observability**: Detailed diagnostic logging for database pool initialization and connection persistence.

---
Developed with precision for the modern web.
