/* eslint-disable */
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

/**
 * Prisma 7 Driver Adapter Pattern
 * This is the modern way to handle direct database connections in Prisma 7.
 */
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

const createPrismaClient = () => {
  if (isBuild) {
    console.log("[PRISMA] Build mode detected. Using mock client.");
    return new PrismaClient({
      accelerateUrl: "prisma://mock.prisma-accelerate.io/v1/mock",
    } as any);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("[PRISMA ERROR] DATABASE_URL is missing at runtime!");
    // Fallback to avoid complete crash during unexpected edge cases, 
    // though real DB calls will fail.
    return new PrismaClient();
  }

  console.log("[PRISMA] Runtime initialization with Driver Adapter starting...");
  const maskedUrl = databaseUrl.replace(/:[^:@]+@/, ":****@");
  console.log(`[PRISMA] Connecting to: ${maskedUrl.substring(0, 50)}...`);

  try {
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("[PRISMA ERROR] Failed to initialize Driver Adapter:", error);
    return new PrismaClient();
  }
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
