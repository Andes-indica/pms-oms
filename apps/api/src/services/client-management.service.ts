import {
  prisma,
} from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

const ACTIVE_ORDER_STATUSES = [
  "PENDING",
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
] as const;

type ClientInput = {
  name: string;
  email?: string | null;
};

function normalizeClientInput(
  input: ClientInput,
) {
  const name =
    input.name
      ?.trim();

  const email =
    input.email
      ?.trim() ||
    null;

  if (!name) {
    throw new Error(
      "CLIENT_NAME_REQUIRED",
    );
  }

  return {
    name,
    email,
  };
}

export async function createClientService(
  firmId: string,
  input: ClientInput,
) {
  const data =
    normalizeClientInput(
      input,
    );

  return prisma.client.create({
    data: {
      firmId,
      ...data,
    },
  });
}

export async function updateClientService(
  clientId: string,
  firmId: string,
  input: ClientInput,
) {
  const existing =
    await prisma.client.findFirst({
      where: {
        id: clientId,
        firmId,
        archivedAt: null,
      },
      select: {
        id: true,
      },
    });

  if (!existing) {
    throw new Error(
      "CLIENT_NOT_FOUND",
    );
  }

  const data =
    normalizeClientInput(
      input,
    );

  return prisma.client.update({
    where: {
      id: clientId,
    },
    data,
  });
}

export async function deleteClientService(
  clientId: string,
  firmId: string,
  actorUserId?: string,
) {
  const client =
    await prisma.client.findFirst({
      where: {
        id: clientId,
        firmId,
      },
      include: {
        brokerAccounts: {
          select: {
            id: true,
          },
        },
        portfolios: {
          select: {
            id: true,
          },
        },
      },
    });

  if (!client) {
    throw new Error(
      "CLIENT_NOT_FOUND",
    );
  }

  if (
    client.brokerAccounts.length >
      0 ||
    client.portfolios.length >
      0
  ) {
    throw new Error(
      "CLIENT_NOT_EMPTY",
    );
  }

  await prisma.$transaction(
    async (tx) => {
      await createAuditLog(
        {
          firmId,
          action:
            "CLIENT_DELETED",
          entityType:
            "CLIENT",
          entityId:
            client.id,
          message:
            "Unused client permanently deleted",
          actorUserId,
        },
        tx,
      );

      await tx.client.delete({
        where: {
          id: client.id,
        },
      });
    },
  );

  return {
    id: client.id,
    deleted: true,
  };
}

export async function archiveClientService(
  clientId: string,
  firmId: string,
  actorUserId?: string,
) {
  return prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Client"
        WHERE
          "id" = ${clientId}
          AND "firmId" = ${firmId}
        FOR UPDATE
      `;

      const client =
        await tx.client.findFirst({
          where: {
            id: clientId,
            firmId,
            archivedAt: null,
          },
          include: {
            portfolios: {
              include: {
                holdings: {
                  where: {
                    quantity: {
                      gt: 0,
                    },
                  },
                  select: {
                    id: true,
                  },
                },
                orders: {
                  where: {
                    status: {
                      in: [
                        ...ACTIVE_ORDER_STATUSES,
                      ],
                    },
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
            brokerAccounts: {
              include: {
                portfolioCashAllocations: {
                  where: {
                    cashBalance: {
                      gt: 0,
                    },
                  },
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        });

      if (!client) {
        throw new Error(
          "CLIENT_NOT_FOUND",
        );
      }

      if (
        client.portfolios.some(
          (portfolio) =>
            portfolio.holdings
              .length > 0,
        )
      ) {
        throw new Error(
          "CLIENT_HAS_OPEN_POSITIONS",
        );
      }

      if (
        client.portfolios.some(
          (portfolio) =>
            portfolio.orders
              .length > 0,
        )
      ) {
        throw new Error(
          "CLIENT_HAS_ACTIVE_ORDERS",
        );
      }

      if (
        client.brokerAccounts.some(
          (account) =>
            account
              .portfolioCashAllocations
              .length > 0,
        )
      ) {
        throw new Error(
          "CLIENT_HAS_ALLOCATED_CASH",
        );
      }

      const archivedAt =
        new Date();

      await tx.brokerConnection.updateMany({
        where: {
          brokerAccount: {
            clientId:
              client.id,
          },
        },
        data: {
          credentialsEncrypted:
            null,
          sessionEncrypted:
            null,
          externalUserId:
            null,
          sessionExpiresAt:
            null,
          status:
            "DISCONNECTED",
          lastConnectedAt:
            null,
        },
      });

      await tx.brokerAccount.updateMany({
        where: {
          clientId: client.id,
          archivedAt: null,
        },
        data: {
          archivedAt,
        },
      });

      await tx.portfolio.updateMany({
        where: {
          clientId: client.id,
          archivedAt: null,
        },
        data: {
          archivedAt,
        },
      });

      const archived =
        await tx.client.update({
          where: {
            id: client.id,
          },
          data: {
            archivedAt,
          },
        });

      await createAuditLog(
        {
          firmId,
          action:
            "CLIENT_ARCHIVED",
          entityType:
            "CLIENT",
          entityId:
            client.id,
          message:
            "Client archived after closure checks",
          actorUserId,
          metadata: {
            archivedAt:
              archivedAt.toISOString(),
            portfolios:
              client.portfolios.length,
            brokerAccounts:
              client.brokerAccounts.length,
          },
        },
        tx,
      );

      return archived;
    },
  );
}

export async function restoreClientService(
  clientId: string,
  firmId: string,
  actorUserId?: string,
) {
  return prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Client"
        WHERE
          "id" = ${clientId}
          AND "firmId" = ${firmId}
        FOR UPDATE
      `;

      const client =
        await tx.client.findFirst({
          where: {
            id: clientId,
            firmId,
            archivedAt: {
              not: null,
            },
          },
        });

      if (!client) {
        throw new Error(
          "CLIENT_NOT_FOUND",
        );
      }

      const restored =
        await tx.client.update({
          where: {
            id: client.id,
          },
          data: {
            archivedAt: null,
          },
        });

      await createAuditLog(
        {
          firmId,
          action:
            "CLIENT_RESTORED",
          entityType:
            "CLIENT",
          entityId:
            client.id,
          message:
            "Client restored; portfolios and broker accounts remain archived",
          actorUserId,
        },
        tx,
      );

      return restored;
    },
  );
}
