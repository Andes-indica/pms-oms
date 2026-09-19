import type {
  Holding,
} from "./types";

import {
  formatCurrency,
} from "./utils";

type Props = {
  holdings: Holding[];
};

export function HoldingsTable({
  holdings,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
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
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3">
                Symbol
              </th>

              <th className="px-5 py-3">
                Exchange
              </th>

              <th className="px-5 py-3">
                Quantity
              </th>

              <th className="px-5 py-3">
                Avg Price
              </th>

              <th className="px-5 py-3">
                Cost Value
              </th>
            </tr>
          </thead>

          <tbody>
            {holdings.map(
              (holding) => {
                const averagePrice =
                  Number(
                    holding.averagePrice,
                  );

                const costValue =
                  holding.quantity *
                  averagePrice;

                return (
                  <tr
                    key={holding.id}
                    className="border-t"
                  >
                    <td className="px-5 py-4 font-medium">
                      {holding.symbol}
                    </td>

                    <td className="px-5 py-4">
                      {
                        holding.exchange
                      }
                    </td>

                    <td className="px-5 py-4">
                      {
                        holding.quantity
                      }
                    </td>

                    <td className="px-5 py-4">
                      {formatCurrency(
                        averagePrice,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {formatCurrency(
                        costValue,
                      )}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}