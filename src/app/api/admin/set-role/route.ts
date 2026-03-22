import { adminAuth } from "@/lib/firebase-admin";
import { setUserRole } from "@/lib/roles";
import { auth } from "@/auth";
import { type NextRequest, NextResponse } from "next/server";
import type { Role } from "@/lib/roles";

/**
 * POST /api/admin/set-role
 * Body: { uid: string, role: "admin" | "staff" }
 *
 * Only callable by existing admins. Sets the role of another user.
 */
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { uid, role } = body as { uid: string; role: Role };

  if (!uid || !["admin", "staff"].includes(role)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    // Verify uid exists in Firebase Auth
    await adminAuth.getUser(uid);
    await setUserRole(uid, role);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
