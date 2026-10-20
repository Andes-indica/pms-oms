/**
 * Read-only outbound IPv4 verifier for an independently provisioned worker.
 * Sends no broker requests and cannot place orders.
 */
import { isIP } from "node:net";
import { EgressPilotError } from "./client-egress-pilot.mjs";

const ENDPOINT = "https://checkip.amazonaws.com/";
const MAX_RESPONSE_BYTES = 64;

/**
 * Observe the egress IP using a fixed HTTPS endpoint.
 * Do not allow caller-provided URLs (SSRF risk).
 */
export async function observeWorkerEgressIp({
  fetchImpl = globalThis.fetch,
  timeoutMs = 5000,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new EgressPilotError("EGRESS_FETCH_UNAVAILABLE");
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 30000) {
    throw new EgressPilotError("EGRESS_INVALID_TIMEOUT");
  }
  let response;
  try {
    response = await fetchImpl(ENDPOINT, {
      method: "GET",
      redirect: "error",
      signal: AbortSignal.timeout(timeoutMs),
      headers: { Accept: "text/plain" },
    });
  } catch {
    throw new EgressPilotError("EGRESS_PROBE_NETWORK_FAILURE");
  }
  if (!response.ok) {
    throw new EgressPilotError("EGRESS_PROBE_HTTP_FAILURE");
  }
  const declaredLength = Number(response.headers?.get?.("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_RESPONSE_BYTES) {
    throw new EgressPilotError("EGRESS_INVALID_PROBE_RESPONSE");
  }
  let body;
  try {
    body = await response.text();
  } catch {
    throw new EgressPilotError("EGRESS_INVALID_PROBE_RESPONSE");
  }
  if (body.length > MAX_RESPONSE_BYTES) {
    throw new EgressPilotError("EGRESS_INVALID_PROBE_RESPONSE");
  }
  const ip = body.trim();
  if (isIP(ip) !== 4) {
    throw new EgressPilotError("EGRESS_INVALID_PROBE_RESPONSE");
  }
  return ip;
}

/**
 * @param {{pilot: ReturnType<import("./client-egress-pilot.mjs").createEgressPilot>,
 * brokerAccountId: string, fetchImpl?: typeof fetch, timeoutMs?: number}} args
 */
export async function verifyWorkerNetwork({
  pilot,
  brokerAccountId,
  fetchImpl,
  timeoutMs,
}) {
  const observedPublicIp = await observeWorkerEgressIp({ fetchImpl, timeoutMs });
  return pilot.verify({ brokerAccountId, observedPublicIp });
}
