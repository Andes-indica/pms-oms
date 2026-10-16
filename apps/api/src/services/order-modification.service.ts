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

import {
    runRiskChecks,
} from "./risk.service";

export async function modifyOrderService(
    orderId: string,
    firmId: string,
    input: ModifyOrderInput,
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

    if (
        order.executionMode ===
        "CLIENT_CONFIRMATION"
    ) {
        throw new Error(
            "CLIENT_CONFIRMED_ORDER_MANAGE_IN_BROKER",
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

    /* Reuse the complete configured risk policy for modifications. */
    await runRiskChecks({
        currentOrderId:
            order.id,
        portfolioId:
            order.portfolioId,
        brokerAccountId:
            order.brokerAccountId,
        symbol:
            order.symbol,
        exchange:
            order.exchange,
        side:
            order.side,
        quantity:
            newQuantity,
        estimatedPrice,
        availabilityAuthority:
            "BROKER",
    });

    let newReservedCash = 0;
    let newReservedQuantity = 0;

    if (order.side === "BUY") {
        newReservedCash =
            estimatedValue;
    }

    if (order.side === "SELL") {
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

                    actorUserId,

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
