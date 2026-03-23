import { adminAuth, adminDb } from "./firebase-admin";
import type { FieldValue } from "firebase-admin/firestore";

export const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Gets the role of a user from Firestore. Defaults to 'staff' if no role set.
 */
export async function getUserRole(uid: string): Promise<Role> {
  const doc = await adminDb.collection("users").doc(uid).get();
  if (!doc.exists) return ROLES.STAFF;
  const data = doc.data();
  return (data?.role as Role) ?? ROLES.STAFF;
}

/**
 * Sets a user's role in both Firestore and as a Firebase custom claim.
 * The custom claim is read by Firestore security rules.
 */
export async function setUserRole(uid: string, role: Role): Promise<void> {
  // Set custom claim on the Firebase Auth token
  await adminAuth.setCustomUserClaims(uid, { role });

  // Mirror the role in Firestore for easy querying
  await adminDb
    .collection("users")
    .doc(uid)
    .set({ role } as { role: Role; updatedAt?: FieldValue }, { merge: true });
}

/**
 * Creates a user document in Firestore when they first sign in.
 * Defaults to 'staff' role.
 */
export async function createUserDocument(
  uid: string,
  email: string,
  displayName: string
): Promise<void> {
  const ref = adminDb.collection("users").doc(uid);
  const doc = await ref.get();

  if (!doc.exists) {
    await ref.set({
      email,
      displayName,
      role: ROLES.STAFF,
      createdAt: new Date(),
    });
    // Set default custom claim — may fail if no matching Firebase Auth user
    // exists (e.g. OAuth-only users whose uid is a Google subject ID)
    try {
      await adminAuth.setCustomUserClaims(uid, { role: ROLES.STAFF });
    } catch {
      // Silently ignore — role is still stored in Firestore
    }
  }
}
