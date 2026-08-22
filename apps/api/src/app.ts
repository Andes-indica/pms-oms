import express from "express";
import cors from "cors";
import { prisma } from "@pms-oms/db";
import clientRoutes from "./routes/client.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

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
    
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/api/clients", clientRoutes);

export default app;