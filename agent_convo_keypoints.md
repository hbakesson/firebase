# Agent Conversation Keynotes: Phase 14 - Relational Evolution

This document consolidates the critical decisions and architectural changes made during the "Many-to-Many Project-Team Migration" to ensure future model tokens are used efficiently.

### 🎯 Objective
Transition the `Project` model from a singular `teamId` association to a **many-to-many** `teams` relationship, resolving the 500 regressions in Reports, Planning, and Dashboard views.

### 🏗️ Architectural Changes
1.  **Model Migration**: `Project` now relates to `Team` via `teams: Team[]`. All queries must use `include: { teams: true }`.
2.  **Server Actions (`src/lib/actions.ts`)**: 
    *   Replaced `teamId` with `teamIds` array in project mutations.
    *   Updated `updateProject` and `createProject` to handle `connect` and `set` operations for the `teams` relational field.
3.  **Data Persistence Layer**: Fully optimized the `prisma.project` and `prisma.team` calls across the application to handle multiple associations.
4.  **Mock Hardening (`src/lib/mockData.ts`)**:
    *   Hardened the mock `findMany` and `findUnique` implementations to ensure `allocations`, `actualAllocations`, and `teams` are **always** initialized as arrays (prevents `.reduce()` and `.map()` crashes).

### 🐞 Critical Bug Fixes
- **Reports 500 Error**: Fixed `Cannot read properties of undefined (reading 'reduce')` in `src/app/reports/page.tsx` by ensuring the Prisma client (and mock) always returns the required relational arrays.
- **Bulk Planning Regression**: Resolved the issue where projects only associated with a single team would disappear from the "All Teams" view. Redesigned the filter logic to use `teams: { some: { id: ... } }`.
- **Production Build Stability**: Replaced raw `<link>` fonts in `layout.tsx` with `next/font/google` to resolve Next.js 15 optimization warnings and build crashes.

### 🛠️ Developer Guidance for Future Turns
- **Prisma Includes**: Always include `teams: true` when querying projects if team data is needed for badges or filtering.
- **Mock Testing**: If adding a new page that iterates over relations, verify the mock implementation in `mockData.ts` to ensure the fields are present.
- **Font Best Practices**: Maintain the use of `inter.variable` and `outfit.variable` in `layout.tsx` to prevent hydration mismatches.

---
*Maintained with precision for subsequent model interactions.*
