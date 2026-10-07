# Testing the existing PMS-OMS workflows

Install the locked dependencies with `bun install --frozen-lockfile`.

Copy `.env.test.example` to `.env.test` in the repository root and set its
`DATABASE_URL` to an existing, separate PostgreSQL test database. The database
name must contain `test` as a word separated by underscores or hyphens (for
example `pms_oms_test`). Integration tests delete their fixture data.

Run from the repository root:

```bash
bun run test:unit
bun run test:all
bun run typecheck
cd apps/api && bun run build
cd ../web && bun run build
```

`test:unit` excludes integration tests and needs no running database.
`test:all` and `test:integration` regenerate Prisma, apply the existing migrations
to the test database, and then run the selected tests. A failed migration stops
the command before tests start. No database is reset or recreated.

Both the Prisma CLI and the application resolve environment files from the
repository root. In test mode, `.env.test` overrides an automatically loaded
development URL. CI can supply a test `DATABASE_URL` without an env file.

To inspect the test database's migration state without changing it:

```bash
bun run db:status:test
```

To apply the existing test migrations separately:

```bash
bun run db:migrate:test
```

For the application database, use `bun run db:generate`, then run
`bunx prisma migrate deploy` from `packages/db` with the application environment.
Restart the API after regeneration and migration. Test setup only prepares the
test database; it does not migrate the application database.

Push to `main` only after tests, typecheck, and both builds pass for the commit.
