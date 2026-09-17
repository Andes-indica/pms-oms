import { rm } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["src/server.ts"],
  outdir,
  target: "bun",
  minify: true,
  sourcemap: "linked",
  packages: "external",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

for (const output of result.outputs) {
  console.log(
    `${path.relative(process.cwd(), output.path)} ${(output.size / 1024).toFixed(1)} KB`,
  );
}
