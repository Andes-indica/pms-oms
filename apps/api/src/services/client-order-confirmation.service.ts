import {
  createHash,
  randomBytes,
} from "node:crypto";

import {
  prisma,
  type ClientConfirmationStatus,
} from "@pms-oms/db";

import {
  createZerodhaPublisherOrderTag,
} from "@pms-oms/broker";

import {
  createAuditLog,
} from "./audit.service";

import {
  getMarketPrice,
} from "./market-data.service";

import {
  runPreTradeChecks,
} from "./pre-trade.service";

import {
  runRiskChecks,
} from "./risk.service";

import {
  refreshBasketOrderStatus,
} from "./basket-status-refresh.service";

const ACTIVE_CONFIRMATION_STATUSES:
  ClientConfirmationStatus[] = [
    "AWAITING_CLIENT",
    "HANDOFF_STARTED",
  ];

const EXPIRABLE_CONFIRMATION_STATUSES:
  ClientConfirmationStatus[] = [
    "AWAITING_CLIENT",
  ];

const DEFAULT_TTL_MINUTES = 30;

function getPublisherApiKey() {
  const apiKey =
    process.env
      .ZERODHA_PUBLISHER_API_KEY
      ?.trim();

  if (!apiKey) {
    throw new Error(
      "ZERODHA_PUBLISHER_API_KEY_NOT_CONFIGURED",
    );
  }

  return apiKey;
}

function getConfirmationTtlMs() {
  const configured = Number(
    process.env
      .CLIENT_CONFIRMATION_TTL_MINUTES,
  );

  const minutes =
    Number.isInteger(configured) &&
    configured >= 5 &&
    configured <= 1_440
      ? configured
      : DEFAULT_TTL_MINUTES;

  return minutes * 60 * 1000;
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
      "CLIENT_CONFIRMATION_LINK_INVALID",
    );
  }

  return token;
}

function hashToken(
  token: string,
) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function createToken() {
  return randomBytes(32)
    .toString("base64url");
}

function maskAccountId(
  accountId: string,
) {
  const normalized =
    accountId.trim();

  if (normalized.length <= 4) {
    return normalized;
  }

  return `${"*".repeat(
    normalized.length - 4,
  )}${normalized.slice(-4)}`;
}

const confirmationInclude = {
  order: {
    include: {
      portfolio: {
        include: {
          client: true,
        },
      },
      brokerAccount: {
        select: {
          broker: true,
          accountId: true,
          accountLabel: true,
        },
      },
      basketOrder: true,
    },
  },
} as const;

async function findConfirmation(
  token: unknown,
) {
  const normalizedToken =
    normalizeToken(token);

  const confirmation =
    await prisma
      .clientOrderConfirmation
      .findUnique({
        where: {
          tokenHash:
            hashToken(
              normalizedToken,
            ),
        },
        include:
          confirmationInclude,
      });

  if (!confirmation) {
    throw new Error(
      "CLIENT_CONFIRMATION_LINK_INVALID",
    );
  }

  return confirmation;
}

