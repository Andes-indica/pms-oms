import { describe, expect, test } from "bun:test";
import { MockBroker } from "./mock-broker";

describe("MockBroker", () => {
  test.each([0, 2])(
    "cancellation replaces a simulated open state and preserves %i filled shares",
    async (filledQuantity) => {
      const broker = new MockBroker();
      const { brokerOrderId } = await broker.placeOrder({
        clientOrderId: `cancel-simulation-${filledQuantity}`,
        symbol: "INFY",
        exchange: "NSE",
        side: "BUY",
        orderType: "LIMIT",
        quantity: 5,
        limitPrice: 1500,
      });
      const executions = filledQuantity > 0 ? [{
        brokerExecutionId: `${brokerOrderId}:partial`,
        brokerOrderId,
        quantity: filledQuantity,
        price: 1500,
        executedAt: new Date("2026-01-01T10:00:00Z"),
      }] : [];
      broker.setOrderSimulation(brokerOrderId, {
        brokerOrderId,
        status: filledQuantity > 0 ? "PARTIALLY_FILLED" : "OPEN",
        filledQuantity,
        averageFillPrice: filledQuantity > 0 ? 1500 : null,
      }, executions);

      await broker.cancelOrder(brokerOrderId);
      await broker.cancelOrder(brokerOrderId);

      expect(await broker.getOrderStatus(brokerOrderId)).toEqual({
        brokerOrderId,
        status: "CANCELLED",
        filledQuantity,
        averageFillPrice: filledQuantity > 0 ? 1500 : null,
      });
      expect(await broker.getExecutions(brokerOrderId)).toEqual(executions);
      expect(await broker.findOrderByClientOrderId(`cancel-simulation-${filledQuantity}`))
        .toEqual({ brokerOrderId, status: "CANCELLED" });
    },
  );

  test("uses the client order ID as an idempotency key", async () => {
    const broker = new MockBroker();
    const request = {
      clientOrderId: "order-1",
      symbol: "TCS",
      exchange: "NSE",
      side: "BUY" as const,
      orderType: "MARKET" as const,
      quantity: 2,
    };

    const first = await broker.placeOrder(request);
    const retry = await broker.placeOrder(request);

    expect(retry.brokerOrderId).toBe(first.brokerOrderId);
  });

  test("cancels at the broker and reports the cancelled state", async () => {
    const broker = new MockBroker();
    const placed = await broker.placeOrder({
      clientOrderId: "order-2",
      symbol: "INFY",
      exchange: "NSE",
      side: "SELL",
      orderType: "LIMIT",
      quantity: 1,
      limitPrice: 1600,
    });

    await broker.cancelOrder(placed.brokerOrderId);
    const update = await broker.getOrderStatus(placed.brokerOrderId);

    expect(update.status).toBe("CANCELLED");
    expect(update.filledQuantity).toBe(0);
  });
  test("fills a market order and exposes its execution", async () => {
  const broker = new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId: "order-market",
      symbol: "INFY",
      exchange: "NSE",
      side: "BUY",
      orderType: "MARKET",
      quantity: 3,
    });

  const update =
    await broker.getOrderStatus(
      placed.brokerOrderId,
    );

  expect(update.status).toBe("FILLED");
  expect(update.filledQuantity).toBe(3);
  expect(update.averageFillPrice).toBe(1600);

  const executions =
    await broker.getExecutions(
      placed.brokerOrderId,
    );

  expect(executions).toHaveLength(1);
  expect(executions[0]?.quantity).toBe(3);
  expect(executions[0]?.price).toBe(1600);
});

test("fills a LIMIT order at its limit price", async () => {
  const broker = new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId: "order-limit",
      symbol: "INFY",
      exchange: "NSE",
      side: "BUY",
      orderType: "LIMIT",
      quantity: 2,
      limitPrice: 1550,
    });

  const update =
    await broker.getOrderStatus(
      placed.brokerOrderId,
    );

  expect(
    update.averageFillPrice,
  ).toBe(1550);

  const executions =
    await broker.getExecutions(
      placed.brokerOrderId,
    );

  expect(
    executions[0]?.price,
  ).toBe(1550);
});

