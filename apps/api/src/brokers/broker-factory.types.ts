import type {
  BrokerAdapter,
} from "@pms-oms/broker";

export type BrokerFactoryContext = {
  brokerAccountId: string;
  accountId: string;

  credentials:
    unknown | null;

  session:
    unknown | null;
};

export type BrokerFactory = (
  context: BrokerFactoryContext,
) => Promise<BrokerAdapter>;