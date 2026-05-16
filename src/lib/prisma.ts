import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use an absolute path for the SQLite database to ensure consistency
const dbPath = path.join(process.cwd(), 'dev.db');
const dbUrl = `file:${dbPath}`;

// Ensure the environment variable is set for any internal lookups
process.env.DATABASE_URL = dbUrl;

const libsql = createClient({
  url: dbUrl,
});

const adapter = new PrismaLibSQL(libsql);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
