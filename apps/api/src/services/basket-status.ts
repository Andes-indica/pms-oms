import type { BasketOrderStatus, OrderStatus } from "@pms-oms/db";

export function deriveBasketStatus(statuses: OrderStatus[]): BasketOrderStatus {
  if (statuses.length === 0) {
    throw new Error("BASKET_HAS_NO_ORDERS");
  }

  if (statuses.every((status) => status === "FILLED")) {
    return "FILLED";
  }

  if (statuses.every((status) => status === "REJECTED")) {
    return "REJECTED";
  }

  if (statuses.every((status) => status === "CANCELLED")) {
    return "CANCELLED";
  }

  if (
    statuses.some(
      (status) => status === "FILLED" || status === "PARTIALLY_FILLED",
    )
  ) {
    return "PARTIALLY_FILLED";
  }

  if (statuses.every((status) => status === "PENDING")) {
    return "PENDING";
  }

  if (statuses.some((status) => status === "PENDING")) {
    return "PARTIALLY_SUBMITTED";
  }

  if (
    statuses.some(
      (status) => status === "REJECTED" || status === "CANCELLED",
    )
  ) {
    return "PARTIALLY_SUBMITTED";
  }

  return "SUBMITTED";
}