async function expireIfNeeded(
  confirmation:
    Awaited<
      ReturnType<
        typeof findConfirmation
      >
    >,
  now: Date,
) {
  if (
    confirmation.expiresAt > now ||
    !EXPIRABLE_CONFIRMATION_STATUSES
      .includes(
        confirmation.status,
      )
  ) {
    return confirmation;
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${confirmation.orderId}
        FOR UPDATE
      `;

      const expired = await tx
        .clientOrderConfirmation
        .updateMany({
          where: {
            id: confirmation.id,
            tokenHash:
              confirmation.tokenHash,
            status: {
              in:
                EXPIRABLE_CONFIRMATION_STATUSES,
            },
            expiresAt: {
              lte: now,
            },
          },
          data: {
            status: "EXPIRED",
            lastError:
              "CLIENT_CONFIRMATION_LINK_EXPIRED",
          },
        });

      if (expired.count === 0) {
        return;
      }

      await tx.order.update({
        where: {
          id:
            confirmation.orderId,
        },
        data: {
          reservedCash: 0,
          reservedQuantity: 0,
        },
      });
    },
  );

  return prisma
    .clientOrderConfirmation
    .findUniqueOrThrow({
      where: {
        id: confirmation.id,
      },
      include:
        confirmationInclude,
    });
}

function toPublicSummary(
  confirmation:
    Awaited<
      ReturnType<
        typeof findConfirmation
      >
    >,
) {
  const { order } =
    confirmation;

  return {
    status:
      confirmation.status,
    expiresAt:
      confirmation.expiresAt,
    confirmedAt:
      confirmation.confirmedAt,
    lastError:
      confirmation.lastError,
    canHandoff:
      confirmation.status ===
      "AWAITING_CLIENT",
    canDecline:
      confirmation.status ===
      "AWAITING_CLIENT",
    order: {
      id: order.id,
      symbol: order.symbol,
      exchange: order.exchange,
      side: order.side,
      orderType:
        order.orderType,
      quantity: order.quantity,
      limitPrice:
        order.limitPrice,
      clientName:
        order.portfolio.client
          .name,
      portfolioName:
        order.portfolio.name,
      broker:
        order.brokerAccount
          .broker,
      brokerAccountLabel:
        order.brokerAccount
          .accountLabel ??
        "Zerodha account",
      maskedBrokerAccountId:
        maskAccountId(
          order.brokerAccount
            .accountId,
        ),
      basketName:
        order.basketOrder
          ?.name ?? null,
    },
  };
}

export async function getClientOrderConfirmation(
  token: unknown,
  now = new Date(),
) {
  const confirmation =
    await findConfirmation(
      token,
    );

  return toPublicSummary(
    await expireIfNeeded(
      confirmation,
      now,
    ),
  );
}

async function getEstimatedPrice(
  order: {
    orderType: "MARKET" | "LIMIT";
    limitPrice: unknown;
    symbol: string;
    exchange: string;
  },
) {
  if (
    order.orderType === "LIMIT"
  ) {
    const price = Number(
      order.limitPrice,
    );

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      throw new Error(
        "INVALID_LIMIT_PRICE",
      );
    }

    return price;
  }

  return getMarketPrice(
    order.symbol,
    order.exchange,
  );
}

export async function requestClientOrderConfirmation(
  orderId: string,
  firmId: string,
  actorUserId?: string,
  now = new Date(),
  replaceActive = false,
) {
  const existingOrder =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        portfolio: {
          client: {
            firmId,
          },
        },
      },
      include: {
        brokerAccount: true,
        clientConfirmation:
          true,
      },
    });

  if (!existingOrder) {
    throw new Error(
      "ORDER_NOT_FOUND",
    );
  }

  if (
    existingOrder.executionMode !==
      "CLIENT_CONFIRMATION"
  ) {
    throw new Error(
      "ORDER_NOT_CLIENT_CONFIRMED",
    );
  }

  if (
    existingOrder.status !==
      "PENDING" ||
    existingOrder.brokerOrderId
  ) {
    throw new Error(
      "ORDER_NOT_PENDING",
    );
  }

  if (
    existingOrder.brokerAccount
      .broker.toUpperCase() !==
      "ZERODHA"
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_BROKER_UNSUPPORTED",
    );
  }

  getPublisherApiKey();

  let existingConfirmationStatus =
    existingOrder
      .clientConfirmation
      ?.status;

  if (
    existingOrder
      .clientConfirmation &&
    EXPIRABLE_CONFIRMATION_STATUSES
      .includes(
        existingOrder
          .clientConfirmation
          .status,
      ) &&
    existingOrder
      .clientConfirmation
      .expiresAt <= now
  ) {
    const expiringConfirmation =
      await prisma
        .clientOrderConfirmation
        .findUniqueOrThrow({
          where: {
            orderId:
              existingOrder.id,
          },
          include:
            confirmationInclude,
        });

    existingConfirmationStatus =
      (
        await expireIfNeeded(
          expiringConfirmation,
          now,
        )
      ).status;
  }

  if (
    existingConfirmationStatus ===
      "CONFIRMED"
  ) {
    throw new Error(
      "ORDER_ALREADY_CONFIRMED",
    );
  }

  if (
    existingConfirmationStatus ===
      "HANDOFF_STARTED"
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_HANDOFF_IN_PROGRESS",
    );
  }

  if (
    existingConfirmationStatus ===
      "AWAITING_CLIENT" &&
    !replaceActive
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_LINK_ACTIVE",
    );
  }

  const estimatedPrice =
    await getEstimatedPrice(
      existingOrder,
    );

  const token = createToken();
  const expiresAt = new Date(
    now.getTime() +
      getConfirmationTtlMs(),
  );

  const confirmation =
    await prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`
          SELECT "id"
          FROM "Portfolio"
          WHERE "id" = ${existingOrder.portfolioId}
          FOR UPDATE
        `;

        await tx.$queryRaw`
          SELECT "id"
          FROM "Order"
          WHERE "id" = ${existingOrder.id}
          FOR UPDATE
        `;

        const currentConfirmation =
          await tx
            .clientOrderConfirmation
            .findUnique({
              where: {
                orderId:
                  existingOrder.id,
              },
              select: {
                status: true,
              },
            });

        if (
          currentConfirmation &&
          [
            "HANDOFF_STARTED",
            "CONFIRMED",
          ].includes(
            currentConfirmation.status,
          )
        ) {
          throw new Error(
            "CLIENT_CONFIRMATION_HANDOFF_IN_PROGRESS",
          );
        }

        const checkedOrder =
          await runPreTradeChecks(
            orderId,
            firmId,
            tx,
            "BROKER",
          );

        await runRiskChecks(
          {
            currentOrderId:
              checkedOrder.id,
            portfolioId:
              checkedOrder
                .portfolioId,
            brokerAccountId:
              checkedOrder
                .brokerAccountId,
            symbol:
              checkedOrder.symbol,
            exchange:
              checkedOrder.exchange,
            side:
              checkedOrder.side,
            quantity:
              checkedOrder.quantity,
            estimatedPrice,
            availabilityAuthority:
              "BROKER",
          },
          tx,
        );

        await tx.order.update({
          where: {
            id: checkedOrder.id,
          },
          data: {
            estimatedPrice,
            reservedCash:
              checkedOrder.side ===
                "BUY"
                ? checkedOrder
                    .quantity *
                  estimatedPrice
                : 0,
            reservedQuantity:
              checkedOrder.side ===
                "SELL"
                ? checkedOrder
                    .quantity
                : 0,
          },
        });

        const saved =
          await tx
            .clientOrderConfirmation
            .upsert({
              where: {
                orderId:
                  checkedOrder.id,
              },
              create: {
                orderId:
                  checkedOrder.id,
                tokenHash:
                  hashToken(token),
                status:
                  "AWAITING_CLIENT",
                expiresAt,
              },
              update: {
                tokenHash:
                  hashToken(token),
                status:
                  "AWAITING_CLIENT",
                expiresAt,
                handoffStartedAt:
                  null,
                confirmedAt: null,
                lastError: null,
              },
            });

        await createAuditLog(
          {
            firmId,
            action:
              "ORDER_CONFIRMATION_REQUESTED",
            entityType: "ORDER",
            entityId:
              checkedOrder.id,
            message:
              "Client confirmation requested",
            actorUserId,
            metadata: {
              expiresAt:
                expiresAt.toISOString(),
              executionMode:
                "CLIENT_CONFIRMATION",
              replacedActiveLink:
                existingConfirmationStatus ===
                  "AWAITING_CLIENT",
            },
          },
          tx,
        );

        return saved;
      },
    );

  return {
    orderId,
    token,
    status:
      confirmation.status,
    expiresAt:
      confirmation.expiresAt,
  };
}

export async function requestBasketClientConfirmations(
  basketOrderId: string,
  firmId: string,
  actorUserId?: string,
  replaceActive = false,
) {
  const basket =
    await prisma.basketOrder
      .findFirst({
        where: {
          id: basketOrderId,
          firmId,
        },
        include: {
          orders: true,
        },
      });

  if (!basket) {
    throw new Error(
      "BASKET_NOT_FOUND",
    );
  }

  if (
    basket.executionMode !==
      "CLIENT_CONFIRMATION"
  ) {
    throw new Error(
      "BASKET_NOT_CLIENT_CONFIRMED",
    );
  }

  const results = [];

  for (const order of basket.orders) {
    try {
      const confirmation =
        await requestClientOrderConfirmation(
          order.id,
          firmId,
          actorUserId,
          new Date(),
          replaceActive,
        );

      results.push({
        success: true as const,
        ...confirmation,
      });
    } catch (error) {
      results.push({
        orderId: order.id,
        success: false as const,
        error:
          error instanceof Error
            ? error.message
            : "UNKNOWN_ERROR",
      });
    }
  }

  return {
    basketId: basket.id,
    results,
  };
}

export async function startClientOrderHandoff(
  token: unknown,
  now = new Date(),
) {
  let confirmation =
    await findConfirmation(
      token,
    );

  confirmation =
    await expireIfNeeded(
      confirmation,
      now,
    );

  if (
    confirmation.status !==
      "AWAITING_CLIENT"
  ) {
    throw new Error(
      confirmation.status ===
        "EXPIRED"
        ? "CLIENT_CONFIRMATION_LINK_EXPIRED"
        : "CLIENT_CONFIRMATION_NOT_ACTIVE",
    );
  }

  const order =
    confirmation.order;

  await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${order.id}
        FOR UPDATE
      `;

      const currentOrder =
        await tx.order
          .findUniqueOrThrow({
            where: {
              id: order.id,
            },
            select: {
              status: true,
            },
          });

      if (
        currentOrder.status !==
        "PENDING"
      ) {
        throw new Error(
          "ORDER_NOT_PENDING",
        );
      }

      const started = await tx
        .clientOrderConfirmation
        .updateMany({
          where: {
            id: confirmation.id,
            status: {
              equals:
                "AWAITING_CLIENT",
            },
            expiresAt: {
              gt: now,
            },
          },
          data: {
            status:
              "HANDOFF_STARTED",
            handoffStartedAt:
              now,
            lastError: null,
          },
        });

      if (started.count === 0) {
        throw new Error(
          "CLIENT_CONFIRMATION_NOT_ACTIVE",
        );
      }

      await createAuditLog(
        {
          firmId:
            order.portfolio
              .client.firmId,
          action:
            "ORDER_CONFIRMATION_STARTED",
          entityType: "ORDER",
          entityId: order.id,
          message:
            "Client opened Zerodha confirmation",
        },
        tx,
      );
    },
  );

  return {
    action:
      "https://kite.zerodha.com/connect/basket",
    apiKey:
      getPublisherApiKey(),
    basket: [
      {
        variety: "regular",
        tradingsymbol:
          order.symbol,
        exchange:
          order.exchange,
        transaction_type:
          order.side,
        order_type:
          order.orderType,
        quantity:
          order.quantity,
        product: "CNC",
        validity: "DAY",
        readonly: true,
        tag:
          createZerodhaPublisherOrderTag(
            order.id,
          ),
        ...(order.orderType ===
          "LIMIT"
          ? {
              price: Number(
                order.limitPrice,
              ),
            }
          : {}),
      },
    ],
  };
}

