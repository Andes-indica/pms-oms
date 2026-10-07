ALTER TABLE "AuditLog"
ADD COLUMN "actorUserId" TEXT;

UPDATE "AuditLog" AS audit
SET "actorUserId" =
  audit."metadata"->>'actorUserId'
WHERE
  audit."metadata" IS NOT NULL
  AND audit."metadata" ? 'actorUserId'
  AND EXISTS (
    SELECT 1
    FROM "User" AS users
    WHERE users."id" =
      audit."metadata"->>'actorUserId'
  );

CREATE INDEX "AuditLog_actorUserId_idx"
ON "AuditLog"("actorUserId");

ALTER TABLE "AuditLog"
ADD CONSTRAINT "AuditLog_actorUserId_fkey"
FOREIGN KEY ("actorUserId")
REFERENCES "User"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
