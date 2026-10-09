import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, spyOn, test } from "bun:test";
import type { Server } from "node:http";
import { KiteConnect } from "kiteconnect";
import { ZerodhaAuth, ZerodhaBroker, type BrokerExecution } from "@pms-oms/broker";
import { prisma } from "@pms-oms/db";
import app from "../app";
import { mockBroker } from "../brokers/broker-registry";
import { decryptBrokerData, encryptBrokerData } from "../security/broker-credential-crypto";
import { createAccessToken } from "../services/auth-token.service";
import { processNextExecutionJob } from "../services/order-execution-worker.service";
import { clearTestDatabase, createTestAccount } from "./integration-db";

let server: Server;
let baseUrl: string;
let token: string;
let account: Awaited<ReturnType<typeof createTestAccount>>;
let actorUserId: string;
const restoreSpies: Array<() => void> = [];
const previousEncryptionKey = process.env.BROKER_CREDENTIAL_ENCRYPTION_KEY;

beforeAll(async () => {
  process.env.BROKER_CREDENTIAL_ENCRYPTION_KEY = Buffer.alloc(32, 7).toString("base64");
  server = await new Promise<Server>((resolve, reject) => {
    const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
    listening.once("error", reject);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("TEST_SERVER_NOT_LISTENING");
  baseUrl = `http://127.0.0.1:${address.port}/api`;
});

beforeEach(async () => {
  mockBroker.clear();
  await clearTestDatabase();
  account = await createTestAccount();
  const user = await prisma.user.create({
    data: {
      name: "Workflow tester",
      email: `workflow-${crypto.randomUUID()}@example.test`,
      passwordHash: "not-used-for-token-authentication",
      firmId: account.firm.id,
      role: "ADMIN",
    },
  });
  actorUserId = user.id;
  token = await createAccessToken({ userId: user.id, firmId: account.firm.id, role: user.role });
});

afterEach(() => {
  for (const restore of restoreSpies.splice(0)) restore();
});

afterAll(async () => {
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
      server.closeAllConnections();
    });
  }
  if (previousEncryptionKey === undefined) delete process.env.BROKER_CREDENTIAL_ENCRYPTION_KEY;
  else process.env.BROKER_CREDENTIAL_ENCRYPTION_KEY = previousEncryptionKey;
  mockBroker.clear();
  await clearTestDatabase();
  await prisma.$disconnect();
});

async function api(method: string, path: string, body?: unknown, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json();
  expect({ status: response.status, error: result.error }).toEqual({
    status: expectedStatus,
    error: expectedStatus < 400 ? undefined : result.error,
  });
  return expectedStatus < 400 ? result.data : result;
}

function reconciliationPath() {
  return `/broker-accounts/${account.brokerAccount.id}/reconciliation`;
}

async function createHolding(quantity = 10, averagePrice = 1400) {
  return prisma.holding.create({
    data: {
      portfolioId: account.portfolio.id,
      brokerAccountId: account.brokerAccount.id,
      symbol: "INFY", exchange: "NSE", quantity, averagePrice,
    },
  });
}

async function connectZerodha(quantity = 10, averagePrice = 1500) {
  await prisma.brokerAccount.update({
    where: { id: account.brokerAccount.id },
    data: { broker: "ZERODHA", accountId: "AB1234" },
  });
  await prisma.brokerConnection.create({
    data: {
      brokerAccountId: account.brokerAccount.id,
      credentialsEncrypted: encryptBrokerData({ apiKey: "test-api-key", apiSecret: "test-api-secret" }),
      sessionEncrypted: encryptBrokerData({ accessToken: "old-access-token" }),
      status: "CONNECTED",
      externalUserId: "AB1234",
      sessionExpiresAt: new Date(Date.now() + 3_600_000),
    },
  });
  // Only the external broker responses are simulated. HTTP authentication,
  // session encryption, broker resolution and all persistence use the real app.
  const holdings = spyOn(ZerodhaBroker.prototype, "getHoldings").mockResolvedValue([
    { symbol: "INFY", exchange: "NSE", quantity, averagePrice },
  ]);
  restoreSpies.push(() => holdings.mockRestore());
  return holdings;
}

async function repair() {
  return api("POST", `${reconciliationPath()}/repair`, {
    portfolioId: account.portfolio.id, symbol: "INFY", exchange: "NSE",
  });
}

