import { prisma, Prisma, type AuditAction } from "@pms-oms/db";


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
