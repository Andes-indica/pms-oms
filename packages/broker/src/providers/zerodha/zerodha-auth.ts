import {
  KiteConnect,
} from "kiteconnect";

import {
  getZerodhaHttpTimeoutMs,
} from "./zerodha-timeout";

export class ZerodhaAuth {
  constructor(
    private apiKey: string,
  ) {}

  getLoginUrl(): string {
    const kite =
      new KiteConnect({
        api_key: this.apiKey,
        timeout:
          getZerodhaHttpTimeoutMs(),
      });

    return kite.getLoginURL();
  }

  async exchangeRequestToken(
    requestToken: string,
    apiSecret: string,
  ) {
    const kite =
      new KiteConnect({
        api_key: this.apiKey,
        timeout:
          getZerodhaHttpTimeoutMs(),
      });

    const session =
      await kite.generateSession(
        requestToken,
        apiSecret,
      );

    return {
      accessToken:
        session.access_token as string,

      userId:
        session.user_id as string,

      loginTime:
        session.login_time
          ? new Date(
              session.login_time,
            )
          : new Date(),
    };
  }
}
