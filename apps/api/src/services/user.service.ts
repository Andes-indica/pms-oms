import {
  createHash,
  randomBytes,
} from "node:crypto";

import {
  prisma,
  type Prisma,
  type UserOnboardingTokenType,
} from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

export type UserRole =
  | "ADMIN"
  | "PORTFOLIO_MANAGER"
  | "OPERATIONS"
  | "VIEWER";

const INVITATION_TTL_MS =
  24 * 60 * 60 * 1_000;
const PASSWORD_RESET_TTL_MS =
  60 * 60 * 1_000;

function createToken() {
  return randomBytes(32)
    .toString("base64url");
}

function hashToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function normalizeToken(
  token: unknown,
) {
  if (
    typeof token !== "string" ||
    token.length < 32 ||
    token.length > 200 ||
    !/^[A-Za-z0-9_-]+$/.test(
      token,
    )
  ) {
    throw new Error(
      "USER_ONBOARDING_LINK_INVALID",
    );
  }

  return token;
}

function validatePassword(
  password: unknown,
) {
  if (
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 128
  ) {
    throw new Error(
      "PASSWORD_REQUIREMENTS_NOT_MET",
    );
  }

  return password;
}

function publicUserSelect() {
  return {
    id: true,
    name: true,
    email: true,
    role: true,
    status: true,
    firmId: true,
    invitedAt: true,
    activatedAt: true,
    disabledAt: true,
    passwordChangedAt: true,
    createdAt: true,
    updatedAt: true,
  } as const;
}

export async function createUserInvitationService(
  input: {
    firmId: string;
    actorUserId: string;
    name: string;
    email: string;
    role: UserRole;
  },
  now = new Date(),
) {
  const normalizedEmail =
    input.email
      .trim()
      .toLowerCase();
  const name =
    input.name.trim();

  if (!name) {
    throw new Error(
      "USER_NAME_REQUIRED",
    );
  }

  if (
    !normalizedEmail ||
    !normalizedEmail.includes("@")
  ) {
    throw new Error(
      "USER_EMAIL_INVALID",
    );
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email:
          normalizedEmail,
      },
    });

  if (existingUser) {
    throw new Error(
      "EMAIL_ALREADY_EXISTS",
    );
  }

  const token = createToken();
  const expiresAt = new Date(
    now.getTime() +
      INVITATION_TTL_MS,
  );

  const user =
    await prisma.$transaction(
      async (tx) => {
        const created =
          await tx.user.create({
            data: {
              name,
              email:
                normalizedEmail,
              passwordHash: null,
              role: input.role,
              status: "INVITED",
              invitedAt: now,
              firmId: input.firmId,
            },
            select:
              publicUserSelect(),
          });

        await tx
          .userOnboardingToken
          .create({
            data: {
              userId: created.id,
              type: "INVITATION",
              tokenHash:
                hashToken(token),
              expiresAt,
            },
          });

        await createAuditLog(
          {
            firmId: input.firmId,
            action: "USER_INVITED",
            entityType: "USER",
            entityId: created.id,
            message:
              "Staff invitation created",
            actorUserId:
              input.actorUserId,
            metadata: {
              email:
                normalizedEmail,
              role: input.role,
              expiresAt:
                expiresAt.toISOString(),
            },
          },
          tx,
        );

        return created;
      },
    );

  return {
    user,
    token,
    expiresAt,
  };
}

