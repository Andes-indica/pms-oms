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

  test("rejects empty allocation targets", () => {
    expect(() =>
      allocateOrder({
        method:
          "EQUAL_QUANTITY",
        totalQuantity: 10,
        targets: [],
      }),
    ).toThrow(
      "NO_ALLOCATION_TARGETS",
    );
  });

  test("rejects equal allocation when quantity is smaller than target count", () => {
    expect(() =>
      allocateOrder({
        method:
          "EQUAL_QUANTITY",
        totalQuantity: 1,
        targets: [
          target(1),
          target(2),
        ],
      }),
    ).toThrow(
      "QUANTITY_TOO_SMALL_FOR_EQUAL_ALLOCATION",
    );
  });

  test("fixed allocations must equal total quantity", () => {
    expect(() =>
      allocateOrder({
        method:
          "FIXED_QUANTITY",
        totalQuantity: 5,

        targets: [
          {
            ...target(1),
            quantity: 2,
          },
          {
            ...target(2),
            quantity: 2,
          },
        ],
      }),
    ).toThrow(
      "ALLOCATION_QUANTITY_MISMATCH",
    );
  });

  test("percentage allocations must total 100", () => {
    expect(() =>
      allocateOrder({
        method: "PERCENTAGE",
        totalQuantity: 10,

        targets: [
          {
            ...target(1),
            percentage: 20,
          },
          {
            ...target(2),
            percentage: 70,
          },
        ],
      }),
    ).toThrow(
      "PERCENTAGES_MUST_TOTAL_100",
    );
  });

  test("percentage allocation preserves total quantity", () => {
    const allocations =
      allocateOrder({
        method: "PERCENTAGE",
        totalQuantity: 11,

        targets: [
          {
            ...target(1),
            percentage: 50,
          },
          {
            ...target(2),
            percentage: 30,
          },
          {
            ...target(3),
            percentage: 20,
          },
        ],
      });

    expect(
      allocations.reduce(
        (total, allocation) =>
          total +
          allocation.quantity,
        0,
      ),
    ).toBe(11);
  });

  test("percentage allocation uses largest remainder without producing zero quantities", () => {
    const allocations =
      allocateOrder({
        method: "PERCENTAGE",
        totalQuantity: 7,

        targets: [
          {
            ...target(1),
            percentage: 50,
          },
          {
            ...target(2),
            percentage: 30,
          },
          {
            ...target(3),
            percentage: 20,
          },
        ],
      });

    expect(
      allocations.map(
        (allocation) =>
          allocation.quantity,
      ),
    ).toEqual([
      4,
      2,
      1,
    ]);
  });
});
