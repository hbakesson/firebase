/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const adapter = process.env.MOCK_DATABASE === 'true' ? undefined : PrismaAdapter(prisma as any);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: ["none"],
    }),
    Credentials({
      id: "credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
        };
      },
    }),
    Credentials({
      id: "guest",
      async authorize() {
        // Find or create a singular guest user
        let guestUser = await prisma.user.findFirst({
          where: { isGuest: true },
        });

        if (!guestUser) {
          // Ensure a default organization exists
          let defaultOrg = await prisma.organization.findFirst({
            where: { name: "Default Organization" },
          });

          if (!defaultOrg) {
            defaultOrg = await prisma.organization.create({
              data: { name: "Default Organization" },
            });
          }

          guestUser = await prisma.user.create({
            data: {
              name: "Guest User",
              email: "guest@example.com",
              isGuest: true,
              role: "user",
              organizationId: defaultOrg.id,
            },
          });
        }

        return {
          id: guestUser.id,
          email: guestUser.email,
          name: guestUser.name,
          role: guestUser.role,
          organizationId: guestUser.organizationId,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.uid = user.id;
        token.role = (user as any).role || "user";
        token.orgId = (user as any).organizationId;
      }
      if (trigger === "update" && token.uid) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.uid as string },
          select: { role: true, organizationId: true },
        });
        token.role = dbUser?.role ?? "user";
        token.orgId = dbUser?.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
        session.user.organizationId = token.orgId as string;
      }
      return session;
    },
  },
});
