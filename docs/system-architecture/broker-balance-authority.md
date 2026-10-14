# Broker balance authority

The PMS and the broker answer different questions. They must not be treated as
competing copies of the same balance.

| Value | Authority | Purpose |
| --- | --- | --- |
| Broker available cash, used margin, and net available | Broker API | Whether a direct BUY can be accepted now |
| Portfolio cash balance | PMS ledger | The portfolio's internal cash entitlement |
| Portfolio-to-broker cash allocation | PMS configuration | How much of that entitlement may be used through one broker account |
| Client-confirmed order funds | Client's broker account | Validated by Kite when the client confirms; unavailable to the Publisher callback |

## Direct execution

Before a real direct BUY is reserved, the API obtains a Zerodha funds snapshot.
Snapshots are persisted with their capture time and may be reused only for the
short `BROKER_FUNDS_SNAPSHOT_TTL_SECONDS` window. A PostgreSQL advisory lock
coalesces concurrent refreshes for the same broker account.

The risk service then requires all applicable limits to pass:

1. PMS portfolio cash after other portfolio reservations.
2. PMS broker allocation after other reservations for that portfolio/account.
3. Broker available cash, less direct-order reservations the captured broker
   snapshot cannot yet include.
4. Restricted-security and order/position risk limits.

Broker-account rows are locked while direct reservations are made, so two
portfolios using the same account cannot independently consume the same
observed broker cash.

For a live-order modification, the broker check uses only the increase over the
order's existing cash reservation. The broker's reported available cash already
reflects margin used by the existing order.

If broker funds cannot be read or the snapshot becomes stale, direct BUY
execution fails closed. MockBroker remains exempt so local and automated tests
do not claim to represent real broker funds.

## Client-confirmed execution

Zerodha Publisher does not give the PMS authenticated access to each client's
funds. The PMS therefore applies its own portfolio/allocation/risk controls but
must not label those values as verified broker cash. Kite is the final funds and
margin authority when the client reviews and confirms the order.

This limitation must remain visible in the order handoff UI and operational
documentation. A successful Publisher callback is not a broker funds snapshot.
