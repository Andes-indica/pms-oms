import { describe, expect, test } from "bun:test";
import { MockBroker } from "./mock-broker";

describe("MockBroker", () => {
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

  test("returns symbol-specific market estimates", async () => {
    const broker = new MockBroker();
    expect(await broker.getEstimatedPrice("TCS", "NSE")).toBe(3200);
  });
});
