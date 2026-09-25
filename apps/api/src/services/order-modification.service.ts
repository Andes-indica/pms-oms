import {
    prisma,
} from "@pms-oms/db";

import {
    mockBroker,
    resolveBroker,
} from "../brokers/broker-registry";

import {
    createAuditLog,
} from "./audit.service";

export type ModifyOrderInput = {
    quantity?: number;
    limitPrice?: number;
};
import { ensureMockBrokerOrder } from "../brokers/ensure-mock-broker-order";
import {
    getMarketPrice,
} from "./market-data.service";

const ACTIVE_STATUSES = [
    "PENDING",
    "SUBMITTED",
    "OPEN",
    "PARTIALLY_FILLED",
] as const;

export async function modifyOrderService(
    orderId: string,
    firmId: string,
    input: ModifyOrderInput,
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

            include: {
                portfolio: {
                    include: {
                        holdings: true,
                    },
                },
            },
        });


    if (!order) {
        throw new Error(
            "ORDER_NOT_FOUND",
        );
    }
    const broker =
        await resolveBroker(
            order.brokerAccountId,
            firmId,
        );

    /*
     * For now only clean, unfilled live
     * orders can be modified.
     */
    if (
        ![
            "SUBMITTED",
            "OPEN",
        ].includes(order.status)
    ) {
        throw new Error(
            "ORDER_NOT_MODIFIABLE",
        );
    }

    if (
        order.filledQuantity > 0
    ) {
        throw new Error(
            "PARTIALLY_FILLED_ORDER_NOT_MODIFIABLE",
        );
    }

    if (!order.brokerOrderId) {
        throw new Error(
            "BROKER_ORDER_ID_MISSING",
        );
    }

    const newQuantity =
        input.quantity ??
        order.quantity;

    if (newQuantity <= 0) {
        throw new Error(
            "INVALID_QUANTITY",
        );
    }

    let newLimitPrice:
        | number
        | undefined;

    if (
        order.orderType ===
        "LIMIT"
    ) {
        newLimitPrice =
            input.limitPrice ??
            (order.limitPrice
                ? Number(
                    order.limitPrice,
                )
                : undefined);

        if (
            newLimitPrice ===
            undefined ||
            newLimitPrice <= 0
        ) {
            throw new Error(
                "INVALID_LIMIT_PRICE",
            );
        }
    }

    /*
     * Price used for risk /
     * reservations.
     */
    const estimatedPrice =
        order.orderType ===
            "LIMIT"
            ? newLimitPrice!
            : await getMarketPrice(
                order.symbol,
                order.exchange,
            );

    const estimatedValue =
        newQuantity *
        estimatedPrice;

    /*
     * Get reservations from OTHER
     * live orders.
     *
     * Important: exclude current order
     * so we don't count its old reservation
     * against itself.
     */
    const otherOrders =
        await prisma.order.findMany({
            where: {
                portfolioId:
                    order.portfolioId,

                id: {
                    not: order.id,
                },

                status: {
                    in: [
                        ...ACTIVE_STATUSES
                    ],
                },
            },

            select: {
                side: true,
                symbol: true,
                exchange: true,
                reservedCash: true,
                reservedQuantity: true,
            },
        });

    /*
     * BUY modification:
     * recalculate available buying power.
     */
    let newReservedCash = 0;
    let newReservedQuantity = 0;

    if (order.side === "BUY") {
        const reservedByOthers =
            otherOrders.reduce(
                (total, other) =>
                    total +
                    Number(
                        other.reservedCash,
                    ),
                0,
            );

        const availableCash =
            Number(
                order.portfolio.cashBalance,
            ) -
            reservedByOthers;

        if (
            availableCash <
            estimatedValue
        ) {
            throw new Error(
                "INSUFFICIENT_CASH",
            );
        }

        newReservedCash =
            estimatedValue;
    }

    /*
     * SELL modification:
     * check owned quantity and quantities
     * reserved by OTHER orders.
     */
    if (order.side === "SELL") {
        const holding =
            order.portfolio.holdings.find(
                (holding) =>
                    holding.symbol ===
                    order.symbol &&
                    holding.exchange ===
                    order.exchange,
            );

        const ownedQuantity =
            holding?.quantity ?? 0;

        const reservedByOthers =
            otherOrders
                .filter(
                    (other) =>
                        other.side ===
                        "SELL" &&
                        other.symbol ===
                        order.symbol &&
                        other.exchange ===
                        order.exchange,
                )
                .reduce(
                    (total, other) =>
                        total +
                        other.reservedQuantity,
                    0,
                );

        const availableQuantity =
            ownedQuantity -
            reservedByOthers;

        if (
            availableQuantity <
            newQuantity
        ) {
            throw new Error(
                "INSUFFICIENT_HOLDINGS",
            );
        }

        newReservedQuantity =
            newQuantity;
    }

    /*
     * Broker modification happens only
     * after local validation succeeds.
     */
    if (broker === mockBroker) {
        ensureMockBrokerOrder(
            order,
        );
    }

    await broker.modifyOrder(
        order.brokerOrderId,
        {
            quantity:
                newQuantity,

            limitPrice:
                order.orderType ===
                    "LIMIT"
                    ? newLimitPrice
                    : undefined,
        },
    );

    /*
     * Update PMS state atomically.
     */
    return prisma.$transaction(
        async (tx) => {
            const updatedOrder =
                await tx.order.update({
                    where: {
                        id: order.id,
                    },

                    data: {
                        quantity:
                            newQuantity,

                        limitPrice:
                            order.orderType ===
                                "LIMIT"
                                ? newLimitPrice
                                : null,

                        estimatedPrice,

                        reservedCash:
                            newReservedCash,

                        reservedQuantity:
                            newReservedQuantity,
                    },
                });

            await createAuditLog(
                {
                    firmId,

                    action:
                        "ORDER_MODIFIED",

                    entityType:
                        "Order",

                    entityId:
                        order.id,

                    message:
                        `Order modified: ${order.symbol}`,

                    metadata: {
                        oldQuantity:
                            order.quantity,

                        newQuantity,

                        oldLimitPrice:
                            order.limitPrice
                                ? Number(
                                    order.limitPrice,
                                )
                                : null,

                        newLimitPrice:
                            newLimitPrice ??
                            null,

                        oldReservedCash:
                            Number(
                                order.reservedCash,
                            ),

                        newReservedCash,

                        oldReservedQuantity:
                            order.reservedQuantity,

                        newReservedQuantity,
                    },
                },
                tx,
            );

            return updatedOrder;
        },
    );
}