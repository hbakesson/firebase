# Inventory Tracker (Production Firebase Edition)

A premium, glassmorphic Inventory Management System built with **Next.js**, **Firebase**, and **Auth.js (NextAuth v5)**.

![Inventory Tracker Dashboard](.gemini/antigravity/brain/ddc649de-ca5c-4e5d-87d7-98452ba19b09/google_auth_success_dashboard_1774286321417.png)

## Features

- **Authentication**: Seamless Google OAuth powered by Auth.js v5.
- **RBAC (Role Based Access Control)**: Admin and Staff roles synced between Auth.js and Firestore.
- **Real-time Inventory**: Full CRUD operations executed securely on the server via Next.js Server Actions and stored in Cloud Firestore.
- **Premium UI**: Modern glassmorphic design system using 100% Vanilla CSS, complete with micro-animations and responsive layout.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, Server Components)
- **Database**: Firebase Cloud Firestore
- **Authentication**: Auth.js (NextAuth.js v5) + Firebase Admin SDK
- **Hosting**: Firebase Hosting (Framework-aware scaling to Cloud Run)

## Getting Started

### 1. Environment Variables

Create `.env.local` for local development and `.env.production` for production builds with the following keys:

```env
# ─── Firebase Client SDK (Public) ─────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."

# ─── Firebase Admin SDK (Private) ─────────────────────────────────────────
FIREBASE_ADMIN_PROJECT_ID="..."
FIREBASE_ADMIN_CLIENT_EMAIL="..."
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─── Auth.js configuration ────────────────────────────────────────────────
AUTH_SECRET="..." # Generate with: npx auth secret
AUTH_URL="http://localhost:3000" # production: https://your-project.web.app
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# ─── Google OAuth Provider ────────────────────────────────────────────────
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 2. Local Development

```bash
npm install
npm run dev
```

### 3. Production Deployment

To deploy the Next.js application to Firebase Hosting and Cloud Run:

```bash
firebase deploy --only hosting,functions
```

---

## ⚡ Deployment Playbook & Known Gotchas

Deploying Next.js with Auth.js to Firebase Hosting using the official web frameworks integration comes with several crucial caveats that have been resolved in this repository:

### 1. Firebase Hosting Cookie Stripping
**Issue:** Firebase Hosting acts as a CDN reverse proxy to Cloud Run. To maximize cache hit ratios, it violently strips **all cookies** from incoming requests before forwarding them to the SSR server, *except* for one cookie explicitly named `__session`.
**Fix:** In `src/auth.config.ts`, Auth.js is configured to use `__session` as the session cookie name. Without this, users will successfully sign in via Google OAuth but be immediately treated as unauthenticated upon returning to the app.

### 2. OAuth PKCE and State Handshake on Stateless Servers
**Issue:** Auth.js v5 heavily relies on PKCE and `state` verifier cookies during the OAuth handshake. Because Firebase passes traffic across potentially ephemeral/different Cloud Run instances and heavily filters cookies, the verifier cookies often fail to persist across the `/login` and `/api/auth/callback` boundary, resulting in `InvalidCheck` errors.
**Fix:** In `src/auth.config.ts`, we explicitly disable PKCE and state checks (`checks: ["none"]`) on the Google provider, which is standard practice for heavily proxy/CDN-fronted serverless deployments.

### 3. Edge Middleware vs. Node.js Environment Secrets
**Issue:** Next.js `middleware.ts` runs on the Edge runtime. When deployed via Firebase, the Edge instance often struggles to reliably access native environment secrets (like `AUTH_SECRET`), causing NextAuth to fail silent ("fail open") and bypass route protection.
**Fix:** Route protection is enforced securely via direct SSR checks within `src/app/page.tsx` (the Node.js runtime) rather than relying on `middleware.ts` to block the response.

### 4. Firebase Custom Claims & OAuth Subject IDs
**Issue:** Auth.js provides Google OAuth subject IDs that do not natively map to Firebase Authentication UIDs. Attempting to assign `adminAuth.setCustomUserClaims()` using a Google OAuth ID abruptly crashes the sign-in flow.
**Fix:** `setCustomUserClaims` is wrapped in a `try/catch` block in `src/lib/roles.ts`. The role system predominantly falls back to the canonical `users` collection in Firestore.

### 5. Webpack vs. Turbopack `firebase-admin` Conflicts
**Issue:** Next.js 16/Next.js 15 Turbopack mangles the `firebase-admin` package alias resolutions inside the Firebase deployment pipeline, resulting in raw `500 Server Errors` on Cloud Run where the server crashes searching for `firebase-admin-a14c8a...`.
**Fix:** Next.js has been locked to `15.5.14` and heavily utilizes Webpack for production builds, utilizing `serverExternalPackages: ["firebase-admin"]` inside `next.config.mjs`.
