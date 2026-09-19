import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type Basket = {
  id: string;
  name?: string;

  symbol: string;
  side: string;

  totalQuantity: number;
  allocationMethod: string;

  status: string;

  orders: Array<{
    id: string;
  }>;
};

type Response = {
  data: Basket[];
};

export function BasketOrdersPage() {
  const [baskets, setBaskets] =
    useState<Basket[]>([]);

  useEffect(() => {
    apiFetch<Response>(
      "/api/basket-orders",
    ).then((response) =>
      setBaskets(response.data),
    );
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Basket Orders
      </h2>

      <div className="mt-6 grid gap-4">
        {baskets.map((basket) => (
          <div
            key={basket.id}
            className="rounded-xl border bg-white p-5"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {basket.name ??
                    basket.symbol}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {basket.side}{" "}
                  {basket.totalQuantity}{" "}
                  {basket.symbol}
                </p>
              </div>

              <span className="text-sm font-medium">
                {basket.status}
              </span>
            </div>

            <div className="mt-4 text-sm text-slate-500">
              {basket.orders.length} child
              orders •{" "}
              {basket.allocationMethod}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}