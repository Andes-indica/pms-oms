import {
  supportsOrderRecovery,
} from "@pms-oms/broker";

import {
  prisma,
} from "@pms-oms/db";

import {
  resolveBroker,
} from "../brokers/broker-registry";
import {
  createAuditLog,
} from "./audit.service";
import {
  createBasketOrderService,
} from "./basket-order.service";
import {
  refreshBasketOrderStatus,
} from "./basket-status-refresh.service";
import {
  describeExecutionError,
} from "./order-execution-worker.service";
import {
  syncOrderService,
} from "./order-sync.service";

export type BasketChildRecoveryAction =
  | "RETRY"
  | "RECONCILE"
  | "CREATE_REPLACEMENT";

export function basketChildReplacementId(
  orderId: string,
) {
  return `replacement_${orderId}`;
}

type RecoveryState = {
  status: string;
  brokerOrderId: string | null;
  quantity?: number;
  filledQuantity?: number;
  reservedCash?: unknown;
  reservedQuantity?: number;
  executionJob?: {
    status: string;
  } | null;
  replacementBasket?: {
    id: string;
  } | null;
};

export function getBasketChildRecoveryAction(
  order: RecoveryState,
): BasketChildRecoveryAction | null {
  if (
    order.status === "REJECTED"
  ) {
    const remainingQuantity =
      order.quantity === undefined
        ? 1
        : order.quantity -
          (order.filledQuantity ?? 0);

    return order.replacementBasket
      || remainingQuantity <= 0 ||
      Number(order.reservedCash ?? 0) !== 0 ||
      (order.reservedQuantity ?? 0) !== 0
      ? null
      : "CREATE_REPLACEMENT";
  }

  if (
    order.executionJob?.status !==
    "FAILED"
  ) {
    return null;
  }

  if (
    order.status === "PENDING" &&
    !order.brokerOrderId
  ) {
    return "RETRY";
  }

  if (
    order.status === "SUBMITTED" &&
    !order.brokerOrderId
  ) {
    return "RECONCILE";
  }

  return null;
}

async function findBasketChild(
  basketOrderId: string,
  orderId: string,
  firmId: string,
) {
  const child =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        basketOrderId,
        basketOrder: {
          firmId,
        },
      },
      include: {
        executionJob: true,
        basketOrder: true,
        portfolio: {
          include: {
            client: true,
          },
        },
      },
    });

  if (!child) {
    return null;
  }

  const replacementBasket =
    await prisma.basketOrder.findFirst({
      where: {
        id:
          basketChildReplacementId(
            child.id,
          ),
        firmId,
      },
      select: {
        id: true,
        status: true,
      },
    });

  return {
    ...child,
    replacementBasket,
  };
}

