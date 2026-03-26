# Inventory Tracker: Strategic Migration Specification (CTO Review)

## 1. Executive Summary
This document outlines the strategic migration of the **Inventory Tracker** from a Firebase-based NoSQL architecture to a **PostgreSQL-based relational architecture** using **Prisma ORM**. 

**Goal**: Elevate the reliability, auditability, and scalability of inventory management while maintaining a functional and simple solution.

---

## 2. Architectural Rationale (ADRs)

### 2.1 Why PostgreSQL + Prisma?
- **Data Integrity**: Relational constraints (FKs, Uniques) ensure SKUs are unique and logs are consistently linked to products.
- **Auditability**: Relational joins make it trivial to generate comprehensive audit reports.
- **Simplicity**: Prisma provides a type-safe, declarative way to interact with the database, reducing "boilerplate" code.
- **Production-Ready**: PostgreSQL is the industry standard for structured, transactional data like inventory.

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
- **PostgreSQL**: Relational storage for products and logs.
- **Prisma ORM**: Schema, migrations, and type-safe access.
- **NextAuth.js v5 (Beta)**: Using the `@auth/prisma-adapter`.

---

## 4. Relational Domain Model (Prisma)

```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  sku       String?  @unique
  quantity  Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String // User ID
  logs      AuditLog[]
}

model AuditLog {
  id            String   @id @default(cuid())
  action        String   // CREATE | UPDATE | DELETE
  productId     String?
  productName   String
  previousValue Int?
  newValue      Int?
  userId        String
  userEmail     String
  timestamp     DateTime @default(now())
  product       Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
}
```

---

## 5. Functional Implementation Roadmap (Prompt Pack)

### Phase 1: Foundation (DB & Auth)
**Prompt 1**: "Setup Prisma, define the relational schema in `schema.prisma`, and initialize the PostgreSQL database. Migrate NextAuth to the Prisma Adapter and verify the login flow."

### Phase 2: Core Logic (Prisma Service Layer)
**Prompt 2**: "Migrate `src/app/actions.ts` from Firebase-Admin to Prisma Client. Ensure all inventory operations (Add, Update, Delete) are wrapped in transactions that reliably include audit logging."

### Phase 3: Frontend Integrity
**Prompt 3**: "Update `ProductList` and search functionality to query PostgreSQL. Implement server-side filtering for search by Name and SKU. Verify that the UI remains fast and reactive."

---

## 6. CTO-Level Success Metrics
- **Zero Data Loss**: Validated through transactional integrity.
- **Sub-100ms Latency**: For core inventory read/write operations.
- **Clear Audit Trail**: 100% visibility into product changes.
- **Simplified Deployment**: Single-provider (Vercel) for both app and DB.
