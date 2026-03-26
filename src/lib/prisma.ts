/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

/**
 * During Next.js build time, PrismaClient requires a non-empty configuration.
 * In Prisma 7, providing a mock accelerateUrl is a workaround to satisfy the constructor
 * during static analysis without needing a real database connection.
 */
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

export const prisma =
  globalForPrisma.prisma ||
  (isBuild
    ? new PrismaClient({
        accelerateUrl: "prisma://mock.prisma-accelerate.io/v1/mock",
      } as any)
    : new PrismaClient());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
