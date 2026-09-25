import {
  KiteConnect, type Connect
} from "kiteconnect"
import type {
  BrokerAdapter,
} from "../../broker.interface";

import type {
  BrokerOrderRequest,
  BrokerOrderResult,
  BrokerOrderUpdate,
  BrokerCancellationResult,
  BrokerOrderModification,
} from "../../types";

import type {
  BrokerOrderRecoveryCapability,
} from "../../broker-capabilities"

import type {
  ZerodhaTradingCredentials,
} from "./zerodha-types";

import {
  mapZerodhaStatus
} from "./zerodha-status-mapper";

import {
  createZerodhaOrderTag
} from "./zerodha-tag";

export class ZerodhaBroker
  implements BrokerAdapter, BrokerOrderRecoveryCapability {
  private kite: Connect;
  private mapExchange(
    exchange: string,
  ) {
    switch (
    exchange.toUpperCase()
    ) {
      case "NSE":
        return this.kite.EXCHANGE_NSE;

      case "BSE":
        return this.kite.EXCHANGE_BSE;

      default:
        throw new Error(
          "BROKER_UNSUPPORTED_EXCHANGE",
        );
    }
  }
  constructor(
    credentials:
      ZerodhaTradingCredentials,
  ) {
    this.kite =
      new KiteConnect({
        api_key: credentials.apiKey,
        access_token: credentials.accessToken,
      });
  }

  private async getAverageFillPrice(
    brokerOrderId: string,
    filledQuantity: number,
  ): Promise<number | null> {
    if (filledQuantity <= 0) {
      return null;
    }

    const trades =
      await this.kite.getOrderTrades(
        brokerOrderId,
      );

    if (
      !Array.isArray(trades) ||
      trades.length === 0
    ) {
      throw new Error(
        "BROKER_FILL_DETAILS_UNAVAILABLE",
      );
    }

    let totalQuantity = 0;
    let totalValue = 0;

    for (const trade of trades) {
      const quantity =
        Number(
          trade.quantity ?? 0,
        );

      const price =
        Number(
          trade.average_price ?? 0,
        );

      if (
        !Number.isFinite(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        continue;
      }

      totalQuantity += quantity;

      totalValue +=
        quantity * price;
    }

    if (
      totalQuantity <= 0 ||
      totalQuantity <
      filledQuantity
    ) {
      throw new Error(
        "BROKER_FILL_DETAILS_UNAVAILABLE",
      );
    }

    return (
      totalValue /
      totalQuantity
    );
  }

  async placeOrder(
    order: BrokerOrderRequest,
  ): Promise<BrokerOrderResult> {
    const exchange =
      this.mapExchange(
        order.exchange,
      );

    const response =
      await this.kite.placeOrder(
        this.kite.VARIETY_REGULAR,
        {
          exchange,

          tradingsymbol:
            order.symbol,

          transaction_type:
            order.side === "BUY"
              ? this.kite
                .TRANSACTION_TYPE_BUY
              : this.kite
                .TRANSACTION_TYPE_SELL,

          order_type:
            order.orderType ===
              "MARKET"
              ? this.kite
                .ORDER_TYPE_MARKET
              : this.kite
                .ORDER_TYPE_LIMIT,

          product:
            this.kite.PRODUCT_CNC,

          validity:
            this.kite.VALIDITY_DAY,

          quantity:
            order.quantity,

          ...(order.orderType ===
            "LIMIT"
            ? {
              price:
                order.limitPrice!,
            }
            : {
              market_protection:
                -1,
            }),

          tag:
            createZerodhaOrderTag(
              order.clientOrderId,
            ),
        },
      );

    if (!response?.order_id) {
      throw new Error(
        "BROKER_ORDER_ID_MISSING",
      );
    }

    return {
      brokerOrderId:
        String(
          response.order_id,
        ),

      status: "SUBMITTED",
    };
  }
  async getOrderStatus(
    brokerOrderId: string,
  ): Promise<BrokerOrderUpdate> {
    const orders =
      await this.kite.getOrders();

    let order =
      orders.find(
        (candidate: any) =>
          String(
            candidate.order_id,
          ) ===
          brokerOrderId,
      );

    if (!order) {
      const history =
        await this.kite
          .getOrderHistory(
            brokerOrderId,
          );

      order =
        history.at(-1);
    }

    if (!order) {
      throw new Error(
        "BROKER_ORDER_NOT_FOUND",
      );
    }

    const quantity =
      Number(
        order.quantity,
      );

    const filledQuantity =
      Number(
        order.filled_quantity ??
        0,
      );

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isInteger(
        filledQuantity,
      ) ||
      filledQuantity < 0 ||
      filledQuantity > quantity
    ) {
      throw new Error(
        "BROKER_INVALID_ORDER_STATE",
      );
    }

    const averageFillPrice =
      await this
        .getAverageFillPrice(
          brokerOrderId,
          filledQuantity,
        );

    return {
      brokerOrderId,

      status:
        mapZerodhaStatus(
          String(order.status),
          filledQuantity,
          quantity,
        ),

      filledQuantity,

      averageFillPrice,
    };
  }
  async cancelOrder(
    brokerOrderId: string,
  ): Promise<BrokerCancellationResult> {
    await this.kite.cancelOrder(
      this.kite.VARIETY_REGULAR,
      brokerOrderId,
    );

    return {
      brokerOrderId,
      status: "CANCELLED",
    };
  }
  async modifyOrder(
    brokerOrderId: string,
    changes:
      BrokerOrderModification,
  ): Promise<BrokerOrderResult> {
    await this.kite.modifyOrder(
      this.kite.VARIETY_REGULAR,
      brokerOrderId,
      {
        ...(changes.quantity !==
          undefined
          ? {
            quantity:
              changes.quantity,
          }
          : {}),

        ...(changes.limitPrice !==
          undefined
          ? {
            price:
              changes.limitPrice,
          }
          : {}),
      },
    );

    return {
      brokerOrderId,
      status: "SUBMITTED",
    };
  }
  async getEstimatedPrice(
    symbol: string,
    exchange: string,
  ): Promise<number> {
    const instrument =
      `${exchange.toUpperCase()}:${symbol.toUpperCase()}`;

    const result =
      await this.kite.getLTP(
        [instrument],
      );

    const price =
      Number(
        result?.[instrument]
          ?.last_price,
      );

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      throw new Error(
        "MARKET_PRICE_UNAVAILABLE",
      );
    }

    return price;
  }
  async findOrderByClientOrderId(
    clientOrderId: string,
  ): Promise<BrokerOrderResult | null> {
    const tag =
      createZerodhaOrderTag(
        clientOrderId,
      );

    const orders =
      await this.kite.getOrders();

    const order =
      [...orders]
        .reverse()
        .find(
          (candidate: any) =>
            candidate.tag === tag,
        );

    if (!order) {
      return null;
    }

    const quantity =
      Number(order.quantity);

    const filledQuantity =
      Number(
        order.filled_quantity ??
        0,
      );

    return {
      brokerOrderId:
        String(order.order_id),

      status:
        mapZerodhaStatus(
          String(order.status),
          filledQuantity,
          quantity,
        ),
    };
  }
}
