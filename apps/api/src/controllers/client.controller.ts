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