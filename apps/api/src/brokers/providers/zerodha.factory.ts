import {
  ZerodhaBroker,
} from "@pms-oms/broker";

import type {
  BrokerFactory,
} from "../broker-factory.types";

type Credentials = {
  apiKey: string;
  apiSecret: string;
};

type Session = {
  accessToken: string;
};

export const createZerodhaBroker:
  BrokerFactory =
  async (context) => {
    const credentials =
      context.credentials as
        | Credentials
        | null;

    const session =
      context.session as
        | Session
        | null;

    if (
      !credentials?.apiKey ||
      !session?.accessToken
    ) {
      throw new Error(
        "BROKER_NOT_CONNECTED",
      );
    }

    return new ZerodhaBroker({
      apiKey:
        credentials.apiKey,

      accessToken:
        session.accessToken,
    });
  };