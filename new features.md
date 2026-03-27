# System Architecture and Prompt Pack for Agentic Coding

## 1. Target Outcome
Build a web app to budget and track how many hours are spent on different projects across many teams.

The product should be fast to use for managers, leads, and project owners who need to:
- plan hours per week
- view capacity per team
- understand plan vs actual
- adjust budgets quickly when priorities change
- get visibility at the team, project, and portfolio level

The app should be optimized for simplicity and clarity, not for full-scale ERP/resource management.

---

## 2. Architecture Principles

### 2.1 Design Principles
- **MVP first**: deliver core flows before advanced automation.
- **Fast grid-based budgeting**: bulk editing is central.
- **Auditability**: all changes must be traceable.
- **Multi-team first**: the data model must support many teams and shared projects.
- **Plan vs actual by default**: both planned and reported hours are first-class data.
- **API-first**: the frontend should be built on top of a clear contract.


## 3. Domain Model

### 3.1 Core Entities

#### Organization
Top-level tenant or company.

Fields:
- id
- name
- createdAt
- updatedAt

#### Team
Represents a team, department, or sub-team.

Fields:
- id
- organizationId
- name
- code
- parentTeamId nullable
- defaultCapacityHoursPerMonth nullable
- isActive
- createdAt
- updatedAt

#### User
A user in the system.

Fields:
- id
- organizationId
- email
- name
- role
- isActive
- createdAt
- updatedAt

#### TeamMembership
Link between a user and a team.

Fields:
- id
- userId
- teamId
- allocationPercent nullable
- isPrimaryTeam

#### Project
Project, initiative, or cost center.

Fields:
- id
- organizationId
- name
- code
- description
- ownerUserId nullable
- status enum(active, planned, paused, archived)
- startDate nullable
- endDate nullable
- color nullable
- createdAt
- updatedAt

#### TeamProjectAssignment
Describes that a team works on a project.

Fields:
- id
- teamId
- projectId
- notes nullable
- createdAt

#### Period
Time period for which the budget is created.

Fields:
- id
- organizationId
- type enum(month, quarter)
- startDate
- endDate
- label
- isLocked

#### CapacitySnapshot
Capacity for a team in a period.

Fields:
- id
- teamId
- periodId
- availableHours
- source enum(manual, derived)
- comment nullable
- createdByUserId
- createdAt

#### BudgetAllocation
Planned hours.

Fields:
- id
- teamId
- projectId
- periodId
- plannedHours
- confidence enum(low, medium, high) nullable
- notes nullable
- versionTag nullable
- createdByUserId
- updatedByUserId
- createdAt
- updatedAt

#### ActualEntry
Actual hours.

Fields:
- id
- teamId
- projectId
- periodId
- actualHours
- source enum(manual, imported)
- importBatchId nullable
- createdByUserId nullable
- createdAt
- updatedAt

#### Scenario
Alternative budget version, for example Base Plan or Stretch.

Fields:
- id
- organizationId
- name
- description nullable
- isDefault
- createdByUserId
- createdAt

#### ScenarioBudgetAllocation
Same as BudgetAllocation but linked to a scenario.

Fields:
- id
- scenarioId
- teamId
- projectId
- periodId
- plannedHours
- notes nullable
- createdAt
- updatedAt

#### AuditLog
History of changes.

Fields:
- id
- actorUserId
- entityType
- entityId
- action enum(create, update, delete)
- beforeJson nullable
- afterJson nullable
- createdAt

#### ImportBatch
Tracks imports.

Fields:
- id
- organizationId
- type enum(actuals_csv, capacity_csv, budgets_csv)
- filename
- status enum(uploaded, processing, completed, failed)
- summaryJson nullable
- createdByUserId
- createdAt

---

## 4. Relationships
- Organization has many Teams, Users, Projects, Periods, and Scenarios.
- Team can have a parentTeam for hierarchy.
- Users can belong to multiple teams.
- Projects can have many teams via TeamProjectAssignment.
- BudgetAllocation is unique on `(teamId, projectId, periodId)` in default mode.
- ActualEntry is aggregated on the same axes.
- CapacitySnapshot exists per `(teamId, periodId)`.
- ScenarioBudgetAllocation is unique on `(scenarioId, teamId, projectId, periodId)`.

Recommended unique indexes:
- Team: `(organizationId, code)`
- Project: `(organizationId, code)`
- Period: `(organizationId, label)`
- BudgetAllocation: `(teamId, projectId, periodId)`
- CapacitySnapshot: `(teamId, periodId)`
- ScenarioBudgetAllocation: `(scenarioId, teamId, projectId, periodId)`

---

## 5. Functional Architecture

