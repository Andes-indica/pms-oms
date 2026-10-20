/**
 * Client-specific execution routing pilot.
 *
 * This module NEVER places an order or contacts Kite. A routing decision is
 * only an observation, not permission to execute for another client.
 * Keep production direct multi-client execution disabled pending broker approval.
 */
import { isIP } from "node:net";

/**
 * @typedef {{brokerAccountId: string, workerId: string, expectedEgressIp: string}} EgressAssignment
 */

export class EgressPilotError extends Error {
  constructor(code) {
    super(code);
    this.name = "EgressPilotError";
    this.code = code;
  }
}

const IPV4 = 4;

/**
 * Validates an isolated egress routing configuration. A worker/IP must not
 * silently be assigned to multiple unrelated client accounts.
 * @param {EgressAssignment[]} assignments
 */
export function createEgressPilot(assignments) {
  if (!Array.isArray(assignments) || assignments.length === 0) {
    throw new EgressPilotError("EGRESS_ASSIGNMENTS_REQUIRED");
  }
  const byAccount = new Map();
  const workerOwner = new Map();
  const ipOwner = new Map();

  for (const entry of assignments) {
    const { brokerAccountId, workerId, expectedEgressIp } = entry ?? {};
    if (![brokerAccountId, workerId, expectedEgressIp].every(v => typeof v === "string" && v.trim() !== "")) {
      throw new EgressPilotError("EGRESS_INVALID_ASSIGNMENT");
    }
    if (isIP(expectedEgressIp) !== IPV4) {
      throw new EgressPilotError("EGRESS_INVALID_IPV4");
    }
    if (byAccount.has(brokerAccountId)) {
      throw new EgressPilotError("EGRESS_DUPLICATE_ACCOUNT");
    }
    if (workerOwner.has(workerId) || ipOwner.has(expectedEgressIp)) {
      throw new EgressPilotError("EGRESS_ROUTE_SHARED");
    }
    workerOwner.set(workerId, brokerAccountId);
    ipOwner.set(expectedEgressIp, brokerAccountId);
    byAccount.set(brokerAccountId, Object.freeze({ brokerAccountId, workerId, expectedEgressIp }));
  }

  return Object.freeze({
    /**
     * A result records how an order *would* be routed. Nothing is submitted.
     * @param {{orderId:string, brokerAccountId:string, executionMode:string}} order
     */
    plan(order) {
      if (!order || !order.orderId || !order.brokerAccountId) {
        throw new EgressPilotError("EGRESS_INVALID_ORDER");
      }
      if (order.executionMode !== "DIRECT_API") {
        throw new EgressPilotError("EGRESS_NOT_DIRECT_ORDER");
      }
      const route = byAccount.get(order.brokerAccountId);
      if (!route) throw new EgressPilotError("EGRESS_ROUTE_NOT_CONFIGURED");
      return Object.freeze({ orderId: order.orderId, ...route, mode: "DRY_RUN", submitAllowed: false });
    },

    /**
     * Compares the public IP observed by a trusted egress probe to the
     * assigned IP. This is NOT a broker whitelist or permission check.
     * @param {{brokerAccountId:string, observedPublicIp:string}} observation
     */
    verify(observation) {
      const route = byAccount.get(observation?.brokerAccountId);
      if (!route) throw new EgressPilotError("EGRESS_ROUTE_NOT_CONFIGURED");
      if (isIP(observation?.observedPublicIp ?? "") !== IPV4) {
        throw new EgressPilotError("EGRESS_INVALID_OBSERVED_IP");
      }
      return Object.freeze({
        brokerAccountId: route.brokerAccountId,
        workerId: route.workerId,
        expectedEgressIp: route.expectedEgressIp,
        observedPublicIp: observation.observedPublicIp,
        matches: route.expectedEgressIp === observation.observedPublicIp,
        submitAllowed: false,
      });
    },
  });
}
