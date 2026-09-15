import type { Request, Response } from "express";
import { prisma } from "@pms-oms/db";

export async function getAuditLogs(
  _req: Request,
  res: Response,
) {
  try {
    const logs = await prisma.auditLog.findMany({
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