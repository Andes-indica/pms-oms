import { prisma, Prisma } from "@pms-oms/db";

type AuditAction =
  | "ORDER_CREATED"
  | "ORDER_SUBMITTED"
  | "ORDER_FILLED"
  | "ORDER_CANCELLED"
  | "ORDER_REJECTED"
  | "ORDER_SYNCED"
  | "BASKET_CREATED"
  | "BASKET_SUBMITTED"
  | "BASKET_CANCELLED";

type CreateAuditLogInput = {
  action: AuditAction;
  entityType: string;
  entityId: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

export async function createAuditLog(
  input: CreateAuditLogInput,
) {
  return prisma.auditLog.create({
    data: {
      // The generated Prisma enum currently contains a typo for this value.
      action:
        input.action === "BASKET_CANCELLED"
          ? "BASKET_CAMCELLED"
          : input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      message: input.message,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}