export async function getUsersService(
  firmId: string,
) {
  return prisma.user.findMany({
    where: {
      firmId,
    },
    select:
      publicUserSelect(),
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function ensureAdminCanBeChanged(
  user: {
    id: string;
    role: UserRole;
    status:
      | "INVITED"
      | "ACTIVE"
      | "DISABLED";
    firmId: string;
  },
  database: Pick<
    Prisma.TransactionClient,
    "user"
  >,
) {
  if (
    user.role !== "ADMIN" ||
    user.status !== "ACTIVE"
  ) {
    return;
  }

  const otherAdmins =
    await database.user.count({
      where: {
        firmId: user.firmId,
        role: "ADMIN",
        status: "ACTIVE",
        id: {
          not: user.id,
        },
      },
    });

  if (otherAdmins === 0) {
    throw new Error(
      "LAST_ACTIVE_ADMIN_REQUIRED",
    );
  }
}

export async function updateUserRoleService(
  userId: string,
  firmId: string,
  role: UserRole,
  actorUserId: string,
) {
  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`
        SELECT pg_advisory_xact_lock(
          hashtext(${`staff-admin:${firmId}`})
        )
      `;

      const user =
        await tx.user.findFirst({
          where: {
            id: userId,
            firmId,
          },
        });

      if (!user) {
        throw new Error(
          "USER_NOT_FOUND",
        );
      }

      if (
        user.id === actorUserId &&
        role !== "ADMIN"
      ) {
        throw new Error(
          "SELF_ROLE_CHANGE_NOT_ALLOWED",
        );
      }

      if (
        user.role === "ADMIN" &&
        role !== "ADMIN"
      ) {
        await ensureAdminCanBeChanged(
          user,
          tx,
        );
      }

      const updated =
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            role,
            sessionVersion: {
              increment: 1,
            },
          },
          select:
            publicUserSelect(),
        });

      await createAuditLog(
        {
          firmId,
          action:
            "USER_ROLE_CHANGED",
          entityType: "USER",
          entityId: user.id,
          message:
            "Staff role changed",
          actorUserId,
          metadata: {
            previousRole:
              user.role,
            role,
          },
        },
        tx,
      );

      return updated;
    },
  );
}

export async function setUserEnabledService(
  userId: string,
  firmId: string,
  enabled: boolean,
  actorUserId: string,
) {
  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`
        SELECT pg_advisory_xact_lock(
          hashtext(${`staff-admin:${firmId}`})
        )
      `;

      const user =
        await tx.user.findFirst({
          where: {
            id: userId,
            firmId,
          },
        });

      if (!user) {
        throw new Error(
          "USER_NOT_FOUND",
        );
      }

      if (
        !enabled &&
        user.id === actorUserId
      ) {
        throw new Error(
          "SELF_DISABLE_NOT_ALLOWED",
        );
      }

      if (!enabled) {
        await ensureAdminCanBeChanged(
          user,
          tx,
        );
      }

      const nextStatus =
        enabled
          ? user.passwordHash
            ? "ACTIVE"
            : "INVITED"
          : "DISABLED";

      const updated =
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            status: nextStatus,
            disabledAt:
              enabled
                ? null
                : new Date(),
            sessionVersion: {
              increment: 1,
            },
          },
          select:
            publicUserSelect(),
        });

      if (!enabled) {
        await tx.userOnboardingToken.updateMany({
          where: {
            userId: user.id,
            usedAt: null,
          },
          data: {
            usedAt: new Date(),
          },
        });
      }

      await createAuditLog(
        {
          firmId,
          action: enabled
            ? "USER_REACTIVATED"
            : "USER_DISABLED",
          entityType: "USER",
          entityId: user.id,
          message: enabled
            ? "Staff account reactivated"
            : "Staff account disabled",
          actorUserId,
        },
        tx,
      );

      return updated;
    },
  );
}

export async function revokeUserSessionsService(
  userId: string,
  firmId: string,
  actorUserId: string,
) {
  const user =
    await prisma.user.findFirst({
      where: {
        id: userId,
        firmId,
      },
    });

  if (!user) {
    throw new Error(
      "USER_NOT_FOUND",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      const updated =
        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            sessionVersion: {
              increment: 1,
            },
          },
          select:
            publicUserSelect(),
        });

      await createAuditLog(
        {
          firmId,
          action:
            "USER_SESSIONS_REVOKED",
          entityType: "USER",
          entityId: user.id,
          message:
            "All staff sessions revoked",
          actorUserId,
        },
        tx,
      );

      return updated;
    },
  );
}

async function createOnboardingToken(
  input: {
    userId: string;
    firmId: string;
    actorUserId: string;
    type: UserOnboardingTokenType;
    expiresAt: Date;
  },
) {
  const token = createToken();

  await prisma.$transaction(
    async (tx) => {
      await tx
        .userOnboardingToken
        .deleteMany({
          where: {
            userId: input.userId,
            type: input.type,
            usedAt: null,
          },
        });

      await tx
        .userOnboardingToken
        .create({
          data: {
            userId: input.userId,
            type: input.type,
            tokenHash:
              hashToken(token),
            expiresAt:
              input.expiresAt,
          },
        });

      await createAuditLog(
        {
          firmId: input.firmId,
          action:
            input.type === "INVITATION"
              ? "USER_INVITED"
              : "USER_PASSWORD_RESET_REQUESTED",
          entityType: "USER",
          entityId: input.userId,
          message:
            input.type ===
              "INVITATION"
              ? "Staff invitation regenerated"
              : "Staff password reset link created",
          actorUserId:
            input.actorUserId,
          metadata: {
            tokenType:
              input.type,
            expiresAt:
              input.expiresAt.toISOString(),
          },
        },
        tx,
      );
    },
  );

  return {
    token,
    expiresAt:
      input.expiresAt,
  };
}

