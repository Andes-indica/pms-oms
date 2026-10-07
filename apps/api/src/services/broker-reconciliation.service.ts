import {
    supportsHoldings,
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
    classifyInventoryReconciliation,
} from "./holding-reconciliation-policy";

export type RepairBrokerHoldingInput = {
    symbol: string;
    exchange: string;
    portfolioId: string;
};
export type HoldingReconciliationStatus =
    | "MATCH"
    | "MISSING_IN_PMS"
    | "MISSING_AT_BROKER"
    | "QUANTITY_MISMATCH";

export type HoldingReconciliationItem = {
    symbol: string;
    exchange: string;

    status:
    HoldingReconciliationStatus;

    brokerQuantity: number;
    pmsQuantity: number;

    brokerAveragePrice:
    number | null;

    pmsAveragePrice:
    number | null;

    quantityDifference: number;

    averagePriceDifference:
    number | null;
};
export type ImportBrokerHoldingsInput = {
    portfolioId: string;
};
function key(
    exchange: string,
    symbol: string,
) {
    return `${exchange.toUpperCase()}:${symbol.toUpperCase()}`;
}

export async function reconcileBrokerHoldings(
    brokerAccountId: string,
    firmId: string,
) {
    /*
     * Verify broker account belongs to
     * the authenticated firm.
     */
    const brokerAccount =
        await prisma.brokerAccount.findFirst({
            where: {
                id: brokerAccountId,

                client: {
                    firmId,
                },
            },

            select: {
                id: true,
                broker: true,
                accountId: true,
                clientId: true,
            },
        });

    if (!brokerAccount) {
        throw new Error(
            "BROKER_ACCOUNT_NOT_FOUND",
        );
    }

    const broker =
        await resolveBroker(
            brokerAccountId,
            firmId,
        );

    if (
        !supportsHoldings(
            broker,
        )
    ) {
        throw new Error(
            "BROKER_HOLDINGS_UNSUPPORTED",
        );
    }

    const [
        brokerHoldings,
        pmsHoldings,
    ] =
        await Promise.all([
            broker.getHoldings(),

            prisma.holding.findMany({
                where: {
                    brokerAccountId,

                    portfolio: {
                        client: {
                            firmId,
                        },
                    },
                },

                select: {
                    symbol: true,
                    exchange: true,
                    quantity: true,
                    averagePrice: true,
                },
            }),
        ]);

    /*
     * Broker account is one account,
     * but PMS holdings may be spread over
     * several portfolios.
     *
     * Aggregate PMS holdings by instrument.
     */
    const pmsMap =
        new Map<
            string,
            {
                symbol: string;
                exchange: string;
                quantity: number;
                totalCost: number;
            }
        >();

    for (
        const holding of
        pmsHoldings
    ) {
        const normalizedKey =
            key(
                holding.exchange,
                holding.symbol,
            );

        const quantity =
            holding.quantity;

        const averagePrice =
            Number(
                holding.averagePrice,
            );

        const existing =
            pmsMap.get(
                normalizedKey,
            );

        if (existing) {
            existing.quantity +=
                quantity;

            existing.totalCost +=
                quantity *
                averagePrice;
        } else {
            pmsMap.set(
                normalizedKey,
                {
                    symbol:
                        holding.symbol
                            .toUpperCase(),

                    exchange:
                        holding.exchange
                            .toUpperCase(),

                    quantity,

                    totalCost:
                        quantity *
                        averagePrice,
                },
            );
        }
    }

    const brokerMap =
        new Map(
            brokerHoldings.map(
                (holding) => [
                    key(
                        holding.exchange,
                        holding.symbol,
                    ),

                    {
                        ...holding,

                        symbol:
                            holding.symbol
                                .toUpperCase(),

                        exchange:
                            holding.exchange
                                .toUpperCase(),
                    },
                ],
            ),
        );

    const instrumentKeys =
        new Set([
            ...brokerMap.keys(),
            ...pmsMap.keys(),
        ]);

    const items:
        HoldingReconciliationItem[] =
        [];

    for (
        const instrumentKey of
        instrumentKeys
    ) {
        const brokerHolding =
            brokerMap.get(
                instrumentKey,
            );

        const pmsHolding =
            pmsMap.get(
                instrumentKey,
            );

        const brokerQuantity =
            brokerHolding
                ?.quantity ?? 0;

        const pmsQuantity =
            pmsHolding
                ?.quantity ?? 0;

        const brokerAveragePrice =
            brokerHolding
                ? brokerHolding
                    .averagePrice
                : null;

        const pmsAveragePrice =
            pmsHolding &&
                pmsHolding.quantity >
                0
                ? pmsHolding
                    .totalCost /
                pmsHolding
                    .quantity
                : null;

        const status:
            HoldingReconciliationStatus =
            classifyInventoryReconciliation({
                brokerPresent:
                    Boolean(
                        brokerHolding,
                    ),

                pmsPresent:
                    Boolean(
                        pmsHolding,
                    ),

                brokerQuantity,
                pmsQuantity,
            });

        items.push({
            symbol:
                brokerHolding
                    ?.symbol ??
                pmsHolding!
                    .symbol,

            exchange:
                brokerHolding
                    ?.exchange ??
                pmsHolding!
                    .exchange,

            status,

            brokerQuantity,
            pmsQuantity,

            brokerAveragePrice,
            pmsAveragePrice,

            quantityDifference:
                brokerQuantity -
                pmsQuantity,

            averagePriceDifference:
                brokerAveragePrice !==
                    null &&
                    pmsAveragePrice !==
                    null
                    ? brokerAveragePrice -
                    pmsAveragePrice
                    : null,
        });
    }

    items.sort(
        (left, right) => {
            if (
                left.status ===
                "MATCH" &&
                right.status !==
                "MATCH"
            ) {
                return 1;
            }

            if (
                left.status !==
                "MATCH" &&
                right.status ===
                "MATCH"
            ) {
                return -1;
            }

            return (
                `${left.exchange}:${left.symbol}`
                    .localeCompare(
                        `${right.exchange}:${right.symbol}`,
                    )
            );
        },
    );

    const mismatchCount =
        items.filter(
            (item) =>
                item.status !==
                "MATCH",
        ).length;

    return {
        brokerAccountId:
            brokerAccount.id,

        broker:
            brokerAccount.broker,

        accountId:
            brokerAccount.accountId,

        status:
            mismatchCount === 0
                ? "MATCH"
                : "MISMATCH",

        matchedCount:
            items.length -
            mismatchCount,

        mismatchCount,

        items,

        fetchedAt:
            new Date()
                .toISOString(),
    };
}

