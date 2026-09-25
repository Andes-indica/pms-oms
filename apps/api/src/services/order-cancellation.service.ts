import {
  BrokerError,
} from "@pms-oms/broker";
import {
  prisma,
} from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

import {
  mockBroker,
  resolveBroker,
} from "../brokers/broker-registry";

import {
  ensureMockBrokerOrder,
} from "../brokers/ensure-mock-broker-order";

import {
  syncOrderService,
} from "./order-sync.service";

export async function cancelOrderService(
  orderId: string,
  firmId: string,
) {
  const order =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        portfolio: {
          client: {
            firmId,
          },
        },
      },
    });

  if (!order) {
    throw new Error(
      "ORDER_NOT_FOUND",
    );
  }

  /*
   * First handle cancellation entirely
   * inside PMS when the order has never
   * been submitted to a broker.
   *
   * Lock Portfolio first because execution
   * and sync use the same lock ordering.
   */
  const cancellationState =
    await prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`
          SELECT "id"
          FROM "Portfolio"
          WHERE "id" = ${order.portfolioId}
          FOR UPDATE
        `;

        await tx.$queryRaw`
          SELECT "id"
          FROM "Order"
          WHERE "id" = ${order.id}
          FOR UPDATE
        `;

        const currentOrder =
          await tx.order.findFirst({
            where: {
              id: order.id,

              portfolio: {
                client: {
                  firmId,
                },
              },
            },
          });

        if (!currentOrder) {
          throw new Error(
            "ORDER_NOT_FOUND",
          );
        }

        if (
          currentOrder.status ===
          "FILLED"
        ) {
          throw new Error(
            "ORDER_ALREADY_FILLED",
          );
        }

        if (
          currentOrder.status ===
          "CANCELLED"
        ) {
          return {
            requiresBroker: false,
            order: currentOrder,
          };
        }

        if (
          currentOrder.status ===
          "REJECTED"
        ) {
          throw new Error(
            "ORDER_ALREADY_REJECTED",
          );
        }

        /*
         * PENDING means nothing has been
         * sent to a broker yet.
         *
         * Cancel locally.
         */
        if (
          currentOrder.status ===
          "PENDING"
        ) {
          const cancelledOrder =
            await tx.order.update({
              where: {
                id:
                  currentOrder.id,
              },

              data: {
                status:
                  "CANCELLED",

                reservedCash: 0,

                reservedQuantity: 0,
              },
            });

          await createAuditLog(
            {
              firmId,

              action:
                "ORDER_CANCELLED",

              entityType:
                "ORDER",

              entityId:
                cancelledOrder.id,

              message:
                "Order cancelled before broker submission",

              metadata: {
                previousStatus:
                  currentOrder.status,
              },
            },

            tx,
          );

          return {
            requiresBroker: false,
            order: cancelledOrder,
          };
        }

        /*
         * SUBMITTED / OPEN /
         * PARTIALLY_FILLED orders require
         * broker interaction.
         */
        if (
          !currentOrder
            .brokerOrderId
        ) {
          throw new Error(
            "ORDER_SUBMISSION_IN_PROGRESS",
          );
        }

        return {
          requiresBroker: true,
          order: currentOrder,
        };
      },
    );

  /*
   * PENDING or already CANCELLED:
   * nothing more to do.
   */
  if (
    !cancellationState
      .requiresBroker
  ) {
    return cancellationState.order;
  }

  const liveOrder =
    cancellationState.order;

  if (
    !liveOrder.brokerOrderId
  ) {
    throw new Error(
      "ORDER_SUBMISSION_IN_PROGRESS",
    );
  }

  /*
   * Resolve whichever broker this
   * BrokerAccount belongs to.
   *
   * No Zerodha-specific code here.
   */
  const broker =
    await resolveBroker(
      liveOrder.brokerAccountId,
      firmId,
    );

  /*
   * MockBroker is in-memory, therefore
   * restore its state after an API restart.
   *
   * Real brokers must never go through
   * this path.
   */
  if (
    broker === mockBroker
  ) {
    ensureMockBrokerOrder(
      liveOrder,
    );
  }

  try {
  await broker.cancelOrder(
    liveOrder.brokerOrderId,
  );
} catch (error) {
  if (
    error instanceof
      BrokerError &&
    error.code ===
      "BROKER_ORDER_NOT_FOUND"
  ) {
    /*
     * Cancellation may fail because the
     * order already transitioned at the
     * broker — for example REJECTED or
     * FILLED.
     *
     * Reconcile before deciding what
     * PMS state should be.
     */
    return syncOrderService(
      liveOrder.id,
      firmId,
    );
  }

  if (
    error instanceof Error &&
    error.message ===
      "BROKER_ORDER_ALREADY_FILLED"
  ) {
    throw new Error(
      "ORDER_ALREADY_FILLED",
    );
  }

  throw error;
}

  /*
   * Do NOT manually mark a real broker
   * order CANCELLED here.
   *
   * There may have been fills between
   * our last state and the cancellation.
   *
   * Reconcile using the same generic
   * sync flow used everywhere else.
   */
  return syncOrderService(
    liveOrder.id,
    firmId,
  );
}