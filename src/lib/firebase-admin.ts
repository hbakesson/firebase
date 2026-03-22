// @ts-nocheck
const modApp = "firebase-admin/app";
const modAuth = "firebase-admin/auth";
const modFirestore = "firebase-admin/firestore";

const { getApps, initializeApp, cert } = require(modApp);
const { getAuth } = require(modAuth);
const { getFirestore } = require(modFirestore);

if (!getApps().length) {
  const privateKey = process.env.FB_ADMIN_PRIVATE_KEY
    ? process.env.FB_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  initializeApp({
    credential: cert({
      projectId: process.env.FB_ADMIN_PROJECT_ID,
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  });
}


import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

export const adminAuth = getAuth() as Auth;
export const adminDb = getFirestore() as Firestore;