export async function repairBrokerHolding(
    brokerAccountId: string,
    firmId: string,
    input: RepairBrokerHoldingInput,
    actorUserId?: string,
) {
    const symbol =
        input.symbol
            .trim()
            .toUpperCase();

    const exchange =
        input.exchange
            .trim()
            .toUpperCase();

    if (
        !symbol ||
        !exchange ||
        !input.portfolioId
    ) {
        throw new Error(
            "INVALID_RECONCILIATION_INPUT",
        );
    }

    const brokerAccount =
        await prisma.brokerAccount.findFirst({
            where: {
                id: brokerAccountId,

                client: {
                    firmId,
                },
            },

            select: {
                id: true,
                clientId: true,
                broker: true,
                accountId: true,
            },
        });

    if (!brokerAccount) {
        throw new Error(
            "BROKER_ACCOUNT_NOT_FOUND",
        );
    }

    /*
     * The human-selected portfolio must belong
     * to the same client as this broker account.
     */
    const portfolio =
        await prisma.portfolio.findFirst({
            where: {
                id:
                    input.portfolioId,

                clientId:
                    brokerAccount.clientId,

                client: {
                    firmId,
                },
            },

            select: {
                id: true,
            },
        });

    if (!portfolio) {
        throw new Error(
            "RECONCILIATION_PORTFOLIO_INVALID",
        );
    }

    const broker =
        await resolveBroker(
            brokerAccountId,
            firmId,
        );

    if (
        !supportsHoldings(
            broker,
        )
    ) {
        throw new Error(
            "BROKER_HOLDINGS_UNSUPPORTED",
        );
    }

    /*
     * Always fetch broker truth again.
     *
     * Never repair from stale browser data.
     */
    const brokerHoldings =
        await broker.getHoldings();

    const brokerHolding =
        brokerHoldings.find(
            (holding) =>
                holding.symbol
                    .toUpperCase() ===
                symbol &&
                holding.exchange
                    .toUpperCase() ===
                exchange,
        );

    const brokerQuantity =
        brokerHolding
            ?.quantity ?? 0;

    const brokerAveragePrice =
        brokerHolding
            ?.averagePrice ?? null;

    /*
     * Find every PMS allocation of this
     * instrument under the same broker.
     */
    const pmsHoldings =
        await prisma.holding.findMany({
            where: {
                brokerAccountId,

                symbol,
                exchange,

                portfolio: {
                    client: {
                        firmId,
                    },
                },
            },

            orderBy: {
                createdAt: "asc",
            },
        });

    /*
     * If the broker has none and PMS has none,
     * reconciliation is already complete.
     */
    if (
        brokerQuantity === 0 &&
        pmsHoldings.length === 0
    ) {
        return {
            changed: false,
            reason:
                "ALREADY_RECONCILED",
        };
    }

    /*
     * We cannot infer how a broker-level
     * holding should be distributed among
     * multiple PMS portfolios.
     */
    if (
        pmsHoldings.length > 1
    ) {
        throw new Error(
            "RECONCILIATION_ALLOCATION_REQUIRED",
        );
    }

    const existingHolding =
        pmsHoldings[0] ?? null;

    /*
     * If a PMS holding already exists, the
     * chosen portfolio must be that portfolio.
     *
     * Do not silently move holdings between
     * portfolios.
     */
    if (
        existingHolding &&
        existingHolding.portfolioId !==
        portfolio.id
    ) {
        throw new Error(
            "RECONCILIATION_PORTFOLIO_MISMATCH",
        );
    }

    const before = existingHolding
        ? {
            quantity:
                existingHolding.quantity,

            averagePrice:
                Number(
                    existingHolding.averagePrice,
                ),

            portfolioId:
                existingHolding.portfolioId,
        }
        : null;

    return prisma.$transaction(
        async (tx) => {
            /*
             * Broker has no holding.
             *
             * The single PMS holding is stale,
             * so remove it.
             */
            if (
                brokerQuantity === 0
            ) {
                if (existingHolding) {
                    await tx.holding.delete({
                        where: {
                            id:
                                existingHolding.id,
                        },
                    });
                }

                await createAuditLog(
                    {
                        firmId,

                        action:
                            "BROKER_RECONCILED",

                        entityType:
                            "BROKER_ACCOUNT",

                        entityId:
                            brokerAccount.id,

                        message:
                            "Broker holding reconciliation repaired PMS state",

                        actorUserId,

                        metadata: {
                            symbol,
                            exchange,

                            repair:
                                "DELETE_STALE_PMS_HOLDING",

                            before,

                            after: null,

                            brokerQuantity: 0,

                            brokerAveragePrice:
                                null,

                            portfolioId:
                                portfolio.id,
                        },
                    },

                    tx,
                );

                return {
                    changed:
                        Boolean(
                            existingHolding,
                        ),

                    symbol,
                    exchange,

                    quantity: 0,

                    averagePrice:
                        null,

                    portfolioId:
                        portfolio.id,
                };
            }

            if (
                brokerAveragePrice === null ||
                !Number.isFinite(
                    brokerAveragePrice,
                ) ||
                brokerAveragePrice < 0
            ) {
                throw new Error(
                    "BROKER_INVALID_HOLDINGS_RESPONSE",
                );
            }

            /*
             * Broker has a holding but PMS doesn't.
             *
             * Explicit portfolio selection makes
             * creation safe.
             */
            if (!existingHolding) {
                const created =
                    await tx.holding.create({
                        data: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol,
                            exchange,

                            quantity:
                                brokerQuantity,

                            averagePrice:
                                brokerAveragePrice,
                        },
                    });

                await createAuditLog(
                    {
                        firmId,

                        action:
                            "BROKER_RECONCILED",

                        entityType:
                            "BROKER_ACCOUNT",

                        entityId:
                            brokerAccount.id,

                        message:
                            "Broker holding reconciliation repaired PMS state",

                        actorUserId,

                        metadata: {
                            symbol,
                            exchange,

                            repair:
                                "CREATE_MISSING_PMS_HOLDING",

                            before: null,

                            after: {
                                quantity:
                                    created.quantity,

                                averagePrice:
                                    Number(
                                        created.averagePrice,
                                    ),

                                portfolioId:
                                    created.portfolioId,
                            },

                            brokerQuantity,

                            brokerAveragePrice,

                            portfolioId:
                                portfolio.id,
                        },
                    },

                    tx,
                );

                return {
                    changed: true,

                    symbol,
                    exchange,

                    quantity:
                        created.quantity,

                    averagePrice:
                        Number(
                            created.averagePrice,
                        ),

                    portfolioId:
                        created.portfolioId,
                };
            }

            /*
             * Exactly one PMS holding exists.
             *
             * Safe to align it directly with the
             * broker account's current holding.
             */
            const changed =
                existingHolding.quantity !==
                brokerQuantity;

            if (!changed) {
                return {
                    changed: false,

                    reason:
                        "ALREADY_RECONCILED",
                };
            }

            const updated =
                await tx.holding.update({
                    where: {
                        id:
                            existingHolding.id,
                    },

                    data: {
                        quantity:
                            brokerQuantity,
                    },
                });

            await createAuditLog(
                {
                    firmId,

                    action:
                        "BROKER_RECONCILED",

                    entityType:
                        "BROKER_ACCOUNT",

                    entityId:
                        brokerAccount.id,

                    message:
                        "Broker holding reconciliation repaired PMS state",

                    metadata: {
                        symbol,
                        exchange,

                        repair:
                            "UPDATE_PMS_HOLDING",

                        before,

                        after: {
                            quantity:
                                updated.quantity,

                            averagePrice:
                                Number(
                                    updated.averagePrice,
                                ),

                            portfolioId:
                                updated.portfolioId,
                        },

                        brokerQuantity,

                        brokerAveragePrice,

                        portfolioId:
                            portfolio.id,
                    },
                },

                tx,
            );

            return {
                changed: true,

                symbol,
                exchange,

                quantity:
                    updated.quantity,

                averagePrice:
                    Number(
                        updated.averagePrice,
                    ),

                portfolioId:
                    updated.portfolioId,
            };
        },
    );
}
export async function importBrokerHoldings(
    brokerAccountId: string,
    firmId: string,
    input: ImportBrokerHoldingsInput,
    actorUserId?: string,
) {
    if (!input.portfolioId) {
        throw new Error(
            "INVALID_RECONCILIATION_INPUT",
        );
    }

    const brokerAccount =
        await prisma.brokerAccount.findFirst({
            where: {
                id: brokerAccountId,

                client: {
                    firmId,
                },
            },

            select: {
                id: true,
                clientId: true,
            },
        });

    if (!brokerAccount) {
        throw new Error(
            "BROKER_ACCOUNT_NOT_FOUND",
        );
    }

    const portfolio =
        await prisma.portfolio.findFirst({
            where: {
                id: input.portfolioId,

                clientId:
                    brokerAccount.clientId,

                client: {
                    firmId,
                },
            },

            select: {
                id: true,
            },
        });

    if (!portfolio) {
        throw new Error(
            "RECONCILIATION_PORTFOLIO_INVALID",
        );
    }

    const broker =
        await resolveBroker(
            brokerAccountId,
            firmId,
        );

    if (!supportsHoldings(broker)) {
        throw new Error(
            "BROKER_HOLDINGS_UNSUPPORTED",
        );
    }

    const brokerHoldings =
        await broker.getHoldings();

    const existingHoldings =
        await prisma.holding.findMany({
            where: {
                brokerAccountId,

                portfolio: {
                    client: {
                        firmId,
                    },
                },
            },

            select: {
                symbol: true,
                exchange: true,
            },
        });

    const existingKeys =
        new Set(
            existingHoldings.map(
                (holding) =>
                    key(
                        holding.exchange,
                        holding.symbol,
                    ),
            ),
        );

    const missingHoldings =
        brokerHoldings.filter(
            (holding) =>
                holding.quantity > 0 &&
                !existingKeys.has(
                    key(
                        holding.exchange,
                        holding.symbol,
                    ),
                ),
        );

    return prisma.$transaction(
        async (tx) => {
            const imported = [];

            for (
                const holding of
                missingHoldings
            ) {
                const symbol =
                    holding.symbol
                        .trim()
                        .toUpperCase();

                const exchange =
                    holding.exchange
                        .trim()
                        .toUpperCase();

                if (
                    !Number.isInteger(
                        holding.quantity,
                    ) ||
                    holding.quantity <= 0 ||
                    !Number.isFinite(
                        holding.averagePrice,
                    ) ||
                    holding.averagePrice < 0
                ) {
                    throw new Error(
                        "BROKER_INVALID_HOLDINGS_RESPONSE",
                    );
                }
                const existingAllocation =
                    await tx.holding.findFirst({
                        where: {
                            brokerAccountId:
                                brokerAccount.id,

                            symbol,
                            exchange,
                        },
                    });

                if (existingAllocation) {
                    continue;
                }
                const created =
                    await tx.holding.upsert({
                        where: {
                            portfolioId_brokerAccountId_symbol_exchange:
                            {
                                portfolioId:
                                    portfolio.id,

                                brokerAccountId:
                                    brokerAccount.id,

                                symbol,
                                exchange,
                            },
                        },

                        update: {},

                        create: {
                            portfolioId:
                                portfolio.id,

                            brokerAccountId:
                                brokerAccount.id,

                            symbol,
                            exchange,

                            quantity:
                                holding.quantity,

                            averagePrice:
                                holding.averagePrice,
                        },
                    });

                imported.push(
                    created,
                );

                await createAuditLog(
                    {
                        firmId,

                        action:
                            "BROKER_RECONCILED",

                        entityType:
                            "BROKER_ACCOUNT",

                        entityId:
                            brokerAccount.id,

                        message:
                            "Broker holding imported into PMS",

                        actorUserId,

                        metadata: {
                            repair:
                                "IMPORT_EXISTING_BROKER_HOLDING",

                            symbol,
                            exchange,

                            quantity:
                                created.quantity,

                            averagePrice:
                                Number(
                                    created.averagePrice,
                                ),

                            portfolioId:
                                portfolio.id,
                        },
                    },

                    tx,
                );
            }

            return {
                importedCount:
                    imported.length,

                portfolioId:
                    portfolio.id,

                holdings:
                    imported,
            };
        },
    );
}