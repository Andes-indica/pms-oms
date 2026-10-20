import { test } from "node:test";
import assert from "node:assert/strict";
import { createEgressPilot } from "./client-egress-pilot.mjs";

const routes = [
  { brokerAccountId: "account-1", workerId: "worker-1", expectedEgressIp: "203.0.113.11" },
  { brokerAccountId: "account-2", workerId: "worker-2", expectedEgressIp: "203.0.113.12" },
];

test("dry-run plans one client order without submitting anything", () => {
  const pilot = createEgressPilot(routes);
  const plan = pilot.plan({ orderId: "order-1", brokerAccountId: "account-1", executionMode: "DIRECT_API" });
  assert.deepEqual(plan, {
    orderId: "order-1", brokerAccountId: "account-1", workerId: "worker-1",
    expectedEgressIp: "203.0.113.11", mode: "DRY_RUN", submitAllowed: false,
  });
});

test("different clients map to independent workers and egress IPs", () => {
  const pilot = createEgressPilot(routes);
  assert.notEqual(
    pilot.plan({ orderId: "o1", brokerAccountId: "account-1", executionMode: "DIRECT_API" }).workerId,
    pilot.plan({ orderId: "o2", brokerAccountId: "account-2", executionMode: "DIRECT_API" }).workerId
  );
});

test("fails closed when an account is unconfigured or mode is Publisher", () => {
  const pilot = createEgressPilot(routes);
  assert.throws(() => pilot.plan({ orderId: "o", brokerAccountId: "missing", executionMode: "DIRECT_API" }), /EGRESS_ROUTE_NOT_CONFIGURED/);
  assert.throws(() => pilot.plan({ orderId: "o", brokerAccountId: "account-1", executionMode: "CLIENT_CONFIRMATION" }), /EGRESS_NOT_DIRECT_ORDER/);
});

test("rejects duplicate accounts and any shared worker or IP", () => {
  assert.throws(() => createEgressPilot([routes[0], routes[0]]), /EGRESS_DUPLICATE_ACCOUNT/);
  assert.throws(() => createEgressPilot([routes[0], { ...routes[1], workerId: "worker-1" }]), /EGRESS_ROUTE_SHARED/);
  assert.throws(() => createEgressPilot([routes[0], { ...routes[1], expectedEgressIp: "203.0.113.11" }]), /EGRESS_ROUTE_SHARED/);
});

test("rejects invalid or absent public IPv4 addresses", () => {
  assert.throws(() => createEgressPilot([{ ...routes[0], expectedEgressIp: "localhost" }]), /EGRESS_INVALID_IPV4/);
  assert.throws(() => createEgressPilot([{ ...routes[0], expectedEgressIp: "2001:db8::1" }]), /EGRESS_INVALID_IPV4/);
});

test("IP probe detects mismatch and does not enable trading", () => {
  const pilot = createEgressPilot(routes);
  assert.deepEqual(pilot.verify({ brokerAccountId: "account-1", observedPublicIp: "203.0.113.99" }).matches, false);
  const result = pilot.verify({ brokerAccountId: "account-1", observedPublicIp: "203.0.113.11" });
  assert.equal(result.matches, true);
  assert.equal(result.submitAllowed, false);
});
