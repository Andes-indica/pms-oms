ALTER TYPE "AuditAction" ADD VALUE 'ADMIN_RECOVERED';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_ARCHIVED';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_RESTORED';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_DELETED';
ALTER TYPE "AuditAction" ADD VALUE 'PORTFOLIO_ARCHIVED';
ALTER TYPE "AuditAction" ADD VALUE 'PORTFOLIO_RESTORED';
ALTER TYPE "AuditAction" ADD VALUE 'PORTFOLIO_DELETED';

ALTER TABLE "Client"
ADD COLUMN "archivedAt" TIMESTAMP(3);

ALTER TABLE "Portfolio"
ADD COLUMN "archivedAt" TIMESTAMP(3);

ALTER TABLE "ExecutionJob"
ADD COLUMN "leaseToken" TEXT;

CREATE INDEX "Client_firmId_archivedAt_idx"
ON "Client"("firmId", "archivedAt");

CREATE INDEX "Portfolio_clientId_archivedAt_idx"
ON "Portfolio"("clientId", "archivedAt");

CREATE INDEX "ExecutionJob_status_lockedAt_idx"
ON "ExecutionJob"("status", "lockedAt");

CREATE INDEX "ExecutionJob_status_updatedAt_idx"
ON "ExecutionJob"("status", "updatedAt");