export async function retryBasketChildOrderService(
  basketOrderId: string,
  orderId: string,
  firmId: string,
  actorUserId?: string,
) {
  return prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${orderId}
        FOR UPDATE
      `;

      await tx.$queryRaw`
        SELECT "id"
        FROM "ExecutionJob"
        WHERE "orderId" = ${orderId}
        FOR UPDATE
      `;

      const child =
        await tx.order.findFirst({
          where: {
            id: orderId,
            basketOrderId,
            basketOrder: {
              firmId,
            },
          },
          include: {
            executionJob: true,
          },
        });

      if (!child) {
        throw new Error(
          "BASKET_CHILD_ORDER_NOT_FOUND",
        );
      }

      if (
        getBasketChildRecoveryAction(
          child,
        ) !== "RETRY" ||
        !child.executionJob
      ) {
        throw new Error(
          "BASKET_CHILD_RETRY_NOT_ALLOWED",
        );
      }

      const job =
        await tx.executionJob.update({
          where: {
            id:
              child.executionJob.id,
          },
          data: {
            status: "PENDING",
            attempts: 0,
            lastError: null,
            availableAt:
              new Date(),
            lockedAt: null,
          },
        });

      await createAuditLog(
        {
          firmId,
          action: "BASKET_SUBMITTED",
          entityType: "BASKET_ORDER",
          entityId: basketOrderId,
          message:
            "Failed basket child queued for another execution attempt",
          actorUserId,
          metadata: {
            orderId,
            recoveryAction:
              "RETRY",
          },
        },
        tx,
      );

      return {
        action: "RETRY" as const,
        orderId,
        job,
      };
    },
  );
}

export async function reconcileBasketChildOrderService(
  basketOrderId: string,
  orderId: string,
  firmId: string,
  actorUserId?: string,
) {
  const child =
    await findBasketChild(
      basketOrderId,
      orderId,
      firmId,
    );

  if (!child) {
    throw new Error(
      "BASKET_CHILD_ORDER_NOT_FOUND",
    );
  }

  if (
    getBasketChildRecoveryAction(
      child,
    ) !== "RECONCILE"
  ) {
    throw new Error(
      "BASKET_CHILD_RECONCILE_NOT_ALLOWED",
    );
  }

  const broker =
    await resolveBroker(
      child.brokerAccountId,
      firmId,
    );

  if (
    !supportsOrderRecovery(
      broker,
    )
  ) {
    throw new Error(
      "BROKER_RECOVERY_UNSUPPORTED",
    );
  }

  let recovered:
    Awaited<
      ReturnType<
        typeof broker.findOrderByClientOrderId
      >
    >;

  try {
    recovered =
      await broker
        .findOrderByClientOrderId(
          child.id,
        );
  } catch (error) {
    throw new Error(
      describeExecutionError(
        error,
      ),
    );
  }

  if (!recovered) {
    throw new Error(
      "BROKER_ORDER_RECOVERY_NOT_FOUND",
    );
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${orderId}
        FOR UPDATE
      `;

      const fresh =
        await tx.order.findFirst({
          where: {
            id: orderId,
            basketOrderId,
            basketOrder: {
              firmId,
            },
          },
        });

      if (!fresh) {
        throw new Error(
          "BASKET_CHILD_ORDER_NOT_FOUND",
        );
      }

      if (
        fresh.brokerOrderId &&
        fresh.brokerOrderId !==
          recovered.brokerOrderId
      ) {
        throw new Error(
          "BROKER_ORDER_RECOVERY_CONFLICT",
        );
      }

      if (
        !fresh.brokerOrderId &&
        fresh.status !== "SUBMITTED"
      ) {
        throw new Error(
          "BASKET_CHILD_RECONCILE_NOT_ALLOWED",
        );
      }

      if (!fresh.brokerOrderId) {
        await tx.order.update({
          where: {
            id: fresh.id,
          },
          data: {
            brokerOrderId:
              recovered.brokerOrderId,
          },
        });

        await createAuditLog(
          {
            firmId,
            action:
              "ORDER_SUBMITTED",
            entityType: "ORDER",
            entityId: fresh.id,
            message:
              "Broker order recovered after uncertain basket submission",
            actorUserId,
            metadata: {
              basketOrderId,
              brokerOrderId:
                recovered.brokerOrderId,
              brokerStatus:
                recovered.status,
              recovered: true,
            },
          },
          tx,
        );
      }
    },
  );

  try {
    const synchronized =
      await syncOrderService(
        orderId,
        firmId,
        actorUserId,
      );

    await prisma.executionJob.updateMany({
      where: {
        orderId,
      },
      data: {
        status: "COMPLETED",
        lastError: null,
        lockedAt: null,
      },
    });

    await refreshBasketOrderStatus(
      basketOrderId,
      firmId,
    );

    return {
      action:
        "RECONCILE" as const,
      order: synchronized,
    };
  } catch (error) {
    const message =
      `BROKER_RECOVERED_SYNC_REQUIRED: ${
        describeExecutionError(
          error,
        )
      }`;

    await prisma.executionJob.updateMany({
      where: {
        orderId,
      },
      data: {
        status: "FAILED",
        lastError: message,
        lockedAt: null,
      },
    });

    await refreshBasketOrderStatus(
      basketOrderId,
      firmId,
    );

    throw new Error(message);
  }
}

export async function createBasketChildReplacementService(
  basketOrderId: string,
  orderId: string,
  firmId: string,
  actorUserId?: string,
) {
  const child =
    await findBasketChild(
      basketOrderId,
      orderId,
      firmId,
    );

  if (!child) {
    throw new Error(
      "BASKET_CHILD_ORDER_NOT_FOUND",
    );
  }

  if (child.replacementBasket) {
    return {
      action:
        "CREATE_REPLACEMENT" as const,
      created: false,
      replacementBasket:
        {
          ...child.replacementBasket,
          replacesOrderId:
            child.id,
        },
    };
  }

  if (
    child.status !== "REJECTED" ||
    child.quantity -
      child.filledQuantity <= 0 ||
    Number(child.reservedCash) !== 0 ||
    child.reservedQuantity !== 0
  ) {
    throw new Error(
      "BASKET_CHILD_REPLACEMENT_NOT_ALLOWED",
    );
  }

  try {
    const replacementBasket =
      await createBasketOrderService({
        firmId,
        id:
          basketChildReplacementId(
            child.id,
          ),
        name:
          `Replacement for ${
            child.portfolio.client.name
          } - ${
            child.basketOrder?.name ??
            child.symbol
          }`,
        symbol: child.symbol,
        exchange: child.exchange,
        side: child.side,
        orderType:
          child.orderType,
        limitPrice:
          child.limitPrice === null
            ? undefined
            : Number(
                child.limitPrice,
              ),
        totalQuantity:
          child.quantity -
          child.filledQuantity,
        allocationMethod:
          "FIXED_QUANTITY",
        targets: [
          {
            portfolioId:
              child.portfolioId,
            brokerAccountId:
              child.brokerAccountId,
            quantity:
              child.quantity -
              child.filledQuantity,
          },
        ],
        actorUserId,
        replacementForOrderId:
          child.id,
      });

    return {
      action:
        "CREATE_REPLACEMENT" as const,
      created: true,
      replacementBasket: {
        ...replacementBasket,
        replacesOrderId:
          child.id,
      },
    };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      const replacementBasket =
        await prisma.basketOrder
          .findFirst({
            where: {
              id:
                basketChildReplacementId(
                  child.id,
                ),
              firmId,
            },
          });

      if (replacementBasket) {
        return {
          action:
            "CREATE_REPLACEMENT" as const,
          created: false,
          replacementBasket: {
            ...replacementBasket,
            replacesOrderId:
              child.id,
          },
        };
      }
    }

    throw error;
  }
}