test("returns a stable execution identity on repeated reads", async () => {
  const broker = new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId: "order-execution-id",
      symbol: "TCS",
      exchange: "NSE",
      side: "BUY",
      orderType: "MARKET",
      quantity: 1,
    });

  await broker.getOrderStatus(
    placed.brokerOrderId,
  );

  const first =
    await broker.getExecutions(
      placed.brokerOrderId,
    );

  const second =
    await broker.getExecutions(
      placed.brokerOrderId,
    );

  expect(
    second[0]?.brokerExecutionId,
  ).toBe(
    first[0]?.brokerExecutionId,
  );

  expect(
    second[0]?.executedAt.getTime(),
  ).toBe(
    first[0]?.executedAt.getTime(),
  );
});

test("recovers an order by client order ID", async () => {
  const broker =
    new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId:
        "recovery-order",
      symbol: "TCS",
      exchange: "NSE",
      side: "BUY",
      orderType: "MARKET",
      quantity: 1,
    });

  const recovered =
    await broker
      .findOrderByClientOrderId(
        "recovery-order",
      );

  expect(
    recovered?.brokerOrderId,
  ).toBe(
    placed.brokerOrderId,
  );
});

test("returns null when client order ID is unknown", async () => {
  const broker =
    new MockBroker();

  expect(
    await broker
      .findOrderByClientOrderId(
        "missing-order",
      ),
  ).toBeNull();
});

test("modifies quantity before fill", async () => {
  const broker =
    new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId:
        "modify-quantity",
      symbol: "INFY",
      exchange: "NSE",
      side: "BUY",
      orderType: "LIMIT",
      quantity: 2,
      limitPrice: 1500,
    });

  await broker.modifyOrder(
    placed.brokerOrderId,
    {
      quantity: 5,
    },
  );

  const update =
    await broker.getOrderStatus(
      placed.brokerOrderId,
    );

  expect(
    update.filledQuantity,
  ).toBe(5);
});

test("modifies limit price before fill", async () => {
  const broker =
    new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId:
        "modify-price",
      symbol: "INFY",
      exchange: "NSE",
      side: "BUY",
      orderType: "LIMIT",
      quantity: 1,
      limitPrice: 1500,
    });

  await broker.modifyOrder(
    placed.brokerOrderId,
    {
      limitPrice: 1575,
    },
  );

  const update =
    await broker.getOrderStatus(
      placed.brokerOrderId,
    );

  expect(
    update.averageFillPrice,
  ).toBe(1575);
});

test("rejects modification after fill", async () => {
  const broker =
    new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId:
        "filled-modify",
      symbol: "TCS",
      exchange: "NSE",
      side: "BUY",
      orderType: "MARKET",
      quantity: 1,
    });

  await broker.getOrderStatus(
    placed.brokerOrderId,
  );

  expect(
    broker.modifyOrder(
      placed.brokerOrderId,
      {
        quantity: 2,
      },
    ),
  ).rejects.toThrow(
    "BROKER_ORDER_ALREADY_FILLED",
  );
});

test("rejects cancellation after fill", async () => {
  const broker =
    new MockBroker();

  const placed =
    await broker.placeOrder({
      clientOrderId:
        "filled-cancel",
      symbol: "TCS",
      exchange: "NSE",
      side: "BUY",
      orderType: "MARKET",
      quantity: 1,
    });

  await broker.getOrderStatus(
    placed.brokerOrderId,
  );

  expect(
    broker.cancelOrder(
      placed.brokerOrderId,
    ),
  ).rejects.toThrow(
    "BROKER_ORDER_ALREADY_FILLED",
  );
});
  
});
