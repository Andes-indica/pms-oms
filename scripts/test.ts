import { fileURLToPath } from "node:url";
import { loadDatabaseEnvironment, repositoryRoot } from "../packages/db/src/environment";

const mode = process.argv[2] ?? "all";
if (!["all", "unit", "integration"].includes(mode)) {
  throw new Error("Usage: bun scripts/test.ts [all|unit|integration]");
}

process.env.NODE_ENV = "test";
// Unit tests import the Prisma client but never connect to this placeholder.
if (mode === "unit") {
  process.env.DATABASE_URL = "postgresql://localhost:1/pms_oms_unit_test";
}
loadDatabaseEnvironment();

const root = fileURLToPath(repositoryRoot);
async function run(args: string[], cwd = root) {
  const child = Bun.spawn([process.execPath, ...args], {
    cwd,
    env: process.env,
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await child.exited;
  if (code !== 0) process.exit(code);
}

const databaseDirectory = fileURLToPath(new URL("packages/db/", repositoryRoot));
await run(["x", "prisma", "generate"], databaseDirectory);
if (mode !== "unit") {
  const url = new URL(process.env.DATABASE_URL!);
  console.log(`Preparing test database ${url.hostname}:${url.port || "5432"}${url.pathname}`);
  // A migration failure stops the run before any destructive fixture cleanup.
  await run(["x", "prisma", "migrate", "deploy"], databaseDirectory);
}

const files = Array.from(new Bun.Glob("{apps,packages}/**/*.test.ts").scanSync({ cwd: root }))
  .filter((file) => !file.includes("/node_modules/") && !file.includes("/generated/"))
  .filter((file) => mode === "all" || file.endsWith(".integration.test.ts") === (mode === "integration"))
  .sort()
  .map((file) => `./${file}`);
if (files.length === 0) throw new Error("No matching tests found");
await run(["test", ...files]);
