# Production Deployment

The repository ships production images for the API and web application, a
one-shot migration image, and a Caddy-based HTTPS deployment topology.

## 1. Supported initial topology

Run exactly one API container for the first production deployment. That
process owns:

- the HTTP API
- the durable execution worker
- the Zerodha order monitor
- authenticated server-sent events

The execution queue supports competing workers, but live events are currently
process-local and the monitor does not use distributed leader election. Do not
scale the API horizontally until shared pub/sub and monitor leadership exist.

Required infrastructure:

- Linux host with Docker Engine and Docker Compose
- fixed outbound IPv4 address for Zerodha allowlisting
- PostgreSQL 17-compatible managed database
- real HTTP market-data provider
- complete instrument master JSON file
- `app` and `api` DNS names pointing to the host
- inbound TCP ports 80 and 443
- inbound TCP port 22 restricted to administrator IPs

PostgreSQL and API port 3000 must not be publicly exposed.

## 2. Prepare production configuration

Create the ignored production environment file:

```bash
cp .env.production.example .env.production
chmod 600 .env.production
```

Generate independent secrets:

```bash
openssl rand -hex 32
openssl rand -base64 32
```

Use the hexadecimal value for `JWT_SECRET` and the base64 value for
`BROKER_CREDENTIAL_ENCRYPTION_KEY`.

Set these deployment values:

```env
APP_DOMAIN=app.example.com
API_DOMAIN=api.example.com
TLS_EMAIL=operations@example.com
VITE_API_URL=https://api.example.com
CORS_ORIGINS=https://app.example.com
```

CORS origins must be exact HTTPS origins without paths or trailing slashes.

Set the managed database connection and pool limits:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/pms_oms?sslmode=require
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT_MS=5000
DATABASE_IDLE_TIMEOUT_MS=30000
```

Keep the total pool capacity below the database plan's connection limit. With
one API replica and one migration process, a pool maximum of 10 is a safe
starting point for a small deployment.

## 3. Configure real market data

Production startup rejects the mock provider. Configure:

```env
MARKET_DATA_PROVIDER=http
MARKET_DATA_BASE_URL=https://quotes.example.com
MARKET_DATA_API_TOKEN=replace-with-provider-token
MARKET_DATA_REQUEST_TIMEOUT_MS=5000
```

The provider contract is:

```http
GET /quote?symbol=INFY&exchange=NSE
Authorization: Bearer <MARKET_DATA_API_TOKEN>
```

Successful response:

```json
{
  "price": 1625.5
}
```

The provider must return a positive finite price. Timeouts, non-success
responses, malformed JSON, and invalid prices fail the relevant valuation or
pre-trade operation instead of falling back to mock data.

## 4. Configure the instrument master

`config/instruments.example.json` documents the accepted format but is not a
complete production universe. Create `config/instruments.json` from the
instruments that the firm is allowed to trade:

```json
[
  {
    "symbol": "INFY",
    "exchange": "NSE",
    "instrumentToken": "408065",
    "name": "Infosys"
  }
]
```

Production uses:

```env
INSTRUMENT_MASTER_FILE=./config/instruments.json
INSTRUMENT_MASTER_PATH=/run/config/instruments.json
INSTRUMENT_MASTER_STRICT=true
```

Startup fails when both the database and configured instrument source are
empty. Unknown instruments are rejected when strict mode is enabled.

## 5. Configure DNS, HTTPS, and Zerodha

Attach a static IPv4 address to the host, then create DNS records:

```text
app.example.com -> STATIC_IP
api.example.com -> STATIC_IP
```

The production Compose file runs Caddy on ports 80 and 443. Caddy obtains and
renews TLS certificates after both DNS records resolve to the server.

Configure the exact Zerodha redirect URL:

```text
https://app.example.com/broker/zerodha/callback
```

Register the server's static outbound IPv4 with Zerodha before placing,
modifying, or cancelling real orders.

## 6. Build and migrate

Validate Compose interpolation:

```bash
docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  config --quiet
```

Build the images:

```bash
docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  build
```

Apply committed migrations before starting the API:

```bash
docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  run --rm migrate
```

Never run `prisma migrate dev` or the demo seed against production.

## 7. Create the first administrator

The demo seed is blocked under `NODE_ENV=production`. On a fresh database,
create exactly one firm and administrator with the one-time bootstrap command:

```bash
export BOOTSTRAP_FIRM_NAME="Example PMS"
export BOOTSTRAP_ADMIN_NAME="Production Administrator"
export BOOTSTRAP_ADMIN_EMAIL="admin@example.com"
read -s BOOTSTRAP_ADMIN_PASSWORD
export BOOTSTRAP_ADMIN_PASSWORD

docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  run --rm \
  -e BOOTSTRAP_FIRM_NAME \
  -e BOOTSTRAP_ADMIN_NAME \
  -e BOOTSTRAP_ADMIN_EMAIL \
  -e BOOTSTRAP_ADMIN_PASSWORD \
  migrate bun prisma/bootstrap-admin.ts

unset BOOTSTRAP_ADMIN_PASSWORD
```

The password must contain 12 to 128 characters. The command refuses to run if
any user already exists; it never overwrites an existing administrator.

## 8. Start and verify

Start the application:

```bash
docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  up -d api web proxy
```

Inspect status and logs:

```bash
docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  ps

docker compose \
  --env-file .env.production \
  -f docker-compose.production.yml \
  logs --tail=200 api proxy
```

Health endpoints:

```http
GET /health
GET /health/db
GET /ready
```

`/health` is process liveness. `/health/db` checks PostgreSQL. `/ready` checks
PostgreSQL and confirms that at least one active/configured instrument exists.
The API container health check uses `/ready`.

## 9. Controlled broker verification

After login:

1. configure one Zerodha broker account
2. complete the Zerodha login callback
3. confirm the authenticated Zerodha account ID matches the configured account
4. import/reconcile broker holdings and cash
5. place one low-value limit order during an appropriate market session
6. verify broker order ID, status monitoring, fills, holdings, cash, audit log,
   and UI live update
7. cancel or close the controlled order as appropriate
8. test one deliberate rejection and confirm its broker explanation is visible

Zerodha access tokens expire at 6 AM on the following day. Operations must
reconnect affected accounts before further broker activity.

## 10. Rollout and rollback

Use this order for every release:

1. take/verify a database backup or snapshot
2. build immutable images from a tested commit
3. run `prisma migrate deploy`
4. start the new API and wait for `/ready`
5. start/update the web image
6. perform an authenticated read-only smoke test
7. perform a controlled broker test when the release changes broker execution

Rollback application containers to the previous image tag when necessary. Do
not reverse database migrations manually. Forward-fix schema changes unless a
tested restore procedure explicitly requires restoring the pre-deployment
snapshot.

The API stops accepting new requests on SIGTERM, closes live streams, waits for
the active execution and monitor cycles, disconnects PostgreSQL, and force-exits
after `SHUTDOWN_TIMEOUT_MS` if shutdown cannot complete.

## 11. Secrets and backups

Never commit or bake these values into images:

- database credentials
- JWT secret
- broker credential encryption key
- Zerodha API secret or access token
- market-data API token
- bootstrap administrator password

Keep the broker encryption key stable and store a recoverable copy in a secrets
manager. Losing it makes existing encrypted broker credentials unreadable.

Enable database encryption, automated backups, point-in-time recovery, and
manual pre-release snapshots. Perform a restore drill before onboarding real
clients.

## 12. Release gate

Do not deploy a commit until all of the following pass:

- unit tests
- PostgreSQL integration tests
- TypeScript checks
- API build
- web build
- API Docker build and `/ready` smoke test
- web Docker build and `/health` smoke test
- review confirming no `.env` files or secrets are staged
