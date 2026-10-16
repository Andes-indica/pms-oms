CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'DISABLED');
CREATE TYPE "UserOnboardingTokenType" AS ENUM ('INVITATION', 'PASSWORD_RESET');

ALTER TABLE "User"
ALTER COLUMN "passwordHash" DROP NOT NULL,
ADD COLUMN "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "invitedAt" TIMESTAMP(3),
ADD COLUMN "activatedAt" TIMESTAMP(3),
ADD COLUMN "disabledAt" TIMESTAMP(3),
ADD COLUMN "passwordChangedAt" TIMESTAMP(3);

UPDATE "User"
SET "activatedAt" = "createdAt"
WHERE "activatedAt" IS NULL;

ALTER TYPE "AuditAction" ADD VALUE 'USER_INVITED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_ACTIVATED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_ROLE_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_DISABLED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_REACTIVATED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_SESSIONS_REVOKED';
ALTER TYPE "AuditAction" ADD VALUE 'USER_PASSWORD_RESET_REQUESTED';

CREATE TABLE "UserOnboardingToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "UserOnboardingTokenType" NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserOnboardingToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UserOnboardingToken_tokenHash_key"
ON "UserOnboardingToken"("tokenHash");

CREATE INDEX "UserOnboardingToken_userId_type_expiresAt_idx"
ON "UserOnboardingToken"("userId", "type", "expiresAt");

ALTER TABLE "UserOnboardingToken"
ADD CONSTRAINT "UserOnboardingToken_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
