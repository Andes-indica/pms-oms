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
  firmId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

export async function createAuditLog(
  input: CreateAuditLogInput,
  database: Pick<typeof prisma, "auditLog"> = prisma,
) {
  return database.auditLog.create({
    data: {
      firmId: input.firmId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      message: input.message,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}
