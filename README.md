# PMS-OMS

A multi-client **Portfolio Management System / Order Management System** for managing clients, portfolios, broker accounts, risk, allocations, and real broker execution through a unified application.

The project uses a broker-neutral OMS core: application services work through a generic broker adapter and optional broker capabilities instead of depending directly on Zerodha-specific APIs.

## Current Status

The system currently includes:

- Bun + TypeScript monorepo
- Express API
- React + Tailwind frontend
- PostgreSQL + Prisma 7
- Authentication and RBAC
- Multi-firm tenant scoping
- Client, portfolio, and broker-account views
- Individual order creation and execution
- Multi-client basket/master orders
- Allocation strategies
- Pre-trade validation and risk checks
- Cash and quantity reservations
- Order modification and cancellation
- Partial-fill and fill reconciliation
- Holdings and cash accounting
- Realized and unrealized P&L
- Audit logging
- Portfolio-manager dashboard
- Generic broker adapter architecture
- Mock broker
- Zerodha Kite integration
- Encrypted broker credentials and sessions
- Zerodha order recovery using deterministic client-order tags
- Broker holdings, positions, and funds snapshot capabilities
- Broker-to-PMS holdings reconciliation and controlled repair/import
- Persistent broker execution/fill records
- Automatic broker order monitoring
- Durable PostgreSQL-backed execution queue and worker
- Worker crash recovery with stale-lease reclamation

The major remaining architecture work is **real-time WebSocket updates, instrument master data, richer order lifecycle states, audit actor attribution, real market data, and production deployment**.

## Tech Stack

### Backend

- Bun
- TypeScript
- Express
- Prisma 7
- PostgreSQL

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Vite

### Broker Integration

- Generic broker adapter package
- Mock broker
- Zerodha Kite Connect

### Infrastructure

- Docker
- Docker Compose

## Project Structure

```text
pms-oms/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── brokers/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       ├── routes/
│   │       ├── security/
│   │       ├── services/
│   │       ├── app.ts
│   │       └── server.ts
│   │
│   └── web/
│       └── src/
│           ├── components/
│           ├── lib/
│           └── pages/
│
├── packages/
│   ├── broker/
│   │   └── src/
│   │       ├── providers/
│   │       ├── broker.interface.ts
│   │       ├── broker-capabilities.ts
│   │       └── broker-error.ts
│   │
│   └── db/
│       ├── prisma/
│       └── src/
│
├── docs/
│   └── system-architecture/
├── scripts/
├── docker-compose.yml
├── package.json
└── bun.lock
```

## Domain Model

The current application is centered around:

```text
Firm
 ├── Users
 ├── Audit Logs
 └── Clients
      ├── Broker Accounts
      │    ├── Broker Connection
      │    └── Orders
      │
      └── Portfolios
           ├── Holdings
           ├── Orders
           └── Risk Limits

Firm
 └── Basket Orders
      └── Client Orders
```

Supporting domain concepts include restricted securities, allocation methods, order reservations, broker sessions, realized P&L, and broker execution metadata.

## Authentication and Roles

All protected API routes use bearer-token authentication.

Available roles:

```text
ADMIN
PORTFOLIO_MANAGER
OPERATIONS
VIEWER
```

Examples of role separation:

- **ADMIN**: user administration and all management operations
- **PORTFOLIO_MANAGER**: create/execute/modify orders, baskets, and manage broker connections
- **OPERATIONS**: synchronize/cancel orders and inspect audit/broker operational state
- **VIEWER**: read-only access where allowed

Requests are scoped to the authenticated user's firm.

## Broker Architecture

The OMS core does not depend directly on Zerodha.

```text
OMS Services
    ↓
resolveBroker()
    ↓
BrokerAdapter
    ├── MockBroker
    └── ZerodhaBroker
```

The base adapter covers the order lifecycle:

```text
placeOrder
getOrderStatus
modifyOrder
cancelOrder
```

Additional functionality is modeled as optional capabilities:

```text
BrokerOrderRecoveryCapability
BrokerHoldingsCapability
BrokerPositionsCapability
BrokerFundsCapability
```

This allows future brokers to implement only the capabilities they support without changing the OMS core.

## Zerodha Integration

The current Zerodha integration supports:

- API credential configuration
- Encrypted credential storage
- Zerodha login URL generation
- Request-token to access-token session exchange
- Session-expiry tracking
- Broker-account identity verification
- Place MARKET and LIMIT orders
- Modify open orders
- Cancel orders
- Fetch broker order status
- Partial/full fill handling
- Recover uncertain submissions using deterministic order tags
- Normalize broker errors into generic OMS errors
- Fetch holdings
- Fetch positions
- Fetch equity funds/margins

