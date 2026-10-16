ALTER TABLE "ClientOrderConfirmation"
ADD COLUMN "reconciledAt" TIMESTAMP(3),
ADD COLUMN "reconciledByUserId" TEXT,
ADD COLUMN "reconciliationNotes" TEXT;
