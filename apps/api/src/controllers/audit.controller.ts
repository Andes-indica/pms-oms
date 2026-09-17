import type { Response } from "express";
import { prisma } from "@pms-oms/db";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

export async function getAuditLogs(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const logs = await prisma.auditLog.findMany({
      where: {
        firmId: req.user.firmId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: logs,
    });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);

    return res.status(500).json({
      error: "Failed to fetch audit logs",
    });
  }
}
