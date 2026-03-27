/* eslint-disable */
import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

/**
 * During Next.js build time, PrismaClient requires a non-empty configuration.
 * In Prisma 7, providing a mock accelerateUrl is a workaround to satisfy the constructor
 * during static analysis without needing a real database connection.
 */
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

if (!isBuild) {
  console.log("[PRISMA] Runtime initialization starting...");
  if (!process.env.DATABASE_URL) {
    console.error("[PRISMA ERROR] DATABASE_URL is missing from process.env at runtime!");
  } else {
    // Only log length/masked for security
    const maskedUrl = process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@");
    console.log(`[PRISMA] DATABASE_URL found: ${maskedUrl.substring(0, 50)}...`);
  }
}

export const prisma =
  globalForPrisma.prisma ||
  (isBuild
    ? new PrismaClient({
        accelerateUrl: "prisma://mock.prisma-accelerate.io/v1/mock",
      } as any)
    : new PrismaClient());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

