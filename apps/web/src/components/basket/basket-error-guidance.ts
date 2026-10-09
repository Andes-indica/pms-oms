export type BasketErrorGuidance = {
  title: string;
  detail?: string;
  action: string;
};

const guidanceByCode: Record<string, Omit<BasketErrorGuidance, "detail">> = {
  BASKET_NOT_PENDING: {
    title: "Basket has already started",
    action: "Refresh the basket and use the available action for its current status.",
  },
  BASKET_NOT_FOUND: {
    title: "Basket order was not found",
    action: "Refresh the basket list and confirm that the basket still exists.",
  },
  BASKET_HAS_NO_ORDERS: {
    title: "Basket has no child orders",
    action: "Create a new basket with at least one client allocation.",
  },
  INVALID_ORDER_SIDE: {
    title: "Order side is invalid",
    action: "Choose Buy or Sell, then create the basket again.",
  },
  INVALID_ORDER_TYPE: {
    title: "Order type is invalid",
    action: "Choose Market or Limit, then create the basket again.",
  },
  INVALID_QUANTITY: {
    title: "Child order quantity is invalid",
    action: "Enter a whole-number quantity greater than zero.",
  },
  BROKER_SESSION_EXPIRED: {
    title: "Broker session expired",
    action: "Reconnect this broker account, then retry the failed basket orders.",
  },
  BROKER_SESSION_INVALID: {
    title: "Broker session is invalid",
    action: "Reconnect this broker account, then retry the failed basket orders.",
  },
  BROKER_NOT_CONNECTED: {
    title: "Broker account is not connected",
    action: "Configure and connect this broker account before retrying.",
  },
  BROKER_PERMISSION_DENIED: {
    title: "Broker permission denied",
    action: "Check the broker app permissions and allowed IP address, then retry.",
  },
  BROKER_INSUFFICIENT_FUNDS: {
    title: "Insufficient funds at the broker",
    action: "Add broker funds or reduce this child order quantity before retrying.",
  },
  BROKER_ORDER_REJECTED: {
    title: "Broker rejected the order",
    action: "Review the broker reason below, correct the issue, then create a replacement order.",
  },
  ORDER_REJECTION_REASON_UNAVAILABLE: {
    title: "Order was rejected",
    action: "No rejection reason was recorded. Check the audit log and broker order book before creating a replacement.",
  },
  BROKER_OPERATION_UNCERTAIN: {
    title: "Broker result is uncertain",
    action: "Check the broker order book and reconcile before retrying to avoid a duplicate order.",
  },
  BROKER_SUBMISSION_UNCERTAIN: {
    title: "Order submission is uncertain",
    action: "Check the broker order book and reconcile before retrying to avoid a duplicate order.",
  },
  BROKER_UNSUPPORTED_EXCHANGE: {
    title: "Exchange is unsupported by this broker",
    action: "Choose a supported exchange or another broker account.",
  },
  BROKER_ORDER_ID_MISSING: {
    title: "Broker did not return an order ID",
    action: "Check the broker order book and reconcile before retrying.",
  },
  BROKER_ORDER_NOT_FOUND: {
    title: "Order was not found at the broker",
    action: "Verify the broker account and reconcile this child order.",
  },
  BROKER_ORDER_ALREADY_FILLED: {
    title: "Broker order is already filled",
    action: "Synchronize the basket to import the final fill details.",
  },
  BROKER_ORDER_ALREADY_CANCELLED: {
    title: "Broker order is already cancelled",
    action: "Synchronize the basket to update the child order status.",
  },
  INSUFFICIENT_CASH: {
    title: "Insufficient portfolio cash",
    action: "Add portfolio cash or reduce this child order quantity.",
  },
  INSUFFICIENT_BROKER_CASH: {
    title: "Insufficient cash allocated to this broker account",
    action: "Increase the broker cash allocation or reduce this child order quantity.",
  },
  INSUFFICIENT_HOLDINGS: {
    title: "Insufficient holdings for this sell order",
    action: "Reconcile holdings or reduce the sell quantity.",
  },
  HOLDING_IN_DIFFERENT_PORTFOLIO: {
    title: "Holding belongs to another portfolio",
    action: "Select the portfolio that owns this broker holding.",
  },
  RESTRICTED_SECURITY: {
    title: "Security is restricted",
    action: "Remove the restriction only if trading this security is allowed.",
  },
  MAX_ORDER_QUANTITY_EXCEEDED: {
    title: "Order quantity exceeds the risk limit",
    action: "Reduce the quantity or update the portfolio risk limit.",
  },
  MAX_ORDER_VALUE_EXCEEDED: {
    title: "Order value exceeds the risk limit",
    action: "Reduce the order value or update the portfolio risk limit.",
  },
  MAX_POSITION_QUANTITY_EXCEEDED: {
    title: "Resulting position exceeds the quantity limit",
    action: "Reduce the quantity or update the portfolio risk limit.",
  },
  MAX_POSITION_VALUE_EXCEEDED: {
    title: "Resulting position exceeds the value limit",
    action: "Reduce the order value or update the portfolio risk limit.",
  },
  ORDER_NOT_PENDING: {
    title: "Child order is no longer pending",
    action: "Refresh the basket and review the child order's current status.",
  },
  ORDER_SUBMISSION_IN_PROGRESS: {
    title: "Child order submission is still in progress",
    action: "Wait for the worker to finish, then refresh the basket.",
  },
  ORDER_NOT_FOUND: {
    title: "Child order was not found",
    action: "Refresh the basket before taking another action.",
  },
  ORDER_ALREADY_FILLED: {
    title: "Child order is already filled",
    action: "Refresh or synchronize the basket to see its final status.",
  },
  ORDER_ALREADY_REJECTED: {
    title: "Child order is already rejected",
    action: "Review its rejection reason before creating a replacement order.",
  },
  BROKER_ACCOUNT_NOT_FOUND: {
    title: "Broker account is unavailable",
    action: "Select an active broker account for this client.",
  },
  UNSUPPORTED_BROKER: {
    title: "Broker is unsupported",
    action: "Select a supported broker account.",
  },
  PORTFOLIO_NOT_FOUND: {
    title: "Portfolio is unavailable",
    action: "Select an active portfolio for this client.",
  },
  BROKER_ACCOUNT_MISMATCH: {
    title: "Broker account and portfolio belong to different clients",
    action: "Select a broker account and portfolio belonging to the same client.",
  },
  INVALID_ESTIMATED_PRICE: {
    title: "A valid market price is unavailable",
    action: "Try again when market data is available or use a valid limit price.",
  },
  INVALID_INSTRUMENT: {
    title: "Instrument is invalid",
    action: "Choose a symbol and exchange from the instrument master.",
  },
  UNKNOWN_INSTRUMENT: {
    title: "Instrument is not in the instrument master",
    action: "Import or activate the instrument before creating the basket.",
  },
  INVALID_LIMIT_PRICE: {
    title: "Limit price is invalid",
    action: "Enter a limit price greater than zero.",
  },
  INVALID_ALLOCATION_METHOD: {
    title: "Allocation method is invalid",
    action: "Choose fixed, equal, or percentage allocation.",
  },
  INSTRUMENT_MASTER_UNAVAILABLE: {
    title: "Instrument list is unavailable",
    action: "Restore the instrument source, then try creating the basket again.",
  },
  INVALID_INSTRUMENT_MASTER: {
    title: "Instrument list contains invalid data",
    action: "Correct the instrument source, then try creating the basket again.",
  },
  DUPLICATE_INSTRUMENT: {
    title: "Instrument list contains a duplicate",
    action: "Remove the duplicate symbol and exchange entry from the instrument source.",
  },
  MARKET_DATA_NOT_CONFIGURED: {
    title: "Market price service is not configured",
    action: "Configure market data or submit a valid limit order.",
  },
  MARKET_DATA_REQUEST_FAILED: {
    title: "Market price request failed",
    action: "Retry when market data is available or submit a valid limit order.",
  },
  INVALID_MARKET_PRICE: {
    title: "Market price is invalid",
    action: "Retry when a valid market price is available or submit a valid limit order.",
  },
  UNSUPPORTED_MARKET_DATA_PROVIDER: {
    title: "Market price provider is unsupported",
    action: "Correct the market data configuration before retrying.",
  },
  WORKER_LEASE_EXPIRED: {
    title: "Order processing was interrupted",
    action: "Refresh the basket. Retry only if the child order remains failed.",
  },
  BASKET_CHILD_ORDER_NOT_FOUND: {
    title: "Basket child order was not found",
    action: "Refresh the basket before taking another recovery action.",
  },
  BASKET_CHILD_RETRY_NOT_ALLOWED: {
    title: "This child order cannot be retried",
    action: "Refresh the basket and use the recovery action shown for its current state.",
  },
  BASKET_CHILD_RECONCILE_NOT_ALLOWED: {
    title: "This child order does not need broker recovery",
    action: "Refresh the basket and use the action shown for its current state.",
  },
  BASKET_CHILD_REPLACEMENT_NOT_ALLOWED: {
    title: "A replacement is not allowed for this child order",
    action: "Only a definitively rejected child order can be replaced.",
  },
  BROKER_RECOVERY_UNSUPPORTED: {
    title: "This broker cannot recover an uncertain submission",
    action: "Check the broker order book manually before taking any further action.",
  },
  BROKER_ORDER_RECOVERY_NOT_FOUND: {
    title: "No matching order was found in the broker order book",
    action: "Verify the broker order book manually. Do not retry until you are certain no order was placed.",
  },
  BROKER_ORDER_RECOVERY_CONFLICT: {
    title: "Recovered broker order conflicts with PMS state",
    action: "Stop and inspect both order records before taking another action.",
  },
  BROKER_RECOVERED_SYNC_REQUIRED: {
    title: "Broker order was recovered but still needs synchronization",
    action: "Use Sync Basket to import the broker's latest status and fills.",
  },
  NO_ALLOCATION_TARGETS: {
    title: "No clients are selected",
    action: "Select at least one client for this basket.",
  },
  INVALID_FIXED_QUANTITY: {
    title: "A child quantity is invalid",
    action: "Enter a whole-number quantity greater than zero for every selected client.",
  },
  INVALID_ALLOCATION_PERCENTAGE: {
    title: "An allocation percentage is invalid",
    action: "Enter a percentage greater than zero for every selected client.",
  },
  ALLOCATION_PRODUCES_ZERO_QUANTITY: {
    title: "An allocation produces a zero-quantity order",
    action: "Increase the total quantity or adjust the allocation percentages.",
  },
  INVALID_TOTAL_QUANTITY: {
    title: "Total quantity is invalid",
    action: "Enter a whole-number quantity greater than zero.",
  },
  ALLOCATION_QUANTITY_MISMATCH: {
    title: "Allocated quantities do not match the basket total",
    action: "Adjust the child quantities so their sum equals the total quantity.",
  },
  PERCENTAGES_MUST_TOTAL_100: {
    title: "Allocation percentages must total 100%",
    action: "Adjust the client percentages so they add up to 100%.",
  },
  QUANTITY_TOO_SMALL_FOR_EQUAL_ALLOCATION: {
    title: "Quantity is too small for equal allocation",
    action: "Increase the total quantity or select fewer clients.",
  },
  QUANTITY_TOO_SMALL_FOR_PERCENTAGE_ALLOCATION: {
    title: "Quantity is too small for percentage allocation",
    action: "Increase the total quantity or select fewer clients.",
  },
  BROKER_INVALID_ORDER_STATE: {
    title: "Broker returned an invalid order state",
    action: "Retry synchronization. If it persists, inspect the broker order book.",
  },
  BROKER_FILL_DETAILS_UNAVAILABLE: {
    title: "Broker fill details are not available yet",
    action: "Wait briefly, then synchronize the basket again.",
  },
  BROKER_EXECUTION_QUANTITY_MISMATCH: {
    title: "Broker executions changed during synchronization",
    action: "Synchronize the basket again before taking another action.",
  },
};

export function formatOrderStatusLabel(
  status: string,
) {
  return status
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0)
          .toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

export function getBasketErrorGuidance(rawError: string): BasketErrorGuidance {
  const normalized = rawError.trim();
  const separator = normalized.indexOf(":");
  const code = (separator === -1 ? normalized : normalized.slice(0, separator)).trim();
  const brokerDetail = separator === -1 ? "" : normalized.slice(separator + 1).trim();
  const known = guidanceByCode[code];

  if (known) {
    return {
      ...known,
      ...(brokerDetail ? { detail: brokerDetail } : {}),
    };
  }

  return {
    title: "Basket order action failed",
    ...(normalized && normalized !== "UNKNOWN_ERROR" ? { detail: normalized } : {}),
    action: "Review this child order and broker account, then try again.",
  };
}
