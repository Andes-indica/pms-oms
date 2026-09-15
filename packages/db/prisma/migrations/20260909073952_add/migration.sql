/*
  Warnings:

  - You are about to drop the column `realizedpnl` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "realizedpnl",
ADD COLUMN     "realizedPnl" DECIMAL(18,4);
