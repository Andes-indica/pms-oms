import type {
  Order,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  orders: Order[];
};

export function RecentOrdersTable({
  orders,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-5 py-4">
        <h4 className="font-medium">
          Recent Orders
        </h4>
      </div>

      {orders.length === 0 ? (
        <p className="p-5 text-sm text-slate-500">
          No recent orders.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">
                Symbol
              </th>

              <th className="px-4 py-3">
                Side
              </th>

              <th className="px-4 py-3">
                Qty
              </th>

              <th className="px-4 py-3">
                Status
              </th>

              <th className="px-4 py-3">
                Fill
              </th>

              <th className="px-4 py-3">
                P&L
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map(
              (order) => (
                <tr
                  key={order.id}
                  className="border-t"
                >
                  <td className="px-4 py-4 font-medium">
                    {order.symbol}
                  </td>

                  <td className="px-4 py-4">
                    {order.side}
                  </td>

                  <td className="px-4 py-4">
                    {
                      order.quantity
                    }
                  </td>

                  <td className="px-4 py-4">
                    {
                      order.status
                    }
                  </td>

                  <td className="px-4 py-4">
                    {order.averageFillPrice
                      ? formatCurrency(
                          Number(
                            order.averageFillPrice,
                          ),
                        )
                      : "—"}
                  </td>

                  <td className="px-4 py-4">
                    {order.realizedPnl
                      ? formatCurrency(
                          Number(
                            order.realizedPnl,
                          ),
                        )
                      : "—"}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}