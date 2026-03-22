import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebase-admin";
import { createUserDocument, getUserRole } from "@/lib/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                returnSecureToken: true,
              }),
            }
          );

          if (!res.ok) return null;

          const data = await res.json();
          if (data.error) return null;

          const decoded = await adminAuth.verifyIdToken(data.idToken);
          return {
            id: decoded.uid,
            email: decoded.email ?? null,
            name: decoded.name ?? decoded.email ?? null,
            image: decoded.picture ?? null,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.id && user.email) {
        await createUserDocument(user.id, user.email, user.name ?? user.email);
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user?.id) {
        token.uid = user.id;
        token.role = await getUserRole(user.id);
      }
      if (trigger === "update" && token.uid) {
        token.role = await getUserRole(token.uid as string);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