export async function completeClientOrderConfirmation(
  input: {
    token: unknown;
    status: unknown;
    requestToken: unknown;
  },
  now = new Date(),
) {
  let confirmation =
    await findConfirmation(
      input.token,
    );

  confirmation =
    await expireIfNeeded(
      confirmation,
      now,
    );

  if (
    confirmation.status ===
      "CONFIRMED"
  ) {
    return {
      status: "CONFIRMED" as const,
      orderId:
        confirmation.orderId,
      firmId:
        confirmation.order
          .portfolio.client.firmId,
    };
  }

  if (
    !ACTIVE_CONFIRMATION_STATUSES
      .includes(
        confirmation.status,
      )
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_NOT_ACTIVE",
    );
  }

  const brokerStatus =
    typeof input.status ===
      "string"
      ? input.status.trim()
          .toLowerCase()
      : "";

  if (
    confirmation.status !==
      "HANDOFF_STARTED"
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_HANDOFF_NOT_STARTED",
    );
  }

  if (
    [
      "cancel",
      "cancelled",
    ].includes(brokerStatus)
  ) {
    return declineClientOrderConfirmation(
      input.token,
      "ZERODHA_CONFIRMATION_CANCELLED",
      now,
      true,
    );
  }

  const requestToken =
    typeof input.requestToken ===
      "string"
      ? input.requestToken.trim()
      : "";

  if (
    brokerStatus !== "success" ||
    requestToken.length < 10 ||
    requestToken.length > 200 ||
    !/^[A-Za-z0-9]+$/.test(
      requestToken,
    )
  ) {
    await prisma
      .clientOrderConfirmation
      .updateMany({
        where: {
          id: confirmation.id,
          status:
            "HANDOFF_STARTED",
        },
        data: {
          lastError:
            "ZERODHA_CALLBACK_STATUS_UNCERTAIN",
        },
      });

    throw new Error(
      "ZERODHA_CALLBACK_STATUS_UNCERTAIN",
    );
  }

  const firmId =
    confirmation.order
      .portfolio.client.firmId;

  const order =
    await prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`
          SELECT "id"
          FROM "Order"
          WHERE "id" = ${confirmation.orderId}
          FOR UPDATE
        `;

        const completed = await tx
          .clientOrderConfirmation
          .updateMany({
            where: {
              id: confirmation.id,
              status: {
                equals:
                  "HANDOFF_STARTED",
              },
            },
            data: {
              status: "CONFIRMED",
              confirmedAt: now,
              lastError: null,
            },
          });

        if (completed.count === 0) {
          throw new Error(
            "CLIENT_CONFIRMATION_NOT_ACTIVE",
          );
        }

        const updated = await tx
          .order.update({
            where: {
              id:
                confirmation.orderId,
              status: "PENDING",
            },
            data: {
              status: "SUBMITTED",
            },
          });

        await createAuditLog(
          {
            firmId,
            action:
              "ORDER_CLIENT_CONFIRMED",
            entityType: "ORDER",
            entityId:
              confirmation.orderId,
            message:
              "Client completed the Zerodha Publisher handoff",
            metadata: {
              trackingMode:
                "PUBLISHER_CALLBACK_ONLY",
            },
          },
          tx,
        );

        return updated;
      },
    );

  if (order.basketOrderId) {
    await refreshBasketOrderStatus(
      order.basketOrderId,
      firmId,
    );
  }

  return {
    status: "CONFIRMED" as const,
    orderId: order.id,
    firmId,
  };
}

