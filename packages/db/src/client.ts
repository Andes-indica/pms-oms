import dotenv from "dotenv";
import path from "node:path";

if(!process.env.DATABASE_URL){
const envFile = process.env.NODE_ENV === "test" ? ".env.test":".env"; 
dotenv.config({
  path:path.resolve(
    process.cwd(),
    "../../",
    envFile,
  ),
});
}

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

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