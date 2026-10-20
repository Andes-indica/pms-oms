import type { Response } from "express";
import { prisma } from "@pms-oms/db";
import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";
import {
  createClientService,
  updateClientService,
  deleteClientService,
  archiveClientService,
  restoreClientService,
} from "../services/client-management.service";

export async function getClients(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const clients = await prisma.client.findMany({
      where: {
        firmId: req.user.firmId,
        ...(req.query?.archived ===
        "true"
          ? {
              archivedAt: {
                not: null,
              },
            }
          : {
              archivedAt: null,
            }),
      },
      include: {
        brokerAccounts: {
          where: {
            archivedAt: null,
          },
        },
      portfolios:{
        where: {
          archivedAt: null,
        },
        include:{
          holdings:true,
        },
      },
    },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: clients,
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);

    return res.status(500).json({
      error: "Failed to fetch clients",
    });
  }
}

export async function getClientById(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const client = await prisma.client.findFirst({
      where: {
        id: req.params.id,
        firmId: req.user.firmId,
      },
      include: {
        brokerAccounts: {
          where: {
            archivedAt: null,
          },
        },
        portfolios: {
          where: {
            archivedAt: null,
          },
          include: {
            holdings: true,
          },
        },
      },
    });

    if (!client) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    return res.status(200).json({
      data: client,
    });
  } catch (error) {
    console.error("Failed to fetch client:", error);

    return res.status(500).json({
      error: "Failed to fetch client",
    });
  }
}
export async function getClientPortfolioSummary(
  req: AuthenticatedRequest & { params: { id: string } },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const { id } = req.params;

    const client = await prisma.client.findFirst({
      where: {
        id,
        firmId: req.user.firmId,
      },
      include: {
        portfolios: {
          where: {
            archivedAt: null,
          },
          include: {
            holdings: true,
            orders: {
              where: {
                status: "FILLED",
              },
            },
          },
        },
      },
    });

    if (!client) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    const portfolios = client.portfolios.map(
      (portfolio) => {
        const realizedPnl =
          portfolio.orders.reduce(
            (total, order) =>
              total +
              Number(order.realizedPnl ?? 0),
            0,
          );

        return {
          id: portfolio.id,
          name: portfolio.name,
          holdings: portfolio.holdings,
          realizedPnl,
        };
      },
    );

    return res.status(200).json({
      data: {
        clientId: client.id,
        clientName: client.name,
        portfolios,
      },
    });
  } catch (error) {
    console.error(
      "Failed to fetch portfolio summary:",
      error,
    );

    return res.status(500).json({
      error: "Failed to fetch portfolio summary",
    });
  }
}

export async function getClientOverview(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const client =
      await prisma.client.findFirst({
        where: {
          id: req.params.id,
          firmId: req.user.firmId,
        },

        include: {
          _count: {
            select: {
              brokerAccounts: true,
              portfolios: true,
            },
          },

          brokerAccounts: {
            where: {
              archivedAt: null,
            },

            select :{
              id:true,
              broker:true,
              accountId:true,
              accountLabel:true,

              connection:{
                select:{
                  status:true,
                  externalUserId:true,
                  sessionExpiresAt:true,
                  lastConnectedAt:true
                }
              }
            }
          },

          portfolios: {
            include: {
              holdings: true,

              _count: {
                select: {
                  holdings: true,
                  orders: true,
                  cashTransactions: true,
                  allocations: true,
                },
              },

              riskLimit: true,

              orders: {
                include: {
                  executions:{
                    orderBy:{
                      executedAt :"asc",
                    },
                  },
                },
                orderBy: {
                  createdAt: "desc",
                },

                take: 10,
              },
            },
          },
        },
      });

    if (!client) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    const portfolios =
      client.portfolios.map(
        (portfolio) => {
          const realizedPnl =
            portfolio.orders.reduce(
              (total, order) =>
                total +
                Number(
                  order.realizedPnl ??
                    0,
                ),
              0,
            );

          const {
            _count,
            ...portfolioData
          } = portfolio;

          return {
            ...portfolioData,
            realizedPnl,
            canDeletePermanently:
              _count.holdings === 0 &&
              _count.orders === 0 &&
              _count.cashTransactions === 0 &&
              _count.allocations === 0,
          };
        },
      );

    const totalCash =
      portfolios.reduce(
        (total, portfolio) =>
          portfolio.archivedAt
            ? total
            : total +
              Number(
                portfolio.cashBalance,
              ),
        0,
      );

    const totalRealizedPnl =
      portfolios.reduce(
        (total, portfolio) =>
          portfolio.archivedAt
            ? total
            : total +
              portfolio.realizedPnl,
        0,
      );

    return res.status(200).json({
      data: {
        id: client.id,
        name: client.name,
        email: client.email,
        archivedAt:
          client.archivedAt,

        brokerAccounts:
          client.brokerAccounts,

        totalCash,
        totalRealizedPnl,

        canDeletePermanently:
          client._count.portfolios === 0 &&
          client._count.brokerAccounts === 0,

        portfolios,
      },
    });
  } catch (error) {
    console.error(
      "Failed to fetch client overview:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to fetch client overview",
    });
  }
}

