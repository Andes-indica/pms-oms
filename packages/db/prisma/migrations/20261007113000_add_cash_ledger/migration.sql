CREATE TYPE "CashTransactionType" AS ENUM (
  'DEPOSIT',
  'WITHDRAWAL',
  'ADJUSTMENT',
  'BUY_FILL',
  'SELL_FILL',
  'BROKER_RECONCILIATION'
);

CREATE TABLE "CashTransaction" (
  "id" TEXT NOT NULL,
  "portfolioId" TEXT NOT NULL,
  "type" "CashTransactionType" NOT NULL,
  "amount" DECIMAL(18,4) NOT NULL,
  "balanceAfter" DECIMAL(18,4) NOT NULL,
  "referenceType" TEXT,
  "referenceId" TEXT,
  "note" TEXT,
  "actorUserId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CashTransaction_pkey"
    PRIMARY KEY ("id")
);

CREATE INDEX "CashTransaction_portfolioId_createdAt_idx"
ON "CashTransaction"("portfolioId", "createdAt");

CREATE INDEX "CashTransaction_referenceType_referenceId_idx"
ON "CashTransaction"("referenceType", "referenceId");

ALTER TABLE "CashTransaction"
ADD CONSTRAINT "CashTransaction_portfolioId_fkey"
FOREIGN KEY ("portfolioId")
REFERENCES "Portfolio"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
