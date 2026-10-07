ALTER TABLE "BrokerAccount"
ADD COLUMN "archivedAt" TIMESTAMP(3);

CREATE INDEX "BrokerAccount_archivedAt_idx"
ON "BrokerAccount"("archivedAt");
