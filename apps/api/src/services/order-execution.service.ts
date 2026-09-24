import { prisma } from "@pms-oms/db";

import {
  supportsOrderRecovery,
  type BrokerOrderResult,
} from "@pms-oms/broker";

import {
  resolveBroker,
} from "../brokers/broker-registry";

import {
  createAuditLog,
} from "./audit.service";

import {
  runPreTradeChecks,
} from "./pre-trade.service";

import {
  runRiskChecks,
} from "./risk.service";

export async function executeOrderService(
  orderId: string,
  firmId: string,
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
    });

  if (!existingOrder) {
    throw new Error(
      "ORDER_NOT_FOUND",
    );
  }

  /*
   * If we already know the broker order ID,
   * this request is idempotent.
   */
  if (
    existingOrder.brokerOrderId
  ) {
    return existingOrder;
  }

  if (
    existingOrder.status !==
      "PENDING" &&
    existingOrder.status !==
      "SUBMITTED"
  ) {
    throw new Error(
      "ORDER_NOT_PENDING",
    );
  }

  const broker =
    await resolveBroker(
      existingOrder
        .brokerAccountId,
      firmId,
    );

  const estimatedPrice =
    existingOrder.orderType ===
      "LIMIT" &&
    existingOrder.limitPrice !==
      null
      ? Number(
          existingOrder
            .limitPrice,
        )
      : await broker
          .getEstimatedPrice(
            existingOrder.symbol,
            existingOrder.exchange,
          );

  if (
    !Number.isFinite(
      estimatedPrice,
    ) ||
    estimatedPrice <= 0
  ) {
    throw new Error(
      "INVALID_ESTIMATED_PRICE",
    );
  }

  /*
   * true means this request changed:
   *
   * PENDING -> SUBMITTED
   *
   * false means another request / previous
   * process already moved it to SUBMITTED.
   *
   * That distinction is critical.
   */
  let newlyClaimed = false;

  let claimedOrder:
    typeof existingOrder;

  try {
    claimedOrder =
      await prisma.$transaction(
        async (tx) => {
          /*
           * Serialize cash / quantity
           * reservations for the portfolio.
           */
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

          const currentOrder =
            await tx.order.findFirst({
              where: {
                id: orderId,

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

          /*
           * Another execution request may
           * already have persisted the
           * broker ID.
           */
          if (
            currentOrder
              .brokerOrderId
          ) {
            newlyClaimed = false;

            return currentOrder;
          }

          /*
           * SUBMITTED without brokerOrderId
           * means submission may have been
           * interrupted.
           *
           * Never blindly place another
           * real broker order.
           */
          if (
            currentOrder.status ===
            "SUBMITTED"
          ) {
            newlyClaimed = false;

            return currentOrder;
          }

          if (
            currentOrder.status !==
            "PENDING"
          ) {
            throw new Error(
              "ORDER_NOT_PENDING",
            );
          }

          const checkedOrder =
            await runPreTradeChecks(
              orderId,
              firmId,
              tx,
            );

          await runRiskChecks(
            {
              currentOrderId:
                checkedOrder.id,

              portfolioId:
                checkedOrder
                  .portfolioId,

              symbol:
                checkedOrder.symbol,

              exchange:
                checkedOrder.exchange,

              side:
                checkedOrder.side,

              quantity:
                checkedOrder.quantity,

              estimatedPrice,
            },

            tx,
          );

          const updatedOrder =
            await tx.order.update({
              where: {
                id:
                  checkedOrder.id,
              },

              data: {
                status:
                  "SUBMITTED",

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

          newlyClaimed = true;

          return updatedOrder;
        },
      );
  } catch (error) {
    const rejectionReasons =
      new Set([
        "INVALID_QUANTITY",
        "INSUFFICIENT_HOLDINGS",
        "INSUFFICIENT_CASH",
        "RESTRICTED_SECURITY",
        "MAX_ORDER_QUANTITY_EXCEEDED",
        "MAX_ORDER_VALUE_EXCEEDED",
        "MAX_POSITION_QUANTITY_EXCEEDED",
        "MAX_POSITION_VALUE_EXCEEDED",
        "INVALID_ESTIMATED_PRICE",
      ]);

    if (
      error instanceof Error &&
      rejectionReasons.has(
        error.message,
      )
    ) {
      await prisma.$transaction(
        async (tx) => {
          const rejected =
            await tx.order
              .updateMany({
                where: {
                  id: orderId,

                  status:
                    "PENDING",

                  portfolio: {
                    client: {
                      firmId,
                    },
                  },
                },

                data: {
                  status:
                    "REJECTED",

                  reservedCash: 0,

                  reservedQuantity: 0,
                },
              });

          if (
            rejected.count > 0
          ) {
            await createAuditLog(
              {
                firmId,

                action:
                  "ORDER_REJECTED",

                entityType:
                  "ORDER",

                entityId:
                  orderId,

                message:
                  "Order rejected by pre-trade checks",

                metadata: {
                  reason:
                    error.message,
                },
              },

              tx,
            );
          }
        },
      );
    }

    throw error;
  }

  /*
   * Another concurrent execution request
   * may have persisted brokerOrderId while
   * we waited for locks.
   */
  if (
    claimedOrder.brokerOrderId
  ) {
    return claimedOrder;
  }

  let brokerResult:
    BrokerOrderResult;

  /*
   * If this request did NOT perform the
   * PENDING -> SUBMITTED transition,
   * submission is potentially ambiguous.
   *
   * First attempt broker-side recovery.
   */
  if (!newlyClaimed) {
    if (
      !supportsOrderRecovery(
        broker,
      )
    ) {
      throw new Error(
        "BROKER_SUBMISSION_UNCERTAIN",
      );
    }

    const recoveredOrder =
      await broker
        .findOrderByClientOrderId(
          claimedOrder.id,
        );

    /*
     * Important:
     *
     * Do NOT call placeOrder() here when
     * recovery returns null.
     *
     * The previous request may have reached
     * the broker and its response may simply
     * have been lost.
     */
    if (!recoveredOrder) {
      throw new Error(
        "BROKER_SUBMISSION_UNCERTAIN",
      );
    }

    brokerResult =
      recoveredOrder;
  } else {
    /*
     * This request owns the first actual
     * submission attempt.
     */
    brokerResult =
      await broker.placeOrder({
        clientOrderId:
          claimedOrder.id,

        symbol:
          claimedOrder.symbol,

        exchange:
          claimedOrder.exchange,

        side:
          claimedOrder.side,

        orderType:
          claimedOrder.orderType,

        quantity:
          claimedOrder.quantity,

        limitPrice:
          claimedOrder.limitPrice !==
          null
            ? Number(
                claimedOrder
                  .limitPrice,
              )
            : null,
      });
  }

  /*
   * Persist broker identity after either:
   *
   * 1. successful fresh placement
   * 2. successful recovery
   */
  return prisma.$transaction(
    async (tx) => {
      await tx.$queryRaw`
        SELECT "id"
        FROM "Order"
        WHERE "id" = ${claimedOrder.id}
        FOR UPDATE
      `;

      const currentOrder =
        await tx.order.findFirst({
          where: {
            id:
              claimedOrder.id,

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

      /*
       * Another request may already have
       * persisted the broker order.
       */
      if (
        currentOrder
          .brokerOrderId
      ) {
        return currentOrder;
      }

      const updatedOrder =
        await tx.order.update({
          where: {
            id:
              currentOrder.id,
          },

          data: {
            brokerOrderId:
              brokerResult
                .brokerOrderId,

            status:
              brokerResult.status,
          },
        });

      await createAuditLog(
        {
          firmId,

          action:
            "ORDER_SUBMITTED",

          entityType:
            "ORDER",

          entityId:
            updatedOrder.id,

          message:
            newlyClaimed
              ? "Order submitted to broker"
              : "Broker order recovered after interrupted submission",

          metadata: {
            brokerOrderId:
              brokerResult
                .brokerOrderId,

            status:
              brokerResult.status,

            recovered:
              !newlyClaimed,
          },
        },

        tx,
      );

      return updatedOrder;
    },
  );
}