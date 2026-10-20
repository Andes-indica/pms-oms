import {
  afterAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  prisma,
  recoverAdministrator,
} from "@pms-oms/db";

import {
  clearTestDatabase,
  createTestAccount,
} from "../test/integration-db";
import {
  archiveClientService,
  deleteClientService,
  restoreClientService,
} from "./client-management.service";
import {
  archivePortfolioService,
  deletePortfolioService,
  restorePortfolioService,
} from "./portfolio-management.service";
import {
  createOrderService,
} from "./order.service";
import {
  cleanupExecutionJobs,
} from "./order-execution-worker.service";
import {
  getOperationsSnapshot,
} from "./operations.service";

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
  await prisma.$disconnect();
});

describe(
  "client and portfolio lifecycle",
  () => {
    test(
      "archives history without deleting it and blocks new orders",
      async () => {
        const account =
          await createTestAccount();

        const historicalOrder =
          await prisma.order.create({
            data: {
              portfolioId:
                account.portfolio.id,
              brokerAccountId:
                account.brokerAccount.id,
              symbol: "INFY",
              exchange: "NSE",
              side: "BUY",
              orderType: "LIMIT",
              quantity: 1,
              limitPrice: 1_500,
              status: "FILLED",
              filledQuantity: 1,
              averageFillPrice:
                1_500,
            },
          });

        const archived =
          await archiveClientService(
            account.client.id,
            account.firm.id,
          );

        expect(
          archived.archivedAt,
        ).not.toBeNull();

        const portfolio =
          await prisma.portfolio
            .findUniqueOrThrow({
              where: {
                id:
                  account.portfolio.id,
              },
            });
        const brokerAccount =
          await prisma.brokerAccount
            .findUniqueOrThrow({
              where: {
                id:
                  account.brokerAccount.id,
              },
            });

        expect(
          portfolio.archivedAt,
        ).not.toBeNull();
        expect(
          brokerAccount.archivedAt,
        ).not.toBeNull();
        expect(
          await prisma.order.count({
            where: {
              id: historicalOrder.id,
            },
          }),
        ).toBe(1);

        await expect(
          createOrderService({
            firmId:
              account.firm.id,
            portfolioId:
              account.portfolio.id,
            brokerAccountId:
              account.brokerAccount.id,
            symbol: "INFY",
            exchange: "NSE",
            side: "BUY",
            orderType: "LIMIT",
            quantity: 1,
            limitPrice: 1_500,
          }),
        ).rejects.toThrow(
          "PORTFOLIO_NOT_FOUND",
        );

        await restoreClientService(
          account.client.id,
          account.firm.id,
        );

        await expect(
          restorePortfolioService(
            account.portfolio.id,
            account.firm.id,
          ),
        ).resolves.toMatchObject({
          id: account.portfolio.id,
          archivedAt: null,
        });

        await expect(
          deletePortfolioService(
            account.portfolio.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "PORTFOLIO_NOT_EMPTY",
        );
      },
    );

    test(
      "refuses archival while positions or active orders remain",
      async () => {
        const account =
          await createTestAccount();

        const holding =
          await prisma.holding.create({
            data: {
              portfolioId:
                account.portfolio.id,
              brokerAccountId:
                account.brokerAccount.id,
              symbol: "INFY",
              exchange: "NSE",
              quantity: 2,
              averagePrice: 1_400,
            },
          });

        await expect(
          archivePortfolioService(
            account.portfolio.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "PORTFOLIO_HAS_OPEN_POSITIONS",
        );

        await prisma.holding.delete({
          where: {
            id: holding.id,
          },
        });

        await prisma.order.create({
          data: {
            portfolioId:
              account.portfolio.id,
            brokerAccountId:
              account.brokerAccount.id,
            symbol: "INFY",
            exchange: "NSE",
            side: "BUY",
            orderType: "LIMIT",
            quantity: 1,
            limitPrice: 1_500,
            status: "OPEN",
          },
        });

        await expect(
          archiveClientService(
            account.client.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "CLIENT_HAS_ACTIVE_ORDERS",
        );
      },
    );

    test(
      "refuses archival while broker cash remains allocated",
      async () => {
        const account =
          await createTestAccount();

        await prisma.portfolioBrokerCash.create({
          data: {
            portfolioId:
              account.portfolio.id,
            brokerAccountId:
              account.brokerAccount.id,
            cashBalance: 1,
          },
        });

        await expect(
          archivePortfolioService(
            account.portfolio.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "PORTFOLIO_HAS_ALLOCATED_CASH",
        );

        await expect(
          archiveClientService(
            account.client.id,
            account.firm.id,
          ),
        ).rejects.toThrow(
          "CLIENT_HAS_ALLOCATED_CASH",
        );
      },
    );

    test(
      "permanently deletes only unused entities and keeps an audit event",
      async () => {
        const firm =
          await prisma.firm.create({
            data: {
              name: "Delete Test Firm",
            },
          });
        const client =
          await prisma.client.create({
            data: {
              name: "Unused Client",
              firmId: firm.id,
            },
          });

        await expect(
          deleteClientService(
            client.id,
            firm.id,
          ),
        ).resolves.toEqual({
          id: client.id,
          deleted: true,
        });

        expect(
          await prisma.client.count({
            where: {
              id: client.id,
            },
          }),
        ).toBe(0);
        expect(
          await prisma.auditLog.count({
            where: {
              action:
                "CLIENT_DELETED",
              entityId: client.id,
            },
          }),
        ).toBe(1);
      },
    );
  },
);

describe(
  "administrator recovery",
  () => {
    test(
      "promotes an active user only when the firm has no active administrator",
      async () => {
        const firm =
          await prisma.firm.create({
            data: {
              name:
                "Recovery Firm",
            },
          });
        const user =
          await prisma.user.create({
            data: {
              name: "Operator",
              email:
                "operator@example.com",
              passwordHash:
                "existing-hash",
              role:
                "PORTFOLIO_MANAGER",
              status: "ACTIVE",
              firmId: firm.id,
            },
          });

        const recovered =
          await recoverAdministrator(
            user.email,
          );

        expect(
          recovered.role,
        ).toBe("ADMIN");
        expect(
          recovered.sessionVersion,
        ).toBe(
          user.sessionVersion + 1,
        );
        expect(
          await prisma.auditLog.count({
            where: {
              action:
                "ADMIN_RECOVERED",
              entityId: user.id,
            },
          }),
        ).toBe(1);

        await expect(
          recoverAdministrator(
            user.email,
          ),
        ).rejects.toThrow(
          "ACTIVE_ADMIN_ALREADY_EXISTS",
        );
      },
    );

    test(
      "refuses to recover a disabled user",
      async () => {
        const firm =
          await prisma.firm.create({
            data: {
              name:
                "Disabled Recovery Firm",
            },
          });
        const user =
          await prisma.user.create({
            data: {
              name:
                "Disabled Operator",
              email:
                "disabled-operator@example.com",
              passwordHash:
                "existing-hash",
              role:
                "PORTFOLIO_MANAGER",
              status: "DISABLED",
              firmId: firm.id,
            },
          });

        await expect(
          recoverAdministrator(
            user.email,
          ),
        ).rejects.toThrow(
          "RECOVERY_USER_NOT_ACTIVE",
        );
      },
    );
  },
);

describe(
  "execution queue operations",
  () => {
    test(
      "reports firm-scoped queue health and removes expired terminal jobs",
      async () => {
        const account =
          await createTestAccount();
        const order =
          await prisma.order.create({
            data: {
              portfolioId:
                account.portfolio.id,
              brokerAccountId:
                account.brokerAccount.id,
              symbol: "INFY",
              exchange: "NSE",
              side: "BUY",
              orderType: "LIMIT",
              quantity: 1,
              limitPrice: 1_500,
              status: "PENDING",
            },
          });
        const job =
          await prisma.executionJob.create({
            data: {
              orderId: order.id,
              status: "COMPLETED",
            },
          });

        await prisma.executionJob.update({
          where: {
            id: job.id,
          },
          data: {
            updatedAt:
              new Date(
                Date.now() -
                  31 *
                    86_400_000,
              ),
          },
        });

        const snapshot =
          await getOperationsSnapshot(
            account.firm.id,
          );

        expect(
          snapshot.queue.counts
            .COMPLETED,
        ).toBe(1);
        expect(
          snapshot.worker,
        ).toEqual(
          expect.objectContaining({
            workerId:
              expect.any(String),
          }),
        );

        await expect(
          cleanupExecutionJobs(),
        ).resolves.toEqual({
          deleted: 1,
        });
      },
    );
  },
);
