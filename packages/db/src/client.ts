import { loadDatabaseEnvironment } from "./environment";

loadDatabaseEnvironment();

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const databaseConfig = {
  connectionString,
  /*
   * Prisma's query planner can execute independent branches concurrently on
   * one transaction connection. pg 8.23+ requires pipeline mode for that
   * supported flow, and pg 9 will reject the legacy implicit query queue.
   */
  pipeline: true,
};

const adapter = new PrismaPg(
  databaseConfig,
);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