describe("Zerodha reconnect and inventory reconciliation through HTTP", () => {
  test("a new session with unchanged quantities stays MATCH and preserves PMS cost and cash", async () => {
    const holding = await createHolding();
    const holdings = await connectZerodha();
    const before = await api("GET", reconciliationPath());
    expect(before.status).toBe("MATCH");
    expect(before.items[0].averagePriceDifference).toBe(100);

    await prisma.brokerConnection.update({
      where: { brokerAccountId: account.brokerAccount.id },
      data: { sessionExpiresAt: new Date(Date.now() - 1000) },
    });
    await api("GET", reconciliationPath(), undefined, 409);
    expect(holdings).toHaveBeenCalledTimes(1);
    const expired = await prisma.brokerConnection.findUniqueOrThrow({
      where: { brokerAccountId: account.brokerAccount.id },
    });
    expect(expired.status).toBe("EXPIRED");

    const loginTime = new Date();
    const exchange = spyOn(ZerodhaAuth.prototype, "exchangeRequestToken").mockResolvedValue({
      accessToken: "new-access-token", userId: "AB1234", loginTime,
    });
    restoreSpies.push(() => exchange.mockRestore());
    const connected = await api("POST", `/broker-connections/${account.brokerAccount.id}/zerodha/session`, {
      requestToken: "new-request-token",
    });
    expect(connected.status).toBe("CONNECTED");
    expect(exchange).toHaveBeenCalledWith("new-request-token", "test-api-secret");
    const connection = await prisma.brokerConnection.findUniqueOrThrow({
      where: { brokerAccountId: account.brokerAccount.id },
    });
    expect(decryptBrokerData<{ accessToken: string }>(connection.sessionEncrypted!))
      .toEqual({ accessToken: "new-access-token" });
    expect(connection.sessionExpiresAt!.getTime()).toBeGreaterThan(Date.now());
    expect(connection.lastConnectedAt).toEqual(loginTime);

    const after = await api("GET", reconciliationPath());
    expect(after.status).toBe("MATCH");
    expect(after.mismatchCount).toBe(0);
    expect(after.items).toEqual(before.items);
    expect(holdings).toHaveBeenCalledTimes(2);
    expect(await prisma.holding.findMany()).toEqual([holding]);
    expect(Number((await prisma.portfolio.findUniqueOrThrow({ where: { id: account.portfolio.id } })).cashBalance))
      .toBe(100_000);
    expect(await prisma.cashTransaction.count()).toBe(0);
  });

  test("quantity changes mismatch; repair preserves PMS cost and repeated repair makes no duplicate", async () => {
    const holding = await createHolding();
    await connectZerodha(12);
    const mismatch = await api("GET", reconciliationPath());
    expect(mismatch.status).toBe("MISMATCH");
    expect(mismatch.items[0]).toMatchObject({ status: "QUANTITY_MISMATCH", quantityDifference: 2 });
    expect((await repair()).changed).toBe(true);
    expect((await repair()).changed).toBe(false);
    expect((await api("GET", reconciliationPath())).status).toBe("MATCH");
    const saved = await prisma.holding.findMany();
    expect(saved).toHaveLength(1);
    expect(saved[0]!.id).toBe(holding.id);
    expect(saved[0]!.quantity).toBe(12);
    expect(Number(saved[0]!.averagePrice)).toBe(1400);
    expect(await prisma.auditLog.count()).toBe(1);
    expect(await prisma.cashTransaction.count()).toBe(0);
  });

  test("repairing a missing PMS holding twice creates one holding and one audit entry", async () => {
    await connectZerodha();
    expect((await api("GET", reconciliationPath())).items[0].status).toBe("MISSING_IN_PMS");
    expect((await repair()).changed).toBe(true);
    const first = await prisma.holding.findMany();
    expect(first).toHaveLength(1);
    expect(first[0]!.quantity).toBe(10);
    expect(Number(first[0]!.averagePrice)).toBe(1500);
    expect((await repair()).changed).toBe(false);
    expect(await prisma.holding.findMany()).toEqual(first);
    expect(await prisma.auditLog.count()).toBe(1);
    expect((await api("GET", reconciliationPath())).status).toBe("MATCH");
  });

  test("reconciliation aggregates portfolios and refuses to silently redistribute a mismatch", async () => {
    await connectZerodha();
    await createHolding(4);
    const otherPortfolio = await prisma.portfolio.create({
      data: { name: "Second portfolio", clientId: account.client.id },
    });
    const otherHolding = await prisma.holding.create({
      data: {
        portfolioId: otherPortfolio.id, brokerAccountId: account.brokerAccount.id,
        symbol: "INFY", exchange: "NSE", quantity: 6, averagePrice: 1600,
      },
    });
    expect((await api("GET", reconciliationPath())).status).toBe("MATCH");
    await prisma.holding.update({ where: { id: otherHolding.id }, data: { quantity: 5 } });
    expect((await api("GET", reconciliationPath())).status).toBe("MISMATCH");
    const before = await prisma.holding.findMany({ orderBy: { id: "asc" } });
    await api("POST", `${reconciliationPath()}/repair`, {
      portfolioId: account.portfolio.id, symbol: "INFY", exchange: "NSE",
    }, 409);
    expect(await prisma.holding.findMany({ orderBy: { id: "asc" } })).toEqual(before);
    expect(await prisma.auditLog.count()).toBe(0);
  });
});

