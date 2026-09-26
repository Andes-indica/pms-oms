import type {
  BrokerAdapter,
} from "./broker.interface";

import type {
  BrokerHolding,
  BrokerPosition,
  BrokerFunds,
  BrokerOrderResult,
} from "./types";

export interface BrokerOrderRecoveryCapability {
  findOrderByClientOrderId(
    clientOrderId: string,
  ): Promise<BrokerOrderResult | null>;
}
export interface BrokerHoldingsCapability {
  getHoldings():
    Promise<BrokerHolding[]>;
}

export interface BrokerPositionsCapability {
  getPositions():
    Promise<BrokerPosition[]>;
}

export interface BrokerFundsCapability {
  getFunds():
    Promise<BrokerFunds>;
}

export function supportsOrderRecovery(
  broker: BrokerAdapter,
): broker is BrokerAdapter &
  BrokerOrderRecoveryCapability {
  return (
    "findOrderByClientOrderId" in broker &&
    typeof (
      broker as BrokerOrderRecoveryCapability
    ).findOrderByClientOrderId ===
      "function"
  );
}
export function supportsHoldings(
  broker: BrokerAdapter,
): broker is BrokerAdapter &
  BrokerHoldingsCapability {
  return (
    "getHoldings" in broker &&
    typeof (
      broker as BrokerHoldingsCapability
    ).getHoldings === "function"
  );
}

export function supportsPositions(
  broker: BrokerAdapter,
): broker is BrokerAdapter &
  BrokerPositionsCapability {
  return (
    "getPositions" in broker &&
    typeof (
      broker as BrokerPositionsCapability
    ).getPositions === "function"
  );
}

export function supportsFunds(
  broker: BrokerAdapter,
): broker is BrokerAdapter &
  BrokerFundsCapability {
  return (
    "getFunds" in broker &&
    typeof (
      broker as BrokerFundsCapability
    ).getFunds === "function"
  );
}