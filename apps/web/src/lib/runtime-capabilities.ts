import {
  apiFetch,
} from "./api";

export type RuntimeCapabilities = {
  marketData: {
    mode:
      | "LIVE"
      | "SIMULATED"
      | "DISABLED";
    marketDataAvailable: boolean;
    marketOrdersAllowed: boolean;
    valuationAvailable: boolean;
  };
};

let pending:
  Promise<RuntimeCapabilities> |
  null = null;

export function loadRuntimeCapabilities() {
  if (!pending) {
    pending = apiFetch<{
      data: RuntimeCapabilities;
    }>(
      "/api/runtime/capabilities",
    )
      .then(
        (response) =>
          response.data,
      )
      .catch((error) => {
        pending = null;
        throw error;
      });
  }

  return pending;
}
