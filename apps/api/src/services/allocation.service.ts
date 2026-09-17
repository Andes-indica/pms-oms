type AllocationMethod =
  | "FIXED_QUANTITY"
  | "EQUAL_QUANTITY"
  | "PERCENTAGE";

export type AllocationTarget = {
  portfolioId: string;
  brokerAccountId: string;

  quantity?: number;
  percentage?: number;
};

export type AllocationResult = {
  portfolioId: string;
  brokerAccountId: string;
  quantity: number;
};

type AllocateInput = {
  method: AllocationMethod;
  totalQuantity: number;
  targets: AllocationTarget[];
};

export function allocateOrder({
  method,
  totalQuantity,
  targets,
}: AllocateInput): AllocationResult[] {
  if (targets.length === 0) {
    throw new Error("NO_ALLOCATION_TARGETS");
  }

  if (!Number.isInteger(totalQuantity) || totalQuantity <= 0) {
    throw new Error("INVALID_TOTAL_QUANTITY");
  }

  if (method === "FIXED_QUANTITY") {
    const allocations = targets.map((target) => {
      if (
        !Number.isInteger(target.quantity) ||
        !target.quantity ||
        target.quantity <= 0
      ) {
        throw new Error("INVALID_FIXED_QUANTITY");
      }

      return {
        portfolioId: target.portfolioId,
        brokerAccountId:
          target.brokerAccountId,
        quantity: target.quantity,
      };
    });

    const allocatedTotal = allocations.reduce(
      (sum, allocation) =>
        sum + allocation.quantity,
      0,
    );

    if (allocatedTotal !== totalQuantity) {
      throw new Error(
        "ALLOCATION_QUANTITY_MISMATCH",
      );
    }

    return allocations;
  }

  if (method === "EQUAL_QUANTITY") {
    if (totalQuantity < targets.length) {
      throw new Error(
        "QUANTITY_TOO_SMALL_FOR_EQUAL_ALLOCATION",
      );
    }

    const baseQuantity = Math.floor(
      totalQuantity / targets.length,
    );

    let remainder =
      totalQuantity % targets.length;

    return targets.map((target) => {
      let quantity = baseQuantity;

      if (remainder > 0) {
        quantity += 1;
        remainder -= 1;
      }

      return {
        portfolioId: target.portfolioId,
        brokerAccountId:
          target.brokerAccountId,
        quantity,
      };
    });
  }

  if (method === "PERCENTAGE") {
    if (totalQuantity < targets.length) {
      throw new Error(
        "QUANTITY_TOO_SMALL_FOR_PERCENTAGE_ALLOCATION",
      );
    }

    const totalPercentage = targets.reduce(
      (sum, target) =>
        sum + (target.percentage ?? 0),
      0,
    );

    if (
      Math.abs(totalPercentage - 100) > 0.001
    ) {
      throw new Error(
        "PERCENTAGES_MUST_TOTAL_100",
      );
    }

    const calculated = targets.map(
      (target, index) => {
        if (
          target.percentage === undefined ||
          !Number.isFinite(target.percentage) ||
          target.percentage <= 0
        ) {
          throw new Error(
            "INVALID_ALLOCATION_PERCENTAGE",
          );
        }

        const exact =
          totalQuantity *
          (target.percentage / 100);

        return {
          index,
          target,
          quantity: Math.floor(exact),
          fractional: exact - Math.floor(exact),
        };
      },
    );

    let allocated = calculated.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    );

    let remainder =
      totalQuantity - allocated;

    // Largest remainder method.
    calculated.sort(
      (a, b) =>
        b.fractional - a.fractional,
    );

    for (
      let i = 0;
      i < calculated.length &&
      remainder > 0;
      i++
    ) {
      calculated[i]!.quantity += 1;
      remainder -= 1;
    }

    calculated.sort(
      (a, b) => a.index - b.index,
    );

    return calculated.map((item) => {
      if (item.quantity <= 0) {
        throw new Error(
          "ALLOCATION_PRODUCES_ZERO_QUANTITY",
        );
      }

      return {
        portfolioId: item.target.portfolioId,
        brokerAccountId: item.target.brokerAccountId,
        quantity: item.quantity,
      };
    });
  }

  throw new Error(
    "INVALID_ALLOCATION_METHOD",
  );
}
