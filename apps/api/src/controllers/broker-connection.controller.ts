import type {
  Response,
} from "express";

import {
  prisma,
} from "@pms-oms/db";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import {
  decryptBrokerData,
  encryptBrokerData,
} from "../security/broker-credential-crypto";

import {
  exchangeZerodhaSession,
  getZerodhaLoginUrl as createZerodhaLoginUrl,
} from "../services/zerodha-connection.services";

type BrokerAccountRequest =
  AuthenticatedRequest & {
    params: {
      brokerAccountId: string;
    };
  };

type ZerodhaCredentialsBody = {
  apiKey?: unknown;
  apiSecret?: unknown;
};

type ZerodhaSessionBody = {
  requestToken?: unknown;
};

type ZerodhaCredentials = {
  apiKey: string;
  apiSecret: string;
};

/*
 * Zerodha sessions expire around the next
 * 6:00 AM IST session boundary.
 *
 * IST has a fixed UTC offset of +05:30,
 * so no DST handling is required.
 */
function getNextZerodhaSessionExpiry(
  now = new Date(),
): Date {
  const IST_OFFSET_MS =
    (5 * 60 + 30) *
    60 *
    1000;

  /*
   * Shift UTC time into an artificial
   * "IST represented as UTC" value.
   */
  const istNow =
    new Date(
      now.getTime() +
        IST_OFFSET_MS,
    );

  /*
   * Construct today's 6 AM in that
   * artificial IST calendar.
   */
  let expiryUtcMs =
    Date.UTC(
      istNow.getUTCFullYear(),
      istNow.getUTCMonth(),
      istNow.getUTCDate(),
      6,
      0,
      0,
      0,
    ) -
    IST_OFFSET_MS;

  /*
   * If today's 6 AM has already passed,
   * use tomorrow's 6 AM.
   */
  if (
    expiryUtcMs <=
    now.getTime()
  ) {
    expiryUtcMs +=
      24 *
      60 *
      60 *
      1000;
  }

  return new Date(
    expiryUtcMs,
  );
}

async function findBrokerAccount(
  req: BrokerAccountRequest,
) {
  return prisma
    .brokerAccount
    .findFirst({
      where: {
        id:
          req.params
            .brokerAccountId,

        client: {
          firmId:
            req.user!.firmId,
        },
      },

      include: {
        connection: true,
      },
    });
}

function invalidInput(
  res: Response,
  error: string,
) {
  return res
    .status(400)
    .json({
      error,
    });
}

function ensureZerodhaAccount(
  broker: string,
) {
  if (
    broker.toUpperCase() !==
    "ZERODHA"
  ) {
    throw new Error(
      "BROKER_NOT_ZERODHA",
    );
  }
}

