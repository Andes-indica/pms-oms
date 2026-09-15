import { prisma } from "@pms-oms/db";

type AuditAction =
  | "ORDER_CREATED"
  | "ORDER_SUBMITTED"
  | "ORDER_FILLED"
  | "ORDER_CANCELLED"
  | "ORDER_REJECTED"
  | "ORDER_SYNCED";

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
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      message: input.message,
      metadata: input.metadata,
    },
  });
}