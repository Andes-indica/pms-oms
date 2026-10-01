import type {
  Order,
} from "./types";

import {
  formatCurrency,
} from "./utils";

import {
  Fragment,
  useState,
} from "react";

type Props = {
  orders: Order[];
};

export function RecentOrdersTable({
  orders,
}: Props) {
  const [expandedOrderId, setExpandedOrderId] =
    useState<string | null>(null);

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

              <th className="px-4 py-3">
                Executions
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr
                  className="cursor-pointer border-t hover:bg-slate-50"
                  onClick={() =>
                    setExpandedOrderId((current) =>
                      current === order.id ? null : order.id,
                    )
                  }
                >
                  <td className="px-4 py-4 font-medium">
                    {order.symbol}
                  </td>

                  <td className="px-4 py-4">
                    {order.side}
                  </td>

                  <td className="px-4 py-4">
                    {order.quantity}
                  </td>

                  <td className="px-4 py-4">
                    {order.status}
                  </td>

                  <td className="px-4 py-4">
                    {order.averageFillPrice
                      ? formatCurrency(Number(order.averageFillPrice))
                      : "—"}
                  </td>

                  <td className="px-4 py-4">
                    {order.realizedPnl
                      ? formatCurrency(Number(order.realizedPnl))
                      : "—"}
                  </td>

                  <td className="px-4 py-4">
                    {order.executions?.length
                      ? `${order.executions.length} fill${
                          order.executions.length === 1 ? "" : "s"
                        }`
                      : "—"}
                  </td>
                </tr>

                {expandedOrderId === order.id && (
                  <tr className="border-t bg-slate-50">
                    <td colSpan={7} className="px-4 py-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Executions
                        </p>

                        {order.executions?.length ? (
                          <div className="mt-3 space-y-2">
                            {order.executions.map((execution) => (
                              <div
                                key={execution.id}
                                className="flex flex-wrap justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-xs"
                              >
                                <div>
                                  <p className="font-medium text-slate-700">
                                    {execution.brokerExecutionId}
                                  </p>

                                  <p className="mt-1 text-slate-500">
                                    {new Date(
                                      execution.executedAt,
                                    ).toLocaleString()}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p>Qty {execution.quantity}</p>

                                  <p className="mt-1 text-slate-500">
                                    @ {formatCurrency(Number(execution.price))}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            No execution records.
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}