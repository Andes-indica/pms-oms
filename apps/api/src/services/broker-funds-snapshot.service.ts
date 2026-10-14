import {
  supportsFunds,
  type BrokerAdapter,
  type BrokerFunds,
} from "@pms-oms/broker";

import {
  prisma,
} from "@pms-oms/db";

const DEFAULT_TTL_SECONDS = 30;
const MIN_TTL_SECONDS = 5;
const MAX_TTL_SECONDS = 300;
const DEFAULT_BROKER_TIMEOUT_MS =
  7_000;

export type BrokerFundsSnapshotValue = {
  id: string;
  brokerAccountId: string;
  availableCash: number;
  usedMargin: number;
  netAvailable: number;
  capturedAt: Date;
  reused: boolean;
};

export function getBrokerFundsSnapshotTtlMs() {
  const configured = Number(
    process.env
      .BROKER_FUNDS_SNAPSHOT_TTL_SECONDS ??
      DEFAULT_TTL_SECONDS,
  );

  if (
    !Number.isInteger(configured) ||
    configured < MIN_TTL_SECONDS ||
    configured > MAX_TTL_SECONDS
  ) {
    throw new Error(
      "BROKER_FUNDS_SNAPSHOT_TTL_INVALID",
    );
  }

  return configured * 1_000;
}

function getSnapshotTransactionTimeoutMs() {
  const configured = Number(
    process.env
      .BROKER_HTTP_TIMEOUT_MS ??
      DEFAULT_BROKER_TIMEOUT_MS,
  );

  const brokerTimeout =
    Number.isFinite(configured) &&
    configured >= 1_000 &&
    configured <= 60_000
      ? configured
      : DEFAULT_BROKER_TIMEOUT_MS;

  return brokerTimeout + 5_000;
}

function validateFunds(
  funds: BrokerFunds,
) {
  const values = [
    funds.availableCash,
    funds.usedMargin,
    funds.netAvailable,
  ];

  if (
    values.some(
      (value) =>
        !Number.isFinite(value),
    )
  ) {
    throw new Error(
      "BROKER_INVALID_FUNDS_RESPONSE",
    );
  }
}

function toValue(
  snapshot: {
    id: string;
    brokerAccountId: string;
    availableCash: unknown;
    usedMargin: unknown;
    netAvailable: unknown;
    capturedAt: Date;
  },
  reused: boolean,
): BrokerFundsSnapshotValue {
  return {
    id: snapshot.id,
    brokerAccountId:
      snapshot.brokerAccountId,
    availableCash: Number(
      snapshot.availableCash,
    ),
    usedMargin: Number(
      snapshot.usedMargin,
    ),
    netAvailable: Number(
      snapshot.netAvailable,
    ),
    capturedAt:
      snapshot.capturedAt,
    reused,
  };
}

export async function captureBrokerFundsSnapshot({
  brokerAccountId,
  firmId,
  broker,
  force = false,
  now = new Date(),
}: {
  brokerAccountId: string;
  firmId: string;
  broker: BrokerAdapter;
  force?: boolean;
  now?: Date;
}) {
  if (!supportsFunds(broker)) {
    throw new Error(
      "BROKER_FUNDS_UNSUPPORTED",
    );
  }

  const account =
    await prisma.brokerAccount
      .findFirst({
        where: {
          id: brokerAccountId,
          archivedAt: null,
          client: {
            firmId,
          },
        },
        select: {
          id: true,
        },
      });

  if (!account) {
    throw new Error(
      "BROKER_ACCOUNT_NOT_FOUND",
    );
  }

  const ttlMs =
    getBrokerFundsSnapshotTtlMs();

  return prisma.$transaction(
    async (tx) => {
      /*
       * Coalesce concurrent refreshes for the
       * same broker account across API workers.
       */
      await tx.$queryRaw`
        SELECT pg_advisory_xact_lock(
          hashtext(${brokerAccountId})
        )::text AS locked
      `;

      const latest =
        await tx.brokerFundsSnapshot
          .findFirst({
            where: {
              brokerAccountId,
            },
            orderBy: {
              capturedAt: "desc",
            },
          });

      if (
        !force &&
        latest &&
        now.getTime() -
          latest.capturedAt.getTime() <=
          ttlMs
      ) {
        return toValue(
          latest,
          true,
        );
      }

      const funds =
        await broker.getFunds();

      validateFunds(funds);

      const saved =
        await tx.brokerFundsSnapshot
          .create({
            data: {
              brokerAccountId,
              availableCash:
                funds.availableCash,
              usedMargin:
                funds.usedMargin,
              netAvailable:
                funds.netAvailable,
              capturedAt:
                new Date(),
            },
          });

      return toValue(
        saved,
        false,
      );
    },
    {
      maxWait: 5_000,
      timeout:
        getSnapshotTransactionTimeoutMs(),
    },
  );
}
