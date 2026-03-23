import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// The middleware uses authConfig (no DB calls — Edge-safe).
// The `authorized` callback in authConfig decides: if no session → redirect to /login.
export default NextAuth(authConfig).auth;

export const config = {
  // Protect all routes except static assets and favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
