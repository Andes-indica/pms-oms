-- CreateEnum
CREATE TYPE "BrokerConnectionStatus" AS ENUM ('DISCONNECTED', 'CONNECTED', 'EXPIRED', 'ERROR');

-- CreateTable
CREATE TABLE "BrokerConnection" (
    "id" TEXT NOT NULL,
    "brokerAccountId" TEXT NOT NULL,
    "credentialsEncrypted" TEXT,
    "sessionEncrypted" TEXT,
    "externalUserId" TEXT,
    "sessionExpiresAt" TIMESTAMP(3),
    "status" "BrokerConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "metadata" JSONB,
    "lastConnectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrokerConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrokerConnection_brokerAccountId_key" ON "BrokerConnection"("brokerAccountId");

-- AddForeignKey
ALTER TABLE "BrokerConnection" ADD CONSTRAINT "BrokerConnection_brokerAccountId_fkey" FOREIGN KEY ("brokerAccountId") REFERENCES "BrokerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
