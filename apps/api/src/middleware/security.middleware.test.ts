import {
  describe,
  expect,
  test,
} from "bun:test";

import express from "express";

import {
  createLoginRateLimiter,
} from "./login-rate-limit.middleware";

import {
  securityHeaders,
} from "./security-headers.middleware";

async function listen(
  app:
    ReturnType<
      typeof express
    >,
) {
  const server =
    await new Promise<
      ReturnType<
        typeof app.listen
      >
    >((resolve) => {
      const listening =
        app.listen(
          0,
          "127.0.0.1",
          () =>
            resolve(
              listening,
            ),
        );
    });

  const address =
    server.address();

  if (
    !address ||
    typeof address ===
      "string"
  ) {
    throw new Error(
      "TEST_SERVER_ADDRESS_UNAVAILABLE",
    );
  }

  return {
    server,
    baseUrl:
      `http://127.0.0.1:${address.port}`,
  };
}

describe(
  "API security middleware",
  () => {
    test(
      "sets defensive response headers",
      async () => {
        const app = express();

        app.use(
          securityHeaders,
        );

        app.get(
          "/",
          (_req, res) => {
            res.json({
              ok: true,
            });
          },
        );

        const {
          server,
          baseUrl,
        } = await listen(app);

        try {
          const response =
            await fetch(baseUrl);

          expect(
            response.headers.get(
              "x-content-type-options",
            ),
          ).toBe("nosniff");

          expect(
            response.headers.get(
              "x-frame-options",
            ),
          ).toBe("DENY");
        } finally {
          server.close();
        }
      },
    );

    test(
      "limits repeated login attempts by client IP",
      async () => {
        const app = express();

        app.post(
          "/login",
          createLoginRateLimiter({
            maxAttempts: 2,
            windowMs:
              60_000,
          }),
          (_req, res) => {
            res.status(401).json({
              error:
                "Invalid credentials",
            });
          },
        );

        const {
          server,
          baseUrl,
        } = await listen(app);

        try {
          const first =
            await fetch(
              `${baseUrl}/login`,
              {
                method: "POST",
              },
            );

          const second =
            await fetch(
              `${baseUrl}/login`,
              {
                method: "POST",
              },
            );

          const blocked =
            await fetch(
              `${baseUrl}/login`,
              {
                method: "POST",
              },
            );

          expect(
            first.status,
          ).toBe(401);

          expect(
            second.status,
          ).toBe(401);

          expect(
            blocked.status,
          ).toBe(429);

          expect(
            blocked.headers.get(
              "retry-after",
            ),
          ).toBe("60");
        } finally {
          server.close();
        }
      },
    );
  },
);