### 5.1 Main Modules
1. **Auth & Access Control**
2. **Teams & Projects Admin**
3. **Periods & Capacity Management**
4. **Budget Planning Grid**
5. **Actuals Import & Manual Entry**
6. **Reporting & Dashboards**
7. **Scenario Planning**
8. **Audit & History**

### 5.2 Roles

#### Admin
- manage organization, teams, projects, periods, and users
- lock periods
- import data
- view everything

#### Manager
- update capacity for owned teams
- budget hours for owned teams
- view reports for owned teams and projects they own

#### Viewer
- read-only access to relevant dashboards and views

#### Finance/PMO optional
- read everything
- export reports
- create scenarios

---

## 6. Main Flows

### 6.1 Budget Hours for a Month
1. The user selects a period.
2. The user filters by team or portfolio.
3. A grid shows projects in rows and teams or periods in columns.
4. The user enters planned hours.
5. The system autosaves or saves in batch.
6. The system immediately shows total plan, capacity, and over-/under-allocation.

### 6.2 Track Plan vs Actual
1. Actuals are imported or entered manually.
2. The dashboard calculates variance per team, project, and period.
3. The user can view variance in hours and percent.

### 6.3 Scenario Comparison
1. Admin/PMO creates a scenario based on the default plan.
2. Adjustments are made in the scenario grid.
3. The dashboard compares base vs scenario.

### 6.4 Capacity Management
1. Team capacity is set per period.
2. Budget allocations are summed against team capacity.
3. A warning is shown if plan > capacity.

---

## 7. Application Pages

### 7.1 Dashboard
Shows:
- total planned hours
- total actuals
- biggest variances
- teams over capacity
- top projects by hour volume

### 7.2 Teams
- team list
- hierarchy
- team detail
- default capacity

### 7.3 Projects
- project list
- status
- owner
- linked teams

### 7.4 Planning Grid
The core page.

Needs:
- filters for period, team, project status, and scenario
- inline editing
- sticky headers
- summary rows and columns
- copy/paste from spreadsheet
- bulk clear / bulk fill
- unsaved changes warning

### 7.5 Capacity
- capacity per team and period
- comments
- variance against budget

### 7.6 Actuals
- manual entry
- CSV import
- import history
- validation errors

### 7.7 Reports
Reports for:
- team by period
- project by period
- portfolio overview
- plan vs actual
- capacity utilization

### 7.8 Settings/Admin
- users and roles
- periods
- default settings
- locked periods

---

## 8. API Design

### 8.1 REST Endpoints (proposal)

#### Auth / session
- `GET /api/me`

#### Teams
- `GET /api/teams`
- `POST /api/teams`
- `GET /api/teams/:id`
- `PATCH /api/teams/:id`
- `GET /api/teams/:id/capacity?periodId=...`

#### Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`

#### Periods
- `GET /api/periods`
- `POST /api/periods`
- `PATCH /api/periods/:id`

#### Capacity
- `GET /api/capacity?teamId=...&periodId=...`
- `POST /api/capacity`
- `PATCH /api/capacity/:id`

#### Budgets
- `GET /api/budgets?teamId=...&periodId=...&scenarioId=...`
- `POST /api/budgets/bulk-upsert`
- `PATCH /api/budgets/:id`
- `DELETE /api/budgets/:id`

#### Actuals
- `GET /api/actuals?teamId=...&periodId=...`
- `POST /api/actuals`
- `POST /api/actuals/import`

#### Reports
- `GET /api/reports/portfolio-overview?periodId=...`
- `GET /api/reports/team-variance?teamId=...&periodId=...`
- `GET /api/reports/project-variance?projectId=...`
- `GET /api/reports/capacity-heatmap?periodId=...`

#### Scenarios
- `GET /api/scenarios`
- `POST /api/scenarios`
- `POST /api/scenarios/:id/clone-from-default`
- `GET /api/scenario-budgets?scenarioId=...&periodId=...`
- `POST /api/scenario-budgets/bulk-upsert`

#### Audit
- `GET /api/audit?entityType=...&entityId=...`

### 8.2 Important Backend Rules
- no negative hours
- locked periods cannot be changed by regular users
- only authorized teams can be edited
- bulk-upsert must be transactional
- write endpoints must write to the audit log
- import endpoints must validate schema and return row-level errors

---

## 9. Database Design in Prisma Style

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  teams     Team[]
  users     User[]
  projects  Project[]
  periods   Period[]
  scenarios Scenario[]
}

model Team {
  id                          String   @id @default(cuid())
  organizationId              String
  name                        String
  code                        String
  parentTeamId                String?
  defaultCapacityHoursPerMonth Float?
  isActive                    Boolean  @default(true)
  createdAt                   DateTime @default(now())
  updatedAt                   DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id])
  parentTeam   Team?        @relation("TeamHierarchy", fields: [parentTeamId], references: [id])
  childTeams   Team[]       @relation("TeamHierarchy")

  @@unique([organizationId, code])
}

