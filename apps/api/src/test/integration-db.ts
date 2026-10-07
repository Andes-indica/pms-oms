import {
  prisma,
} from "@pms-oms/db";
import { assertTestDatabase } from "../../../../packages/db/src/environment";

export async function clearTestDatabase() {
  assertTestDatabase(process.env.DATABASE_URL);
  await prisma.$transaction([
    prisma.execution.deleteMany(),
    prisma.executionJob.deleteMany(),
    prisma.auditLog.deleteMany(),

    prisma.order.deleteMany(),
    prisma.basketOrder.deleteMany(),

    prisma.holding.deleteMany(),
    prisma.riskLimit.deleteMany(),

    prisma.brokerConnection.deleteMany(),
    prisma.brokerAccount.deleteMany(),

    prisma.portfolio.deleteMany(),
    prisma.client.deleteMany(),

    prisma.restrictedSecurity.deleteMany(),

    prisma.user.deleteMany(),
    prisma.firm.deleteMany(),
  ]);
}

export async function createTestAccount({
  cashBalance = 100_000,
}: {
  cashBalance?: number;
} = {}) {
  const firm =
    await prisma.firm.create({
      data: {
        name: "Test Firm",
      },
    });

  const client =
    await prisma.client.create({
      data: {
        name: "Test Client",

        firmId:
          firm.id,
      },
    });

  const portfolio =
    await prisma.portfolio.create({
      data: {
        name:
          "Test Portfolio",

        clientId:
          client.id,

        cashBalance,
      },
    });

  const brokerAccount =
    await prisma.brokerAccount.create({
      data: {
        broker: "MOCK",

        accountId:
          `TEST-${crypto.randomUUID()}`,

        clientId:
          client.id,
      },
    });

  return {
    firm,
    client,
    portfolio,
    brokerAccount,
  };
}
