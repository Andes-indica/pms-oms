import { describe, expect, test } from "bun:test";
import { deriveBasketStatus } from "./basket-status";

describe("deriveBasketStatus", () => {
  test("preserves an entirely pending basket", () => {
    expect(deriveBasketStatus(["PENDING", "PENDING"])).toBe("PENDING");
  });

  test("reports pending plus submitted children as partially submitted", () => {
    expect(deriveBasketStatus(["PENDING", "SUBMITTED"])).toBe(
      "PARTIALLY_SUBMITTED",
    );
  });

  test("reports any partial or completed fill as partially filled", () => {
    expect(deriveBasketStatus(["PARTIALLY_FILLED", "SUBMITTED"])).toBe(
      "PARTIALLY_FILLED",
    );
  });

  test("reports an entirely cancelled basket as cancelled", () => {
    expect(deriveBasketStatus(["CANCELLED", "CANCELLED"])).toBe(
      "CANCELLED",
    );
  });

  test("rejects empty baskets", () => {
    expect(() => deriveBasketStatus([])).toThrow("BASKET_HAS_NO_ORDERS");
  });
});
