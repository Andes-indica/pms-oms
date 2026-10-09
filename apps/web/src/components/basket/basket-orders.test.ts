/// <reference types="bun" />
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, spyOn, test } from "bun:test";
import { Window } from "happy-dom";
import { act, createElement } from "react";
import type { Root } from "react-dom/client";
import { getBasketErrorGuidance } from "./basket-error-guidance";

const clients = [{
  id: "client-one", name: "Client One",
  portfolios: [{ id: "portfolio-first", name: "First portfolio" }, { id: "portfolio-selected", name: "Selected portfolio" }],
  brokerAccounts: [
    { id: "mock-first", broker: "MOCK", accountId: "MOCK-1" },
    { id: "zerodha-selected", broker: "ZERODHA", accountId: "AB1234" },
  ],
}, {
  id: "client-two", name: "Client Two",
  portfolios: [{ id: "portfolio-two", name: "Only portfolio" }],
  brokerAccounts: [{ id: "mock-two", broker: "MOCK", accountId: "MOCK-2" }],
}];

const browser = new Window({ url: "http://localhost" });
const savedGlobals = new Map<string, PropertyDescriptor | undefined>();
let createRoot: typeof import("react-dom/client").createRoot;
let CreateBasketOrderForm: typeof import("./CreateBasketOrderForm").CreateBasketOrderForm;
let BasketOrdersPage: typeof import("../../pages/BasketOrdersPage").BasketOrdersPage;
let apiModule: typeof import("../../lib/api");
let root: Root;
let container: HTMLDivElement;
const restores: Array<() => void> = [];
let postedBodies: Array<Record<string, unknown>>;
let baskets: unknown[];
let actionResults: unknown[];
let actionHttpError: string | null;
let actionPaths: string[];

beforeAll(async () => {
  const globals = {
    window: browser, document: browser.document, navigator: browser.navigator,
    localStorage: browser.localStorage, HTMLElement: browser.HTMLElement,
    HTMLInputElement: browser.HTMLInputElement, HTMLSelectElement: browser.HTMLSelectElement,
    Event: browser.Event, MouseEvent: browser.MouseEvent, Node: browser.Node,
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  for (const [key, value] of Object.entries(globals)) {
    savedGlobals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  ({ createRoot } = await import("react-dom/client"));
  ({ CreateBasketOrderForm } = await import("./CreateBasketOrderForm"));
  ({ BasketOrdersPage } = await import("../../pages/BasketOrdersPage"));
  apiModule = await import("../../lib/api");
});

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  postedBodies = [];
  baskets = [];
  actionResults = [];
  actionHttpError = null;
  actionPaths = [];
  const fetchSpy = spyOn(globalThis, "fetch").mockImplementation(Object.assign(async (
    input: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1],
  ) => {
    const path = new URL(String(input)).pathname;
    if (path === "/api/clients") return Response.json({ data: clients });
    if (path === "/api/instruments") return Response.json({ data: [{ symbol: "INFY", exchange: "NSE" }] });
    if (path === "/api/basket-orders" && options?.method === "POST") {
      postedBodies.push(JSON.parse(String(options.body)));
      return Response.json({ data: { id: "new-basket" } }, { status: 201 });
    }
    if (path === "/api/basket-orders") return Response.json({ data: baskets });
    if (path.startsWith("/api/basket-orders/")) {
      actionPaths.push(path);
      if (actionHttpError) return Response.json({ error: actionHttpError }, { status: 409 });
      return Response.json({ data: { results: actionResults } });
    }
    throw new Error(`Unexpected request: ${path}`);
  }, { preconnect() {} }));
  const streamSpy = spyOn(apiModule, "subscribeToLiveUpdates").mockResolvedValue(undefined);
  restores.push(() => fetchSpy.mockRestore(), () => streamSpy.mockRestore());
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  for (const restore of restores.splice(0)) restore();
});

afterAll(async () => {
  await browser.happyDOM.close();
  for (const [key, descriptor] of savedGlobals) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
});

function element<T extends Element>(selector: string): T {
  const result = container.querySelector<T>(selector);
  expect(result).not.toBeNull();
  return result!;
}

