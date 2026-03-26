import "dotenv/config";
import { defineConfig } from "prisma/config";

// During build time, DATABASE_URL might be missing.
const databaseUrl = process.env["DATABASE_URL"] || "postgresql://mock:mock@localhost:5432/mock";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
