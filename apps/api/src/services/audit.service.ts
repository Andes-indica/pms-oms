import { prisma, Prisma, type AuditAction } from "@pms-oms/db";


type CreateAuditLogInput = {
  firmId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  message?: string;
  metadata?: Record<string, unknown>;
  actorUserId?: string;
};

export async function createAuditLog(
  input: CreateAuditLogInput,
  database: Pick<typeof prisma, "auditLog"> = prisma,
) {
  const metadata = {
    ...(input.metadata ?? {}),

    ...(input.actorUserId
      ? {
          actorUserId:
            input.actorUserId,
          actorType: "USER",
        }
      : {}),
  };

  return database.auditLog.create({
    data: {
      firmId: input.firmId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      message: input.message,
      actorUserId:
        input.actorUserId ??
        null,

      metadata:
        Object.keys(
          metadata,
        ).length > 0
          ? metadata as Prisma.InputJsonValue
          : undefined,
    },
  });
}
