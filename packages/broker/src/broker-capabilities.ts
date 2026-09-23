import type {
  BrokerAdapter,
} from "./broker.interface";

import type {
  BrokerOrderResult,
} from "./types";

export interface BrokerOrderRecoveryCapability {
  findOrderByClientOrderId(
    clientOrderId: string,
  ): Promise<BrokerOrderResult | null>;
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