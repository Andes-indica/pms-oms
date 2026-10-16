import { createHash } from "node:crypto";

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

import { createZerodhaPublisherOrderTag } from "@pms-oms/broker";
import { prisma } from "@pms-oms/db";

import {
  clearTestDatabase,
  createTestAccount,
} from "../test/integration-db";

import {
  completeClientOrderConfirmation,
  declineClientOrderConfirmation,
  getClientOrderConfirmation,
  requestClientOrderConfirmation,
  resolveClientOrderConfirmationAsNotPlaced,
  startClientOrderHandoff,
} from "./client-order-confirmation.service";

import { enqueueOrderExecution } from "./order-execution-queue.service";
import {
  reconcilePublisherOrderService,
} from "./publisher-order-reconciliation.service";

const previousPublisherApiKey =
  process.env.ZERODHA_PUBLISHER_API_KEY;

beforeAll(() => {
  process.env.ZERODHA_PUBLISHER_API_KEY =
    "publisher-api-key";
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();

  if (previousPublisherApiKey === undefined) {
    delete process.env.ZERODHA_PUBLISHER_API_KEY;
  } else {
    process.env.ZERODHA_PUBLISHER_API_KEY =
      previousPublisherApiKey;
  }

  await prisma.$disconnect();
});

async function createConfirmationOrder() {
  const account = await createTestAccount({
    cashBalance: 100_000,
  });

  await prisma.brokerAccount.update({
    where: {
      id: account.brokerAccount.id,
    },
    data: {
      broker: "ZERODHA",
      accountId: "AB1234",
    },
  });

  const order = await prisma.order.create({
    data: {
      portfolioId: account.portfolio.id,
      brokerAccountId: account.brokerAccount.id,
      symbol: "INFY",
      exchange: "NSE",
      side: "BUY",
      orderType: "LIMIT",
      quantity: 10,
      limitPrice: 1500,
      status: "PENDING",
      executionMode: "CLIENT_CONFIRMATION",
    },
  });

  return {
    ...account,
    order,
  };
}

