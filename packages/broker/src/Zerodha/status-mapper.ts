import type {
  BrokerOrderStatus,
} from "../types";

export function mapZerodhaStatus(
  status: string,
  filledQuantity: number,
  quantity: number,
): BrokerOrderStatus {
  if (
    status === "COMPLETE"
  ) {
    return "FILLED";
  }

  if (
    status === "CANCELLED"
  ) {
    return "CANCELLED";
  }

  if (
    status === "REJECTED"
  ) {
    return "REJECTED";
  }

  if (
    filledQuantity > 0 &&
    filledQuantity <
      quantity
  ) {
    return "PARTIALLY_FILLED";
  }

  if (
    status === "OPEN"
  ) {
    return "OPEN";
  }

  return "SUBMITTED";
}