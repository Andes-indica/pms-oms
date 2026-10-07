CREATE TABLE "Allocation" (
  "id" TEXT NOT NULL,
  "basketOrderId" TEXT NOT NULL,
  "portfolioId" TEXT NOT NULL,
  "brokerAccountId" TEXT NOT NULL,
  "allocatedQuantity" INTEGER NOT NULL,
  "targetPercentage" DECIMAL(8,4),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Allocation_pkey"
    PRIMARY KEY ("id")
);

ALTER TABLE "Order"
ADD COLUMN "allocationId" TEXT;

INSERT INTO "Allocation" (
  "id",
  "basketOrderId",
  "portfolioId",
  "brokerAccountId",
  "allocatedQuantity",
  "targetPercentage",
  "createdAt"
)
SELECT
  'alloc_' || md5("id"),
  "basketOrderId",
  "portfolioId",
  "brokerAccountId",
  "quantity",
  NULL,
  "createdAt"
FROM "Order"
WHERE "basketOrderId" IS NOT NULL;

UPDATE "Order"
SET "allocationId" =
  'alloc_' || md5("id")
WHERE "basketOrderId" IS NOT NULL;

CREATE UNIQUE INDEX "Order_allocationId_key"
ON "Order"("allocationId");

CREATE INDEX "Allocation_basketOrderId_idx"
ON "Allocation"("basketOrderId");

CREATE INDEX "Allocation_portfolioId_idx"
ON "Allocation"("portfolioId");

CREATE INDEX "Allocation_brokerAccountId_idx"
ON "Allocation"("brokerAccountId");

ALTER TABLE "Allocation"
ADD CONSTRAINT "Allocation_basketOrderId_fkey"
FOREIGN KEY ("basketOrderId")
REFERENCES "BasketOrder"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "Allocation"
ADD CONSTRAINT "Allocation_portfolioId_fkey"
FOREIGN KEY ("portfolioId")
REFERENCES "Portfolio"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "Allocation"
ADD CONSTRAINT "Allocation_brokerAccountId_fkey"
FOREIGN KEY ("brokerAccountId")
REFERENCES "BrokerAccount"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "Order"
ADD CONSTRAINT "Order_allocationId_fkey"
FOREIGN KEY ("allocationId")
REFERENCES "Allocation"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
