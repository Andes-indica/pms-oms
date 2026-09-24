import express from "express";
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
const app = express();

app.use(cors({
  origin:["http://localhost:5173", "http://127.0.0.0:5173","http://localhost:5174"],
  credentials:true,
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/portfolios",PortfolioRoutes,);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/broker-connections", brokerConnectionRoutes);
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

app.use("/api/orders",orderRoutes);
app.use("/api/audit-logs",auditRoutes);
app.use("/api/basket-orders",basketOrderRoutes);
export default app;