export async function resolveClientOrderConfirmationAsNotPlaced(
  orderId: string,
  firmId: string,
  actorUserId?: string,
) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      portfolio: {
        client: {
          firmId,
        },
      },
    },
    include: {
      clientConfirmation: true,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (
    order.executionMode !==
      "CLIENT_CONFIRMATION" ||
    !order.clientConfirmation
  ) {
    throw new Error(
      "ORDER_NOT_CLIENT_CONFIRMED",
    );
  }

  if (
    order.status !== "PENDING" ||
    order.clientConfirmation.status !==
      "HANDOFF_STARTED"
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_RESOLUTION_NOT_ALLOWED",
    );
  }

  const updated = await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${order.id}
        FOR UPDATE
      `;

      const resolved = await tx
        .clientOrderConfirmation
        .updateMany({
          where: {
            id:
              order.clientConfirmation!
                .id,
            status:
              "HANDOFF_STARTED",
          },
          data: {
            status: "DECLINED",
            lastError:
              "MANUALLY_CONFIRMED_NOT_PLACED",
          },
        });

      if (resolved.count === 0) {
        throw new Error(
          "CLIENT_CONFIRMATION_RESOLUTION_NOT_ALLOWED",
        );
      }

      const released = await tx.order.update({
        where: {
          id: order.id,
          status: "PENDING",
        },
        data: {
          reservedCash: 0,
          reservedQuantity: 0,
        },
      });

      await createAuditLog(
        {
          firmId,
          action:
            "ORDER_CONFIRMATION_DECLINED",
          entityType: "ORDER",
          entityId: order.id,
          message:
            "Manager verified that the Publisher handoff did not place an order",
          actorUserId,
          metadata: {
            reason:
              "MANUALLY_CONFIRMED_NOT_PLACED",
          },
        },
        tx,
      );

      return released;
    },
  );

  if (updated.basketOrderId) {
    await refreshBasketOrderStatus(
      updated.basketOrderId,
      firmId,
    );
  }

  return updated;
}

export async function declineClientOrderConfirmation(
  token: unknown,
  reason = "CLIENT_DECLINED",
  now = new Date(),
  allowStartedHandoff = false,
) {
  let confirmation =
    await findConfirmation(
      token,
    );

  confirmation =
    await expireIfNeeded(
      confirmation,
      now,
    );

  const declinableStatuses:
    ClientConfirmationStatus[] =
    allowStartedHandoff
      ? ACTIVE_CONFIRMATION_STATUSES
      : ["AWAITING_CLIENT"];

  if (
    !declinableStatuses.includes(
      confirmation.status,
    )
  ) {
    throw new Error(
      "CLIENT_CONFIRMATION_NOT_ACTIVE",
    );
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${confirmation.orderId}
        FOR UPDATE
      `;

      const declined = await tx
        .clientOrderConfirmation
        .updateMany({
          where: {
            id: confirmation.id,
            status: {
              in: declinableStatuses,
            },
          },
          data: {
            status: "DECLINED",
            lastError: reason,
          },
        });

      if (declined.count === 0) {
        throw new Error(
          "CLIENT_CONFIRMATION_NOT_ACTIVE",
        );
      }

      await tx.order.update({
        where: {
          id:
            confirmation.orderId,
        },
        data: {
          reservedCash: 0,
          reservedQuantity: 0,
        },
      });

      await createAuditLog(
        {
          firmId:
            confirmation.order
              .portfolio.client
              .firmId,
          action:
            "ORDER_CONFIRMATION_DECLINED",
          entityType: "ORDER",
          entityId:
            confirmation.orderId,
          message:
            "Client declined or cancelled broker confirmation",
          metadata: {
            reason,
          },
        },
        tx,
      );
    },
  );

  return {
    status: "DECLINED" as const,
    orderId:
      confirmation.orderId,
    firmId:
      confirmation.order
        .portfolio.client.firmId,
  };
}
