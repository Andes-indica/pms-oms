const DEFAULT_BROKER_HTTP_TIMEOUT_MS =
  7_000;

export function getZerodhaHttpTimeoutMs() {
  const configured =
    Number(
      process.env
        .BROKER_HTTP_TIMEOUT_MS,
    );

  return Number.isInteger(
    configured,
  ) && configured >= 1_000 &&
    configured <= 60_000
    ? configured
    : DEFAULT_BROKER_HTTP_TIMEOUT_MS;
}
