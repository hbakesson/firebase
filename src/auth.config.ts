import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  useSecureCookies: false, // Prevent NextAuth from prefixing cookies with '__Secure-'
  cookies: {
    sessionToken: {
      name: `__session`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    // We remove explicit naming for callbackUrl, csrfToken, state, etc.
    // Firebase Hosting strips ALL cookies except '__session'.
    // By using 'checks: ["none"]' in the Google provider (auth.ts),
    // we bypass the need for these temporary handshaking cookies.
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({}), // Implementation in auth.ts
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      if (isOnLoginPage) {
        if (isLoggedIn) return true; // Let the login page handle the redirect to home or vice-versa
        return true; // Allow access to login if NOT logged in
      }

      // If not logged in, returning false will trigger NextAuth's default redirect to signIn page.
      // If logged in, return true to grant access.
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
