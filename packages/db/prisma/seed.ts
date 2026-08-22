import { prisma } from "../src";

async function main() {
  // 1. Firm
  const firm = await prisma.firm.upsert({
    where: {
      id: "demo-firm",
    },
    update: {},
    create: {
      id: "demo-firm",
      name: "Alpha PMS",
    },
  });

  // 2. Manager
  const manager = await prisma.user.upsert({
    where: {
      email: "manager@alphapms.com",
    },
    update: {},
    create: {
      name: "Demo Manager",
      email: "manager@alphapms.com",
      passwordHash: "temporary",
      role: "PORTFOLIO_MANAGER",
      firmId: firm.id,
    },
  });

  // 3. Clients
  const client1 = await prisma.client.upsert({
    where: {
      id: "demo-client-1",
    },
    update: {},
    create: {
      id: "demo-client-1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      firmId: firm.id,
      brokerAccounts: {
        create: {
          broker: "ZERODHA",
          accountId: "ZD001",
          accountLabel: "Primary",
        },
      },
    },
  });

  const client2 = await prisma.client.upsert({
    where: {
      id: "demo-client-2",
    },
    update: {},
    create: {
      id: "demo-client-2",
      name: "Ananya Rao",
      email: "ananya@example.com",
      firmId: firm.id,
      brokerAccounts: {
        create: {
          broker: "ZERODHA",
          accountId: "ZD002",
          accountLabel: "Primary",
        },
      },
    },
  });

  // 4. Portfolios
  const portfolio1 = await prisma.portfolio.upsert({
    where: {
      id: "demo-portfolio-1",
    },
    update: {},
    create: {
      id: "demo-portfolio-1",
      name: "Primary Portfolio",
      clientId: client1.id,
    },
  });

  const portfolio2 = await prisma.portfolio.upsert({
    where: {
      id: "demo-portfolio-2",
    },
    update: {},
    create: {
      id: "demo-portfolio-2",
      name: "Primary Portfolio",
      clientId: client2.id,
    },
  });

  // 5. Holdings
  await prisma.holding.upsert({
    where: {
      portfolioId_symbol_exchange: {
        portfolioId: portfolio1.id,
        symbol: "RELIANCE",
        exchange: "NSE",
      },
    },
    update: {},
    create: {
      symbol: "RELIANCE",
      exchange: "NSE",
      quantity: 50,
      averagePrice: 1400,
      portfolioId: portfolio1.id,
    },
  });

  await prisma.holding.upsert({
    where: {
      portfolioId_symbol_exchange: {
        portfolioId: portfolio1.id,
        symbol: "INFY",
        exchange: "NSE",
      },
    },
    update: {},
    create: {
      symbol: "INFY",
      exchange: "NSE",
      quantity: 100,
      averagePrice: 1550,
      portfolioId: portfolio1.id,
    },
  });

  console.log("Seed completed successfully");

  console.log({
    firm,
    manager,
    clients: [client1, client2],
    portfolios: [portfolio1, portfolio2],
  });
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });