# Technical Architecture - Project Tracker

This document outlines the technical architecture, design patterns, and technology stack for the Project Tracker application.

## 1. Technology Stack

### Core Framework
- **Next.js 15.5.14 (App Router)**: Utilizing Server Components for performance and Server Actions for data mutations.
- **React 19**: Leveraging concurrent rendering and modern hooks.
- **TypeScript**: Ensuring type safety across the entire stack.

### Data & Storage
- **Prisma 6.4.1 (ORM)**: Typed database access with support for preview features like `driverAdapters`.
- **SQLite (Development)**: Local file-based storage (`dev.db`).
- **LibSQL (Production Ready)**: Configured for potential migration to distributed SQLite providers (e.g., Turso).

### Authentication & Security
- **NextAuth.js (v5 Beta)**: Complete authentication solution.
- **Providers**:
  - **Google OAuth**: Primary social login.
  - **Credentials**: Email/Password for registered users.
  - **Guest Access**: Seamless entry for trial/temporary users.
- **Role-Based Access Control (RBAC)**: Defined roles (`admin`, `user`) with specific permissions for destructive actions (e.g., project deletion).

### User Interface (UI)
- **AG Grid Community v35.3.0**: High-performance spreadsheet-like grids for complex resource planning and bulk editing.
- **Vanilla CSS**: Custom styling system using CSS variables for maximum flexibility, avoiding external CSS frameworks.
- **Lucide React**: Minimalist, consistent icon set.
- **Recharts**: Dynamic data visualization for reports and analytics.

---

## 2. System Architecture

### Frontend Layer
- **Client Components**: Used for interactive elements (grids, forms, theme toggling).
- **Server Components**: Used for data fetching to minimize client-side JavaScript and improve SEO/TTFB.
- **ThemeContext**: A React Context provider managing global Light/Dark mode state and persistence via `localStorage`.

### Logic Layer (Server Actions)
Business logic is centralized in `src/app/actions.ts`:
- **Transactional Integrity**: Database operations are wrapped in logic that ensures audit logs are written alongside mutations.
- **Revalidation**: `revalidatePath` is used to provide instant UI updates without manual state management.

### Data Layer (Prisma)
The schema (`schema.prisma`) is organized into several key domains:
- **Tenancy**: `Organization` model acts as the root for all data.
- **Planning**: `Project`, `Team`, `Period`, `BudgetAllocation`, and `ActualAllocation` models.
- **Audit**: `AuditLog` captures granular changes (CREATE/UPDATE/DELETE) with user attribution.
- **Identity**: Standard NextAuth models (`User`, `Account`, `Session`).

---

## 3. Design Patterns & Conventions

### Theming System
The application uses a **Variable-First CSS strategy**:
- **Root Variables**: Defined in `globals.css` for light mode (default).
- **Dark Class**: Overrides variables when the `.dark` class is present on the `html` element.
- **Legacy Grid Themes**: AG Grid is configured with `theme="legacy"` to allow custom CSS variables to control grid aesthetics directly.

### Data Fetching
- **Flattened Row Models**: For AG Grid, complex relational data is flattened client-side or in actions to optimize grid performance.
- **Absolute Paths**: The Prisma client uses `process.cwd()` to ensure reliable database access across different execution environments (Docker vs. Local).

### Audit Trail
Every destructive or planning-related action must call `writeAuditLog`. This helper captures:
- Action type (CREATE/UPDATE/DELETE).
- User identification (ID and Email).
- Previous vs. New values (JSON serialized).
- Project/Entity context.

---

## 4. Infrastructure & Deployment

### Local Development
- **Docker Compose**: Orchestrates the local environment.
- **SQLite**: No external database setup required for development.
- **TSX**: Used for robust database seeding (`prisma/seed.ts`).

### Directory Structure
```text
src/
├── app/          # Routes, Pages, and Server Actions
├── components/   # Reusable UI components (Grids, Sidebar, Contexts)
├── lib/          # Utilities and shared instances (Prisma, etc.)
├── types/        # Global TypeScript definitions
prisma/           # Schema definition and seeding scripts
```