async function createAndSubmit(side: "BUY" | "SELL", quantity: number, limitPrice: number) {
  const created = await api("POST", "/orders", {
    portfolioId: account.portfolio.id, brokerAccountId: account.brokerAccount.id,
    symbol: "INFY", exchange: "NSE", side, orderType: "LIMIT", quantity, limitPrice,
  }, 201);
  expect(created.status).toBe("PENDING");
  const job = await api("POST", `/orders/${created.id}/execute`, undefined, 202);
  const retry = await api("POST", `/orders/${created.id}/execute`, undefined, 202);
  expect(retry.id).toBe(job.id);
  expect(await processNextExecutionJob()).toMatchObject({ processed: true, succeeded: true });
  expect(await processNextExecutionJob()).toEqual({ processed: false });
  expect(await prisma.executionJob.findUniqueOrThrow({ where: { id: job.id } }))
    .toMatchObject({ status: "COMPLETED", attempts: 1 });
  const order = await prisma.order.findUniqueOrThrow({ where: { id: created.id } });
  expect(order.status).toBe("SUBMITTED");
  expect(order.brokerOrderId).not.toBeNull();
  expect(Number(order.reservedCash)).toBe(side === "BUY" ? quantity * limitPrice : 0);
  expect(order.reservedQuantity).toBe(side === "SELL" ? quantity : 0);
  return { ...order, brokerOrderId: order.brokerOrderId! };
}

function simulateFills(brokerOrderId: string, status: "PARTIALLY_FILLED" | "FILLED", fills: number[]) {
  const executions: BrokerExecution[] = fills.map((quantity, index) => ({
    brokerExecutionId: `${brokerOrderId}:fill:${index + 1}`, brokerOrderId,
    quantity, price: 1500, executedAt: new Date(`2026-01-01T10:0${index}:00Z`),
  }));
  mockBroker.setOrderSimulation(brokerOrderId, {
    brokerOrderId, status, filledQuantity: fills.reduce((sum, quantity) => sum + quantity, 0), averageFillPrice: 1500,
  }, executions);
}

async function cashBalances() {
  const portfolio = await prisma.portfolio.findUniqueOrThrow({ where: { id: account.portfolio.id } });
  const allocated = await prisma.portfolioBrokerCash.findUniqueOrThrow({
    where: { portfolioId_brokerAccountId: { portfolioId: account.portfolio.id, brokerAccountId: account.brokerAccount.id } },
  });
  return { portfolio: Number(portfolio.cashBalance), broker: Number(allocated.cashBalance) };
}

