CREATE TYPE "OrderExecutionMode" AS ENUM (
  'DIRECT_API',
  'CLIENT_CONFIRMATION'
);

CREATE TYPE "ClientConfirmationStatus" AS ENUM (
  'AWAITING_CLIENT',
  'HANDOFF_STARTED',
  'CONFIRMED',
  'DECLINED',
  'EXPIRED',
  'REVOKED'
);

ALTER TYPE "AuditAction" ADD VALUE 'ORDER_CONFIRMATION_REQUESTED';
ALTER TYPE "AuditAction" ADD VALUE 'ORDER_CONFIRMATION_STARTED';
ALTER TYPE "AuditAction" ADD VALUE 'ORDER_CLIENT_CONFIRMED';
ALTER TYPE "AuditAction" ADD VALUE 'ORDER_CONFIRMATION_DECLINED';

ALTER TABLE "Order"
ADD COLUMN "executionMode" "OrderExecutionMode" NOT NULL DEFAULT 'DIRECT_API';

ALTER TABLE "BasketOrder"
ADD COLUMN "executionMode" "OrderExecutionMode" NOT NULL DEFAULT 'DIRECT_API';

CREATE TABLE "ClientOrderConfirmation" (
  "id" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "status" "ClientConfirmationStatus" NOT NULL DEFAULT 'AWAITING_CLIENT',
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "handoffStartedAt" TIMESTAMP(3),
  "confirmedAt" TIMESTAMP(3),
  "lastError" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ClientOrderConfirmation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ClientOrderConfirmation_orderId_key"
ON "ClientOrderConfirmation"("orderId");

CREATE UNIQUE INDEX "ClientOrderConfirmation_tokenHash_key"
ON "ClientOrderConfirmation"("tokenHash");

CREATE INDEX "ClientOrderConfirmation_status_expiresAt_idx"
ON "ClientOrderConfirmation"("status", "expiresAt");

ALTER TABLE "ClientOrderConfirmation"
ADD CONSTRAINT "ClientOrderConfirmation_orderId_fkey"
FOREIGN KEY ("orderId")
REFERENCES "Order"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