Market data is intentionally separate from the broker adapter.

## Order Flow

### Individual Order

```text
Create order
    ↓
Validate firm / portfolio / broker account
    ↓
Create PENDING order
    ↓
Enqueue durable execution job
    ↓
Execution worker claims job
    ↓
Pre-trade checks
    ↓
Risk checks and reservations
    ↓
Resolve broker
    ↓
Submit order
    ↓
Store broker order ID
    ↓
Synchronize broker status
    ↓
Apply incremental fills
    ↓
Update holdings / cash / P&L
    ↓
Audit log
```

### Failure Safety

The execution path distinguishes between:

- **Definitive broker rejection** — safe to mark the PMS order rejected and release reservations
- **Uncertain submission/transport failure** — do not blindly retry; attempt recovery through the broker using the client order ID/tag

This prevents duplicate real-money orders after ambiguous network failures.

## Order States

Current order states are:

```text
PENDING
SUBMITTED
OPEN
PARTIALLY_FILLED
FILLED
CANCELLED
REJECTED
```

The original architecture also defines richer pre-submission and cancellation states such as `DRAFT`, `VALIDATING`, `APPROVED`, `QUEUED`, and `CANCEL_PENDING`. Those are not yet represented in the current database state machine.

## Order Operations

The current OMS supports:

- Create
- Execute
- Synchronize
- Modify quantity
- Modify limit price
- Cancel
- Partial fills
- Full fills
- Broker rejection
- Safe uncertain-submission recovery

## Multi-Client Basket Orders

A `BasketOrder` currently acts as the master-order abstraction.

Supported allocation methods:

```text
FIXED_QUANTITY
EQUAL_QUANTITY
PERCENTAGE
```

A basket creates separate child orders for each target portfolio and broker account.

Basket functionality includes:

- Create
- Allocate
- Execute child orders
- Track partial submission
- Synchronize child orders
- Derive aggregate basket status
- Audit basket operations

## Risk Engine

Pre-trade risk checks currently include:

- Portfolio / broker ownership validation
- Positive quantity validation
- SELL holdings validation
- Available cash validation
- Active cash reservations
- Active quantity reservations
- Restricted-security checks
- Maximum order quantity
- Maximum order value
- Maximum position quantity
- Maximum position value

Risk calculations use the application's market-data service for estimated prices.

> The current market-data service is still a development implementation with hardcoded prices. Replacing it with a real independent market-data provider remains pending.

## Accounting and Portfolio State

Order synchronization updates PMS accounting incrementally.

For fills the system currently handles:

- Weighted holding average price for buys
- Holding quantity changes
- Cash debits and credits
- Realized P&L on sells
- Reserved cash release
- Reserved quantity release
- Portfolio valuation
- Unrealized P&L calculation

The schema stores cumulative fill information on the order and also persists individual broker executions with broker execution IDs, quantities, prices, and execution timestamps. Execution upserts are idempotent per order and broker execution ID.

## Broker Snapshot

Connected brokers can expose a read-only snapshot through optional capabilities.

The current Zerodha snapshot includes:

- Holdings
- Net positions
- Available cash
- Net available funds
- Used margin

The snapshot is read-only by default. The API also supports explicit broker-to-PMS holdings reconciliation, controlled repair, and initial broker-holdings import into a selected PMS portfolio.

## Dashboard and Frontend

The React application currently contains:

- Login
- Portfolio-manager dashboard
- Client list
- Client detail/overview
- Portfolio summaries
- Broker-account management
- Zerodha connection flow
- Broker snapshot view
- Individual order placement
- Order blotter
- Execute / Sync / Cancel / Modify order actions
- Basket orders
- User administration

Dashboard metrics include:

- Total AUM
- Cash
- Market value
- Unrealized P&L
- Realized P&L
- Client count
- Portfolio count
- Active orders
- Filled orders
- Client breakdown
- Top holdings

## Audit Logging

Audit logs currently record order and basket actions, including:

```text
ORDER_CREATED
ORDER_SUBMITTED
ORDER_MODIFIED
ORDER_FILLED
ORDER_CANCELLED
ORDER_REJECTED
ORDER_SYNCED

BASKET_CREATED
BASKET_SUBMITTED
BASKET_CANCELLED
```

Audit records are firm-scoped and can include structured metadata.

The original architecture includes explicit actor/user attribution on audit records; that is still pending.

## API Overview

All routes below are under `/api` unless otherwise noted.

### Authentication

```http
POST /api/auth/login
```

### Clients

