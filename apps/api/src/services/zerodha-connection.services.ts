import {
  ZerodhaAuth,
} from "@pms-oms/broker";

export function getZerodhaLoginUrl(
  apiKey: string,
): string {
  const auth = new ZerodhaAuth(apiKey);

  return auth.getLoginUrl();
}

export async function exchangeZerodhaSession(
  apiKey: string,
  requestToken: string,
  apiSecret: string,
) {
  const auth = new ZerodhaAuth(apiKey);

  return auth.exchangeRequestToken(
    requestToken,
    apiSecret,
  );
}