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

function validateOptionalInteger(
  name: string,
  minimum: number,
  maximum: number,
) {
  const value =
    process.env[name];

  if (
    value === undefined
  ) {
    return;
  }

  const parsed =
    Number(value);

  if (
    !Number.isInteger(
      parsed,
    ) || parsed < minimum ||
    parsed > maximum
  ) {
    throw new Error(
      `PRODUCTION_${name}_INVALID`,
    );
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

  for (
    const origin of corsOrigins
  ) {
    let parsedOrigin:
      URL;

    try {
      parsedOrigin =
        new URL(origin);
    } catch {
      throw new Error(
        "PRODUCTION_CORS_ORIGIN_INVALID",
      );
    }

    if (
      parsedOrigin.protocol !==
        "https:" ||
      parsedOrigin.origin !==
        origin ||
      parsedOrigin.pathname !==
        "/"
    ) {
      throw new Error(
        "PRODUCTION_CORS_ORIGIN_INVALID",
      );
    }
  }

  if (
    (
      process.env
        .MARKET_DATA_PROVIDER ??
      "mock"
    )
      .trim()
      .toLowerCase() !==
    "http"
  ) {
    throw new Error(
      "PRODUCTION_MARKET_DATA_PROVIDER_INVALID",
    );
  }

  const marketDataBaseUrl =
    process.env
      .MARKET_DATA_BASE_URL
      ?.trim();

  if (!marketDataBaseUrl) {
    throw new Error(
      "PRODUCTION_MARKET_DATA_BASE_URL_REQUIRED",
    );
  }

  try {
    const parsedUrl =
      new URL(
        marketDataBaseUrl,
      );

    if (
      parsedUrl.protocol !==
        "https:" &&
      parsedUrl.protocol !==
        "http:"
    ) {
      throw new Error(
        "INVALID_PROTOCOL",
      );
    }
  } catch {
    throw new Error(
      "PRODUCTION_MARKET_DATA_BASE_URL_INVALID",
    );
  }

  if (
    process.env
      .INSTRUMENT_MASTER_STRICT !==
    "true"
  ) {
    throw new Error(
      "PRODUCTION_INSTRUMENT_MASTER_STRICT_REQUIRED",
    );
  }

  validateOptionalInteger(
    "MARKET_DATA_REQUEST_TIMEOUT_MS",
    100,
    60_000,
  );

  validateOptionalInteger(
    "BROKER_HTTP_TIMEOUT_MS",
    1_000,
    60_000,
  );

  validateOptionalInteger(
    "LOGIN_RATE_LIMIT_MAX_ATTEMPTS",
    1,
    1_000,
  );

  validateOptionalInteger(
    "LOGIN_RATE_LIMIT_WINDOW_MS",
    1_000,
    86_400_000,
  );

  validateOptionalInteger(
    "TRUST_PROXY_HOPS",
    0,
    10,
  );

  validateOptionalInteger(
    "SHUTDOWN_TIMEOUT_MS",
    5_000,
    120_000,
  );
}
