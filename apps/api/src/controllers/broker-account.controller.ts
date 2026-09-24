import type {
  Response,
} from "express";

import {
  prisma,
  Prisma,
} from "@pms-oms/db";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  isBrokerSupported,
} from "../brokers/broker-registry";

type CreateBrokerAccountBody = {
  broker?: unknown;
  accountId?: unknown;
  accountLabel?: unknown;
};

type RequestWithClientId =
  AuthenticatedRequest & {
    params: {
      clientId: string;
    };

    body:
      CreateBrokerAccountBody;
  };

export async function createBrokerAccount(
  req: RequestWithClientId,
  res: Response,
) {
  if (!req.user) {
    return res
      .status(401)
      .json({
        error:
          "Authentication required",
      });
  }

  const {
    broker,
    accountId,
    accountLabel,
  } = req.body ?? {};

  if (
    typeof broker !==
      "string" ||
    !broker.trim()
  ) {
    return res
      .status(400)
      .json({
        error:
          "broker is required",
      });
  }

  if (
    typeof accountId !==
      "string" ||
    !accountId.trim()
  ) {
    return res
      .status(400)
      .json({
        error:
          "accountId is required",
      });
  }

  if (
    accountLabel !==
      undefined &&
    accountLabel !==
      null &&
    typeof accountLabel !==
      "string"
  ) {
    return res
      .status(400)
      .json({
        error:
          "accountLabel must be a string",
      });
  }

  const normalizedBroker =
    broker
      .trim()
      .toUpperCase();

  const normalizedAccountId =
    accountId.trim();

  if (
    !isBrokerSupported(
      normalizedBroker,
    )
  ) {
    return res
      .status(400)
      .json({
        error:
          "Broker is not supported",
      });
  }

  try {
    const client =
      await prisma.client
        .findFirst({
          where: {
            id:
              req.params
                .clientId,

            firmId:
              req.user.firmId,
          },

          select: {
            id: true,
          },
        });

    if (!client) {
      return res
        .status(404)
        .json({
          error:
            "Client not found",
        });
    }

    const existing =
      await prisma
        .brokerAccount
        .findFirst({
          where: {
            broker:
              normalizedBroker,

            accountId:
              normalizedAccountId,
          },
        });

    if (existing) {
      return res
        .status(409)
        .json({
          error:
            "Broker account already exists",
        });
    }

    const brokerAccount =
      await prisma
        .brokerAccount
        .create({
          data: {
            broker:
              normalizedBroker,

            accountId:
              normalizedAccountId,

            accountLabel:
              typeof accountLabel ===
                "string" &&
              accountLabel.trim()
                ? accountLabel.trim()
                : null,

            clientId:
              client.id,
          },

          select: {
            id: true,
            broker: true,
            accountId: true,
            accountLabel: true,
            clientId: true,
            createdAt: true,
          },
        });

    return res
      .status(201)
      .json({
        data:
          brokerAccount,
      });
  } catch (error) {
    if (
      error instanceof
        Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res
        .status(409)
        .json({
          error:
            "Broker account already exists",
        });
    }

    console.error(
      "Failed to create broker account:",
      error,
    );

    return res
      .status(500)
      .json({
        error:
          "Failed to create broker account",
      });
  }
}