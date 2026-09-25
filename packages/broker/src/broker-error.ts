export type BrokerErrorCode =
  | "BROKER_ORDER_REJECTED"
  | "BROKER_INSUFFICIENT_FUNDS"
  | "BROKER_PERMISSION_DENIED"
  | "BROKER_SESSION_INVALID"
  | "BROKER_ORDER_NOT_FOUND"
  | "BROKER_OPERATION_UNCERTAIN";

export class BrokerError extends Error {
  constructor(
    public readonly code:
      BrokerErrorCode,

    public readonly brokerMessage:
      string,

    public readonly definitive:
      boolean,
  ) {
    super(code);

    this.name =
      "BrokerError";
  }
}