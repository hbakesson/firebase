# Inventory Tracker (Cloud Edition)

A premium, glassmorphic Inventory Management System built with **Next.js 15**, **Firebase**, and **NextAuth.js**.

![Walkthrough Recording](file:///Users/hbakesson/.gemini/antigravity/brain/2ac1c406-2bca-47f9-962a-251197c722ed/enable_firestore_api_final_fix_1774202819905.webp)

## Features

- **Authentication**: Google OAuth and Email/Password sign-in powered by NextAuth v5.
- **RBAC (Role Based Access Control)**: Admin and Staff roles with custom claims.
- **Real-time Inventory**: Full CRUD operations stored in Cloud Firestore.
- **Audit Logging**: Every action (CREATE, UPDATE, DELETE) is logged for transparency.
- **Premium UI**: Modern glassmorphic design system using Vanilla CSS.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: Cloud Firestore
- **Authentication**: NextAuth.js + Firebase Admin SDK
- **Hosting**: Firebase Hosting (Framework-aware)

## Getting Started

### 1. Environment Variables

Create a `.env` file at the root with the following:

```env
# Firebase Client SDK (Public)
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."

# Firebase Admin SDK (Private)
FIREBASE_ADMIN_PROJECT_ID="..."
FIREBASE_ADMIN_CLIENT_EMAIL="..."
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Development

```bash
npm install
npm run dev
```

### 3. Deployment

To deploy to Firebase Hosting:

```bash
firebase deploy
```

## Security Rules

The project includes pre-configured Firestore Security Rules in `firestore.rules`.
- Anyone can read/create/update inventory if signed in.
- **Only Admins** can delete products or manage user roles.
- Audit logs are append-only.
