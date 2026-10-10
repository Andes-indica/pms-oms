import type {
  NextFunction,
  Request,
  Response,
} from "express";

export function securityHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  );

  res.setHeader(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=()",
  );

  res.setHeader(
    "Referrer-Policy",
    "no-referrer",
  );

  res.setHeader(
    "X-Content-Type-Options",
    "nosniff",
  );

  res.setHeader(
    "X-Frame-Options",
    "DENY",
  );

  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  next();
}
