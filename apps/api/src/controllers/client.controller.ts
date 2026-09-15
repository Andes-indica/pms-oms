import type { Request, Response } from "express";
import { prisma } from "@pms-oms/db";

export async function getClients(
  _req: Request,
  res: Response,
) {
  try {
    const clients = await prisma.client.findMany({
      include: {
        brokerAccounts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: clients,
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);

    res.status(500).json({
      error: "Failed to fetch clients",
    });
  }
}

export async function getClientById(
  req: Request<{id:string}>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: {
        id,
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
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: {
        id,
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