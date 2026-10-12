import {
  createHash,
} from "node:crypto";

function createOrderTag(
  clientOrderId: string,
  length: number,
): string {
  return createHash("sha256")
    .update(clientOrderId)
    .digest("hex")
    .slice(0, length);
}

export function createZerodhaOrderTag(
  clientOrderId: string,
): string {
  return createOrderTag(
    clientOrderId,
    20,
  );
}

export function createZerodhaPublisherOrderTag(
  clientOrderId: string,
): string {
  return createOrderTag(
    clientOrderId,
    8,
  );
}
