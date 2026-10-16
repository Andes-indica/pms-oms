# Client-confirmed execution

Client-confirmed execution is an alternative to direct broker API execution.
The PMS creates and validates an order proposal, but the client's browser sends
the order to Zerodha's offsite basket page. The client signs in to the broker,
reviews the immutable proposal, and confirms it in the broker-owned interface.

## Execution modes

- `DIRECT_API` keeps the existing durable execution queue and broker adapter
  behaviour.
- `CLIENT_CONFIRMATION` never enters the automatic execution queue. It uses an
  expiring, high-entropy client link and an offsite broker handoff.

Queue and basket execution services must reject `CLIENT_CONFIRMATION` orders.
This is a safety boundary, not only a UI distinction.

## Flow

1. A manager creates a single order or allocated basket and selects client
   confirmation.
2. The API performs the same instrument, ownership, pre-trade, and risk checks
   used by direct execution.
3. The API reserves the proposed cash or quantity and issues a random token.
   Only its SHA-256 hash is stored. The raw token is returned once for a link
   whose fragment is not sent in HTTP access logs or referrer headers.
4. The client opens the link and sees only the minimum order and account
   information needed for review.
5. The client chooses **Review in Zerodha**. The browser posts an immutable,
   tagged one-order basket to Zerodha's offsite basket endpoint.
6. Zerodha redirects to the registered Publisher callback with the handoff
   result. The PMS records that the Publisher flow completed, but deliberately
   does not exchange the request token or obtain access to the client's broker
   account.
7. The client verifies the final order, fill, rejection, modification, or
   cancellation status in Kite. A manager or operations user then records the
   verified broker order ID and final status in the PMS. Until that manual
   reconciliation happens, the PMS keeps the reservation because a
   Publisher-only app cannot read the broker order book.

For a multi-client basket, the API issues one link for each child order. Each
link exposes only that child's order proposal and intended masked account.

`ZERODHA_PUBLISHER_API_KEY` is an application-level public key. It is not a
per-client API credential. A Publisher application has no API secret, so the
PMS cannot safely turn the callback into an API session or claim that it knows
the final broker order status.

The review page requires the client to acknowledge the intended masked account
before handoff, but Publisher-only mode cannot technically prevent login to a
different Zerodha account. Verified account identity also belongs to the
approved multi-user integration upgrade.

## Client access

The first version uses revocable, expiring approval links because clients are
currently data records rather than application users. A later client portal can
replace the link authentication without changing the execution state machine.
The link is a bearer credential and must be delivered only to the intended
client.

The manager can cancel a still-pending proposal before the client opens Kite,
which revokes its active link and releases its reservation. After the handoff
starts, modifications and cancellations are performed in Kite. The direct API
sync/modification/cancellation paths are deliberately blocked for these
orders, because Publisher mode does not grant broker-account API access.
Creating another link for an `AWAITING_CLIENT` proposal is an explicit action:
the UI warns the operator, and the previous link becomes invalid. Only an
unopened `AWAITING_CLIENT` link can expire and be replaced. A
`HANDOFF_STARTED` proposal remains reserved and cannot be regenerated even
after its original expiry time, because the broker may already have accepted
the order while the browser callback was lost. After checking the intended
client's Kite order book, an authorized manager or operations user may use
**Mark Not Placed** to release the reservation. That decision is audit logged;
it must never be used without the broker-side check.

## Tracking limitation and upgrade path

This version solves client-side order placement without sharing client API
credentials, but it is not a substitute for broker order-book access. The
manager UI explicitly labels a completed handoff as requiring verification in
Kite. An authorized manager or operations user can record a broker-verified
`OPEN`, `PARTIALLY_FILLED`, `FILLED`, `CANCELLED`, or `REJECTED` result,
including broker order ID, filled quantity, average price, rejection reason,
and reconciliation notes. That action uses the normal synchronization and
accounting path, updates reservations/cash/holdings where applicable, and is
audit logged. The operator must never guess these values.

Zerodha documents verified order postbacks for approved platform/public apps
where one API key serves multiple users. Automating the manual reconciliation
step therefore requires Zerodha multi-user/platform approval plus a separately
implemented, checksum-verified postback endpoint. Do not reuse the personal
direct-API connection for this.

## Market-data boundary

Client confirmation does not bypass pricing controls. A limit order uses its
validated limit price for risk reservation and therefore works when
`MARKET_DATA_PROVIDER=disabled`. A market order still requires a configured
real-time provider and fails closed when one is unavailable.

## Broker scope

The first offsite adapter is Zerodha-specific. The database execution mode is
broker-neutral so future adapters can implement an equivalent reviewed handoff.
Direct execution remains available for broker relationships that explicitly
permit server-side multi-client execution.
