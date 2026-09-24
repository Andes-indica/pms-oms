import { MockBroker } from "@pms-oms/broker";

import {
    type BrokerAdapter,
} from "@pms-oms/broker";

import {
    prisma,
} from "@pms-oms/db";

import type {
    BrokerFactory,
} from "./broker-factory.types";

import {
    createZerodhaBroker,
} from "./providers/zerodha.factory";

import {
    decryptBrokerData,
} from "../security/broker-credential-crypto";

export const mockBroker =
    new MockBroker();

const factories =
    new Map<
        string,
        BrokerFactory
    >();

factories.set(
    "MOCK",
    async () => mockBroker,
);

factories.set(
    "ZERODHA",
    createZerodhaBroker,
);

export async function resolveBroker(
    brokerAccountId: string,
    firmId: string,
): Promise<BrokerAdapter> {
    const account =
        await prisma
            .brokerAccount
            .findFirst({
                where: {
                    id: brokerAccountId,

                    client: {
                        firmId,
                    },
                },

                include: {
                    connection: true,
                },
            });

    if (!account) {
        throw new Error(
            "BROKER_ACCOUNT_NOT_FOUND",
        );
    }

    const brokerName =
        account.broker
            .toUpperCase();

    const factory =
        factories.get(
            brokerName,
        );

    if (!factory) {
        throw new Error(
            "UNSUPPORTED_BROKER",
        );
    }
    if (
        brokerName !== "MOCK" &&
        (
            !account.connection ||
            !account.connection
                .credentialsEncrypted ||
            !account.connection
                .sessionEncrypted
        )
    ) {
        throw new Error(
            "BROKER_NOT_CONNECTED",
        );
    }

    if (
        account.connection
            ?.sessionExpiresAt &&
        account.connection
            .sessionExpiresAt <=
        new Date()
    ) {
        if(account.connection.status!== "EXPIRED"){
            await prisma 
            .brokerConnection
            .update({
                where:{
                    brokerAccountId:account.id,
                },
                data:{
                    status:"EXPIRED",
                },
            });
        }
    
    
        throw new Error(
            "BROKER_SESSION_EXPIRED",
        );
    }

    return factory({
        brokerAccountId:
            account.id,

        accountId:
            account.accountId,

        credentials:
            account.connection
                ?.credentialsEncrypted
                ? decryptBrokerData(
                    account.connection
                        .credentialsEncrypted,
                )
                : null,

        session:
            account.connection
                ?.sessionEncrypted
                ? decryptBrokerData(
                    account.connection
                        .sessionEncrypted,
                )
                : null,
    });
}