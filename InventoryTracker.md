# Inventory Tracker (Antigravity Build Spec)

## Persona
You are an expert full-stack engineer and live-demo builder.

You build small, polished apps that are easy to explain on YouTube.  
You prioritize:
- Clear scope
- Predictable outcomes
- Minimal moving parts
- Clean UI

You write readable code and avoid unnecessary abstractions.

---

## Objective
Build an **Inventory Tracker** web app that allows a user to:

- Add products with a quantity  
- View all products in a table  
- Update product quantity  
- Delete a product  
- Search by name or SKU  

**Requirement:** Data must persist locally.

---

## Scope

### ✅ Include
- Full CRUD for `Product`
- Search/filter by **name or SKU**
- Local persistence using **SQLite**

### ❌ Exclude
- Authentication
- External integrations
- Consumption tracking
- Reporting, charts, or background jobs
- Over-engineered architecture

---

## Tech Stack

### Preferred
- **Next.js (App Router) + TypeScript**
- **Prisma + SQLite**

If the environment provides a similar full-stack TypeScript setup with fast SQLite support, use that instead.

---

## Data Model

### Product
- `id`: uuid (primary key)
- `name`: string (required)
- `sku`: string (optional)
- `quantity`: int (required, minimum 0)
- `createdAt`: datetime
- `updatedAt`: datetime
If you want, I can extend this into a full Antigravity-ready spec (including UI, validation, DoD, and deliverables in the same clean format).


yes

Here’s the complete, clean Antigravity-ready Markdown spec, combining everything into one cohesive file:

# Inventory Tracker (Antigravity Build Spec)

## Persona
You are an expert full-stack engineer and live-demo builder.

You build small, polished apps that are easy to explain on YouTube.  
You prioritize:
- Clear scope
- Predictable outcomes
- Minimal moving parts
- Clean UI

You write readable code and avoid unnecessary abstractions.

---

## Objective
Build an **Inventory Tracker** web app that allows a user to:

- Add products with a quantity  
- View all products in a table  
- Update product quantity  
- Delete a product  
- Search by name or SKU  

**Requirement:** Data must persist locally.

---

## Scope

### ✅ Include
- Full CRUD for `Product`
- Search/filter by **name or SKU**
- Local persistence using **SQLite**

### ❌ Exclude
- Authentication
- External integrations
- Consumption tracking
- Reporting, charts, or background jobs
- Over-engineered architecture

---

## Tech Stack

### Preferred
- **Next.js (App Router) + TypeScript**
- **Prisma + SQLite**

If the environment provides a similar full-stack TypeScript setup with fast SQLite support, use that instead.

---

## Data Model

### Product
- `id`: uuid (primary key)
- `name`: string (required)
- `sku`: string (optional)
- `quantity`: int (required, minimum 0)
- `createdAt`: datetime
- `updatedAt`: datetime

---

## UI

### Layout
- Single-page application
- Clean, minimal styling

### Add Product
- Inputs:
  - Name (required)
  - SKU (optional)
  - Quantity (integer, default 0)
- Button: **Add**
- Inline validation messages

### Inventory Table
- Search input (filters by name or SKU)
- Columns:
  - Name
  - SKU
  - Quantity
  - Actions

### Actions
- Edit quantity (inline or small modal)
- Delete product (with confirmation)

### Empty State
- Show a clear message when no products exist

---

## Validation
- Name cannot be empty
- Quantity must be an integer
- Quantity cannot be negative
- Show short, user-friendly errors near the relevant field

---

## Persistence
- Use Prisma schema and migrations
- Include a seed script with **3–5 sample products**

---

## Definition of Done

A user can:
1. Add a product  
2. See it in the table  
3. Update its quantity  
4. Delete it  
5. Refresh the page and confirm data persists  

---

## Deliverables
- Working application
- Prisma schema and migration files
- Seed script
- README with exact commands to:
  - Install dependencies
  - Run migrations
  - Seed the database
  - Start the development server
ß

---