```http
GET /api/clients
GET /api/clients/:id
GET /api/clients/:id/overview
GET /api/clients/:id/portfolio-summary
```

### Portfolios

```http
GET /api/portfolios/:id/valuation
```

### Orders

```http
GET   /api/orders
POST  /api/orders
PATCH /api/orders/:id

POST /api/orders/:id/execute
POST /api/orders/:id/sync
POST /api/orders/:id/cancel
```

### Basket Orders

```http
GET  /api/basket-orders
POST /api/basket-orders

POST /api/basket-orders/:id/execute
POST /api/basket-orders/:id/sync
```

### Broker Accounts

```http
POST /api/clients/:clientId/broker-accounts
GET  /api/broker-accounts/:id/snapshot
```

### Broker Connections

```http
GET  /api/broker-connections/:brokerAccountId

PUT  /api/broker-connections/:brokerAccountId/zerodha/configure
GET  /api/broker-connections/:brokerAccountId/zerodha/login-url
POST /api/broker-connections/:brokerAccountId/zerodha/session
```

### Dashboard

```http
GET /api/dashboard
```

### Audit Logs

```http
GET /api/audit-logs
```

### Users

```http
GET   /api/users
POST  /api/users
PATCH /api/users/:id/role
```

### Health

```http
GET /health
GET /health/db
```

## Local Development

### Prerequisites

Install:

- Bun
- Docker
- Docker Compose

### Install dependencies

From the repository root:

```bash
bun install
```

### Start PostgreSQL

```bash
docker compose up -d
```

Check it:

```bash
docker compose ps
```

### Database setup

```bash
cd packages/db

bunx prisma validate
bunx prisma migrate dev
bunx prisma generate
bun run seed
```

Return to the repository root afterward.

### Run the project

Run all workspace development processes:

```bash
bun run dev
```

Or run only the API:

```bash
bun run dev:api
```

The API defaults to:

```text
http://localhost:3000
```

The Vite frontend normally runs on:

```text
http://localhost:5173
```

## Validation

Run the repository checks from the root:

```bash
bun run typecheck
bun test
```

## Development Roadmap

### Implemented

- [x] Bun + TypeScript monorepo
- [x] Express API
- [x] PostgreSQL + Prisma
- [x] React frontend
- [x] Authentication
- [x] RBAC
- [x] Firm/tenant scoping
- [x] Client and portfolio data model
- [x] Broker accounts
- [x] Holdings
- [x] Order creation and listing
- [x] Broker abstraction
- [x] Mock broker
- [x] Zerodha integration
- [x] Encrypted broker credentials/session handling
- [x] Pre-trade validation
- [x] Risk engine
- [x] Cash/quantity reservations
- [x] Order execution
- [x] Order modification
- [x] Order cancellation
- [x] Partial-fill reconciliation
- [x] Failure recovery for uncertain submissions
- [x] Multi-client basket allocation
- [x] Basket execution and synchronization
- [x] Portfolio accounting and valuation
- [x] Realized/unrealized P&L
- [x] Audit logging
- [x] Portfolio-manager dashboard
- [x] Broker holdings/positions/funds snapshot
- [x] Broker-to-PMS reconciliation diff and controlled repair
- [x] Broker-aware holdings attribution
- [x] Persistent individual broker executions/fills
- [x] Durable execution queue / worker
- [x] Automatic broker status monitoring
- [x] Worker crash recovery / stale-job reclamation

### Remaining from the original architecture

- [ ] Add WebSocket live updates to the frontend
- [ ] Expand the order state machine with pre-submission and cancel-pending states
- [ ] Persist explicit allocation records if the original database design is retained
- [ ] Add instrument master / canonical instrument validation
- [ ] Add audit actor/user attribution
- [ ] Replace mock market-data service with a real provider
- [ ] Production deployment and fixed outbound IP for real broker traffic

## Architecture Documentation

The original system diagrams are under:

```text
docs/system-architecture/
```

They cover:

- Overall system
- Order flow
- Order lifecycle
- Multi-client allocation
- Broker update flow
- Failure recovery
- Database design

These documents remain the target architecture. The README describes the current implementation and explicitly calls out the remaining gaps.

## Safety Note

This system can submit orders to real broker accounts.

Real-broker execution should only be used with:

- correct broker credentials
- valid session state
- tested risk controls
- secure production secrets
- broker-required network/IP configuration
- deliberate operational monitoring

## Status

The project is under active development. Core PMS/OMS functionality, Zerodha execution, reconciliation, persistent fills, automatic monitoring, and durable queued execution are operational; the next development phase focuses on event-driven updates, instrument master data, richer lifecycle state, real market data, and production hardening.