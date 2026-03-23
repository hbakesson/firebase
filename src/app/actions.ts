"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ─── Types ──────────────────────────────────────────────────────────────────

export type Product = {
  id: string;
  name: string;
  sku: string | null;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

async function writeAuditLog(entry: {
  action: "CREATE" | "UPDATE" | "DELETE";
  productId: string;
  productName: string;
  previousValue?: number;
  newValue?: number;
}) {
  const session = await auth();
  await adminDb.collection("auditLogs").add({
    ...entry,
    userId: session?.user?.id ?? "unknown",
    userEmail: session?.user?.email ?? "unknown",
    timestamp: FieldValue.serverTimestamp(),
  });
}

// ─── Server Actions ──────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const snapshot = await adminDb
    .collection("inventory")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    sku: doc.data().sku ?? null,
    quantity: doc.data().quantity,
    createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    updatedAt: doc.data().updatedAt?.toDate() ?? new Date(),
    createdBy: doc.data().createdBy ?? "",
  }));
}

export async function addProduct(formData: FormData) {
  const session = await auth();
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const quantity = parseInt(formData.get("quantity") as string) || 0;

  if (!name) return { error: "Name is required" };

  const ref = adminDb.collection("inventory").doc();
  await ref.set({
    name,
    sku: sku || null,
    quantity: Math.max(0, quantity),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: session?.user?.id ?? "unknown",
  });

  await writeAuditLog({
    action: "CREATE",
    productId: ref.id,
    productName: name,
    newValue: quantity,
  });

  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Only admins can delete products." };
  }

  const doc = await adminDb.collection("inventory").doc(id).get();
  const name = doc.data()?.name ?? "Unknown";

  await adminDb.collection("inventory").doc(id).delete();

  await writeAuditLog({
    action: "DELETE",
    productId: id,
    productName: name,
  });

  revalidatePath("/");
}

export async function updateQuantity(id: string, amount: number) {
  const doc = await adminDb.collection("inventory").doc(id).get();
  if (!doc.exists) return;

  const current: number = doc.data()?.quantity ?? 0;
  const next = Math.max(0, current + amount);

  await adminDb.collection("inventory").doc(id).update({
    quantity: next,
    updatedAt: FieldValue.serverTimestamp(),
  });

  await writeAuditLog({
    action: "UPDATE",
    productId: id,
    productName: doc.data()?.name ?? "Unknown",
    previousValue: current,
    newValue: next,
  });

  revalidatePath("/");
}
