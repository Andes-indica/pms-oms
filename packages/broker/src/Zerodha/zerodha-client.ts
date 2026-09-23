import type {
  ZerodhaCredentials,
  ZerodhaOrderResponse
} from "./zerodha-types";

const BASE_URL =
  "https://api.kite.trade";

export class ZerodhaClient {
  constructor(
    private credentials:
      ZerodhaCredentials,
  ) {}

  private get headers() {
    if (
      !this.credentials
        .accessToken
    ) {
      throw new Error(
        "ZERODHA_ACCESS_TOKEN_MISSING",
      );
    }

    return {
      "X-Kite-Version": "3",

      Authorization:
        `token ${this.credentials.apiKey}:${this.credentials.accessToken}`,
    };
  }

  async request<T>(
    path: string,
    options:
      RequestInit = {},
  ): Promise<T> {
    const response =
      await fetch(
        `${BASE_URL}${path}`,
        {
          ...options,

          headers: {
            ...this.headers,
            ...(options.headers ??
              {}),
          },
        },
      );

    const body =
      await response.json();

    if (!response.ok) {
      throw new Error(
        body?.message ??
          "ZERODHA_API_ERROR",
      );
    }

    return body as T;
  }
}