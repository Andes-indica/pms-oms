export type ZerodhaCredentials = {
  apiKey: string;
  apiSecret: string;
  accessToken?: string;
};

export type ZerodhaOrderResponse = {
  status: "success" | "error";

  data?: {
    order_id: string;
  };

  message?: string;

  error_type?: string;
};