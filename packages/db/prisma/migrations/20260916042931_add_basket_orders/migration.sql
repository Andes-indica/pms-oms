-- CreateEnum
CREATE TYPE "AllocationMethod" AS ENUM ('FIXED_QUANTITY', 'EQUAL_QUANTITY', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "BasketOrderStatus" AS ENUM ('PENDING', 'PARTIALLY_SUBMITTED', 'SUBMITTED', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'BASKET_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'BASKET_SUBMITTED';
ALTER TYPE "AuditAction" ADD VALUE 'BASKET_CAMCELLED';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "basketOrderId" TEXT;

-- CreateTable
CREATE TABLE "BasketOrder" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "side" "OrderSide" NOT NULL,
    "orderType" "OrderType" NOT NULL,
    "limitPrice" DECIMAL(18,4),
    "totalQuantity" INTEGER NOT NULL,
    "allocationMethod" "AllocationMethod" NOT NULL,
    "status" "BasketOrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BasketOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_basketOrderId_fkey" FOREIGN KEY ("basketOrderId") REFERENCES "BasketOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
