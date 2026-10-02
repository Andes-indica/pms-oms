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
import {
  supportsFunds,
  supportsHoldings,
  supportsPositions,
} from "@pms-oms/broker";

import {
  resolveBroker,
} from "../brokers/broker-registry";

import {
  reconcileBrokerHoldings,
  repairBrokerHolding
} from "../services/broker-reconciliation.service";

import {
    importBrokerHoldings,
} from "../services/broker-reconciliation.service";

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
type BrokerAccountRequest =
  AuthenticatedRequest & {
    params: {
      id: string;
    };
  };

type RepairReconciliationBody = {
  symbol?: unknown;
  exchange?: unknown;
  portfolioId?: unknown;
};

export async function getBrokerSnapshot(
  req: BrokerAccountRequest,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      error:
        "Authentication required",
    });
  }

  try {
    const broker =
      await resolveBroker(
        req.params.id,
        req.user.firmId,
      );

    const [
      holdings,
      positions,
      funds,
    ] =
      await Promise.all([
        supportsHoldings(
          broker,
        )
          ? broker.getHoldings()
          : Promise.resolve(null),

        supportsPositions(
          broker,
        )
          ? broker.getPositions()
          : Promise.resolve(null),

        supportsFunds(
          broker,
        )
          ? broker.getFunds()
          : Promise.resolve(null),
      ]);

    return res.json({
      data: {
        brokerAccountId:
          req.params.id,

        holdings,
        positions,
        funds,

        fetchedAt:
          new Date()
            .toISOString(),
      },
    });
  } catch (error) {
    console.error(
      "Failed to fetch broker snapshot:",
      error,
    );

    if (
      error instanceof Error
    ) {
      switch (
      error.message
      ) {
        case "BROKER_ACCOUNT_NOT_FOUND":
          return res
            .status(404)
            .json({
              error:
                "Broker account not found",
            });

        case "BROKER_NOT_CONNECTED":
          return res
            .status(409)
            .json({
              error:
                "Broker account is not connected",
            });

        case "BROKER_SESSION_EXPIRED":
          return res
            .status(409)
            .json({
              error:
                "Broker session has expired",
            });
      }
    }

    return res.status(502).json({
      error:
        "Failed to fetch broker snapshot",
    });
  }
}

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
export async function getBrokerReconciliation(
  req: BrokerAccountRequest,
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

  try {
    const reconciliation =
      await reconcileBrokerHoldings(
        req.params.id,
        req.user.firmId,
      );

    return res.json({
      data:
        reconciliation,
    });
  } catch (error) {
    console.error(
      "Broker reconciliation failed:",
      error,
    );

    if (
      error instanceof Error
    ) {
      switch (
      error.message
      ) {
        case "BROKER_ACCOUNT_NOT_FOUND":
          return res
            .status(404)
            .json({
              error:
                "Broker account not found",
            });

        case "BROKER_NOT_CONNECTED":
          return res
            .status(409)
            .json({
              error:
                "Broker account is not connected",
            });

        case "BROKER_SESSION_EXPIRED":
          return res
            .status(409)
            .json({
              error:
                "Broker session has expired",
            });

        case "BROKER_HOLDINGS_UNSUPPORTED":
          return res
            .status(400)
            .json({
              error:
                "Broker does not support holdings reconciliation",
            });
      }
    }

    return res
      .status(502)
      .json({
        error:
          "Failed to reconcile broker holdings",
      });
  }
}

export async function repairBrokerReconciliation(
  req:
    BrokerAccountRequest & {
      body:
        RepairReconciliationBody;
    },
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
    symbol,
    exchange,
    portfolioId,
  } = req.body ?? {};

  if (
    typeof symbol !==
      "string" ||
    typeof exchange !==
      "string" ||
    typeof portfolioId !==
      "string"
  ) {
    return res
      .status(400)
      .json({
        error:
          "symbol, exchange and portfolioId are required",
      });
  }

  try {
    const result =
      await repairBrokerHolding(
        req.params.id,
        req.user.firmId,
        {
          symbol,
          exchange,
          portfolioId,
        },
      );

    return res.json({
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error
    ) {
      switch (
        error.message
      ) {
        case "BROKER_ACCOUNT_NOT_FOUND":
          return res
            .status(404)
            .json({
              error:
                "Broker account not found",
            });

        case "RECONCILIATION_PORTFOLIO_INVALID":
          return res
            .status(400)
            .json({
              error:
                "Selected portfolio does not belong to this broker account's client",
            });

        case "RECONCILIATION_PORTFOLIO_MISMATCH":
          return res
            .status(409)
            .json({
              error:
                "This holding already belongs to a different PMS portfolio",
            });

        case "RECONCILIATION_ALLOCATION_REQUIRED":
          return res
            .status(409)
            .json({
              error:
                "Holding is split across multiple PMS portfolios and requires manual allocation",
            });

        case "BROKER_HOLDINGS_UNSUPPORTED":
          return res
            .status(400)
            .json({
              error:
                "Broker does not support holdings reconciliation",
            });

        case "BROKER_NOT_CONNECTED":
        case "BROKER_SESSION_EXPIRED":
          return res
            .status(409)
            .json({
              error:
                error.message,
            });
      }
    }

    console.error(
      "Broker reconciliation repair failed:",
      error,
    );

    return res
      .status(502)
      .json({
        error:
          "Failed to repair broker reconciliation",
      });
  }
}
export async function importBrokerAccountHoldings(
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
            await importBrokerHoldings(
                req.params.id,
                req.user.firmId,
                req.body,
            );

        return res.status(200).json({
            data: result,
        });
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "BROKER_ACCOUNT_NOT_FOUND":
                    return res.status(404).json({
                        error:
                            "Broker account not found",
                    });

                case "RECONCILIATION_PORTFOLIO_INVALID":
                    return res.status(400).json({
                        error:
                            "Invalid portfolio for broker account",
                    });

                case "BROKER_HOLDINGS_UNSUPPORTED":
                    return res.status(400).json({
                        error:
                            "Broker does not support holdings",
                    });

                case "BROKER_INVALID_HOLDINGS_RESPONSE":
                    return res.status(502).json({
                        error:
                            "Broker returned invalid holdings data",
                    });
            }
        }

        console.error(
            "Broker holdings import failed:",
            error,
        );

        return res.status(500).json({
            error:
                "Failed to import broker holdings",
        });
    }
}