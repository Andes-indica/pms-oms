CREATE TABLE "Instrument" (
  "id" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  "exchange" TEXT NOT NULL,
  "instrumentToken" TEXT,
  "name" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Instrument_pkey"
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Instrument_symbol_exchange_key"
ON "Instrument"("symbol", "exchange");

CREATE INDEX "Instrument_instrumentToken_idx"
ON "Instrument"("instrumentToken");

INSERT INTO "Instrument" (
  "id",
  "symbol",
  "exchange",
  "instrumentToken",
  "name",
  "isActive"
)
VALUES
  ('instrument_reliance_nse', 'RELIANCE', 'NSE', NULL, 'Reliance Industries', true),
  ('instrument_infy_nse', 'INFY', 'NSE', NULL, 'Infosys', true),
  ('instrument_tcs_nse', 'TCS', 'NSE', NULL, 'Tata Consultancy Services', true),
  ('instrument_hdfcbank_nse', 'HDFCBANK', 'NSE', NULL, 'HDFC Bank', true)
ON CONFLICT ("symbol", "exchange")
DO NOTHING;
