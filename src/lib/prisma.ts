import "dotenv/config";
import { PrismaClient } from "@prisma/client";

/**
 * During Next.js build time (static analysis), environment variables like DATABASE_URL
 * might be missing or unpopulated in the build worker. PrismaClient requires a valid
 * connection string at construction time. We provide a mock fallback to prevent 
 * build-time initialization errors.
 */
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://mock:mock@localhost:5432/mock";
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
