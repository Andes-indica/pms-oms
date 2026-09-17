-- Correct the historical audit action spelling.
ALTER TYPE "AuditAction" RENAME VALUE 'BASKET_CAMCELLED' TO 'BASKET_CANCELLED';

-- Add tenant ownership. Columns are introduced as nullable so existing rows can
-- be backfilled from their related orders before enforcing NOT NULL.
ALTER TABLE "AuditLog" ADD COLUMN "firmId" TEXT;
ALTER TABLE "BasketOrder" ADD COLUMN "firmId" TEXT;

UPDATE "BasketOrder" AS basket
SET "firmId" = owner."firmId"
FROM (
  SELECT DISTINCT ON (orders."basketOrderId")
    orders."basketOrderId",
    clients."firmId"
  FROM "Order" AS orders
  JOIN "Portfolio" AS portfolios ON portfolios."id" = orders."portfolioId"
  JOIN "Client" AS clients ON clients."id" = portfolios."clientId"
  WHERE orders."basketOrderId" IS NOT NULL
  ORDER BY orders."basketOrderId", orders."createdAt"
) AS owner
WHERE basket."id" = owner."basketOrderId";

UPDATE "AuditLog" AS audit
SET "firmId" = owner."firmId"
FROM (
  SELECT orders."id", clients."firmId"
  FROM "Order" AS orders
  JOIN "Portfolio" AS portfolios ON portfolios."id" = orders."portfolioId"
  JOIN "Client" AS clients ON clients."id" = portfolios."clientId"
) AS owner
WHERE audit."entityType" = 'ORDER'
  AND audit."entityId" = owner."id";

UPDATE "AuditLog" AS audit
SET "firmId" = baskets."firmId"
FROM "BasketOrder" AS baskets
WHERE audit."entityType" = 'BASKET_ORDER'
  AND audit."entityId" = baskets."id";

-- Legacy orphan rows can only be assigned safely in a single-firm database.
-- Abort instead of silently leaking them when multiple firms exist.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "BasketOrder" WHERE "firmId" IS NULL)
     OR EXISTS (SELECT 1 FROM "AuditLog" WHERE "firmId" IS NULL) THEN
    IF (SELECT COUNT(*) FROM "Firm") = 1 THEN
      UPDATE "BasketOrder"
      SET "firmId" = (SELECT "id" FROM "Firm" LIMIT 1)
      WHERE "firmId" IS NULL;

      UPDATE "AuditLog"
      SET "firmId" = (SELECT "id" FROM "Firm" LIMIT 1)
      WHERE "firmId" IS NULL;
    ELSE
      RAISE EXCEPTION 'Cannot infer firm ownership for legacy basket/audit rows';
    END IF;
  END IF;
END $$;

ALTER TABLE "AuditLog" ALTER COLUMN "firmId" SET NOT NULL;
ALTER TABLE "BasketOrder" ALTER COLUMN "firmId" SET NOT NULL;

CREATE INDEX "AuditLog_firmId_idx" ON "AuditLog"("firmId");
CREATE INDEX "BasketOrder_firmId_idx" ON "BasketOrder"("firmId");

ALTER TABLE "AuditLog"
ADD CONSTRAINT "AuditLog_firmId_fkey"
FOREIGN KEY ("firmId") REFERENCES "Firm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "BasketOrder"
ADD CONSTRAINT "BasketOrder_firmId_fkey"
FOREIGN KEY ("firmId") REFERENCES "Firm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Persist order reservations so concurrent submissions cannot spend the same
-- cash or holdings.
ALTER TABLE "Order"
ADD COLUMN "estimatedPrice" DECIMAL(18,4),
ADD COLUMN "reservedCash" DECIMAL(18,4) NOT NULL DEFAULT 0,
ADD COLUMN "reservedQuantity" INTEGER NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX "Order_brokerOrderId_key" ON "Order"("brokerOrderId");
