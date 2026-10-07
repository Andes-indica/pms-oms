import {
  prisma,
} from "@pms-oms/db";

const ACTIVE_ORDER_STATUSES = [
  "PENDING",
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
] as const;

export async function updateBrokerAccountLabel(
  brokerAccountId: string,
  firmId: string,
  accountLabel:
    string | null,
) {
  const account =
    await prisma.brokerAccount.findFirst({
      where: {
        id:
          brokerAccountId,

        archivedAt:
          null,

        client: {
          firmId,
        },
      },

      select: {
        id: true,
      },
    });

  if (!account) {
    throw new Error(
      "BROKER_ACCOUNT_NOT_FOUND",
    );
  }

  return prisma.brokerAccount.update({
    where: {
      id: account.id,
    },

    data: {
      accountLabel:
        accountLabel
          ?.trim() ||
        null,
    },
  });
}

export async function archiveBrokerAccount(
  brokerAccountId: string,
  firmId: string,
) {
  const account =
    await prisma.brokerAccount.findFirst({
      where: {
        id:
          brokerAccountId,

        archivedAt:
          null,

        client: {
          firmId,
        },
      },

      include: {
        holdings: {
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
    });

  if (!account) {
    throw new Error(
      "BROKER_ACCOUNT_NOT_FOUND",
    );
  }

  if (
    account.holdings.length >
    0
  ) {
    throw new Error(
      "BROKER_ACCOUNT_HAS_HOLDINGS",
    );
  }

  if (
    account.orders.length >
    0
  ) {
    throw new Error(
      "BROKER_ACCOUNT_HAS_ACTIVE_ORDERS",
    );
  }

  if (
    account
      .portfolioCashAllocations
      .length >
    0
  ) {
    throw new Error(
      "BROKER_ACCOUNT_HAS_ALLOCATED_CASH",
    );
  }

  return prisma.$transaction(
    async (tx) => {
      await tx.brokerConnection.updateMany({
        where: {
          brokerAccountId:
            account.id,
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

      return tx.brokerAccount.update({
        where: {
          id:
            account.id,
        },

        data: {
          archivedAt:
            new Date(),
        },
      });
    },
  );
}

export async function disconnectBrokerAccount(
  brokerAccountId: string,
  firmId: string,
) {
  const account =
    await prisma.brokerAccount.findFirst({
      where: {
        id:
          brokerAccountId,

        archivedAt:
          null,

        client: {
          firmId,
        },
      },

      select: {
        id: true,
      },
    });

  if (!account) {
    throw new Error(
      "BROKER_ACCOUNT_NOT_FOUND",
    );
  }

  const connection =
    await prisma.brokerConnection.findUnique({
      where: {
        brokerAccountId:
          account.id,
      },
    });

  if (!connection) {
    return {
      brokerAccountId:
        account.id,

      status:
        "DISCONNECTED",
    };
  }

  const updated =
    await prisma.brokerConnection.update({
      where: {
        brokerAccountId:
          account.id,
      },

      data: {
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

  return {
    brokerAccountId:
      account.id,

    status:
      updated.status,
  };
}
