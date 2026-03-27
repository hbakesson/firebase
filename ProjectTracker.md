# Project Tracker: Team Budgeting & Hour Tracking (CTO Strategic Spec)

## 1. Executive Summary
This document outlines the architecture and strategic vision for the **Project Tracker**: a high-performance system designed to budget and track hour allocations across multiple teams, projects, and time periods.

**Goal**: Provide managers, leads, and project owners with a unified platform for **Plan vs. Actual** visibility, **Capacity Management**, and **Scale-Ready Project Budgeting**.

---

## 2. Architectural Rationale (ADRs)

### 2.1 Why PostgreSQL + Prisma?
- **Relational Integrity**: Use foreign keys and unique constraints to enforce complex relationships between Organizations, Teams, Projects, and Periods.
- **Auditability**: Relational joins make generating comprehensive audit reports for hundreds of budget allocations trivial.
- **Type-Safe Access**: Prisma ORM ensures our "Agentic Coding" workflows remain robust and error-free.

### 2.2 Design Principles
- **MVP First**: Focus on core budgeting and reporting flows before advanced automation.
- **Fast Grid-based Budgeting**: Optimized bulk editing using TanStack Table and inline updates.
- **Multi-team First**: Native support for team hierarchies and shared projects.
- **Auditability**: All state changes are traceable through structured audit logs.

---

## 3. Current & Target Tech Stack

**Frontend**
- **Next.js 15 (App Router)** & **React 19**
- **TypeScript** & **Tailwind CSS**
- **UI Components**: shadcn/ui (Radix Primitives)
- **State & Tables**: TanStack Table (for the planning grid)
- **Charts**: Recharts (for Plan vs Actual reporting)

**Backend & Infrastructure**
- **Database**: Google Cloud SQL (PostgreSQL)
- **ORM**: Prisma (with Driver Adapter)
- **Auth**: NextAuth.js v5 (Beta) with Prisma Adapter
- **Hosting**: Firebase Hosting + Cloud Run

---

## 4. Advanced Relational Domain Model (Prisma)

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  teams     Team[]
  projects  Project[]
  periods   Period[]
  scenarios Scenario[]
}

model Team {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  code           String   @unique
  parentTeamId   String?
  isActive       Boolean  @default(true)
  organization   Organization @relation(fields: [organizationId], references: [id])
  parentTeam     Team?        @relation("TeamHierarchy", fields: [parentTeamId], references: [id])
  childTeams     Team[]       @relation("TeamHierarchy")
}

model Project {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  code           String   @unique
  description    String?
  status         ProjectStatus @default(active)
  organization   Organization @relation(fields: [organizationId], references: [id])
}

model Period {
  id             String   @id @default(cuid())
  organizationId String
  type           PeriodType // MONTH | QUARTER
  startDate      DateTime
  endDate        DateTime
  label          String
  isLocked       Boolean  @default(false)
  organization   Organization @relation(fields: [organizationId], references: [id])
}

model BudgetAllocation {
  id           String   @id @default(cuid())
  teamId       String
  projectId    String
  periodId     String
  plannedHours Float
  updatedAt    DateTime @updatedAt

  @@unique([teamId, projectId, periodId])
}

model AuditLog {
  id            String   @id @default(cuid())
  action        String   // CREATE | UPDATE | DELETE
  entityType    String   // Team | Project | Budget
  entityId      String?
  previousValue String?  // JSON string
  newValue      String?  // JSON string
  userId        String
  timestamp     DateTime @default(now())
}
```

---

## 5. Functional Implementation Roadmap

### Phase 1: Foundation (Auth & Multi-Tenancy)
- **Prompt**: "Initialize Next.js 15, Prisma (Google Cloud SQL), and Auth.js v5. Create the `Organization`, `User`, and `AuditLog` models. Set up the basic layout with a sidebar."

### Phase 2: Core Admin (Teams & Projects)
- **Prompt**: "Build CRUD interfaces for Teams, Projects, and Periods using shadcn/ui. Implement hierarchical team relationships and project status management."

### Phase 3: Planning MVP (The Grid)
- **Prompt**: "Implement the Planning Grid using TanStack Table. Support inline editing of `BudgetAllocation` hours, bulk updates, and real-time capacity warnings."

### Phase 4: Actuals & Reporting
- **Prompt**: "Add CSV import for `ActualEntry` data. Build the Plan vs. Actual dashboard using Recharts, focusing on variance analysis per team and project."

### Phase 5: Advanced (Scenarios & Auditing)
- **Prompt**: "Implement Scenario Planning (cloning default plans) and a comprehensive Audit UI for exploring the `AuditLog` history."

---

## 6. CTO-Level Success Metrics
- **Planning Accuracy**: Zero variance between grid-input and database-state (verified via ACID transactions).
- **Sub-2s Grid Performance**: Fully interactive experience even for 500+ budget cells.
- **100% Audit Transparency**: Every mutation in the budgeting cycle is recorded with pre/post JSON snapshots.
- **Capacity Optimization**: Immediate visibility into team over-allocation, reducing delivery risk.
