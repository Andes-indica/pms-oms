# Broker balance authority

The PMS and the broker answer different questions. They must not be treated as
competing copies of the same balance.

| Value | Authority | Purpose |
| --- | --- | --- |
| Broker available cash, used margin, and net available | Broker API | Whether a direct BUY can be accepted now |
| Portfolio cash balance | PMS ledger | Internal accounting and reporting; not a broker execution gate |
| Portfolio-to-broker cash allocation | PMS configuration | Advisory allocation and reconciliation; not a broker execution gate |
| Client-confirmed order funds | Client's broker account | Validated by Kite when the client confirms; unavailable to the Publisher callback |

## Direct execution

Before a real direct BUY is reserved, the API obtains a Zerodha funds snapshot.
Snapshots are persisted with their capture time and may be reused only for the
short `BROKER_FUNDS_SNAPSHOT_TTL_SECONDS` window. A PostgreSQL advisory lock
coalesces concurrent refreshes for the same broker account.

The risk service then requires the authoritative and configured controls to
pass:

1. Broker available cash, less direct-order reservations the captured broker
   snapshot cannot yet include.
2. Restricted-security and configured order/position risk limits.

PMS portfolio cash, broker allocations, and imported holdings remain useful for
accounting, reporting, and reconciliation. They are snapshots which may lag the
broker and therefore do not reject a broker-authoritative order. The PMS still
records reservations so concurrent activity and later reconciliation remain
visible.

Broker-account rows are locked while direct reservations are made, so two
portfolios using the same account cannot independently consume the same
observed broker cash.

For a live-order modification, the broker check uses only the increase over the
order's existing cash reservation. The broker's reported available cash already
reflects margin used by the existing order.

If a connected broker supports a funds endpoint, a stale or failed snapshot
still stops a direct BUY. When a broker integration does not expose funds, the
PMS submits the order and lets that broker accept or reject it instead of using
a stale local ledger as a substitute. MockBroker remains exempt so local and
automated tests do not claim to represent real broker funds.

## Client-confirmed execution

Zerodha Publisher does not give the PMS authenticated access to each client's
funds or holdings. Kite is therefore the final availability and margin authority
when the client reviews and confirms the order. The PMS continues to enforce
restricted securities and explicitly configured order/position risk limits,
but stale PMS cash, allocation, or holding snapshots cannot block the handoff.

This limitation must remain visible in the order handoff UI and operational
documentation. A successful Publisher callback is not a broker funds snapshot.
