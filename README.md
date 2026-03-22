# Inventory Tracker

A polished, single-page inventory management system built with Next.js, Prisma, and SQLite. Features a premium glassmorphic UI and local data persistence.

## Features

- **Full CRUD**: Add, update quantity, and delete products.
- **Search**: Real-time filtering by product name or SKU.
- **Glassmorphic UI**: Modern, premium aesthetics with smooth transitions.
- **Local Persistence**: Powered by SQLite and Prisma.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database & Run Migrations

Initialize the SQLite database and create the `Product` table:

```bash
npx prisma migrate dev --name init
```

### 3. Seed Sample Data

Populate the database with a few initial products:

```bash
npx prisma db seed
```

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: SQLite
- **ORM**: Prisma 5
- **Styling**: Vanilla CSS (Custom Glassmorphism)
- **Inspiration**: Expert full-stack live-demo builds.