describe("client-confirmed execution integration", () => {
  test(
    "creates a hashed link and immutable Publisher handoff without client API credentials",
    async () => {
      const account = await createConfirmationOrder();

      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      expect(requested.token.length)
        .toBeGreaterThanOrEqual(32);

      const saved =
        await prisma.clientOrderConfirmation
          .findUniqueOrThrow({
            where: {
              orderId: account.order.id,
            },
          });

      expect(saved.tokenHash).not.toBe(requested.token);
      expect(saved.tokenHash).toBe(
        createHash("sha256")
          .update(requested.token)
          .digest("hex"),
      );

      const reserved =
        await prisma.order.findUniqueOrThrow({
          where: {
            id: account.order.id,
          },
        });

      expect(Number(reserved.reservedCash)).toBe(15_000);

      await expect(
        enqueueOrderExecution(
          account.order.id,
          account.firm.id,
        ),
      ).rejects.toThrow("CLIENT_CONFIRMATION_REQUIRED");

      const summary = await getClientOrderConfirmation(
        requested.token,
      );
      expect(summary.order.maskedBrokerAccountId)
        .toBe("**1234");

      const handoff = await startClientOrderHandoff(
        requested.token,
      );

      expect(handoff.apiKey).toBe("publisher-api-key");
      expect(handoff.basket).toEqual([
        expect.objectContaining({
          tradingsymbol: "INFY",
          transaction_type: "BUY",
          order_type: "LIMIT",
          quantity: 10,
          price: 1500,
          readonly: true,
          tag: createZerodhaPublisherOrderTag(account.order.id),
        }),
      ]);
      expect(
        handoff.basket[0]?.tag,
      ).toHaveLength(8);

      const connection =
        await prisma.brokerConnection.findUnique({
          where: {
            brokerAccountId: account.brokerAccount.id,
          },
        });
      expect(connection).toBeNull();
    },
  );

  test(
    "records a successful Publisher return without inventing a broker order id",
    async () => {
      const account = await createConfirmationOrder();
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await startClientOrderHandoff(requested.token);

      const completed =
        await completeClientOrderConfirmation({
          token: requested.token,
          status: "success",
          requestToken:
            "publisherrequesttoken1",
        });

      expect(completed).toEqual({
        status: "CONFIRMED",
        orderId: account.order.id,
        firmId: account.firm.id,
      });

      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: account.order.id,
        },
        include: {
          clientConfirmation: true,
        },
      });

      expect(order.status).toBe("SUBMITTED");
      expect(order.brokerOrderId).toBeNull();
      expect(order.clientConfirmation?.status).toBe("CONFIRMED");
      expect(Number(order.reservedCash)).toBe(15_000);

      await expect(
        completeClientOrderConfirmation({
          token: requested.token,
          status: "success",
          requestToken:
            "publisherrequesttoken1",
        }),
      ).resolves.toEqual(completed);
    },
  );

  test(
    "requires the application Publisher key before issuing a client link",
    async () => {
      const account = await createConfirmationOrder();
      delete process.env.ZERODHA_PUBLISHER_API_KEY;

      try {
        await expect(
          requestClientOrderConfirmation(
            account.order.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "ZERODHA_PUBLISHER_API_KEY_NOT_CONFIGURED",
        );
      } finally {
        process.env.ZERODHA_PUBLISHER_API_KEY =
          "publisher-api-key";
      }
    },
  );

  test(
    "releases reservations when the Publisher flow is cancelled",
    async () => {
      const account = await createConfirmationOrder();
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await startClientOrderHandoff(requested.token);
      const declined =
        await completeClientOrderConfirmation({
          token: requested.token,
          status: "cancelled",
          requestToken: null,
        });

      expect(declined.status).toBe("DECLINED");

      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: account.order.id,
        },
        include: {
          clientConfirmation: true,
        },
      });

      expect(order.status).toBe("PENDING");
      expect(Number(order.reservedCash)).toBe(0);
      expect(order.clientConfirmation?.status).toBe("DECLINED");
    },
  );

  test(
    "keeps a started handoff reserved when Zerodha's callback is incomplete",
    async () => {
      const account = await createConfirmationOrder();
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await startClientOrderHandoff(requested.token);

      await expect(
        completeClientOrderConfirmation({
          token: requested.token,
          status: "success",
          requestToken: null,
        }),
      ).rejects.toThrow(
        "ZERODHA_CALLBACK_STATUS_UNCERTAIN",
      );

      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: account.order.id,
        },
        include: {
          clientConfirmation: true,
        },
      });
      expect(order.status).toBe("PENDING");
      expect(Number(order.reservedCash)).toBe(15_000);
      expect(order.clientConfirmation?.status)
        .toBe("HANDOFF_STARTED");
      expect(order.clientConfirmation?.lastError)
        .toBe("ZERODHA_CALLBACK_STATUS_UNCERTAIN");
    },
  );

  test(
    "releases a started handoff only after an explicit manager resolution",
    async () => {
      const account = await createConfirmationOrder();
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await startClientOrderHandoff(requested.token);
      await resolveClientOrderConfirmationAsNotPlaced(
        account.order.id,
        account.firm.id,
      );

      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: account.order.id,
        },
        include: {
          clientConfirmation: true,
        },
      });
      expect(order.status).toBe("PENDING");
      expect(Number(order.reservedCash)).toBe(0);
      expect(order.clientConfirmation?.status).toBe("DECLINED");
      expect(order.clientConfirmation?.lastError)
        .toBe("MANUALLY_CONFIRMED_NOT_PLACED");
    },
  );

  test(
    "releases reservations when a link expires and permits a replacement",
    async () => {
      const account = await createConfirmationOrder();
      const issuedAt = new Date(
        Date.now() - 31 * 60 * 1000,
      );
      const expired =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
          undefined,
          issuedAt,
        );

      const summary = await getClientOrderConfirmation(
        expired.token,
        new Date(),
      );
      expect(summary.status).toBe("EXPIRED");

      const expiredOrder =
        await prisma.order.findUniqueOrThrow({
          where: {
            id: account.order.id,
          },
        });
      expect(Number(expiredOrder.reservedCash)).toBe(0);

      const replacement =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );
      expect(replacement.token).not.toBe(expired.token);

      await declineClientOrderConfirmation(replacement.token);
    },
  );

  test(
    "never expires or replaces a handoff that may already have reached Zerodha",
    async () => {
      const account = await createConfirmationOrder();
      const issuedAt = new Date(
        Date.now() - 31 * 60 * 1000,
      );
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
          undefined,
          issuedAt,
        );

      await startClientOrderHandoff(
        requested.token,
        new Date(
          issuedAt.getTime() + 1_000,
        ),
      );

      const summary = await getClientOrderConfirmation(
        requested.token,
        new Date(),
      );
      expect(summary.status).toBe("HANDOFF_STARTED");
      expect(summary.canHandoff).toBeFalse();

      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: account.order.id,
        },
      });
      expect(Number(order.reservedCash)).toBe(15_000);

      await expect(
        requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        ),
      ).rejects.toThrow(
        "CLIENT_CONFIRMATION_HANDOFF_IN_PROGRESS",
      );
    },
  );

  test(
    "requires explicit regeneration and invalidates the previous active link",
    async () => {
      const account =
        await createConfirmationOrder();
      const first =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await expect(
        requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        ),
      ).rejects.toThrow(
        "CLIENT_CONFIRMATION_LINK_ACTIVE",
      );

      const replacement =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
          undefined,
          new Date(),
          true,
        );

      expect(replacement.token)
        .not.toBe(first.token);
      await expect(
        getClientOrderConfirmation(
          first.token,
        ),
      ).rejects.toThrow(
        "CLIENT_CONFIRMATION_LINK_INVALID",
      );
      await expect(
        getClientOrderConfirmation(
          replacement.token,
        ),
      ).resolves.toMatchObject({
        status: "AWAITING_CLIENT",
      });
    },
  );

  test(
    "applies a manager-verified Publisher fill to PMS cash and holdings",
    async () => {
      const account =
        await createConfirmationOrder();
      const requested =
        await requestClientOrderConfirmation(
          account.order.id,
          account.firm.id,
        );

      await startClientOrderHandoff(
        requested.token,
      );
      await completeClientOrderConfirmation({
        token: requested.token,
        status: "success",
        requestToken:
          "publisherrequesttoken1",
      });

      const actor =
        await prisma.user.create({
          data: {
            name: "Operations User",
            email:
              `operations-${crypto.randomUUID()}@example.com`,
            passwordHash: "test",
            role: "OPERATIONS",
            firmId: account.firm.id,
          },
        });

      const updated =
        await reconcilePublisherOrderService({
          orderId: account.order.id,
          firmId: account.firm.id,
          actorUserId:
            actor.id,
          brokerOrderId:
            "ZERODHA-ORDER-1",
          status: "FILLED",
          filledQuantity: 10,
          averageFillPrice: 1_510,
          notes:
            "Verified in the client Kite order book",
        });

      expect(updated.status).toBe("FILLED");
      expect(updated.brokerOrderId)
        .toBe("ZERODHA-ORDER-1");
      expect(updated.filledQuantity).toBe(10);

      const holding =
        await prisma.holding.findUniqueOrThrow({
          where: {
            portfolioId_brokerAccountId_symbol_exchange: {
              portfolioId:
                account.portfolio.id,
              brokerAccountId:
                account.brokerAccount.id,
              symbol: "INFY",
              exchange: "NSE",
            },
          },
        });
      expect(holding.quantity).toBe(10);
      expect(Number(holding.averagePrice))
        .toBe(1_510);

      const portfolio =
        await prisma.portfolio.findUniqueOrThrow({
          where: {
            id: account.portfolio.id,
          },
        });
      expect(Number(portfolio.cashBalance))
        .toBe(84_900);

      const confirmation =
        await prisma.clientOrderConfirmation
          .findUniqueOrThrow({
            where: {
              orderId:
                account.order.id,
            },
          });
      expect(confirmation.reconciledAt)
        .not.toBeNull();
      expect(
        confirmation
          .reconciledByUserId,
      ).toBe(actor.id);
      expect(
        confirmation
          .reconciliationNotes,
      ).toBe(
        "Verified in the client Kite order book",
      );
    },
  );
});
