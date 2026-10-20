/**
 * Standalone read-only worker egress probe. No database/API credentials needed.
 * Example:
 * EXPECTED_EGRESS_IP=198.51.100.9 node apps/api/src/services/check-worker-egress.mjs
 */
import { isIP } from "node:net";
import { observeWorkerEgressIp } from "./client-egress-network-probe.mjs";

const expected = process.env.EXPECTED_EGRESS_IP?.trim();
if (isIP(expected ?? "") !== 4) {
  console.error("EGRESS_INVALID_EXPECTED_IPV4: set EXPECTED_EGRESS_IP");
  process.exitCode = 2;
} else {
  try {
    const observed = await observeWorkerEgressIp();
    const matches = observed === expected;
    console.log(JSON.stringify({
      type: "egress_probe",
      expectedPublicIp: expected,
      observedPublicIp: observed,
      matches,
      tradingEnabled: false,
    }));
    if (!matches) process.exitCode = 1;
  } catch (error) {
    console.error(JSON.stringify({
      type: "egress_probe",
      error: error?.code ?? "EGRESS_PROBE_FAILED",
      tradingEnabled: false,
    }));
    process.exitCode = 1;
  }
}
