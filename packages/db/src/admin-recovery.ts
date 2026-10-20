import {
  prisma,
} from "./client";

export async function recoverAdministrator(
  emailInput: string,
) {
  const email =
    emailInput
      ?.trim()
      .toLowerCase();

  if (
    !email ||
    !email.includes("@")
  ) {
    throw new Error(
      "RECOVERY_ADMIN_EMAIL_INVALID",
    );
  }

  const candidate =
    await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firmId: true,
      },
    });

  if (!candidate) {
    throw new Error(
      "RECOVERY_USER_NOT_FOUND",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`
        SELECT pg_advisory_xact_lock(
          hashtext(
            ${`pms_oms_admin_recovery:${candidate.firmId}`}
          )
        )
      `;

      const user =
        await tx.user.findUnique({
          where: {
            id: candidate.id,
          },
        });

      if (
        !user ||
        user.status !==
          "ACTIVE" ||
        !user.passwordHash
      ) {
        throw new Error(
          "RECOVERY_USER_NOT_ACTIVE",
        );
      }

      const activeAdministrators =
        await tx.user.count({
          where: {
            firmId: user.firmId,
            role: "ADMIN",
            status: "ACTIVE",
          },
        });

      if (
        activeAdministrators > 0
      ) {
        throw new Error(
          "ACTIVE_ADMIN_ALREADY_EXISTS",
        );
      }

      const recovered =
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            role: "ADMIN",
            sessionVersion: {
              increment: 1,
            },
          },
          select: {
            id: true,
            email: true,
            firmId: true,
            role: true,
            sessionVersion: true,
          },
        });

      await tx.auditLog.create({
        data: {
          firmId:
            recovered.firmId,
          action:
            "ADMIN_RECOVERED",
          entityType:
            "USER",
          entityId:
            recovered.id,
          message:
            "Administrator recovered from the server terminal",
          metadata: {
            recoveryMethod:
              "TERMINAL_ZERO_ADMIN_GUARD",
            targetEmail:
              recovered.email,
            sessionsRevoked:
              true,
          },
        },
      });

      return recovered;
    },
  );
}
