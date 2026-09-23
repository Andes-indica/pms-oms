export type ZerodhaTradingCredentials = {
  apiKey: string;
  accessToken: string;
};

export type ZerodhaAuthCredentials = {
  apiKey: string;
  apiSecret: string;
};

export type ZerodhaSession = {
  accessToken: string;
  userId: string;
  loginTime?: Date;
};