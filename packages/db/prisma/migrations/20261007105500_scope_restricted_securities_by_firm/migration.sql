ALTER TABLE "RestrictedSecurity"
ADD COLUMN "firmId" TEXT;

DROP INDEX IF EXISTS "RestrictedSecurity_symbol_exchange_key";

CREATE UNIQUE INDEX "RestrictedSecurity_firmId_symbol_exchange_key"
ON "RestrictedSecurity"("firmId", "symbol", "exchange");

CREATE INDEX "RestrictedSecurity_symbol_exchange_idx"
ON "RestrictedSecurity"("symbol", "exchange");

ALTER TABLE "RestrictedSecurity"
ADD CONSTRAINT "RestrictedSecurity_firmId_fkey"
FOREIGN KEY ("firmId")
REFERENCES "Firm"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
