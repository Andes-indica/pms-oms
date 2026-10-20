# Client-specific egress pilot (DRY RUN ONLY)

This is an isolated proof-of-concept for mapping a broker account to a
dedicated outbound execution worker/IP. It **does not** connect to Kite,
submit orders, deploy workers, change the live order queue or enable trading.

Run the unit tests (Node 22+):

```sh
node --test apps/api/src/services/client-egress-pilot.test.mjs
```

The existing `ExecutionJob` queue and `order-execution-worker.service.ts`
must remain authoritative. **Never generate a duplicate broker order to change
its apparent source IP**. If direct multi-client execution becomes authorized,
the central worker should dispatch the *original* order intent to a verified,
account-specific execution service with a trusted network egress probe,
broker-account binding, durable acknowledgement and unknown-outcome
reconciliation before retries.

A matching IP only demonstrates network routing; it does not prove an IP
is whitelisted or the arrangement is broker-approved. Do not turn on
direct third-party execution until Zerodha has explicitly approved the
multi-client operating model and required regulatory permissions exist.
