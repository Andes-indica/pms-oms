-- CreateTable
CREATE TABLE "RiskLimit" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "maxOrderQuantity" INTEGER,
    "maxOrderValue" DECIMAL(18,4),
    "maxPositionQuantity" INTEGER,
    "maxPositionValue" DECIMAL(18,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiskLimit_portfolioId_key" ON "RiskLimit"("portfolioId");

-- AddForeignKey
ALTER TABLE "RiskLimit" ADD CONSTRAINT "RiskLimit_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
