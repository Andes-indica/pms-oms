-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'PARTIALLY_FILLED';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "averageFillPrice" DECIMAL(18,4),
ADD COLUMN     "filledAt" TIMESTAMP(3),
ADD COLUMN     "filledQuantity" INTEGER NOT NULL DEFAULT 0;