describe("MockBroker create, queue, fill and cancel through HTTP", () => {
  beforeEach(async () => {
    await prisma.portfolioBrokerCash.create({
      data: { portfolioId: account.portfolio.id, brokerAccountId: account.brokerAccount.id, cashBalance: 50_000 },
    });
  });

  test("partial and full BUY fills followed by a SELL apply executions and cash exactly once", async () => {
    const buy = await createAndSubmit("BUY", 10, 1500);
    simulateFills(buy.brokerOrderId, "PARTIALLY_FILLED", [4]);
    await api("POST", `/orders/${buy.id}/sync`);
    await api("POST", `/orders/${buy.id}/sync`);
    const partial = await prisma.order.findUniqueOrThrow({ where: { id: buy.id } });
    expect(partial.status).toBe("PARTIALLY_FILLED");
    expect(partial.filledQuantity).toBe(4);
    expect(Number(partial.reservedCash)).toBe(9000);
    expect(await cashBalances()).toEqual({ portfolio: 94_000, broker: 44_000 });
    expect(await prisma.execution.count()).toBe(1);
    expect(await prisma.cashTransaction.count()).toBe(1);

    simulateFills(buy.brokerOrderId, "FILLED", [4, 6]);
    await api("POST", `/orders/${buy.id}/sync`);
    await api("POST", `/orders/${buy.id}/sync`);
    const filled = await prisma.order.findUniqueOrThrow({ where: { id: buy.id } });
    expect(filled.status).toBe("FILLED");
    expect(filled.filledQuantity).toBe(10);
    expect(Number(filled.reservedCash)).toBe(0);
    expect(await cashBalances()).toEqual({ portfolio: 85_000, broker: 35_000 });
    expect(await prisma.execution.count()).toBe(2);
    expect(await prisma.cashTransaction.count()).toBe(2);

    const sell = await createAndSubmit("SELL", 3, 1600);
    await api("POST", `/orders/${sell.id}/sync`);
    await api("POST", `/orders/${sell.id}/sync`);
    const sold = await prisma.order.findUniqueOrThrow({ where: { id: sell.id } });
    expect(sold.status).toBe("FILLED");
    expect(sold.filledQuantity).toBe(3);
    expect(sold.reservedQuantity).toBe(0);
    expect(Number(sold.realizedPnl)).toBe(300);
    const holdings = await prisma.holding.findMany();
    expect(holdings).toHaveLength(1);
    expect(holdings[0]!.quantity).toBe(7);
    expect(Number(holdings[0]!.averagePrice)).toBe(1500);
    expect(await cashBalances()).toEqual({ portfolio: 89_800, broker: 39_800 });
    expect(await prisma.execution.count()).toBe(3);
    const entries = await prisma.cashTransaction.findMany();
    expect(entries).toHaveLength(3);
    expect(entries.map((entry) => Number(entry.amount)).sort((a, b) => a - b)).toEqual([-9000, -6000, 4800]);
    expect(entries.every((entry) => entry.actorUserId === actorUserId)).toBe(true);
  });

  test.each(["BUY", "SELL"] as const)("cancelling a partially filled %s retains fills and releases remaining reservations", async (side) => {
    if (side === "SELL") await createHolding(10, 1400);
    const order = await createAndSubmit(side, 10, 1500);
    simulateFills(order.brokerOrderId, "PARTIALLY_FILLED", [4]);
    await api("POST", `/orders/${order.id}/sync`);
    // A further broker fill arrives before cancellation and must still be booked.
    simulateFills(order.brokerOrderId, "PARTIALLY_FILLED", [4, 1]);
    const cancelled = await api("POST", `/orders/${order.id}/cancel`);
    expect(cancelled.status).toBe("CANCELLED");
    expect(cancelled.filledQuantity).toBe(5);
    expect(Number(cancelled.reservedCash)).toBe(0);
    expect(cancelled.reservedQuantity).toBe(0);
    await api("POST", `/orders/${order.id}/sync`);
    expect(await api("POST", `/orders/${order.id}/cancel`)).toEqual(cancelled);
    const holdings = await prisma.holding.findMany();
    expect(holdings).toHaveLength(1);
    expect(holdings[0]!.quantity).toBe(5);
    expect(Number(holdings[0]!.averagePrice)).toBe(side === "BUY" ? 1500 : 1400);
    expect(await cashBalances()).toEqual(side === "BUY"
      ? { portfolio: 92_500, broker: 42_500 }
      : { portfolio: 107_500, broker: 57_500 });
    expect(await prisma.execution.count()).toBe(2);
    expect(await prisma.cashTransaction.count()).toBe(2);
    if (side === "SELL") expect(Number(cancelled.realizedPnl)).toBe(500);
  });
});

