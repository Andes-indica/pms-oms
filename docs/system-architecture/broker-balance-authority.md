# Broker balance authority

The PMS and the broker answer different questions. They must not be treated as
competing copies of the same balance.

| Value | Authority | Purpose |
| --- | --- | --- |
| Broker available cash, used margin, and net available | Broker API | Reconciliation and operator visibility; the order response remains the execution authority |
| Portfolio cash balance | PMS ledger | Internal accounting and reporting; not a broker execution gate |
| Portfolio-to-broker cash allocation | PMS configuration | Advisory allocation and reconciliation; not a broker execution gate |
| Client-confirmed order funds | Client's broker account | Validated by Kite when the client confirms; unavailable to the Publisher callback |

## Direct execution

The risk service enforces restricted securities and configured order/position
limits. It does not estimate whether an account can fund the order. Required
margin varies by product, instrument, exposure, collateral, and broker rules;
comparing order notional with a cash snapshot can therefore reject an order the
broker would accept.

PMS portfolio cash, broker allocations, and imported holdings remain useful for
accounting, reporting, and reconciliation. They are snapshots which may lag the
broker and therefore do not reject a broker-authoritative order. The PMS still
records reservations so concurrent activity and later reconciliation remain
visible. The broker's place/modify response is the final funds and margin
decision. A definitive rejection is persisted with the broker's exact reason
and releases the PMS reservation.

Funds snapshots are still available for reconciliation and operator display.
For Zerodha, the displayed available amount uses `equity.net`, which Zerodha
defines as the net balance available for trading, rather than raw
`equity.available.cash`.

## Client-confirmed execution

Zerodha Publisher does not give the PMS authenticated access to each client's
funds or holdings. Kite is therefore the final availability and margin authority
when the client reviews and confirms the order. The PMS continues to enforce
restricted securities and explicitly configured order/position risk limits,
but stale PMS cash, allocation, or holding snapshots cannot block the handoff.

This limitation must remain visible in the order handoff UI and operational
documentation. A successful Publisher callback is not a broker funds snapshot.
