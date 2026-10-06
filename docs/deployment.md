# Production Deployment

The repository ships separate production images for the API and web frontend.

## 1. Required infrastructure

You need:

- PostgreSQL 17-compatible database
- one API runtime
- one static web runtime
- HTTPS termination
- persistent outbound IP/NAT for broker traffic when the broker requires IP allowlisting

For Zerodha or any other broker that requires an allowlisted source IP, deploy the API/worker behind a fixed egress IP. The frontend does not need that egress path.

## 2. Required API environment

At minimum:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=<at-least-32-random-characters>
BROKER_CREDENTIAL_ENCRYPTION_KEY=<base64-encoded-32-byte-key>
CORS_ORIGINS=https://app.example.com

ORDER_MONITOR_ENABLED=true
ORDER_MONITOR_INTERVAL_MS=10000

ORDER_EXECUTION_WORKER_ENABLED=true
ORDER_EXECUTION_WORKER_INTERVAL_MS=1000
ORDER_EXECUTION_LOCK_TIMEOUT_MS=60000

MARKET_DATA_PROVIDER=http
MARKET_DATA_BASE_URL=https://quotes.example.com
MARKET_DATA_API_TOKEN=<provider-token>

INSTRUMENT_MASTER_PATH=/run/config/instruments.json
INSTRUMENT_MASTER_STRICT=true
```

Generate a broker encryption key with:

```bash
openssl rand -base64 32
```

Production startup rejects placeholder/short JWT secrets, invalid broker encryption keys, and missing CORS origins.

## 3. Apply database migrations

Build the one-shot migration target:

```bash
docker build \
  -f Dockerfile.api \
  --target migrate \
  -t pms-oms-migrate .
```

Run it before rolling out the API:

```bash
docker run --rm \
  -e DATABASE_URL="$DATABASE_URL" \
  pms-oms-migrate
```

The migration target exits after `prisma migrate deploy`.

## 4. Build and run the API

```bash
docker build \
  -f Dockerfile.api \
  -t pms-oms-api .
```

Example:

```bash
docker run --rm \
  -p 3000:3000 \
  --env-file .env.production \
  pms-oms-api
```

Health endpoints:

```http
GET /health
GET /health/db
```

The image health check uses `/health/db`, so an API instance is not considered healthy while PostgreSQL is unavailable.

## 5. Build and run the web frontend

The API URL is a build-time Vite setting and is required by the production image:

```bash
docker build \
  -f Dockerfile.web \
  --build-arg VITE_API_URL=https://api.example.com \
  -t pms-oms-web .
```

Run:

```bash
docker run --rm \
  -p 8080:80 \
  pms-oms-web
```

The nginx image supports SPA fallback and exposes `GET /health`.

## 6. Broker-worker topology

The current API process can run both:

- execution worker
- broker order monitor

For a single API instance, leave both enabled.

If you later split API and background workers into separate deployments, use the environment toggles:

```env
ORDER_EXECUTION_WORKER_ENABLED=false
ORDER_MONITOR_ENABLED=false
```

The execution queue uses PostgreSQL `FOR UPDATE SKIP LOCKED`, so multiple worker-capable instances can safely compete for jobs without claiming the same job.

## 7. Rollout order

Use this order:

1. deploy PostgreSQL changes with the migration target
2. deploy API/worker instances
3. verify `/health/db`
4. deploy the web image
5. verify broker connectivity and outbound IP
6. place a controlled low-risk broker test order
7. verify submission, monitoring, execution persistence, holdings/cash accounting, and live UI update

## 8. Secrets

Never bake these into either image:

- database credentials
- JWT secret
- broker credential encryption key
- Zerodha API secret/access token
- market-data API token

Keep the broker encryption key stable across deployments. Rotating or losing it makes already-encrypted broker credentials unreadable unless a separate key-rotation migration is performed.
