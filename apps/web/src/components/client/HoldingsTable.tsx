import type {
  ValuedHolding,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  holdings: ValuedHolding[];
};

export function HoldingsTable({
  holdings,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <div className="border-b px-5 py-4">
        <h4 className="font-medium">
          Holdings
        </h4>
      </div>

      {holdings.length === 0 ? (
        <p className="p-5 text-sm text-slate-500">
          No holdings.
        </p>
      ) : (
        <table className="w-full min-w-900px text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">
                Symbol
              </th>

              <th className="px-4 py-3">
                Qty
              </th>

              <th className="px-4 py-3">
                Avg Price
              </th>

              <th className="px-4 py-3">
                Current Price
              </th>

              <th className="px-4 py-3">
                Cost Value
              </th>

              <th className="px-4 py-3">
                Market Value
              </th>

              <th className="px-4 py-3">
                Unrealized P&L
              </th>

              <th className="px-4 py-3">
                P&L %
              </th>
            </tr>
          </thead>

          <tbody>
            {holdings.map(
              (holding) => (
                <tr
                  key={holding.id}
                  className="border-t"
                >
                  <td className="px-4 py-4">
                    <p className="font-medium">
                      {holding.symbol}
                    </p>

                    <p className="text-xs text-slate-500">
                      {
                        holding.exchange
                      }
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    {
                      holding.quantity
                    }
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(
                      holding.averagePrice,
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(
                      holding.currentPrice,
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(
                      holding.costValue,
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(
                      holding.marketValue,
                    )}
                  </td>

                  <td
                    className={`px-4 py-4 font-medium ${
                      holding.unrealizedPnl >=
                      0
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(
                      holding.unrealizedPnl,
                    )}
                  </td>

                  <td
                    className={`px-4 py-4 font-medium ${
                      holding.unrealizedPnlPercent >=
                      0
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {holding.unrealizedPnlPercent.toFixed(
                      2,
                    )}
                    %
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