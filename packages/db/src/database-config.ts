type DatabaseEnvironment =
  {
    DATABASE_URL?: string;
    DATABASE_POOL_MAX?: string;
    DATABASE_CONNECTION_TIMEOUT_MS?:
      string;
    DATABASE_IDLE_TIMEOUT_MS?:
      string;
  };

function readInteger(
  environment:
    DatabaseEnvironment,
  key:
    keyof DatabaseEnvironment,
  fallback: number,
  minimum: number,
) {
  const value =
    environment[key];

  if (
    value === undefined ||
    value.trim() === ""
  ) {
    return fallback;
  }

  const parsed =
    Number(value);

  if (
    !Number.isInteger(
      parsed,
    ) || parsed < minimum
  ) {
    throw new Error(
      `${key}_INVALID`,
    );
  }

  return parsed;
}

export function getDatabaseConfig(
  environment:
    DatabaseEnvironment =
    process.env as
      DatabaseEnvironment,
) {
  const connectionString =
    environment.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not defined",
    );
  }

  return {
    connectionString,

    max:
      readInteger(
        environment,
        "DATABASE_POOL_MAX",
        10,
        1,
      ),

    connectionTimeoutMillis:
      readInteger(
        environment,
        "DATABASE_CONNECTION_TIMEOUT_MS",
        5_000,
        100,
      ),

    idleTimeoutMillis:
      readInteger(
        environment,
        "DATABASE_IDLE_TIMEOUT_MS",
        30_000,
        1_000,
      ),

    /*
     * Prisma's query planner can execute independent branches concurrently on
     * one transaction connection. pg 8.23+ requires pipeline mode for that
     * supported flow, and pg 9 will reject the legacy implicit query queue.
     */
    pipeline: true,
  };
}
