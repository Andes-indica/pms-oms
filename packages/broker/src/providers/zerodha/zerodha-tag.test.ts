import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  createZerodhaOrderTag,
  createZerodhaPublisherOrderTag,
} from "./zerodha-tag";

describe("Zerodha order tags", () => {
  const orderId =
    "cmv3ov51x000101qlmbo0v4cg";

  test("keeps direct API tags at 20 characters", () => {
    expect(
      createZerodhaOrderTag(orderId),
    ).toHaveLength(20);
  });

  test("limits Publisher basket tags to 8 characters", () => {
    const tag =
      createZerodhaPublisherOrderTag(
        orderId,
      );

    expect(tag).toHaveLength(8);
    expect(tag).toMatch(/^[a-f0-9]{8}$/);
    expect(tag).toBe(
      createZerodhaOrderTag(
        orderId,
      ).slice(0, 8),
    );
  });
});
