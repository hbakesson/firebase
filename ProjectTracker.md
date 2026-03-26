# Project Tracker: Strategic Migration Specification (CTO Review)

## 1. Executive Summary
This document outlines the strategic migration of the **Project Tracker** from a Firebase-based NoSQL architecture to a **PostgreSQL-based relational architecture** using **Prisma ORM**. 

**Goal**: Elevate the reliability, auditability, and scalability of project management while maintaining a functional and simple solution.

---

## 2. Architectural Rationale (ADRs)

### 2.1 Why PostgreSQL + Prisma?
- **Data Integrity**: Relational constraints (FKs, Uniques) ensure project names are unique and logs are consistently linked to projects.
- **Auditability**: Relational joins make it trivial to generate comprehensive audit reports.
- **Simplicity**: Prisma provides a type-safe, declarative way to interact with the database, reducing "boilerplate" code.
- **Production-Ready**: PostgreSQL is the industry standard for structured, transactional data like project lifecycle.

### 2.2 Keeping it Simple
- **No Over-Engineering**: We focus on the core CRUD and Audit flows.
- **Vanilla Styling**: Standard CSS/CSS Modules provide a premium look without the overhead of complex UI libraries.
- **Serverless First**: Deployment on Vercel with Managed Postgres ensures low operational overhead.

---

## 3. Current Tech Stack

**Core**
- **Next.js 15 (App Router)** & **React 19**
- **TypeScript** & **Vanilla CSS (Glassmorphism UI)**

**Database & Auth**
- **PostgreSQL**: Relational storage for projects and logs.
- **Prisma ORM**: Schema, migrations, and type-safe access.
- **NextAuth.js v5 (Beta)**: Using the `@auth/prisma-adapter`.

---

## 4. Relational Domain Model (Prisma)

```prisma
model Project {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  status      String   @default("PLANNED") // PLANNED | IN_PROGRESS | COMPLETED | ON_HOLD
  priority    Int      @default(1) // 1 (Low) to 5 (High)
  progress    Int      @default(0) // 0-100 percentage
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String // User ID
  logs        AuditLog[]
}

model AuditLog {
  id            String   @id @default(cuid())
  action        String   // CREATE | UPDATE | DELETE
  projectId     String?
  projectName   String
  previousValue String?  // Stores JSON string of changed values
  newValue      String?  // Stores JSON string of changed values
  userId        String
  userEmail     String
  timestamp     DateTime @default(now())
  project       Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)
}
```

---

## 5. Functional Implementation Roadmap (Prompt Pack)

### Phase 1: Foundation (DB & Auth)
**Prompt 1**: "Setup Prisma, define the relational schema in `schema.prisma`, and initialize the PostgreSQL database. Migrate NextAuth to the Prisma Adapter and verify the login flow."

### Phase 2: Core Logic (Prisma Service Layer)
**Prompt 2**: "Migrate `src/app/actions.ts` from Firebase-Admin to Prisma Client. Ensure all project operations (Add, Update, Delete) are wrapped in transactions that reliably include audit logging."

### Phase 3: Frontend Integrity
**Prompt 3**: "Update `ProjectList` and search functionality to query PostgreSQL. Implement server-side filtering for search by Name and Status. Verify that the UI remains fast and reactive."

---

## 6. CTO-Level Success Metrics
- **Zero Data Loss**: Validated through transactional integrity.
- **Sub-100ms Latency**: For core project read/write operations.
- **Clear Audit Trail**: 100% visibility into project changes.
- **Simplified Deployment**: Single-provider (Vercel) for both app and DB.