export async function createClient(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const client =
      await createClientService(
        req.user.firmId,
        req.body,
      );

    return res.status(201).json({
      data: client,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "CLIENT_NAME_REQUIRED"
    ) {
      return res.status(400).json({
        error:
          "Client name is required",
      });
    }

    console.error(
      "Failed to create client:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to create client",
    });
  }
}

export async function updateClient(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const client =
      await updateClientService(
        req.params.id,
        req.user.firmId,
        req.body,
      );

    return res.status(200).json({
      data: client,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "CLIENT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Client not found",
      });
    }

    if (
      message ===
      "CLIENT_NAME_REQUIRED"
    ) {
      return res.status(400).json({
        error:
          "Client name is required",
      });
    }

    console.error(
      "Failed to update client:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to update client",
    });
  }
}

export async function deleteClient(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error:
          "Authentication required",
      });
    }

    const result =
      await deleteClientService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "UNKNOWN_ERROR";

    if (
      message ===
      "CLIENT_NOT_FOUND"
    ) {
      return res.status(404).json({
        error:
          "Client not found",
      });
    }

    if (
      message ===
      "CLIENT_NOT_EMPTY"
    ) {
      return res.status(409).json({
        error:
          "Remove portfolios and broker accounts before deleting this client",
      });
    }

    console.error(
      "Failed to delete client:",
      error,
    );

    return res.status(500).json({
      error:
        "Failed to delete client",
    });
  }
}

function clientLifecycleError(
  res: Response,
  error: unknown,
) {
  const message =
    error instanceof Error
      ? error.message
      : "UNKNOWN_ERROR";

  if (
    message ===
    "CLIENT_NOT_FOUND"
  ) {
    return res.status(404).json({
      error:
        "Client not found",
    });
  }

  const conflictMessages:
    Record<string, string> = {
    CLIENT_HAS_OPEN_POSITIONS:
      "Close or reconcile all client holdings before archiving",
    CLIENT_HAS_ACTIVE_ORDERS:
      "Wait for, cancel, or reconcile all active client orders before archiving",
    CLIENT_HAS_ALLOCATED_CASH:
      "Reduce all client broker cash allocations to zero before archiving",
  };

  if (conflictMessages[message]) {
    return res.status(409).json({
      error:
        conflictMessages[message],
      code: message,
    });
  }

  console.error(
    "Client lifecycle operation failed:",
    error,
  );

  return res.status(500).json({
    error:
      "Client lifecycle operation failed",
  });
}

export async function archiveClient(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const client =
      await archiveClientService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    return res.status(200).json({
      data: client,
    });
  } catch (error) {
    return clientLifecycleError(
      res,
      error,
    );
  }
}

export async function restoreClient(
  req: AuthenticatedRequest & {
    params: {
      id: string;
    };
  },
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const client =
      await restoreClientService(
        req.params.id,
        req.user.firmId,
        req.user.userId,
      );

    return res.status(200).json({
      data: client,
    });
  } catch (error) {
    return clientLifecycleError(
      res,
      error,
    );
  }
}
