-- DropIndex
DROP INDEX "BrokerAccount_archivedAt_idx";

-- AlterTable
ALTER TABLE "Instrument" ALTER COLUMN "updatedAt" DROP DEFAULT;
