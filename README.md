# PMS-OMS

A multi-client **Portfolio Management System / Order Management System** designed to model how portfolio managers can manage clients, portfolios, broker accounts, and order execution through a unified backend.

The project is being built incrementally with a focus on clean architecture, broker abstraction, order validation, and future real-time execution workflows.

## Current Features

* Bun + TypeScript monorepo
* Express API
* PostgreSQL database
* Prisma 7 ORM
* Shared database package
* Client management
* Broker account management
* Portfolio management
* Holdings tracking
* Order creation
* Order status tracking
* Broker adapter architecture
* Mock broker integration in progress

## Tech Stack

### Backend

* Bun
* TypeScript
* Express
* Prisma 7
* PostgreSQL

### Infrastructure

* Docker
* Docker Compose

### Planned Frontend

* React
* TypeScript
* Tailwind CSS

## Project Structure

```text
pms-oms/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── controllers/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── app.ts
│   │       └── server.ts
│   │
│   └── web/
│
├── packages/
│   ├── db/
│   │   ├── prisma/
│   │   └── src/
│   │
│   ├── broker/
│   │
│   └── types/
│
├── docs/
├── infrastructure/
├── docker-compose.yml
├── package.json
└── bun.lock
```

## Current Domain Model

```text
Firm
 │
 ├── Users
 │
 └── Clients
       │
       ├── Broker Accounts
       │
       └── Portfolios
             │
             ├── Holdings
             │
             └── Orders
```

## Order Flow

The current order flow is:

```text
Create Order Request
        ↓
Validate Input
        ↓
Validate Portfolio
        ↓
Validate Broker Account
        ↓
Verify Client Ownership
        ↓
Create PENDING Order
        ↓
Broker Execution Service
        ↓
Broker Adapter
        ↓
Mock / Real Broker
```

The broker abstraction allows the OMS to support multiple brokers without coupling the application directly to a single broker API.

Future adapters may include:

```text
BrokerAdapter
├── MockBroker
├── ZerodhaAdapter
├── UpstoxAdapter
└── OtherBrokerAdapter
```

## Prerequisites

Install:

* Bun
* Docker
* Docker Compose


## Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

Check the container:

```bash
docker compose ps
```

## Install Dependencies

From the project root:

```bash
bun install
```

## Prisma Setup

Go to the database package:

```bash
cd packages/db
```

Validate the schema:

```bash
bunx prisma validate
```

Apply migrations:

```bash
bunx prisma migrate dev
```

Generate Prisma Client:

```bash
bunx prisma generate
```

Seed development data:

```bash
bun run seed
```

## Run the API

From the project root:

```bash
bun run dev:api
```

Or directly:

```bash
cd apps/api
bun run dev
```

The API runs at:

```text
http://localhost:3000
```

## Health Endpoints

API health:

```bash
curl http://127.0.0.1:3000/health
```

Database health:

```bash
curl http://127.0.0.1:3000/health/db
```

Expected database response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Current API Endpoints

### Clients

Get all clients:

```http
GET /api/clients
```

Get a client:

```http
GET /api/clients/:id
```

Client responses can include broker accounts, portfolios, and holdings.

### Orders

Create an order:

```http
POST /api/orders
```

Example request:

```json
{
  "portfolioId": "demo-portfolio-1",
  "brokerAccountId": "BROKER_ACCOUNT_ID",
  "symbol": "RELIANCE",
  "exchange": "NSE",
  "side": "BUY",
  "orderType": "MARKET",
  "quantity": 10
}
```

Get orders:

```http
GET /api/orders
```

Order execution support is being implemented through the broker adapter layer.

## Order States

Current order states include:

```text
PENDING
SUBMITTED
OPEN
FILLED
CANCELLED
REJECTED
```

## Development Roadmap

### Sprint 1

* [x] Monorepo setup
* [x] Express API
* [x] PostgreSQL
* [x] Prisma integration
* [x] Firm and user models
* [x] Client management
* [x] Broker accounts
* [x] Portfolio model
* [x] Holdings model
* [x] Order model
* [x] Order creation API
* [x] Order listing API
* [ ] Broker adapter abstraction
* [ ] Mock broker execution
* [ ] Pre-trade validation
* [ ] Order lifecycle simulation

### Upcoming

* Authentication and RBAC
* Portfolio manager dashboard
* Real-time order updates using WebSockets
* Pre-trade risk engine
* Order allocation across multiple clients
* Audit logging
* Broker reconciliation
* Zerodha integration
* Frontend dashboard
* Production deployment

## Important Note

The current broker integration is intended for development and simulation.

Real broker execution will only be added after the OMS order validation, security, authentication, audit logging, and execution safeguards are properly implemented.

## Status

The project is under active development.
