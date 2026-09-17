-- Preserve risk capacity for orders that were already active when reservation
-- tracking was introduced. Unknown market prices conservatively reserve the
-- portfolio's currently available cash until the next broker reconciliation.
UPDATE "Order" AS orders
SET "estimatedPrice" = COALESCE(
  orders."limitPrice",
  orders."averageFillPrice"
)
WHERE orders."status" IN ('SUBMITTED', 'OPEN', 'PARTIALLY_FILLED');

UPDATE "Order" AS orders
SET "reservedCash" = CASE
  WHEN orders."side" = 'BUY' THEN
    CASE
      WHEN orders."estimatedPrice" IS NULL THEN portfolios."cashBalance"
      ELSE
        (orders."quantity" - orders."filledQuantity") *
        orders."estimatedPrice"
    END
  ELSE 0
END,
"reservedQuantity" = CASE
  WHEN orders."side" = 'SELL' THEN
    orders."quantity" - orders."filledQuantity"
  ELSE 0
END
FROM "Portfolio" AS portfolios
WHERE portfolios."id" = orders."portfolioId"
  AND orders."status" IN ('SUBMITTED', 'OPEN', 'PARTIALLY_FILLED');
