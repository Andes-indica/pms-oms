import type {
  BrokerAdapter,
} from "../broker.interface";

import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
  BrokerOrderModification,
} from "../types";

import {
  ZerodhaClient,
} from "./zerodha-client";

import type {
  ZerodhaCredentials,
  ZerodhaOrderResponse,
} from "./zerodha-types";

export class ZerodhaBroker
  implements BrokerAdapter
{
  private client:
    ZerodhaClient;

  constructor(
    credentials:
      ZerodhaCredentials,
  ) {
    this.client =
      new ZerodhaClient(
        credentials,
      );
  }

  async placeOrder(
    order:
      BrokerOrderRequest,
  ): Promise<BrokerOrderResult> {
    const body =
      new URLSearchParams();

    body.set(
      "tradingsymbol",
      order.symbol,
    );

    body.set(
      "exchange",
      order.exchange,
    );

    body.set(
      "transaction_type",
      order.side,
    );

    body.set(
      "order_type",
      order.orderType,
    );

    body.set(
      "quantity",
      String(
        order.quantity,
      ),
    );

    body.set(
      "product",
      order.product ??
        "CNC",
    );

    body.set(
      "validity",
      order.validity ??
        "DAY",
    );

    if (
      order.orderType ===
        "LIMIT" &&
      order.limitPrice !==
        undefined
    ) {
      body.set(
        "price",
        String(
          order.limitPrice,
        ),
      );
    }

    /*
     * Useful for mapping broker
     * order back to PMS order.
     */
    body.set(
      "tag",
      order.clientOrderId.slice(
        0,
        20,
      ),
    );

    const response =
      await this.client.request<ZerodhaOrderResponse>(
        "/orders/regular",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body,
        },
      );

    if (
      !response.data
        ?.order_id
    ) {
      throw new Error(
        response.message ??
          "ZERODHA_ORDER_FAILED",
      );
    }

    return {
      brokerOrderId:
        response.data
          .order_id,

      /*
       * Placement != fill.
       */
      status:
        "SUBMITTED",
    };
  }
  async getOrderStatus(
  brokerOrderId: string,
): Promise<BrokerOrderUpdate> {
  const response =
    await this.client.request<{
      status: string;

      data: Array<{
        order_id: string;

        status: string;

        quantity: number;

        filled_quantity:
          number;

        average_price:
          number;
      }>;
    }>(
      `/orders/${brokerOrderId}`,
    );

  const latest =
    response.data.at(-1);

  if (!latest) {
    throw new Error(
      "ZERODHA_ORDER_NOT_FOUND",
    );
  }

  const status =
    mapZerodhaStatus(
      latest.status,
      latest.filled_quantity,
      latest.quantity,
    );

  return {
    brokerOrderId,

    status,

    filledQuantity:
      latest.filled_quantity,

    averageFillPrice:
      latest.filled_quantity >
      0
        ? latest.average_price
        : null,
  };
}
}