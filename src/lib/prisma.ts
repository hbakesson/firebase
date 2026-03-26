import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Extremely lazy initialization using a Proxy to avoid ANY execution during build
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
    }
    return Reflect.get(globalForPrisma.prisma, prop, receiver);
  },
});