export async function createUserPasswordLinkService(
  userId: string,
  firmId: string,
  actorUserId: string,
  now = new Date(),
) {
  const user =
    await prisma.user.findFirst({
      where: {
        id: userId,
        firmId,
      },
    });

  if (!user) {
    throw new Error(
      "USER_NOT_FOUND",
    );
  }

  if (user.status === "DISABLED") {
    throw new Error(
      "USER_DISABLED",
    );
  }

  const type:
    UserOnboardingTokenType =
    user.status === "INVITED"
      ? "INVITATION"
      : "PASSWORD_RESET";

  return createOnboardingToken({
    userId: user.id,
    firmId,
    actorUserId,
    type,
    expiresAt: new Date(
      now.getTime() +
        (
          type === "INVITATION"
            ? INVITATION_TTL_MS
            : PASSWORD_RESET_TTL_MS
        ),
    ),
  });
}

async function findOnboardingToken(
  token: unknown,
  now: Date,
) {
  const normalized =
    normalizeToken(token);
  const record =
    await prisma
      .userOnboardingToken
      .findUnique({
        where: {
          tokenHash:
            hashToken(
              normalized,
            ),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
              firmId: true,
            },
          },
        },
      });

  if (!record) {
    throw new Error(
      "USER_ONBOARDING_LINK_INVALID",
    );
  }

  if (
    record.usedAt ||
    record.expiresAt <= now
  ) {
    throw new Error(
      "USER_ONBOARDING_LINK_EXPIRED",
    );
  }

  if (
    record.user.status ===
      "DISABLED"
  ) {
    throw new Error(
      "ACCOUNT_DISABLED",
    );
  }

  if (
    record.type ===
      "INVITATION" &&
    record.user.status !==
      "INVITED"
  ) {
    throw new Error(
      "USER_ONBOARDING_LINK_INVALID",
    );
  }

  return record;
}

export async function getUserOnboardingSummary(
  token: unknown,
  now = new Date(),
) {
  const record =
    await findOnboardingToken(
      token,
      now,
    );

  return {
    type: record.type,
    name: record.user.name,
    email: record.user.email,
    expiresAt:
      record.expiresAt,
  };
}

export async function completeUserOnboardingService(
  token: unknown,
  password: unknown,
  now = new Date(),
) {
  const validPassword =
    validatePassword(password);
  const record =
    await findOnboardingToken(
      token,
      now,
    );
  const passwordHash =
    await Bun.password.hash(
      validPassword,
    );

  await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "UserOnboardingToken"
        WHERE "id" = ${record.id}
        FOR UPDATE
      `;

      const consumed =
        await tx
          .userOnboardingToken
          .updateMany({
            where: {
              id: record.id,
              usedAt: null,
              expiresAt: {
                gt: now,
              },
            },
            data: {
              usedAt: now,
            },
          });

      if (consumed.count === 0) {
        throw new Error(
          "USER_ONBOARDING_LINK_EXPIRED",
        );
      }

      const updated =
        await tx.user.update({
          where: {
            id: record.userId,
          },
          data: {
            passwordHash,
            status: "ACTIVE",
            activatedAt:
              record.type ===
                "INVITATION"
                ? now
                : undefined,
            passwordChangedAt:
              now,
            disabledAt: null,
            sessionVersion: {
              increment: 1,
            },
          },
        });

      await tx
        .userOnboardingToken
        .updateMany({
          where: {
            userId:
              record.userId,
            usedAt: null,
          },
          data: {
            usedAt: now,
          },
        });

      await createAuditLog(
        {
          firmId:
            record.user.firmId,
          action:
            record.type ===
              "INVITATION"
              ? "USER_ACTIVATED"
              : "USER_SESSIONS_REVOKED",
          entityType: "USER",
          entityId:
            record.userId,
          message:
            record.type ===
              "INVITATION"
              ? "Staff invitation accepted"
              : "Staff password reset completed",
          actorUserId:
            updated.id,
          metadata: {
            tokenType:
              record.type,
          },
        },
        tx,
      );
    },
  );

  return {
    status: "COMPLETED" as const,
    email: record.user.email,
  };
}
