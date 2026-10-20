import { test } from "node:test";
import assert from "node:assert/strict";
import { createEgressPilot } from "./client-egress-pilot.mjs";
import { observeWorkerEgressIp, verifyWorkerNetwork } from "./client-egress-network-probe.mjs";

const pilot = createEgressPilot([{ brokerAccountId: "test-account", workerId: "worker-a", expectedEgressIp: "198.51.100.9" }]);
const fakeFetch = (value, status = 200) => async (url, opts) => {
  assert.equal(url, "https://checkip.amazonaws.com/");
  assert.equal(opts.method, "GET");
  assert.equal(opts.redirect, "error");
  return new Response(value, { status });
};

test("observes an IPv4 address from fixed HTTPS probe", async () => {
  assert.equal(await observeWorkerEgressIp({ fetchImpl: fakeFetch("198.51.100.9\n") }), "198.51.100.9");
});

test("reports matching outbound IP, always leaves execution disabled", async () => {
  const result = await verifyWorkerNetwork({ pilot, brokerAccountId: "test-account", fetchImpl: fakeFetch("198.51.100.9\n") });
  assert.equal(result.matches, true);
  assert.equal(result.submitAllowed, false);
});

test("reports mismatched egress IP rather than silently allowing it", async () => {
  const result = await verifyWorkerNetwork({ pilot, brokerAccountId: "test-account", fetchImpl: fakeFetch("198.51.100.10") });
  assert.equal(result.matches, false);
  assert.equal(result.submitAllowed, false);
});

test("rejects invalid response and HTTP errors", async () => {
  await assert.rejects(observeWorkerEgressIp({ fetchImpl: fakeFetch("not-an-ip") }), /EGRESS_INVALID_PROBE_RESPONSE/);
  await assert.rejects(observeWorkerEgressIp({ fetchImpl: fakeFetch("error", 503) }), /EGRESS_PROBE_HTTP_FAILURE/);
  await assert.rejects(observeWorkerEgressIp({ fetchImpl: fakeFetch("x".repeat(100)) }), /EGRESS_INVALID_PROBE_RESPONSE/);
});

test("fails closed on timeouts, network errors and unconfigured accounts", async () => {
  await assert.rejects(observeWorkerEgressIp({ fetchImpl: async () => { throw Error("offline"); } }), /EGRESS_PROBE_NETWORK_FAILURE/);
  await assert.rejects(observeWorkerEgressIp({ fetchImpl: fakeFetch("198.51.100.9"), timeoutMs: -1 }), /EGRESS_INVALID_TIMEOUT/);
  await assert.rejects(verifyWorkerNetwork({ pilot, brokerAccountId: "wrong", fetchImpl: fakeFetch("198.51.100.9") }), /EGRESS_ROUTE_NOT_CONFIGURED/);
});
