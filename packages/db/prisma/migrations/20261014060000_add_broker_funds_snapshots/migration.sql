CREATE TABLE "BrokerFundsSnapshot" (
  "id" TEXT NOT NULL,
  "brokerAccountId" TEXT NOT NULL,
  "availableCash" DECIMAL(18, 4) NOT NULL,
  "usedMargin" DECIMAL(18, 4) NOT NULL,
  "netAvailable" DECIMAL(18, 4) NOT NULL,
  "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "BrokerFundsSnapshot_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Order"
ADD COLUMN "brokerAcceptedAt" TIMESTAMP(3);

UPDATE "Order"
SET "brokerAcceptedAt" = "updatedAt"
WHERE "brokerOrderId" IS NOT NULL;

CREATE INDEX "BrokerFundsSnapshot_brokerAccountId_capturedAt_idx"
ON "BrokerFundsSnapshot"("brokerAccountId", "capturedAt");

ALTER TABLE "BrokerFundsSnapshot"
ADD CONSTRAINT "BrokerFundsSnapshot_brokerAccountId_fkey"
FOREIGN KEY ("brokerAccountId")
REFERENCES "BrokerAccount"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
