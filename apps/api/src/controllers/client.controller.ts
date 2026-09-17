import type { Response } from "express";
import { prisma } from "@pms-oms/db";
import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

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
      },
      include: {
        brokerAccounts: true,
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
        brokerAccounts: true,
        portfolios: {
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
