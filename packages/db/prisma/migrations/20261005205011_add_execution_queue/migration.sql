-- CreateEnum
CREATE TYPE "ExecutionJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ExecutionJob" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "ExecutionJobStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExecutionJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExecutionJob_orderId_key" ON "ExecutionJob"("orderId");

-- CreateIndex
CREATE INDEX "ExecutionJob_status_availableAt_idx" ON "ExecutionJob"("status", "availableAt");

-- AddForeignKey
ALTER TABLE "ExecutionJob" ADD CONSTRAINT "ExecutionJob_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
