import {
  createHash,
} from "node:crypto";

export function createZerodhaOrderTag(
  clientOrderId: string,
): string {
  return createHash("sha256")
    .update(clientOrderId)
    .digest("hex")
    .slice(0, 20);
}