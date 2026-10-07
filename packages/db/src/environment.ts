import { config } from "dotenv";
import { fileURLToPath } from "node:url";

export const repositoryRoot = new URL("../../../", import.meta.url);

export function assertTestDatabase(databaseUrl: string | undefined) {
  if (!databaseUrl) {
    throw new Error("Set DATABASE_URL in .env.test or the test environment before running database tests.");
  }

  const url = new URL(databaseUrl);
  const databaseName = decodeURIComponent(url.pathname.slice(1));
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !/(^|[_-])test($|[_-])/i.test(databaseName)
  ) {
    throw new Error("Database tests require a separate database with 'test' in its name (for example pms_oms_test).");
  }
}

export function loadDatabaseEnvironment({
  root = repositoryRoot,
  environment = process.env,
}: {
  root?: URL;
  environment?: NodeJS.ProcessEnv;
} = {}) {
  const isTest = environment.NODE_ENV === "test";
  config({
    path: fileURLToPath(new URL(isTest ? ".env.test" : ".env", root)),
    processEnv: environment,
    // Bun can auto-load .env before imports. An explicit test file must win.
    // CI supplies DATABASE_URL directly and does not need an env file.
    override: isTest,
    quiet: true,
  });

  if (isTest) assertTestDatabase(environment.DATABASE_URL);
}
