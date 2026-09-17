import { describe, expect, test } from "bun:test";
import { allocateOrder } from "./allocation.service";

const target = (index: number) => ({
  portfolioId: `portfolio-${index}`,
  brokerAccountId: `broker-${index}`,
});

describe("allocateOrder", () => {
  test("preserves the requested total for equal allocation", () => {
    const allocations = allocateOrder({
      method: "EQUAL_QUANTITY",
      totalQuantity: 5,
      targets: [target(1), target(2)],
    });

    expect(allocations.map(({ quantity }) => quantity)).toEqual([3, 2]);
  });

  test("rejects fractional total quantities", () => {
    expect(() =>
      allocateOrder({
        method: "EQUAL_QUANTITY",
        totalQuantity: 2.5,
        targets: [target(1), target(2)],
      }),
    ).toThrow("INVALID_TOTAL_QUANTITY");
  });

  test("never creates zero-quantity percentage allocations", () => {
    expect(() =>
      allocateOrder({
        method: "PERCENTAGE",
        totalQuantity: 1,
        targets: [
          { ...target(1), percentage: 1 },
          { ...target(2), percentage: 99 },
        ],
      }),
    ).toThrow("QUANTITY_TOO_SMALL_FOR_PERCENTAGE_ALLOCATION");
  });

  test("requires fixed quantities to be positive integers", () => {
    expect(() =>
      allocateOrder({
        method: "FIXED_QUANTITY",
        totalQuantity: 2,
        targets: [{ ...target(1), quantity: 1.5 }],
      }),
    ).toThrow("INVALID_FIXED_QUANTITY");
  });
});
