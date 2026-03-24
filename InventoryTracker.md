# Inventory Tracker (Antigravity Build Spec)

## Persona
You are an expert full-stack engineer.

You build small, polished apps
You prioritize:
- Clear scope
- Predictable outcomes
- Minimal moving parts
- Clean UI

You write readable code and avoid unnecessary abstractions.

---

## Objective
Build an **Inventory Tracker** web app that allows a user to:

- Authenticate securely via Google OAuth or Email/Password.
- Add products with a quantity  
- View all products in a table  
- Update product quantity  
- Delete a product (Admins only)
- Search by name or SKU   

**Requirement:** Data must persist securely in the cloud.

---

## Scope

### ✅ Include
- Full CRUD for `Product`
- Search/filter by **name or SKU**
- Role-based Access Control (RBAC) handling Admins vs standard users
- Persisted remote data using **Cloud Firestore**
- Authentication using **NextAuth + Firebase Auth**
- Server-side rendering and deployment via **Firebase Hosting and Cloud Run**
- Audit logging of inventory changes

### ❌ Exclude
- Consumption tracking
- Background jobs
- Over-engineered architecture

---

## Tech Stack

### Preferred
- **Next.js (App Router) + TypeScript**
- **Firebase/Google Cloud Platform**
- **Cloud Firestore** (NoSQL Database)
- **Firebase Admin SDK** (Server actions and DB interactions)
- **NextAuth.js** (Session management)

---

## Data Model

### Product (Firestore Collection: `inventory`)
- `id`: string (Firestore Document ID)
- `name`: string (required)
- `sku`: string (optional)
- `quantity`: int (required, minimum 0)
- `createdAt`: serverTimestamp
- `updatedAt`: serverTimestamp
- `createdBy`: string (User ID of the creator)

### AuditLogs (Firestore Collection: `auditLogs`)
- `action`: string (CREATE | UPDATE | DELETE)
- `productId`: string
- `productName`: string
- `previousValue`: int (optional)
- `newValue`: int (optional)
- `userId`: string
- `userEmail`: string
- `timestamp`: serverTimestamp

---

## UI

### Layout
- Single-page application dashboard after authentication
- Clean, minimal styling
- Protected routes (redirects unauthorized users to `/login`)

### Add Product
- Inputs:
  - Name (required)
  - SKU (optional)
  - Quantity (integer, default 0)
- Button: **Add Product**
- Inline validation and loading states

### Inventory Table
- Search input (filters by name or SKU)
- Columns:
  - Product Name (along with creation date)
  - SKU
  - Quantity (features conditional formatting for low stock)
  - Actions

### Actions
- Inline quantity adjustments (+ / -) limits to minimum 0
- Delete product (only available and permitted for Admin roles)

### Empty State
- Show a clear message when no products exist or search returns 0 matches.

---

## Validation
- Name cannot be empty
- SKU need to be unique
- Quantity must be an integer, cannot be negative
- Server-side validation of actions via Firebase Admin (e.g., Delete only for Admins)

---

## Persistence
- Fully relies on Cloud Firestore.
- Next.js Server Actions execute securely on Google Cloud Run utilizing `adminDb.collection()`.

---

## Definition of Done

A user can:
1. Log in securely using Google or Email/Password.
2. Add a product securely to the Firestore database.
3. Access the persistent cloud table of goods.
4. Scale up/down quantity or successfully execute a deletion as an Admin.
5. Have complete architecture maps available (e.g. `architecture.svg`).

---

## Deliverables
- Fully working Next.js App Router application
- Architecture Diagram (SVG) outlining Next.js to Firebase interactions
- Deployment instructions for Firebase Hosting & Cloud Run
- A completely modern, SQLite and Prisma-free codebase.