model Project {
  id             String   @id @default(cuid())
  organizationId String
  name           String
  code           String
  description    String?
  ownerUserId    String?
  status         ProjectStatus @default(active)
  startDate      DateTime?
  endDate        DateTime?
  color          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id])

  @@unique([organizationId, code])
}

model Period {
  id             String   @id @default(cuid())
  organizationId String
  type           PeriodType
  startDate      DateTime
  endDate        DateTime
  label          String
  isLocked       Boolean  @default(false)

  organization Organization @relation(fields: [organizationId], references: [id])

  @@unique([organizationId, label])
}

model BudgetAllocation {
  id              String   @id @default(cuid())
  teamId          String
  projectId       String
  periodId        String
  plannedHours    Float
  confidence      Confidence?
  notes           String?
  versionTag      String?
  createdByUserId String
  updatedByUserId String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([teamId, projectId, periodId])
}
```

Note: the above is only a starting point. Add the remaining models in the implementation.

---

## 10. Calculations and Business Logic

### 10.1 Core KPIs
- **Planned Hours** = sum of budgeted hours
- **Actual Hours** = sum of actuals
- **Variance Hours** = actual - planned
- **Variance %** = `(actual - planned) / planned` if planned > 0
- **Capacity Utilization %** = `planned / availableCapacity`
- **Unallocated Capacity** = `availableCapacity - planned`

### 10.2 Edge Cases
- planned = 0 and actual > 0 → show “unplanned work”
- missing capacity → show warning, not 0 as default
- projects without team assignment must be discoverable in validation reports
- archived projects cannot be selected in new budget rows but must remain in history

### 10.3 Validation
- hours must be >= 0
- decimal support: yes
- max two decimals in the UI, full precision in the DB can be float/decimal
- periods must not overlap if the same label strategy is used

---

## 11. Non-Functional Requirements

### 11.1 Performance
- planning grid should load in under 2 seconds for the normal view
- bulk save of up to 500 cells should feel immediate
- use virtualization in large tables

### 11.2 Security
- auth is required for all write operations
- RBAC at team and organization level
- server-side authorization, not only frontend gating
- audit log for sensitive changes

### 11.3 Accessibility
- keyboard navigation in the grid
- clear error messages
- color must not be the only status indicator

### 11.4 Operability
- seed script for demo data
- migration flow for schema changes
- structured logging

---

## 12. Recommended Implementation Phases

### Phase 1: Foundation
- initialize Next.js + TypeScript + Tailwind + shadcn
- set up Prisma + PostgreSQL
- auth + basic layout
- create data model and migrations
- seed data

### Phase 2: Core Admin
- CRUD for teams
- CRUD for projects
- CRUD for periods
- light RBAC

### Phase 3: Planning MVP
- planning grid
- bulk-upsert budgets
- capacity snapshots
- summaries and warnings

### Phase 4: Actuals & Reports
- actuals CRUD/import
- dashboard widgets
- reports API
- plan vs actual views

### Phase 5: Advanced
- scenarios
- audit UI
- exports
- smarter imports

---

## 13. Definition of Done for MVP
The MVP is considered complete when a user can:
1. create teams and projects
2. create monthly periods
3. set capacity per team and month
4. budget hours per team/project/month in a grid
5. see when the budget exceeds capacity
6. register or import actuals
7. view plan vs actual in at least two reports
8. use the app with role-based access

---

## 14. Suggested Repo Structure

```text
/apps/web
  /src/app
  /src/components
  /src/features
    /auth
    /teams
    /projects
    /periods
    /planning
    /capacity
    /actuals
    /reports
    /scenarios
  /src/lib
  /src/server
    /db
    /services
    /repositories
    /validators
  /prisma
  /tests
```

Alternatively, use a monorepo if you want to share a UI kit and domain packages.

---

## 15. Prompt Pack for Agentic Coding
Below is a set of prompts to use sequentially in Codex or another coding agent.

### Prompt 1 — Bootstrap the Project
```text
Create a production-quality Next.js 15 + TypeScript web app for budgeting team hours across multiple projects and teams.

Requirements:
- Use App Router
- Use Tailwind CSS and shadcn/ui
- Use Prisma with PostgreSQL
- Use Zod for validation
- Set up a clean folder structure by feature
- Add a basic shell layout with sidebar navigation
- Add ESLint and Prettier configuration
- Add seed script support

Create the initial scaffolding and explain all generated files.
```

### Prompt 2 — Implement the Data Model
```text
Implement the Prisma schema for a budgeting app with the following entities:
Organization, Team, User, TeamMembership, Project, TeamProjectAssignment, Period, CapacitySnapshot, BudgetAllocation, ActualEntry, Scenario, ScenarioBudgetAllocation, AuditLog, ImportBatch.

