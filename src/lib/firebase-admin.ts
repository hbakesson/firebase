import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore, FieldValue } from "firebase-admin/firestore";

let _app: App | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getAdminApp(): App {
  if (_app) return _app;

  if (getApps().length > 0) {
    _app = getApps()[0];
    return _app;
  }

  const privateKey = process.env.FB_ADMIN_PRIVATE_KEY
    ? process.env.FB_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  _app = initializeApp({
    credential: cert({
      projectId: process.env.FB_ADMIN_PROJECT_ID,
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  });

  return _app;
}

export function getAdminAuth(): Auth {
  if (!_auth) _auth = getAuth(getAdminApp());
  return _auth;
}

export function getAdminDb(): Firestore {
  if (!_db) _db = getFirestore(getAdminApp());
  return _db;
}

// Keep backward-compatible named exports for existing code
export const adminAuth = new Proxy({} as Auth, {
  get(_t, prop) {
    return (getAdminAuth() as unknown as Record<string, unknown>)[prop as string];
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_t, prop) {
    return (getAdminDb() as unknown as Record<string, unknown>)[prop as string];
  },
});

export { FieldValue };
