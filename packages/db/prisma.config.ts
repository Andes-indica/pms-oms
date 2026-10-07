import { defineConfig, env } from "prisma/config";
import { loadDatabaseEnvironment } from "./src/environment";

loadDatabaseEnvironment();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
