# Technical Architecture - Project Tracker & Capacity Tool

This document outlines the technical architecture, design patterns, and technology stack for the Project Tracker application, with a specialized focus on high-performance resource and capacity planning.

## 1. Technology Stack

### Core Framework
- **Next.js 15.5.14 (App Router)**: Utilizing Server Components for performance and Server Actions for data mutations.
- **React 19**: Leveraging concurrent rendering and modern hooks.
- **TypeScript**: Ensuring type safety across the entire stack.

### Data & Storage
- **Prisma 6.4.1 (ORM)**: Typed database access with support for preview features like `driverAdapters`.
- **SQLite (Development)**: Local file-based storage (`dev.db`).
- **PostgreSQL / LibSQL**: Configured for high-concurrency production environments and distributed SQLite providers.

### Authentication & Security
- **NextAuth.js (v5 Beta)**: Complete authentication solution supporting Google OAuth, Credentials, and Guest access.
- **RBAC**: Role-Based Access Control (Admin/User) to secure destructive and sensitive planning actions.

### User Interface (UI)
- **AG Grid Community v35.3.0**: Primary engine for the "Excel-like" planning matrix. Chosen for its native support for virtualization, column pinning, and complex cell editing.
- **Vanilla CSS**: Custom styling system using CSS variables for maximum flexibility and performance.
- **Lucide React**: Minimalist, consistent icon set.
- **Recharts**: Data visualization for resource load and project progress reporting.

---

## 2. System Architecture

### Frontend Layer (The Capacity Matrix)
The user experience is centered around a high-density, interactive matrix:
- **X-Axis (Time)**: Dynamic timeline columns (Day/Week/Month granularity).
- **Y-Axis (Hierarchy)**: Expandable 3-level tree structure:
    1. **Project** (Top level)
    2. **Team** (Allocated to the project)
    3. **Developer/Resource** (Individuals within the team)
- **Cell Interaction**: Seamless "Tab & Enter" navigation. Every cell entry triggers an background auto-save (Optimistic UI updates) via Server Actions.

### Logic Layer (Server Actions)
- **Transactional Mutation**: Mutations (e.g., updating allocation hours) are atomic and include automatic `AuditLog` generation.
- **Cache Invalidation**: Uses `revalidatePath` to synchronize state across the dashboard instantly.

### Data Layer (Core Entities)
The schema is optimized for rapid aggregation of time-series data:
- **Organization**: Root tenant.
- **Team & Membership**: Includes `capacity_per_day` (e.g., 8h) for calculating over/under-utilization.
- **Planning Entities**:
    - `Requested`: Hours required by the project.
    - `Allocated`: Hours assigned by the resource manager.
    - `Actual`: Verified hours (time tracking/follow-up).

---

## 3. Resource & Capacity Planning Logic

### The "Triple-Bucket" Cell
Every intersection of a Resource and a Date manages three distinct values:
- **Requested Hours**: The "Demand" signal from project leads.
- **Allocated Hours**: The "Supply" decision from team leads.
- **Actual Hours**: The "Reality" reported by developers.

### Virtualization & Performance
To support 100+ resources over a 12-month timeline, the system implements:
- **Row Virtualization**: Only rendering visible rows to maintain 60fps scrolling.
- **Cell Buffering**: Pre-loading adjacent time periods to prevent flicker during horizontal scrolling.
- **Debounced Persistence**: Local state is updated instantly; database sync is debounced to handle rapid typing (Excel-style).

---

## 4. Design Patterns & Conventions

### Theming System (Variable-First)
- **Dual-Theme Support**: Light Mode (default) and Dark Mode controlled via CSS variables in `globals.css`.
- **Legacy Theming**: AG Grid uses `theme="legacy"` to ensure grid headers, borders, and rows react perfectly to CSS variable changes.

### Audit & Traceability
- **Entity Tracking**: Every change to an allocation is logged with `previousValue` and `newValue` for historical reconciliation.
- **User Attribution**: Logs include the authenticated user's ID and email at the time of the change.

---

## 5. Infrastructure & Deployment

### Local Development
- **Docker Compose**: Standardizes the development environment.
- **TSX Seeding**: Generates realistic organizational hierarchies and dense allocation datasets for stress-testing the grid.

### Directory Structure
```text
src/
├── app/          # Routes, Pages, and Server Actions
├── components/   # UI Modules (Grids, Sidebar, Contexts)
├── lib/          # Core utilities (Prisma, Auth)
├── types/        # TypeScript interfaces
prisma/           # Data models and seed scripts
```