describe("basket execution with real broker adapters", () => {
  async function basketAccounts(expired = false) {
    // Keep the existing MOCK account first, as in clients created before Kite was configured.
    const zerodha = await prisma.brokerAccount.create({
      data: {
        clientId: account.client.id, broker: "ZERODHA", accountId: "AB1234",
        connection: {
          create: {
            credentialsEncrypted: encryptBrokerData({ apiKey: "basket-api-key", apiSecret: "basket-api-secret" }),
            sessionEncrypted: encryptBrokerData({ accessToken: "basket-access-token" }),
            status: "CONNECTED",
            sessionExpiresAt: new Date(Date.now() + (expired ? -60_000 : 3_600_000)),
          },
        },
      },
    });
    const selectedPortfolio = await prisma.portfolio.create({
      data: { name: "Selected Kite portfolio", clientId: account.client.id, cashBalance: 100_000 },
    });
    const secondClient = await prisma.client.create({
      data: {
        name: "Second basket client", firmId: account.firm.id,
        portfolios: { create: { name: "Mock portfolio", cashBalance: 100_000 } },
        brokerAccounts: { create: { broker: "MOCK", accountId: `SECOND-${crypto.randomUUID()}` } },
      },
      include: { portfolios: true, brokerAccounts: true },
    });
    return { zerodha, selectedPortfolio, secondClient };
  }

  test.each(["EQUAL_QUANTITY", "FIXED_QUANTITY", "PERCENTAGE"])(
    "%s routes the selected account through the same Kite adapter as a normal order",
    async (allocationMethod) => {
      const { zerodha, selectedPortfolio, secondClient } = await basketAccounts();
      // Stop at the SDK network boundary: exercise the real factory, credentials,
      // Zerodha adapter and parameter mapping without sending any live order.
      const kitePlace = spyOn(KiteConnect.prototype, "placeOrder").mockImplementation(async function (this: unknown) {
        const credentials = this as unknown as { api_key: string; access_token: string };
        expect(credentials.api_key).toBe("basket-api-key");
        expect(credentials.access_token).toBe("basket-access-token");
        return { order_id: `KITE-${crypto.randomUUID()}` };
      });
      restoreSpies.push(() => kitePlace.mockRestore());
      const basket = await api("POST", "/basket-orders", {
        symbol: "INFY", exchange: "NSE", side: "BUY", orderType: "LIMIT", limitPrice: 1500,
        totalQuantity: 5, allocationMethod,
        targets: [
          { portfolioId: selectedPortfolio.id, brokerAccountId: zerodha.id,
            ...(allocationMethod === "FIXED_QUANTITY" ? { quantity: 3 } : allocationMethod === "PERCENTAGE" ? { percentage: 60 } : {}) },
          { portfolioId: secondClient.portfolios[0]!.id, brokerAccountId: secondClient.brokerAccounts[0]!.id,
            ...(allocationMethod === "FIXED_QUANTITY" ? { quantity: 2 } : allocationMethod === "PERCENTAGE" ? { percentage: 40 } : {}) },
        ],
      }, 201);
      expect(basket.orders).toHaveLength(2);
      expect(basket.orders.find((order: { brokerAccountId: string }) => order.brokerAccountId === zerodha.id))
        .toMatchObject({ portfolioId: selectedPortfolio.id, quantity: 3 });
      const queued = await api("POST", `/basket-orders/${basket.id}/execute`, undefined, 202);
      expect(queued.results.every((result: { success: boolean }) => result.success)).toBe(true);
      await api("POST", `/basket-orders/${basket.id}/execute`, undefined, 202);
      expect(await prisma.executionJob.count()).toBe(2);
      for (let index = 0; index < 2; index++) {
        expect(await processNextExecutionJob()).toMatchObject({ processed: true, succeeded: true });
      }
      expect(await processNextExecutionJob()).toEqual({ processed: false });
      expect(kitePlace).toHaveBeenCalledTimes(1);
      expect(kitePlace.mock.calls[0]).toEqual(["regular", expect.objectContaining({
        tradingsymbol: "INFY", exchange: "NSE", transaction_type: "BUY", order_type: "LIMIT",
        quantity: 3, price: 1500, product: "CNC", validity: "DAY", tag: expect.any(String),
      })]);
      const orders = await prisma.order.findMany({ where: { basketOrderId: basket.id } });
      expect(orders.every((order) => order.status === "SUBMITTED")).toBe(true);
      expect(orders.find((order) => order.brokerAccountId === zerodha.id)!.brokerOrderId).toStartWith("KITE-");
      expect(orders.find((order) => order.brokerAccountId !== zerodha.id)!.brokerOrderId).toStartWith("MOCK-");
      expect(await prisma.order.count({ where: { brokerAccountId: account.brokerAccount.id } })).toBe(0);
      const listed = (await api("GET", "/basket-orders")).find((item: { id: string }) => item.id === basket.id);
      expect(listed.status).toBe("SUBMITTED");
      expect(listed.orders.every((order: { executionJob: { status: string } }) => order.executionJob.status === "COMPLETED"))
        .toBe(true);

      const normal = await api("POST", "/orders", {
        portfolioId: selectedPortfolio.id, brokerAccountId: zerodha.id,
        symbol: "INFY", exchange: "NSE", side: "BUY", orderType: "LIMIT", quantity: 3, limitPrice: 1500,
      }, 201);
      await api("POST", `/orders/${normal.id}/execute`, undefined, 202);
      expect(await processNextExecutionJob()).toMatchObject({ succeeded: true });
      expect(kitePlace).toHaveBeenCalledTimes(2);
      const basketParameters = kitePlace.mock.calls[0]![1] as Record<string, unknown>;
      const normalParameters = kitePlace.mock.calls[1]![1] as Record<string, unknown>;
      expect({ ...basketParameters, tag: undefined }).toEqual({ ...normalParameters, tag: undefined });
      expect(basketParameters.tag).not.toBe(normalParameters.tag);
    },
  );

  test("an expired Kite session exposes the child failure while another broker can submit", async () => {
    const { zerodha, selectedPortfolio, secondClient } = await basketAccounts(true);
    const kitePlace = spyOn(KiteConnect.prototype, "placeOrder").mockRejectedValue(new Error("UNEXPECTED_KITE_CALL"));
    restoreSpies.push(() => kitePlace.mockRestore());
    const basket = await api("POST", "/basket-orders", {
      symbol: "INFY", exchange: "NSE", side: "BUY", orderType: "LIMIT", limitPrice: 1500,
      totalQuantity: 2, allocationMethod: "EQUAL_QUANTITY",
      targets: [
        { portfolioId: selectedPortfolio.id, brokerAccountId: zerodha.id },
        { portfolioId: secondClient.portfolios[0]!.id, brokerAccountId: secondClient.brokerAccounts[0]!.id },
      ],
    }, 201);
    await api("POST", `/basket-orders/${basket.id}/execute`, undefined, 202);
    const results = [await processNextExecutionJob(), await processNextExecutionJob()];
    expect(results.filter((result) => result.succeeded)).toHaveLength(1);
    expect(results.find((result) => !result.succeeded)?.error).toBe("BROKER_SESSION_EXPIRED");
    expect(kitePlace).not.toHaveBeenCalled();
    const listed = (await api("GET", "/basket-orders")).find((item: { id: string }) => item.id === basket.id);
    expect(listed.status).toBe("PARTIALLY_SUBMITTED");
    expect(listed.orders.find((order: { brokerAccountId: string }) => order.brokerAccountId === zerodha.id))
      .toMatchObject({ status: "PENDING", brokerOrderId: null,
        executionJob: { status: "FAILED", lastError: "BROKER_SESSION_EXPIRED" } });
  });

  test("preserves Kite's rejection detail on the failed basket child", async () => {
    const { zerodha, selectedPortfolio } = await basketAccounts();
    const kitePlace = spyOn(KiteConnect.prototype, "placeOrder").mockRejectedValue({
      error_type: "MarginException",
      message: "Required margin is 12,000 but only 8,000 is available",
    });
    restoreSpies.push(() => kitePlace.mockRestore());
    const basket = await api("POST", "/basket-orders", {
      symbol: "INFY", exchange: "NSE", side: "BUY", orderType: "LIMIT", limitPrice: 1500,
      totalQuantity: 1, allocationMethod: "EQUAL_QUANTITY",
      targets: [{ portfolioId: selectedPortfolio.id, brokerAccountId: zerodha.id }],
    }, 201);
    await api("POST", `/basket-orders/${basket.id}/execute`, undefined, 202);
    expect(await processNextExecutionJob()).toMatchObject({
      processed: true,
      succeeded: false,
      retryable: false,
      error: "BROKER_INSUFFICIENT_FUNDS: Required margin is 12,000 but only 8,000 is available",
    });
    const listed = (await api("GET", "/basket-orders"))
      .find((item: { id: string }) => item.id === basket.id);
    expect(listed.status).toBe("REJECTED");
    expect(listed.orders[0]).toMatchObject({
      status: "REJECTED",
      brokerOrderId: null,
      executionJob: {
        status: "FAILED",
        lastError: "BROKER_INSUFFICIENT_FUNDS: Required margin is 12,000 but only 8,000 is available",
      },
    });
  });
});
