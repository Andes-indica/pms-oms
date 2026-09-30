/*
  Warnings:

  - Made the column `brokerAccountId` on table `Holding` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'Broker_RECONCILED';

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_brokerAccountId_fkey";

-- AlterTable
ALTER TABLE "Holding" ALTER COLUMN "brokerAccountId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_brokerAccountId_fkey" FOREIGN KEY ("brokerAccountId") REFERENCES "BrokerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
