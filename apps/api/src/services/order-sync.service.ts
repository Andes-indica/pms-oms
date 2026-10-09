import { prisma } from "@pms-oms/db";

import {
  createAuditLog,
} from "./audit.service";

import {
  ensureMockBrokerOrder,
} from "../brokers/ensure-mock-broker-order";

import {
  mockBroker,
  resolveBroker,
} from "../brokers/broker-registry";
import {
  supportsExecutions,
} from "@pms-oms/broker";

export async function syncOrderService(
  orderId: string,
  firmId: string,
  actorUserId?: string,
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

  if (!order.brokerOrderId) {
    throw new Error(
      "ORDER_NOT_SUBMITTED",
    );
  }

  /*
   * Terminal orders do not need another
   * broker API request.
   */
  if (
    [
      "FILLED",
      "CANCELLED",
      "REJECTED",
    ].includes(order.status)
  ) {
    return order;
  }

  const broker =
    await resolveBroker(
      order.brokerAccountId,
      firmId,
    );


  if (broker === mockBroker) {
    ensureMockBrokerOrder(
      order,
    );
  }


  const brokerUpdate =
    await broker.getOrderStatus(
      order.brokerOrderId,
    );
  const brokerExecutions =
    supportsExecutions(
      broker,
    )
      ? await broker.getExecutions(
        order.brokerOrderId,
      )
      : null;
  if (brokerExecutions) {
    const executionQuantity =
      brokerExecutions.reduce(
        (total, execution) =>
          total +
          execution.quantity,
        0,
      );

    if (
      executionQuantity !==
      brokerUpdate.filledQuantity
    ) {
      throw new Error(
        "BROKER_EXECUTION_QUANTITY_MISMATCH",
      );
    }
  }
  return prisma.$transaction(
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

      const freshOrder =
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

      if (!freshOrder) {
        throw new Error(
          "ORDER_NOT_FOUND",
        );
      }


      if (
        [
          "FILLED",
          "CANCELLED",
          "REJECTED",
        ].includes(
          freshOrder.status,
        )
      ) {
        return freshOrder;
      }

    
      const cumulativeFillQuantity =
        brokerUpdate.filledQuantity;

      if (
        !Number.isInteger(
          cumulativeFillQuantity,
        ) ||
        cumulativeFillQuantity <
        freshOrder.filledQuantity ||
        cumulativeFillQuantity >
        freshOrder.quantity
      ) {
        throw new Error(
          "INVALID_FILL_QUANTITY",
        );
      }
      if (brokerExecutions) {
        for (
          const execution of
          brokerExecutions
        ) {
          await tx.execution.upsert({
            where: {
              orderId_brokerExecutionId: {
                orderId:
                  freshOrder.id,

                brokerExecutionId:
                  execution
                    .brokerExecutionId,
              },
            },

            update: {},

            create: {
              orderId:
                freshOrder.id,

              brokerExecutionId:
                execution
                  .brokerExecutionId,

              quantity:
                execution.quantity,

              price:
                execution.price,

              executedAt:
                execution.executedAt,
            },
          });
        }
      }

      const incrementalFillQuantity =
        cumulativeFillQuantity -
        freshOrder.filledQuantity;

      let incrementalFillPrice:
        | number
        | null = null;

      let sellCostBasis:
        | number
        | null = null;


      if (
        incrementalFillQuantity > 0
      ) {
        if (
          brokerUpdate
            .averageFillPrice ===
          null ||
          !Number.isFinite(
            brokerUpdate
              .averageFillPrice,
          ) ||
          brokerUpdate
            .averageFillPrice <= 0
        ) {
          throw new Error(
            "INVALID_FILL_PRICE",
          );
        }


        const previousFillValue =
          freshOrder.filledQuantity *
          Number(
            freshOrder
              .averageFillPrice ??
            0,
          );

        const cumulativeFillValue =
          cumulativeFillQuantity *
          brokerUpdate
            .averageFillPrice;

        incrementalFillPrice =
          (
            cumulativeFillValue -
            previousFillValue
          ) /
          incrementalFillQuantity;

        const holding =
          await tx.holding.findUnique(
            {
              where: {
                portfolioId_brokerAccountId_symbol_exchange:
                {
                  portfolioId:
                    freshOrder
                      .portfolioId,

                  brokerAccountId:
                    freshOrder
                      .brokerAccountId,

                  symbol:
                    freshOrder
                      .symbol,

                  exchange:
                    freshOrder
                      .exchange,
                },
              },
            },
          );

        const brokerCashAllocation =
          await tx.portfolioBrokerCash
            .findUnique({
              where: {
                portfolioId_brokerAccountId: {
                  portfolioId:
                    freshOrder
                      .portfolioId,

                  brokerAccountId:
                    freshOrder
                      .brokerAccountId,
                },
              },
            });

        if (
          brokerCashAllocation
        ) {
          await tx.$queryRaw`
            SELECT "id"
            FROM "PortfolioBrokerCash"
            WHERE "id" =
              ${brokerCashAllocation.id}
            FOR UPDATE
          `;
        }

        if (
          freshOrder.side ===
          "BUY"
        ) {
          if (!holding) {
            await tx.holding.create({
              data: {
                portfolioId:
                  freshOrder
                    .portfolioId,

                brokerAccountId:
                  freshOrder
                    .brokerAccountId,

                symbol:
                  freshOrder.symbol,

                exchange:
                  freshOrder.exchange,

                quantity:
                  incrementalFillQuantity,

                averagePrice:
                  incrementalFillPrice,
              },
            });
          } else {
            const newQuantity =
              holding.quantity +
              incrementalFillQuantity;

            const newAveragePrice =
              (
                holding.quantity *
                Number(
                  holding.averagePrice,
                ) +
                incrementalFillQuantity *
                incrementalFillPrice
              ) /
              newQuantity;

            await tx.holding.update({
              where: {
                id: holding.id,
              },

              data: {
                quantity:
                  newQuantity,

                averagePrice:
                  newAveragePrice,
              },
            });
          }

          const cashAmount =
            incrementalFillQuantity *
            incrementalFillPrice;

          const updatedPortfolio =
            await tx.portfolio.update({
              where: {
                id:
                  freshOrder
                    .portfolioId,
              },

              data: {
                cashBalance: {
                  decrement:
                    cashAmount,
                },
              },
            });

          await tx.cashTransaction.create({
            data: {
              portfolioId:
                freshOrder
                  .portfolioId,

              type:
                "BUY_FILL",

              amount:
                -cashAmount,

              balanceAfter:
                updatedPortfolio
                  .cashBalance,

              referenceType:
                "ORDER",

              referenceId:
                freshOrder.id,

              note:
                "Cash debit for broker fill",

              actorUserId:
                actorUserId ??
                null,
            },
          });

          if (
            brokerCashAllocation
          ) {
            await tx.portfolioBrokerCash
              .update({
                where: {
                  id:
                    brokerCashAllocation
                      .id,
                },

                data: {
                  cashBalance: {
                    decrement:
                      cashAmount,
                  },
                },
              });
          }
        } else {

          if (
            !holding ||
            holding.quantity <
            incrementalFillQuantity
          ) {
            throw new Error(
              "INSUFFICIENT_HOLDINGS",
            );
          }

          sellCostBasis =
            Number(
              holding.averagePrice,
            );

          const remainingQuantity =
            holding.quantity -
            incrementalFillQuantity;

          if (
            remainingQuantity === 0
          ) {
            await tx.holding.delete({
              where: {
                id: holding.id,
              },
            });
          } else {
            await tx.holding.update({
              where: {
                id: holding.id,
              },

              data: {
                quantity:
                  remainingQuantity,
              },
            });
          }

          const cashAmount =
            incrementalFillQuantity *
            incrementalFillPrice;

          const updatedPortfolio =
            await tx.portfolio.update({
              where: {
                id:
                  freshOrder
                    .portfolioId,
              },

              data: {
                cashBalance: {
                  increment:
                    cashAmount,
                },
              },
            });

          await tx.cashTransaction.create({
            data: {
              portfolioId:
                freshOrder
                  .portfolioId,

              type:
                "SELL_FILL",

              amount:
                cashAmount,

              balanceAfter:
                updatedPortfolio
                  .cashBalance,

              referenceType:
                "ORDER",

              referenceId:
                freshOrder.id,

              note:
                "Cash credit for broker fill",

              actorUserId:
                actorUserId ??
                null,
            },
          });

          if (
            brokerCashAllocation
          ) {
            await tx.portfolioBrokerCash
              .update({
                where: {
                  id:
                    brokerCashAllocation
                      .id,
                },

                data: {
                  cashBalance: {
                    increment:
                      cashAmount,
                  },
                },
              });
          }
        }
      }


      const terminal =
        [
          "FILLED",
          "CANCELLED",
          "REJECTED",
        ].includes(
          brokerUpdate.status,
        );

      const rejectionReason =
        brokerUpdate.status ===
          "REJECTED"
          ? brokerUpdate
              .statusMessage
              ?.trim() ||
            "Broker reported the order as rejected without additional details"
          : null;

      const remainingQuantity =
        freshOrder.quantity -
        cumulativeFillQuantity;

      const estimatedPrice =
        Number(
          freshOrder
            .estimatedPrice ??
          brokerUpdate
            .averageFillPrice ??
          0,
        );

      let realizedPnl:
        | number
        | null =
        freshOrder.realizedPnl ===
          null
          ? null
          : Number(
            freshOrder
              .realizedPnl,
          );


      if (
        freshOrder.side ===
        "SELL" &&
        incrementalFillQuantity >
        0 &&
        incrementalFillPrice !==
        null
      ) {
        realizedPnl =
          Number(
            freshOrder
              .realizedPnl ??
            0,
          ) +
          (
            incrementalFillPrice -
            (
              sellCostBasis ??
              incrementalFillPrice
            )
          ) *
          incrementalFillQuantity;
      }

      const updatedOrder =
        await tx.order.update({
          where: {
            id: freshOrder.id,
          },

          data: {
            status:
              brokerUpdate.status,

            filledQuantity:
              cumulativeFillQuantity,

            averageFillPrice:
              brokerUpdate
                .averageFillPrice,

            realizedPnl,

            filledAt:
              brokerUpdate.status ===
                "FILLED"
                ? freshOrder
                  .filledAt ??
                new Date()
                : freshOrder
                  .filledAt,


            reservedCash:
              !terminal &&
                freshOrder.side ===
                "BUY"
                ? remainingQuantity *
                estimatedPrice
                : 0,

            reservedQuantity:
              !terminal &&
                freshOrder.side ===
                "SELL"
                ? remainingQuantity
                : 0,
          },
        });

      if (rejectionReason) {
        await tx.executionJob.updateMany({
          where: {
            orderId:
              updatedOrder.id,
          },
          data: {
            lastError:
              `BROKER_ORDER_REJECTED: ${rejectionReason}`,
          },
        });
      }

      const action =
        updatedOrder.status ===
          "FILLED"
          ? "ORDER_FILLED"
          : updatedOrder.status ===
            "REJECTED"
            ? "ORDER_REJECTED"
            : updatedOrder.status ===
              "CANCELLED"
              ? "ORDER_CANCELLED"
              : "ORDER_SYNCED";

      await createAuditLog(
        {
          firmId,

          action,

          entityType:
            "ORDER",

          entityId:
            updatedOrder.id,

          message:
            rejectionReason
              ? "Order rejected by broker during synchronization"
              : "Order synchronized with broker",

          actorUserId,

          metadata: {
            status:
              updatedOrder.status,

            filledQuantity:
              updatedOrder
                .filledQuantity,

            averageFillPrice:
              updatedOrder
                .averageFillPrice
                ?.toString(),

            realizedPnl:
              updatedOrder
                .realizedPnl
                ?.toString(),
            executionCount: brokerExecutions ?.length ?? null,

            ...(rejectionReason
              ? {
                  rejectionReason,
                }
              : {}),
          },
        },

        tx,
      );

      return updatedOrder;
    },
  );
}
