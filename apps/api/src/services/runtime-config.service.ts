function decodeBrokerKey(
  value: string,
) {
  try {
    return Buffer.from(
      value,
      "base64",
    );
  } catch {
    return Buffer.alloc(0);
  }
}

export function validateRuntimeConfig() {
  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    return;
  }

  const jwtSecret =
    process.env.JWT_SECRET
      ?.trim();

  if (
    !jwtSecret ||
    jwtSecret ===
      "change-me" ||
    jwtSecret.length < 32
  ) {
    throw new Error(
      "PRODUCTION_JWT_SECRET_INVALID",
    );
  }

  const brokerKey =
    process.env
      .BROKER_CREDENTIAL_ENCRYPTION_KEY
      ?.trim();

  if (
    !brokerKey ||
    decodeBrokerKey(
      brokerKey,
    ).length !== 32
  ) {
    throw new Error(
      "PRODUCTION_BROKER_ENCRYPTION_KEY_INVALID",
    );
  }

  const corsOrigins =
    process.env
      .CORS_ORIGINS
      ?.split(",")
      .map(
        (origin) =>
          origin.trim(),
      )
      .filter(Boolean);

  if (
    !corsOrigins ||
    corsOrigins.length === 0
  ) {
    throw new Error(
      "PRODUCTION_CORS_ORIGINS_REQUIRED",
    );
  }

  if (
    (
      process.env
        .MARKET_DATA_PROVIDER ??
      "mock"
    )
      .trim()
      .toLowerCase() ===
    "mock"
  ) {
    console.warn(
      "Production is using the mock market-data provider.",
    );
  }

  if (
    process.env
      .INSTRUMENT_MASTER_STRICT !==
    "true"
  ) {
    console.warn(
      "Production instrument-master strict validation is disabled.",
    );
  }
}
