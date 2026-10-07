CREATE TABLE "PortfolioBrokerCash" (
  "id" TEXT NOT NULL,
  "portfolioId" TEXT NOT NULL,
  "brokerAccountId" TEXT NOT NULL,
  "cashBalance" DECIMAL(18,4) NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PortfolioBrokerCash_pkey"
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PortfolioBrokerCash_portfolioId_brokerAccountId_key"
ON "PortfolioBrokerCash"("portfolioId", "brokerAccountId");

CREATE INDEX "PortfolioBrokerCash_brokerAccountId_idx"
ON "PortfolioBrokerCash"("brokerAccountId");

ALTER TABLE "PortfolioBrokerCash"
ADD CONSTRAINT "PortfolioBrokerCash_portfolioId_fkey"
FOREIGN KEY ("portfolioId")
REFERENCES "Portfolio"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "PortfolioBrokerCash"
ADD CONSTRAINT "PortfolioBrokerCash_brokerAccountId_fkey"
FOREIGN KEY ("brokerAccountId")
REFERENCES "BrokerAccount"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
