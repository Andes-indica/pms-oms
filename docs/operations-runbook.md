# Operations Runbook

This runbook covers the PostgreSQL execution queue, broker-session alerts,
client closure, administrator recovery, and the minimum production checks.

## Execution queue

The worker claims one due job with `FOR UPDATE SKIP LOCKED`, assigns a unique
lease token, and refreshes the lease while broker execution is active. Only the
lease owner can complete or reschedule that job. A separate maintenance cycle
reclaims expired leases, and terminal jobs are deleted after their configured
retention period.

The worker drains a bounded batch when work exists. When the queue is empty it
backs off from `ORDER_EXECUTION_WORKER_INTERVAL_MS` to
`ORDER_EXECUTION_WORKER_MAX_INTERVAL_MS`, reducing idle database polling.
Retryable errors use exponential backoff with jitter and stop after five
attempts. Definitive broker rejections are not retried.

Recommended starting values are recorded in `.env.production.example`. Keep
the lock timeout comfortably above the longest expected broker request and
above `BROKER_HTTP_TIMEOUT_MS`.

## Operations screen

Administrators and Operations users can open **Operations**. The screen
refreshes every 15 seconds and reports:

- pending, processing, completed, and failed execution jobs
- age of the oldest pending job
- processing jobs whose lease is stale
- worker and maintenance heartbeat/errors
- submitted orders with no broker order ID after five minutes
- expired and soon-to-expire broker sessions
- the ten most recent execution failures and their exact reasons

Investigate immediately when a lease is stale, a submission is uncertain, the
worker is stopped unexpectedly, or the oldest pending age continues to rise.
Do not manually re-submit an uncertain order. Check the broker order book and
use the existing reconciliation/recovery flow.

## Client and portfolio closure

Use archive for any entity that has business history. Archival is refused while
positive holdings, active orders, or positive broker cash allocations remain.
Archiving a client also archives its portfolios and broker accounts, removes
stored broker credentials and sessions, and preserves all orders, fills,
holdings history, cash history, and audit records.

Restoring a client does not silently reconnect trading. Restore the required
portfolios, then add the same broker account again to reactivate its archived
record and complete broker authentication again.

Permanent deletion is deliberately limited:

- a portfolio must have no holdings, orders, cash transactions, or allocations
- a client must have no portfolios or broker accounts

All archive, restore, and permanent-delete actions are administrator-only and
audited. A service-level row lock prevents a new order from being created while
a client, portfolio, or broker account is being archived.

## Zero-administrator recovery

Use terminal recovery only when a firm has no active administrator. The target
must already be an active password-enabled user. The command refuses to run if
an active administrator exists, increments the target's session version, and
writes an audit event.

```bash
export RECOVERY_ADMIN_EMAIL="operator@example.com"
export RECOVERY_CONFIRM="RECOVER_ADMIN"

docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  run --rm \
  -e RECOVERY_ADMIN_EMAIL \
  -e RECOVERY_CONFIRM \
  migrate bun prisma/recover-admin.ts

unset RECOVERY_ADMIN_EMAIL RECOVERY_CONFIRM
```

After recovery, sign in with the existing password and review the
`ADMIN_RECOVERED` audit event. The user's previous access tokens are invalid.

## Backup and release checks

Before every migration or release:

1. verify the managed PostgreSQL backup/PITR status
2. take a pre-release snapshot when supported
3. record the deployed Git commit
4. apply committed migrations with `prisma migrate deploy`
5. require `/health/db` and `/ready` to pass
6. open **Operations** and confirm no stale lease or growing pending queue
7. perform a read-only broker reconciliation

Run a restore drill before onboarding real clients and repeat it after material
schema or database-provider changes. Never test a restore by overwriting the
production database.