export async function configureZerodha(
  req: BrokerAccountRequest & {
    body:
      ZerodhaCredentialsBody;
  },
  res: Response,
) {
  const {
    apiKey,
    apiSecret,
  } = req.body ?? {};

  if (
    typeof apiKey !==
      "string" ||
    !apiKey.trim() ||
    typeof apiSecret !==
      "string" ||
    !apiSecret.trim()
  ) {
    return invalidInput(
      res,
      "apiKey and apiSecret are required",
    );
  }

  try {
    const account =
      await findBrokerAccount(
        req,
      );

    if (!account) {
      return res
        .status(404)
        .json({
          error:
            "Broker account not found",
        });
    }

    ensureZerodhaAccount(
      account.broker,
    );

    const encryptedCredentials =
      encryptBrokerData({
        apiKey:
          apiKey.trim(),

        apiSecret:
          apiSecret.trim(),
      });

    const connection =
      await prisma
        .brokerConnection
        .upsert({
          where: {
            brokerAccountId:
              account.id,
          },

          create: {
            brokerAccountId:
              account.id,

            credentialsEncrypted:
              encryptedCredentials,

            status:
              "DISCONNECTED",
          },

          update: {
            credentialsEncrypted:
              encryptedCredentials,

            /*
             * Changing API credentials
             * invalidates our saved
             * trading session.
             */
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

    return res
      .status(200)
      .json({
        data: {
          brokerAccountId:
            connection
              .brokerAccountId,

          status:
            connection.status,
        },
      });
  } catch (error) {
    if (
      error instanceof
        Error &&
      error.message ===
        "BROKER_NOT_ZERODHA"
    ) {
      return res
        .status(400)
        .json({
          error:
            "Broker account is not a Zerodha account",
        });
    }

    console.error(
      "Failed to configure Zerodha:",
      error,
    );

    return res
      .status(500)
      .json({
        error:
          "Failed to configure Zerodha",
      });
  }
}

export async function getZerodhaLoginUrl(
  req: BrokerAccountRequest,
  res: Response,
) {
  try {
    const account =
      await findBrokerAccount(
        req,
      );

    if (!account) {
      return res
        .status(404)
        .json({
          error:
            "Broker account not found",
        });
    }

    ensureZerodhaAccount(
      account.broker,
    );

    if (
      !account.connection
        ?.credentialsEncrypted
    ) {
      return res
        .status(409)
        .json({
          error:
            "Zerodha is not configured",
        });
    }

    const credentials =
      decryptBrokerData<
        ZerodhaCredentials
      >(
        account.connection
          .credentialsEncrypted,
      );

    const loginUrl =
      createZerodhaLoginUrl(
        credentials.apiKey,
      );

    return res
      .status(200)
      .json({
        data: {
          loginUrl,
        },
      });
  } catch (error) {
    if (
      error instanceof
        Error &&
      error.message ===
        "BROKER_NOT_ZERODHA"
    ) {
      return res
        .status(400)
        .json({
          error:
            "Broker account is not a Zerodha account",
        });
    }

    console.error(
      "Failed to create Zerodha login URL:",
      error,
    );

    return res
      .status(500)
      .json({
        error:
          "Failed to create Zerodha login URL",
      });
  }
}

export async function createZerodhaSession(
  req: BrokerAccountRequest & {
    body: ZerodhaSessionBody;
  },
  res: Response,
) {
  const {
    requestToken,
  } = req.body ?? {};

  if (
    typeof requestToken !==
      "string" ||
    !requestToken.trim()
  ) {
    return invalidInput(
      res,
      "requestToken is required",
    );
  }

  try {
    const account =
      await findBrokerAccount(
        req,
      );

    if (!account) {
      return res
        .status(404)
        .json({
          error:
            "Broker account not found",
        });
    }

    ensureZerodhaAccount(
      account.broker,
    );

    if (
      !account.connection
        ?.credentialsEncrypted
    ) {
      return res
        .status(409)
        .json({
          error:
            "Zerodha is not configured",
        });
    }

    const credentials =
      decryptBrokerData<
        ZerodhaCredentials
      >(
        account.connection
          .credentialsEncrypted,
      );

    const session =
      await exchangeZerodhaSession(
        credentials.apiKey,
        requestToken.trim(),
        credentials.apiSecret,
      );

    /*
     * Critical:
     *
     * The Zerodha user who logged in must
     * be the same account represented by
     * this PMS BrokerAccount.
     *
     * Otherwise Client A's broker record
     * could accidentally be connected to
     * Client B's real trading account.
     */
    if (
      session.userId
        .trim()
        .toUpperCase() !==
      account.accountId
        .trim()
        .toUpperCase()
    ) {
      throw new Error(
        "BROKER_ACCOUNT_ID_MISMATCH",
      );
    }

    const sessionExpiresAt =
      getNextZerodhaSessionExpiry();

    const connection =
      await prisma
        .brokerConnection
        .update({
          where: {
            brokerAccountId:
              account.id,
          },

          data: {
            sessionEncrypted:
              encryptBrokerData({
                accessToken:
                  session.accessToken,
              }),

            externalUserId:
              session.userId,

            sessionExpiresAt,

            status:
              "CONNECTED",

            lastConnectedAt:
              session.loginTime,
          },
        });

    return res
      .status(200)
      .json({
        data: {
          brokerAccountId:
            connection
              .brokerAccountId,

          externalUserId:
            connection
              .externalUserId,

          status:
            connection.status,

          sessionExpiresAt:
            connection
              .sessionExpiresAt,
        },
      });
  } catch (error) {
    if (
      error instanceof
        Error
    ) {
      if (
        error.message ===
        "BROKER_NOT_ZERODHA"
      ) {
        return res
          .status(400)
          .json({
            error:
              "Broker account is not a Zerodha account",
          });
      }

      if (
        error.message ===
        "BROKER_ACCOUNT_ID_MISMATCH"
      ) {
        return res
          .status(409)
          .json({
            error:
              "Authenticated Zerodha account does not match this broker account",
          });
      }
    }

    console.error(
      "Failed to create Zerodha session:",
      error,
    );

    return res
      .status(502)
      .json({
        error:
          "Failed to create Zerodha session",
      });
  }
}

export async function getBrokerConnection(
  req: BrokerAccountRequest,
  res: Response,
) {
  try {
    const account =
      await findBrokerAccount(
        req,
      );

    if (!account) {
      return res
        .status(404)
        .json({
          error:
            "Broker account not found",
        });
    }

    let status =
      account.connection
        ?.status ??
      "DISCONNECTED";

    /*
     * Do not report a stale CONNECTED
     * state after known session expiry.
     */
    if (
      account.connection
        ?.sessionExpiresAt &&
      account.connection
        .sessionExpiresAt <=
        new Date()
    ) {
      status =
        "EXPIRED";

      if (
        account.connection
          .status !==
        "EXPIRED"
      ) {
        await prisma
          .brokerConnection
          .update({
            where: {
              brokerAccountId:
                account.id,
            },

            data: {
              status:
                "EXPIRED",
            },
          });
      }
    }

    return res
      .status(200)
      .json({
        data: {
          brokerAccountId:
            account.id,

          broker:
            account.broker,

          accountId:
            account.accountId,

          status,

          externalUserId:
            account.connection
              ?.externalUserId ??
            null,

          sessionExpiresAt:
            account.connection
              ?.sessionExpiresAt ??
            null,

          lastConnectedAt:
            account.connection
              ?.lastConnectedAt ??
            null,
        },
      });
  } catch (error) {
    console.error(
      "Failed to fetch broker connection:",
      error,
    );

    return res
      .status(500)
      .json({
        error:
          "Failed to fetch broker connection",
      });
  }
}