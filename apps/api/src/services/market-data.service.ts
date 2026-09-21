const mockPrices: Record<string, number> = {
  RELIANCE: 1450,
  INFY: 1600,
  TCS: 3200,
  HDFCBANK: 1700,
};

export async function getMarketPrice(
  symbol: string,
  _exchange: string,
): Promise<number> {
  return mockPrices[
    symbol.toUpperCase()
  ] ?? 1000;
}