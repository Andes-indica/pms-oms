/*
  Warnings:

  - A unique constraint covering the columns `[portfolioId,brokerAccountId,symbol,exchange]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Holding_portfolioId_symbol_exchange_key";

-- AlterTable
ALTER TABLE "Holding" ADD COLUMN     "brokerAccountId" TEXT;

-- CreateIndex
CREATE INDEX "Holding_brokerAccountId_idx" ON "Holding"("brokerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_portfolioId_brokerAccountId_symbol_exchange_key" ON "Holding"("portfolioId", "brokerAccountId", "symbol", "exchange");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_brokerAccountId_fkey" FOREIGN KEY ("brokerAccountId") REFERENCES "BrokerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
