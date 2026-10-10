import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { prisma } from "@pms-oms/db";
import clientRoutes from "./routes/client.routes.ts";
import orderRoutes from "./routes/order.routes";
import auditRoutes from "./routes/audit.routes.ts";
import basketOrderRoutes from "./routes/basket-order.routes.ts";
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes";
import PortfolioRoutes from "./routes/portfolio.routes.ts";
import dashboardRoutes
  from "./routes/dashboard.routes";
import brokerConnectionRoutes
  from "./routes/broker-connection.routes";
import brokerAccountRoutes
  from "./routes/broker-account.routes";
import liveUpdateRoutes
  from "./routes/live-update.routes";
import instrumentRoutes
  from "./routes/instrument.routes";
import riskRoutes
  from "./routes/risk.routes";

import {
  securityHeaders,
} from "./middleware/security-headers.middleware";

import {
  getInstrumentMaster,
} from "./services/instrument-master.service";

const app = express();

const trustProxyHops =
  Number(
    process.env
      .TRUST_PROXY_HOPS ??
    (
      process.env.NODE_ENV ===
        "production"
        ? "1"
        : "0"
    ),
  );

if (
  Number.isInteger(
    trustProxyHops,
  ) && trustProxyHops > 0
) {
  app.set(
    "trust proxy",
    trustProxyHops,
  );
}

app.disable(
  "x-powered-by",
);

app.use(
  securityHeaders,
);

const defaultCorsOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
];

const corsOrigins =
  process.env.CORS_ORIGINS
    ?.split(",")
    .map(
      (origin) =>
        origin.trim(),
    )
    .filter(Boolean) ??
  defaultCorsOrigins;

app.use(cors({
  origin(
    origin,
    callback,
  ) {
    if (
      !origin ||
      corsOrigins.includes(
        origin,
      )
    ) {
      callback(
        null,
        true,
      );

      return;
    }

    callback(
      new Error(
        "CORS_ORIGIN_NOT_ALLOWED",
      ),
    );
  },

  credentials: true,
}));
app.use(express.json({
  limit: "256kb",
}));
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/portfolios",PortfolioRoutes,);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/broker-connections", brokerConnectionRoutes);
app.use(
  "/api",
  brokerAccountRoutes,
);
app.use(
  "/api/events",
  liveUpdateRoutes,
);
app.use(
  "/api/instruments",
  instrumentRoutes,
);
app.use(
  "/api/risk",
  riskRoutes,
);
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "pms-oms-api",
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(error);
    
    res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.get(
  "/ready",
  async (_req, res) => {
    try {
      await prisma
        .$queryRaw`SELECT 1`;

      const instruments =
        await getInstrumentMaster();

      if (
        instruments.length === 0
      ) {
        throw new Error(
          "INSTRUMENT_MASTER_EMPTY",
        );
      }

      res.json({
        status: "ready",
        database:
          "connected",
        instruments:
          instruments.length,
      });
    } catch (error) {
      console.error(
        "Readiness check failed:",
        error,
      );

      res.status(503).json({
        status: "not_ready",
      });
    }
  },
);

app.use("/api/clients", clientRoutes);

app.use("/api/orders",orderRoutes);
app.use("/api/audit-logs",auditRoutes);
app.use("/api/basket-orders",basketOrderRoutes);

app.use(
  (
    _req: Request,
    res: Response,
  ) => {
    res.status(404).json({
      error: "Route not found",
    });
  },
);

app.use(
  (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (
      error instanceof Error &&
      error.message ===
        "CORS_ORIGIN_NOT_ALLOWED"
    ) {
      return res.status(403).json({
        error:
          "Origin is not allowed",
      });
    }

    console.error(
      "Unhandled API error:",
      error,
    );

    return res.status(500).json({
      error:
        "Internal server error",
    });
  },
);

export default app;