Requirements:
- Add enums where appropriate
- Add unique constraints and indexes
- Include createdAt and updatedAt consistently
- Generate an initial migration
- Create a seed script with realistic demo data for 5 teams, 12 projects, and 6 monthly periods

Return the full Prisma schema and seed script.
```

### Prompt 3 — Build Admin CRUD
```text
Build CRUD pages and API routes for Teams, Projects, and Periods.

Requirements:
- Use server-side data fetching where appropriate
- Use React Hook Form + Zod
- Use reusable form components
- Add list views, create forms, edit forms, and delete protection
- Add validation and useful toast messages
- Add role-based protection for write actions

Return all code changes.
```

### Prompt 4 — Build the Planning Grid
```text
Build the core Planning Grid feature.

Context:
Users need to allocate planned hours by team, project, and month.

Requirements:
- Use TanStack Table
- Rows should represent projects
- Columns should represent either periods or teams depending on selected mode
- Support inline editing for hour cells
- Support bulk paste from spreadsheet-like data
- Show row totals, column totals, and grand total
- Highlight over-allocation when total planned hours exceed team capacity
- Add filters for team, period, project status, and scenario
- Persist changes through a bulk-upsert API endpoint

Also implement the backend service layer and validation.
```

### Prompt 5 — Capacity and Warnings
```text
Implement capacity management.

Requirements:
- Create a Capacity page where managers can edit available hours per team and period
- Show utilization percentage
- Show warnings for missing capacity or over-allocation
- Add a compact heatmap-style visualization using existing charting libraries
- Ensure locked periods cannot be edited by non-admin users
```

### Prompt 6 — Actuals and Import
```text
Implement actual hours tracking.

Requirements:
- Add a page for manual actual entry
- Add CSV import for actuals
- Validate CSV rows and return line-level errors
- Store imports in an ImportBatch table
- Support source values manual and imported
- Aggregate actuals by team/project/period for reporting

Return the API, parsing logic, validation, and UI.
```

### Prompt 7 — Reporting
```text
Build reporting dashboards for the budgeting app.

Requirements:
- Portfolio overview report
- Team variance report
- Project variance report
- Capacity utilization report
- Show planned hours, actual hours, variance hours, variance percent
- Use Recharts
- Keep charts simple and readable
- Also provide table views with export-ready formatting
```

### Prompt 8 — RBAC and Audit
```text
Implement role-based access control and audit logging.

Roles:
- admin
- manager
- viewer
- pmo

Requirements:
- Restrict write operations to authorized roles
- Restrict managers to their own teams
- Log create/update/delete actions on budgets, capacity, projects, and periods
- Add an Audit History panel on relevant detail pages
```

### Prompt 9 — Scenarios
```text
Implement scenario planning.

Requirements:
- Users with admin or pmo role can create scenarios
- A scenario can be cloned from the default budget plan
- Users can edit allocations per scenario
- Add comparison views between default and scenario budgets
- Show delta hours and delta percent
```

### Prompt 10 — Polish and Testing
```text
Improve the app for production readiness.

Requirements:
- Add loading states, empty states, and error states
- Add optimistic UI where appropriate
- Add unit tests for key calculations
- Add integration tests for bulk-upsert and CSV import
- Add accessibility improvements for forms and tables
- Add a README with setup instructions, architecture summary, and environment variables
```

---

## 16. Master Prompt for End-to-End Build
```text
You are building a production-quality internal web application for budgeting how many hours teams spend on projects.

Business context:
- There are many teams.
- Each team has limited capacity per month.
- Managers need to allocate planned hours across projects.
- The system must compare planned vs actual hours.
- The app should be optimized for simplicity, clarity, and fast grid-based editing.
- This is not a full ERP or PSA platform.

Core domain:
- Teams
- Projects
- Periods (month/quarter)
- Capacity snapshots
- Budget allocations
- Actual entries
- Scenarios
- Audit logs

Technical stack:
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL
- Zod
- TanStack Table
- Recharts

Constraints:
- Use API-first design
- Use feature-based folder structure
- Add role-based access control
- All write operations must be validated server-side
- Bulk editing and bulk upsert are first-class features
- Planning grid is the central UX
- The implementation should be incremental and maintainable

Now produce the implementation in logical phases, starting with project scaffolding and Prisma schema.
```

---

## 17. Recommended Product Decisions Before Coding
Before implementation, you should lock these decisions:
- Is month the lowest period level, or should week also be supported?
- Should actuals be manual initially, or imported from another system?
- Should teams be able to budget against the same project in parallel? Recommended: yes.
- Is person-level planning needed later? Recommended: design the data model so it can be added later without appearing in the MVP.
- Should scenario planning be included in the MVP? Recommended: no, phase 5.

---

## 18. Recommended MVP Scope
To reduce risk:
- support only month as period type in v1
- skip person-level planning