async function change(selector: string, value: string) {
  const control = element<HTMLInputElement | HTMLSelectElement>(selector);
  await act(async () => {
    // Use the native setter so React observes a user edit rather than its value tracker.
    const prototype = control.tagName === "INPUT" ? HTMLInputElement.prototype : HTMLSelectElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(control, value);
    control.dispatchEvent(new Event(control.tagName === "INPUT" ? "input" : "change", { bubbles: true }));
  });
}

async function selectClient(index: number) {
  const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  expect(checkboxes[index]).toBeDefined();
  await act(async () => checkboxes[index]!.click());
}

async function submit() {
  await act(async () => {
    element<HTMLFormElement>("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

describe("basket account selection", () => {
  test.each(["EQUAL_QUANTITY", "FIXED_QUANTITY", "PERCENTAGE"])(
    "%s sends each client's explicitly selected broker and portfolio",
    async (method) => {
      await act(async () => root.render(createElement(CreateBasketOrderForm)));
      await selectClient(0);
      await selectClient(1);
      expect(element<HTMLSelectElement>('select[aria-label="Client One broker account"]').value).toBe("");
      await change('select[aria-label="Client One broker account"]', "zerodha-selected");
      await change('select[aria-label="Client One portfolio"]', "portfolio-selected");
      await change('input[list="basket-instruments"]', "INFY");
      const allocationSelect = [...container.querySelectorAll("select")].find((select) =>
        [...select.options].some((option) => option.value === "EQUAL_QUANTITY"))!;
      await act(async () => {
        allocationSelect.value = method;
        allocationSelect.dispatchEvent(new Event("change", { bubbles: true }));
      });
      if (method === "FIXED_QUANTITY" || method === "PERCENTAGE") {
        const placeholder = method === "FIXED_QUANTITY" ? "Quantity" : "Percentage";
        const controls = container.querySelectorAll<HTMLInputElement>(`input[placeholder="${placeholder}"]`);
        for (const control of controls) {
          await act(async () => {
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(control, method === "FIXED_QUANTITY" ? "1" : "50");
            control.dispatchEvent(new Event("input", { bubbles: true }));
          });
        }
      }
      await change('input[type="number"]', "2");
      await submit();
      expect(postedBodies).toHaveLength(1);
      expect(postedBodies[0]!.targets).toEqual([
        { portfolioId: "portfolio-selected", brokerAccountId: "zerodha-selected",
          ...(method === "FIXED_QUANTITY" ? { quantity: 1 } : method === "PERCENTAGE" ? { percentage: 50 } : {}) },
        { portfolioId: "portfolio-two", brokerAccountId: "mock-two",
          ...(method === "FIXED_QUANTITY" ? { quantity: 1 } : method === "PERCENTAGE" ? { percentage: 50 } : {}) },
      ]);
    },
  );

  test("does not submit ambiguous accounts or portfolios until they are selected", async () => {
    await act(async () => root.render(createElement(CreateBasketOrderForm)));
    await selectClient(0);
    await change('input[list="basket-instruments"]', "INFY");
    await submit();
    expect(postedBodies).toHaveLength(0);
    expect(container.textContent).toContain("Select a portfolio and broker account for Client One");
  });
});

describe("basket execution feedback", () => {
  beforeEach(() => {
    baskets = [{
      id: "basket-one", name: "Zerodha basket", symbol: "INFY", exchange: "NSE", side: "BUY",
      orderType: "LIMIT", totalQuantity: 1, allocationMethod: "EQUAL_QUANTITY", status: "PENDING",
      orders: [{
        id: "order-one", quantity: 1, status: "PENDING",
        portfolio: { name: "Selected portfolio", client: { name: "Client One" } },
        brokerAccount: { broker: "ZERODHA", accountId: "AB1234" },
        executionJob: { status: "FAILED", lastError: "BROKER_SESSION_EXPIRED" },
        recoveryAction: "RETRY",
      }],
    }];
  });

  test("shows child submission errors beside the selected broker account", async () => {
    await act(async () => root.render(createElement(BasketOrdersPage)));
    expect(container.textContent).toContain("1 child order needs attention");
    expect(container.textContent).toContain("Broker session expired");
    expect(container.textContent).toContain("Reconnect this broker account");
    expect(container.textContent).not.toContain("BROKER_SESSION_EXPIRED");
    expect(container.textContent).toContain("ZERODHA");
    expect(container.textContent).toContain("AB1234");
    expect(container.textContent).toContain("FAILED");
    expect(container.textContent).not.toContain("Execute Basket");
  });

  test("reports child failures even when the basket action returns HTTP success", async () => {
    actionResults = [{ orderId: "order-one", success: false, error: "BROKER_NOT_CONNECTED" }];
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        executionJob: null,
        recoveryAction: null,
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    const execute = [...container.querySelectorAll("button")].find((button) => button.textContent?.includes("Execute Basket"))!;
    await act(async () => execute.click());
    expect(container.textContent).toContain("Broker account is not connected");
    expect(container.textContent).toContain("Configure and connect this broker account");
  });

  test("shows HTTP action failures in the basket instead of a transient alert", async () => {
    actionHttpError = "BASKET_NOT_PENDING";
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        executionJob: null,
        recoveryAction: null,
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    const execute = [...container.querySelectorAll("button")].find((button) => button.textContent?.includes("Execute Basket"))!;
    await act(async () => execute.click());
    expect(container.textContent).toContain("Basket has already started");
    expect(container.textContent).toContain("Refresh the basket");
    expect(container.textContent).not.toContain("BASKET_NOT_PENDING");
  });

  test("shows the broker explanation and a safe next step", async () => {
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        executionJob: {
          status: "FAILED",
          lastError: "BROKER_INSUFFICIENT_FUNDS: Required margin is 12,000 but only 8,000 is available",
        },
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    expect(container.textContent).toContain("Insufficient funds at the broker");
    expect(container.textContent).toContain("Broker detail: Required margin is 12,000 but only 8,000 is available");
    expect(container.textContent).toContain("Add broker funds or reduce this child order quantity");
  });

  test("queues only the selected failed child for retry", async () => {
    await act(async () => root.render(createElement(BasketOrdersPage)));
    const retry = [...container.querySelectorAll("button")]
      .find((button) => button.textContent?.includes("Retry Child"))!;
    await act(async () => retry.click());
    expect(actionPaths).toContain(
      "/api/basket-orders/basket-one/orders/order-one/retry",
    );
    expect(container.textContent).toContain(
      "child order queued for retry",
    );
  });

  test("shows reconciliation instead of retry for an uncertain submission", async () => {
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      status: "PARTIALLY_SUBMITTED",
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        status: "SUBMITTED",
        executionJob: {
          status: "FAILED",
          lastError: "BROKER_SUBMISSION_UNCERTAIN",
        },
        recoveryAction: "RECONCILE",
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    expect(container.textContent).toContain("Reconcile Child");
    expect(container.textContent).not.toContain("Retry Child");
  });

  test("offers one replacement for a rejected child", async () => {
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      status: "REJECTED",
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        status: "REJECTED",
        recoveryAction: "CREATE_REPLACEMENT",
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    expect(container.textContent).toContain("Create Replacement");
  });

  test("shows the existing replacement instead of offering another", async () => {
    baskets = [{
      ...(baskets[0] as Record<string, unknown>),
      status: "REJECTED",
      orders: [{
        ...((baskets[0] as { orders: Array<Record<string, unknown>> }).orders[0]),
        status: "REJECTED",
        recoveryAction: null,
        replacementBasket: {
          id: "replacement-one",
          status: "PENDING",
        },
      }],
    }];
    await act(async () => root.render(createElement(BasketOrdersPage)));
    expect(container.textContent).toContain("Replacement basket: PENDING");
    expect(container.textContent).not.toContain("Create Replacement");
  });
});

describe("basket error guidance", () => {
  test("maps allocation errors to an explanation and correction", () => {
    expect(getBasketErrorGuidance("PERCENTAGES_MUST_TOTAL_100")).toEqual({
      title: "Allocation percentages must total 100%",
      action: "Adjust the client percentages so they add up to 100%.",
    });
  });

  test("keeps an unknown broker response as diagnostic detail", () => {
    expect(getBasketErrorGuidance("Exchange is temporarily unavailable")).toEqual({
      title: "Basket order action failed",
      detail: "Exchange is temporarily unavailable",
      action: "Review this child order and broker account, then try again.",
    });
  });
});
