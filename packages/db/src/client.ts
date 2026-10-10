import { loadDatabaseEnvironment } from "./environment";

loadDatabaseEnvironment();

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

import {
  getDatabaseConfig,
} from "./database-config";

const databaseConfig =
  getDatabaseConfig();

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
