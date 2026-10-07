export type InventoryReconciliationStatus =
  | "MATCH"
  | "MISSING_IN_PMS"
  | "MISSING_AT_BROKER"
  | "QUANTITY_MISMATCH";

export function classifyInventoryReconciliation(input: {
  brokerPresent: boolean;
  pmsPresent: boolean;
  brokerQuantity: number;
  pmsQuantity: number;
}): InventoryReconciliationStatus {
  if (
    input.brokerPresent &&
    !input.pmsPresent
  ) {
    return "MISSING_IN_PMS";
  }

  if (
    !input.brokerPresent &&
    input.pmsPresent
  ) {
    return "MISSING_AT_BROKER";
  }

  if (
    input.brokerQuantity !==
    input.pmsQuantity
  ) {
    return "QUANTITY_MISMATCH";
  }

  return "MATCH";
}
