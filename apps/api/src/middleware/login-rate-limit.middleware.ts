import type {
  NextFunction,
  Request,
  Response,
} from "express";

type AttemptWindow = {
  count: number;
  resetAt: number;
};

type LoginRateLimiterOptions = {
  maxAttempts?: number;
  windowMs?: number;
  now?: () => number;
};

const DEFAULT_MAX_ATTEMPTS =
  10;

const DEFAULT_WINDOW_MS =
  15 * 60 * 1_000;

const MAX_TRACKED_CLIENTS =
  10_000;

function readPositiveInteger(
  value: string | undefined,
  fallback: number,
) {
  const parsed =
    Number(value);

  return Number.isInteger(
    parsed,
  ) && parsed > 0
    ? parsed
    : fallback;
}

export function createLoginRateLimiter(
  options:
    LoginRateLimiterOptions = {},
) {
  const maxAttempts =
    options.maxAttempts ??
    readPositiveInteger(
      process.env
        .LOGIN_RATE_LIMIT_MAX_ATTEMPTS,
      DEFAULT_MAX_ATTEMPTS,
    );

  const windowMs =
    options.windowMs ??
    readPositiveInteger(
      process.env
        .LOGIN_RATE_LIMIT_WINDOW_MS,
      DEFAULT_WINDOW_MS,
    );

  const now =
    options.now ?? Date.now;

  const attempts =
    new Map<
      string,
      AttemptWindow
    >();

  return function loginRateLimit(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const currentTime =
      now();

    if (
      attempts.size >=
      MAX_TRACKED_CLIENTS
    ) {
      for (
        const [key, value]
        of attempts
      ) {
        if (
          value.resetAt <=
          currentTime
        ) {
          attempts.delete(
            key,
          );
        }
      }

      if (
        attempts.size >=
        MAX_TRACKED_CLIENTS
      ) {
        const oldestKey =
          attempts.keys()
            .next().value;

        if (
          oldestKey !==
          undefined
        ) {
          attempts.delete(
            oldestKey,
          );
        }
      }
    }

    const key =
      req.ip ||
      req.socket
        .remoteAddress ||
      "unknown";

    const existing =
      attempts.get(key);

    const attemptWindow =
      !existing ||
      existing.resetAt <=
        currentTime
        ? {
            count: 0,
            resetAt:
              currentTime +
              windowMs,
          }
        : existing;

    const retryAfterSeconds =
      Math.max(
        1,
        Math.ceil(
          (
            attemptWindow
              .resetAt -
            currentTime
          ) /
          1_000,
        ),
      );

    res.setHeader(
      "RateLimit-Limit",
      String(
        maxAttempts,
      ),
    );

    res.setHeader(
      "RateLimit-Reset",
      String(
        retryAfterSeconds,
      ),
    );

    if (
      attemptWindow.count >=
      maxAttempts
    ) {
      res.setHeader(
        "Retry-After",
        String(
          retryAfterSeconds,
        ),
      );

      return res
        .status(429)
        .json({
          error:
            "Too many login attempts. Try again later.",
        });
    }

    attemptWindow.count += 1;

    attempts.set(
      key,
      attemptWindow,
    );

    res.setHeader(
      "RateLimit-Remaining",
      String(
        Math.max(
          0,
          maxAttempts -
            attemptWindow.count,
        ),
      ),
    );

    next();
  };
}

export const loginRateLimit =
  createLoginRateLimiter();
