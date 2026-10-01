/*
  Warnings:

  - The values [Broker_RECONCILED] on the enum `AuditAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuditAction_new" AS ENUM ('ORDER_CREATED', 'ORDER_SUBMITTED', 'ORDER_MODIFIED', 'ORDER_FILLED', 'ORDER_CANCELLED', 'ORDER_REJECTED', 'ORDER_SYNCED', 'BASKET_CREATED', 'BASKET_SUBMITTED', 'BASKET_CANCELLED', 'BROKER_RECONCILED');
ALTER TABLE "AuditLog" ALTER COLUMN "action" TYPE "AuditAction_new" USING ("action"::text::"AuditAction_new");
ALTER TYPE "AuditAction" RENAME TO "AuditAction_old";
ALTER TYPE "AuditAction_new" RENAME TO "AuditAction";
DROP TYPE "public"."AuditAction_old";
COMMIT;
