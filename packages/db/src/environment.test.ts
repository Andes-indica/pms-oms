import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { assertTestDatabase, loadDatabaseEnvironment } from "./environment";

let directory: string;
let root: URL;
beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), "pms-db-env-"));
  root = pathToFileURL(`${directory}/`);
  await writeFile(join(directory, ".env"), "DATABASE_URL=postgresql://localhost/pms_oms\n");
});
afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe("database environment", () => {
  test("test file wins over an automatically loaded development URL", async () => {
    await writeFile(join(directory, ".env.test"), "DATABASE_URL=postgresql://localhost/pms_oms_test\n");
    const environment = { NODE_ENV: "test", DATABASE_URL: "postgresql://localhost/pms_oms" };
    loadDatabaseEnvironment({ root, environment });
    expect(environment.DATABASE_URL).toBe("postgresql://localhost/pms_oms_test");
  });

  test("accepts the CI test database without an env file", () => {
    const environment = { NODE_ENV: "test", DATABASE_URL: "postgresql://ci/pms_oms_test" };
    loadDatabaseEnvironment({ root, environment });
    expect(environment.DATABASE_URL).toBe("postgresql://ci/pms_oms_test");
  });

  test("does not fall back to the development file for tests", () => {
    expect(() => loadDatabaseEnvironment({ root, environment: { NODE_ENV: "test" } }))
      .toThrow("Set DATABASE_URL");
  });

  test("resolves the development file from the repository root, not cwd", () => {
    const environment: NodeJS.ProcessEnv = {};
    loadDatabaseEnvironment({ root, environment });
    expect(environment.DATABASE_URL).toBe("postgresql://localhost/pms_oms");
  });

  test("preserves an explicitly supplied production URL", () => {
    const environment = { NODE_ENV: "production", DATABASE_URL: "postgresql://deploy/pms_live" };
    loadDatabaseEnvironment({ root, environment });
    expect(environment.DATABASE_URL).toBe("postgresql://deploy/pms_live");
  });

  test("rejects cleanup against a development database", () => {
    expect(() => assertTestDatabase("postgresql://localhost/pms_oms")).toThrow("separate database");
    expect(() => assertTestDatabase("postgresql://localhost/contest")).toThrow("separate database");
  });
});
